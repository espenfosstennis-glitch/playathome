"use client";

import { useState, useTransition } from "react";
import { BUDDIES, LOCKED_BUDDIES, GEAR_ITEMS, LOCKED_GEAR_ITEMS } from "@/lib/buddies";
import { setBuddyGear } from "@/app/ovelser/actions";
import CharacterAvatar from "./CharacterAvatar";
import KidSVG from "./KidSVG";

type LiveChild = {
  childId: string;
  balls: number;
  buddy: string;
  gear: string;
  unlocked: string[];
};

export default function TennisTown({ child }: { child?: LiveChild }) {
  const live = !!child;
  const unlocked = new Set(child?.unlocked ?? []);
  const balls = child?.balls ?? 24;

  const [buddy, setBuddy] = useState(child?.buddy ?? BUDDIES[0].name);
  const [gear, setGear] = useState(child?.gear ?? "🎾");
  const [bump, setBump] = useState(false);
  const [, startTransition] = useTransition();

  function doBump() {
    setBump(true);
    setTimeout(() => setBump(false), 300);
  }

  function persist(nextBuddy: string, nextGear: string) {
    if (!child) return;
    startTransition(async () => {
      const fd = new FormData();
      fd.set("childId", child.childId);
      fd.set("buddy", nextBuddy);
      fd.set("gear", nextGear);
      await setBuddyGear(fd);
    });
  }

  function pickBuddy(name: string) {
    setBuddy(name);
    doBump();
    persist(name, gear);
  }
  function pickGear(g: string) {
    setGear(g);
    doBump();
    persist(buddy, g);
  }

  const boys = BUDDIES.filter((b) => ["Lars", "Noah"].includes(b.name));
  const girls = BUDDIES.filter((b) => ["Emma", "Maja"].includes(b.name));

  return (
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
            <CharacterAvatar buddyId={buddy.toLowerCase()} gear={gear} bump={bump} />
          </div>
          <div className="buddy-name">{buddy}</div>
          <div className="coins">🎾 <span>{balls}</span> baller</div>
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
                    <span className="buddy-card-kid"><KidSVG id={b.id} size={46} /></span>
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
                    <span className="buddy-card-kid"><KidSVG id={b.id} size={46} /></span>
                    <span className="buddy-card-name">{b.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Låste spillere */}
          {LOCKED_BUDDIES.length > 0 && (
            <div className="buddy-grid" style={{ marginTop: 10 }}>
              {LOCKED_BUDDIES.map((b) => {
                const open = live && unlocked.has(b.name);
                return (
                  <button key={b.name} type="button"
                    className={`buddy-card${open ? "" : " locked"}${b.name === buddy ? " active" : ""}`}
                    aria-pressed={b.name === buddy}
                    disabled={!open}
                    title={open ? b.name : `Lås opp med ${b.req} baller`}
                    onClick={open ? () => pickBuddy(b.name) : undefined}
                  >
                    <span className="buddy-card-emoji" style={{ fontSize: "2rem" }}>{open ? b.emoji : "🔒"}</span>
                    <span className="buddy-card-name">{open ? b.name : `${b.req} 🎾`}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Utstyr */}
          <strong className="picker-label" style={{ marginTop: 22 }}>Velg utstyr</strong>
          <div className="gear-grid" role="group" aria-label="Velg utstyr">
            {GEAR_ITEMS.map((g) => (
              <button key={g.id} type="button"
                className={`gear-card${g.emoji === gear ? " active" : ""}`}
                aria-pressed={g.emoji === gear}
                onClick={() => pickGear(g.emoji)}
              >
                <span className="gear-card-emoji">{g.emoji || "🚫"}</span>
                <span className="gear-card-label">{g.label}</span>
              </button>
            ))}
            {LOCKED_GEAR_ITEMS.map((g) => {
              const open = live && unlocked.has(g.emoji);
              return (
                <button key={g.id} type="button"
                  className={`gear-card${open ? "" : " locked"}${g.emoji === gear ? " active" : ""}`}
                  aria-pressed={g.emoji === gear}
                  disabled={!open}
                  title={open ? g.label : `Lås opp med ${g.req} baller`}
                  onClick={open ? () => pickGear(g.emoji) : undefined}
                >
                  <span className="gear-card-emoji">{open ? g.emoji : "🔒"}</span>
                  <span className="gear-card-label">{open ? g.label : `${g.req} 🎾`}</span>
                </button>
              );
            })}
          </div>

          <p style={{ marginTop: 20, color: "var(--muted)", fontWeight: 700, fontSize: "0.9rem" }}>
            {live
              ? "Nytt utstyr låses opp når barnet samler flere baller."
              : "Prøv det her. I appen låses nytt utstyr opp automatisk."}
          </p>
        </div>
      </div>
    </div>
  );
}
