"use client";

import { useEffect, useState } from "react";
import { GEAR_ITEMS } from "@/lib/buddies";

// Emoji er satt til nøyaktig 120px (se CSS). Stage er 180×220px.
// Emojien sitter med bunn 20px fra stage-bunn → emoji-topp = 220-20-120 = 80px fra topp.
// Apple emoji-proporsjoner ved 120px:
//   Hodetopp  → +5px   (abs 85px fra stage-topp)
//   Panne     → +15px  (95px)
//   Øyne      → +35px  (115px)
//   Skuldre   → +68px  (148px)
//   Hender    → +85px  (165px)

type GearPos = {
  top?: number; left?: number; right?: number;
  size: number; rotate?: number; centerX?: boolean;
};

const GEAR_POS: Record<string, GearPos> = {
  top:      { top: 48,  size: 52, centerX: true },          // caps/sløyfe: brem på panna, resten over hodet
  eyes:     { top: 108, size: 38, centerX: true },           // solbriller: over øynene
  hand:     { top: 152, right: 2, size: 44, rotate: 30 },   // racket: i hånda
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

      {/* Pannebånd: farget CSS-stripe FORAN emojien */}
      {isHb && HEADBAND_COLOR[gear] && (
        <div
          className={`avatar-hb${pop ? " gear-pop" : ""}`}
          style={{ background: HEADBAND_COLOR[gear] }}
        />
      )}

      {/* Selve figuren */}
      <span className="avatar-char">{emoji}</span>

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
