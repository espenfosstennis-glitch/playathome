import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { createClient } from "@/lib/supabase/server";
import { buddyEmoji } from "@/lib/buddies";
import { getSkills, getExercises } from "@/lib/sanity/queries";
import { currentStreak, streakLabel } from "@/lib/streak";

export const metadata: Metadata = {
  title: "Foreldreoversikt | Kids Tennis",
  robots: { index: false, follow: false },
};

type ChildRow = {
  id: string;
  name: string;
  balls: number;
  level: string;
  buddy: string | null;
};

type ProgressRow = { child_id: string; exercise_slug: string; completed_at: string };

export default async function ForelderPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/logg-inn");

  const { data: childData } = await supabase
    .from("children")
    .select("id,name,balls,level,buddy")
    .eq("parent_id", user.id) // forsvar i dybden i tillegg til RLS
    .order("created_at", { ascending: true });
  const children = (childData ?? []) as ChildRow[];

  // Innhold (ferdigheter + øvelser) til å regne ferdighetsdekning per barn.
  const [skills, exercises] = await Promise.all([getSkills(), getExercises()]);
  const skillBySlug = new Map(skills.map((s) => [s.slug, s]));
  // Antall øvelser per ferdighet (nevneren i dekningen).
  const exercisesPerSkill = new Map<string, number>();
  for (const e of exercises) {
    exercisesPerSkill.set(e.skill, (exercisesPerSkill.get(e.skill) ?? 0) + 1);
  }
  const skillForExercise = new Map(exercises.map((e) => [e.slug, e.skill]));

  // Én fremgangsspørring for alle barn; RLS sikrer eierskap, .in er forsvar i dybden.
  const ids = children.map((c) => c.id);
  let progress: ProgressRow[] = [];
  if (ids.length > 0) {
    const { data: progData } = await supabase
      .from("progress")
      .select("child_id,exercise_slug,completed_at")
      .in("child_id", ids);
    progress = (progData ?? []) as ProgressRow[];
  }

  // Grupper fremgang per barn.
  const byChild = new Map<string, ProgressRow[]>();
  for (const p of progress) {
    const list = byChild.get(p.child_id) ?? [];
    list.push(p);
    byChild.set(p.child_id, list);
  }

  const cards = children.map((c) => {
    const rows = byChild.get(c.id) ?? [];
    const streak = currentStreak(rows.map((r) => r.completed_at));
    const uniqueSlugs = new Set(rows.map((r) => r.exercise_slug));

    // Unike øvelser gjort per ferdighet -> ferdigheten med lavest dekning trenger mer øving.
    const doneBySkill = new Map<string, number>();
    for (const slug of uniqueSlugs) {
      const sk = skillForExercise.get(slug);
      if (sk) doneBySkill.set(sk, (doneBySkill.get(sk) ?? 0) + 1);
    }
    let weakest: { slug: string; done: number } | null = null;
    for (const [slug] of exercisesPerSkill) {
      const done = doneBySkill.get(slug) ?? 0;
      if (!weakest || done < weakest.done) weakest = { slug, done };
    }
    const weakestSkill = weakest ? skillBySlug.get(weakest.slug) : undefined;

    return {
      id: c.id,
      name: c.name,
      level: c.level,
      balls: c.balls,
      buddy: c.buddy,
      streak,
      uniqueDone: uniqueSlugs.size,
      weakestSkill,
      hasProgress: rows.length > 0,
    };
  });

  return (
    <>
      <SiteHeader />
      <main className="wrap barn-wrap">
        <div className="barn-head">
          <div>
            <span className="eyebrow">Min side</span>
            <h1>Foreldreoversikt</h1>
          </div>
          <Link href="/barn" className="btn btn-ghost">
            Mine barn
          </Link>
        </div>

        {cards.length === 0 ? (
          <p className="empty">
            Ingen barn lagt til enda. <Link href="/barn">Legg til det første barnet</Link> for å
            følge fremgang og streak.
          </p>
        ) : (
          <div className="child-grid">
            {cards.map((c) => (
              <article key={c.id} className="child-card forelder-card">
                <div className="forelder-top">
                  <span className="child-buddy" aria-hidden="true">
                    {buddyEmoji(c.buddy)}
                  </span>
                  <div className="child-info">
                    <h3>{c.name}</h3>
                    <p>
                      {c.level} · <span aria-hidden="true">🎾</span> {c.balls} baller ·{" "}
                      {c.uniqueDone} øvelser prøvd
                    </p>
                  </div>
                  <span className={`streak-badge${c.streak > 0 ? " on" : ""}`}>
                    <span aria-hidden="true">🔥</span> {streakLabel(c.streak)}
                  </span>
                </div>
                {c.hasProgress && c.weakestSkill ? (
                  <p className="forelder-tip">
                    Trenger litt mer øving:{" "}
                    <strong>
                      {c.weakestSkill.emoji} {c.weakestSkill.name}
                    </strong>
                  </p>
                ) : (
                  <p className="forelder-tip">
                    Ingen øvelser prøvd enda.{" "}
                    <Link href="/ovelser">Velg dagens øvelse →</Link>
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
