import OpenAI from "openai";

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function transcribeAudio(audioFile: File): Promise<string> {
  if (!audioFile) throw new Error("Äänitiedostoa ei löytynyt");

  try {
    const response = await openaiClient.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
      language: "fi",
      prompt:
        "Tämä on suomenkielinen äänitys. Kirjoita teksti suomeksi käyttäen oikeaa kielioppia ja välimerkkejä.",
    });

    return response.text;
  } catch (error) {
    console.error("Virhe äänen litteroinnissa:", error);
    throw new Error("Äänen litterointi epäonnistui");
  }
}

export async function generateText(prompt: string): Promise<string> {
  try {
    const completion = await openaiClient.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Olet avulias tekoäly assistentti. Vastaa käyttäjän viestiin suomeksi.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return completion.choices[0].message.content || "Ei vastausta";
  } catch (error) {
    console.error("Error generating text:", error);
    throw new Error("Tekstin generointi epäonnistui");
  }
}

export async function generateSpeech(text: string): Promise<string> {
  try {
    const translation = await openaiClient.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a translator. Translate the given Finnish text to English, maintaining the tone and meaning.",
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    const englishText = translation.choices[0].message.content;

    const response = await openaiClient.audio.speech.create({
      input: englishText || text,
      voice: "nova",
      model: "tts-1-hd",
    });

    const buffer = Buffer.from(await response.arrayBuffer());
    const base64Audio = buffer.toString("base64");

    return `data:audio/mp3;base64,${base64Audio}`;
  } catch (error) {
    console.error("Virhe puheen generoinnissa:", error);
    throw new Error("Puheen generointi epäonnistui");
  }
}
