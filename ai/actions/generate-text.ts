"use server";

import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { generateText as aiGenerateText } from "ai";

export async function generateText(prompt: string): Promise<string> {
  try {
    const result = await aiGenerateText({
      model: openai("gpt-4o"),
      prompt,
    });

    return result.text;
  } catch (error) {
    console.error("Error generating text:", error);
    throw new Error("Failed to generate text");
  }
}

export type AIState = {
  text?: string;
  metadata?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    groundingMetadata?: any;
  };
  error?: string;
};

// Server action ottaa AIState parametrin
export async function answerWithTool(
  _state: AIState,
  formData: FormData,
): Promise<AIState> {
  const query = formData.get("query");
  if (!query || typeof query !== "string") {
    return {
      error: "Kysymys on pakollinen",
    };
  }

  try {
    const { text, experimental_providerMetadata } = await aiGenerateText({
      model: google("gemini-2.0-flash-exp", {
        useSearchGrounding: true,
      }),
      prompt: query,
    });

    return {
      text,
      metadata: {
        groundingMetadata:
          experimental_providerMetadata?.google?.groundingMetadata,
      },
    };
  } catch (error) {
    console.error("Error generating text:", error);
    return { error: "Virhe vastauksen generoinnissa" };
  }
}
