import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

const STATIC_PATHS = [
  "",
  "/about",
  "/tours",
  "/tours/coastal-escapes",
  "/tours/city-explorers",
  "/tours/cultural-extravaganza",
  "/tours/safari-adventure",
  "/tours/nightlife",
  "/destinations",
  "/gallery",
  "/blog",
  "/testimonials",
  "/faqs",
  "/booking",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions"
];

interface SlugRow {
  slug: string | null;
  updatedAt: string | null;
}

async function getSlugs(type: "tour" | "destination" | "post"): Promise<SlugRow[]> {
  if (!isSanityConfigured) return [];
  try {
    return await client.fetch<SlugRow[]>(
      `*[_type == $type && isPublished == true && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt }`,
      { type },
      { cache: "no-store" }
    );
  } catch (error) {
    console.error(`Sitemap: failed to fetch ${type} slugs:`, error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [tours, destinations, posts] = await Promise.all([getSlugs("tour"), getSlugs("destination"), getSlugs("post")]);

  const entries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({ url: `${SITE_URL}${path}` }));

  const dynamicEntries = (prefix: string, rows: SlugRow[]): MetadataRoute.Sitemap =>
    rows
      .filter((row) => row.slug)
      .map((row) => ({
        url: `${SITE_URL}${prefix}/${row.slug}`,
        lastModified: row.updatedAt ? new Date(row.updatedAt) : undefined
      }));

  return [
    ...entries,
    ...dynamicEntries("/tours", tours),
    ...dynamicEntries("/destinations", destinations),
    ...dynamicEntries("/blog", posts)
  ];
}
