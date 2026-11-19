"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  CURRENT_TERMS_VERSION,
  hasAcceptedCurrentTerms,
  safeAppPath,
  termsUrl,
} from "@/lib/terms";

export async function acceptTerms(formData: FormData): Promise<void> {
  const returnTo = safeAppPath(String(formData.get("next") ?? ""));
  if (formData.get("accepted") !== "on") {
    redirect(`${termsUrl(returnTo)}&error=required`);
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/logg-inn");
  }

  if (!(await hasAcceptedCurrentTerms(supabase, user.id))) {
    const { error } = await supabase.from("terms_acceptances").insert({
      user_id: user.id,
      terms_version: CURRENT_TERMS_VERSION,
    });

    if (error) {
      throw new Error(`Could not save terms acceptance: ${error.message}`);
    }
  }

  redirect(returnTo);
}
