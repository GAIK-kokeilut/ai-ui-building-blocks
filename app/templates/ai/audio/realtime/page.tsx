"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useWebRTC } from "@/hooks/useWebRTC";
import { Loader2, Mic, MicOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const RealtimeChat = () => {
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    isConnecting,
    isMicActive,
    isResponding,
    error,
    sendMessage,
    toggleMicrophone,
    retryConnection,
  } = useWebRTC();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isConnecting) return;
    await sendMessage(inputText);
    setInputText("");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader className="space-y-2">
        <div className="flex flex-row items-center justify-between">
          <CardTitle>OpenAI Realtime Chat</CardTitle>
          {isConnecting && (
            <>
              <p>Connecting...</p>
              <Loader2 className="h-4 w-4 animate-spin" />
            </>
          )}
        </div>
        <div className="text-sm text-gray-500 border-t pt-2">
          <p>Kustannusarvio per minuutti keskustelua:</p>
          <ul className="text-xs mt-1">
            <li>Puhe sisään: ~0.08$ (150 sanaa)</li>
            <li>Puhe ulos: ~0.16$ (150 sanaa)</li>
            <li>Teksti & konteksti: ~0.01$</li>
            <li className="font-semibold">Yhteensä: ~0.25$ (0,23€) / min</li>
          </ul>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {error && (
            <div className="bg-red-100 text-red-800 p-3 rounded-lg flex justify-between items-center">
              <span>{error}</span>
              <Button variant="outline" size="sm" onClick={retryConnection}>
                Retry
              </Button>
            </div>
          )}

          <div className="h-96 overflow-y-auto space-y-2 p-4 border rounded">
            {messages.map((msg, idx) => (
              <div
                key={`${msg.id || idx}`}
                className={`p-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-100 ml-8 text-blue-900"
                    : "bg-gray-100 mr-8 text-gray-900"
                }`}
              >
                {msg.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
            {messages.length === 0 && (
              <div className="text-center text-gray-500">
                Start a conversation!
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleMicrophone}
              disabled={isConnecting}
              className={`transition-colors ${
                isMicActive ? "bg-red-100 hover:bg-red-200" : ""
              }`}
            >
              {isMicActive ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && handleSendMessage()
              }
              placeholder={
                isConnecting ? "Connecting..." : "Type your message..."
              }
              className="flex-1"
              disabled={isConnecting}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isConnecting || !inputText.trim()}
              className="relative"
            >
              {isResponding ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Responding...
                </>
              ) : (
                "Send"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealtimeChat;
