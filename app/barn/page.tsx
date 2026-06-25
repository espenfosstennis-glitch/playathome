import type { Metadata } from "next";
import { redirect } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ChildForm from "@/components/ChildForm";
import { createClient } from "@/lib/supabase/server";
import { buddyEmoji } from "@/lib/buddies";
import { deleteChild, signOut } from "./actions";

export const metadata: Metadata = {
  title: "Mine barn | Kids Tennis",
  robots: { index: false, follow: false },
};

type Child = {
  id: string;
  name: string;
  birth_year: number | null;
  buddy: string | null;
  balls: number;
  level: string;
};

export default async function BarnPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/logg-inn");

  const { data } = await supabase
    .from("children")
    .select("id,name,birth_year,buddy,balls,level")
    .eq("parent_id", user.id) // forsvar i dybden i tillegg til RLS
    .order("created_at", { ascending: true });
  const children = (data ?? []) as Child[];

  return (
    <>
      <SiteHeader />
      <main className="wrap barn-wrap">
        <div className="barn-head">
          <div>
            <span className="eyebrow">Min side</span>
            <h1>Mine barn</h1>
          </div>
          <form action={signOut}>
            <button type="submit" className="btn btn-ghost">
              Logg ut
            </button>
          </form>
        </div>

        {children.length === 0 ? (
          <p className="empty">Ingen barn lagt til enda. Legg til det første nedenfor.</p>
        ) : (
          <div className="child-grid">
            {children.map((c) => (
              <article key={c.id} className="child-card">
                <span className="child-buddy" aria-hidden="true">
                  {buddyEmoji(c.buddy)}
                </span>
                <div className="child-info">
                  <h3>{c.name}</h3>
                  <p>
                    {c.level} · 🎾 {c.balls} baller
                  </p>
                </div>
                <form action={deleteChild}>
                  <input type="hidden" name="id" value={c.id} />
                  <button type="submit" className="child-remove" aria-label={`Fjern ${c.name}`}>
                    Fjern
                  </button>
                </form>
              </article>
            ))}
          </div>
        )}

        <ChildForm />
      </main>
      <SiteFooter />
    </>
  );
}
