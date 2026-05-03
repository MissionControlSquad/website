// Web Crypto API JWT — compatible with Cloudflare Workers runtime (no Node.js required)

function base64url(input: ArrayBuffer | string): string {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : new Uint8Array(input);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function padBase64(s: string): string {
  return s + "=".repeat((4 - (s.length % 4)) % 4);
}

export async function verifyJWT(
  token: string,
  secret: string
): Promise<Record<string, unknown> | null> {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [header, payload, signature] = parts;
  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    const sigBin = atob(padBase64(signature.replace(/-/g, "+").replace(/_/g, "/")));
    const sigBytes = new Uint8Array(sigBin.length);
    for (let i = 0; i < sigBin.length; i++) sigBytes[i] = sigBin.charCodeAt(i);
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      new TextEncoder().encode(`${header}.${payload}`)
    );
    if (!valid) return null;
    const payloadJson = atob(padBase64(payload.replace(/-/g, "+").replace(/_/g, "/")));
    const parsed = JSON.parse(payloadJson) as Record<string, unknown>;
    if (typeof parsed.exp === "number" && parsed.exp < Date.now() / 1000) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function createJWT(
  payload: Record<string, unknown>,
  secret: string,
  expiresInSeconds = 7 * 24 * 60 * 60
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64url(JSON.stringify({ ...payload, iat: now, exp: now + expiresInSeconds }));
  const signingInput = `${header}.${body}`;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signingInput));
  return `${signingInput}.${base64url(sig)}`;
}
