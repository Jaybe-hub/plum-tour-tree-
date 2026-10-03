import { defineField, defineType } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery Image",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "caption",
      title: "Caption / alt text",
      description: "Used as the image description for accessibility.",
      type: "string",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "category",
      title: "Category",
      description: "Optional label, e.g. a destination or tour name.",
      type: "string"
    }),
    defineField({
      name: "featured",
      title: "Featured",
      description: "Featured images are shown first.",
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
    select: { title: "caption", subtitle: "category", media: "image" }
  }
});
