// Helfigur SVG med utstyr tegnet direkte inn i figuren.
// ViewBox 0 0 100 170. Gear rendres basert på category + color fra ALL_GEAR.

import { ALL_GEAR, type GearItem } from "@/lib/buddies";

type CharDef = {
  skin: string; hair: string; shirt: string;
  pants: string; shoes: string; gender: "boy" | "girl";
};

const CHARS: Record<string, CharDef> = {
  lars: { skin: "#FFD0B5", hair: "#F5C842", shirt: "#3B82F6", pants: "#1D4ED8", shoes: "#1E293B", gender: "boy"  },
  noah: { skin: "#C68642", hair: "#1C0A00", shirt: "#F97316", pants: "#111827", shoes: "#0F172A", gender: "boy"  },
  emma: { skin: "#FFD0B5", hair: "#E8A04A", shirt: "#EC4899", pants: "#EC4899", shoes: "#BE185D", gender: "girl" },
  maja: { skin: "#C68642", hair: "#1C0A00", shirt: "#A855F7", pants: "#A855F7", shoes: "#7E22CE", gender: "girl" },
};

/* ── Hår ───────────────────────────────────────────────────────── */
function BoyHair({ color, skin }: { color: string; skin: string }) {
  return (
    <>
      <ellipse cx="50" cy="22" rx="27" ry="18" fill={color} />
      <ellipse cx="50" cy="36" rx="26" ry="25" fill={skin} />
      <rect x="23" y="18" width="8" height="25" rx="4" fill={color} />
      <rect x="69" y="18" width="8" height="25" rx="4" fill={color} />
      <ellipse cx="50" cy="11" rx="20" ry="8" fill={color} />
    </>
  );
}

function GirlHair({ color, skin }: { color: string; skin: string }) {
  return (
    <>
      <ellipse cx="50" cy="26" rx="28" ry="24" fill={color} />
      <ellipse cx="50" cy="36" rx="26" ry="25" fill={skin} />
      <path d="M 22 28 Q 14 55 16 78" stroke={color} strokeWidth="13" strokeLinecap="round" fill="none" />
      <path d="M 78 28 Q 86 55 84 78" stroke={color} strokeWidth="13" strokeLinecap="round" fill="none" />
      <ellipse cx="50" cy="11" rx="21" ry="8" fill={color} />
    </>
  );
}

/* ── Ansikt ────────────────────────────────────────────────────── */
function Face({ skin }: { skin: string }) {
  const brow = skin === "#C68642" ? "#5A3010" : "#8B5E3C";
  return (
    <>
      <ellipse cx="24" cy="38" rx="6"   ry="7"   fill={skin} />
      <ellipse cx="76" cy="38" rx="6"   ry="7"   fill={skin} />
      <ellipse cx="24" cy="38" rx="3.5" ry="4.5" fill={skin} style={{ filter: "brightness(0.86)" }} />
      <ellipse cx="76" cy="38" rx="3.5" ry="4.5" fill={skin} style={{ filter: "brightness(0.86)" }} />
      <ellipse cx="36" cy="45" rx="6.5" ry="4"   fill="#FFB0B0" opacity="0.5" />
      <ellipse cx="64" cy="45" rx="6.5" ry="4"   fill="#FFB0B0" opacity="0.5" />
      <path d="M 37 30 Q 41 27 45 30" stroke={brow} strokeWidth="2"   fill="none" strokeLinecap="round" />
      <path d="M 55 30 Q 59 27 63 30" stroke={brow} strokeWidth="2"   fill="none" strokeLinecap="round" />
      <ellipse cx="41" cy="37" rx="4"   ry="4.5" fill="#1a1a2e" />
      <ellipse cx="59" cy="37" rx="4"   ry="4.5" fill="#1a1a2e" />
      <circle  cx="42.5" cy="35.5" r="1.5" fill="white" />
      <circle  cx="60.5" cy="35.5" r="1.5" fill="white" />
      <path d="M 48 41 Q 50 45 52 41" stroke={skin} strokeWidth="1.8"
        fill="none" strokeLinecap="round" style={{ filter: "brightness(0.8)" }} />
      <path d="M 42 47 Q 50 54 58 47" stroke="#D05050" strokeWidth="2.4"
        fill="none" strokeLinecap="round" />
    </>
  );
}

/* ── Gear: Racket ──────────────────────────────────────────────── */
// Plassert med håndtaket ved høyre hånd (SVG ~90,103), rotert 25°.
// Tegnes FØR høyre hånd slik at hånden virker å gripe rundt håndtaket.
function GearRacket({ color }: { color: string }) {
  return (
    <g transform="translate(90, 103) rotate(25)">
      <ellipse cx="0" cy="-28" rx="13" ry="17" fill="none" stroke={color} strokeWidth="3" />
      <line x1="-12" y1="-33" x2="12" y2="-33" stroke={color} strokeWidth="0.9" opacity="0.65" />
      <line x1="-13" y1="-28" x2="13" y2="-28" stroke={color} strokeWidth="0.9" opacity="0.65" />
      <line x1="-12" y1="-23" x2="12" y2="-23" stroke={color} strokeWidth="0.9" opacity="0.65" />
      <line x1="-8"  y1="-45" x2="-8" y2="-11" stroke={color} strokeWidth="0.9" opacity="0.65" />
      <line x1="0"   y1="-45" x2="0"  y2="-11" stroke={color} strokeWidth="0.9" opacity="0.65" />
      <line x1="8"   y1="-45" x2="8"  y2="-11" stroke={color} strokeWidth="0.9" opacity="0.65" />
      <path d="M -5 -11 L 0 -2 L 5 -11" fill={color} />
      <rect x="-4" y="-2" width="8" height="18" rx="4" fill={color} />
      <rect x="-3.5" y="5" width="7" height="10" rx="3" fill="white" opacity="0.22" />
    </g>
  );
}

/* ── Gear: Cap ─────────────────────────────────────────────────── */
function GearCap({ color, color2 }: { color: string; color2: string }) {
  return (
    <g transform="translate(50, 11)">
      <path d="M -23 2 Q -19 -20 0 -22 Q 19 -20 23 2 Z" fill={color} />
      <rect x="-26" y="2" width="52" height="8" rx="4" fill={color} />
      <rect x="-26" y="7" width="52" height="3" rx="1.5" fill={color2} opacity="0.55" />
      <circle cx="0" cy="-10" r="3.5" fill="white" opacity="0.28" />
    </g>
  );
}

/* ── Gear: Pannebånd ───────────────────────────────────────────── */
function GearHeadband({ color }: { color: string }) {
  return <ellipse cx="50" cy="18" rx="25" ry="5" fill={color} />;
}

/* ── Gear: Sløyfe ──────────────────────────────────────────────── */
function GearBow({ color }: { color: string }) {
  return (
    <g transform="translate(68, 14)">
      <path d="M 0 0 C -5 -9 -14 -8 -13 0 C -14 8 -5 9 0 0 Z" fill={color} />
      <path d="M 0 0 C 5 -9 14 -8 13 0 C 14 8 5 9 0 0 Z" fill={color} />
      <ellipse cx="0" cy="0" rx="4.5" ry="4.5" fill={color} style={{ filter: "brightness(0.7)" }} />
      <ellipse cx="0" cy="0" rx="2"   ry="2"   fill="white" opacity="0.35" />
    </g>
  );
}

/* ── Gear: Briller ─────────────────────────────────────────────── */
function GearGlasses({ color, color2 }: { color: string; color2: string }) {
  return (
    <g>
      <ellipse cx="41" cy="37" rx="9.5" ry="7" fill={color} opacity="0.78" />
      <ellipse cx="59" cy="37" rx="9.5" ry="7" fill={color} opacity="0.78" />
      <ellipse cx="41" cy="37" rx="9.5" ry="7" fill="none" stroke={color2} strokeWidth="2" />
      <ellipse cx="59" cy="37" rx="9.5" ry="7" fill="none" stroke={color2} strokeWidth="2" />
      <path d="M 50.5 36 L 54 36.5" stroke={color2} strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="37" x2="26" y2="40" stroke={color2} strokeWidth="2" strokeLinecap="round" />
      <line x1="68" y1="37" x2="74" y2="40" stroke={color2} strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

/* ── Gear: Krone ───────────────────────────────────────────────── */
function GearCrown({ color, color2 }: { color: string; color2: string }) {
  return (
    <g transform="translate(50, 10)">
      <rect x="-20" y="-4" width="40" height="11" rx="3" fill={color} />
      <path d="M -20 -4 L -13 -17 L -6 -4" fill={color} />
      <path d="M -6  -4 L  0  -21 L  6 -4" fill={color} />
      <path d="M  6  -4 L 13  -17 L 20 -4" fill={color} />
      <circle cx="-13" cy="-13" r="3"   fill={color2} />
      <circle cx="0"   cy="-16" r="3.5" fill="#60A5FA" />
      <circle cx="13"  cy="-13" r="3"   fill={color2} />
      <rect x="-14" y="-1" width="28" height="3.5" rx="1.5" fill="white" opacity="0.22" />
    </g>
  );
}

/* ── Hoved-komponent ───────────────────────────────────────────── */
export default function KidSVG({
  id, gearId = "none", size = 100,
}: {
  id: string; gearId?: string; size?: number;
}) {
  const h   = Math.round(size * 1.7);
  const c   = CHARS[id.toLowerCase()] ?? CHARS.lars;
  const isGirl = c.gender === "girl";

  const gear: GearItem = ALL_GEAR.find((g) => g.id === gearId) ?? ALL_GEAR[0];
  const cat  = gear.category;
  const gc   = gear.color;
  const gc2  = gear.color2 ?? "#374151";

  return (
    <svg
      viewBox="0 0 100 170"
      width={size} height={h}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ overflow: "visible", display: "block" }}
    >
      {/* 1. Hår (bak-lag) */}
      {isGirl ? <GirlHair color={c.hair} skin={c.skin} /> : <BoyHair color={c.hair} skin={c.skin} />}

      {/* 2. Hals */}
      <rect x="44" y="59" width="12" height="9" rx="5" fill={c.skin} />

      {/* 3. Kropp */}
      <path
        d="M 20 67 Q 20 65 22 65 L 78 65 Q 80 65 80 67 L 80 114 Q 80 116 78 116 L 22 116 Q 20 116 20 114 Z"
        fill={c.shirt}
      />
      <path d="M 44 65 L 50 74 L 56 65" fill="none"
        stroke="rgba(0,0,0,0.13)" strokeWidth="1.8" strokeLinejoin="round" />

      {/* 4. Racket FØR høyre arm (slik at hånden ser ut til å gripe) */}
      {cat === "racket" && <GearRacket color={gc} />}

      {/* 5. Armer */}
      <path d="M 24 72 Q 10 88 7 110"
        stroke={c.shirt} strokeWidth="15" strokeLinecap="round" fill="none" />
      <path d="M 76 72 Q 90 86 93 106"
        stroke={c.shirt} strokeWidth="15" strokeLinecap="round" fill="none" />

      {/* 6. Hender */}
      <circle cx="7"  cy="113" r="9" fill={c.skin} />
      <circle cx="93" cy="109" r="9" fill={c.skin} />

      {/* 7. Pannebånd (over panna, under ansiktstrekk) */}
      {cat === "headband" && <GearHeadband color={gc} />}

      {/* 8. Ansiktstrekk */}
      <Face skin={c.skin} />

      {/* 9. Solbriller (over ansiktstrekk) */}
      {cat === "glasses" && <GearGlasses color={gc} color2={gc2} />}

      {/* 10. Skjørt / ben / sko */}
      {isGirl && (
        <path d="M 18 110 L 82 110 L 86 148 L 14 148 Z" fill={c.pants} />
      )}
      {!isGirl ? (
        <>
          <path d="M 38 116 Q 34 138 32 158"
            stroke={c.pants} strokeWidth="16" strokeLinecap="round" fill="none" />
          <path d="M 62 116 Q 66 138 68 158"
            stroke={c.pants} strokeWidth="16" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <path d="M 37 148 Q 33 156 31 162"
            stroke={c.skin} strokeWidth="13" strokeLinecap="round" fill="none" />
          <path d="M 63 148 Q 67 156 69 162"
            stroke={c.skin} strokeWidth="13" strokeLinecap="round" fill="none" />
        </>
      )}
      <ellipse cx="30" cy="161" rx="14" ry="7" fill={c.shoes} />
      <ellipse cx="70" cy="161" rx="14" ry="7" fill={c.shoes} />
      <ellipse cx="28" cy="158" rx="7"  ry="3.5" fill="white" opacity="0.28" />
      <ellipse cx="68" cy="158" rx="7"  ry="3.5" fill="white" opacity="0.28" />

      {/* 11. Hodeplagg (tegnes sist → over alt på hodet) */}
      {(cat === "cap"   || cat === "crown") && (
        cat === "cap"
          ? <GearCap color={gc} color2={gc2} />
          : <GearCrown color={gc} color2={gc2} />
      )}
      {cat === "bow" && <GearBow color={gc} />}
    </svg>
  );
}
