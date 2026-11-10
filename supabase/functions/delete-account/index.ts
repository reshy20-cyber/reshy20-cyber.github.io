// HAYATI — delete-account
// Deletes the signed-in user's cloud backup and their account. Called from the app (Settings → Delete account).
// Uses SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY, which Supabase provides to every Edge Function automatically.
import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const jwt = (req.headers.get("Authorization") ?? "").replace(/^Bearer\s+/i, "");
    const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data, error } = await admin.auth.getUser(jwt);
    if (error || !data.user) return json({ ok: false, error: "not signed in" }, 401);
    const id = data.user.id;
    const del = await admin.from("hayati_data").delete().eq("user_id", id);
    if (del.error) throw del.error;
    const gone = await admin.auth.admin.deleteUser(id);
    if (gone.error) throw gone.error;
    return json({ ok: true });
  } catch (e) {
    console.error(e);
    return json({ ok: false, error: String((e as Error).message ?? e) }, 500);
  }
});
