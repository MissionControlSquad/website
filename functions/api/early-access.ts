interface Env {
  RESEND_API_KEY: string;
  RESEND_SEGMENT_ID: string;
  NOTIFY_EMAIL?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { email } = body;

  if (!email || typeof email !== "string") {
    return Response.json({ error: "Email is required" }, { status: 400 });
  }

  const { RESEND_API_KEY, RESEND_SEGMENT_ID, NOTIFY_EMAIL } = env;

  if (!RESEND_API_KEY || !RESEND_SEGMENT_ID) {
    return Response.json({ error: "Server configuration error" }, { status: 500 });
  }

  const headers = {
    Authorization: `Bearer ${RESEND_API_KEY}`,
    "Content-Type": "application/json",
  };

  // Create contact via Resend API
  const createRes = await fetch("https://api.resend.com/contacts", {
    method: "POST",
    headers,
    body: JSON.stringify({
      email,
      unsubscribed: false,
    }),
  });

  if (!createRes.ok) {
    return Response.json({ error: "Failed to process signup" }, { status: 500 });
  }

  // Add contact to segment
  await fetch(`https://api.resend.com/contacts/segments/${RESEND_SEGMENT_ID}`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email }),
  });

  // Send thank-you email to the subscriber
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers,
    body: JSON.stringify({
      from: "AgentCenter <dharmendra@agentcenter.cloud>",
      to: email,
      subject: "Thanks for signing up for early access!",
      headers: {
        "List-Unsubscribe": `<mailto:dharmendra@agentcenter.cloud?subject=unsubscribe&body=Please%20unsubscribe%20${encodeURIComponent(email)}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
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
            <a href="https://x.com/AgentsCenter" style="color: #1a8cd8; text-decoration: none; font-weight: 500;">@AgentsCenter on X</a>
          </p>
          <br />
          <p>— Dharmik Jagodana, Founder of AgentCenter</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="font-size: 12px; color: #999; line-height: 1.5;">
            You received this email because you signed up for early access at agentcenter.cloud.<br />
            Jagodana LLC · agentcenter.cloud<br />
            <a href="mailto:dharmendra@agentcenter.cloud?subject=unsubscribe&body=Please%20unsubscribe%20${encodeURIComponent(email)}" style="color: #999;">Unsubscribe</a> ·
            <a href="https://agentcenter.cloud/legal/privacy-policy" style="color: #999;">Privacy Policy</a>
          </p>
        </div>
      `,
    }),
  });

  // Send notification email to owner
  if (NOTIFY_EMAIL) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers,
      body: JSON.stringify({
        from: "AgentCenter <dharmendra@agentcenter.cloud>",
        to: NOTIFY_EMAIL,
        subject: "New early access signup",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>New Early Access Signup</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Time:</strong> ${new Date().toISOString()}</p>
          </div>
        `,
      }),
    });
  }

  return Response.json({ success: true });
};
