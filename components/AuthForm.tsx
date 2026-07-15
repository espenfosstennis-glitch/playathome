"use client";

import { useActionState, useState } from "react";
import { signIn, signUp, type AuthState } from "@/app/logg-inn/actions";

const initial: AuthState = {};

export default function AuthForm({ initialMode = "inn" }: { initialMode?: "inn" | "ny" }) {
  const [mode, setMode] = useState<"inn" | "ny">(initialMode);
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    mode === "inn" ? signIn : signUp,
    initial,
  );

  return (
    <form action={formAction} className="auth-card">
      <h1>{mode === "inn" ? "Logg inn" : "Lag konto"}</h1>
      <p className="auth-sub">For foreldre. Her følger du barnets tennisreise.</p>

      <label className="field">
        <span>E-post</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? "auth-error" : undefined}
        />
      </label>
      <label className="field">
        <span>Passord</span>
        <input
          type="password"
          name="password"
          autoComplete={mode === "inn" ? "current-password" : "new-password"}
          required
          minLength={mode === "ny" ? 8 : undefined}
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? "auth-error" : undefined}
        />
      </label>

      {state.error && (
        <p className="form-error" id="auth-error" role="alert">
          {state.error}
        </p>
      )}
      {state.message && <p className="form-ok" role="status">{state.message}</p>}

      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "Et øyeblikk..." : mode === "inn" ? "Logg inn" : "Lag konto"}
      </button>

      <p className="auth-toggle">
        {mode === "inn" ? "Har du ikke konto?" : "Har du allerede konto?"}{" "}
        <button type="button" onClick={() => setMode(mode === "inn" ? "ny" : "inn")}>
          {mode === "inn" ? "Lag en her" : "Logg inn"}
        </button>
      </p>
    </form>
  );
}
