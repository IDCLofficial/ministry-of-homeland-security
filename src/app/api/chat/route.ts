import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { message } = (await req.json()) as { message: string };

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: message },
      ],
    });

    return NextResponse.json({
      reply: completion.choices[0].message?.content ?? "",
    });
  } catch (error) {
    console.error("Chat API error:", error);

    // Safely infer type without `any`
    const errMsg =
      error instanceof Error
        ? error.message
        : "Something went wrong";

    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
