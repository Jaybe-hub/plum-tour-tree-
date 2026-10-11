import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { DestinationCard } from "@/components/cards/destination-card";
import { sanityFetch } from "@/sanity/lib/live";
import { destinationsListQuery, type DestinationListItem } from "@/sanity/lib/queries";
import { isSanityConfigured } from "@/sanity/env";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Browse currently published destinations from Plum Tree Tours."
};

export const dynamic = "force-dynamic";

async function getDestinations(): Promise<DestinationListItem[]> {
  if (!isSanityConfigured) return [];
  try {
    const { data } = await sanityFetch({ query: destinationsListQuery });
    return data as DestinationListItem[];
  } catch (error) {
    console.error("Failed to fetch destinations from Sanity:", error);
    return [];
  }
}

export default async function DestinationsPage() {
  const destinations = await getDestinations();

  return (
    <>
      <PageHeader
        eyebrow="Destinations"
        title="Where to go next"
        subtitle="Explore the destinations currently featured across our tours."
        backgroundImage="/images/backgrounds/zuma-rock-destinations.jpg"
      />
      <section className="container py-16">
        {!isSanityConfigured ? (
          <div className="mx-auto max-w-md rounded-card border border-purple-900/10 bg-beige p-8 text-center">
            <p className="text-sm font-medium text-ink">Sanity isn&apos;t connected yet</p>
            <p className="mt-2 text-sm text-ink-secondary">
              Add your Sanity project credentials to <code className="text-xs">.env.local</code> to start publishing destinations here.
            </p>
          </div>
        ) : destinations.length === 0 ? (
          <div className="mx-auto max-w-md rounded-card border border-purple-900/10 bg-beige p-8 text-center">
            <p className="text-sm font-medium text-ink">No destinations published yet</p>
            <p className="mt-2 text-sm text-ink-secondary">
              Add and publish a destination in Sanity Studio and it will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <DestinationCard key={destination._id} destination={destination} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
