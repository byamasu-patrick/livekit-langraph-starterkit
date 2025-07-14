"""Main entry point for the WebRTC Voice Agent API.

This module sets up the FastAPI application with modular routers.
All business logic is organized in the app/api directory structure.
"""

import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from app.core.config import settings
from app.api.v1.api import api_router

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("webrtc-voice-agent")

# Initialize FastAPI app
app = FastAPI(
    title=settings.project_name,
    version=settings.version,
    description="A modern WebRTC voice agent with Alex AI assistant",
    docs_url="/docs",
    redoc_url="/redoc",
    debug=settings.debug
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=settings.allowed_methods,
    allow_headers=settings.allowed_headers,
)

# Include API router with versioning
app.include_router(api_router, prefix=settings.api_v1_str)

# Add backward compatibility routes (without /api/v1 prefix)
# This ensures existing frontend code continues to work
app.include_router(api_router)


if __name__ == "__main__":
    # Run the FastAPI server
    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
        log_level="debug" if settings.debug else "info"
    )
