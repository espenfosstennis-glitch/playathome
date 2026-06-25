// Streak: antall dager på rad med minst én fullført øvelse, regnet i norsk tid
// (Europe/Oslo). Brukes på foreldreoversikten (og kan gjenbrukes på /ovelser senere),
// så regelen bor ett sted. Ren funksjon: tar tidsstemplene fra progress.completed_at.

const OSLO_DAY = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Oslo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

// "YYYY-MM-DD" for et tidspunkt, sett i Oslo-tid.
function osloDayKey(d: Date): string {
  return OSLO_DAY.format(d);
}

// Dagen før en gitt "YYYY-MM-DD"-nøkkel (trygt rundt måned/år og sommertid:
// regner midt på dagen i UTC og leser ut Oslo-dagen).
function prevDayKey(key: string): string {
  const [y, m, d] = key.split("-").map(Number);
  const noon = new Date(Date.UTC(y, m - 1, d, 12));
  noon.setUTCDate(noon.getUTCDate() - 1);
  return osloDayKey(noon);
}

// Antall sammenhengende dager (i Oslo-tid) med minst én fullføring, som ender i dag
// eller i går. I dag alene = 1. Et helt hull bryter streaken (med mindre i går teller).
// `now` kan settes for testing; standard er nåtid.
export function currentStreak(completedAt: string[], now: Date = new Date()): number {
  if (completedAt.length === 0) return 0;

  const days = new Set(completedAt.map((ts) => osloDayKey(new Date(ts))));
  const today = osloDayKey(now);
  const yesterday = prevDayKey(today);

  // Streaken må være fersk: en fullføring i dag eller i går. Ellers er den brutt.
  let cursor: string;
  if (days.has(today)) cursor = today;
  else if (days.has(yesterday)) cursor = yesterday;
  else return 0;

  let streak = 0;
  while (days.has(cursor)) {
    streak += 1;
    cursor = prevDayKey(cursor);
  }
  return streak;
}

// Visningstekst på norsk, uten bindestrek: "0 dager på rad" / "1 dag på rad" / "N dager på rad".
export function streakLabel(streak: number): string {
  return `${streak} ${streak === 1 ? "dag" : "dager"} på rad`;
}
