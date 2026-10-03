import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "customerName",
      title: "Customer name",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "location",
      title: "Location",
      description: "e.g. \"Lagos, Nigeria\" or a company name for corporate clients.",
      type: "string"
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      options: { list: [1, 2, 3, 4, 5] },
      validation: (rule) => rule.min(1).max(5)
    }),
    defineField({
      name: "tripType",
      title: "Trip type",
      type: "string",
      options: { list: ["Family", "Couples", "Corporate", "Solo", "Group"] }
    }),
    defineField({
      name: "photo",
      title: "Customer photo",
      description: "Optional.",
      type: "image",
      options: { hotspot: true }
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false
    }),
    defineField({
      name: "isPublished",
      title: "Published (visible on site)",
      type: "boolean",
      initialValue: true
    })
  ],
  preview: {
    select: { title: "customerName", subtitle: "quote", media: "photo" }
  }
});
