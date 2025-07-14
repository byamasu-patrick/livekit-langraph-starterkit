"""Agent management endpoints for the WebRTC Voice Agent API."""

import logging
from fastapi import APIRouter, HTTPException

from app.schemas.agent import StartAgentRequest
from app.core.utils import get_thread_id

logger = logging.getLogger("webrtc-voice-agent")

router = APIRouter()

@router.post("/start-agent")
async def start_agent(request: StartAgentRequest):
    """Start the voice agent in a specific room."""
    try:
        # Generate thread ID for the agent session
        thread_id = get_thread_id(request.room_name)
        
        # The actual agent starting is handled by the pipeline worker
        # This endpoint serves as a trigger/notification
        logger.info(f"Agent start requested for room: {request.room_name}")
        logger.info(f"Thread ID: {thread_id}")
        
        # In a production setup, you might want to:
        # 1. Notify the pipeline worker about the new room
        # 2. Store session information in a database
        # 3. Set up monitoring for the agent session
        
        return {
            "status": "agent_start_requested",
            "room_name": request.room_name,
            "thread_id": thread_id,
            "message": "Voice agent will join the room when a participant connects"
        }
        
    except Exception as e:
        logger.error(f"Error starting agent: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to start agent: {str(e)}")
