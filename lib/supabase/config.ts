// Felles Supabase-konfig. Tom til prosjektet er opprettet; da no-op-er middleware og
// auth-koden trygt (live-siden påvirkes ikke før env er satt).
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// anon-nøkkelen er trygg å eksponere i nettleseren; den gir KUN tilgang som RLS tillater.
// service_role-nøkkelen brukes aldri i klient og legges aldri i NEXT_PUBLIC.
export const hasSupabase = Boolean(supabaseUrl && supabaseAnonKey);