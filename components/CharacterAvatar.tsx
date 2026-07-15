"use client";

import { useEffect, useState } from "react";
import KidSVG from "./KidSVG";

// 8 gnister i en ring rundt figuren — avvikende retning per index.
const SPARKS = ["⭐", "✨", "💫", "🌟", "⭐", "✨", "💫", "🌟"];

export default function CharacterAvatar({
  buddyId, gearId, bump,
}: {
  buddyId: string; gearId: string; bump: boolean;
}) {
  const [sparkling, setSparkling] = useState(false);
  const [dancing,   setDancing]   = useState(false);

  // Sparkle-eksplosjon hver gang gear byttes (unntatt "ingen")
  useEffect(() => {
    if (gearId === "none") return;
    setSparkling(true);
    const t = setTimeout(() => setSparkling(false), 750);
    return () => clearTimeout(t);
  }, [gearId]);

  function handleClick() {
    if (dancing) return;
    setDancing(true);
    setTimeout(() => setDancing(false), 700);
  }

  const cls = [
    "avatar-stage",
    bump    ? "bump"  : "",
    dancing ? "dance" : "",
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

      {/* Sparkle-ring — 8 elementer stråler utover */}
      {sparkling && SPARKS.map((s, i) => (
        <span
          key={i}
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
