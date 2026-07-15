"use client";

import { useEffect, useState, useTransition } from "react";
import {
  BUDDIES, LOCKED_BUDDIES, ALL_GEAR, LOCKED_GEAR,
  resolveGearId, type GearItem,
} from "@/lib/buddies";
import { setBuddyGear } from "@/app/ovelser/actions";
import CharacterAvatar from "./CharacterAvatar";
import KidSVG from "./KidSVG";
import UnlockModal from "./UnlockModal";

type LiveChild = {
  childId: string; balls: number;
  buddy: string; gear: string; unlocked: string[];
};

const BALLS_KEY = "playathome_balls";

const CAT_EMOJI: Record<string, string> = {
  none: "🚫", racket: "🎾", cap: "🧢", bow: "🎀",
  headband: "〰️", glasses: "🕶️", crown: "👑",
};

const CAT_LABEL: Record<string, string> = {
  racket: "Racketer", cap: "Caps", bow: "Sløyfer",
  headband: "Pannebånd", glasses: "Briller", crown: "Krone",
};

export default function TennisTown({ child }: { child?: LiveChild }) {
  const live    = !!child;
  const balls   = child?.balls ?? 24;

  const [buddy,  setBuddy]  = useState(child?.buddy  ?? BUDDIES[0].name);
  const [gearId, setGearId] = useState(() => resolveGearId(child?.gear));
  const [bump,   setBump]   = useState(false);
  const [unlockQueue, setUnlockQueue] = useState<GearItem[]>([]);
  const [, startTransition] = useTransition();

  // Sjekk om nye ting ble låst opp siden sist besøk
  useEffect(() => {
    if (!child) return;
    try {
      const prev = Number(sessionStorage.getItem(BALLS_KEY) ?? -1);
      sessionStorage.setItem(BALLS_KEY, String(balls));
      if (prev < 0) return; // første besøk
      const newly = LOCKED_GEAR.filter((g) => g.req > prev && g.req <= balls);
      if (newly.length > 0) setUnlockQueue(newly);
    } catch { /* sessionStorage ikke tilgjengelig */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balls]);

  function doBump() {
    setBump(true);
    setTimeout(() => setBump(false), 300);
  }

  function persist(nextBuddy: string, nextGear: string) {
    if (!child) return;
    startTransition(async () => {
      const fd = new FormData();
      fd.set("childId", child.childId);
      fd.set("buddy",   nextBuddy);
      fd.set("gear",    nextGear);
      await setBuddyGear(fd);
    });
  }

  function pickBuddy(name: string) { setBuddy(name); doBump(); persist(name, gearId); }
  function pickGear(id: string)    { setGearId(id);  doBump(); persist(buddy, id);   }

  const boys  = BUDDIES.filter((b) => ["Lars", "Noah"].includes(b.name));
  const girls = BUDDIES.filter((b) => ["Emma", "Maja"].includes(b.name));

  // Grupper utstyr etter kategori for ryddig visning
  const categories = ["racket", "cap", "bow", "headband", "glasses", "crown"] as const;

  function isAvailable(g: GearItem) {
    if (!g.req) return true;           // gratis
    if (!live)  return false;          // forhåndsvisning
    return balls >= g.req;
  }

  const buddyId = [...BUDDIES, ...LOCKED_BUDDIES]
    .find((b) => b.name === buddy)?.id ?? "lars";

  // Neste låste utstyr barnet kan samle mot
  const nextUnlock = LOCKED_GEAR.find((g) => g.req > balls);

  return (
    <>
      {/* Unlock-animasjon */}
      {unlockQueue[0] && (
        <UnlockModal
          buddyId={buddyId}
          item={unlockQueue[0]}
          onClose={() => setUnlockQueue((q) => q.slice(1))}
        />
      )}

      <div className="town">
        <div className="town-grid">

          {/* Scene */}
          <div className="town-stage">
            <div className="town-balls" aria-hidden="true">
              <span className="tb tb1">🎾</span>
              <span className="tb tb2">🎾</span>
              <span className="tb tb3">🎾</span>
            </div>
            <div aria-live="polite">
              <CharacterAvatar buddyId={buddyId} gearId={gearId} bump={bump} />
            </div>
            <div className="buddy-name">{buddy}</div>
            <div className="coins">🎾 <span>{balls}</span> baller</div>

            {/* Fremdriftslinje mot neste opplåsning */}
            {nextUnlock && (
              <div className="next-unlock">
                <div className="next-unlock-track">
                  <div
                    className="next-unlock-fill"
                    style={{ width: `${Math.min(100, Math.round((balls / nextUnlock.req) * 100))}%` }}
                  />
                </div>
                <p className="next-unlock-text">
                  <strong>{nextUnlock.req - balls}</strong> baller til {nextUnlock.label}!
                </p>
              </div>
            )}
            {!nextUnlock && balls > 0 && (
              <p className="next-unlock-done">🏆 Alt utstyr låst opp!</p>
            )}
          </div>

          {/* Panel */}
          <div className="town-panel">

            {/* Spillervalg */}
            <strong className="picker-label">Velg spiller</strong>
            <div className="buddy-gender-row">
              <div>
                <span className="buddy-gender-label">Gutter</span>
                <div className="buddy-grid">
                  {boys.map((b) => (
                    <button key={b.name} type="button"
                      className={`buddy-card${b.name === buddy ? " active" : ""}`}
                      aria-pressed={b.name === buddy}
                      onClick={() => pickBuddy(b.name)}
                    >
                      <span className="buddy-card-kid">
                        <KidSVG id={b.id} size={46} />
                      </span>
                      <span className="buddy-card-name">{b.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="buddy-gender-label">Jenter</span>
                <div className="buddy-grid">
                  {girls.map((b) => (
                    <button key={b.name} type="button"
                      className={`buddy-card${b.name === buddy ? " active" : ""}`}
                      aria-pressed={b.name === buddy}
                      onClick={() => pickBuddy(b.name)}
                    >
                      <span className="buddy-card-kid">
                        <KidSVG id={b.id} size={46} />
                      </span>
                      <span className="buddy-card-name">{b.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Utstyr per kategori */}
            <strong className="picker-label" style={{ marginTop: 22 }}>Velg utstyr</strong>

            {/* "Ingen"-knapp */}
            <div className="gear-grid" style={{ marginBottom: 10 }}>
              <button type="button"
                className={`gear-card${"none" === gearId ? " active" : ""}`}
                onClick={() => pickGear("none")}
              >
                <span className="gear-card-emoji">🚫</span>
                <span className="gear-card-label">Ingen</span>
              </button>
            </div>

            {categories.map((cat) => {
              const items = ALL_GEAR.filter((g) => g.category === cat);
              if (!items.length) return null;
              return (
                <div key={cat} className="gear-section">
                  <span className="gear-section-label">{CAT_LABEL[cat]}</span>
                  <div className="gear-grid">
                    {items.map((g) => {
                      const avail = isAvailable(g);
                      return (
                        <button key={g.id} type="button"
                          className={`gear-card${g.id === gearId ? " active" : ""}${!avail ? " locked" : ""}`}
                          aria-pressed={g.id === gearId}
                          disabled={!avail}
                          title={avail ? g.label : `Lås opp med ${g.req} baller`}
                          onClick={avail ? () => pickGear(g.id) : undefined}
                          style={g.color ? { "--gear-color": g.color } as React.CSSProperties : undefined}
                        >
                          <span className="gear-card-emoji">{CAT_EMOJI[cat]}</span>
                          {!avail && (
                            <span className="gear-card-cost">{g.req} 🎾</span>
                          )}
                          <span className="gear-card-label">{g.label.replace(/ (racket|caps|sløyfe|bånd|briller|krone)/i, "")}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <p className="gear-hint">
              {live
                ? "Nytt utstyr låses opp når barnet samler flere baller."
                : "Prøv det her. I appen låses nytt utstyr opp automatisk."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
