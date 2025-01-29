"use client";

import { generateNoSchema } from "@/ai/actions/generate-recipe";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";

interface NoSchemaState {
  prompt: string;
  result: string;
}

const initialNoSchemaState: NoSchemaState = {
  prompt: "",
  result: "",
};

export default function GenerateNoSchemaExample() {
  const [state, action, isPending] = useActionState<NoSchemaState, FormData>(
    async (prevState, formData) => {
      const prompt = formData.get("prompt") as string;
      if (!prompt) return prevState;
      const result = await generateNoSchema(prompt);
      return { prompt, result: JSON.stringify(result, null, 2) };
    },
    initialNoSchemaState,
  );

  return (
    <Card className="w-full">
      <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
        <CardTitle className="text-2xl">
          Generoi Ilman Skeemaa (Dynaaminen esimerkki)
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-4">
        <p className="text-gray-700 mb-4">
          Tämä esimerkki käyttää generateNoSchema-funktiota ilman ennalta
          määritettyä skeemaa, mikä mahdollistaa dynaamisten pyyntöjen
          käsittelyn. Syötä pyyntö alla olevaan kenttään ja katso, miten AI
          generoi vastauksen ilman ennalta määritettyä rakennetta.
        </p>
        <form action={action} className="space-y-4">
          <Input
            type="text"
            name="prompt"
            defaultValue={state.prompt}
            placeholder="Syötä pyyntö (esim. 'Generoi lasagneresepti')"
            className="w-full"
          />
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600"
          >
            {isPending ? "Generoidaan..." : "Generoi"}
          </Button>
        </form>
        {state.result && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-yellow-700">
              Generoitu tulos:
            </h4>
            <pre className="mt-2 p-4 bg-gray-100 rounded-md overflow-x-auto text-sm">
              {state.result}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
