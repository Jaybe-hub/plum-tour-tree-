import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { TourDiscovery } from "@/components/sections/tour-discovery";
import { CtaBanner } from "@/components/sections/cta-banner";
import { sanityFetch } from "@/sanity/lib/live";
import { toursListQuery, type TourListItem } from "@/sanity/lib/queries";
import { isSanityConfigured } from "@/sanity/env";

export const metadata: Metadata = {
  title: "Tours",
  description: "Browse currently published tours from Plum Tree Tours, with clear pricing and detailed itineraries."
};

// Always fetch fresh at request time — required for Sanity content to
// reflect immediately without a rebuild.
export const dynamic = "force-dynamic";

async function getTours(): Promise<TourListItem[]> {
  if (!isSanityConfigured) return [];
  try {
    const { data } = await sanityFetch({ query: toursListQuery });
    return data as TourListItem[];
  } catch (error) {
    console.error("Failed to fetch tours from Sanity:", error);
    return [];
  }
}

export default async function ToursPage() {
  const tours = await getTours();

  return (
    <>
      <PageHeader
        eyebrow="Explore Nigeria"
        title="Your Next Adventure Starts Here"
        subtitle="Discover thoughtfully curated tour experiences across Nigeria, from vibrant cities and cultural landmarks to breathtaking landscapes and coastal escapes."
      />

      {!isSanityConfigured ? (
        <section className="container py-16">
          <div className="mx-auto max-w-md rounded-card border border-purple-900/10 bg-beige p-8 text-center">
            <p className="text-sm font-medium text-ink">Sanity isn't connected yet</p>
            <p className="mt-2 text-sm text-ink-secondary">
              Add your Sanity project credentials to <code className="text-xs">.env.local</code> to start publishing tours here.
            </p>
          </div>
        </section>
      ) : (
        <TourDiscovery tours={tours} />
      )}

      <CtaBanner
        title="Looking for something specific?"
        subtitle="Tell us what kind of Nigerian experience you're looking for and we'll help you find the right tour."
        ctaLabel="Plan Your Tour"
        ctaHref="/booking"
      />
    </>
  );
}
