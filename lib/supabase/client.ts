import { createBrowserClient } from "@supabase/ssr";
import { supabaseUrl, supabaseAnonKey } from "./config";

// Nettleser-klient (klientkomponenter). RLS gjelder, så denne ser kun det innlogget bruker får se.
export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}