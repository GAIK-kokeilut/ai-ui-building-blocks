"use client";

import { generateRecipe } from "@/ai/actions/generate-recipe";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActionState } from "react";

interface Recipe {
  nimi: string;
  ainekset: string[];
  ohjeet: string[];
}

const initialRecipe: Recipe = {
  nimi: "",
  ainekset: [],
  ohjeet: [],
};

const schemaExample = `
schema: z.object({
  nimi: z.string().describe("Reseptin nimi"),
  ainekset: z.array(z.string()).describe("Lista ainesosista"),
  ohjeet: z.array(z.string()).describe("Lista valmistusohjeista"),
})
`;

export default function GenerateObjectExample() {
  const [state, action, isPending] = useActionState<Recipe>(
    generateRecipe,
    initialRecipe,
  );

  return (
    <Card className="w-full">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        <CardTitle className="text-2xl">
          Generoi Resepti (Objektiesimerkki)
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-4">
        <div className="space-y-4">
          <p className="text-gray-700">
            Tämä esimerkki käyttää generateObject-funktiota luodakseen
            strukturoidun reseptiobjektin. Resepti generoidaan ennalta
            määritetyn skeeman perusteella, joka määrittelee reseptin rakenteen.
          </p>
          <div className="bg-gray-100 p-4 rounded-md">
            <h4 className="text-lg font-semibold mb-2">Käytetty skeema:</h4>
            <pre className="bg-white p-3 rounded-md overflow-x-auto text-sm">
              <code>{schemaExample}</code>
            </pre>
          </div>
          <p className="text-gray-700">
            Tämä skeema määrittelee, että reseptillä on nimi (string), lista
            ainesosista (array of strings), ja lista valmistusohjeista (array of
            strings).
          </p>
          <form action={action}>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {isPending ? "Generoidaan..." : "Generoi Resepti"}
            </Button>
          </form>
        </div>
        {state.nimi && (
          <div className="mt-6 bg-gray-100 p-4 rounded-md">
            <h3 className="text-xl font-semibold text-purple-700">
              {state.nimi}
            </h3>
            <h4 className="text-lg font-semibold mt-2 text-pink-700">
              Ainekset:
            </h4>
            <ul className="list-disc list-inside text-gray-700">
              {state.ainekset.map((aines, index) => (
                <li key={index}>{aines}</li>
              ))}
            </ul>
            <h4 className="text-lg font-semibold mt-2 text-pink-700">
              Ohjeet:
            </h4>
            <ol className="list-decimal list-inside text-gray-700">
              {state.ohjeet.map((ohje, index) => (
                <li key={index}>{ohje}</li>
              ))}
            </ol>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
