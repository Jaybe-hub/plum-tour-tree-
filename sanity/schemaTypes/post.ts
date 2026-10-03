import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "content", title: "Content" },
    { name: "settings", title: "Settings" }
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description: "Shown on the blog listing. Keep it to 1–2 sentences.",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.max(220)
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      group: "content",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "category",
      title: "Category",
      description: "e.g. Destinations, Tour Tips, Travel Guides.",
      type: "string",
      options: { list: ["Destinations", "Tour Tips", "Travel Guides", "Tourism News"] },
      group: "content"
    }),
    defineField({
      name: "author",
      title: "Author",
      description: "Optional. Leave blank if not attributing to a specific person.",
      type: "string",
      group: "content"
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
      group: "content"
    }),
    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "datetime",
      group: "settings",
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: "featured",
      title: "Featured",
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
    select: { title: "title", subtitle: "category", media: "coverImage" }
  }
});
