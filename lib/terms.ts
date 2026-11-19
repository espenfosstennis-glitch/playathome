import { redirect } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";

export const CURRENT_TERMS_VERSION = "2026-11-19";

const APP_PATHS = new Set(["/barn", "/forelder", "/ovelser"]);

export function safeAppPath(path: string | undefined): string {
  return path && APP_PATHS.has(path) ? path : "/barn";
}

export function termsUrl(returnTo?: string): string {
  return `/vilkar?next=${encodeURIComponent(safeAppPath(returnTo))}`;
}

export async function hasAcceptedCurrentTerms(
  supabase: SupabaseClient,
  userId: string,
): Promise<boolean> {
  const { data, error } = await supabase
    .from("terms_acceptances")
    .select("user_id")
    .eq("user_id", userId)
    .eq("terms_version", CURRENT_TERMS_VERSION)
    .maybeSingle();

  if (error) {
    throw new Error(`Could not check terms acceptance: ${error.message}`);
  }

  return data !== null;
}

export async function requireCurrentTerms(
  supabase: SupabaseClient,
  userId: string,
  returnTo: string,
): Promise<void> {
  if (!(await hasAcceptedCurrentTerms(supabase, userId))) {
    redirect(termsUrl(returnTo));
  }
}
