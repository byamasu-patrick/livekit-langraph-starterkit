"""Main API router for v1 endpoints."""

from fastapi import APIRouter

from app.api.v1.endpoints import rooms, tokens, agents

api_router = APIRouter()

# Include all endpoint routers
api_router.include_router(rooms.router, tags=["rooms"])
api_router.include_router(tokens.router, tags=["tokens"])
api_router.include_router(agents.router, tags=["agents"])
