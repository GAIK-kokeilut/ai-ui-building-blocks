"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useChat } from "ai/react";
import { MessageCircle, RefreshCw, X } from "lucide-react";
import { useState } from "react";

const QUESTIONS = {
  category: {
    question: "What can I help you with today?",
    options: ["Order Issues", "Product Information", "Shipping", "Returns"],
  },
  details: {
    question: "Could you provide more details?",
    options: ["Need agent help", "Show FAQ", "Other issue"],
  },
};

const INITIAL_MESSAGES = [
  {
    id: "chatbot",
    role: "assistant" as const,
    content:
      "Hello! How can I assist you today? Please select from the options below.",
  },
];

interface CustomerSupportChatbotProps {
  className?: string;
}

export default function CustomerSupportChatbot({
  className,
}: CustomerSupportChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { messages, append, setMessages } = useChat({
    initialMessages: INITIAL_MESSAGES,
  });

  const handleOptionClick = async (selection: string) => {
    await append({
      role: "user",
      content: selection,
    });
  };

  const handleStartOver = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <div className={cn(className, "z-50")}>
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 bg-primary text-primary-foreground hover:bg-primary/90"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      ) : (
        <div className="bg-background border rounded-lg shadow-lg w-80 sm:w-96 flex flex-col h-[32rem]">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-semibold">Customer Support</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <ScrollArea className="flex-grow p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "mb-4",
                  message.role === "user" ? "text-right" : "text-left",
                )}
              >
                <div
                  className={cn(
                    "inline-block p-2 rounded-lg",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted",
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="grid grid-cols-2 gap-2 mt-4">
                {QUESTIONS.category.options.map((option) => (
                  <Button
                    key={option}
                    variant="outline"
                    className="text-left h-auto whitespace-normal"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}

            {messages.length > 2 && (
              <div className="mt-4 text-center">
                <Button onClick={handleStartOver} className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Start Over
                </Button>
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
