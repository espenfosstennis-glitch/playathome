"use client";

import { useEffect } from "react";
import KidSVG from "./KidSVG";
import { Confetti } from "./UnlockModal";
import type { TownItem } from "@/lib/town";

// Feiring etter en fullført øvelse: figuren hopper, en ball flyr inn, og nye ting
// i byen vises. Lukkes ved trykk eller av seg selv etter noen sekunder.
const AUTO_CLOSE_MS = 4500;

export default function Celebration({
  buddyId, gearId, name, balls, gain, newTown, onClose,
}: {
  buddyId: string; gearId: string; name?: string;
  balls: number; gain: number; newTown: TownItem[];
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, AUTO_CLOSE_MS);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="unlock-backdrop" onClick={onClose} role="dialog" aria-modal="true"
      aria-labelledby="celebrate-title">
      <Confetti />
      <div className="unlock-box celebrate-box" onClick={(e) => e.stopPropagation()} role="document">
        <div className="celebrate-ball" aria-hidden="true">🎾</div>
        <div className="unlock-char celebrate-char">
          <KidSVG id={buddyId} gearId={gearId} size={120} />
        </div>
        <p id="celebrate-title" className="unlock-name">
          Bra jobba{name ? `, ${name}` : ""}.
        </p>
        <p className="celebrate-balls">
          +{gain} 🎾 <span>Du har {balls} baller.</span>
        </p>
        {newTown.length > 0 && (
          <p className="celebrate-town">
            Nytt i byen: {newTown.map((t) => `${t.emoji} ${t.label}`).join(", ")}
          </p>
        )}
        <button className="btn btn-ball unlock-cta" type="button" onClick={onClose} autoFocus>
          Videre
        </button>
      </div>
    </div>
  );
}
