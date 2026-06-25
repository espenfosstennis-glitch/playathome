import { defineType, defineField } from "sanity";

export const skill = defineType({
  name: "skill",
  title: "Ferdighet",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Navn",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (kortnavn i nettadressen)",
      type: "slug",
      options: { source: "name", maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "emoji", title: "Emoji", type: "string" }),
    defineField({ name: "tagline", title: "Undertekst", type: "string" }),
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
    select: { title: "name", subtitle: "tagline", emoji: "emoji" },
    prepare: ({ title, subtitle, emoji }) => ({
      title: `${emoji ?? ""} ${title}`.trim(),
      subtitle,
    }),
  },
});
