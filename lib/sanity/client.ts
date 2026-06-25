import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2024-10-01";

// Privat dataset: leses kun server-side med token. Tokenet er IKKE NEXT_PUBLIC og
// når aldri nettleseren (getSkills/getExercises kjører på serveren).
const token = process.env.SANITY_API_READ_TOKEN;

// Er Sanity konfigurert? Trenger både prosjekt-id og lesetoken (privat dataset).
// Hvis ikke, faller appen tilbake til innholdet i lib/content.ts.
export const hasSanity = Boolean(projectId && token);

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: false, // token-autentisert lesing mot privat dataset
  token,
});
