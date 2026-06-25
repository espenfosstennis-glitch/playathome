import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseUrl, supabaseAnonKey } from "./config";

// Server-klient (server-komponenter, route handlers, server actions). Leser/skriver
// auth-cookies via Next sin cookie-store. RLS gjelder her også.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Kalt fra en server-komponent (kan ikke sette cookies der). Trygt å ignorere;
          // middleware oppdaterer sesjonen.
        }
      },
    },
  });
}