/*
Notice chatbot model is wrapped with custom middleware in this snippet.
*/
import { customModel } from "@/ai/middleware";
import { streamText } from "ai";

export async function POST(request: Request) {
  const { messages } = await request.json();
  console.log("Messages:", messages);

  const result = streamText({
    model: customModel,
    system:
      "Olet ystävällinen avustaja! Pidä vastauksesi ytimekkäinä ja avuliaana.",
    messages: messages,
    // tools: {
    //   getWeather: tool({
    //     description: "Get weather",
    //     parameters: z.object({
    //       location: z.string().describe("The city to get weather for"),
    //     }),
    //     execute: async ({ location }) => {
    //       console.log("Tool called with location:", location);
    //       return { temp: 20, location };
    //     },
    //   }),
    // },
    // toolChoice: "auto",
    // maxSteps: 2,
    // onFinish: (result) => {
    //   console.log("Final result:", result);
    // },
  });

  return result.toDataStreamResponse({});
}
