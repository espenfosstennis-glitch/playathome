"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { error?: string; message?: string };

function readCredentials(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  return { email, password };
}

export async function signIn(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const { email, password } = readCredentials(formData);
  if (!email || !password) return { error: "Fyll inn e-post og passord." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Feil e-post eller passord." };

  redirect("/barn");
}

export async function signUp(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const { email, password } = readCredentials(formData);
  if (!email || !password) return { error: "Fyll inn e-post og passord." };
  if (password.length < 8) return { error: "Passordet må være minst 8 tegn." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { error: error.message };

  // Hvis e-postbekreftelse er på, finnes ingen sesjon enda.
  if (!data.session) {
    return { message: "Konto opprettet. Sjekk e-posten din for å bekrefte, og logg deretter inn." };
  }

  redirect("/barn");
}
