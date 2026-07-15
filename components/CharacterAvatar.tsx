"use client";

import { useEffect, useState } from "react";
import { GEAR_ITEMS } from "@/lib/buddies";

// Posisjonering er tunet for Apple emoji ved 120px tegnhøyde.
// Wrapper er 200×240px — ekstra rom for caps over hodet og racket til siden.
const SLOT: Record<string, React.CSSProperties> = {
  top:   { top: "0px",    left: "50%", transform: "translateX(-50%) rotate(-5deg)", fontSize: "2.8rem" },
  eyes:  { top: "44px",   left: "50%", transform: "translateX(-50%)",               fontSize: "2rem"   },
  hand:  { top: "80px",   right: "4px", transform: "rotate(30deg)",                  fontSize: "2.8rem" },
};

const HEADBAND_COLOR: Record<string, string> = {
  "🩷": "#f9a8d4",
  "💚": "#4ade80",
};

export default function CharacterAvatar({
  emoji, gear, bump,
}: {
  emoji: string; gear: string; bump: boolean;
}) {
  const item  = GEAR_ITEMS.find((g) => g.emoji === gear);
  const isHb  = item?.slot === "forehead";
  const hbCol = gear ? HEADBAND_COLOR[gear] : null;

  // Trigger pop-animasjon når gear endres
  const [pop, setPop] = useState(false);
  useEffect(() => {
    if (!gear) return;
    setPop(true);
    const t = setTimeout(() => setPop(false), 400);
    return () => clearTimeout(t);
  }, [gear]);

  return (
    <div className={`avatar-stage${bump ? " bump" : ""}`}>
      <div className="avatar-glow" aria-hidden="true" />

      {/* Pannebånd bak figuren */}
      {isHb && hbCol && (
        <div
          className={`avatar-hb${pop ? " gear-pop" : ""}`}
          style={{ background: hbCol }}
          aria-hidden="true"
        />
      )}

      {/* Hovedikonet */}
      <span className="avatar-char" aria-hidden="true">{emoji}</span>

      {/* Utstyr foran figuren */}
      {item && !isHb && gear && (
        <span
          className={`avatar-acc${pop ? " gear-pop" : ""}`}
          style={SLOT[item.slot]}
          aria-hidden="true"
        >
          {gear}
        </span>
      )}

      <div className="avatar-shadow" aria-hidden="true" />
    </div>
  );
}
