"""Utility functions for the WebRTC Voice Agent API."""

import logging
from uuid import uuid4, uuid5, UUID
from livekit import api
from .config import settings
from livekit.protocol.models import Room
from typing import List

# Configure logging
logger = logging.getLogger("webrtc-voice-agent")

def get_thread_id(sid: str | None) -> str:
    """Generate a consistent thread ID for the session."""
    if sid:
        return str(uuid5(UUID("12345678-1234-5678-1234-123456789abc"), sid))
    return str(uuid4())

async def make_livekit_request(endpoint: str, data: dict = None) -> dict:
    """Make request to LiveKit API using the official SDK."""
    try:
        # Create LiveKit API client with proper authentication
        livekit_api = api.LiveKitAPI(
            url=settings.livekit_url,
            api_key=settings.livekit_api_key,
            api_secret=settings.livekit_api_secret
        )
        
        if endpoint == "CreateRoom":
            # Create room using LiveKit SDK
            room_request = api.CreateRoomRequest(
                name=data.get("name", f"voice-chat-{str(uuid4())[:8]}"),
                empty_timeout=data.get("empty_timeout", 300),
                max_participants=data.get("max_participants", 10)
            )
            room: Room = await livekit_api.room.create_room(room_request)
            return {
                "name": room.name,
                "sid": room.sid,
                "creation_time": room.creation_time,
                "max_participants": room.max_participants
            }
            
        elif endpoint == "ListRooms":
            # List rooms using LiveKit SDK
            rooms: List[Room] = await livekit_api.room.list_rooms(api.ListRoomsRequest())
            return {
                "rooms": [{
                    "name": room.name,
                    "sid": room.sid,
                    "num_participants": room.num_participants
                } for room in rooms]
            }
            
        else:
            logger.error(f"Unsupported endpoint: {endpoint}")
            return {"error": f"Unsupported endpoint: {endpoint}"}
            
    except Exception as e:
        logger.error(f"Error making LiveKit request: {e}")
        return {"error": str(e)}
