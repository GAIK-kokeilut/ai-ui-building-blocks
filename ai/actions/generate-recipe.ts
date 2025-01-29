"use server";

import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

export interface Recipe {
  nimi: string;
  ainekset: string[];
  ohjeet: string[];
}

export async function generateRecipe(): Promise<Recipe> {
  try {
    const result = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        nimi: z.string().describe("Reseptin nimi"),
        ainekset: z.array(z.string()).describe("Lista ainesosista"),
        ohjeet: z.array(z.string()).describe("Lista valmistusohjeista"),
      }),
      prompt: "Generoi satunnainen resepti suomeksi",
    });

    return result.object;
  } catch (error) {
    console.error("Virhe reseptin generoinnissa:", error);
    throw new Error("Reseptin generointi epäonnistui");
  }
}

export async function generateNoSchema(prompt: string) {
  try {
    const { object } = await generateObject({
      model: openai("gpt-4o"),
      output: "no-schema",
      prompt: prompt,
    });

    return object;
  } catch (error) {
    console.error("Virhe generoinnissa:", error);
    throw new Error("Generointi epäonnistui");
  }
}
