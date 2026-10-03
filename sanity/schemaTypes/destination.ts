import { defineField, defineType } from "sanity";

export const destination = defineType({
  name: "destination",
  title: "Destination",
  type: "document",
  groups: [
    { name: "content", title: "Content" },
    { name: "media", title: "Media" },
    { name: "settings", title: "Settings" }
  ],
  fields: [
    defineField({
      name: "name",
      title: "Destination name",
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
      name: "tagline",
      title: "Tagline",
      description: "Shown on destination cards. Keep it short.",
      type: "string",
      group: "content",
      validation: (rule) => rule.max(80)
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
      group: "content"
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "string" }],
      group: "content"
    }),
    defineField({
      name: "image",
      title: "Destination image",
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
      title: "Featured",
      description: "Featured destinations are shown first.",
      type: "boolean",
      initialValue: false,
      group: "settings"
    }),
    defineField({
      name: "isPublished",
      title: "Published (visible on site)",
      type: "boolean",
      initialValue: true,
      group: "settings"
    })
  ],
  preview: {
    select: { title: "name", subtitle: "tagline", media: "image" }
  }
});
