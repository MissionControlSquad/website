// ── Disposable / temp email domains ──────────────────────────────────────────
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "guerrillamail.info",
  "guerrillamail.net",
  "guerrillamail.org",
  "guerrillamail.de",
  "guerrillamailblock.com",
  "tempmail.com",
  "temp-mail.org",
  "tempmail.net",
  "tempmail.io",
  "10minutemail.com",
  "10minutemail.net",
  "10minutemail.org",
  "10minutemail.co.uk",
  "20minutemail.com",
  "throwaway.email",
  "throwam.com",
  "yopmail.com",
  "yopmail.fr",
  "cool.fr.nf",
  "jetable.fr.nf",
  "nospam.ze.tc",
  "nomail.xl.cx",
  "mega.zik.dj",
  "speed.1s.fr",
  "courriel.fr.nf",
  "moncourrier.fr.nf",
  "trashmail.com",
  "trashmail.me",
  "trashmail.net",
  "trashmail.org",
  "trashmail.io",
  "trashmail.at",
  "trashmail.xyz",
  "sharklasers.com",
  "grr.la",
  "spam4.me",
  "spamgourmet.com",
  "spamgourmet.net",
  "spamgourmet.org",
  "spambox.us",
  "spamfree24.org",
  "spammotel.com",
  "spam.la",
  "maildrop.cc",
  "mailnull.com",
  "mailscrap.com",
  "mailexpire.com",
  "mailbucket.org",
  "dispostable.com",
  "discard.email",
  "fakeinbox.com",
  "filzmail.com",
  "mytemp.email",
  "tempinbox.com",
  "tempr.email",
  "trbvm.com",
  "getairmail.com",
  "antispam24.de",
  "spamgap.com",
  "vomoto.com",
  "zzrgg.com",
  "minutemailbox.com",
  "mohmal.com",
  "getnada.com",
  "owlpic.com",
  "crazymailing.com",
  "boun.cr",
  "fleckens.hu",
  "kurzepost.de",
  "objectmail.com",
  "obobbo.com",
  "wegwerfmail.de",
  "wegwerfmail.net",
  "wegwerfmail.org",
  "armyspy.com",
  "cuvox.de",
  "dayrep.com",
  "einrot.com",
  "gustr.com",
  "jourrapide.com",
  "rhyta.com",
  "superrito.com",
  "teleworm.us",
  "inboxkitten.com",
  "tempail.com",
  "emailondeck.com",
  "mintemail.com",
]);

// ── Helpers ───────────────────────────────────────────────────────────────────
function supabaseHeaders(key: string) {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
}

// SHA-256(salt:ip) — raw IPs are never stored
async function hashIP(ip: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function isDisposable(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase() ?? "";
  return DISPOSABLE_DOMAINS.has(domain);
}

function isValidEmailFormat(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254;
}

const DOT_INSENSITIVE_DOMAINS = new Set(["gmail.com", "googlemail.com"]);

function normalizeEmail(raw: string): string {
  const lower = raw.trim().toLowerCase().slice(0, 254);
  const [local, domain] = lower.split("@");
  if (!local || !domain) return lower;
  const strippedPlus = local.split("+")[0];
  const strippedDots = DOT_INSENSITIVE_DOMAINS.has(domain)
    ? strippedPlus.replace(/\./g, "")
    : strippedPlus;
  return `${strippedDots}@${domain}`;
}

async function verifyTurnstile(token: string, secret: string): Promise<boolean> {
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, response: token }),
  });
  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}

// Returns true if this IP hash has already submitted — permanently, no time window.
async function ipAlreadySubmitted(
  supabaseUrl: string,
  key: string,
  ipHash: string
): Promise<boolean> {
  const res = await fetch(
    `${supabaseUrl}/rest/v1/pricing_drop_signups?ip_hash=eq.${encodeURIComponent(ipHash)}&select=id&limit=1`,
    { headers: supabaseHeaders(key) }
  );
  if (!res.ok) return false; // fail open — don't block if the check itself fails
  const rows = (await res.json()) as unknown[];
  return rows.length > 0;
}

interface Env {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_KEY: string;
  IP_HASH_SALT?: string;
  TURNSTILE_SECRET_KEY?: string;
}

// ── GET /api/pricing-drop → { count: number } ────────────────────────────────
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { SUPABASE_URL, SUPABASE_SERVICE_KEY } = context.env;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return Response.json({ error: "Server misconfigured" }, { status: 500 });
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_pricing_drop_count`, {
      method: "POST",
      headers: supabaseHeaders(SUPABASE_SERVICE_KEY),
      body: "{}",
    });
    if (!res.ok) throw new Error(await res.text());
    const count = await res.json();
    return Response.json({ count: Number(count) });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
};

// ── POST /api/pricing-drop ────────────────────────────────────────────────────
export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const {
    SUPABASE_URL,
    SUPABASE_SERVICE_KEY,
    IP_HASH_SALT = "pricing-drop-v1",
    TURNSTILE_SECRET_KEY,
  } = env;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    return Response.json({ error: "Server misconfigured" }, { status: 500 });
  }

  // ── Parse body ─────────────────────────────────────────────────────────────
  let body: { email?: string; honeypot?: string; turnstileToken?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // ── Honeypot — bots fill this, humans never see it ────────────────────────
  if (body.honeypot) {
    return Response.json({ success: true, count: 0 }); // silent fake success
  }

  const { email, turnstileToken } = body;

  if (!email || typeof email !== "string") {
    return Response.json({ error: "Email is required" }, { status: 400 });
  }

  // ── IP check — one submission per IP, permanently ─────────────────────────
  const clientIP = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const ipHash = await hashIP(clientIP, IP_HASH_SALT);

  const alreadySubmitted = await ipAlreadySubmitted(SUPABASE_URL, SUPABASE_SERVICE_KEY, ipHash);
  if (alreadySubmitted) {
    return Response.json(
      { error: "This device has already been registered for the experiment." },
      { status: 409 }
    );
  }

  // ── Turnstile verification ─────────────────────────────────────────────────
  if (TURNSTILE_SECRET_KEY) {
    if (!turnstileToken) {
      return Response.json({ error: "Human verification required" }, { status: 400 });
    }
    const valid = await verifyTurnstile(turnstileToken, TURNSTILE_SECRET_KEY);
    if (!valid) {
      return Response.json({ error: "Verification failed. Please try again." }, { status: 400 });
    }
  }

  // ── Email validation ───────────────────────────────────────────────────────
  const originalEmail = email.trim().slice(0, 254);
  const normalizedEmail = normalizeEmail(email);

  if (!isValidEmailFormat(normalizedEmail)) {
    return Response.json({ error: "Invalid email address" }, { status: 400 });
  }

  if (isDisposable(normalizedEmail)) {
    return Response.json({ error: "Disposable email addresses are not allowed." }, { status: 400 });
  }

  // ── Insert ─────────────────────────────────────────────────────────────────
  // resolution=ignore-duplicates handles the edge case where two requests
  // arrive simultaneously from the same IP before the check above completes.
  const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/pricing_drop_signups`, {
    method: "POST",
    headers: {
      ...supabaseHeaders(SUPABASE_SERVICE_KEY),
      Prefer: "return=minimal,resolution=ignore-duplicates",
    },
    body: JSON.stringify({
      email: originalEmail,
      email_normalized: normalizedEmail,
      ip_hash: ipHash,
    }),
  });

  if (!insertRes.ok) {
    console.error("Supabase insert error:", insertRes.status, await insertRes.text());
    return Response.json({ error: "Failed to save. Please try again." }, { status: 500 });
  }

  // ── Return updated count ───────────────────────────────────────────────────
  const countRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_pricing_drop_count`, {
    method: "POST",
    headers: supabaseHeaders(SUPABASE_SERVICE_KEY),
    body: "{}",
  });

  const count = countRes.ok ? Number(await countRes.json()) : 0;
  return Response.json({ success: true, count });
};
