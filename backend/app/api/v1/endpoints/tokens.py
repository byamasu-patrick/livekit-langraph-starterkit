"""Token generation endpoints for the WebRTC Voice Agent API."""

import logging
from fastapi import APIRouter, HTTPException
from livekit import api
from uuid import uuid4

from app.schemas.agent import JoinTokenRequest

logger = logging.getLogger("webrtc-voice-agent")

router = APIRouter()

@router.post("/token")
async def get_join_token(request: JoinTokenRequest):
    """Generate a token for joining a LiveKit room."""
    try:
        # Generate participant name if not provided
        participant_name = request.participant_name or f"user-{str(uuid4())[:8]}"
        
        # Create access token for LiveKit room
        token = api.AccessToken(settings.livekit_api_key, settings.livekit_api_secret) \
            .with_identity(participant_name) \
            .with_name(participant_name) \
            .with_grants(api.VideoGrants(
                room_join=True,
                room=request.room_name,
                can_publish=True,
                can_subscribe=True,
                can_publish_data=True
            ))
        
        jwt_token = token.to_jwt()
        
        logger.info(f"Generated token for participant {participant_name} in room {request.room_name}")
        return {
            "token": jwt_token,
            "participant_name": participant_name,
            "room_name": request.room_name
        }
        
    except Exception as e:
        logger.error(f"Error generating token: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate token: {str(e)}")
