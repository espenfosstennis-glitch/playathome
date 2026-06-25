"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BUDDIES } from "@/lib/buddies";

export type ChildState = { error?: string; ok?: boolean };

export async function addChild(_prev: ChildState, formData: FormData): Promise<ChildState> {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Skriv inn et navn." };

  // Server-side validering (ikke stol på klienten): kun gyldige år og kjente kompiser.
  const thisYear = new Date().getFullYear();
  const allowedYears = [thisYear - 3, thisYear - 4, thisYear - 5];
  const yearNum = Number(formData.get("birthYear"));
  const birthYear = allowedYears.includes(yearNum) ? yearNum : null;

  const buddyRaw = String(formData.get("buddy") ?? "");
  const buddy = BUDDIES.some((b) => b.name === buddyRaw) ? buddyRaw : "Bamse";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/logg-inn");

  const { error } = await supabase
    .from("children")
    .insert({ parent_id: user.id, name, birth_year: birthYear, buddy });
  if (error) return { error: "Kunne ikke lagre barnet. Prøv igjen." };

  revalidatePath("/barn");
  return { ok: true };
}

export async function deleteChild(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;
  await supabase.from("children").delete().eq("id", id); // RLS sikrer at kun egne kan slettes
  revalidatePath("/barn");
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
