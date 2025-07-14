'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Room, RoomEvent, Track, RemoteTrack, createLocalAudioTrack } from 'livekit-client';
import { Mic, MicOff } from 'lucide-react';

interface RoomData {
  room_name: string;
  url: string;
  token: string;
  participant_name: string;
}

const VoiceAgent: React.FC = () => {
  const [room, setRoom] = useState<Room | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [audioLevels, setAudioLevels] = useState<number[]>([0, 0, 0, 0, 0]);
  const [isListening, setIsListening] = useState(false);
  const [agentResponse, setAgentResponse] = useState('');
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const roomNameRef = useRef(`voice-chat-${Math.random().toString(36).substring(7)}`);
  const participantNameRef = useRef(`user-${Math.random().toString(36).substring(7)}`);
  const autoConnectAttempted = useRef(false);
  const apiBaseUrl = 'http://localhost:8000';

  // Auto-connect on component mount (room setup only)
  useEffect(() => {
    if (!autoConnectAttempted.current) {
      autoConnectAttempted.current = true;
      handleAutoConnect();
    }
  }, []);

  const handleVoiceButtonPress = async () => {
    if (!isConnected) {
      // If not connected, try to connect first
      await handleAutoConnect();
      return;
    }
    
    // Toggle microphone
    await toggleMicrophone();
  };

  const handleAutoConnect = async () => {
    try {
      setConnectionStatus('connecting');
      await createAndJoinRoom();
    } catch (error) {
      console.error('Auto-connect failed:', error);
      setConnectionStatus('disconnected');
    }
  };

  const createAndJoinRoom = async () => {
    try {
      // Create room
      const createResponse = await fetch(`${apiBaseUrl}/api/v1/rooms/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room_name: roomNameRef.current })
      });
      
      if (!createResponse.ok) {
        throw new Error('Failed to create room');
      }

      // Get token
      const tokenResponse = await fetch(`${apiBaseUrl}/api/v1/tokens/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room_name: roomNameRef.current,
          participant_name: participantNameRef.current
        })
      });
      
      if (!tokenResponse.ok) {
        throw new Error('Failed to get token');
      }

      const roomData: RoomData = await tokenResponse.json();
      await connectToRoom(roomData);
      
      // Start agent
      await startAgent();
      
    } catch (error) {
      console.error('Failed to create and join room:', error);
      throw error;
    }
  };

  const connectToRoom = async (roomData: RoomData) => {
    try {
      const newRoom = new Room();
      
      // Set up room event listeners
      newRoom.on(RoomEvent.Connected, () => {
        console.log('Connected to room');
        setIsConnected(true);
        setConnectionStatus('connected');
      });
      
      newRoom.on(RoomEvent.Disconnected, () => {
        console.log('Disconnected from room');
        setIsConnected(false);
        setConnectionStatus('disconnected');
      });
      
      newRoom.on(RoomEvent.TrackSubscribed, (track: RemoteTrack) => {
        if (track.kind === Track.Kind.Audio) {
          console.log('Agent audio track received');
          const audioElement = track.attach();
          document.body.appendChild(audioElement);
          
          // Extract agent response from audio metadata if available
          setAgentResponse('Alex is responding...');
          setTimeout(() => setAgentResponse(''), 3000);
        }
      });
      
      // Connect to the room
      await newRoom.connect(roomData.url, roomData.token);
      setRoom(newRoom);
      
    } catch (error) {
      console.error('Failed to connect to room:', error);
      throw error;
    }
  };

  const startAgent = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/v1/agents/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room_name: roomNameRef.current })
      });
      
      if (!response.ok) {
        throw new Error('Failed to start agent');
      }
      
      console.log('Agent started successfully');
    } catch (error) {
      console.error('Failed to start agent:', error);
    }
  };

  const toggleMicrophone = async () => {
    if (!room) return;
    
    try {
      if (!isMicEnabled) {
        // Enable microphone
        const audioTrack = await createLocalAudioTrack();
        await room.localParticipant.publishTrack(audioTrack);
        setIsMicEnabled(true);
        
        // Start audio level monitoring
        startAudioLevelMonitoring(audioTrack.mediaStreamTrack);
      } else {
        // Disable microphone
        room.localParticipant.audioTrackPublications.forEach((pub) => {
          if (pub.track) {
            room.localParticipant.unpublishTrack(pub.track);
          }
        });
        setIsMicEnabled(false);
        stopAudioLevelMonitoring();
      }
    } catch (error) {
      console.error('Failed to toggle microphone:', error);
    }
  };

  const startAudioLevelMonitoring = (mediaStreamTrack: MediaStreamTrack) => {
    try {
      const stream = new MediaStream([mediaStreamTrack]);
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);
      
      const updateAudioLevels = () => {
        if (!analyserRef.current) return;
        
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        
        // Calculate average volume
        const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
        const normalizedLevel = Math.min(average / 128, 1);
        
        // Update 5 audio level indicators with some randomness for visual effect
        const newLevels = Array.from({ length: 5 }, (_, i) => {
          const variation = (Math.random() - 0.5) * 0.3;
          return Math.max(0, Math.min(1, normalizedLevel + variation));
        });
        
        setAudioLevels(newLevels);
        setIsListening(normalizedLevel > 0.1);
        
        animationFrameRef.current = requestAnimationFrame(updateAudioLevels);
      };
      
      updateAudioLevels();
    } catch (error) {
      console.error('Failed to start audio monitoring:', error);
    }
  };

  const stopAudioLevelMonitoring = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    analyserRef.current = null;
    setAudioLevels([0, 0, 0, 0, 0]);
    setIsListening(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAudioLevelMonitoring();
      if (room) {
        room.disconnect();
      }
    };
  }, [room]);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-8"
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="0.5" fill="%23ffffff" opacity="0.03"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>')`,
      }}
    >
      {/* Audio Level Visualization */}
      <div className="flex space-x-4 mb-12">
        {audioLevels.map((level, index) => (
          <div
            key={index}
            className={`w-16 h-32 rounded-full transition-all duration-150 ease-out ${
              isListening && isMicEnabled 
                ? 'bg-gray-800 shadow-xs' 
                : 'bg-white'
            }`}
            style={{
              opacity: isListening && isMicEnabled ? 0.6 + (level * 0.4) : 0.2,
              transform: `scaleY(${0.3 + (level * 0.7)})`,
              boxShadow: isListening && isMicEnabled 
                ? `0 0 20px rgba(75, 85, 99, ${0.3 + (level * 0.5)})` 
                : 'none'
            }}
          />
        ))}
      </div>

      {/* Agent Response Display */}
      {agentResponse && (
        <div className="max-w-2xl mx-auto mb-8 p-6 bg-black/20 backdrop-blur-sm rounded-lg border border-white/10">
          <p className="text-white text-center text-lg leading-relaxed">
            {agentResponse}
          </p>
        </div>
      )}

      {/* Connection Status */}
      <div className="mb-8">
        <div className={`px-4 py-2 rounded-full text-sm font-medium ${
          connectionStatus === 'connected' ? 'bg-green-500/20 text-green-400' :
          connectionStatus === 'connecting' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-red-500/20 text-red-400'
        }`}>
          {connectionStatus === 'connected' ? 'Connected to Alex' :
           connectionStatus === 'connecting' ? 'Connecting...' :
           'Disconnected'}
        </div>
      </div>

      {/* Microphone Button */}
      <button
        onClick={handleVoiceButtonPress}
        className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 ${
          isMicEnabled 
            ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/25' 
            : 'bg-white hover:bg-gray-100 shadow-lg shadow-white/25'
        } ${connectionStatus === 'connecting' ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
      >
        {isMicEnabled ? (
          <MicOff className="w-8 h-8 text-white" />
        ) : (
          <Mic className="w-8 h-8 text-gray-800" />
        )}
      </button>

      {/* Instructions */}
      <div className="mt-8 text-center">
        <p className="text-gray-600/60 text-sm">
          {!isConnected ? 'Connecting to voice agent...' :
           !isMicEnabled ? 'Click the microphone to start talking' :
           isListening ? 'Listening...' :
           'Speak to Alex'}
        </p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-4 text-white/40 text-xs flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        <span>Hosted on LiveKit Cloud</span>
      </div>
    </div>
  );
};

export default VoiceAgent;
