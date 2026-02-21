interface Env {
  RESEND_API_KEY: string;
  RESEND_SEGMENT_ID: string;
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

  const { RESEND_API_KEY, RESEND_SEGMENT_ID } = env;

  if (!RESEND_API_KEY || !RESEND_SEGMENT_ID) {
    return Response.json({ error: "Server configuration error" }, { status: 500 });
  }

  // Create contact via Resend API directly (no SDK in CF Workers)
  const createRes = await fetch("https://api.resend.com/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
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
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return Response.json({ success: true });
};
