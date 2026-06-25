"use client";

import { useState, useTransition } from "react";
import { BUDDIES, LOCKED_BUDDIES, GEARS, LOCKED_GEARS, buddyEmoji } from "@/lib/buddies";
import { setBuddyGear } from "@/app/ovelser/actions";

type LiveChild = {
  childId: string;
  balls: number;
  buddy: string;
  gear: string;
  unlocked: string[]; // navn (kompis) eller emoji (utstyr) som er låst opp
};

// To moduser: med `child` er den ekte (lagrer valg per barn, viser ekte baller).
// Uten props er den en demo på landingssiden (lokal lek, låste premier vises som låst).
export default function TennisTown({ child }: { child?: LiveChild }) {
  const live = !!child;
  const unlocked = new Set(child?.unlocked ?? []);
  const balls = child?.balls ?? 24;

  const [buddy, setBuddy] = useState(child?.buddy ?? BUDDIES[0].name);
  const [gear, setGear] = useState(child?.gear ?? "");
  const [bump, setBump] = useState(false);
  const [, startTransition] = useTransition();

  function doBump() {
    setBump(true);
    setTimeout(() => setBump(false), 250);
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

  return (
    <div className="town">
      <div className="town-grid">
        <div className="town-stage">
          <div className={`buddy${bump ? " bump" : ""}`} aria-live="polite">
            {buddyEmoji(buddy)}
            {gear}
          </div>
          <div className="buddy-name">{buddy}</div>
          <div className="coins">
            🎾 <span>{balls}</span> baller
          </div>
        </div>
        <div className="town-panel">
          <strong className="picker-label">Velg kompis</strong>
          <div className="opts" role="group" aria-label="Velg kompis">
            {BUDDIES.map((b) => (
              <button
                key={b.name}
                type="button"
                className={`opt${b.name === buddy ? " active" : ""}`}
                aria-pressed={b.name === buddy}
                onClick={() => pickBuddy(b.name)}
              >
                {b.emoji}
              </button>
            ))}
            {LOCKED_BUDDIES.map((b) => {
              const open = live && unlocked.has(b.name);
              return (
                <button
                  key={b.name}
                  type="button"
                  className={`opt${open ? "" : " locked"}${b.name === buddy ? " active" : ""}`}
                  aria-pressed={b.name === buddy}
                  disabled={!open}
                  title={open ? b.name : `Lås opp med ${b.req} baller`}
                  onClick={open ? () => pickBuddy(b.name) : undefined}
                >
                  {b.emoji}
                </button>
              );
            })}
          </div>

          <strong className="picker-label">Velg utstyr</strong>
          <div className="opts" role="group" aria-label="Velg utstyr">
            {GEARS.map((g, i) => (
              <button
                key={i}
                type="button"
                className={`opt${g === gear ? " active" : ""}`}
                aria-pressed={g === gear}
                onClick={() => pickGear(g)}
              >
                {g || "🚫"}
              </button>
            ))}
            {LOCKED_GEARS.map((g) => {
              const open = live && unlocked.has(g.emoji);
              return (
                <button
                  key={g.emoji}
                  type="button"
                  className={`opt${open ? "" : " locked"}${g.emoji === gear ? " active" : ""}`}
                  aria-pressed={g.emoji === gear}
                  disabled={!open}
                  title={open ? "Utstyr" : `Lås opp med ${g.req} baller`}
                  onClick={open ? () => pickGear(g.emoji) : undefined}
                >
                  {g.emoji}
                </button>
              );
            })}
          </div>

          <p style={{ marginTop: 22, color: "var(--muted)", fontWeight: 700, fontSize: "0.9rem" }}>
            {live
              ? "Nye kompiser og utstyr låses opp automatisk når barnet samler flere baller."
              : "Prøv det her. I appen låses nye kompiser opp automatisk når barnet samler nok baller."}
          </p>
        </div>
      </div>
    </div>
  );
}
