export type Buddy = { id: string; emoji: string; name: string };

export type GearItem = {
  id: string;
  label: string;
  category: "none" | "racket" | "ears" | "magic" | "mask" | "glasses" | "crown";
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
  { id: "champion",  emoji: "🏆", name: "Champion",     req: 30 },
  { id: "tennisstj", emoji: "⭐", name: "Tennisstjerne", req: 50 },
];

export function buddyEmoji(name: string | null | undefined): string {
  return [...BUDDIES, ...LOCKED_BUDDIES].find((b) => b.name === name)?.emoji ?? "👦";
}

export const ALL_GEAR: GearItem[] = [
  { id: "none",             label: "Ingen",           category: "none",    color: ""        },

  // Racketer — øker i magi
  { id: "racket-blue",      label: "Tennisracket",    category: "racket",  color: "#3B82F6"                             },
  { id: "racket-rainbow",   label: "Regnbue-racket",  category: "racket",  color: "#F97316",                req:  5    },
  { id: "racket-lightning", label: "Lynracket",       category: "racket",  color: "#FBBF24", color2: "#1E3A8A", req: 15 },
  { id: "racket-star",      label: "Stjerneracket",   category: "racket",  color: "#FFD700", color2: "#FFF",   req: 28  },
  { id: "racket-fire",      label: "Flammeracket",    category: "racket",  color: "#EF4444", color2: "#FF8C00", req: 42 },

  // Dyreører — barn elsker dette
  { id: "ears-bunny",       label: "Kaninører",       category: "ears",    color: "#FBCFE8",                req:  3    },
  { id: "ears-cat",         label: "Katteører",       category: "ears",    color: "#1E293B", color2: "#F472B6", req: 10 },
  { id: "ears-bear",        label: "Bjørneører",      category: "ears",    color: "#92400E",                req: 20    },

  // Magi
  { id: "horn-unicorn",     label: "Enhjørning-horn", category: "magic",   color: "#E879F9",                req:  8    },
  { id: "hat-wizard",       label: "Trollmannshatt",  category: "magic",   color: "#1E3A8A", color2: "#FBBF24", req: 18 },

  // Superhelter
  { id: "mask-hero",        label: "Superheltmaske",  category: "mask",    color: "#DC2626",                req: 12    },
  { id: "glasses-star",     label: "Stjerne-briller", category: "glasses", color: "#FBBF24",                req:  6    },
  { id: "glasses-heart",    label: "Hjerte-briller",  category: "glasses", color: "#F472B6",                req: 22    },

  // Topptrofe
  { id: "crown",            label: "Gullkrone",       category: "crown",   color: "#FFD700", color2: "#EF4444", req: 50 },
];

export const FREE_GEAR   = ALL_GEAR.filter((g) => g.req == null);
export const LOCKED_GEAR = ALL_GEAR.filter((g) => g.req != null) as (GearItem & { req: number })[];

export function resolveGearId(stored: string | null | undefined): string {
  if (!stored) return "racket-blue";
  if (ALL_GEAR.some((g) => g.id === stored)) return stored;
  return "racket-blue";
}

export const GEARS        = FREE_GEAR.map((g) => g.id);
export const LOCKED_GEARS = LOCKED_GEAR.map((g) => ({ emoji: g.id, req: g.req }));
