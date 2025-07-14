'use client';

import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { Room, RoomEvent, Track, RemoteTrack, createLocalAudioTrack } from 'livekit-client';
import { Mic, MicOff, Sun, Moon } from 'lucide-react';

interface RoomData {
  room_name: string;
  url: string;
  token: string;
  participant_name: string;
}

// Theme Context
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  
  const toggleTheme = () => {
    setIsDark(!isDark);
  };
  
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const VoiceAgent: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
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
      const createResponse = await fetch(`${apiBaseUrl}/api/v1/rooms/create-room`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ room_name: roomNameRef.current })
      });
      
      if (!createResponse.ok) {
        throw new Error('Failed to create room');
      }

      // Get token
      const tokenResponse = await fetch(`${apiBaseUrl}/api/v1/tokens/generate-token`, {
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
      const response = await fetch(`${apiBaseUrl}/api/v1/agents/start-agent`, {
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

  const themeStyles = {
    dark: {
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="0.5" fill="%23ffffff" opacity="0.03"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>')`,
      textPrimary: 'text-white',
      textSecondary: 'text-gray-400',
      cardBg: 'bg-black/20 backdrop-blur-sm border-white/10',
      footerText: 'text-white/40'
    },
    light: {
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
      backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="0.5" fill="%23000000" opacity="0.02"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>')`,
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-600',
      cardBg: 'bg-white/80 backdrop-blur-sm border-gray-200/50',
      footerText: 'text-gray-500'
    }
  };

  const currentTheme = isDark ? themeStyles.dark : themeStyles.light;

  return (
    <div 
      className={`min-h-screen flex flex-col items-center justify-center p-8 transition-all duration-700 ease-in-out ${currentTheme.textPrimary}`}
      style={{
        background: currentTheme.background,
        backgroundImage: currentTheme.backgroundImage,
      }}
    >
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isDark 
            ? 'bg-white/10 hover:bg-white/20 text-yellow-400' 
            : 'bg-gray-900/10 hover:bg-gray-900/20 text-gray-700'
        } backdrop-blur-sm border ${
          isDark ? 'border-white/20' : 'border-gray-200/50'
        }`}
      >
        {isDark ? (
          <Sun className="w-6 h-6 transition-transform duration-300 hover:rotate-12" />
        ) : (
          <Moon className="w-6 h-6 transition-transform duration-300 hover:-rotate-12" />
        )}
      </button>

      {/* Audio Level Visualization */}
      <div className="flex space-x-3 mb-16">
        {audioLevels.map((level, index) => (
          <div
            key={index}
            className={`w-4 h-32 rounded-full transition-all duration-200 ease-out transform ${
              isListening && isMicEnabled 
                ? isDark ? 'bg-blue-400/80' : 'bg-blue-500/80'
                : isDark ? 'bg-white/20' : 'bg-gray-400/30'
            }`}
            style={{
              opacity: isListening && isMicEnabled ? 0.7 + (level * 0.3) : 0.4,
              transform: `scaleY(${0.2 + (level * 0.8)}) translateY(${(1 - level) * 10}px)`,
              boxShadow: isListening && isMicEnabled 
                ? isDark 
                  ? `0 0 25px rgba(59, 130, 246, ${0.4 + (level * 0.6)})` 
                  : `0 0 25px rgba(37, 99, 235, ${0.3 + (level * 0.5)})`
                : 'none',
              animationDelay: `${index * 50}ms`
            }}
          />
        ))}
      </div>

      {/* Agent Response Display */}
      {agentResponse && (
        <div className={`max-w-2xl mx-auto mb-12 p-8 rounded-2xl border transition-all duration-500 transform hover:scale-[1.02] ${currentTheme.cardBg}`}>
          <p className={`${currentTheme.textPrimary} text-center text-lg leading-relaxed font-medium`}>
            {agentResponse}
          </p>
        </div>
      )}

      {/* Connection Status */}
      <div className="mb-12">
        <div className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
          connectionStatus === 'connected' 
            ? 'bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/10' :
          connectionStatus === 'connecting' 
            ? 'bg-amber-500/20 text-amber-400 shadow-lg shadow-amber-500/10 animate-pulse' :
          'bg-red-500/20 text-red-400 shadow-lg shadow-red-500/10'
        }`}>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              connectionStatus === 'connected' ? 'bg-emerald-400' :
              connectionStatus === 'connecting' ? 'bg-amber-400 animate-pulse' :
              'bg-red-400'
            }`}></div>
            <span>
              {connectionStatus === 'connected' ? 'Connected to Alex' :
               connectionStatus === 'connecting' ? 'Connecting...' :
               'Disconnected'}
            </span>
          </div>
        </div>
      </div>

      {/* Microphone Button */}
      <div className="relative">
        <button
          onClick={handleVoiceButtonPress}
          className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 transform ${
            isMicEnabled 
              ? 'bg-red-500 hover:bg-red-600 shadow-2xl shadow-red-500/30 scale-110' 
              : isDark
                ? 'bg-white hover:bg-gray-100 shadow-2xl shadow-white/20'
                : 'bg-gray-900 hover:bg-gray-800 shadow-2xl shadow-gray-900/30'
          } ${connectionStatus === 'connecting' ? 'opacity-50 cursor-not-allowed' : 'hover:scale-125 active:scale-105'}`}
          disabled={connectionStatus === 'connecting'}
        >
          {isMicEnabled ? (
            <MicOff className="w-10 h-10 text-white transition-transform duration-200" />
          ) : (
            <Mic className={`w-10 h-10 transition-transform duration-200 ${
              isDark ? 'text-gray-800' : 'text-white'
            }`} />
          )}
        </button>
        
        {/* Pulse animation when listening */}
        {isListening && isMicEnabled && (
          <div className="absolute inset-0 rounded-full bg-red-500/30 animate-ping"></div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-12 text-center">
        <p className={`${currentTheme.textSecondary} text-base font-medium transition-all duration-300`}>
          {!isConnected ? (
            <span className="animate-pulse">Connecting to voice agent...</span>
          ) :
           !isMicEnabled ? 'Click the microphone to start talking' :
           isListening ? (
             <span className="text-blue-400 animate-pulse">Listening...</span>
           ) :
           'Speak to Alex'}
        </p>
      </div>

      {/* Footer */}
      <div className={`absolute bottom-6 left-6 ${currentTheme.footerText} text-sm flex items-center space-x-3 transition-all duration-300`}>
        <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
        <span className="font-medium">Hosted on LiveKit Cloud</span>
      </div>
    </div>
  );
};

// Main component wrapper with theme provider
const VoiceAgentWithTheme: React.FC = () => {
  return (
    <ThemeProvider>
      <VoiceAgent />
    </ThemeProvider>
  );
};

export default VoiceAgentWithTheme;
