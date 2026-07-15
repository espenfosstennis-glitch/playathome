/**
 * Engangs-import: legger dagens ferdigheter og øvelser (fra lib/content.ts) inn i Sanity.
 *
 * Kjør én gang når Sanity-prosjektet finnes og .env.local har:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN
 *
 *   npx tsx scripts/seed.ts
 *
 * Trygt å kjøre flere ganger: bruker faste _id-er og createOrReplace.
 */
import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";
import { SKILLS, EXERCISES } from "../lib/content";

// Minimal .env.local-lader (slipper ekstra avhengighet)
try {
  for (const line of readFileSync(".env.local", "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {
  /* ingen .env.local, bruker eksisterende miljø */
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Mangler NEXT_PUBLIC_SANITY_PROJECT_ID og/eller SANITY_API_WRITE_TOKEN i .env.local",
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2024-10-01", token, useCdn: false });

async function seed() {
  const tx = client.transaction();

  SKILLS.forEach((s, i) => {
    tx.createOrReplace({
      _id: `skill-${s.slug}`,
      _type: "skill",
      name: s.name,
      slug: { _type: "slug", current: s.slug },
      emoji: s.emoji,
      tagline: s.tagline,
      order: i,
      ...(s.parent ? { parent: s.parent } : {}),
    });
  });

  EXERCISES.forEach((e, i) => {
    tx.createOrReplace({
      _id: `exercise-${e.slug}`,
      _type: "exercise",
      title: e.title,
      slug: { _type: "slug", current: e.slug },
      skill: { _type: "reference", _ref: `skill-${e.skill}` },
      emoji: e.emoji,
      level: e.level,
      minutes: e.minutes,
      description: e.description,
      order: i,
    });
  });

  await tx.commit();
  console.log(`Importert ${SKILLS.length} ferdigheter og ${EXERCISES.length} øvelser til Sanity.`);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
