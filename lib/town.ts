// Tennisbyen vokser: nye ting dukker opp i scenen når barnet samler baller.
// Kun visuelt (ingen lagring), avledet fra baller som resten av gamifiseringen.
// x/y er prosent av scenen. Midten (rundt x 50) holdes fri for figuren.

export type TownItem = {
  id: string;
  emoji: string;
  label: string;
  req: number;
  x: number;
  y: number;
  size?: number; // rem
};

export const TOWN_ITEMS: TownItem[] = [
  { id: "tree",    emoji: "🌳", label: "Et tre",       req:  2, x:  8, y: 10, size: 2.6 },
  { id: "flowers", emoji: "🌷", label: "Blomster",     req:  5, x: 10, y: 78 },
  { id: "dog",     emoji: "🐶", label: "En hund",      req: 10, x: 84, y: 76, size: 2.2 },
  { id: "house",   emoji: "🏠", label: "Et hus",       req: 15, x: 82, y:  8, size: 2.6 },
  { id: "bird",    emoji: "🐦", label: "En fugl",      req: 20, x: 86, y: 38 },
  { id: "rabbit",  emoji: "🐰", label: "En kanin",     req: 30, x: 22, y: 60 },
  { id: "wheel",   emoji: "🎡", label: "Et pariserhjul", req: 45, x: 66, y:  4, size: 2.4 },
  { id: "rainbow", emoji: "🌈", label: "En regnbue",   req: 60, x: 70, y: 56, size: 2.4 },
];

export function townItemsFor(balls: number): TownItem[] {
  return TOWN_ITEMS.filter((t) => balls >= t.req);
}

export function nextTownItem(balls: number): TownItem | undefined {
  return TOWN_ITEMS.find((t) => t.req > balls);
}
