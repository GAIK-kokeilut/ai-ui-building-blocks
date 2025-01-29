import {
  bigint,
  boolean,
  jsonb,
  pgTable,
  text,
  vector,
} from "drizzle-orm/pg-core";

export const documents = pgTable("documents", {
  id: bigint({ mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  title: text(),
  content: text(),
  testField: boolean(),
  metadata: jsonb(),
  embedding: vector({ dimensions: 1536 }),
});

export type Document = typeof documents.$inferSelect;
export type SearchDocument = Document & {
  similarity: number;
};
export type NewDocument = typeof documents.$inferInsert;
