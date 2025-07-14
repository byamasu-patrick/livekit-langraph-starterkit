"""
LangGraphAdapter masquerades as an livekit.LLM and translates the LiveKit chat chunks
into LangGraph messages.
"""

from typing import Any, Optional, Dict
from livekit.agents import llm
from langgraph.pregel import PregelProtocol
from langchain_core.messages import BaseMessageChunk, AIMessage, HumanMessage
from livekit.agents.types import APIConnectOptions, DEFAULT_API_CONNECT_OPTIONS
from livekit.agents.tts import SynthesizeStream
from livekit.agents.utils import shortuuid
from langgraph.types import Command
from langgraph.errors import GraphInterrupt
from httpx import HTTPStatusError

import logging

logger = logging.getLogger(__name__)


# https://github.com/livekit/agents/issues/1370#issuecomment-2588821571
class FlushSentinel(str, SynthesizeStream._FlushSentinel):
    def __new__(cls, *args, **kwargs):
        return super().__new__(cls, *args, **kwargs)


class LangGraphStream(llm.LLMStream):
    def __init__(
        self,
        llm: llm.LLM,
        chat_ctx: llm.ChatContext,
        graph: PregelProtocol,
        fnc_ctx: Optional[Dict] = None,
        tools: Optional[list] = None,
        tool_choice: Optional[str] = None,
        conn_options: APIConnectOptions = None,
    ):
        # Pass only the basic parameters that LLMStream.__init__ accepts
        super().__init__(llm, chat_ctx=chat_ctx, tools=tools, conn_options=conn_options)
        self._graph = graph
        self._fnc_ctx = fnc_ctx
        self._tools = tools
        self._tool_choice = tool_choice

    async def _run(self):
        # Debug: Log what's available in chat_ctx
        logger.info(f"ChatContext attributes: {dir(self.chat_ctx)}")
        
        # Try to get messages from ChatContext using the correct attribute
        messages = []
        if hasattr(self.chat_ctx, 'items'):
            messages = self.chat_ctx.items
            logger.info(f"Found {len(messages)} messages in chat_ctx.items")
        elif hasattr(self.chat_ctx, 'messages'):
            messages = self.chat_ctx.messages
            logger.info(f"Found {len(messages)} messages in chat_ctx.messages")
        elif hasattr(self.chat_ctx, '_messages'):
            messages = self.chat_ctx._messages
            logger.info(f"Found {len(messages)} messages in chat_ctx._messages")
        else:
            # If no messages attribute, try to get the last message content directly
            logger.warning("No messages attribute found in ChatContext")
            # Create a simple default message for now
            messages = []
        
        input_human_message = None
        if messages:
            input_human_message = next(
                (
                    self._to_message(m)
                    for m in reversed(messages)
                    if hasattr(m, 'role') and m.role == "user"
                ),
                None,
            )
        
        # If we still don't have a message, create a default one
        if not input_human_message:
            logger.info("No user message found, creating default message")
            input_human_message = HumanMessage(content="Hello")

        messages = [input_human_message] if input_human_message else []
        input = {"messages": messages}
        
        logger.info(f"LangGraph input prepared: {input}")

        # see if we need to respond to an interrupt
        if interrupt := await self._get_interrupt():
            logger.info(f"Found interrupt: {interrupt}")
            used_messages = [
                AIMessage(interrupt.value),
                input_human_message,
            ]

            input = Command(resume=(input_human_message.content, used_messages))
        else:
            logger.info("No interrupt found, proceeding with normal flow")

        try:
            logger.info("Starting LangGraph stream processing...")
            stream_count = 0
            async for mode, data in self._graph.astream(
                input, config=self._llm._config, stream_mode=["messages", "custom"]
            ):
                stream_count += 1
                logger.info(f"Stream {stream_count}: mode={mode}, data_type={type(data)}, data={data}")
                
                if mode == "messages":
                    logger.info(f"Processing message mode: {data}")
                    if chunk := await self._to_livekit_chunk(data[0]):
                        logger.info(f"Sending message chunk: {chunk}")
                        self._event_ch.send_nowait(chunk)
                    else:
                        logger.warning(f"Failed to create chunk from message: {data[0]}")

                if mode == "custom":
                    logger.info(f"Processing custom mode: {data}")
                    if isinstance(data, dict) and (event := data.get("type")):
                        logger.info(f"Custom event: {event}")
                        if event == "say" or event == "flush":
                            content = (data.get("data") or {}).get("content")
                            logger.info(f"Custom content: {content}")
                            if chunk := await self._to_livekit_chunk(content):
                                logger.info(f"Sending custom chunk: {chunk}")
                                self._event_ch.send_nowait(chunk)

                            logger.info("Sending flush sentinel")
                            self._event_ch.send_nowait(
                                self._create_livekit_chunk(FlushSentinel())
                            )
            
            logger.info(f"LangGraph stream completed with {stream_count} items")
        except GraphInterrupt as e:
            logger.info(f"GraphInterrupt caught: {e}")
            pass
        except Exception as e:
            logger.error(f"Error in LangGraph stream processing: {e}")
            raise

        # If interrupted, send the string as a message
        if interrupt := await self._get_interrupt():
            if chunk := await self._to_livekit_chunk(interrupt.value):
                self._event_ch.send_nowait(chunk)

    async def _get_interrupt(cls) -> Optional[str]:
        try:
            state = await cls._graph.aget_state(config=cls._llm._config)
            interrupts = [
                interrupt for task in state.tasks for interrupt in task.interrupts
            ]
            assistant = next(
                (
                    interrupt
                    for interrupt in reversed(interrupts)
                    if isinstance(interrupt.value, str)
                ),
                None,
            )
            return assistant
        except HTTPStatusError as e:
            return None

    def _to_message(cls, msg: llm.ChatMessage) -> HumanMessage:
        if isinstance(msg.content, str):
            content = msg.content
        elif isinstance(msg.content, list):
            content = []
            for c in msg.content:
                if isinstance(c, str):
                    content.append({"type": "text", "text": c})
                elif isinstance(c, llm.ChatImage):
                    if isinstance(c.image, str):
                        content.append({"type": "image_url", "image_url": c.image})
                    else:
                        logger.warning("Unsupported image type")
                else:
                    logger.warning("Unsupported content type")
        else:
            content = ""

        return HumanMessage(content=content, id=msg.id)

    @staticmethod
    def _create_livekit_chunk(
        content: str,
        *,
        id: str | None = None,
    ) -> llm.ChatChunk | None:
        # Create a ChatChunk with the correct structure for current LiveKit agents
        chunk_id = id or shortuuid()
        return llm.ChatChunk(
            id=chunk_id,
            delta=llm.ChoiceDelta(role="assistant", content=content),
        )

    @staticmethod
    async def _to_livekit_chunk(
        msg: BaseMessageChunk | str | None,
    ) -> llm.ChatChunk | None:
        if not msg:
            return None

        request_id = None
        content = msg

        if isinstance(msg, str):
            content = msg
        elif hasattr(msg, "content") and isinstance(msg.content, str):
            request_id = getattr(msg, "id", None)
            content = msg.content
        elif isinstance(msg, dict):
            request_id = msg.get("id")
            content = msg.get("content")

        return LangGraphStream._create_livekit_chunk(content, id=request_id)


class LangGraphAdapter(llm.LLM):
    def __init__(self, graph: Any, config: dict[str, Any] | None = None):
        super().__init__()
        self._graph = graph
        self._config = config

    def chat(
        self,
        chat_ctx: llm.ChatContext,
        fnc_ctx: Optional[Any] = None,
        conn_options: APIConnectOptions = DEFAULT_API_CONNECT_OPTIONS,
        tools: Optional[list] = None,
        tool_choice: Optional[str] = None,
    ) -> llm.LLMStream:
        # Note: tools and tool_choice parameters are accepted for compatibility but not used
        # LangGraph handles tools internally through the graph definition
        return LangGraphStream(
            self,
            chat_ctx=chat_ctx,
            graph=self._graph,
            fnc_ctx=fnc_ctx,
            tools=tools,
            tool_choice=tool_choice,
            conn_options=conn_options,
        )
