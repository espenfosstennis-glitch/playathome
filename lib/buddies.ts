// Delt tenniskompis-sett. Brukes av Tennis Town (landing) og barneprofil-skjemaet.

export type Buddy = { id: string; emoji: string; name: string };

export type GearItem = {
  id: string;
  emoji: string;
  label: string;
  // Posisjon på figuren: top=toppen av hodet, forehead=panna, eyes=øynene, hand=høyre hånd
  slot: "top" | "forehead" | "eyes" | "hand";
  req?: number;
};

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
  return [...BUDDIES, ...LOCKED_BUDDIES].find((b) => b.name === name)?.emoji ?? "👦";
}

export const GEAR_ITEMS: GearItem[] = [
  { id: "none",        emoji: "",   label: "Ingen",       slot: "hand" },
  { id: "racket",      emoji: "🎾", label: "Racket",      slot: "hand" },
  { id: "caps",        emoji: "🧢", label: "Caps",        slot: "top" },
  { id: "bow",         emoji: "🎀", label: "Sløyfe",      slot: "top" },
  { id: "sunglasses",  emoji: "🕶️", label: "Solbriller",  slot: "eyes" },
  { id: "headband-p",  emoji: "🩷", label: "Pannebånd",   slot: "forehead" },
  { id: "headband-g",  emoji: "💚", label: "Pannebånd",   slot: "forehead" },
];

export const LOCKED_GEAR_ITEMS: GearItem[] = [
  { id: "crown", emoji: "👑", label: "Krone", slot: "top", req: 40 },
];

// Bakoverkompatibilitet: GEARS og LOCKED_GEARS brukes av actions.ts
export const GEARS = GEAR_ITEMS.map((g) => g.emoji);
export const LOCKED_GEARS = LOCKED_GEAR_ITEMS.map((g) => ({ emoji: g.emoji, req: g.req! }));
