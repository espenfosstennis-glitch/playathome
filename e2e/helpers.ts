// Delte e2e-hjelpere for rolle-/RLS-tester.
// Mål (jf. dev-pipeline): feile raskt på manglende env, aldri kjøre destruktivt mot
// produksjon, og gjenbruke testbruker-fabrikk + innlogging på tvers av spesifikasjoner.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Page } from "@playwright/test";

// --- Env: feil raskt og tydelig (ingen stille "" som maskerer feil) ---
function need(name: string): string {
  const v = process.env[name];
  if (!v) {
    throw new Error(
      `Mangler påkrevd miljøvariabel ${name}. Sett den i .env.local før e2e-testene kjøres.`,
    );
  }
  return v;
}

export const SUPABASE_URL = need("NEXT_PUBLIC_SUPABASE_URL");
export const ANON_KEY = need("NEXT_PUBLIC_SUPABASE_ANON_KEY");
export const SERVICE_KEY = need("SUPABASE_SERVICE_ROLE_KEY");

// Sikkerhetsvakt: nekt destruktive tester mot produksjon. Sett SUPABASE_PROD_URL i CI
// til produksjons-URL-en; da stopper testene hvis de ved et uhell peker dit.
export function assertNotProduction(): void {
  const prod = process.env.SUPABASE_PROD_URL?.replace(/\/+$/, "");
  if (prod && prod === SUPABASE_URL.replace(/\/+$/, "")) {
    throw new Error(
      "E2E avbrutt: NEXT_PUBLIC_SUPABASE_URL peker på produksjon. Bruk et eget testprosjekt.",
    );
  }
}

const authOpts = { auth: { autoRefreshToken: false, persistSession: false } } as const;

// service_role-klient: kun for testoppsett/-opprydding, aldri i appkoden.
export const admin: SupabaseClient = createClient(SUPABASE_URL, SERVICE_KEY, authOpts);

export type Creds = { email: string; password: string };

export function uniqueCreds(tag: string): Creds {
  const rand = Math.random().toString(36).slice(2, 8);
  return { email: `pwtest_${Date.now()}_${tag}_${rand}@example.com`, password: "Passord12345" };
}

// Oppretter en bekreftet testforelder, returnerer auth-id.
export async function createParent(creds: Creds): Promise<string> {
  const { data, error } = await admin.auth.admin.createUser({
    email: creds.email,
    password: creds.password,
    email_confirm: true,
  });
  if (error || !data.user) {
    throw new Error(`Kunne ikke opprette testforelder ${creds.email}: ${error?.message ?? "ukjent"}`);
  }
  return data.user.id;
}

// Sletter en forelder; cascade fjerner barn/fremgang/opplåsninger.
export async function deleteParent(id: string | undefined): Promise<void> {
  if (id) await admin.auth.admin.deleteUser(id);
}

// Innlogget Supabase-klient: RLS gjelder som denne brukeren (anon-nøkkel + sesjon).
export async function authedClient(creds: Creds): Promise<SupabaseClient> {
  const client = createClient(SUPABASE_URL, ANON_KEY, authOpts);
  const { error } = await client.auth.signInWithPassword(creds);
  if (error) throw new Error(`Innlogging feilet for ${creds.email}: ${error.message}`);
  return client;
}

// Uinnlogget klient: ser kun det RLS tillater anonyme (dvs. ingen personlige rader).
export function anonClient(): SupabaseClient {
  return createClient(SUPABASE_URL, ANON_KEY, authOpts);
}

// UI-innlogging i nettleseren.
export async function login(page: Page, creds: Creds): Promise<void> {
  await page.goto("/logg-inn");
  await page.getByLabel("E-post").fill(creds.email);
  await page.getByLabel("Passord").fill(creds.password);
  await page.getByRole("button", { name: "Logg inn" }).click();
  await page.waitForURL("**/barn");
}
