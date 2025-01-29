/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from "react";

interface Message {
  id?: string;
  role: "user" | "assistant";
  content: string;
}

interface SessionConfig {
  voice: string;
  sessionId: string;
  startTime: number;
}

export function useWebRTC() {
  // States
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionConfig, setSessionConfig] = useState<SessionConfig | null>(
    null,
  );
  const [isResponding, setIsResponding] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);

  // Refs
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const activeResponseRef = useRef<string | null>(null);
  const currentItemRef = useRef<string | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const cleanup = useCallback(() => {
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    dcRef.current?.close();
    pcRef.current?.close();
    audioRef.current?.remove();

    [mediaStreamRef, dcRef, pcRef, audioRef].forEach(
      (ref) => (ref.current = null),
    );
    setSessionConfig(null);
  }, []);

  const sendEvent = useCallback((event: any) => {
    if (dcRef.current?.readyState === "open") {
      try {
        dcRef.current.send(JSON.stringify(event));
      } catch (error) {
        console.error("Error sending event:", error);
        setError("Failed to send message");
      }
    } else {
      setError("Connection not ready. Please try again.");
    }
  }, []);

  const handleMessage = useCallback((message: any) => {
    console.log("Received message:", message);

    switch (message.type) {
      case "conversation.item.created":
        if (
          message.item.role === "assistant" &&
          message.item.content?.[0]?.text
        ) {
          setMessages((prev) => [
            ...prev,
            {
              id: message.item.id,
              role: "assistant",
              content: message.item.content[0].text,
            },
          ]);
          currentItemRef.current = message.item.id;
        }
        break;

      case "response.done":
        setIsResponding(false);
        activeResponseRef.current = null;
        break;

      case "input_audio_buffer.speech_started":
        cancelActiveResponse();
        break;

      case "input_audio_buffer.speech_stopped":
        sendEvent({ type: "input_audio_buffer.clear" });
        break;

      case "error":
        console.error("OpenAI error:", message.error);
        setError(`Error: ${message.error.message}`);
        break;
    }
  }, []);

  const cancelActiveResponse = useCallback(() => {
    if (!activeResponseRef.current && !isResponding) return;

    sendEvent({
      type: "response.cancel",
      response_id: activeResponseRef.current,
    });

    sendEvent({
      type: "input_audio_buffer.clear",
    });

    if (currentItemRef.current) {
      sendEvent({
        type: "conversation.item.truncate",
        item_id: currentItemRef.current,
        content_index: 0,
        audio_end_ms: audioRef.current?.currentTime
          ? Math.floor(audioRef.current.currentTime * 1000)
          : 0,
      });
    }

    setIsResponding(false);
    activeResponseRef.current = null;
    currentItemRef.current = null;
  }, [isResponding, sendEvent]);

  const setupDataChannel = useCallback(() => {
    if (!dcRef.current) return;

    dcRef.current.onopen = () => setError(null);
    dcRef.current.onmessage = (e) => {
      try {
        handleMessage(JSON.parse(e.data));
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    };
    dcRef.current.onerror = () => setError("Connection error occurred");
    dcRef.current.onclose = () => console.log("Data channel closed");
  }, [handleMessage]);

  const initializeConnection = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      cleanup();

      // Fetch token
      const tokenResponse = await fetch("/api/session");
      if (!tokenResponse.ok) {
        const error = await tokenResponse.json();
        throw new Error(error.error || "Failed to get session token");
      }

      const data = await tokenResponse.json();
      setSessionConfig(data.sessionConfig);

      // Setup WebRTC
      pcRef.current = new RTCPeerConnection();

      // Setup audio
      audioRef.current = document.createElement("audio");
      audioRef.current.autoplay = true;
      pcRef.current.ontrack = (e) => {
        if (audioRef.current) {
          audioRef.current.srcObject = e.streams[0];
        }
      };

      // Handle connection state changes
      pcRef.current.oniceconnectionstatechange = () => {
        if (pcRef.current?.iceConnectionState === "disconnected") {
          setError("Connection lost. Attempting to reconnect...");
          cleanup();
          setTimeout(initializeConnection, 1000);
        }
      };

      // Setup media stream
      try {
        mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
        mediaStreamRef.current.getTracks().forEach((track) => {
          pcRef.current?.addTrack(track, mediaStreamRef.current!);
        });
      } catch (mediaError) {
        console.warn("Media access failed:", mediaError);
      }

      // Setup data channel and connection
      dcRef.current = pcRef.current.createDataChannel("oai-events");
      setupDataChannel();

      const offer = await pcRef.current.createOffer();
      await pcRef.current.setLocalDescription(offer);

      const sdpResponse = await fetch(
        `https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17`,
        {
          method: "POST",
          body: offer.sdp,
          headers: {
            Authorization: `Bearer ${data.client_secret.value}`,
            "Content-Type": "application/sdp",
          },
        },
      );

      if (!sdpResponse.ok) {
        throw new Error("Failed to establish WebRTC connection");
      }

      const answer = {
        type: "answer" as RTCSdpType,
        sdp: await sdpResponse.text(),
      };

      await pcRef.current.setRemoteDescription(answer);
      setError(null);
    } catch (error) {
      console.error("Connection error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to initialize connection",
      );
      setTimeout(initializeConnection, 2000);
    } finally {
      setIsConnecting(false);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isConnecting || !sessionConfig) return;

    try {
      cancelActiveResponse();
      const messageId = `msg_${Date.now()}`;
      const responseId = `resp_${Date.now()}`;

      // Send message
      sendEvent({
        type: "conversation.item.create",
        event_id: messageId,
        item: {
          id: messageId,
          type: "message",
          role: "user",
          content: [{ type: "text", text }],
        },
      });

      // Update local state
      setMessages((prev) => [
        ...prev,
        { id: messageId, role: "user", content: text },
      ]);
      setIsResponding(true);
      activeResponseRef.current = responseId;

      // Request response
      sendEvent({
        type: "response.create",
        event_id: responseId,
        response: {
          temperature: 0.7,
          max_response_output_tokens: 200,
        },
      });
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message");
      setIsResponding(false);
    }
  };

  const toggleMicrophone = async () => {
    try {
      if (isMicActive) {
        cancelActiveResponse();
        mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
        setIsMicActive(false);
        return;
      }

      mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      mediaStreamRef.current.getTracks().forEach((track) => {
        pcRef.current?.addTrack(track, mediaStreamRef.current!);
      });

      setIsMicActive(true);
      setError(null);
    } catch (error) {
      console.error("Microphone error:", error);
      setError("Failed to access microphone");
    }
  };

  useEffect(() => {
    initializeConnection();
    return cleanup;
  }, [cleanup]);

  return {
    messages,
    isConnecting,
    isMicActive,
    isResponding,
    error,
    sessionConfig,
    sendMessage,
    toggleMicrophone,
    retryConnection: initializeConnection,
  };
}
