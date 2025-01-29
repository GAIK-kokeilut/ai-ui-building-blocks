"use server";
import { Document } from "@/lib/db/drizzle/schema";
import { createClient } from "@/lib/db/supabase/client";
import { openai } from "@ai-sdk/openai";
import { embed, embedMany } from "ai";

export async function addDocument(
  doc: Pick<Document, "title" | "content">,
): Promise<Document> {
  const supabase = createClient();

  try {
    const { embedding, usage } = await embed({
      model: openai.embedding("text-embedding-3-small"),
      value: `${doc.title} ${doc.content}`,
    });

    console.log(`Document embedding generated. Token usage: ${usage.tokens}`);

    const { data, error } = await supabase
      .from("documents")
      .insert({
        title: doc.title,
        content: doc.content,
        embedding,
      })
      .select()
      .single();

    if (error) throw error;
    return data as Document;
  } catch (error) {
    console.error("Error in addDocument:", error);
    throw error;
  }
}

export async function addDocuments(
  docs: Pick<Document, "title" | "content">[],
): Promise<Document[]> {
  const supabase = createClient();

  try {
    const { embeddings, usage } = await embedMany({
      model: openai.embedding("text-embedding-3-small"),
      values: docs.map((doc) => `${doc.title} ${doc.content}`),
    });

    console.log(`Batch embeddings generated. Token usage: ${usage.tokens}`);

    const documentsWithEmbeddings = docs.map((doc, i) => ({
      ...doc,
      embedding: embeddings[i],
    }));

    const { data, error } = await supabase
      .from("documents")
      .insert(documentsWithEmbeddings)
      .select();

    if (error) throw error;
    return data as Document[];
  } catch (error) {
    console.error("Error in addDocuments:", error);
    throw error;
  }
}
