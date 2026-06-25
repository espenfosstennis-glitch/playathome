"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import type { Skill, Exercise } from "@/lib/content";
import { levelProgress, unlockedItems } from "@/lib/gamification";
import { markExerciseDone, setActiveChild } from "@/app/ovelser/actions";
import VideoPlayer from "./VideoPlayer";
import TennisTown from "./TennisTown";

export type Personal = {
  childId: string;
  childName: string;
  balls: number;
  level: string;
  buddy: string;
  gear: string;
  completedSlugs: string[];
  unlocked: string[];
};

export default function OvelserView({
  skills,
  exercises,
  initialSkill,
  loggedIn,
  childrenList,
  personal,
}: {
  skills: Skill[];
  exercises: Exercise[];
  initialSkill: string;
  loggedIn: boolean;
  childrenList: { id: string; name: string }[];
  personal: Personal | null;
}) {
  const validInitial = skills.some((s) => s.slug === initialSkill) ? initialSkill : "alle";
  const [activeSkill, setActiveSkill] = useState(validInitial);
  const [done, setDone] = useState<Set<string>>(() => new Set(personal?.completedSlugs ?? []));
  const [balls, setBalls] = useState(personal?.balls ?? 0);
  const [level, setLevel] = useState(personal?.level ?? "Nybegynner");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [prevChildId, setPrevChildId] = useState(personal?.childId);
  const closeRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  // Bytt aktivt barn -> nullstill personlig state til det nye barnets data
  // (Reacts mønster for å justere state når en prop endrer seg, uten effekt).
  if (personal?.childId !== prevChildId) {
    setPrevChildId(personal?.childId);
    setDone(new Set(personal?.completedSlugs ?? []));
    setBalls(personal?.balls ?? 0);
    setLevel(personal?.level ?? "Nybegynner");
  }

  const visible = exercises.filter((e) => activeSkill === "alle" || e.skill === activeSkill);
  const current = exercises.find((e) => e.slug === openSlug) ?? null;
  const activeName = skills.find((s) => s.slug === activeSkill)?.name;
  const heading = activeSkill === "alle" ? "Bla i 100 øvelser" : activeName ?? "Øvelser";

  // Dagens øvelse = første som ikke er gjort (eller første øvelse).
  const todays = exercises.find((e) => !done.has(e.slug)) ?? exercises[0] ?? null;
  const todaysSkill = todays ? skills.find((s) => s.slug === todays.skill)?.name : null;

  // Mens detaljen er åpen: fokuser lukk-knappen, lås bakgrunnsscroll, lukk på Esc
  useEffect(() => {
    if (!openSlug) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key === "Tab") {
        const root = modalRef.current;
        if (!root) return;
        const items = root.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openSlug]);

  function open(slug: string, trigger: HTMLButtonElement) {
    lastTrigger.current = trigger;
    setOpenSlug(slug);
  }
  function close() {
    setOpenSlug(null);
    lastTrigger.current?.focus(); // fokus tilbake til kortet man kom fra
  }
  function markDone() {
    if (!personal || !current) return;
    const slug = current.slug;
    startTransition(async () => {
      const fd = new FormData();
      fd.set("childId", personal.childId);
      fd.set("slug", slug);
      const res = await markExerciseDone(fd);
      if (res.ok) {
        setDone((prev) => new Set(prev).add(slug));
        if (typeof res.balls === "number") setBalls(res.balls);
        if (res.level) setLevel(res.level);
      }
      close();
    });
  }
  function pickChild(id: string) {
    startTransition(async () => {
      const fd = new FormData();
      fd.set("childId", id);
      await setActiveChild(fd); // revalidatePath('/ovelser') gir nye props
    });
  }
  function next() {
    if (!current) return;
    const i = visible.findIndex((e) => e.slug === current.slug);
    const n = visible[(i + 1) % visible.length];
    if (n) setOpenSlug(n.slug);
  }

  return (
    <main className="wrap">
      {/* Aktivt barn / innlogging */}
      {loggedIn && childrenList.length > 0 ? (
        <div className="child-switch" role="group" aria-label="Velg aktivt barn">
          <span className="eyebrow">Øver nå</span>
          <div className="child-switch-opts">
            {childrenList.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`chip${personal?.childId === c.id ? " active" : ""}`}
                aria-pressed={personal?.childId === c.id}
                disabled={pending}
                onClick={() => pickChild(c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="child-switch">
          <span className="eyebrow">Følg barnets fremgang</span>
          <p className="child-switch-cta">
            {loggedIn ? (
              <>
                <Link href="/barn">Legg til et barn</Link> for å lagre baller og nivå.
              </>
            ) : (
              <>
                <Link href="/logg-inn">Logg inn</Link> for å lagre baller, nivå og kompiser.
              </>
            )}
          </p>
        </div>
      )}

      {/* Dagens øvelse */}
      {todays && (
        <section className="today" id="dagens" tabIndex={-1}>
          <div>
            <span className="eyebrow">{todaysSkill ?? "Dagens øvelse"}</span>
            <h1>Dagens øvelse: {todays.title}</h1>
            <p>{todays.description}</p>
            <button
              className="btn"
              type="button"
              onClick={(ev) => open(todays.slug, ev.currentTarget)}
            >
              ▶ Spill av ({todays.minutes})
            </button>
          </div>
          <div className="video-ph">
            <span className="pl" aria-hidden="true">
              ▶
            </span>{" "}
            Videoplassholder
            <br />
            <small style={{ opacity: 0.8 }}>Ekte øvelsesvideo kommer her</small>
          </div>
        </section>
      )}

      {/* Nivå / fremgang */}
      {personal ? (
        <div className="lvl">
          <div className="row">
            <span>Nivå: {level} 🌱</span>
            <span>{levelProgress(balls)}&nbsp;%</span>
          </div>
          <div className="bar">
            <span style={{ width: `${levelProgress(balls)}%` }} />
          </div>
          <small>
            Nybegynner → På vei opp → Racketmester → Tennisstjerne ⭐ · {done.size} av 100 øvelser
            fullført · 🎾 {balls} baller
          </small>
        </div>
      ) : (
        <div className="lvl">
          <small>
            Nybegynner → På vei opp → Racketmester → Tennisstjerne ⭐ · logg inn for å samle baller
            og stige i nivå.
          </small>
        </div>
      )}

      {/* Tennis Town for aktivt barn */}
      {personal && (
        <section style={{ marginTop: 28 }} aria-label="Tennis Town">
          <span className="eyebrow">Tennis Town</span>
          <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.2rem)", margin: "8px 0 16px" }}>
            {personal.childName} sin tenniskompis
          </h2>
          <TennisTown
            child={{
              childId: personal.childId,
              balls,
              buddy: personal.buddy,
              gear: personal.gear,
              unlocked: unlockedItems(balls),
            }}
          />
        </section>
      )}

      {/* Filtre */}
      <div id="filter" style={{ marginTop: 34 }}>
        <span className="eyebrow">Alle øvelsene</span>
        <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.2rem)", marginTop: 8 }}>{heading}</h2>
      </div>
      <div className="filters" role="group" aria-label="Filtrer på ferdighet">
        <button
          type="button"
          className={`chip${activeSkill === "alle" ? " active" : ""}`}
          onClick={() => setActiveSkill("alle")}
        >
          Alle
        </button>
        {skills.map((s) => (
          <button
            key={s.slug}
            type="button"
            className={`chip${activeSkill === s.slug ? " active" : ""}`}
            onClick={() => setActiveSkill(s.slug)}
          >
            {s.emoji} {s.name}
          </button>
        ))}
      </div>

      {/* Øvelseskort */}
      <div className="grid">
        {visible.map((e) => (
          <article key={e.slug} className="card">
            <div className="thumb">
              {e.emoji}
              <span className="tag">{skills.find((s) => s.slug === e.skill)?.name}</span>
              <span className="play">▶ Spill av</span>
              {done.has(e.slug) && (
                <span className="done" title="Fullført">
                  ✓
                </span>
              )}
            </div>
            <div className="body">
              <h3>
                <button
                  type="button"
                  className="card-trigger"
                  aria-haspopup="dialog"
                  onClick={(ev) => open(e.slug, ev.currentTarget)}
                >
                  {e.title}
                </button>
              </h3>
              <p>{e.description}</p>
              <div className="meta">
                <span>{e.minutes}</span>
                <span>{e.level}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      {visible.length === 0 && (
        <p className="empty">Ingen øvelser her ennå. Velg en annen ferdighet.</p>
      )}

      {/* Foreldre-stub */}
      <div className="parent">
        <span className="em" aria-hidden="true">
          👨‍👩‍👧
        </span>
        <div>
          <b>Foreldreoversikt</b>
          <br />
          <span style={{ color: "var(--muted)", fontWeight: 600 }}>
            Se streak, fullførte øvelser og hvilke ferdigheter som trenger litt mer øving.
          </span>
        </div>
        <Link href="/forelder">Åpne oversikt →</Link>
      </div>

      {/* Øvelsesdetalj */}
      {current && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            ref={modalRef}
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="modal-video">
              {/* Plassholder ligger alltid bak; spilleren legger seg oppå når en gyldig
                  videoUrl finnes. Er lenken ugyldig (VideoPlayer = null), vises plassholderen. */}
              <span aria-hidden="true">{current.emoji}</span>
              <span className="vtext">Videoplassholder · ekte video kommer her</span>
              {current.videoUrl && <VideoPlayer url={current.videoUrl} title={current.title} />}
              <button
                ref={closeRef}
                className="modal-close"
                type="button"
                aria-label="Lukk"
                onClick={close}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <span className="modal-tag">
                {skills.find((s) => s.slug === current.skill)?.name}
              </span>
              <h2 id="modal-title">{current.title}</h2>
              <p className="modal-meta">
                {current.minutes} · {current.level}
              </p>
              <p className="modal-desc">{current.description}</p>
              <div className="modal-actions">
                {personal ? (
                  <button className="btn" type="button" onClick={markDone} disabled={pending}>
                    {pending
                      ? "Lagrer..."
                      : done.has(current.slug)
                        ? "Gjort igjen ✓"
                        : "Marker som gjort ✓"}
                  </button>
                ) : (
                  <Link className="btn" href="/logg-inn">
                    Logg inn for å lagre ✓
                  </Link>
                )}
                <button className="btn ghost" type="button" onClick={next}>
                  Neste øvelse →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}