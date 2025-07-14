import logging
import random
from typing import Literal
from typing_extensions import Annotated, TypedDict, Optional

from langgraph.constants import TAG_NOSTREAM
from langgraph.graph import StateGraph, add_messages
from langgraph.types import Command
from langchain_openai.chat_models import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
from langgraph.types import StreamWriter
from app.services.types import TypedLivekit

# Import centralized prompts
from app.llm.prompt import (
    AGENT_NAME,
    SUPERVISOR_SYSTEM_PROMPT,
    WEATHER_SYSTEM_PROMPT,
    GENERAL_SYSTEM_PROMPT,
    ROUTING_PROMPT_TEMPLATE,
    WEATHER_LOCATION_PROMPT,
    ERROR_WEATHER_UNAVAILABLE,
    ERROR_GENERAL,
    GREETING_RESPONSES
)

logger = logging.getLogger(__name__)


class AgentState(TypedDict):
    messages: Annotated[list, add_messages]
    title: Optional[str]
    content: Optional[str]


async def weather(state: AgentState) -> AgentState:
    """Handle weather-related queries with robust location extraction and helpful responses."""
    
    # Get the user's message content and extract text properly
    raw_content = state["messages"][-1].content if state["messages"] else "What's the weather like?"
    
    # Extract text from content (handle both string and complex structures)
    if isinstance(raw_content, str):
        user_message = raw_content
    elif isinstance(raw_content, list) and len(raw_content) > 0:
        # Extract text from first item if it's a list of content blocks
        first_item = raw_content[0]
        if isinstance(first_item, dict) and 'text' in first_item:
            user_message = first_item['text']
        else:
            user_message = str(raw_content)
    else:
        user_message = str(raw_content)
    
    logger.info(f"weather: extracted user message: {user_message}")
    
    try:
        # Extract location from user query
        location_response = await ChatOpenAI(model="gpt-4o-mini").ainvoke([
            SystemMessage(content=WEATHER_LOCATION_PROMPT),
            HumanMessage(content=user_message)
        ])
        
        location = location_response.content.strip().strip("'\"")
        logger.info(f"weather: extracted location '{location}' from query: {user_message}")
        
        # Generate weather response using centralized prompt
        weather_messages = [
            SystemMessage(content=WEATHER_SYSTEM_PROMPT),
            HumanMessage(content=f"User asked: '{user_message}' about weather for location: '{location}'. Provide a helpful, confident response using your weather assistance capabilities. Include relevant seasonal information, weather patterns, or practical advice for that location.")
        ]
        
        response = await ChatOpenAI(model="gpt-4o-mini").ainvoke(weather_messages)
        
        logger.info(f"weather: responded with: {response.content}")
        return {"messages": [response]}
        
    except Exception as e:
        logger.error(f"weather: error processing request: {e}")
        # Fallback response
        fallback_response = HumanMessage(content=ERROR_WEATHER_UNAVAILABLE)
        return {"messages": [fallback_response]}


async def other(state: AgentState, writer: StreamWriter) -> AgentState:
    """Handle general conversation and non-weather queries"""
    
    # Get the user's message content and extract text properly
    raw_content = state["messages"][-1].content if state["messages"] else "Hello"
    
    # Extract text from content (handle both string and complex structures)
    if isinstance(raw_content, str):
        user_message = raw_content
    elif isinstance(raw_content, list) and len(raw_content) > 0:
        # Extract text from first item if it's a list of content blocks
        first_item = raw_content[0]
        if isinstance(first_item, dict) and 'text' in first_item:
            user_message = first_item['text']
        else:
            user_message = str(raw_content)
    else:
        user_message = str(raw_content)
    
    logger.info(f"other: extracted user message: {user_message}")
    
    try:
        # Check if it's a greeting or asking for name
        user_lower = user_message.lower()
        if any(greeting in user_lower for greeting in ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"]):
            # Use a random greeting response
            greeting_response = random.choice(GREETING_RESPONSES)
            logger.info(f"other: greeting detected, responding with: {greeting_response}")
            return {"messages": [HumanMessage(content=greeting_response)]}
        
        if any(name_query in user_lower for name_query in ["your name", "who are you", "what's your name", "what is your name"]):
            name_response = f"I'm {AGENT_NAME}, your voice assistant. How can I help you today?"
            logger.info(f"other: name query detected, responding with: {name_response}")
            return {"messages": [HumanMessage(content=name_response)]}
        
        # Generate general response using centralized prompt
        general_messages = [
            SystemMessage(content=GENERAL_SYSTEM_PROMPT),
            HumanMessage(content=user_message)
        ]
        
        response = await ChatOpenAI(model="gpt-4o-mini").ainvoke(general_messages)
        
        logger.info(f"other: responded with: {response.content}")
        return {"messages": [response]}
        
    except Exception as e:
        logger.error(f"other: error processing request: {e}")
        # Fallback response
        fallback_response = HumanMessage(content=ERROR_GENERAL)
        return {"messages": [fallback_response]}


async def supervisor(
    state: AgentState, writer: StreamWriter
) -> Command[Literal["weather", "other"]]:
    livekit = TypedLivekit(writer)

    # Get the user's message content and extract text properly
    raw_content = state["messages"][-1].content if state["messages"] else "Hello"
    
    # Extract text from content (handle both string and complex structures)
    if isinstance(raw_content, str):
        user_content = raw_content
    elif isinstance(raw_content, list) and len(raw_content) > 0:
        # Extract text from first item if it's a list of content blocks
        first_item = raw_content[0]
        if isinstance(first_item, dict) and 'text' in first_item:
            user_content = first_item['text']
        else:
            user_content = str(raw_content)
    else:
        user_content = str(raw_content)
    
    logger.info(f"supervisor: extracted user content: {user_content}")
    
    class RouterOutput(TypedDict):
        next_step: Annotated[
            Literal["weather", "other"], ..., "Classify if user is asking about weather or something else"
        ]

    # Route based on user intent using centralized prompt
    routing_messages = [
        SystemMessage(content=SUPERVISOR_SYSTEM_PROMPT),
        HumanMessage(content=ROUTING_PROMPT_TEMPLATE.format(user_input=user_content))
    ]
    
    response = await (
        ChatOpenAI(model="gpt-4o-mini")
        .with_structured_output(RouterOutput)
        .with_config(tags=[TAG_NOSTREAM])
    ).ainvoke(routing_messages)

    # Send a flush event to send directly to TTS
    livekit.flush()
    logger.info(f"supervisor: routing to {response['next_step']} based on: {user_content}")

    if response["next_step"] == "weather":
        return Command(goto="weather")
    else:
        return Command(goto="other")


builder = StateGraph(AgentState)
builder.add_node(supervisor)
builder.add_node(weather)
builder.add_node(other)
builder.set_entry_point("supervisor")
# supervisor uses Command(goto=...) to route to weather or other
# No explicit edges needed for Command routing
# weather and other nodes end the conversation turn (no edges back to supervisor)
# This prevents infinite loops and allows the voice agent to wait for next user input

graph = builder.compile()
