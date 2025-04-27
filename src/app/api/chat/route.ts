import { getInformationsFromJson } from "@/utils";
import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { z } from "zod";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4"),
    messages,
    toolCallStreaming: true,
    system: `You are a helpful and professional virtual assistant for Ashoka Hospital.
    IMPORTANT: For ANY question about hospital information, you MUST:
    1. Use the getInformations tool to fetch the data
    2. Wait for the tool's response
    3. Present the exact markdown table or information returned
    4. Add a polite acknowledgment before the data
    
    Never make up information or skip using the tool.
    If the tool returns "No specific information found", politely say you don't have that information.`,
    tools: {
      getInformations: tool({
        description:
          "REQUIRED tool to get hospital information. Must be used for ALL queries about hospital details, timings, services, etc.",
        parameters: z.object({
          query: z.string().describe("The exact user question"),
        }),
        execute: async ({ query }) => {
          const result = getInformationsFromJson(query);

          return result;
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
