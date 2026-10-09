import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { hasSupabase, supabaseUrl, supabaseAnonKey } from "@/lib/supabase/config";

// Holder Supabase (gratisnivå) våken: prosjektet pauses etter 7 dager uten trafikk.
// Kalles daglig av Vercel Cron (vercel.json). Bruker kun anon-nøkkelen; RLS gjør at
// spørringen ikke returnerer rader, men den treffer databasen og teller som aktivitet.
// Vercel sender "Authorization: Bearer $CRON_SECRET" når CRON_SECRET er satt.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (!hasSupabase) return NextResponse.json({ ok: false, error: "no supabase" }, { status: 500 });

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { error } = await supabase.from("children").select("id").limit(1);
  if (error) return NextResponse.json({ ok: false }, { status: 502 });
  return NextResponse.json({ ok: true });
}
