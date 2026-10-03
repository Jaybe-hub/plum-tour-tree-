import { defineLive } from "next-sanity";
import { client } from "./client";

// Live Content API — pages using `sanityFetch` auto-update in the browser
// when content changes in Sanity, without a manual rebuild or redeploy.
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: process.env.SANITY_API_READ_TOKEN || false,
  browserToken: process.env.SANITY_API_READ_TOKEN || false
});
