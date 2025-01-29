"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { BotIcon, UserIcon } from "lucide-react";
import { ReactNode } from "react";
import { Markdown } from "./markdown";

interface MessageProps {
  role: "user" | "assistant";
  content: string | ReactNode;
  isLoading?: boolean;
}

export const Message = ({ role, content, isLoading }: MessageProps) => {
  const isUser = role === "user";

  return (
    <motion.div
      className={cn(
        "flex gap-3 md:gap-4 px-4 w-full md:px-0",
        isUser ? "flex-row-reverse" : "flex-row",
        "first-of-type:pt-5 last:pb-5",
        isLoading && "opacity-50",
      )}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Avatar container */}
      <div
        className={cn(
          "size-8 rounded-full flex items-center justify-center flex-shrink-0",
          isUser ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600",
        )}
      >
        {isUser ? <UserIcon size={16} /> : <BotIcon size={16} />}
      </div>

      {/* Message content */}
      <div
        className={cn(
          "flex flex-col gap-2 w-full p-4 rounded-lg transition-colors",
          "shadow-sm",
          isUser
            ? "bg-green-50/80 border border-green-100/50 md:max-w-[85%] ml-auto"
            : "bg-white border border-zinc-200/50 md:max-w-[85%]",
          "dark:border-zinc-800",
          isUser ? "dark:bg-green-950/10" : "dark:bg-zinc-900/50",
        )}
      >
        {/* Role indicator */}
        <div
          className={cn(
            "text-xs font-medium",
            isUser
              ? "text-green-600 dark:text-green-400"
              : "text-blue-600 dark:text-blue-400",
          )}
        >
          {isUser ? "Sinä" : "Chatbot"}
        </div>

        {/* Markdown content */}
        <div
          className={cn(
            "text-zinc-800 dark:text-zinc-200",
            "flex flex-col gap-4",
            "tracking-tighter md:tracking-normal",
          )}
        >
          <Markdown>{content as string}</Markdown>
        </div>
      </div>
    </motion.div>
  );
};
