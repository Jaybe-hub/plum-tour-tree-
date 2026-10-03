"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Compass } from "lucide-react";
import { TourCard } from "@/components/cards/tour-card";
import type { TourListItem } from "@/sanity/lib/queries";

const CATEGORIES = ["All Tours", "Coastal Getaways", "City Explorers", "Cultural Journeys", "Wildlife and Safari"];

export function TourDiscovery({ tours }: { tours: TourListItem[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All Tours");

  const filteredTours = useMemo(() => {
    if (activeCategory === "All Tours") return tours;
    return tours.filter((tour) => tour.category === activeCategory);
  }, [tours, activeCategory]);

  return (
    <section className="container py-16">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-eyebrow uppercase text-ink-muted">Our tours</p>
        <h2 className="mt-3 text-h2 text-ink">Find Your Perfect Tour</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
          Explore experiences designed to help you see, experience and enjoy more of Nigeria.
        </p>
      </div>

      {tours.length > 0 && (
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 active:scale-95 ${
                activeCategory === category
                  ? "border-purple-900 bg-purple-900 text-white shadow-card-hover"
                  : "border-purple-900/15 bg-white text-ink-secondary hover:-translate-y-0.5 hover:border-gold hover:text-purple-900 hover:shadow-card"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {tours.length === 0 ? (
        <div className="mx-auto mt-12 flex max-w-md flex-col items-center rounded-card border border-purple-900/10 bg-beige px-8 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-900/10 text-purple-700">
            <Compass size={22} />
          </div>
          <p className="mt-4 text-h3 text-ink">No tours published yet</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
            Add and publish a tour in Sanity Studio and it will appear here automatically.
          </p>
          <Link
            href="/"
            className="mt-5 text-sm font-medium uppercase tracking-wide text-gold-hover transition-colors duration-200 hover:text-purple-900"
          >
            Explore Nigeria on the homepage
          </Link>
        </div>
      ) : filteredTours.length === 0 ? (
        <div className="mx-auto mt-12 flex max-w-md flex-col items-center rounded-card border border-purple-900/10 bg-beige px-8 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-900/10 text-purple-700">
            <Compass size={22} />
          </div>
          <p className="mt-4 text-h3 text-ink">No tours available in this category yet</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
            Check back soon, or browse another category above.
          </p>
          <button
            type="button"
            onClick={() => setActiveCategory("All Tours")}
            className="mt-5 text-sm font-medium uppercase tracking-wide text-gold-hover transition-colors duration-200 hover:text-purple-900"
          >
            View All Tours
          </button>
        </div>
      ) : (
        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTours.map((tour) => (
            <TourCard key={tour._id} tour={tour} />
          ))}
        </div>
      )}
    </section>
  );
}
