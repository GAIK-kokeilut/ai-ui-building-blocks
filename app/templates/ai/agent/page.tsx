import { checkGoogleAPIKey } from "@/lib/utils";
import { AIForm } from "./ai-form";

export default async function AIAgentsPage() {
  const apiCheck = await checkGoogleAPIKey();

  if (!apiCheck.isValid) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <h3 className="text-red-800 font-medium">API-virhe</h3>
          <p className="text-red-700 mt-2">{apiCheck.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">AI Agentti</h1>
      <AIForm />
    </div>
  );
}
