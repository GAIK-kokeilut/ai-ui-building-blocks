import { openai } from "@ai-sdk/openai";
import { experimental_wrapLanguageModel as wrapLanguageModel } from "ai";
import { ragMiddleware } from "./rag-middleware";

export const customModel = wrapLanguageModel({
  model: openai("gpt-4o-2024-11-20"),
  middleware: ragMiddleware,
});

// TODO: Lisää muita malleja mitä yleisesti käytät esim embeddings,
// export const embeddings = new OpenAIEmbeddings({
//   openAIApiKey: process.env.OPENAI_API_KEY,
//   modelName: "text-embedding-3-small",
//   dimensions: 1536,
// });
