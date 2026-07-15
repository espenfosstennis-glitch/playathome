import { client, hasSanity } from "./client";
import { SKILLS, EXERCISES, type Skill, type Exercise } from "@/lib/content";

const REVALIDATE = 60; // sekunder: redigeringer i Studio vises innen ett minutt uten ny utrulling

const SKILLS_QUERY = `*[_type == "skill"] | order(order asc, name asc){
  "slug": slug.current, name, emoji, tagline, parent
}`;

const EXERCISES_QUERY = `*[_type == "exercise"] | order(order asc, title asc){
  "slug": slug.current, "skill": skill->slug.current, emoji, title, description, minutes, level, videoUrl
}`;

export async function getSkills(): Promise<Skill[]> {
  if (!hasSanity) return SKILLS;
  return client.fetch(SKILLS_QUERY, {}, { next: { revalidate: REVALIDATE } });
}

export async function getExercises(): Promise<Exercise[]> {
  if (!hasSanity) return EXERCISES;
  return client.fetch(EXERCISES_QUERY, {}, { next: { revalidate: REVALIDATE } });
}
