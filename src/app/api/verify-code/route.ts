// verify-code/route.ts

import { NextResponse } from "next/server";
import { verifyCode } from "../send-code/route";

export async function POST(req: Request) {
  const { email, code } = await req.json();

  if (!email || !code) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  const valid = verifyCode(email, code);

  if (valid) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false, error: "Invalid code" }, { status: 400 });
}
