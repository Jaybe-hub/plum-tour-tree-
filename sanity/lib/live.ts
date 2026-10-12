import { defineLive } from "next-sanity";
import { client } from "./client";

// Live Content API component (keeps open pages in the browser fresh).
const { SanityLive } = defineLive({
  client,
  serverToken: process.env.SANITY_API_READ_TOKEN || false,
  browserToken: process.env.SANITY_API_READ_TOKEN || false
});

export { SanityLive };

/**
 * Fetches published content straight from Sanity on every request (no saved copy).
 * This stops the live site from showing old content after you publish in Studio.
 * Same call shape as before, so existing pages need no changes.
 */
export async function sanityFetch({
  query,
  params
}: {
  query: string;
  params?: Record<string, unknown>;
}): Promise<{ data: unknown }> {
  const data = await client.fetch(query, params ?? {}, { cache: "no-store" });
  return { data };
}
