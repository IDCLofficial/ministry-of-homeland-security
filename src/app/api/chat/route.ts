// src/app/api/chat/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Define a type for Ez.json records
interface EzRecord {
  "Full Name": string;
  LGA: string;
  Community: string;
  Village: string;
  Phone?: string;
}

// Fuzzy string similarity (Levenshtein-based ratio)
function similarity(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] =
          1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  const distance = dp[a.length][b.length];
  const maxLen = Math.max(a.length, b.length);
  return maxLen === 0 ? 1 : 1 - distance / maxLen; // 0 to 1
}

export async function POST(req: Request) {
  try {
    const { message } = (await req.json()) as { message: string };

    // 1. Load Ez.json from public/data
    const filePath = path.join(process.cwd(), "public/data/Ez.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const data: EzRecord[] = JSON.parse(raw);

    // 2. Extract keywords from the user message
    const lowerMsg = message.toLowerCase();
    const words = lowerMsg.split(/\s+/).filter((w) => w.length > 2);

    // 3. Flexible + fuzzy search
    const results = data.filter((p: EzRecord) =>
      words.some((w) => {
        const fields = [
          p["Full Name"],
          p.LGA,
          p.Community,
          p.Village,
        ].map((f) => f?.toLowerCase() ?? "");

        return fields.some(
          (field) =>
            field.includes(w) || similarity(field, w) > 0.7 // threshold
        );
      })
    );

    let context = "";
    if (results.length > 0) {
      context =
        "Here are some relevant records:\n\n" +
        results
          .slice(0, 5)
          .map(
            (r: EzRecord) =>
              `Name: ${r["Full Name"]}, LGA: ${r.LGA}, Community: ${r.Community}, Village: ${r.Village}, Phone: ${r.Phone ?? "—"}`
          )
          .join("\n");
    } else {
      context = "No matching records were found in the database.";
    }

    // 4. Send context + user message to OpenAI
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that answers based on Ez.json data. Use the records given in context to answer user queries clearly.",
        },
        { role: "user", content: `User question: ${message}\n\nContext:\n${context}` },
      ],
    });

    return NextResponse.json({
      reply: completion.choices[0].message?.content ?? "",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    const errMsg =
      error instanceof Error ? error.message : "Something went wrong";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
