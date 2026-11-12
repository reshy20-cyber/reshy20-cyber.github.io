// sanaa-photo — the photo assistant of صنعة (app.sanaa).
// The app sends up to 3 small JPEG photos (base64), the craft and a description. Only Premium users get an answer:
// a Google Play purchase token (checked through the shared verify-purchase function) or the Play review code.
// The photos go to the AI model for this one answer and are not stored.
//
// Secrets to add in Supabase → Edge Functions → Secrets:
//   ANTHROPIC_API_KEY = an API key from console.anthropic.com (required; without it the app shows "not ready yet")
//   ANTHROPIC_MODEL   = (optional) model id, default below

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

const SKU = "sanaa_premium";
// SHA-256 of the review code given to Google Play reviewers (App access); the same hash is in the app.
const REVIEW_HASH = "5a7a58f74c8ee278e332a0952f4a53a634189ca543c93ce8bc3c0fcb67ce5314";
const MAX_IMAGES = 3;
const MAX_B64 = 2_000_000; // per photo (~1.5 MB); the app sends ~150–400 KB
const PER_DAY = 40; // answers per user per day (best effort, per server instance)

const okTokens = new Map<string, number>(); // token → valid until (ms)
const counts = new Map<string, { day: string; n: number }>();

async function sha256(s: string) {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function isPremium(token: unknown, code: unknown): Promise<string | null> {
  if (typeof code === "string" && code && (await sha256(code.trim().toUpperCase())) === REVIEW_HASH) return "review";
  if (typeof token !== "string" || !token) return null;
  const until = okTokens.get(token);
  if (until && until > Date.now()) return token;
  const base = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
  const r = await fetch(`${base}/functions/v1/verify-purchase`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: key, Authorization: `Bearer ${key}` },
    body: JSON.stringify({ purchaseToken: token, sku: SKU }),
  });
  const d = await r.json().catch(() => null);
  if (d && d.valid) {
    okTokens.set(token, Date.now() + 6 * 3600_000);
    return token;
  }
  return null;
}

const SYSTEM = `أنت مساعد خبير في تطبيق «صنعة» يساعد الحرفيين (النجارة، السباكة، الكهرباء، البناء والتشطيبات) على فهم مشكلة من صور ووصف.
اكتب بالعربية الفصحى المبسطة، بنص عادي دون Markdown أو رموز تنسيق، وبالعناوين التالية بالترتيب، كل عنوان في سطر مستقل متبوعًا بنقاط قصيرة تبدأ بـ «- »:
ما يظهر في الصور
الأسباب المحتملة
خطوات الفحص
الإصلاح المقترح والمواد
متى تستدعي مختصًا مرخّصًا
تنبيهات السلامة
قواعد مهمة:
- كن عمليًا ومحددًا، وقل بوضوح إن لم تكن الصور كافية واطلب صورة أو معلومة محددة.
- هذا تقييم أولي من صور وليس فحصًا ميدانيًا؛ لا تجزم بتشخيص.
- الكهرباء: لا تقترح أي عمل على دائرة موصولة بالكهرباء، ولا تحدد مقاس كابل أو قاطع للتنفيذ؛ وجّه لفني كهرباء مرخّص في أي عمل داخل اللوحة أو التمديدات.
- الغاز: عند أي اشتباه بتسرب غاز اطلب إخلاء المكان وعدم تشغيل أي مفتاح والاتصال بالطوارئ، ولا تقترح إصلاحًا ذاتيًا.
- الإنشائيات: الشروخ في الأعمدة أو الكمرات أو الأسقف أو الجدران الحاملة تحتاج مهندسًا إنشائيًا.
- إذا لم تكن الصور لمشكلة حرفية، قل ذلك باختصار.
- لا تتجاوز 350 كلمة.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "POST only" }, 405);
  const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
  if (!apiKey) return json({ error: "not_configured" }, 503);
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return json({ error: "bad" }, 400); }
  const images = Array.isArray(body.images) ? body.images.slice(0, MAX_IMAGES) : [];
  const desc = typeof body.desc === "string" ? body.desc.slice(0, 1200).trim() : "";
  const craft = typeof body.craft === "string" ? body.craft.slice(0, 40) : "";
  if (!images.length || !desc || images.some((x) => typeof x !== "string" || x.length > MAX_B64 || !/^[A-Za-z0-9+/=\s]+$/.test(x.slice(0, 200)))) {
    return json({ error: "bad" }, 400);
  }
  const who = await isPremium(body.purchaseToken, body.reviewCode).catch(() => null);
  if (!who) return json({ error: "premium" }, 402);

  const day = new Date().toISOString().slice(0, 10);
  const c = counts.get(who);
  const n = c && c.day === day ? c.n : 0;
  if (n >= PER_DAY) return json({ error: "busy" }, 429);
  counts.set(who, { day, n: n + 1 });

  const content = [
    ...images.map((data) => ({ type: "image", source: { type: "base64", media_type: "image/jpeg", data: (data as string).replace(/\s/g, "") } })),
    { type: "text", text: `الحرفة: ${craft || "غير محددة"}\nوصف المشكلة من الحرفي: ${desc}` },
  ];
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": apiKey, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({
        model: Deno.env.get("ANTHROPIC_MODEL") || "claude-sonnet-5-5",
        max_tokens: 1400,
        system: SYSTEM,
        messages: [{ role: "user", content }],
      }),
    });
    const d = await r.json();
    if (!r.ok) {
      console.error("AI error", r.status, JSON.stringify(d).slice(0, 500));
      return json({ error: r.status === 429 || r.status === 529 ? "busy" : "bad" }, r.status === 429 || r.status === 529 ? 429 : 502);
    }
    const text = (d.content || []).filter((b: { type: string }) => b.type === "text").map((b: { text: string }) => b.text).join("\n").trim();
    if (!text) return json({ error: "bad" }, 502);
    return json({ text });
  } catch (e) {
    console.error(e);
    return json({ error: "bad" }, 502);
  }
});
