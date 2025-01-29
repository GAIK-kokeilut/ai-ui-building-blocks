import {
  generateSpeech,
  generateText,
  transcribeAudio,
} from "@/lib/audio/processing";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get("audio") as File;

    if (!audioFile) {
      return NextResponse.json(
        { error: "Äänitiedostoa ei löytynyt" },
        { status: 400 },
      );
    }

    // 1. Litteroi ääni tekstiksi
    const transcribedText = await transcribeAudio(audioFile);

    // 2. Generoi AI vastaus
    const aiResponse = await generateText(transcribedText);
    if (!aiResponse) {
      throw new Error("AI ei tuottanut vastausta");
    }

    // 3. Luo äänivastaus
    const audioUrl = await generateSpeech(aiResponse);

    return NextResponse.json({
      transcribedText,
      aiResponse,
      audioUrl,
    });
  } catch (error) {
    console.error("Error processing audio:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Virhe äänen käsittelyssä",
      },
      { status: 500 },
    );
  }
}
