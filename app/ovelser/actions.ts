"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { BUDDIES, GEARS } from "@/lib/buddies";
import { levelForBalls, unlockedItems } from "@/lib/gamification";
import { ACTIVE_CHILD_COOKIE } from "./constants";

const isUuid = (v: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);

// Bekreft at barnet finnes og tilhører innlogget forelder. RLS gjør selectet trygt;
// .eq(parent_id) er forsvar i dybden, likt mønsteret i app/barn.
async function ownChild(supabase: Awaited<ReturnType<typeof createClient>>, userId: string, childId: string) {
  const { data } = await supabase
    .from("children")
    .select("id,balls,buddy,gear")
    .eq("id", childId)
    .eq("parent_id", userId)
    .maybeSingle();
  return data as { id: string; balls: number; buddy: string | null; gear: string | null } | null;
}

// Velg aktivt barn (lagres i cookie, leses server-side på /ovelser).
export async function setActiveChild(formData: FormData): Promise<void> {
  const childId = String(formData.get("childId") ?? "");
  if (!isUuid(childId)) return;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  // Sett kun cookien for et barn forelderen faktisk eier.
  if (!(await ownChild(supabase, user.id, childId))) return;

  const cookieStore = await cookies();
  cookieStore.set(ACTIVE_CHILD_COOKIE, childId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  revalidatePath("/ovelser");
}

type MarkState = { error?: string; ok?: boolean; balls?: number; level?: string };

// Marker en øvelse som gjort for aktivt barn: skriv en progress-rad (én hendelse),
// tell baller på nytt, oppdater nivå, og lås opp nye kompiser/utstyr.
export async function markExerciseDone(formData: FormData): Promise<MarkState> {
  const childId = String(formData.get("childId") ?? "");
  const slug = String(formData.get("slug") ?? "").trim();
  if (!isUuid(childId) || !slug) return { error: "Mangler barn eller øvelse." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Logg inn for å lagre fremgang." };
  if (!(await ownChild(supabase, user.id, childId))) return { error: "Ukjent barn." };

  // 1) Hendelse: én rad per fullføring (repetisjoner teller). RLS bekrefter eierskap.
  const { error: insErr } = await supabase
    .from("progress")
    .insert({ child_id: childId, exercise_slug: slug });
  if (insErr) return { error: "Kunne ikke lagre. Prøv igjen." };

  // 2) Tell baller = antall fullføringer for barnet.
  const { count } = await supabase
    .from("progress")
    .select("id", { count: "exact", head: true })
    .eq("child_id", childId);
  const balls = count ?? 0;
  const level = levelForBalls(balls);

  // 3) Oppdater barnets baller + nivå.
  await supabase.from("children").update({ balls, level }).eq("id", childId);

  // 4) Lås opp nye ting: skriv kun de som ikke alt finnes i unlocks.
  const { data: existing } = await supabase
    .from("unlocks")
    .select("item")
    .eq("child_id", childId);
  const have = new Set((existing ?? []).map((u: { item: string }) => u.item));
  const toAdd = unlockedItems(balls).filter((item) => !have.has(item));
  if (toAdd.length > 0) {
    await supabase.from("unlocks").insert(toAdd.map((item) => ({ child_id: childId, item })));
  }

  revalidatePath("/ovelser");
  return { ok: true, balls, level };
}

// Lagre valgt kompis/utstyr for aktivt barn. Validerer at valget er tilgjengelig
// (standardvalg alltid; låste krever nok baller) – stol aldri på klienten.
export async function setBuddyGear(formData: FormData): Promise<void> {
  const childId = String(formData.get("childId") ?? "");
  if (!isUuid(childId)) return;
  const buddy = String(formData.get("buddy") ?? "");
  const gear = String(formData.get("gear") ?? "");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;
  const child = await ownChild(supabase, user.id, childId);
  if (!child) return;

  const available = new Set(unlockedItems(child.balls));
  const defaultBuddy = BUDDIES.some((b) => b.name === buddy);
  const validBuddy = defaultBuddy || available.has(buddy);
  const defaultGear = GEARS.includes(gear);
  const validGear = defaultGear || available.has(gear);

  const update: { buddy?: string; gear?: string } = {};
  if (validBuddy) update.buddy = buddy;
  if (validGear) update.gear = gear;
  if (Object.keys(update).length === 0) return;

  await supabase.from("children").update(update).eq("id", childId);
  revalidatePath("/ovelser");
}
