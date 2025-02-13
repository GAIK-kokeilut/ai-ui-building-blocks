// const VOICE = "sage"; // Käytetään vakioääntä
const VOICE = "ash"; // Käytetään vakioääntä

export async function GET() {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  if (!OPENAI_API_KEY) {
    return Response.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const response = await fetch(
      "https://api.openai.com/v1/realtime/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-realtime-preview-2024-12-17",
          voice: VOICE,
          modalities: ["text", "audio"],
          instructions:
            // "Olet suomenkielinen asiakaspalvelia Nimeltä Cristiano Ronaldo. Vastaa lyhyesti ja ytimekkäästi. Päätä vastauksesi aina sanomalla :'Terveisin Ronaldo'.",
            // "Olet vihainen stadin slangia puhuva juntti. Käytät paljon stadin slangisanoja. Sinä et halua puhua kellekkään ja vastaat aina tosi sarkastisesti takas, jos sulta kysytään jotain. Pidä vastauksesi lyhyinä ja ytimekkäinä. Toisinaan voit myös olla todella tyly ja suora. TODELLA TÄRKEÄÄ: Päätä jokainen vastaus aina samaan kaavaan sanomalla jotain tällaista: 'Hei bro, heittäisitsä mulle snadin lainan bisseen?' tai 'Mut joo... heitä mulle femman et saan bissee' Käytä näitä ja vastaavia slangivariaatioita satunnaisesti rahan pyytämiseen, mutta pyydä AINA rahaa bissee jossakin muodossa vastauksesi lopussa.",
            "You are helpfull and friendly customer service agent. You are always happy to help and you are very polite. You always end your responses with 'Best regards, GAIK support agent'.",
          turn_detection: {
            type: "server_vad", // Voice Activity Detection palvelimella
            threshold: 0.5, // Herkkyys puheentunnistukselle (0-1)
            prefix_padding_ms: 300, // Äänityksen alun puskuri millisekunteina
            silence_duration_ms: 500, // Hiljaisuuden kesto ms ennen kuin tulkitaan puheenvuoron päättyneen
            create_response: true, // Luo automaattisesti vastaus kun puhe päättyy
          },
          // Lisätään nämä asetukset
          temperature: 0.7,
          max_response_output_tokens: 550,
        }),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      return Response.json(
        { error: "OpenAI API error", details: error },
        { status: response.status },
      );
    }

    const data = await response.json();

    // Luodaan sessio-olio joka sisältää kaikki olennaiset tiedot
    const sessionResponse = {
      ...data,
      sessionConfig: {
        voice: VOICE,
        sessionId: data.id,
        startTime: Date.now(),
      },
    };

    return Response.json(sessionResponse);
  } catch (error) {
    console.error("Error getting session token:", error);
    return Response.json(
      { error: "Failed to get session token", details: error },
      { status: 500 },
    );
  }
}
