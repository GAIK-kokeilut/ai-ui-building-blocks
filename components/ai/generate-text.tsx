"use client";

import { generateText } from "@/ai/actions/generate-text";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";

interface TextState {
  prompt: string;
  generatedText: string;
}

const initialTextState: TextState = {
  prompt: "",
  generatedText: "",
};

export default function GenerateTextExample() {
  const [state, action, isPending] = useActionState<TextState, FormData>(
    async (prevState, formData) => {
      const prompt = formData.get("prompt") as string;
      if (!prompt) return prevState;
      const generatedText = await generateText(prompt);
      return { prompt, generatedText };
    },
    initialTextState,
  );

  return (
    <Card className="w-full">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardTitle className="text-2xl">
          Generoi Tekstiä (Tekstiesimerkki)
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-4">
        <p className="text-gray-700 mb-4">
          Tämä esimerkki käyttää generateText-funktiota luodakseen tekstiä
          annetun syötteen perusteella.
        </p>
        <form action={action} className="space-y-4">
          <Input
            type="text"
            name="prompt"
            placeholder="Syötä aihe tai kysymys"
            defaultValue={state.prompt}
            className="w-full"
          />
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-green-600 hover:to-blue-600"
          >
            {isPending ? "Generoidaan..." : "Generoi Tekstiä"}
          </Button>
        </form>
        {state.generatedText && (
          <div className="mt-6 bg-gray-100 p-4 rounded-md">
            <h4 className="text-lg font-semibold text-green-700">
              Generoitu teksti:
            </h4>
            <p className="mt-2 text-gray-700">{state.generatedText}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
