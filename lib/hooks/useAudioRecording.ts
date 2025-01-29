import { useCallback, useRef, useState } from "react";

interface AudioRecorderHookReturn {
  isRecording: boolean;
  isProcessing: boolean;
  startRecording: () => void;
  stopRecording: () => Promise<Blob | null>;
  error: string | null;
  resetError: () => void;
}

const MIN_AUDIO_SIZE = 15000; // Noin 1.5 sekunnin äänitys (15KB)

export function useAudioRecorder(): AudioRecorderHookReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const startRecording = useCallback(async () => {
    try {
      setError(null);
      chunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      setError("Mikrofonin käyttöoikeus evätty tai tekninen virhe.");
      console.error("Recording error:", err);
    }
  }, []);

  const stopRecording = useCallback(async (): Promise<Blob | null> => {
    if (!mediaRecorderRef.current || !isRecording) {
      return null;
    }

    try {
      setIsProcessing(true);
      const recorder = mediaRecorderRef.current;

      return new Promise((resolve) => {
        recorder.onstop = () => {
          const audioBlob = new Blob(chunksRef.current, {
            type: "audio/webm;codecs=opus",
          });
          chunksRef.current = [];
          setIsRecording(false);
          setIsProcessing(false);

          if (audioBlob.size < MIN_AUDIO_SIZE) {
            setError(
              "Äänitys on liian lyhyt. Yritä uudelleen pidempää äänitystä.",
            );
            resolve(null);
            return;
          }

          resolve(audioBlob);
        };

        recorder.stop();
        recorder.stream.getTracks().forEach((track) => track.stop());
      });
    } catch (err) {
      setError("Virhe äänityksen pysäytyksessä.");
      setIsProcessing(false);
      console.error("Stop recording error:", err);
      return null;
    }
  }, [isRecording]);

  return {
    isRecording,
    isProcessing,
    startRecording,
    stopRecording,
    error,
    resetError,
  };
}
