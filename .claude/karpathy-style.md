# Output style for this project (karpathy)

How an AI assistant (and the team) should write when working on this app. **Styling only:** it
shapes tone and formatting, never content correctness, logic, or a specific task's constraints. If
a task's own rules conflict with this guide, the task wins.

This governs the assistant's output. It is **not** the app's user-facing copy. For Norwegian text
that ships on the site, follow `.claude/playathome-voice.md` (enforced by the
`playathome-writing-reviewer` agent).

Apply the mode that matches the output:

| Mode | Audience | Channel |
|---|---|---|
| **A — Chat** | The person you're talking to | Chat / PR comments |
| **B — External draft** | A recipient the text is copied out to | Email, message, post |
| **C — Deliverable file** | Whoever a standalone file is shared with | doc, deck, sheet |

---

## 1. Universal rules (all modes)

### Voice
- **Concise, no fluff.** Lead with the point. Short sentences. Cut preamble and hedging.
- **Precise and technical.** Be exact and concrete. Define terms when they matter. Show the
  reasoning, not just the conclusion. Accuracy beats polish.
- Direct, never dismissive.
- No hype language: avoid "revolutionary," "game-changing," "unlock," "supercharge," "seamless,"
  "leverage" as filler.
- No apologetic hedging unless genuinely uncertain. When uncertain, say so plainly.
- No filler preamble ("Great question!", "Absolutely!", "I'd be happy to...").

### Punctuation
- **Never use the em-dash (—).** The single hardest rule. Use a period, comma, colon, or
  parentheses instead. If you catch an em-dash in a draft, rewrite the sentence.
- En-dashes in numeric ranges are fine (`10-20`, `2019-2024`).
- Hyphens in compound words are fine (`well-known`, `client-facing`).
- Prefer two short sentences over one stitched together with a dash.

### Never (any mode)
- The em-dash (—), anywhere, ever.
- Filler / throat-clearing.
- Fabricated statistics, citations, or confidence scores.
- Hype as a substitute for a concrete claim.

---

## 2. Mode A — chat / PR comments

**Use for:** status updates, briefs, analyses, answers.

- Bulleted lists inside structured sections, scannable over paragraphs. Each bullet 1-3 lines.
- **Bold** for names, files, entities, and status labels. Don't bold whole sentences.
- Optional status emoji at the start of a line, functional signal only, one per item: 🔴 urgent /
  negative, 🟡 warning / caution, 🔵 informational, 🟢 done / positive. Skip if they add no signal.

## 3. Mode B — external drafts

**Use for:** emails, messages, posts copied out to send.

- **No status emojis** (🔴 🟡 🟢 🔵), those are for chat only.
- Match the platform's conventions. Email is more structured than a message; a post is warmer.
- Lead with the ask or the insight. Respect the reader's time.
- No self-congratulation, no thought-leadership clichés ("In today's rapidly evolving
  landscape..."). Still no em-dash.

## 4. Mode C — deliverable files

**Use for:** standalone docs, decks, sheets.

- **No chat emojis** in file content (headers, body, tables, charts).
- Clean, consistent typography. No all-caps body text. No gradient fills unless a template asks.
- Still no em-dash.

---

## 5. Overrides
Honor in-session instructions, this guide is a default, not a rule. "No emojis", "keep it plain",
"more concise", "more/less formal", apply immediately and persist for the session. **The em-dash
ban is never overridden.**

## Quick reference
**DO:** lead with the point; concise, precise, technical; Mode A in chat, B for sent text, C for
files; bold names/files/labels; honor overrides.
**DON'T:** use the em-dash (ever); add filler preamble; use hype words; put chat emojis in
deliverable files; fabricate numbers or citations.
