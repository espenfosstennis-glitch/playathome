import type { Metadata } from "next";
import { cookies } from "next/headers";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import OvelserView, { type Personal } from "@/components/OvelserView";
import { getSkills, getExercises } from "@/lib/sanity/queries";
import { createClient } from "@/lib/supabase/server";
import { unlockedItems } from "@/lib/gamification";
import { ACTIVE_CHILD_COOKIE } from "./constants";

export const metadata: Metadata = {
  title: "Øvelser | Kids Tennis",
  description:
    "Bla i 100 korte tennisøvelser for barn 3 til 5 år, sortert på ferdighet. Velg dagens øvelse og følg barnets fremgang fra nybegynner til tennisstjerne.",
  alternates: { canonical: "https://playathome.no/ovelser" },
};

type ChildRow = {
  id: string;
  name: string;
  balls: number;
  level: string;
  buddy: string | null;
  gear: string | null;
};

// Henter forelderens barn + aktivt barns fremgang. Returnerer tomt for utlogget
// (siden er offentlig for browsing; fremgang krever innlogging + valgt barn).
async function loadPersonal(): Promise<{
  loggedIn: boolean;
  childrenList: { id: string; name: string }[];
  personal: Personal | null;
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { loggedIn: false, childrenList: [], personal: null };

  const { data } = await supabase
    .from("children")
    .select("id,name,balls,level,buddy,gear")
    .eq("parent_id", user.id)
    .order("created_at", { ascending: true });
  const children = (data ?? []) as ChildRow[];
  const childrenList = children.map((c) => ({ id: c.id, name: c.name }));
  if (children.length === 0) return { loggedIn: true, childrenList, personal: null };

  const cookieStore = await cookies();
  const wanted = cookieStore.get(ACTIVE_CHILD_COOKIE)?.value;
  const active = children.find((c) => c.id === wanted) ?? children[0];

  // Unike fullførte øvelser (til ✓ på kort og "X av 100"); baller = children.balls.
  const { data: prog } = await supabase
    .from("progress")
    .select("exercise_slug")
    .eq("child_id", active.id);
  const completedSlugs = [...new Set((prog ?? []).map((p: { exercise_slug: string }) => p.exercise_slug))];

  const personal: Personal = {
    childId: active.id,
    childName: active.name,
    balls: active.balls,
    level: active.level,
    buddy: active.buddy ?? "Bamse",
    gear: active.gear ?? "",
    completedSlugs,
    unlocked: unlockedItems(active.balls),
  };
  return { loggedIn: true, childrenList, personal };
}

export default async function OvelserPage({
  searchParams,
}: {
  searchParams: Promise<{ ferdighet?: string }>;
}) {
  const { ferdighet } = await searchParams;
  const [skills, exercises, personalData] = await Promise.all([
    getSkills(),
    getExercises(),
    loadPersonal(),
  ]);

  return (
    <>
      <a className="skip" href="#dagens">
        Hopp til innhold
      </a>
      <SiteHeader />
      <OvelserView
        skills={skills}
        exercises={exercises}
        initialSkill={ferdighet ?? "alle"}
        loggedIn={personalData.loggedIn}
        childrenList={personalData.childrenList}
        personal={personalData.personal}
      />
      <SiteFooter />
    </>
  );
}
