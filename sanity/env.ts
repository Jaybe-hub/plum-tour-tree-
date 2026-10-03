// Falls back to placeholder values so the app doesn't crash before real
// Sanity credentials are added — replace via .env.local (see .env.local.example).
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const isSanityConfigured = Boolean(projectId);
