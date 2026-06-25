import { defineType, defineField } from "sanity";

export const exercise = defineType({
  name: "exercise",
  title: "Øvelse",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (kortnavn i nettadressen)",
      type: "slug",
      options: { source: "title", maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "skill",
      title: "Ferdighet",
      type: "reference",
      to: [{ type: "skill" }],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "emoji", title: "Emoji", type: "string" }),
    defineField({
      name: "level",
      title: "Nivå",
      type: "string",
      options: { list: ["Nivå 1", "Nivå 2", "Nivå 3"], layout: "radio" },
      initialValue: "Nivå 1",
    }),
    defineField({
      name: "minutes",
      title: "Varighet",
      type: "string",
      description: 'Vises som det står, f.eks. "2 min".',
    }),
    defineField({ name: "description", title: "Beskrivelse", type: "text", rows: 3 }),
    defineField({
      name: "videoUrl",
      title: "Videolenke",
      type: "url",
      description: "Lim inn en Vimeo- eller YouTube-lenke. Kan stå tom inntil videre.",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "order",
      title: "Rekkefølge",
      type: "number",
      description: "Lavere tall vises først.",
    }),
  ],
  orderings: [
    { title: "Rekkefølge", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "skill.name", emoji: "emoji" },
    prepare: ({ title, subtitle, emoji }) => ({
      title: `${emoji ?? ""} ${title}`.trim(),
      subtitle,
    }),
  },
});
