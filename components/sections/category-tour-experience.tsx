import type { ReactNode } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { TourCard } from "@/components/cards/tour-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { sanityFetch } from "@/sanity/lib/live";
import { toursByCategoryQuery, type TourListItem } from "@/sanity/lib/queries";
import { isSanityConfigured } from "@/sanity/env";

interface CategoryTourExperienceProps {
  /** Must match a value in the Sanity tour.category options list exactly. */
  category: string;
  eyebrow: string;
  heading: string;
  subtitle: string;
  /** Optional "Places You'll Visit" (or similar) content rendered before the tours grid. */
  placesSection?: ReactNode;
  /** Optional photographic header background (path under /public). */
  backgroundImage?: string;
  backgroundPosition?: string;
}

async function getToursForCategory(category: string): Promise<TourListItem[]> {
  if (!isSanityConfigured) return [];
  try {
    const { data } = await sanityFetch({ query: toursByCategoryQuery, params: { category } });
    return (data as TourListItem[]) ?? [];
  } catch (error) {
    console.error("Failed to fetch tours for category from Sanity:", error);
    return [];
  }
}

export async function CategoryTourExperience({
  category,
  eyebrow,
  heading,
  subtitle,
  placesSection,
  backgroundImage,
  backgroundPosition
}: CategoryTourExperienceProps) {
  const tours = await getToursForCategory(category);

  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        title={heading}
        subtitle={subtitle}
        backgroundImage={backgroundImage}
        imagePosition={backgroundPosition}
      />

      {placesSection}

      <section className="container py-16">
        {!isSanityConfigured ? (
          <div className="mx-auto max-w-md rounded-card border border-purple-900/10 bg-beige p-8 text-center">
            <p className="text-sm font-medium text-ink">Sanity isn&apos;t connected yet</p>
            <p className="mt-2 text-sm text-ink-secondary">
              Add your Sanity project credentials to <code className="text-xs">.env.local</code> to start publishing tours here.
            </p>
          </div>
        ) : tours.length === 0 ? (
          <div className="mx-auto max-w-md rounded-card border border-purple-900/10 bg-beige p-8 text-center">
            <p className="text-sm font-medium text-ink">No tours published in this category yet</p>
            <p className="mt-2 text-sm text-ink-secondary">
              Assign the &ldquo;{category}&rdquo; category to a published tour in Sanity Studio and it will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => (
              <TourCard key={tour._id} tour={tour} />
            ))}
          </div>
        )}
      </section>

      <CtaBanner
        title="Ready to plan this experience?"
        subtitle="Tell us your dates and preferences and we'll help you put together the right tour."
        ctaLabel="Plan Your Tour"
        ctaHref="/booking"
      />
    </>
  );
}
