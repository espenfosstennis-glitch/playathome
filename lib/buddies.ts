// Delt tenniskompis-sett. Brukes av Tennis Town (landing) og barneprofil-skjemaet,
// så vokabularet er ett sted (reuse). children.buddy lagrer navnet (f.eks. "Bamse").

export type Buddy = { id: string; emoji: string; name: string };

export const BUDDIES: Buddy[] = [
  { id: "lars", emoji: "👦", name: "Lars" },
  { id: "noah", emoji: "👦🏽", name: "Noah" },
  { id: "emma", emoji: "👧", name: "Emma" },
  { id: "maja", emoji: "👧🏽", name: "Maja" },
];

export const LOCKED_BUDDIES = [
  { id: "champion", emoji: "🏆", name: "Champion", req: 30 },
  { id: "star", emoji: "⭐", name: "Tennisstjerne", req: 50 },
];

export function buddyEmoji(name: string | null | undefined): string {
  return [...BUDDIES, ...LOCKED_BUDDIES].find((b) => b.name === name)?.emoji ?? "🐻";
}

// Utstyr (gear) til Tennis Town. Lagres i children.gear ("" = ingen utstyr).
// Bor her sammen med kompisene så Tennis Town og server actions deler ett vokabular.
export const GEARS = ["🎾", "🏸", "🧢", "🎀", "🕶️"];
export const LOCKED_GEARS = [{ emoji: "👑", req: 40 }];
