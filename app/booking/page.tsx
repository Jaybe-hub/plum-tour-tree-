import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { BookingForm } from "@/components/forms/booking-form";
import { sanityFetch } from "@/sanity/lib/live";
import { toursListQuery, type TourListItem } from "@/sanity/lib/queries";
import { isSanityConfigured } from "@/sanity/env";

export const metadata: Metadata = {
  title: "Book a Tour",
  description: "Send a tour booking enquiry to Plum Tree Tours — no payment required to enquire."
};

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

export default async function BookingPage({
  searchParams
}: {
  searchParams?: { tour?: string };
}) {
  const tours = await getTours();
  const tourOptions = tours.map((t) => t.name).filter((n): n is string => Boolean(n));

  const requestedSlug = searchParams?.tour;
  const matchedTour = requestedSlug ? tours.find((t) => t.slug === requestedSlug) : undefined;
  const defaultTour = matchedTour?.name ?? undefined;

  return (
    <>
      <PageHeader
        eyebrow="Book a tour"
        title="Send a tour booking enquiry"
        subtitle="Tell us where you'd like to go and we'll get back to you to confirm availability. No payment is required to enquire."
      />
      <section className="container py-16">
        <BookingForm tourOptions={tourOptions} defaultTour={defaultTour} />
      </section>
    </>
  );
}
