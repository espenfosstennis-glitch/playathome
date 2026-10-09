"use client";

import { useState } from "react";
import KidSVG from "./KidSVG";

// 8 gnister i en ring rundt figuren — avvikende retning per index.
const SPARKS = ["⭐", "✨", "💫", "🌟", "⭐", "✨", "💫", "🌟"];

export default function CharacterAvatar({
  buddyId, gearId, bump, wave = false,
}: {
  buddyId: string; gearId: string; bump: boolean; wave?: boolean;
}) {
  const [dancing, setDancing] = useState(false);

  function handleClick() {
    if (dancing) return;
    setDancing(true);
    setTimeout(() => setDancing(false), 700);
  }

  const cls = [
    "avatar-stage",
    bump    ? "bump"  : "",
    dancing ? "dance" : "",
    wave && !bump && !dancing ? "wave" : "",
  ].filter(Boolean).join(" ");

  return (
    <div
      className={cls}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Trykk på spilleren"
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      style={{ cursor: "pointer" }}
    >
      <div className="avatar-glow" />

      {/* Sparkle-ring hver gang gear byttes (unntatt "ingen"). key={gearId} spiller animasjonen
          på nytt ved bytte; den slutter usynlig av seg selv (forwards), så ingen state trengs. */}
      {gearId !== "none" && SPARKS.map((s, i) => (
        <span
          key={`${gearId}-${i}`}
          className="sparkle"
          style={{ "--si": i } as React.CSSProperties}
          aria-hidden="true"
        >
          {s}
        </span>
      ))}

      <div className="avatar-svg-wrap">
        <KidSVG id={buddyId} gearId={gearId} size={100} />
      </div>

      <div className="avatar-shadow" />
    </div>
  );
}
