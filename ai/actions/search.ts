"use server";
import { SearchDocument } from "@/lib/db/drizzle/schema";
import { createClient } from "@/lib/db/supabase/client";
import { openai } from "@ai-sdk/openai";
import { embed } from "ai";

if (!process.env.OPENAI_API_KEY) {
  console.warn("OPENAI_API_KEY is not set in environment variables");
}

export async function searchDocuments(
  query: string,
  limit = 5,
): Promise<SearchDocument[]> {
  const supabase = createClient();
  try {
    const { embedding, usage } = await embed({
      model: openai.embedding("text-embedding-3-small"),
      value: query,
    });

    console.log(
      `Search query embedding generated. Token usage: ${usage.tokens}`,
    );
    // We are using match_documents function that we implemented from 'drizzle/functions.sql'
    const { data, error } = await supabase.rpc("match_documents", {
      query_embedding: embedding,
      match_threshold: 0, // How similar the documents should be to the query (0-1) 1 means exact match
      match_count: limit, // How many documents to return
    });

    if (error) throw error;
    return data as SearchDocument[];
  } catch (error) {
    console.error("Error in searchDocuments:", error);
    throw error;
  }
}
