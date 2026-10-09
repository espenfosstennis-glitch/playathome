// Helfigur SVG med utstyr tegnet direkte inn i figuren.
// ViewBox 0 0 100 170. Gear rendres basert på category + id fra ALL_GEAR.

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
// Ansiktshuden er tegnet her (del av hår-laget) slik at hår rammer inn ansiktet.
function BoyHair({ color, skin }: { color: string; skin: string }) {
  return (
    <>
      <ellipse cx="50" cy="21" rx="28" ry="19" fill={color} />
      {/* Ansiktshud — større og rundere enn før */}
      <ellipse cx="50" cy="39" rx="27" ry="27" fill={skin} />
      <rect x="22" y="17" width="9"  height="26" rx="4.5" fill={color} />
      <rect x="69" y="17" width="9"  height="26" rx="4.5" fill={color} />
      <ellipse cx="50" cy="10" rx="22" ry="10" fill={color} />
    </>
  );
}

function GirlHair({ color, skin }: { color: string; skin: string }) {
  return (
    <>
      <ellipse cx="50" cy="24" rx="29" ry="23" fill={color} />
      {/* Ansiktshud */}
      <ellipse cx="50" cy="39" rx="27" ry="27" fill={skin} />
      <path d="M 21 27 Q 13 56 15 80" stroke={color} strokeWidth="14" strokeLinecap="round" fill="none" />
      <path d="M 79 27 Q 87 56 85 80" stroke={color} strokeWidth="14" strokeLinecap="round" fill="none" />
      <ellipse cx="50" cy="10" rx="22" ry="10" fill={color} />
    </>
  );
}

/* ── Ansikt ────────────────────────────────────────────────────── */
// Øyne er større og mer runde, ingen øyebryn, tydeligere kinn — alle typiske barn-trekk.
function Face({ skin }: { skin: string }) {
  return (
    <>
      {/* Kinn-klumper */}
      <ellipse cx="22" cy="41" rx="7"   ry="8"   fill={skin} />
      <ellipse cx="78" cy="41" rx="7"   ry="8"   fill={skin} />
      <ellipse cx="22" cy="41" rx="4"   ry="5"   fill={skin} style={{ filter: "brightness(0.84)" }} />
      <ellipse cx="78" cy="41" rx="4"   ry="5"   fill={skin} style={{ filter: "brightness(0.84)" }} />

      {/* Rødme-kinn — store og tydelige */}
      <ellipse cx="33" cy="51" rx="9"   ry="5.5" fill="#FFAAAA" opacity="0.55" />
      <ellipse cx="67" cy="51" rx="9"   ry="5.5" fill="#FFAAAA" opacity="0.55" />

      {/* Øyne — hvit sklera + stor mørk iris + lysrefleks */}
      <ellipse cx="41" cy="41" rx="7"   ry="7.5" fill="white" />
      <ellipse cx="59" cy="41" rx="7"   ry="7.5" fill="white" />
      <ellipse cx="41" cy="41" rx="5.8" ry="6.2" fill="#1a1a2e" />
      <ellipse cx="59" cy="41" rx="5.8" ry="6.2" fill="#1a1a2e" />
      <circle  cx="43.5" cy="38.5" r="2.2" fill="white" />
      <circle  cx="61.5" cy="38.5" r="2.2" fill="white" />
      <circle  cx="40"   cy="44"   r="0.9" fill="white" opacity="0.55" />
      <circle  cx="58"   cy="44"   r="0.9" fill="white" opacity="0.55" />

      {/* Nese — to bittesmå prikker */}
      <circle cx="47" cy="51" r="1.4" fill={skin} style={{ filter: "brightness(0.72)" }} />
      <circle cx="53" cy="51" r="1.4" fill={skin} style={{ filter: "brightness(0.72)" }} />

      {/* Munn — stor rund barnessmil */}
      <path d="M 41 56 Q 50 65 59 56" stroke="#CC3333" strokeWidth="2.8"
        fill="none" strokeLinecap="round" />
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════
   GEAR: RACKETER
   ══════════════════════════════════════════════════════════════════ */

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

function GearRacketRainbow() {
  const strings = [
    { y: -43, xr: 6,    c: "#EF4444" },
    { y: -39, xr: 9,    c: "#F97316" },
    { y: -35, xr: 11,   c: "#EAB308" },
    { y: -31, xr: 12.5, c: "#22C55E" },
    { y: -28, xr: 13,   c: "#3B82F6" },
    { y: -25, xr: 12.5, c: "#8B5CF6" },
    { y: -21, xr: 11,   c: "#EC4899" },
    { y: -17, xr: 9,    c: "#F97316" },
  ];
  return (
    <g transform="translate(90, 103) rotate(25)">
      <ellipse cx="0" cy="-28" rx="13" ry="17" fill="#F8FAFC" />
      {strings.map((s, i) => (
        <line key={i} x1={-s.xr} y1={s.y} x2={s.xr} y2={s.y} stroke={s.c} strokeWidth="1.8" />
      ))}
      <line x1="-7" y1="-45" x2="-7" y2="-11" stroke="white" strokeWidth="0.7" opacity="0.5" />
      <line x1="0"  y1="-45" x2="0"  y2="-11" stroke="white" strokeWidth="0.7" opacity="0.5" />
      <line x1="7"  y1="-45" x2="7"  y2="-11" stroke="white" strokeWidth="0.7" opacity="0.5" />
      <ellipse cx="0" cy="-28" rx="13" ry="17" fill="none" stroke="#94A3B8" strokeWidth="3" />
      <path d="M -5 -11 L 0 -2 L 5 -11" fill="#94A3B8" />
      <rect x="-4" y="-2" width="8" height="18" rx="4" fill="#64748B" />
      <rect x="-3.5" y="5" width="7" height="10" rx="3" fill="white" opacity="0.22" />
    </g>
  );
}

function GearRacketLightning({ color, color2 }: { color: string; color2: string }) {
  return (
    <g transform="translate(90, 103) rotate(25)">
      <ellipse cx="0" cy="-28" rx="13" ry="17" fill={color2} opacity="0.9" />
      <path d="M 5 -44 L -4 -28 L 4 -28 L -5 -12" stroke={color} strokeWidth="6" fill="none"
        strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
      <path d="M 5 -44 L -4 -28 L 4 -28 L -5 -12" stroke={color} strokeWidth="2.5" fill="none"
        strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="0" cy="-28" rx="13" ry="17" fill="none" stroke={color} strokeWidth="3" />
      <path d="M -5 -11 L 0 -2 L 5 -11" fill={color2} />
      <rect x="-4" y="-2" width="8" height="18" rx="4" fill={color2} />
      <rect x="-4" y="-2" width="8" height="6" rx="3" fill={color} opacity="0.5" />
    </g>
  );
}

function GearRacketStar({ color }: { color: string }) {
  const star = "M 0 -43 L 2.4 -36.6 L 9.4 -36.6 L 3.9 -32.6 L 5.9 -26.2 L 0 -30.2 L -5.9 -26.2 L -3.9 -32.6 L -9.4 -36.6 L -2.4 -36.6 Z";
  return (
    <g transform="translate(90, 103) rotate(25)">
      <ellipse cx="0" cy="-28" rx="13" ry="17" fill="rgba(255,215,0,0.1)" />
      <path d={star} fill={color} opacity="0.3" transform="scale(1.25) translate(0,1)" />
      <path d={star} fill={color} />
      <ellipse cx="0" cy="-28" rx="13" ry="17" fill="none" stroke={color} strokeWidth="3" />
      <path d="M -5 -11 L 0 -2 L 5 -11" fill={color} />
      <rect x="-4" y="-2" width="8" height="18" rx="4" fill={color} />
      <rect x="-3.5" y="5" width="7" height="10" rx="3" fill="white" opacity="0.22" />
    </g>
  );
}

function GearRacketFire({ color, color2 }: { color: string; color2: string }) {
  return (
    <g transform="translate(90, 103) rotate(25)">
      <ellipse cx="0" cy="-28" rx="13" ry="17" fill="rgba(239,68,68,0.08)" />
      <path d="M -5 -44 Q -8 -54 -4 -58 Q 0 -63 4 -58 Q 8 -54 5 -44"
        fill={color2} opacity="0.88" />
      <line x1="-12" y1="-33" x2="12" y2="-33" stroke={color}  strokeWidth="1.1" opacity="0.7" />
      <line x1="-13" y1="-28" x2="13" y2="-28" stroke={color2} strokeWidth="1.1" opacity="0.7" />
      <line x1="-12" y1="-23" x2="12" y2="-23" stroke={color}  strokeWidth="1.1" opacity="0.7" />
      <line x1="-8"  y1="-45" x2="-8" y2="-11" stroke={color2} strokeWidth="0.9" opacity="0.5" />
      <line x1="0"   y1="-45" x2="0"  y2="-11" stroke={color}  strokeWidth="0.9" opacity="0.5" />
      <line x1="8"   y1="-45" x2="8"  y2="-11" stroke={color2} strokeWidth="0.9" opacity="0.5" />
      <ellipse cx="0" cy="-28" rx="13" ry="17" fill="none" stroke={color} strokeWidth="3" />
      <path d="M -5 -11 L 0 -2 L 5 -11" fill={color} />
      <rect x="-4" y="-2" width="8" height="18" rx="4" fill={color} />
      <rect x="-3.5" y="5" width="7" height="10" rx="3" fill={color2} opacity="0.3" />
    </g>
  );
}

/* ══════════════════════════════════════════════════════════════════
   GEAR: DYREØRER — tegnes FØR hår slik at hår dekker bunnen
   ══════════════════════════════════════════════════════════════════ */

function GearEarsBunny() {
  return (
    <g>
      <ellipse cx="33" cy="-2" rx="8.5" ry="22" fill="white" />
      <ellipse cx="33" cy="-2" rx="4.5" ry="14" fill="#F9A8D4" />
      <ellipse cx="67" cy="-2" rx="8.5" ry="22" fill="white" />
      <ellipse cx="67" cy="-2" rx="4.5" ry="14" fill="#F9A8D4" />
    </g>
  );
}

function GearEarsCat({ color, color2 }: { color: string; color2: string }) {
  return (
    <g>
      <path d="M 26 11 L 35 -16 L 47 11 Z" fill={color} />
      <path d="M 30 11 L 35 -5  L 43 11 Z" fill={color2} opacity="0.55" />
      <path d="M 74 11 L 65 -16 L 53 11 Z" fill={color} />
      <path d="M 70 11 L 65 -5  L 57 11 Z" fill={color2} opacity="0.55" />
    </g>
  );
}

function GearEarsBear({ color }: { color: string }) {
  return (
    <g>
      <circle cx="22" cy="13" r="13" fill={color} />
      <circle cx="22" cy="13" r="7.5" fill={color} style={{ filter: "brightness(0.72)" }} />
      <circle cx="78" cy="13" r="13" fill={color} />
      <circle cx="78" cy="13" r="7.5" fill={color} style={{ filter: "brightness(0.72)" }} />
    </g>
  );
}

/* ══════════════════════════════════════════════════════════════════
   GEAR: MAGI — tegnes FØR hår (spiss stikker opp over håret)
   ══════════════════════════════════════════════════════════════════ */

function GearHornUnicorn() {
  const stripes = [
    { yBot: 0,   yTop: -7,  w: 6,   c: "#F472B6" },
    { yBot: -7,  yTop: -14, w: 4.5, c: "#A78BFA" },
    { yBot: -14, yTop: -21, w: 3,   c: "#60A5FA" },
    { yBot: -21, yTop: -28, w: 1.8, c: "#34D399" },
    { yBot: -28, yTop: -34, w: 0.8, c: "#FBBF24" },
  ];
  return (
    <g transform="translate(50, 12)">
      <path d="M -6 2 L 0 -35 L 6 2 Z" fill="#E879F9" opacity="0.25" />
      {stripes.map((s, i) => (
        <path key={i}
          d={`M ${-s.w} ${s.yBot} L ${s.w} ${s.yBot} L ${s.w * 0.5} ${s.yTop} L ${-s.w * 0.5} ${s.yTop} Z`}
          fill={s.c}
        />
      ))}
      <circle cx="-15" cy="-18" r="2.5" fill="#FBBF24" opacity="0.92" />
      <circle cx="14"  cy="-25" r="2"   fill="#F472B6" opacity="0.92" />
      <circle cx="-10" cy="-31" r="1.5" fill="#60A5FA" opacity="0.92" />
    </g>
  );
}

function GearHatWizard({ color, color2 }: { color: string; color2: string }) {
  return (
    <g transform="translate(50, 12)">
      <path d="M -27 0 Q -6 -50 0 -62 Q 6 -50 27 0 Z" fill={color} />
      <ellipse cx="0" cy="0" rx="29" ry="7" fill={color} />
      <rect x="-24" y="-5" width="48" height="6" rx="1" fill={color2} opacity="0.35" />
      <text x="-6"  y="-30" fontSize="13" fill={color2} textAnchor="middle">⭐</text>
      <text x="10" y="-13" fontSize="9"  fill={color2} textAnchor="middle" opacity="0.85">✨</text>
    </g>
  );
}

/* ══════════════════════════════════════════════════════════════════
   GEAR: SUPERHELTER + BRILLER — tegnes ETTER ansikt
   Posisjonert for øyne på cy≈41
   ══════════════════════════════════════════════════════════════════ */

function GearMaskHero({ color }: { color: string }) {
  return (
    <g>
      <path d="M 25 38 Q 31 29 41 37 Q 41 50 32 50 Q 25 49 25 38 Z" fill={color} />
      <path d="M 59 37 Q 69 29 75 38 Q 75 49 68 50 Q 59 50 59 37 Z" fill={color} />
      <path d="M 41 41 Q 50 37 59 41" stroke={color} strokeWidth="5.5" fill="none" strokeLinecap="round" />
      <path d="M 25 42 Q 17 46 13 48" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 75 42 Q 83 46 87 48" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  );
}

// Stjerne-briller: 5-takede stjerner sentrert på øyne (41,41) og (59,41), R=10.5 r=5
function GearGlassesStar({ color }: { color: string }) {
  const L = "M 41 30.5 L 43.9 37.0 L 51.0 37.8 L 45.8 42.6 L 47.2 49.5 L 41.0 46.0 L 34.8 49.5 L 36.2 42.6 L 31.0 37.8 L 38.1 37.0 Z";
  const R = "M 59 30.5 L 61.9 37.0 L 69.0 37.8 L 63.8 42.6 L 65.2 49.5 L 59.0 46.0 L 52.8 49.5 L 54.2 42.6 L 49.0 37.8 L 56.1 37.0 Z";
  return (
    <g>
      <path d={L} fill={color} opacity="0.82" />
      <path d={R} fill={color} opacity="0.82" />
      <path d={L} fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
      <path d={R} fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
      <path d="M 51 40 L 54 40.5" stroke="rgba(0,0,0,0.3)" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

// Hjerte-briller: sirkel-par + trekant sentrert på øyne
function GearGlassesHeart({ color }: { color: string }) {
  return (
    <g>
      <circle cx="35" cy="38" r="6"   fill={color} opacity="0.82" />
      <circle cx="47" cy="38" r="6"   fill={color} opacity="0.82" />
      <path d="M 29 41 L 41 52 L 53 41 Z" fill={color} opacity="0.82" />
      <circle cx="53" cy="38" r="6"   fill={color} opacity="0.82" />
      <circle cx="65" cy="38" r="6"   fill={color} opacity="0.82" />
      <path d="M 47 41 L 59 52 L 71 41 Z" fill={color} opacity="0.82" />
      <path d="M 53 39 L 56 39.5" stroke="rgba(0,0,0,0.25)" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

/* ── Gear: Krone ────────────────────────────────────────────────── */
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
  const h    = Math.round(size * 1.7);
  const c    = CHARS[id.toLowerCase()] ?? CHARS.lars;
  const isGirl = c.gender === "girl";

  const gear: GearItem = ALL_GEAR.find((g) => g.id === gearId) ?? ALL_GEAR[0];
  const cat  = gear.category;
  const gc   = gear.color;
  const gc2  = gear.color2 ?? "#F9A8D4";

  function renderRacket() {
    switch (gearId) {
      case "racket-rainbow":   return <GearRacketRainbow />;
      case "racket-lightning": return <GearRacketLightning color={gc} color2={gc2} />;
      case "racket-star":      return <GearRacketStar color={gc} />;
      case "racket-fire":      return <GearRacketFire color={gc} color2={gc2} />;
      default:                 return <GearRacket color={gc} />;
    }
  }

  return (
    <svg
      viewBox="0 0 100 170"
      width={size} height={h}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ overflow: "visible", display: "block" }}
    >
      {/* 1. Dyreører + enhjørning-horn: FØR hår → hår dekker basen */}
      {cat === "ears" && gearId === "ears-bunny" && <GearEarsBunny />}
      {cat === "ears" && gearId === "ears-cat"   && <GearEarsCat color={gc} color2={gc2} />}
      {cat === "ears" && gearId === "ears-bear"  && <GearEarsBear color={gc} />}
      {cat === "magic" && gearId === "horn-unicorn" && <GearHornUnicorn />}

      {/* 2. Hår + ansiktshud */}
      {isGirl ? <GirlHair color={c.hair} skin={c.skin} /> : <BoyHair color={c.hair} skin={c.skin} />}

      {/* 3. Hals (svært kort — barn har nesten ingen hals) */}
      <rect x="44" y="63" width="12" height="7" rx="5" fill={c.skin} />

      {/* 4. Kropp — litt rundere og med mage-kurve */}
      <path
        d="M 21 68 Q 19 66 22 66 L 78 66 Q 81 66 79 68 L 82 114 Q 82 116 79 116 L 21 116 Q 18 116 18 114 Z"
        fill={c.shirt}
      />
      <path d="M 44 66 L 50 75 L 56 66" fill="none"
        stroke="rgba(0,0,0,0.12)" strokeWidth="1.8" strokeLinejoin="round" />

      {/* 5. Racket FØR høyre arm → hånden ser ut til å gripe */}
      {cat === "racket" && renderRacket()}

      {/* 6. Armer — korte og lubne */}
      <path d="M 24 73 Q 9 88 6 109"
        stroke={c.shirt} strokeWidth="15" strokeLinecap="round" fill="none" />
      <path d="M 76 73 Q 91 86 94 106"
        stroke={c.shirt} strokeWidth="15" strokeLinecap="round" fill="none" />

      {/* 7. Hender — lubne, runde */}
      <circle cx="6"  cy="112" r="9" fill={c.skin} />
      <circle cx="94" cy="109" r="9" fill={c.skin} />

      {/* 8. Ansiktstrekk */}
      <Face skin={c.skin} />

      {/* 9. Utstyr over ansikt */}
      {cat === "mask"    && gearId === "mask-hero"     && <GearMaskHero color={gc} />}
      {cat === "glasses" && gearId === "glasses-star"  && <GearGlassesStar color={gc} />}
      {cat === "glasses" && gearId === "glasses-heart" && <GearGlassesHeart color={gc} />}

      {/* 10. Ben / skjørt / sko — mye kortere enn voksne */}
      {isGirl && (
        <path d="M 18 112 L 82 112 L 85 146 L 15 146 Z" fill={c.pants} />
      )}
      {!isGirl ? (
        <>
          <path d="M 38 116 Q 34 132 32 147"
            stroke={c.pants} strokeWidth="16" strokeLinecap="round" fill="none" />
          <path d="M 62 116 Q 66 132 68 147"
            stroke={c.pants} strokeWidth="16" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <path d="M 37 146 Q 33 153 31 158"
            stroke={c.skin} strokeWidth="13" strokeLinecap="round" fill="none" />
          <path d="M 63 146 Q 67 153 69 158"
            stroke={c.skin} strokeWidth="13" strokeLinecap="round" fill="none" />
        </>
      )}
      {/* Sko — litt høyere opp */}
      <ellipse cx="30" cy="150" rx="13" ry="6"   fill={c.shoes} />
      <ellipse cx="70" cy="150" rx="13" ry="6"   fill={c.shoes} />
      <ellipse cx="28" cy="147" rx="6.5" ry="3"  fill="white" opacity="0.28" />
      <ellipse cx="68" cy="147" rx="6.5" ry="3"  fill="white" opacity="0.28" />

      {/* 11. Trollmannshatt + krone tegnes sist */}
      {cat === "magic" && gearId === "hat-wizard" && <GearHatWizard color={gc} color2={gc2} />}
      {cat === "crown" && <GearCrown color={gc} color2={gc2} />}
    </svg>
  );
}
