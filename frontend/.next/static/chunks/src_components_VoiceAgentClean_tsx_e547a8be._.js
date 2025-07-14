(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/VoiceAgentClean.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$livekit$2d$client$2f$dist$2f$livekit$2d$client$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/livekit-client/dist/livekit-client.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic.js [app-client] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic-off.js [app-client] (ecmascript) <export default as MicOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const useTheme = ()=>{
    _s();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
_s(useTheme, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
const ThemeProvider = ({ children })=>{
    _s1();
    const [isDark, setIsDark] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const toggleTheme = ()=>{
        setIsDark(!isDark);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            isDark,
            toggleTheme
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/VoiceAgentClean.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
};
_s1(ThemeProvider, "J2KPxrXVm08w6VpAGW6KzmFaeTI=");
_c = ThemeProvider;
const VoiceAgent = ()=>{
    _s2();
    const { isDark, toggleTheme } = useTheme();
    const [room, setRoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMicEnabled, setIsMicEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [audioLevels, setAudioLevels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        0,
        0,
        0,
        0,
        0
    ]);
    const [isListening, setIsListening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [agentResponse, setAgentResponse] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [connectionStatus, setConnectionStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('disconnected');
    const audioContextRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const analyserRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const animationFrameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const roomNameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(`voice-chat-${Math.random().toString(36).substring(7)}`);
    const participantNameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(`user-${Math.random().toString(36).substring(7)}`);
    const autoConnectAttempted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const apiBaseUrl = 'http://localhost:8000';
    // Auto-connect on component mount (room setup only)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VoiceAgent.useEffect": ()=>{
            if (!autoConnectAttempted.current) {
                autoConnectAttempted.current = true;
                handleAutoConnect();
            }
        }
    }["VoiceAgent.useEffect"], []);
    const handleVoiceButtonPress = async ()=>{
        if (!isConnected) {
            // If not connected, try to connect first
            await handleAutoConnect();
            return;
        }
        // Toggle microphone
        await toggleMicrophone();
    };
    const handleAutoConnect = async ()=>{
        try {
            setConnectionStatus('connecting');
            await createAndJoinRoom();
        } catch (error) {
            console.error('Auto-connect failed:', error);
            setConnectionStatus('disconnected');
        }
    };
    const createAndJoinRoom = async ()=>{
        try {
            // Create room
            const createResponse = await fetch(`${apiBaseUrl}/api/v1/rooms/create-room`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    room_name: roomNameRef.current
                })
            });
            if (!createResponse.ok) {
                throw new Error('Failed to create room');
            }
            // Get token
            const tokenResponse = await fetch(`${apiBaseUrl}/api/v1/tokens/generate-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    room_name: roomNameRef.current,
                    participant_name: participantNameRef.current
                })
            });
            if (!tokenResponse.ok) {
                throw new Error('Failed to get token');
            }
            const roomData = await tokenResponse.json();
            await connectToRoom(roomData);
            // Start agent
            await startAgent();
        } catch (error) {
            console.error('Failed to create and join room:', error);
            throw error;
        }
    };
    const connectToRoom = async (roomData)=>{
        try {
            const newRoom = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$livekit$2d$client$2f$dist$2f$livekit$2d$client$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Room"]();
            // Set up room event listeners
            newRoom.on(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$livekit$2d$client$2f$dist$2f$livekit$2d$client$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoomEvent"].Connected, ()=>{
                console.log('Connected to room');
                setIsConnected(true);
                setConnectionStatus('connected');
            });
            newRoom.on(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$livekit$2d$client$2f$dist$2f$livekit$2d$client$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoomEvent"].Disconnected, ()=>{
                console.log('Disconnected from room');
                setIsConnected(false);
                setConnectionStatus('disconnected');
            });
            newRoom.on(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$livekit$2d$client$2f$dist$2f$livekit$2d$client$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RoomEvent"].TrackSubscribed, (track)=>{
                if (track.kind === __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$livekit$2d$client$2f$dist$2f$livekit$2d$client$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Track"].Kind.Audio) {
                    console.log('Agent audio track received');
                    const audioElement = track.attach();
                    document.body.appendChild(audioElement);
                    // Extract agent response from audio metadata if available
                    setAgentResponse('Alex is responding...');
                    setTimeout(()=>setAgentResponse(''), 3000);
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
    const startAgent = async ()=>{
        try {
            const response = await fetch(`${apiBaseUrl}/api/v1/agents/start-agent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    room_name: roomNameRef.current
                })
            });
            if (!response.ok) {
                throw new Error('Failed to start agent');
            }
            console.log('Agent started successfully');
        } catch (error) {
            console.error('Failed to start agent:', error);
        }
    };
    const toggleMicrophone = async ()=>{
        if (!room) return;
        try {
            if (!isMicEnabled) {
                // Enable microphone
                const audioTrack = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$livekit$2d$client$2f$dist$2f$livekit$2d$client$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLocalAudioTrack"])();
                await room.localParticipant.publishTrack(audioTrack);
                setIsMicEnabled(true);
                // Start audio level monitoring
                startAudioLevelMonitoring(audioTrack.mediaStreamTrack);
            } else {
                // Disable microphone
                room.localParticipant.audioTrackPublications.forEach((pub)=>{
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
    const startAudioLevelMonitoring = (mediaStreamTrack)=>{
        try {
            const stream = new MediaStream([
                mediaStreamTrack
            ]);
            audioContextRef.current = new AudioContext();
            const source = audioContextRef.current.createMediaStreamSource(stream);
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 256;
            source.connect(analyserRef.current);
            const updateAudioLevels = ()=>{
                if (!analyserRef.current) return;
                const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
                analyserRef.current.getByteFrequencyData(dataArray);
                // Calculate average volume
                const average = dataArray.reduce((sum, value)=>sum + value, 0) / dataArray.length;
                const normalizedLevel = Math.min(average / 128, 1);
                // Update 5 audio level indicators with some randomness for visual effect
                const newLevels = Array.from({
                    length: 5
                }, (_, i)=>{
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
    const stopAudioLevelMonitoring = ()=>{
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
        analyserRef.current = null;
        setAudioLevels([
            0,
            0,
            0,
            0,
            0
        ]);
        setIsListening(false);
    };
    // Cleanup on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VoiceAgent.useEffect": ()=>{
            return ({
                "VoiceAgent.useEffect": ()=>{
                    stopAudioLevelMonitoring();
                    if (room) {
                        room.disconnect();
                    }
                }
            })["VoiceAgent.useEffect"];
        }
    }["VoiceAgent.useEffect"], [
        room
    ]);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `min-h-screen flex flex-col items-center justify-center p-8 transition-all duration-700 ease-in-out ${currentTheme.textPrimary}`,
        style: {
            background: currentTheme.background,
            backgroundImage: currentTheme.backgroundImage
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: toggleTheme,
                className: `absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${isDark ? 'bg-white/10 hover:bg-white/20 text-yellow-400' : 'bg-gray-900/10 hover:bg-gray-900/20 text-gray-700'} backdrop-blur-sm border ${isDark ? 'border-white/20' : 'border-gray-200/50'}`,
                children: isDark ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                    className: "w-6 h-6 transition-transform duration-300 hover:rotate-12"
                }, void 0, false, {
                    fileName: "[project]/src/components/VoiceAgentClean.tsx",
                    lineNumber: 318,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                    className: "w-6 h-6 transition-transform duration-300 hover:-rotate-12"
                }, void 0, false, {
                    fileName: "[project]/src/components/VoiceAgentClean.tsx",
                    lineNumber: 320,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/VoiceAgentClean.tsx",
                lineNumber: 307,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex space-x-3 mb-16",
                children: audioLevels.map((level, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `w-4 h-32 rounded-full transition-all duration-200 ease-out transform ${isListening && isMicEnabled ? isDark ? 'bg-blue-400/80' : 'bg-blue-500/80' : isDark ? 'bg-white/20' : 'bg-gray-400/30'}`,
                        style: {
                            opacity: isListening && isMicEnabled ? 0.7 + level * 0.3 : 0.4,
                            transform: `scaleY(${0.2 + level * 0.8}) translateY(${(1 - level) * 10}px)`,
                            boxShadow: isListening && isMicEnabled ? isDark ? `0 0 25px rgba(59, 130, 246, ${0.4 + level * 0.6})` : `0 0 25px rgba(37, 99, 235, ${0.3 + level * 0.5})` : 'none',
                            animationDelay: `${index * 50}ms`
                        }
                    }, index, false, {
                        fileName: "[project]/src/components/VoiceAgentClean.tsx",
                        lineNumber: 327,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/VoiceAgentClean.tsx",
                lineNumber: 325,
                columnNumber: 7
            }, this),
            agentResponse && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `max-w-2xl mx-auto mb-12 p-8 rounded-2xl border transition-all duration-500 transform hover:scale-[1.02] ${currentTheme.cardBg}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: `${currentTheme.textPrimary} text-center text-lg leading-relaxed font-medium`,
                    children: agentResponse
                }, void 0, false, {
                    fileName: "[project]/src/components/VoiceAgentClean.tsx",
                    lineNumber: 351,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/VoiceAgentClean.tsx",
                lineNumber: 350,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${connectionStatus === 'connected' ? 'bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/10' : connectionStatus === 'connecting' ? 'bg-amber-500/20 text-amber-400 shadow-lg shadow-amber-500/10 animate-pulse' : 'bg-red-500/20 text-red-400 shadow-lg shadow-red-500/10'}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-emerald-400' : connectionStatus === 'connecting' ? 'bg-amber-400 animate-pulse' : 'bg-red-400'}`
                            }, void 0, false, {
                                fileName: "[project]/src/components/VoiceAgentClean.tsx",
                                lineNumber: 367,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: connectionStatus === 'connected' ? 'Connected to Alex' : connectionStatus === 'connecting' ? 'Connecting...' : 'Disconnected'
                            }, void 0, false, {
                                fileName: "[project]/src/components/VoiceAgentClean.tsx",
                                lineNumber: 372,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/VoiceAgentClean.tsx",
                        lineNumber: 366,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/VoiceAgentClean.tsx",
                    lineNumber: 359,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/VoiceAgentClean.tsx",
                lineNumber: 358,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleVoiceButtonPress,
                        className: `w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 transform ${isMicEnabled ? 'bg-red-500 hover:bg-red-600 shadow-2xl shadow-red-500/30 scale-110' : isDark ? 'bg-white hover:bg-gray-100 shadow-2xl shadow-white/20' : 'bg-gray-900 hover:bg-gray-800 shadow-2xl shadow-gray-900/30'} ${connectionStatus === 'connecting' ? 'opacity-50 cursor-not-allowed' : 'hover:scale-125 active:scale-105'}`,
                        disabled: connectionStatus === 'connecting',
                        children: isMicEnabled ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__["MicOff"], {
                            className: "w-10 h-10 text-white transition-transform duration-200"
                        }, void 0, false, {
                            fileName: "[project]/src/components/VoiceAgentClean.tsx",
                            lineNumber: 395,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                            className: `w-10 h-10 transition-transform duration-200 ${isDark ? 'text-gray-800' : 'text-white'}`
                        }, void 0, false, {
                            fileName: "[project]/src/components/VoiceAgentClean.tsx",
                            lineNumber: 397,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/VoiceAgentClean.tsx",
                        lineNumber: 383,
                        columnNumber: 9
                    }, this),
                    isListening && isMicEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 rounded-full bg-red-500/30 animate-ping"
                    }, void 0, false, {
                        fileName: "[project]/src/components/VoiceAgentClean.tsx",
                        lineNumber: 405,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/VoiceAgentClean.tsx",
                lineNumber: 382,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-12 text-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: `${currentTheme.textSecondary} text-base font-medium transition-all duration-300`,
                    children: !isConnected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "animate-pulse",
                        children: "Connecting to voice agent..."
                    }, void 0, false, {
                        fileName: "[project]/src/components/VoiceAgentClean.tsx",
                        lineNumber: 413,
                        columnNumber: 13
                    }, this) : !isMicEnabled ? 'Click the microphone to start talking' : isListening ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-blue-400 animate-pulse",
                        children: "Listening..."
                    }, void 0, false, {
                        fileName: "[project]/src/components/VoiceAgentClean.tsx",
                        lineNumber: 417,
                        columnNumber: 14
                    }, this) : 'Speak to Alex'
                }, void 0, false, {
                    fileName: "[project]/src/components/VoiceAgentClean.tsx",
                    lineNumber: 411,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/VoiceAgentClean.tsx",
                lineNumber: 410,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute bottom-6 left-6 ${currentTheme.footerText} text-sm flex items-center space-x-3 transition-all duration-300`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-3 h-3 bg-emerald-400 rounded-full animate-pulse"
                    }, void 0, false, {
                        fileName: "[project]/src/components/VoiceAgentClean.tsx",
                        lineNumber: 425,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-medium",
                        children: "Hosted on LiveKit Cloud"
                    }, void 0, false, {
                        fileName: "[project]/src/components/VoiceAgentClean.tsx",
                        lineNumber: 426,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/VoiceAgentClean.tsx",
                lineNumber: 424,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/VoiceAgentClean.tsx",
        lineNumber: 299,
        columnNumber: 5
    }, this);
};
_s2(VoiceAgent, "p0A/jb40PYF05auXzavs4gDQpp8=", false, function() {
    return [
        useTheme
    ];
});
_c1 = VoiceAgent;
// Main component wrapper with theme provider
const VoiceAgentWithTheme = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeProvider, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(VoiceAgent, {}, void 0, false, {
            fileName: "[project]/src/components/VoiceAgentClean.tsx",
            lineNumber: 436,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/VoiceAgentClean.tsx",
        lineNumber: 435,
        columnNumber: 5
    }, this);
};
_c2 = VoiceAgentWithTheme;
const __TURBOPACK__default__export__ = VoiceAgentWithTheme;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ThemeProvider");
__turbopack_context__.k.register(_c1, "VoiceAgent");
__turbopack_context__.k.register(_c2, "VoiceAgentWithTheme");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_components_VoiceAgentClean_tsx_e547a8be._.js.map