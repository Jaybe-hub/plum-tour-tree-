import { ExternalLink } from "lucide-react";
import { getLatestNews, hasNewsSources } from "@/lib/news/fetch-news";

/**
 * Headlines and links only, from approved sources in lib/news/sources.ts.
 * Renders nothing until at least one verified source has been added.
 */
export async function LatestTourismNews() {
  if (!hasNewsSources()) return null;

  const items = await getLatestNews();

  return (
    <section className="bg-beige py-16" aria-labelledby="latest-news-heading">
      <div className="container">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-eyebrow uppercase text-ink-muted">From other publishers</p>
          <h2 id="latest-news-heading" className="mt-3 text-h2 text-ink">
            Latest Nigerian Tourism News
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
            Stay informed about the destinations, culture, events and developments shaping tourism across Nigeria.
            These are headlines from other publishers, not Plum Tree Tours articles. Each link opens the original story.
          </p>
        </div>

        {items.length === 0 ? (
          <p className="mx-auto mt-10 max-w-md rounded-card border border-purple-900/10 bg-white p-6 text-center text-sm text-ink-secondary">
            News headlines are unavailable right now. Please check back soon.
          </p>
        ) : (
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <li key={item.id} className="flex flex-col overflow-hidden rounded-card border border-purple-900/10 bg-white">
                {item.image && (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
                    {/* Plain img on purpose: the picture is loaded from the publisher's site. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt=""
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="aspect-[4/3] w-full bg-beige object-cover"
                    />
                  </a>
                )}
                <div className="flex flex-1 flex-col p-6">
                <p className="text-eyebrow uppercase text-gold">{item.topic ?? "News"}</p>
                <h3 className="mt-2 text-base font-medium leading-snug text-ink">{item.title}</h3>
                {item.summary && <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{item.summary}</p>}
                <p className="mt-3 text-xs text-ink-muted">
                  {item.sourceName}
                </p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-purple-700 hover:text-purple-900"
                >
                  Read original article
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="sr-only">
                    {" "}on {item.sourceName} (opens in a new tab)
                  </span>
                </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
