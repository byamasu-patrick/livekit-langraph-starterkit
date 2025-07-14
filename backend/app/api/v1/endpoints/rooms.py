"""Room management endpoints for the WebRTC Voice Agent API."""

import logging
from fastapi import APIRouter, HTTPException
from uuid import uuid4

from app.schemas.agent import CreateRoomRequest
from app.core.utils import make_livekit_request

logger = logging.getLogger("webrtc-voice-agent")

router = APIRouter()

@router.get("/")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok", "service": "WebRTC Voice Agent"}

@router.post("/create-room")
async def create_room(request: CreateRoomRequest):
    """Create a new LiveKit room for WebRTC communication."""
    try:
        # Generate room name if not provided
        room_name = request.room_name or f"voice-chat-{str(uuid4())[:8]}"
        
        # Create room via LiveKit API
        room_data = {
            "name": room_name,
            "empty_timeout": 300,  # 5 minutes
            "max_participants": 10
        }
        
        result = await make_livekit_request("CreateRoom", room_data)
        
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        
        logger.info(f"Created room: {room_name}")
        return {
            "room_name": room_name,
            "status": "created",
            "room_data": result
        }
        
    except Exception as e:
        logger.error(f"Error creating room: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to create room: {str(e)}")

@router.get("/rooms")
async def list_rooms():
    """List all active LiveKit rooms."""
    try:
        result = await make_livekit_request("ListRooms")
        
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        
        rooms = result.get("rooms", [])
        return {
            "rooms": rooms,
            "count": len(rooms)
        }
        
    except Exception as e:
        logger.error(f"Error listing rooms: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to list rooms: {str(e)}")
