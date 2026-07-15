// Helfigur SVG — stroke-path for armer/bein gir naturlig rund-rørform.
// ViewBox 0 0 100 170 (samme som før så gear-posisjonering holder).

type CharDef = {
  skin: string; hair: string; shirt: string;
  pants: string; shoes: string; gender: "boy" | "girl";
};

const CHARS: Record<string, CharDef> = {
  lars: { skin: "#FFD0B5", hair: "#F5C842", shirt: "#3B82F6", pants: "#1D4ED8", shoes: "#1E293B", gender: "boy" },
  noah: { skin: "#C68642", hair: "#1C0A00", shirt: "#F97316", pants: "#111827", shoes: "#0F172A", gender: "boy" },
  emma: { skin: "#FFD0B5", hair: "#E8A04A", shirt: "#EC4899", pants: "#EC4899", shoes: "#BE185D", gender: "girl" },
  maja: { skin: "#C68642", hair: "#1C0A00", shirt: "#A855F7", pants: "#A855F7", shoes: "#7E22CE", gender: "girl" },
};

function BoyHair({ color, skin }: { color: string; skin: string }) {
  return (
    <>
      {/* Hår bak og sider */}
      <ellipse cx="50" cy="22" rx="27" ry="18" fill={color} />
      {/* Ansikt */}
      <ellipse cx="50" cy="36" rx="26" ry="25" fill={skin} />
      {/* Hår side-paneler */}
      <rect x="23" y="18" width="8" height="25" rx="4" fill={color} />
      <rect x="69" y="18" width="8" height="25" rx="4" fill={color} />
      {/* Hår topp */}
      <ellipse cx="50" cy="11" rx="20" ry="8" fill={color} />
    </>
  );
}

function GirlHair({ color, skin }: { color: string; skin: string }) {
  return (
    <>
      {/* Langt hår bak */}
      <ellipse cx="50" cy="26" rx="28" ry="24" fill={color} />
      {/* Ansikt */}
      <ellipse cx="50" cy="36" rx="26" ry="25" fill={skin} />
      {/* Langt hår side-lokker */}
      <path d="M 22 28 Q 14 55 16 78" stroke={color} strokeWidth="13" strokeLinecap="round" fill="none" />
      <path d="M 78 28 Q 86 55 84 78" stroke={color} strokeWidth="13" strokeLinecap="round" fill="none" />
      {/* Hår topp */}
      <ellipse cx="50" cy="11" rx="21" ry="8" fill={color} />
    </>
  );
}

function Face({ skin }: { skin: string }) {
  // Øyebryn-farge basert på hudtone (unngå svarte buer på mørk hud)
  const brow = skin === "#C68642" ? "#5A3010" : "#8B5E3C";
  return (
    <>
      {/* Ører */}
      <ellipse cx="24" cy="38" rx="6" ry="7" fill={skin} />
      <ellipse cx="76" cy="38" rx="6" ry="7" fill={skin} />
      <ellipse cx="24" cy="38" rx="3.5" ry="4.5" fill={skin} style={{ filter: "brightness(0.86)" }} />
      <ellipse cx="76" cy="38" rx="3.5" ry="4.5" fill={skin} style={{ filter: "brightness(0.86)" }} />

      {/* Kinn-rosa */}
      <ellipse cx="36" cy="45" rx="6.5" ry="4" fill="#FFB0B0" opacity="0.5" />
      <ellipse cx="64" cy="45" rx="6.5" ry="4" fill="#FFB0B0" opacity="0.5" />

      {/* Øyebryn */}
      <path d="M 37 30 Q 41 27 45 30" stroke={brow} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 55 30 Q 59 27 63 30" stroke={brow} strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Øyne */}
      <ellipse cx="41" cy="37" rx="4" ry="4.5" fill="#1a1a2e" />
      <ellipse cx="59" cy="37" rx="4" ry="4.5" fill="#1a1a2e" />
      {/* Glans */}
      <circle cx="42.5" cy="35.5" r="1.5" fill="white" />
      <circle cx="60.5" cy="35.5" r="1.5" fill="white" />

      {/* Nese */}
      <path d="M 48 41 Q 50 45 52 41" stroke={skin} strokeWidth="1.8"
        fill="none" strokeLinecap="round" style={{ filter: "brightness(0.8)" }} />

      {/* Smil */}
      <path d="M 42 47 Q 50 54 58 47" stroke="#D05050" strokeWidth="2.4"
        fill="none" strokeLinecap="round" />
    </>
  );
}

export default function KidSVG({ id, size = 100 }: { id: string; size?: number }) {
  const h = Math.round(size * 1.7);
  const c = CHARS[id.toLowerCase()] ?? CHARS.lars;
  const isGirl = c.gender === "girl";

  return (
    <svg
      viewBox="0 0 100 170"
      width={size} height={h}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ overflow: "visible", display: "block" }}
    >
      {/* HODE */}
      {isGirl
        ? <GirlHair color={c.hair} skin={c.skin} />
        : <BoyHair color={c.hair} skin={c.skin} />}
      <Face skin={c.skin} />

      {/* HALS */}
      <rect x="44" y="59" width="12" height="9" rx="5" fill={c.skin} />

      {/* KROPP — trapes-form (bred i skuldrene, litt smalere i midjen) */}
      <path
        d="M 20 67 Q 20 65 22 65 L 78 65 Q 80 65 80 67 L 80 114 Q 80 116 78 116 L 22 116 Q 20 116 20 114 Z"
        fill={c.shirt}
      />
      {/* Krage-V */}
      <path d="M 44 65 L 50 74 L 56 65" fill="none"
        stroke="rgba(0,0,0,0.13)" strokeWidth="1.8" strokeLinejoin="round" />

      {/* VENSTRE ARM — stroke-path gir naturlig rund rørform */}
      <path d="M 24 72 Q 10 88 7 110"
        stroke={c.shirt} strokeWidth="15" strokeLinecap="round" fill="none" />
      {/* Venstre hånd */}
      <circle cx="7" cy="113" r="9" fill={c.skin} />

      {/* HØYRE ARM — litt hevet, klar til å slå */}
      <path d="M 76 72 Q 90 86 93 106"
        stroke={c.shirt} strokeWidth="15" strokeLinecap="round" fill="none" />
      {/* Høyre hånd */}
      <circle cx="93" cy="109" r="9" fill={c.skin} />

      {/* SKJØRT for jenter */}
      {isGirl && (
        <path d="M 18 110 L 82 110 L 86 148 L 14 148 Z" fill={c.pants} />
      )}

      {/* BEN — stroke-path gir naturlig form */}
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

      {/* SKO */}
      <ellipse cx="30" cy="161" rx="14" ry="7" fill={c.shoes} />
      <ellipse cx="70" cy="161" rx="14" ry="7" fill={c.shoes} />
      {/* Sko-glans */}
      <ellipse cx="28" cy="158" rx="7" ry="3.5" fill="white" opacity="0.28" />
      <ellipse cx="68" cy="158" rx="7" ry="3.5" fill="white" opacity="0.28" />
    </svg>
  );
}
