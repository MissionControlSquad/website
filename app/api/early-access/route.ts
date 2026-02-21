import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const segmentId = process.env.RESEND_SEGMENT_ID;
  const notifyEmail = process.env.NOTIFY_EMAIL;

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
    console.error("Error creating contact:", contactError);
    return NextResponse.json({ error: "Failed to process signup" }, { status: 500 });
  }

  // Add contact to segment
  try {
    await resend.contacts.segments.add({ email, segmentId });
  } catch (error) {
    console.error("Error adding contact to segment:", error);
    return NextResponse.json({ error: "Failed to process signup" }, { status: 500 });
  }

  // Send thank you email to the subscriber
  const { error: thankYouError } = await resend.emails.send({
    from: "AgentCenter <hello@agentcenter.cloud>",
    to: email,
    subject: "Thanks for signing up for early access!",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
        <h2 style="color: #111;">Welcome to AgentCenter!</h2>
        <p>Thanks for signing up for early access. We're excited to have you on board.</p>
        <p>We'll keep you updated as we get closer to launch. In the meantime, check out our website to learn more about what we're building:</p>
        <p style="margin: 16px 0;">
          <a href="https://agentcenter.cloud" style="display: inline-block; background: #111; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 500;">Visit AgentCenter</a>
        </p>
        <p>Follow me on X (Twitter) for the latest updates and behind-the-scenes progress:</p>
        <p style="margin: 16px 0;">
          <a href="https://x.com/dharmikjagodana" style="color: #1a8cd8; text-decoration: none; font-weight: 500;">@dharmikjagodana on X</a>
        </p>
        <br />
        <p>— Dharmik Jagodana, Founder of AgentCenter</p>
      </div>
    `,
  });

  if (thankYouError) {
    console.error("Error sending thank you email:", thankYouError);
  }

  // Send notification email to ourselves
  if (notifyEmail) {
    const { error: notifyError } = await resend.emails.send({
      from: "AgentCenter <hello@agentcenter.cloud>",
      to: notifyEmail,
      subject: "New early access signup",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Early Access Signup</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        </div>
      `,
    });

    if (notifyError) {
      console.error("Error sending notification email:", notifyError);
    }
  }

  return NextResponse.json({ success: true });
}
