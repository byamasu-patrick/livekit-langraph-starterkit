# WebRTC Voice Agent with Alex

A modern, full-stack voice agent system featuring real-time WebRTC communication, intelligent conversation routing, and high-quality text-to-speech. Meet **Alex**, your AI voice assistant powered by LangGraph, LiveKit, FastAPI, and ElevenLabs.

---

## Features

### Voice Interaction

* Real-time WebRTC: Low-latency voice communication through the browser
* Speech Recognition: Automatic speech-to-text conversion
* ElevenLabs TTS: Premium text-to-speech with natural voice output
* Audio Visualization: Dynamic audio level indicators with dark mode

### Intelligent Agent (Alex)

* LangGraph Integration: Sophisticated conversation flow management
* Weather Assistance: Dedicated weather information and advice capabilities
* General Conversation: Helpful responses for various topics and questions
* Smart Routing: Automatic classification and routing of user queries
* Centralized Prompts: Consistent personality and capabilities across all interactions

### Modern Architecture

* FastAPI Backend: High-performance Python API server
* Next.js Frontend: Modern React-based user interface with TypeScript
* LiveKit Cloud: Scalable WebRTC signaling and media relay
* Automated UX: Streamlined room creation and connection flow

---

## Quick Start

### Prerequisites

* Python 3.11+ (for LangGraph compatibility)
* Node.js 18+ (for Next.js frontend)
* LiveKit Cloud account (or local LiveKit server)
* API Keys: OpenAI, ElevenLabs

---

### Backend Setup (Python)

#### 1. Install Dependencies

```bash
cd python
pip install -e .
# or using poetry
poetry install
```

#### 2. Environment Configuration

Create a `.env` file in the `python/` directory:

```env
# LiveKit Configuration
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
LIVEKIT_URL=wss://your-livekit-instance.livekit.cloud

# AI Services
OPENAI_API_KEY=your_openai_api_key
ELEVEN_API_KEY=your_elevenlabs_api_key

# Optional: LangSmith Tracing
LANGSMITH_API_KEY=your_langsmith_api_key
LANGSMITH_PROJECT=LanggraphLivekit
LANGSMITH_TRACING=true
```

#### 3. Start Backend Services

**Option A: Using Make (Recommended)**

```bash
cd python

# Start LangGraph agent server
make start-agent

# In another terminal: Start pipeline worker
make start-pipeline

# In another terminal: Start FastAPI server
make start-webrtc
```

**Option B: Manual Start**

```bash
# Terminal 1: LangGraph Server
cd python
langgraph dev --no-browser

# Terminal 2: Pipeline Worker
cd python
python llm/pipeline.py dev

# Terminal 3: FastAPI Server
cd python
python webrtc_server.py
```

---

### Frontend Setup (Next.js)

#### 1. Install Dependencies

```bash
cd frontend
pnpm install
```

#### 2. Start Development Server

```bash
pnpm run dev
```

Access the frontend at `http://localhost:3000`.

---

## Service Architecture

* Frontend: `http://localhost:3000` (Next.js UI)
* FastAPI Server: `http://localhost:8000` (Room management, tokens)
* LangGraph Server: `http://localhost:2024` (Agent logic)
* Pipeline Worker: Background voice processing
* LiveKit: WebRTC signaling (via cloud)

---

## Usage

### Web Interface

1. Open the app in your browser at `http://localhost:3000`
2. Click the microphone button to connect
3. When active, speak into your microphone
4. Audio bars show input levels
5. Alex will respond via voice

### Example Conversations

Try asking:

* "Hi Alex, what's your name?"
* "What can you help me with today?"
* "What's the weather like in New York?"
* "Tell me about the weather patterns in summer"
* "Can you give me some general advice?"

---

### UI Features

* Audio visualization with responsive bars
* Dark mode with gradient styling
* Connection status display
* Responsive design for desktop and mobile
* Automated room creation and joining

---

### API Endpoints

FastAPI backend (`http://localhost:8000`) provides:

#### Create Room

```http
POST /create-room
Content-Type: application/json

{
  "room_name": "voice-chat-abc123"
}
```

#### Get Join Token

```http
POST /token
Content-Type: application/json

{
  "room_name": "voice-chat-abc123",
  "participant_name": "user-xyz789"
}
```

#### Start Agent

```http
POST /start-agent
Content-Type: application/json

{
  "room_name": "voice-chat-abc123"
}
```

*Note: The frontend handles these calls automatically.*

---

## Architecture Overview

### Components

**Frontend (Next.js + TypeScript):**

* `VoiceAgentClean.tsx`: Main component
* LiveKit client for audio
* Tailwind CSS for styling
* Audio context for real-time visualization

**Backend (Python):**

* `webrtc_server.py`: FastAPI server
* `llm/pipeline.py`: Voice processing worker
* `llm/agent.py`: LangGraph agent logic
* `llm/prompt.py`: Centralized prompts
* `langgraph_livekit_agents/`: Custom LangGraph adapters

---

### Voice Processing Flow

```
User → LiveKit (STT) → LangGraph Agent → ElevenLabs (TTS) → User
```

1. User speaks into the browser
2. LiveKit captures and transcribes speech
3. LangGraph routes and processes the query
4. ElevenLabs generates voice output
5. LiveKit streams response audio back to the user

---

## Alex's Agent Logic

**LangGraph State Machine:**

```
Supervisor → Weather Node (weather queries)
           → Other Node (general conversation)
```

**Capabilities:**

* Weather advice and suggestions
* General chat and help
* Automatic routing based on intent
* Unified, consistent personality through prompts

---

## Troubleshooting

### Connection or Token Errors

* Ensure FastAPI server is running
* Check LiveKit credentials in `.env`
* Ensure WebRTC is not blocked by a firewall

### Agent Not Responding

* Check that the pipeline worker is running
* Verify LangGraph server is active on port 2024
* Confirm your OpenAI and ElevenLabs keys are set

### Audio Issues

* Check browser microphone permissions
* Make sure speakers/headphones are working
* Try switching to Chrome or Edge

### Import Errors

* Use Python 3.11+
* Ensure dependencies are installed correctly
* Activate your virtual environment

---

## Debugging Tips

* Check terminal logs for backend errors
* Use browser console to catch frontend issues
* Manually test API endpoints using `curl` or Postman
* Make sure all required services are running

---

## What's Next

### Potential Enhancements

* Real weather API integration
* Additional agent tools (calendar, notes, etc.)
* Support for multiple voices
* Multi-language support
* Mobile app with voice chat
* Voice command/wake word support

---

## Customization

### Voice Selection

Set a specific ElevenLabs voice in `VoiceAssistant`:

```python
tts = elevenlabs.TTS(voice_id="YourVoiceID")
```

### Agent Instructions

Modify Alex's behavior by updating the `instructions` in `VoiceAssistant`:

```python
super().__init__(
    instructions="""Your custom instructions here...""",
    # ...
)
```

### STT Provider

To switch to Deepgram:

```python
from livekit.plugins import deepgram
stt = deepgram.STT()
```

---

## Development

* FastAPI runs with auto-reload
* Code changes automatically restart the server

To test functionality, open:
`http://localhost:8000/static/index.html`

---

## Production Deployment

Steps for production setup:

1. Use a production LiveKit server
2. Configure proper CORS settings
3. Separate environment configs
4. Set up logging and monitoring
5. Use a WSGI server like Gunicorn

```bash
gunicorn webrtc_server:app -w 4 -k uvicorn.workers.UvicornWorker
```
