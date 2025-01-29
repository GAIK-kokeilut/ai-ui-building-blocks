"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAudioRecorder } from "@/lib/hooks/useAudioRecording";
import { AlertCircle, Loader2, Mic, StopCircle } from "lucide-react";
import { useState, useTransition } from "react";

type ProcessResult = {
  transcribedText: string;
  aiResponse: string;
  audioUrl: string;
};

export default function AudioChat() {
  const {
    isRecording,
    isProcessing: isRecordingProcessing,
    startRecording,
    stopRecording,
    error: recordingError,
    resetError,
  } = useAudioRecorder();

  const [result, setResult] = useState<ProcessResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleStartRecording = () => {
    setError(null);
    resetError();
    setResult(null);
    startRecording();
  };

  const handleStopRecording = async () => {
    const audioBlob = await stopRecording();
    // Mikäli äänitys on liian lyhyt, audioBlob on asetettu useAudioRecorder hookissa nulliksi ja ei jatketa
    if (!audioBlob) return;

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append(
          "audio",
          new File([audioBlob], "audio.webm", {
            type: "audio/webm",
          }),
        );

        const response = await fetch("/api/process-audio", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Virhe käsittelyssä");
        }

        const data = await response.json();
        setResult(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Tuntematon virhe");
      }
    });
  };

  const isLoading = isRecordingProcessing || isPending;
  const currentError = recordingError || error;

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Keskustele Tekoälyn Kanssa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              disabled={isLoading}
              variant={isRecording ? "destructive" : "default"}
              className="w-48 flex items-center gap-2"
            >
              {isRecording ? (
                <>
                  <StopCircle className="h-5 w-5" />
                  {isLoading ? "Käsitellään..." : "Lopeta Nauhoitus"}
                </>
              ) : (
                <>
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Mic className="h-5 w-5" />
                  )}
                  {isLoading ? "Käsitellään..." : "Aloita Nauhoitus"}
                </>
              )}
            </Button>
          </div>

          {currentError && (
            <Alert variant="destructive" className="animate-in fade-in-0">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{currentError}</AlertDescription>
            </Alert>
          )}

          {result?.transcribedText && !currentError && (
            <Card className="bg-muted">
              <CardHeader>
                <CardTitle className="text-sm">Sinun viestisi:</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{result.transcribedText}</p>
              </CardContent>
            </Card>
          )}

          {result?.aiResponse && !currentError && (
            <Card className="bg-primary/5">
              <CardHeader>
                <CardTitle className="text-sm">Tekoälyn vastaus:</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{result.aiResponse}</p>
              </CardContent>
            </Card>
          )}

          {result?.audioUrl && !currentError && (
            <div className="pt-4">
              <audio
                controls
                key={result.audioUrl}
                src={result.audioUrl}
                className="w-full"
                preload="auto"
                onError={(e) => {
                  console.error("Audio playback error:", e);
                  setError("Virhe äänen toistossa");
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
