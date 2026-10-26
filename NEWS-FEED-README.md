# Latest Nigerian Tourism News (Blog page)

Shows headlines + a link to the original story, with the publisher's name and date. No excerpts, no images.
It appears under your own Sanity posts on /blog. Nothing is shown until you add a verified source.

## Files
- `lib/news/sources.ts`  – the approved source list (EMPTY on purpose). You edit this.
- `lib/news/parse.ts`    – reads RSS/Atom (headline, link, date only). No new packages.
- `lib/news/fetch-news.ts` – fetches sources, removes duplicates, sorts newest first, limits count.
- `components/sections/latest-tourism-news.tsx` – the section on the page.
- `app/blog/page.tsx`    – one line added to show the section.

## Adding a source
1. Find the publisher's feed URL and open it in your browser. It should show XML with real, recent stories.
2. Check the publisher's terms allow showing headlines with a link.
3. Add it in `lib/news/sources.ts`:
   { name: "Publisher name", feedUrl: "https://.../feed/", topic: "Travel" }
4. Run `npm run dev`, open http://localhost:3000/blog and check.

## Refresh
Each feed is requested at most once every 6 hours (Vercel caches it). No cron job, no secrets, no refresh endpoint.
Optional Vercel env vars: NEWS_REVALIDATE_HOURS (1-48, default 6), NEWS_MAX_ITEMS (3-24, default 6).

## Sources checked (not enabled)
- News Agency of Nigeria (nannews.ng) and Voice of Nigeria (von.gov.ng): no RSS link advertised on the pages checked;
  footers say "All rights reserved" with no reuse terms. Not added.
- Feedspot lists feeds for Guardian Nigeria, Premium Times, BizWatch Nigeria, Business Post, Connect Nigeria and
  Information Nigeria travel sections. They could not be opened from the build environment and their terms were not
  checked, so none are enabled. Verify first.
