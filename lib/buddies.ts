export type Buddy = { id: string; emoji: string; name: string };

export type GearItem = {
  id: string;
  label: string;
  category: "none" | "racket" | "cap" | "bow" | "headband" | "glasses" | "crown";
  color: string;
  color2?: string;
  req?: number;
};

export const BUDDIES: Buddy[] = [
  { id: "lars", emoji: "👦",   name: "Lars" },
  { id: "noah", emoji: "👦🏽", name: "Noah" },
  { id: "emma", emoji: "👧",   name: "Emma" },
  { id: "maja", emoji: "👧🏽", name: "Maja" },
];

export const LOCKED_BUDDIES = [
  { id: "champion",  emoji: "🏆", name: "Champion",    req: 30 },
  { id: "tennisstj", emoji: "⭐", name: "Tennisstjerne", req: 50 },
];

export function buddyEmoji(name: string | null | undefined): string {
  return [...BUDDIES, ...LOCKED_BUDDIES].find((b) => b.name === name)?.emoji ?? "👦";
}

// Utstyrskatalogen — fri + låst, sortert etter req.
export const ALL_GEAR: GearItem[] = [
  { id: "none",            label: "Ingen",          category: "none",     color: ""        },

  // Racketer
  { id: "racket-blue",     label: "Blå racket",     category: "racket",   color: "#3B82F6"                           },
  { id: "racket-red",      label: "Rød racket",     category: "racket",   color: "#EF4444",                req:  5   },
  { id: "racket-yellow",   label: "Gul racket",     category: "racket",   color: "#EAB308",                req: 15   },
  { id: "racket-green",    label: "Grønn racket",   category: "racket",   color: "#22C55E",                req: 25   },
  { id: "racket-purple",   label: "Lilla racket",   category: "racket",   color: "#A855F7",                req: 40   },

  // Caps
  { id: "cap-white",       label: "Hvit caps",      category: "cap",      color: "#F8FAFC", color2: "#94A3B8", req:  3 },
  { id: "cap-red",         label: "Rød caps",       category: "cap",      color: "#EF4444", color2: "#B91C1C", req: 12 },
  { id: "cap-blue",        label: "Blå caps",       category: "cap",      color: "#3B82F6", color2: "#1D4ED8", req: 22 },

  // Pannebånd
  { id: "headband-pink",   label: "Rosa bånd",      category: "headband", color: "#F9A8D4",                req:  3   },
  { id: "headband-green",  label: "Grønt bånd",     category: "headband", color: "#4ADE80",                req:  8   },
  { id: "headband-yellow", label: "Gult bånd",      category: "headband", color: "#FDE047",                req: 18   },

  // Sløyfe
  { id: "bow-pink",        label: "Rosa sløyfe",    category: "bow",      color: "#F9A8D4",                req:  4   },
  { id: "bow-purple",      label: "Lilla sløyfe",   category: "bow",      color: "#C084FC",                req: 14   },

  // Briller
  { id: "glasses-black",   label: "Solbriller",     category: "glasses",  color: "#1E293B", color2: "#475569", req:  8 },
  { id: "glasses-mirror",  label: "Speilbriller",   category: "glasses",  color: "#93C5FD", color2: "#64748B", req: 30 },

  // Krone
  { id: "crown",           label: "Gullkrone",      category: "crown",    color: "#FFD700", color2: "#EF4444", req: 50 },
];

export const FREE_GEAR   = ALL_GEAR.filter((g) => g.req == null);
export const LOCKED_GEAR = ALL_GEAR.filter((g) => g.req != null) as (GearItem & { req: number })[];

export function resolveGearId(stored: string | null | undefined): string {
  if (!stored) return "racket-blue";
  if (ALL_GEAR.some((g) => g.id === stored)) return stored;
  return "racket-blue"; // ukjent / gammelt emoji → standard
}

// Bakoverkompatibilitet for gamification.ts (bruker LOCKED_GEARS.emoji + .req)
export const GEARS        = FREE_GEAR.map((g) => g.id);
export const LOCKED_GEARS = LOCKED_GEAR.map((g) => ({ emoji: g.id, req: g.req }));

// GEAR_ITEMS og slot-feltet er fjernet — bruk ALL_GEAR + category i stedet.
