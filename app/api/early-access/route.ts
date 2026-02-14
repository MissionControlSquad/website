import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const segmentId = process.env.RESEND_SEGMENT_ID;

  if (!apiKey || !segmentId) {
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  // Create contact
  const { error: contactError } = await resend.contacts.create({
    email,
    unsubscribed: false,
  });

  if (contactError) {
    return NextResponse.json({ error: "Failed to process signup" }, { status: 500 });
  }

  // Add contact to segment
  await resend.contacts.segments.add({ email, segmentId });

  return NextResponse.json({ success: true });
}
