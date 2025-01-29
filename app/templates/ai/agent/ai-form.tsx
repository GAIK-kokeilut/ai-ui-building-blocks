"use client";
import { AIState, answerWithTool } from "@/ai/actions/generate-text";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useActionState } from "react";
import { ExampleButton, SubmitButton } from "./buttons";

const EXAMPLE_QUERIES = [
  {
    title: "Sää",
    query: "Kerro Helsingin sää nyt ja huomisen ennuste",
  },
  {
    title: "Uutiset",
    query: "Kerro 3 tärkeintä uutista Suomesta tältä päivältä",
  },
  {
    title: "Haaga-Helia",
    query: "Kerro Haaga-Helian koulutustarjonnasta ja hakuajoista",
  },
];

const initialState: AIState = {};

export function AIForm() {
  /*
  Käytetään `useActionState`-hookia, mutta helpommalla pääsee yleensä tekemällä oman API reitin.
  Server Actioneissa on omia rajoituksia osittain minkälaista dataa voit lähettää ja missä muodossa.
  Tämä kuitenkin "Nykyaikainen" tapa tehdä asioita ja toimii hyvin yksinkertaisissa tapauksissa.
  */
  const [state, formAction, isPending] = useActionState(
    answerWithTool,
    initialState,
  );

  return (
    <Card
      className={cn(
        "p-10 bg-slate-100",
        isPending && "opacity-50 pointer-events-none",
      )}
    >
      {/* Esimerkkikysymykset */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Esimerkki kysymyksiä</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {EXAMPLE_QUERIES.map((example) => (
            <form key={example.title} action={formAction}>
              <ExampleButton title={example.title} query={example.query} />
            </form>
          ))}
        </div>
      </div>

      {/* Kysymyslomake */}
      <div className="my-8">
        <h2 className="text-xl font-semibold mb-4">Kysy AI:lta</h2>
        <form action={formAction} className="flex gap-4">
          <input
            disabled={isPending}
            type="text"
            name="query"
            placeholder="Kirjoita kysymyksesi..."
            className="flex-1 p-2 border rounded shadow-sm"
            required
          />
          <SubmitButton />
        </form>
      </div>

      {/* Vastaus */}
      {state?.error ? (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <p className="text-red-700">{state.error}</p>
        </div>
      ) : (
        state?.text && (
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="prose max-w-none">{state.text}</div>

            {state.metadata?.groundingMetadata?.webSearchQueries && (
              <div className="mt-4 pt-4 border-t">
                <h3 className="font-medium mb-2">Käytetyt haut:</h3>
                <ul className="list-disc pl-5">
                  {state.metadata.groundingMetadata.webSearchQueries.map(
                    (query: string, i: number) => (
                      <li key={i} className="text-sm text-gray-600">
                        {query}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}
          </div>
        )
      )}
    </Card>
  );
}
