import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { hasSupabase, supabaseUrl, supabaseAnonKey } from "@/lib/supabase/config";

// Oppdaterer Supabase-sesjonen på hver navigasjon. No-op til Supabase er konfigurert.
export async function middleware(request: NextRequest) {
  if (!hasSupabase) return NextResponse.next();

  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // Fornyer sesjonen om nødvendig (anbefalt mønster fra @supabase/ssr).
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Beskytt /barn og /forelder: uinnlogget sendes til innlogging.
  if (
    !user &&
    (request.nextUrl.pathname.startsWith("/barn") ||
      request.nextUrl.pathname.startsWith("/forelder"))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/logg-inn";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  // Kjør på alt unntatt statiske filer og bilder.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};