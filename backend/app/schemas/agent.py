
# Pydantic models for request bodies
from pydantic import BaseModel
from typing import Optional

class CreateRoomRequest(BaseModel):
    room_name: Optional[str] = None

class JoinTokenRequest(BaseModel):
    room_name: str
    participant_name: Optional[str] = None

class StartAgentRequest(BaseModel):
    room_name: str
