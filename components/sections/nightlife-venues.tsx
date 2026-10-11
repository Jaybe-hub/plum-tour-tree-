"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";

/**
 * Informational list of well-known Lagos nightlife venues, grouped by district.
 * These are NOT Plum Tree Tours partners and are NOT bookable here.
 * Only add a venue once its name, address and official link have been verified.
 */
interface Venue {
  name: string;
  address: string;
  linkLabel?: string;
  linkHref?: string;
}

interface District {
  id: string;
  name: string;
  venues: Venue[];
}

const DISTRICTS: District[] = [
  {
    id: "victoria-island",
    name: "Victoria Island, Lagos",
    venues: [
      { name: "Club Quilox", address: "873 Ozumba Mbadiwe Avenue, Victoria Island", linkLabel: "Instagram", linkHref: "https://www.instagram.com/clubquilox/" },
      { name: "The Library Lagos", address: "82 Adetokunbo Ademola Street, Victoria Island", linkLabel: "Instagram", linkHref: "https://www.instagram.com/thelibrary.lagos/" }
    ]
  },
  {
    id: "lekki",
    name: "Lekki, Lagos",
    venues: [
      { name: "Secret Palace", address: "142 Lekki–Epe Expressway, Lekki Peninsula II", linkLabel: "Website", linkHref: "https://secretspalace.com" }
    ]
  }
];

export function NightlifeVenues() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="container py-16" aria-labelledby="nightlife-venues-heading">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <p className="text-eyebrow uppercase text-ink-muted">Good to know</p>
          <h2 id="nightlife-venues-heading" className="mt-3 text-h2 text-ink">Popular Nightlife Venues</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
            A reference list of well-known Lagos venues, by district. Open a district to see what&apos;s listed.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {DISTRICTS.map((district) => {
            const isOpen = openId === district.id;
            const panelId = `venues-${district.id}`;
            return (
              <div key={district.id} className="rounded-card border border-purple-900/10 bg-white">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : district.id)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-700"
                  >
                    <span>{district.name}</span>
                    <ChevronDown size={18} aria-hidden="true" className={`shrink-0 text-purple-700 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                </h3>
                {isOpen && (
                  <ul id={panelId} className="divide-y divide-purple-900/10 border-t border-purple-900/10 px-5">
                    {district.venues.map((venue) => (
                      <li key={venue.name} className="py-4">
                        <p className="text-sm font-medium text-ink">{venue.name}</p>
                        <p className="mt-1 text-xs text-ink-secondary">{venue.address}</p>
                        {venue.linkHref && (
                          <a
                            href={venue.linkHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-purple-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-700"
                          >
                            {venue.linkLabel} <ExternalLink size={12} aria-hidden="true" />
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-ink-muted">
          This list is for general information only. Venues are not Plum Tree Tours partners and can&apos;t be booked through this page.
          Opening hours, entry rules, prices and addresses can change, so please confirm directly with a venue before visiting.
        </p>
      </div>
    </section>
  );
}
