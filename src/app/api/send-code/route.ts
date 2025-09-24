// send-code/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// store codes in memory (for demo). 
// In production: Redis / DB
const verificationCodes: Record<string, string> = {};

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  // Generate 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // Save code temporarily
  verificationCodes[email] = code;

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",   // ✅ sandbox sender
      to: "donnaogbu@gmail.com",                       // your test Gmail or Outlook
      subject: "Your Verification Code",
      html: `<p>Your code is <b>${code}</b>. It expires in 10 minutes.</p>`,
    });
    

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}

// helper for verifying code
export function verifyCode(email: string, code: string): boolean {
  return verificationCodes[email] === code;
}
