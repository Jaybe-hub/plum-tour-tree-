import { NEWS_SOURCES, type NewsSource } from "./sources";
import { parseFeed } from "./parse";

export interface NewsItem {
  id: string;
  title: string;
  url: string;
  sourceName: string;
  topic: string | null;
  /** The publisher's own publication date (ISO). null when the feed did not provide one. */
  publishedAt: string | null;
  summary: string | null;
  image: string | null;
}

function intFromEnv(name: string, fallback: number, min: number, max: number): number {
  const value = Number(process.env[name]);
  if (!Number.isFinite(value) || value <= 0) return fallback;
  return Math.min(max, Math.max(min, Math.round(value)));
}

/** How often (in hours) the server is allowed to re-request each feed. Default 6. Env: NEWS_REVALIDATE_HOURS */
const REVALIDATE_SECONDS = intFromEnv("NEWS_REVALIDATE_HOURS", 6, 1, 48) * 3600;
/** Maximum stories shown. Default 6. Env: NEWS_MAX_ITEMS */
const MAX_ITEMS = intFromEnv("NEWS_MAX_ITEMS", 6, 3, 24);
const TIMEOUT_MS = 8000;
const MAX_FEED_BYTES = 2_000_000;

function canonicalUrl(raw: string): string {
  try {
    const url = new URL(raw);
    url.hash = "";
    [...url.searchParams.keys()].forEach((key) => {
      if (/^(utm_|fbclid|gclid|mc_)/i.test(key)) url.searchParams.delete(key);
    });
    url.hostname = url.hostname.replace(/^www\./, "");
    return url.toString().replace(/\/$/, "").toLowerCase();
  } catch {
    return raw.toLowerCase();
  }
}

async function fetchSource(source: NewsSource): Promise<NewsItem[]> {
  if (!source.feedUrl.startsWith("https://")) return [];
  try {
    const response = await fetch(source.feedUrl, {
      headers: {
        "User-Agent": "PlumTreeToursNewsFeed/1.0 (headlines and links only)",
        Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9"
      },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      next: { revalidate: REVALIDATE_SECONDS }
    });
    if (!response.ok) return [];

    const xml = (await response.text()).slice(0, MAX_FEED_BYTES);
    const keywords = source.requireKeywords?.map((word) => word.toLowerCase());

    return parseFeed(xml)
      .filter((item) => !keywords || keywords.some((word) => item.title.toLowerCase().includes(word)))
      .map((item) => ({
        id: canonicalUrl(item.link),
        title: item.title,
        url: item.link,
        sourceName: source.name,
        topic: source.topic ?? null,
        publishedAt: item.publishedAt,
        summary: source.showSummary ? item.summary : null,
        image: source.showImage ? item.image : null
      }));
  } catch (error) {
    console.error(`News feed failed for ${source.name}:`, error);
    return [];
  }
}

export function hasNewsSources(): boolean {
  return NEWS_SOURCES.length > 0;
}

export async function getLatestNews(): Promise<NewsItem[]> {
  if (NEWS_SOURCES.length === 0) return [];

  const results = await Promise.allSettled(NEWS_SOURCES.map(fetchSource));
  const seen = new Set<string>();
  const items: NewsItem[] = [];

  for (const result of results) {
    if (result.status !== "fulfilled") continue;
    for (const item of result.value) {
      if (seen.has(item.id)) continue;
      seen.add(item.id);
      items.push(item);
    }
  }

  // Newest first. Stories without a publisher date go last (never given a made-up date).
  items.sort((a, b) => {
    if (a.publishedAt && b.publishedAt) return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
    if (a.publishedAt) return -1;
    if (b.publishedAt) return 1;
    return 0;
  });

  return items.slice(0, MAX_ITEMS);
}
