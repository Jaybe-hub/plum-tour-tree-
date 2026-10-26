/**
 * Approved news sources for the "Latest Nigerian Tourism News" section.
 *
 * IMPORTANT: Only add a source here after you have:
 *   1. Opened the feed URL in your browser and confirmed it shows real, current stories.
 *   2. Read the publisher's terms and confirmed that showing headlines + a link is allowed.
 *
 * This list is intentionally EMPTY. Nothing is shown on the Blog page until you add a
 * verified source. See NEWS-FEED-README.md for the steps.
 */
export interface NewsSource {
  /** Publisher name shown on each card, e.g. "The Guardian Nigeria". */
  name: string;
  /** The RSS or Atom feed URL (https only). */
  feedUrl: string;
  /** Topic label shown on the card, e.g. "Travel". Only use a label that is true for the feed. */
  topic?: string;
  /**
   * Optional. For general feeds only: a story is shown only if its headline contains
   * at least one of these words (case-insensitive). Leave out for tourism-only feeds.
   */
  requireKeywords?: string[];
  /** Show a short summary from the feed. Turn off if the publisher does not allow it. */
  showSummary?: boolean;
  /** Show the story image the feed supplies (loaded from the publisher's site). Turn off if not allowed. */
  showImage?: boolean;
}

export const NEWS_SOURCES: NewsSource[] = [
  {
    name: "Connect Nigeria",
    feedUrl: "https://articles.connectnigeria.com/category/lifestyle/tourism/feed/",
    topic: "Tourism",
    showSummary: true,
    showImage: true
  },
  // Example (NOT enabled — copy, edit and verify before using):
  // { name: "Publisher name", feedUrl: "https://example.com/category/travel/feed/", topic: "Travel" }
];
