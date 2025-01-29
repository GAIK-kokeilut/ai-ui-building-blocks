"use client";

import { Template } from "@/lib/types/template";
import { Bot, Database, MessageSquare, Mic, VenetianMask } from "lucide-react";
import AnimatedText from "../animated-text";
import { TemplateCard } from "./template-card";

export const aiTemplates: Template[] = [
  {
    title: "Teksti & Objektit",
    description:
      "Tekstin generointi ja strukturoidun datan luonti hyödyntäen striimaus",
    icon: <MessageSquare className="w-6 h-6" />,
    route: "/templates/ai/text",
    tags: ["Chat", "Streaming", "LLM"],
    link: true,
    subTemplates: [
      {
        title: "Text Generation",
        description: "Tekstin generointi streamauksella",
        route: "/templates/ai/text#text-text",
      },
      {
        title: "Structured Output",
        description: "Strukturoidun datan generointi",
        route: "/templates/ai/text#text-object",
      },
    ],
  },
  {
    title: "AI Chatbotit",
    description: "LLM Chatbotit",
    icon: <Bot className="w-6 h-6" />,
    route: "/templates/ai/chatbot",
    tags: ["AI", "Chat", "LLM"],
    subTemplates: [
      {
        title: "Markdown Chatbot",
        description: "Perus chatbot striimauksella",
        route: "/templates/ai/chatbot/basic",
      },
      {
        title: "Popup Chatbot",
        description:
          "Kuvakkeesta avautuva chattibotti sivun alareunassa (simppeli toteutus)",
        route: "/templates/ai/chatbot/popup",
      },
    ],
  },
  {
    title: "Puhe & Audio",
    description: "Speech-to-text ja text-to-speech ratkaisut",
    icon: <Mic className="w-6 h-6" />,
    route: "/templates/ai/audio",
    tags: ["Audio", "Speech", "Conversion"],
    subTemplates: [
      {
        title: "Speech-to-Text",
        description: "Puheen muuntaminen tekstiksi",
        route: "/templates/ai/audio#speech-text",
      },
      {
        title: "Text-to-Speech",
        description: "Tekstin muuntaminen puheeksi",
        route: "/templates/ai/audio#text-speech",
      },
      {
        title: "Realtime Chat",
        description: "OpenAI Realtime API chat",
        route: "/templates/ai/audio/realtime",
      },
    ],
  },
  {
    title: "AI Agentit",
    description: "Function calling ja työkaluintegraatiot",
    icon: <VenetianMask className="w-6 h-6" />,
    route: "/templates/ai/agent",
    link: true,
    tags: ["Agentit", "Tools", "Function Calling"],
    subTemplates: [
      {
        title: "LLM malli Google haulla",
        description: "Gemini Google haku",
        route: "/templates/ai/agent#google-agent",
      },
    ],
  },
  {
    title: "RAG & Retrieval",
    description: "Tietokantahaut ja embeddingin käyttö",
    icon: <Database className="w-6 h-6" />,
    route: "/templates/ai/rag",
    tags: ["RAG", "Embeddings", "Haku"],
    subTemplates: [
      {
        title: "Semantic Search",
        description: "Embedding-pohjainen haku",
        route: "/templates/ai/rag/",
      },
      {
        title: "Middleware",
        description: "Chatbot viestin luokittelu kerroksella",
        route: "/templates/ai/middleware",
      },
    ],
  },
];

export function AICards() {
  return (
    <div id="ai-section" className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <AnimatedText
            text="AI Template Galleria"
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500"
          />
          <AnimatedText
            text="Vercel AI SDK:lla toteutetut tekoälykomponentit ja -integraatiot"
            className="text-xl text-muted-foreground dark:text-gray-400 max-w-2xl mx-auto"
            delay={0.2}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {aiTemplates.map((template) => (
            <TemplateCard key={template.title} template={template} />
          ))}
        </div>
      </div>
    </div>
  );
}
