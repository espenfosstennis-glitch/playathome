"use client";

import { useState } from "react";
import KidSVG from "./KidSVG";
import type { GearItem } from "@/lib/buddies";

const CONFETTI_COLORS = [
  "#F97316", "#3B82F6", "#EC4899", "#22C55E",
  "#EAB308", "#A855F7", "#EF4444", "#06B6D4",
];

function Confetti() {
  const [pieces] = useState(() =>
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      left:  Math.round(Math.random() * 100),
      delay: +(Math.random() * 0.9).toFixed(2),
      size:  6 + Math.round(Math.random() * 8),
      rot:   Math.round(Math.random() * 360),
      wide:  Math.random() > 0.5,
    }))
  );

  return (
    <div className="confetti-wrap" aria-hidden="true">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left:             `${p.left}%`,
            width:            p.wide ? p.size * 1.6 : p.size,
            height:           p.size,
            background:       p.color,
            animationDelay:   `${p.delay}s`,
            transform:        `rotate(${p.rot}deg)`,
            borderRadius:     p.wide ? "2px" : "50%",
          }}
        />
      ))}
    </div>
  );
}

export default function UnlockModal({
  buddyId, item, onClose,
}: {
  buddyId: string; item: GearItem; onClose: () => void;
}) {
  return (
    <div className="unlock-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <Confetti />
      <div
        className="unlock-box"
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        <div className="unlock-star" aria-hidden="true">⭐</div>
        <div className="unlock-char">
          <KidSVG id={buddyId} gearId={item.id} size={120} />
        </div>
        <p className="unlock-subtitle">Ny ting låst opp!</p>
        <p className="unlock-name">{item.label}</p>
        <button
          className="btn btn-ball unlock-cta"
          onClick={onClose}
          autoFocus
        >
          Kult! 🎉
        </button>
      </div>
    </div>
  );
}
