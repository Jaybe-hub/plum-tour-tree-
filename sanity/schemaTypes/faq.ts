import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "order",
      title: "Display order",
      description: "Lower numbers appear first.",
      type: "number",
      initialValue: 0
    }),
    defineField({
      name: "isPublished",
      title: "Published (visible on site)",
      type: "boolean",
      initialValue: true
    })
  ],
  preview: {
    select: { title: "question", subtitle: "answer" }
  }
});
