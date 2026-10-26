/** Small, dependency-free RSS 2.0 / Atom parser. Only reads headline, link and date. */

export interface ParsedFeedItem {
  title: string;
  link: string;
  /** ISO string of the date the publisher gave. null when the feed gave none or it is invalid. */
  publishedAt: string | null;
  /** Plain-text start of the feed's own summary, cut short. null when none. */
  summary: string | null;
  /** Image address (https) the feed supplies for this story. null when none. */
  image: string | null;
}

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
  ndash: "–",
  mdash: "—",
  hellip: "…"
};

function decode(input: string): string {
  return input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (match, name) => ENTITIES[name.toLowerCase()] ?? match);
}

function clean(input: string): string {
  return decode(decode(input).replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function tagText(block: string, tag: string): string | null {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i"));
  return match ? match[1] : null;
}

function atomLink(block: string): string | null {
  const links = block.match(/<link\b[^>]*>/gi) ?? [];
  for (const tag of links) {
    const rel = tag.match(/rel=["']([^"']+)["']/i)?.[1];
    const href = tag.match(/href=["']([^"']+)["']/i)?.[1];
    if (href && (!rel || rel === "alternate")) return decode(href);
  }
  return null;
}

function toIso(value: string | null): string | null {
  if (!value) return null;
  const time = Date.parse(clean(value));
  return Number.isNaN(time) ? null : new Date(time).toISOString();
}

function safeHttpUrl(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(decode(value).trim());
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

const SUMMARY_MAX = 180;

function shorten(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, Math.max(cut.lastIndexOf(" "), 40)).replace(/[\s.,;:!?-]+$/, "") + "\u2026";
}

function findImage(block: string): string | null {
  const candidates: (string | undefined)[] = [
    block.match(/<media:(?:content|thumbnail)\b[^>]*\burl=["']([^"']+)["']/i)?.[1],
    block.match(/<enclosure\b[^>]*\btype=["']image\/[^"']*["'][^>]*\burl=["']([^"']+)["']/i)?.[1],
    block.match(/<enclosure\b[^>]*\burl=["']([^"']+\.(?:jpe?g|png|webp))["']/i)?.[1]
  ];
  const html = decode(tagText(block, "content:encoded") ?? tagText(block, "description") ?? "");
  candidates.push(html.match(/<img\b[^>]*\bsrc=["']([^"']+)["']/i)?.[1]);
  for (const candidate of candidates) {
    const url = safeHttpUrl(candidate ?? null);
    if (url && url.startsWith("https://")) return url;
  }
  return null;
}

export function parseFeed(xml: string): ParsedFeedItem[] {
  const blocks = xml.match(/<item\b[\s\S]*?<\/item>|<entry\b[\s\S]*?<\/entry>/gi) ?? [];
  const items: ParsedFeedItem[] = [];

  for (const block of blocks) {
    const title = clean(tagText(block, "title") ?? "");
    const link = safeHttpUrl(tagText(block, "link") ?? atomLink(block));
    if (!title || !link) continue;
    // Skip reader comments (WordPress comment feeds use "By: name" titles and #comment- links).
    if (/#comment-\d+/i.test(link) || /^(by:|comment on)\s/i.test(title)) continue;

    const publishedAt = toIso(tagText(block, "pubDate") ?? tagText(block, "dc:date") ?? tagText(block, "published") ?? tagText(block, "updated"));
    const summaryText = clean(tagText(block, "description") ?? tagText(block, "summary") ?? "")
      .replace(/\s*(The post .* appeared first on .*|Read more.*)$/i, "")
      .trim();
    items.push({
      title,
      link,
      publishedAt,
      summary: summaryText ? shorten(summaryText, SUMMARY_MAX) : null,
      image: findImage(block)
    });
  }

  return items;
}
