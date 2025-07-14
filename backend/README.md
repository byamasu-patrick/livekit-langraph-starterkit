# WebRTC Voice Agent Backend

This is the backend component of the WebRTC Voice Agent system, built with FastAPI and LangGraph.

## Features

- **FastAPI Server**: Modern Python web framework for API endpoints
- **LangGraph Integration**: Conversational AI agent with routing capabilities
- **LiveKit Integration**: WebRTC signaling and media processing
- **ElevenLabs TTS**: High-quality text-to-speech synthesis
- **Modular Architecture**: Clean separation of concerns with routers and services

## Components

- `main.py` - FastAPI application entry point
- `app/api/` - API endpoints organized by version and functionality
- `app/core/` - Core configuration and utilities
- `app/services/` - Business logic and external service integrations
- `app/llm/` - LangGraph agent and pipeline components

## Installation

```bash
poetry install
```

## Usage

```bash
# Start FastAPI server
poetry run python main.py

# Start LangGraph agent server
poetry run langgraph dev --no-browser

# Start pipeline worker
poetry run python app/llm/pipeline.py dev
```
