"use client";

import { useActionState, useState } from "react";
import { addChild, type ChildState } from "@/app/barn/actions";
import { BUDDIES } from "@/lib/buddies";

const initial: ChildState = {};
const thisYear = new Date().getFullYear();
const birthYears = [thisYear - 3, thisYear - 4, thisYear - 5]; // alder 3 til 5

export default function ChildForm() {
  const [state, formAction, pending] = useActionState<ChildState, FormData>(addChild, initial);
  const [buddy, setBuddy] = useState(BUDDIES[0].name);

  return (
    <form action={formAction} className="child-form">
      <h2>Legg til et barn</h2>

      <label className="field">
        <span>Navn</span>
        <input
          type="text"
          name="name"
          required
          maxLength={40}
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? "child-error" : undefined}
        />
      </label>

      <label className="field">
        <span>Fødselsår (3 til 5 år)</span>
        <select name="birthYear" defaultValue="">
          <option value="">Velg år</option>
          {birthYears.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </label>

      <span className="field-label" id="buddy-label">Velg tenniskompis</span>
      <input type="hidden" name="buddy" value={buddy} />
      <div className="buddy-pick" role="group" aria-labelledby="buddy-label">
        {BUDDIES.map((b) => (
          <button
            key={b.id}
            type="button"
            className={`opt${b.name === buddy ? " active" : ""}`}
            aria-pressed={b.name === buddy}
            onClick={() => setBuddy(b.name)}
            title={b.name}
          >
            {b.emoji}
          </button>
        ))}
      </div>

      {state.error && (
        <p className="form-error" id="child-error" role="alert">
          {state.error}
        </p>
      )}

      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Lagrer..." : "Legg til barn"}
      </button>
    </form>
  );
}
