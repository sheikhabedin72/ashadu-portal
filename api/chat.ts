import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// SHOHEB.SPACE - Buildship Clone Engine
export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google('gemini-1.5-flash'),
    system: "You are the ASHADU Engine. Your job is to output JSON structures that represent Buildship nodes for the owner, SHEIKH-MOHAMMED ABEDIN.",
    messages,
  });

  return result.toDataStreamResponse();
}
