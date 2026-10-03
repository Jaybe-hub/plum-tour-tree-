import { defineQuery } from "next-sanity";
import type { Image } from "sanity";

export const toursListQuery = defineQuery(`
  *[_type == "tour" && isPublished == true] | order(featured desc, _createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    destination,
    category,
    shortDescription,
    tourImage,
    duration,
    price,
    currency,
    featured
  }
`);

// Hand-written to match the projection above. Once a real Sanity project is
// connected, run `npx sanity typegen generate` to replace this with fully
// generated, always-in-sync types.
export interface TourListItem {
  _id: string;
  name: string | null;
  slug: string | null;
  destination: string | null;
  category: string | null;
  shortDescription: string | null;
  tourImage: Image | null;
  duration: number | null;
  price: number | null;
  currency: string | null;
  featured: boolean | null;
}

export const tourBySlugQuery = defineQuery(`
  *[_type == "tour" && slug.current == $slug && isPublished == true][0] {
    _id,
    name,
    "slug": slug.current,
    destination,
    shortDescription,
    fullDescription,
    highlights,
    itinerary,
    inclusions,
    exclusions,
    duration,
    price,
    currency,
    availableDates,
    tourImage,
    gallery
  }
`);

export interface TourItineraryDay {
  day: number;
  title: string;
  description?: string;
}

export interface TourDetail {
  _id: string;
  name: string | null;
  slug: string | null;
  destination: string | null;
  shortDescription: string | null;
  fullDescription: unknown[] | null;
  highlights: string[] | null;
  itinerary: TourItineraryDay[] | null;
  inclusions: string[] | null;
  exclusions: string[] | null;
  duration: number | null;
  price: number | null;
  currency: string | null;
  availableDates: string[] | null;
  tourImage: Image | null;
  gallery: Image[] | null;
}

export const destinationsListQuery = defineQuery(`
  *[_type == "destination" && isPublished == true] | order(featured desc, _createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    tagline,
    image,
    featured
  }
`);

export interface DestinationListItem {
  _id: string;
  name: string | null;
  slug: string | null;
  tagline: string | null;
  image: Image | null;
  featured: boolean | null;
}

export const destinationBySlugQuery = defineQuery(`
  *[_type == "destination" && slug.current == $slug && isPublished == true][0] {
    _id,
    name,
    "slug": slug.current,
    tagline,
    description,
    highlights,
    image,
    gallery
  }
`);

export interface DestinationDetail {
  _id: string;
  name: string | null;
  slug: string | null;
  tagline: string | null;
  description: unknown[] | null;
  highlights: string[] | null;
  image: Image | null;
  gallery: Image[] | null;
}

export const toursByCategoryQuery = defineQuery(`
  *[_type == "tour" && isPublished == true && category == $category] | order(featured desc, _createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    destination,
    category,
    shortDescription,
    tourImage,
    duration,
    price,
    currency,
    featured
  }
`);

export const galleryImagesQuery = defineQuery(`
  *[_type == "galleryImage" && isPublished == true] | order(featured desc, _createdAt desc) {
    _id,
    image,
    caption,
    category
  }
`);

export interface GalleryImageItem {
  _id: string;
  image: Image | null;
  caption: string | null;
  category: string | null;
}

export const testimonialsQuery = defineQuery(`
  *[_type == "testimonial" && isPublished == true] | order(featured desc, _createdAt desc) {
    _id,
    customerName,
    location,
    quote,
    rating,
    tripType,
    photo
  }
`);

export interface TestimonialItem {
  _id: string;
  customerName: string | null;
  location: string | null;
  quote: string | null;
  rating: number | null;
  tripType: string | null;
  photo: Image | null;
}

export const faqsQuery = defineQuery(`
  *[_type == "faq" && isPublished == true] | order(order asc, _createdAt asc) {
    _id,
    question,
    answer
  }
`);

export interface FaqItem {
  _id: string;
  question: string | null;
  answer: string | null;
}

export const postsListQuery = defineQuery(`
  *[_type == "post" && isPublished == true] | order(featured desc, publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    category,
    publishedAt
  }
`);

export interface PostListItem {
  _id: string;
  title: string | null;
  slug: string | null;
  excerpt: string | null;
  coverImage: Image | null;
  category: string | null;
  publishedAt: string | null;
}

export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug && isPublished == true][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    category,
    author,
    publishedAt,
    body
  }
`);

export interface PostDetail {
  _id: string;
  title: string | null;
  slug: string | null;
  excerpt: string | null;
  coverImage: Image | null;
  category: string | null;
  author: string | null;
  publishedAt: string | null;
  body: unknown[] | null;
}
