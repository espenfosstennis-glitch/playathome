// Gamifisering: baller -> nivå og opplåsninger. Brukes både i UI (OvelserView,
// TennisTown) og i server actions, så reglene bor ett sted (reuse + samme validering
// på klient og server). Baller = antall fullføringer (repetisjoner teller, jf. Fase 4).

import { LOCKED_BUDDIES, LOCKED_GEARS } from "./buddies";

// Nivånavn må matche check-constrainten på children.level i migrasjon 0001.
export const LEVELS = [
  { name: "Nybegynner", min: 0 },
  { name: "På vei opp", min: 10 },
  { name: "Racketmester", min: 30 },
  { name: "Tennisstjerne", min: 60 },
] as const;

export type LevelName = (typeof LEVELS)[number]["name"];

// Høyeste nivå der min <= baller.
export function levelForBalls(balls: number): LevelName {
  let current: LevelName = LEVELS[0].name;
  for (const l of LEVELS) {
    if (balls >= l.min) current = l.name;
  }
  return current;
}

// Prosent (0–100) innen gjeldende nivåbånd. Øverste nivå = 100.
export function levelProgress(balls: number): number {
  const idx = LEVELS.findLastIndex((l) => balls >= l.min);
  const current = LEVELS[idx];
  const next = LEVELS[idx + 1];
  if (!next) return 100;
  const pct = ((balls - current.min) / (next.min - current.min)) * 100;
  return Math.max(0, Math.min(100, Math.round(pct)));
}

// Låste ting som er åpnet ved gitt antall baller. Kompiser lagres på navn ("Løve"),
// utstyr på emoji ("👑") – samme nøkler som lagres i children.buddy/gear og unlocks.item.
export function unlockedItems(balls: number): string[] {
  const items: string[] = [];
  for (const b of LOCKED_BUDDIES) if (balls >= b.req) items.push(b.name);
  for (const g of LOCKED_GEARS) if (balls >= g.req) items.push(g.emoji);
  return items;
}
