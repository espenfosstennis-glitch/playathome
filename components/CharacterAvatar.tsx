"use client";

import { GEAR_ITEMS } from "@/lib/buddies";

// Plasserer utstyr på riktige steder på figuren.
// Emojien er ca 160px høy; vi bruker prosentverdier relativt til wrapperens høyde.
const SLOT_STYLE: Record<string, React.CSSProperties> = {
  top:      { top: "-18%", left: "50%", transform: "translateX(-50%)", fontSize: "42%" },
  forehead: { top: "4%",  left: "50%", transform: "translateX(-50%)", fontSize: "28%" },
  eyes:     { top: "28%", left: "50%", transform: "translateX(-50%)", fontSize: "36%" },
  hand:     { bottom: "8%", right: "-18%", fontSize: "46%" },
};

// Pannebånd rendres som en farget CSS-stripe, ikke emoji
const HEADBAND_COLOR: Record<string, string> = {
  "🩷": "#f472b6",
  "💚": "#22c55e",
};

export default function CharacterAvatar({
  emoji,
  gear,
  bump,
}: {
  emoji: string;
  gear: string;
  bump: boolean;
}) {
  const item = GEAR_ITEMS.find((g) => g.emoji === gear);

  return (
    <div className={`avatar-wrap${bump ? " bump" : ""}`}>
      <div className="avatar-glow" />

      {/* Pannebånd: CSS-stripe */}
      {item?.slot === "forehead" && HEADBAND_COLOR[gear] && (
        <div
          className="avatar-headband"
          style={{ background: HEADBAND_COLOR[gear] }}
          aria-hidden="true"
        />
      )}

      {/* Hovedikonet */}
      <span className="avatar-char" aria-hidden="true">{emoji}</span>

      {/* Utstyr festet til figuren */}
      {item && item.slot !== "forehead" && gear && (
        <span
          className="avatar-gear"
          style={SLOT_STYLE[item.slot]}
          aria-hidden="true"
        >
          {gear}
        </span>
      )}

      <div className="avatar-shadow" />
    </div>
  );
}
