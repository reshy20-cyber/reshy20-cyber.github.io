// HAYATI — verify-purchase
// Checks a Google Play purchase token for the one-time product "hayati_premium",
// acknowledges it (required within 3 days or Google refunds it), and answers { valid: true/false }.
//
// Secrets to add in Supabase → Edge Functions → Secrets:
//   GOOGLE_SERVICE_ACCOUNT = the whole JSON key file of a Google Cloud service account
//                            that has access to your app in Google Play Console
//   PLAY_PACKAGE_NAME      = your Android package name, e.g. site.nippy.dapper_maple_73.twa

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const ALLOWED_SKUS = ["hayati_premium"];

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });
}

function b64url(data: ArrayBuffer | string) {
  const bytes = typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

let cachedToken: { value: string; exp: number } | null = null;

async function googleAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.exp > Date.now() + 60_000) return cachedToken.value;
  const sa = JSON.parse(Deno.env.get("GOOGLE_SERVICE_ACCOUNT") ?? "{}");
  if (!sa.client_email || !sa.private_key) throw new Error("GOOGLE_SERVICE_ACCOUNT secret is missing or invalid");
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(JSON.stringify({
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/androidpublisher",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  }));
  const pem = sa.private_key.replace(/-----[^-]+-----/g, "").replace(/\s+/g, "");
  const der = Uint8Array.from(atob(pem), (c) => c.charCodeAt(0));
  const key = await crypto.subtle.importKey("pkcs8", der, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(`${header}.${claim}`));
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claim}.${b64url(sig)}`,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error("Google auth failed: " + JSON.stringify(data));
  cachedToken = { value: data.access_token, exp: Date.now() + data.expires_in * 1000 };
  return data.access_token;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ valid: false, error: "POST only" }, 405);
  try {
    const { purchaseToken, sku } = await req.json();
    if (typeof purchaseToken !== "string" || !purchaseToken || !ALLOWED_SKUS.includes(sku)) {
      return json({ valid: false, error: "bad request" }, 400);
    }
    const pkg = Deno.env.get("PLAY_PACKAGE_NAME");
    if (!pkg) throw new Error("PLAY_PACKAGE_NAME secret is missing");
    const token = await googleAccessToken();
    const base = `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${encodeURIComponent(pkg)}/purchases/products/${encodeURIComponent(sku)}/tokens/${encodeURIComponent(purchaseToken)}`;
    const res = await fetch(base, { headers: { Authorization: `Bearer ${token}` } });
    if (res.status === 404 || res.status === 400 || res.status === 410) return json({ valid: false });
    const p = await res.json();
    if (!res.ok) throw new Error("Play API error: " + JSON.stringify(p));
    // purchaseState: 0 = purchased, 1 = canceled/refunded, 2 = pending
    if (p.purchaseState !== 0) return json({ valid: false, state: p.purchaseState });
    if (p.acknowledgementState === 0) {
      const ack = await fetch(`${base}:acknowledge`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: "{}",
      });
      if (!ack.ok) throw new Error("Acknowledge failed: " + (await ack.text()));
    }
    return json({ valid: true });
  } catch (e) {
    console.error(e);
    return json({ valid: false, error: String((e as Error).message ?? e) }, 500);
  }
});
