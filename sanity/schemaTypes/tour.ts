import { defineField, defineType } from "sanity";

export const tour = defineType({
  name: "tour",
  title: "Tour",
  type: "document",
  groups: [
    { name: "content", title: "Content" },
    { name: "pricing", title: "Pricing & dates" },
    { name: "media", title: "Media" },
    { name: "settings", title: "Settings" }
  ],
  fields: [
    defineField({
      name: "name",
      title: "Tour name",
      type: "string",
      group: "content",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "destination",
      title: "Destination",
      type: "string",
      group: "content",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
      options: { list: ["Coastal Getaways", "City Explorers", "Cultural Journeys", "Wildlife and Safari"] },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      description: "Shown on tour cards and listings. Keep it to 1–2 sentences.",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.max(220)
    }),
    defineField({
      name: "fullDescription",
      title: "Full description",
      type: "array",
      of: [{ type: "block" }],
      group: "content"
    }),
    defineField({
      name: "highlights",
      title: "Tour highlights",
      type: "array",
      of: [{ type: "string" }],
      group: "content"
    }),
    defineField({
      name: "itinerary",
      title: "Itinerary",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          name: "itineraryDay",
          fields: [
            { name: "day", title: "Day number", type: "number", validation: (rule) => rule.required().min(1) },
            { name: "title", title: "Title", type: "string", validation: (rule) => rule.required() },
            { name: "description", title: "Description", type: "text", rows: 2 }
          ],
          preview: {
            select: { day: "day", title: "title" },
            prepare: ({ day, title }) => ({ title: `Day ${day}: ${title}` })
          }
        }
      ]
    }),
    defineField({
      name: "inclusions",
      title: "What's included",
      type: "array",
      of: [{ type: "string" }],
      group: "content"
    }),
    defineField({
      name: "exclusions",
      title: "What's excluded",
      type: "array",
      of: [{ type: "string" }],
      group: "content"
    }),
    defineField({
      name: "duration",
      title: "Duration (days)",
      type: "number",
      group: "pricing",
      validation: (rule) => rule.required().min(1)
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      group: "pricing",
      description: "Leave blank if price is not yet available (page will show \"Price on request\")."
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      group: "pricing",
      options: { list: ["NGN", "USD", "GBP", "EUR"] },
      initialValue: "NGN"
    }),
    defineField({
      name: "availableDates",
      title: "Available dates",
      type: "array",
      of: [{ type: "date" }],
      group: "pricing"
    }),
    defineField({
      name: "tourImage",
      title: "Tour image",
      description: "Main image shown on the card and detail page header.",
      type: "image",
      options: { hotspot: true },
      group: "media",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "gallery",
      title: "Gallery images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      group: "media"
    }),
    defineField({
      name: "featured",
      title: "Featured / Popular",
      description: "Featured tours are shown first and may be highlighted on the homepage.",
      type: "boolean",
      initialValue: false,
      group: "settings"
    }),
    defineField({
      name: "isPublished",
      title: "Published (visible on site)",
      description: "Turn off to hide this tour from the site without deleting it.",
      type: "boolean",
      initialValue: true,
      group: "settings"
    })
  ],
  preview: {
    select: { title: "name", subtitle: "destination", media: "tourImage" }
  }
});
