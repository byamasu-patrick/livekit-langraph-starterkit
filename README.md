# 🎤 WebRTC Voice Agent with Alex

A modern, full-stack voice agent system featuring real-time WebRTC communication, intelligent conversation routing, and high-quality text-to-speech. Meet **Alex**, your AI voice assistant powered by LangGraph, LiveKit, and ElevenLabs.

## ✨ Features

### 🎙️ **Voice Interaction**
- **Real-time WebRTC**: Low-latency voice communication through the browser
- **Speech Recognition**: Automatic speech-to-text conversion
- **ElevenLabs TTS**: Premium text-to-speech with natural voice output
- **Audio Visualization**: Dynamic audio level indicators with dark mode

### 🤖 **Intelligent Agent (Alex)**
- **LangGraph Integration**: Sophisticated conversation flow management
- **Weather Assistance**: Dedicated weather information and advice capabilities
- **General Conversation**: Helpful responses for various topics and questions
- **Smart Routing**: Automatic classification and routing of user queries
- **Centralized Prompts**: Consistent personality and capabilities across all interactions

### 🏗️ **Modern Architecture**
- **FastAPI Backend**: High-performance Python API server
- **Next.js Frontend**: Modern React-based user interface with TypeScript
- **LiveKit Cloud**: Scalable WebRTC signaling and media relay
- **Automated UX**: Streamlined room creation and connection flow

## 🚀 Quick Start

### Prerequisites
- **Python 3.11+** (for LangGraph compatibility)
- **Node.js 18+** (for Next.js frontend)
- **LiveKit Cloud Account** (or local LiveKit server)
- **API Keys**: OpenAI, ElevenLabs

### 🔧 Backend Setup (Python)

#### 1. Install Dependencies
```bash
cd python
pip install -e .
# or using poetry
poetry install
```

#### 2. Environment Configuration
Create `.env` file in the `python/` directory:

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
LANGSMITH_PROJECT=LanggraLivekit
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

### 🎨 Frontend Setup (Next.js)

#### 1. Install Dependencies
```bash
cd frontend
pnpm install
```

#### 2. Start Development Server
```bash
pnpm run dev
```

The frontend will be available at `http://localhost:3000`

### 🔗 Service Architecture

Once everything is running, you'll have:
- **Frontend**: `http://localhost:3000` (Next.js UI)
- **FastAPI Server**: `http://localhost:8000` (Room management, tokens)
- **LangGraph Server**: `http://localhost:2024` (Agent logic)
- **Pipeline Worker**: Background process (Voice processing)
- **LiveKit**: Cloud service (WebRTC signaling)

## 🎯 Usage

### 🌐 Web Interface

1. **Open the App**: Navigate to `http://localhost:3000`
2. **Connect**: Click the white microphone button to connect
3. **Start Talking**: The button turns red when active - start speaking!
4. **Watch Audio Bars**: Dark animated bars show your voice levels
5. **Listen to Alex**: Hear responses through your speakers/headphones

### 💬 Example Conversations

**Try these with Alex:**
- "Hi Alex, what's your name?"
- "What can you help me with today?"
- "What's the weather like in New York?"
- "Tell me about the weather patterns in summer"
- "Can you give me some general advice?"

### 🎨 UI Features

- **Audio Visualization**: 5 dynamic bars that respond to your voice
- **Dark Mode**: Elegant dark gradient background with subtle texture
- **Connection Status**: Clear indicators (Connected/Connecting/Disconnected)
- **Responsive Design**: Works on desktop and mobile browsers
- **Automated Flow**: Room creation and joining handled automatically

### 🔌 API Endpoints

The FastAPI backend (`http://localhost:8000`) provides these endpoints:

#### Create Room
```http
POST /create-room
Content-Type: application/json

{
  "room_name": "voice-chat-abc123"  // optional, auto-generated if not provided
}
```

#### Get Join Token
```http
POST /token
Content-Type: application/json

{
  "room_name": "voice-chat-abc123",
  "participant_name": "user-xyz789"  // optional, auto-generated if not provided
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

**Note**: The frontend automatically handles all API calls - you don't need to call these manually.

## 🏗️ Architecture

### 📦 Components

#### Frontend (Next.js + TypeScript)
- **VoiceAgentClean.tsx**: Main React component with audio visualization
- **LiveKit Client**: WebRTC connection and audio streaming
- **Tailwind CSS**: Modern, responsive UI styling
- **Audio Context**: Real-time audio level monitoring

#### Backend (Python)
- **webrtc_server.py**: FastAPI server for room/token management
- **llm/pipeline.py**: LiveKit pipeline worker for voice processing
- **llm/agent.py**: LangGraph conversation logic with Alex personality
- **llm/prompt.py**: Centralized prompt management
- **langgraph_livekit_agents/**: Custom adapter for LangGraph integration

### 🔄 Voice Processing Flow

```
🎤 User Speech → LiveKit STT → LangGraph Agent → ElevenLabs TTS → 🔊 Audio Output
```

1. **Speech Capture**: Browser microphone → LiveKit WebRTC
2. **Speech-to-Text**: LiveKit's built-in STT processing
3. **Intent Routing**: LangGraph supervisor classifies weather vs. general queries
4. **Agent Processing**: 
   - Weather queries → Weather node (location extraction + advice)
   - General queries → Other node (conversation + assistance)
5. **Text-to-Speech**: ElevenLabs premium voice synthesis
6. **Audio Playback**: LiveKit WebRTC → Browser speakers

### 🤖 Alex's Intelligence

**LangGraph State Machine:**
```
Supervisor → Weather Node (weather queries)
           → Other Node (general conversation)
```

**Capabilities:**
- **Weather Assistance**: Seasonal advice, location-based tips
- **General Conversation**: Helpful responses, explanations, advice
- **Smart Routing**: Automatic classification of user intent
- **Consistent Personality**: Centralized prompts ensure Alex's character

## 🔧 Troubleshooting

### Common Issues

#### "Connection Failed" or "Token Error"
- **Check Backend**: Ensure FastAPI server is running on `http://localhost:8000`
- **Check Environment**: Verify `.env` file has correct LiveKit credentials
- **Check Network**: Ensure no firewall blocking WebRTC connections

#### "No Agent Response" or "Alex Not Responding"
- **Check Pipeline Worker**: Ensure `python llm/pipeline.py dev` is running
- **Check LangGraph Server**: Ensure `langgraph dev` is running on port 2024
- **Check Logs**: Look for errors in pipeline worker terminal
- **Check API Keys**: Verify OpenAI and ElevenLabs keys in `.env`

#### "Audio Not Working" or "Can't Hear Alex"
- **Check Browser Permissions**: Allow microphone access
- **Check Audio Output**: Ensure speakers/headphones are working
- **Check ElevenLabs**: Verify `ELEVEN_API_KEY` is correct
- **Try Different Browser**: Chrome/Edge work best for WebRTC

#### "Import Errors" or "Module Not Found"
- **Check Python Version**: Requires Python 3.11+
- **Reinstall Dependencies**: `cd python && pip install -e .`
- **Check Virtual Environment**: Ensure you're in the correct venv

### Debug Tips

- **Enable Verbose Logging**: Check terminal outputs for detailed error messages
- **Test API Endpoints**: Use `curl` or Postman to test backend endpoints
- **Check Browser Console**: F12 → Console for frontend errors
- **Verify Services**: Ensure all 4 services are running (Frontend, FastAPI, LangGraph, Pipeline)

## 🚀 What's Next?

### Potential Enhancements
- **Real Weather API**: Integrate live weather data (OpenWeatherMap, etc.)
- **More Agent Capabilities**: Add calendar, email, or other tools
- **Voice Customization**: Multiple ElevenLabs voices
- **Multi-language Support**: Support for different languages
- **Mobile App**: React Native or Flutter implementation
- **Voice Commands**: Wake word detection

### Contributing

This project demonstrates a complete voice agent implementation with modern web technologies. Feel free to extend Alex's capabilities or improve the UI/UX!

---

**Built with ❤️ using:**
- 🎤 **LiveKit** for WebRTC
- 🤖 **LangGraph** for conversation logic  
- 🗣️ **ElevenLabs** for premium TTS
- ⚡ **FastAPI** for backend API
- ⚛️ **Next.js** for modern frontend
- 🎨 **Tailwind CSS** for beautiful UI

1. **LiveKit Connection Failed**: Ensure LiveKit server is running on port 7880
2. **Agent Not Responding**: Check that LangGraph server is running on port 2024
3. **No Audio**: Check browser microphone permissions
4. **TTS Not Working**: Verify ELEVENLABS_API_KEY is set correctly

### Logs

Check the console output for detailed logging information. The server logs will show:
- Room creation and management
- WebRTC connection status
- Agent initialization
- Voice processing pipeline status

## Customization

### Voice Selection

You can customize the ElevenLabs voice by modifying the `VoiceAssistant` class:

```python
# Use a specific voice ID
tts = elevenlabs.TTS(voice_id="CwhRBWXzGAHq8TQ4Fs17")
```

### Agent Instructions

Modify the agent instructions in the `VoiceAssistant` class:

```python
super().__init__(
    instructions="""
        Your custom instructions here...
    """,
    # ... other parameters
)
```

### STT Provider

You can switch to Deepgram STT by changing the import in `webrtc_server.py`:

```python
from livekit.plugins import deepgram
# ...
stt = deepgram.STT()
```

## Development

### Running in Development Mode

The FastAPI server runs with auto-reload enabled by default. Any changes to the code will automatically restart the server.

### Testing

Use the web interface at `http://localhost:8000/static/index.html` to test the voice agent functionality.

## Production Deployment

For production deployment:

1. Use a production LiveKit server
2. Configure proper CORS origins
3. Use environment-specific configuration
4. Set up proper logging and monitoring
5. Use a production WSGI server like Gunicorn

```bash
gunicorn webrtc_server:app -w 4 -k uvicorn.workers.UvicornWorker
```
