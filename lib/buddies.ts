// Delt tenniskompis-sett. Brukes av Tennis Town (landing) og barneprofil-skjemaet,
// så vokabularet er ett sted (reuse). children.buddy lagrer navnet (f.eks. "Bamse").

export type Buddy = { id: string; emoji: string; name: string };

export const BUDDIES: Buddy[] = [
  { id: "bamse", emoji: "🐻", name: "Bamse" },
  { id: "hoppe", emoji: "🐰", name: "Hoppe" },
  { id: "rev", emoji: "🦊", name: "Rev" },
];

export const LOCKED_BUDDIES = [
  { id: "love", emoji: "🦁", name: "Løve", req: 30 },
  { id: "tiger", emoji: "🐯", name: "Tiger", req: 50 },
];

export function buddyEmoji(name: string | null | undefined): string {
  return [...BUDDIES, ...LOCKED_BUDDIES].find((b) => b.name === name)?.emoji ?? "🐻";
}

// Utstyr (gear) til Tennis Town. Lagres i children.gear ("" = ingen utstyr).
// Bor her sammen med kompisene så Tennis Town og server actions deler ett vokabular.
export const GEARS = ["", "🧢", "🎀", "🕶️"];
export const LOCKED_GEARS = [{ emoji: "👑", req: 40 }];
