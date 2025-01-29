import GenerateNoSchemaExample from "@/components/ai/generate-no-schema";
import GenerateObjectExample from "@/components/ai/generate-object";
import GenerateTextExample from "@/components/ai/generate-text";
import GenerateStreamExample from "@/components/ai/generate-text-streaming";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Vercel AI SDK 4.0 Esimerkit</h1>
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-8">
        <p className="mt-2">
          Tämä sovellus esittelee erilaisia tapoja käyttää Vercel AI SDK:ta AI
          toimintojen toteuttamiseen web-sovelluksissa. Esimerkit käyttävät sekä
          API-reittejä että Next.js Server Actions -ominaisuutta.
          Streaming-esimerkki käyttää API-reittiä (/api/chat), kun taas muut
          esimerkit hyödyntävät Server Actions -toiminnallisuutta, jotka
          sijaitsevat `app/actions` -hakemistossa.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GenerateTextExample />
        <GenerateStreamExample />
      </div>
      <div></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <GenerateObjectExample />
        <GenerateNoSchemaExample />
      </div>
    </div>
  );
}
