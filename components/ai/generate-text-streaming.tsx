"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useChat } from "ai/react";

export default function GenerateStreamExample() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  return (
    <Card className="w-full">
      <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <CardTitle className="text-2xl">
          Generoi Tekstiä (Streaming-esimerkki)
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-4">
        <p className="text-gray-700 mb-4">
          Tämä esimerkki käyttää GPT-4o mallia tekstin striimaukseen.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Syötä aihe tai kysymys"
            className="w-full"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
          >
            {isLoading ? "Generoidaan..." : "Generoi Tekstiä"}
          </Button>
        </form>

        <div className="mt-6 space-y-4 max-h-[50vh] overflow-y-auto">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`p-4 rounded-md ${
                m.role === "assistant" ? "bg-gray-100" : "bg-blue-50"
              }`}
            >
              <h4 className="text-lg font-semibold text-green-700">
                {m.role === "assistant" ? "AI vastaus:" : "Syöte:"}
              </h4>
              <p className="mt-2 text-gray-700 whitespace-pre-wrap">
                {m.content}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
