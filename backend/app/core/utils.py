"""Utility functions for the WebRTC Voice Agent API."""

import logging
import httpx
from uuid import uuid4, uuid5, UUID
from typing import Optional
from .config import settings

# Configure logging
logger = logging.getLogger("webrtc-voice-agent")

def get_thread_id(sid: str | None) -> str:
    """Generate a consistent thread ID for the session."""
    if sid:
        return str(uuid5(UUID("12345678-1234-5678-1234-123456789abc"), sid))
    return str(uuid4())

async def make_livekit_request(endpoint: str, data: dict = None) -> dict:
    """Make HTTP request to LiveKit API using Twirp protocol."""
    url = f"{settings.livekit_url.replace('wss://', 'https://').replace('ws://', 'http://')}/twirp/livekit.RoomService/{endpoint}"
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {settings.livekit_api_key}:{settings.livekit_api_secret}"
    }
    
    try:
        async with httpx.AsyncClient() as client:
            if data:
                response = await client.post(url, json=data, headers=headers)
            else:
                response = await client.post(url, headers=headers)
            
            if response.status_code == 200:
                return response.json()
            else:
                logger.error(f"LiveKit API error: {response.status_code} - {response.text}")
                return {"error": f"LiveKit API error: {response.status_code}"}
                
    except Exception as e:
        logger.error(f"Error making LiveKit request: {e}")
        return {"error": str(e)}
