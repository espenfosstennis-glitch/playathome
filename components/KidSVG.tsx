// Enkle, søte helfigur-SVG av barna. 100×170px.

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
      {/* Hårbunn */}
      <ellipse cx="50" cy="26" rx="28" ry="26" fill={color} />
      {/* Ansikt-sirkel over */}
      <ellipse cx="50" cy="34" rx="24" ry="22" fill={skin} />
      {/* Kort hår på toppen */}
      <ellipse cx="50" cy="16" rx="22" ry="10" fill={color} />
    </>
  );
}

function GirlHair({ color, skin }: { color: string; skin: string }) {
  return (
    <>
      {/* Hår bak */}
      <ellipse cx="50" cy="30" rx="28" ry="28" fill={color} />
      {/* Ansikt */}
      <ellipse cx="50" cy="34" rx="24" ry="22" fill={skin} />
      {/* Langt hår til sidene */}
      <rect x="22" y="30" width="8" height="36" rx="4" fill={color} />
      <rect x="70" y="30" width="8" height="36" rx="4" fill={color} />
      {/* Topp-hår */}
      <ellipse cx="50" cy="13" rx="20" ry="9" fill={color} />
    </>
  );
}

function Face({ skin }: { skin: string }) {
  return (
    <>
      {/* Kinn-rosa */}
      <ellipse cx="35" cy="40" rx="5" ry="3.5" fill="#FFB0B0" opacity="0.6" />
      <ellipse cx="65" cy="40" rx="5" ry="3.5" fill="#FFB0B0" opacity="0.6" />
      {/* Øyne */}
      <ellipse cx="40" cy="34" rx="3.5" ry="4" fill="#1a1a2e" />
      <ellipse cx="60" cy="34" rx="3.5" ry="4" fill="#1a1a2e" />
      {/* Øyeglans */}
      <circle cx="41.5" cy="32.5" r="1.2" fill="white" />
      <circle cx="61.5" cy="32.5" r="1.2" fill="white" />
      {/* Munn */}
      <path d="M43 42 Q50 47 57 42" stroke="#cc6655" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Nese */}
      <ellipse cx="50" cy="39" rx="2" ry="1.5" fill={skin} style={{ filter: "brightness(0.88)" }} />
    </>
  );
}

export default function KidSVG({ id, size = 100 }: { id: string; size?: number }) {
  const h = Math.round(size * 1.7);
  const c = CHARS[id.toLowerCase()] ?? CHARS.lars;
  const isGirl = c.gender === "girl";
  // Skjørt for jenter: trapesform under kropp
  const skirt = isGirl;

  return (
    <svg
      viewBox="0 0 100 170"
      width={size} height={h}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      {/* --- HODE --- */}
      {isGirl
        ? <GirlHair color={c.hair} skin={c.skin} />
        : <BoyHair color={c.hair} skin={c.skin} />}
      <Face skin={c.skin} />

      {/* --- HALS --- */}
      <rect x="44" y="55" width="12" height="10" rx="4" fill={c.skin} />

      {/* --- KROPP/SKJORTE --- */}
      <rect x="26" y="63" width="48" height="48" rx="10" fill={c.shirt} />

      {/* Skjørt for jenter */}
      {skirt && (
        <path d="M22 100 L30 140 L70 140 L78 100 Z" fill={c.pants} opacity="0.9" />
      )}

      {/* --- VENSTRE ARM --- */}
      <rect x="8" y="65" width="18" height="38" rx="9" fill={c.shirt} />
      {/* Hånd venstre */}
      <ellipse cx="17" cy="105" rx="9" ry="8" fill={c.skin} />

      {/* --- HØYRE ARM (løftet litt — holder racket) --- */}
      <rect x="74" y="62" width="18" height="38" rx="9" fill={c.shirt} />
      {/* Hånd høyre */}
      <ellipse cx="83" cy="100" rx="9" ry="8" fill={c.skin} />

      {/* --- BEN --- */}
      {!skirt && (
        <>
          <rect x="29" y="109" width="18" height="46" rx="8" fill={c.pants} />
          <rect x="53" y="109" width="18" height="46" rx="8" fill={c.pants} />
        </>
      )}
      {skirt && (
        <>
          <rect x="29" y="136" width="16" height="26" rx="7" fill={c.skin} />
          <rect x="55" y="136" width="16" height="26" rx="7" fill={c.skin} />
        </>
      )}

      {/* --- SKO --- */}
      <ellipse cx="37" cy="157" rx="14" ry="7" fill={c.shoes} />
      <ellipse cx="63" cy="157" rx="14" ry="7" fill={c.shoes} />
      {/* Sko-detalj */}
      <ellipse cx="37" cy="155" rx="8" ry="4" fill="white" opacity="0.25" />
      <ellipse cx="63" cy="155" rx="8" ry="4" fill="white" opacity="0.25" />
    </svg>
  );
}
