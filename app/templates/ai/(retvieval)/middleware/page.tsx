"use client";

import { Message } from "@/components/ai/chatbot/message";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import {
  ArrowBigRight,
  HomeIcon,
  Loader2,
  RotateCcw,
  ScrollText,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const ChatbotPage: React.FC = () => {
  const router = useRouter();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    const container = chatContainerRef.current;
    if (container) {
      const threshold = 100;
      const isNearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        threshold;

      setShowScrollButton(!isNearBottom);
      setAutoScroll(isNearBottom);
    }
  };

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    setMessages,
  } = useChat({
    api: "/api/chat/wrapped-model",
  });

  // Scrollaa alas kun viestit muuttuvat ja autoScroll on päällä
  useEffect(() => {
    if (autoScroll) {
      scrollToBottom();
    }
  }, [messages, autoScroll]);

  // Scrollaa alas kun käyttäjä lähettää uuden viestin
  const handleFormSubmit = (e: React.FormEvent) => {
    handleSubmit(e);
    setAutoScroll(true);
    scrollToBottom();
  };

  const handleReset = () => {
    setMessages([]);
    setAutoScroll(true);
  };

  return (
    <div className="container mx-auto max-w-[45rem] mt-4 md:mt-20 px-4 md:px-0 ">
      <Card className="bg-white/90 dark:bg-zinc-900/90 shadow-xl border-zinc-200/50 dark:border-zinc-800/50">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
            <div className="flex justify-center md:justify-start order-2 md:order-1 space-x-2 ">
              <Button
                variant="outline"
                onClick={() => router.push("/#ai-section")}
              >
                <HomeIcon className="h-4 w-4" />
                <span className="ml-2">Alkuun</span>
              </Button>

              <Button
                variant="outline"
                onClick={handleReset}
                disabled={messages.length === 0 || isLoading}
              >
                <RotateCcw className="h-4 w-4" />
                <span className="ml-2">Aloita alusta</span>
              </Button>
            </div>

            <CardTitle className="text-2xl md:text-3xl font-black text-center md:text-left order-1 md:order-2 text-green-500 tracking-tight md:text-nowrap">
              Middleware - Chatbot
            </CardTitle>

            <div className="hidden md:block w-[88px] order-3" />
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <div
                ref={chatContainerRef}
                onScroll={handleScroll}
                className={cn(
                  "overflow-y-auto rounded-lg border bg-white/50 dark:bg-zinc-900/50",
                  "p-2 md:p-4 transition-all duration-300",
                  "h-[52vh] md:h-[65vh]",
                  "scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700",
                  "scrollbar-track-transparent",
                )}
              >
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-zinc-400 dark:text-zinc-600">
                    <div className="flex flex-col items-center gap-2">
                      <ScrollText className="h-8 w-8" />
                      <p className="text-sm">
                        Aloita keskustelu kirjoittamalla viesti...
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2 w-full">
                    {messages.map((message, index) => {
                      // Älä renderöi viestiä jos sisältö on tyhjä (ToolCall palauttavat aina tyhjän viestin, jos työkalauja on kutsuttu)
                      if (!message.content || message.content.trim() === "") {
                        return null;
                      }

                      return (
                        <Message
                          key={index}
                          role={message.role === "user" ? "user" : "assistant"}
                          content={message.content}
                          isLoading={isLoading && index === messages.length - 1}
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              {showScrollButton && messages.length > 0 && (
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    setAutoScroll(true);
                    scrollToBottom();
                  }}
                  className="absolute bottom-4 right-4 rounded-full shadow-lg bg-white/80 hover:bg-white"
                >
                  <ArrowBigRight className="h-4 w-4 rotate-90" />
                </Button>
              )}
            </div>

            <form
              onSubmit={handleFormSubmit}
              className="flex gap-2 bg-white dark:bg-zinc-900 p-2 rounded-lg border shadow-sm relative"
            >
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Kirjoita viestisi..."
                disabled={isLoading}
                className={cn(
                  "flex-grow pr-12 transition-opacity",
                  "focus-visible:ring-green-500/20",
                  isLoading && "opacity-70",
                )}
                aria-label="Chat viesti"
              />

              {isLoading ? (
                <Button
                  type="button"
                  onClick={() => stop()}
                  variant="destructive"
                  className="shrink-0 transition-colors hover:bg-red-600"
                >
                  <X className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline">Stop</span>
                  <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="shrink-0 transition-colors"
                  disabled={!input.trim()}
                >
                  <span className="hidden md:inline">Lähetä</span>
                  <ArrowBigRight className="h-4 w-4 md:ml-2" />
                </Button>
              )}
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatbotPage;
