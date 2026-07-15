"use client";

import { useEffect, useState } from "react";
import { GEAR_ITEMS } from "@/lib/buddies";
import KidSVG from "./KidSVG";

// SVG figur: 100×170px, stage: 180×220px.
// SVG plassert: bottom:18px, sentrert horisontalt.
// → SVG-topp: 220-18-170 = 32px fra stage-topp, venstre: 40px
// Hode: cx=50 cy=36 ry=25 → stage-senter (90, 68) | hårtopp SVG y≈3 → stage y≈35
// Øyne: SVG y=37 → stage y=69
// Høyre hånd: SVG (93,109) → stage (133, 141)

type GearPos = {
  top?: number; left?: number; right?: number;
  size: number; rotate?: number; centerX?: boolean;
};

const GEAR_POS: Record<string, GearPos> = {
  top:  { top: 13,  size: 38, centerX: true },           // caps/sløyfe: på hårtoppen
  eyes: { top: 56,  size: 30, centerX: true },           // solbriller: over øynene
  hand: { top: 120, right: 22, size: 36, rotate: 30 },  // racket: i høyre hånd
};

const HEADBAND_COLOR: Record<string, string> = {
  "🩷": "#f9a8d4",
  "💚": "#4ade80",
};

export default function CharacterAvatar({
  buddyId, gear, bump,
}: {
  buddyId: string; gear: string; bump: boolean;
}) {
  const item = GEAR_ITEMS.find((g) => g.emoji === gear);
  const isHb = item?.slot === "forehead";
  const pos  = item ? GEAR_POS[item.slot] : null;

  const [pop, setPop] = useState(false);
  useEffect(() => {
    if (!gear) return;
    setPop(true);
    const t = setTimeout(() => setPop(false), 400);
    return () => clearTimeout(t);
  }, [gear]);

  const accStyle: React.CSSProperties = pos ? {
    position: "absolute",
    top:      pos.top  != null ? pos.top  : undefined,
    right:    pos.right != null ? pos.right : undefined,
    left:     pos.centerX ? "50%" : (pos.left != null ? pos.left : undefined),
    transform: [
      pos.centerX ? "translateX(-50%)" : "",
      pos.rotate  ? `rotate(${pos.rotate}deg)` : "",
    ].filter(Boolean).join(" ") || undefined,
    fontSize: pos.size,
    lineHeight: 1,
    zIndex: 3,
    pointerEvents: "none",
    filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.22))",
  } : {};

  return (
    <div className={`avatar-stage${bump ? " bump" : ""}`} aria-hidden="true">
      <div className="avatar-glow" />

      {/* Pannebånd: farget CSS-stripe foran figuren */}
      {isHb && HEADBAND_COLOR[gear] && (
        <div
          className={`avatar-hb${pop ? " gear-pop-hb" : ""}`}
          style={{ background: HEADBAND_COLOR[gear] }}
        />
      )}

      {/* Hele barn-figuren som SVG */}
      <div className="avatar-svg-wrap">
        <KidSVG id={buddyId} />
      </div>

      {/* Utstyr presist plassert */}
      {item && !isHb && gear && (
        <span className={pop ? "gear-pop" : ""} style={accStyle}>
          {gear}
        </span>
      )}

      <div className="avatar-shadow" />
    </div>
  );
}
