"use client";

import { addDocument } from "@/ai/actions/documents";
import { searchDocuments } from "@/ai/actions/search";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SearchDocument } from "@/lib/db/drizzle/schema";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function SemanticSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchDocument[]>([]);
  const [loading, startTransition] = useTransition();
  const [newDoc, setNewDoc] = useState({ title: "", content: "" });
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    startTransition(async () => {
      try {
        const searchResults = await searchDocuments(query);
        setResults(searchResults);
        setHasSearched(true);
      } catch (error) {
        console.error("Search error:", error);
        toast.error("An error occurred while searching. Please try again.");
      }
    });
  };

  const handleAddDocument = async () => {
    if (!newDoc.title.trim() || !newDoc.content.trim()) return;

    startTransition(async () => {
      try {
        await addDocument(newDoc);
        setNewDoc({ title: "", content: "" });
        toast.success("Document added successfully!");
      } catch (error) {
        console.error("Add document error:", error);
        toast.error("An error occurred while adding the document.");
      }
    });
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Search Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Hae dokumentteja</h2>
        <div className="border p-4 rounded-lg bg-gray-50  space-y-4">
          <p className="text-sm text-gray-600">
            Hae dokumentteja semanttisesti kirjoittamalla hakusana tai -lause.
            Haku löytää dokumentit myös merkityksen perusteella.
          </p>
          <p className="text-sm text-gray-600 ">
            Muista lisätä{" "}
            <span className="text-bold  text-base text-black">.env.local</span>{" "}
            tiedostoon tietokannan ympäristömuuttujat ja alustaa tietokanta
          </p>
        </div>
        <div className="flex gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Lisää hakusana..."
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? "Haetaan..." : "Hae"}
          </Button>
        </div>

        <div className="space-y-4">
          {results.map((doc) => (
            <Card key={doc.id}>
              <CardHeader>
                <CardTitle>{doc.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{doc.content}</p>
                {doc.similarity && (
                  <p className="text-sm text-gray-500 mt-2">
                    Similarity: {doc.similarity.toFixed(4)}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
          {results.length === 0 && hasSearched && !loading && (
            <p className="text-sm text-gray-500 mt-4">
              Ei hakutuloksia. Kokeile erilaista hakutermiä tai lisää ensin
              dokumentteja tietokantaan.
            </p>
          )}
        </div>
      </section>

      {/* Add Document Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Lisää dokumentti</h2>
        <p className="text-sm text-gray-600">
          Lisää uusi dokumentti tietokantaan. Dokumentti muunnetaan
          automaattisesti vektorimuotoon semanttista hakua varten.
        </p>
        <div className="space-y-4">
          <Input
            value={newDoc.title}
            onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
            placeholder="Dokumentin otsikko"
          />
          <Textarea
            value={newDoc.content}
            onChange={(e) => setNewDoc({ ...newDoc, content: e.target.value })}
            placeholder="Dokumentin sisältö"
            className="min-h-[100px]"
          />
          <Button onClick={handleAddDocument} disabled={loading}>
            Lisää dokumentti
          </Button>
        </div>
      </section>
    </div>
  );
}
