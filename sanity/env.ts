// Falls back to placeholder values so the app doesn't crash before real
// Sanity credentials are added — replace via .env.local (see .env.local.example).
//
// Two prefixes are checked for each value:
// - NEXT_PUBLIC_SANITY_* is what the Next.js website itself reads.
// - SANITY_STUDIO_* is what the standalone Sanity Studio (npx sanity dev)
//   reads — its Vite-based bundler only exposes SANITY_STUDIO_-prefixed
//   vars inside the Studio UI, so NEXT_PUBLIC_ alone leaves Studio unable
//   to see the project ID and causes a false "not a member" error.
export const apiVersion =
  process.env.SANITY_STUDIO_API_VERSION || process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";
export const dataset =
  process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const isSanityConfigured = Boolean(projectId);
