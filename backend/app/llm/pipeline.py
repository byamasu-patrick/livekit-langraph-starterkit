import logging
import os
import sys
from pathlib import Path
from uuid import uuid4, uuid5, UUID
from dotenv import load_dotenv
from livekit.agents import (
    AutoSubscribe,
    JobContext,
    JobProcess,
    WorkerOptions,
    cli,
    Agent,
    AgentSession,
)
from livekit.plugins import openai, silero, elevenlabs

# Add the backend directory to Python path for imports
backend_dir = Path(__file__).parent.parent.parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from app.services import LangGraphAdapter
from langgraph.pregel.remote import RemoteGraph

load_dotenv(dotenv_path=".env")
logger = logging.getLogger("voice-agent")


def get_thread_id(sid: str | None) -> str:
    NAMESPACE = UUID("41010b5d-5447-4df5-baf2-97d69f2e9d06")
    if sid is not None:
        return str(uuid5(NAMESPACE, sid))
    return str(uuid4())


def prewarm(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()


async def entrypoint(ctx: JobContext):
    logger.info(f"connecting to room {ctx.room.name}")
    await ctx.connect(auto_subscribe=AutoSubscribe.AUDIO_ONLY)

    participant = await ctx.wait_for_participant()
    thread_id = get_thread_id(participant.sid)

    logger.info(
        f"starting voice assistant for participant {participant.identity} (thread ID: {thread_id})"
    )

    # Create a custom voice agent using the current LiveKit agents API
    class VoiceAgent(Agent):
        def __init__(self, thread_id: str):
            graph = RemoteGraph("agent", url="http://localhost:2024")
            llm = LangGraphAdapter(graph, config={"configurable": {"thread_id": thread_id}})
            stt = openai.STT()
            tts = elevenlabs.TTS()
            vad = ctx.proc.userdata["vad"]
            
            super().__init__(
                instructions="You are a helpful voice assistant powered by LangGraph.",
                stt=stt,
                llm=llm,
                tts=tts,
                vad=vad,
            )
    
    # Create and start the agent session
    session = AgentSession()
    await session.start(
        room=ctx.room,
        agent=VoiceAgent(thread_id)
    )


if __name__ == "__main__":
    # Get LiveKit configuration from environment
    livekit_url = os.getenv("LIVEKIT_URL") or "wss://aloochat-trlq2grl.livekit.cloud"
    livekit_api_key = os.getenv("LIVEKIT_API_KEY")
    livekit_api_secret = os.getenv("LIVEKIT_API_SECRET")
    
    if not livekit_api_key or not livekit_api_secret:
        logger.error("LIVEKIT_API_KEY and LIVEKIT_API_SECRET must be set")
        exit(1)
    
    # Set environment variables for LiveKit CLI
    os.environ["LIVEKIT_URL"] = livekit_url
    os.environ["LIVEKIT_API_KEY"] = livekit_api_key
    os.environ["LIVEKIT_API_SECRET"] = livekit_api_secret
    
    logger.info(f"Connecting to LiveKit at: {livekit_url}")
    
    cli.run_app(
        WorkerOptions(
            entrypoint_fnc=entrypoint,
            prewarm_fnc=prewarm,
        ),
    )
