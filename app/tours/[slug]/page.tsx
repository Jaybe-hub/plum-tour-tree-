import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { Calendar, Check, Clock, X as XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sanityFetch } from "@/sanity/lib/live";
import { tourBySlugQuery, type TourDetail } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const dynamic = "force-dynamic";

async function getTour(slug: string): Promise<TourDetail | null> {
  try {
    const { data } = await sanityFetch({ query: tourBySlugQuery, params: { slug } });
    return (data as TourDetail) ?? null;
  } catch (error) {
    console.error("Failed to fetch tour from Sanity:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tour = await getTour(params.slug);
  if (!tour) return { title: "Tour not found" };
  return { title: tour.name ?? "Tour", description: tour.shortDescription ?? undefined };
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-sm leading-relaxed text-ink-secondary last:mb-0">{children}</p>
    )
  }
};

export default async function TourDetailPage({ params }: { params: { slug: string } }) {
  const tour = await getTour(params.slug);
  if (!tour) notFound();

  const formattedPrice = tour.price
    ? new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: tour.currency || "NGN",
        maximumFractionDigits: 0
      }).format(tour.price)
    : "Price on request";

  return (
    <>
      <section className="relative overflow-hidden bg-purple-900">
        {tour.tourImage && (
          <Image
            src={urlFor(tour.tourImage).width(1600).height(900).url()}
            alt={tour.name ?? "Tour image"}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
        )}
        <div className="relative container flex min-h-[380px] flex-col items-center justify-center py-20 text-center">
          {tour.destination && <p className="text-eyebrow uppercase text-gold">{tour.destination}</p>}
          <h1 className="mt-3 text-h1 text-white">{tour.name}</h1>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-5 text-sm text-beige/90">
            {tour.duration && (
              <span className="flex items-center gap-1.5"><Clock size={16} /> {tour.duration} days</span>
            )}
            <span className="font-medium text-gold">{formattedPrice}</span>
          </div>
        </div>
      </section>

      <section className="container grid gap-12 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {tour.shortDescription && (
            <p className="text-sm leading-relaxed text-ink-secondary">{tour.shortDescription}</p>
          )}

          {tour.fullDescription && tour.fullDescription.length > 0 && (
            <div className="mt-6">
              <PortableText value={tour.fullDescription as never} components={portableTextComponents} />
            </div>
          )}

          {tour.highlights && tour.highlights.length > 0 && (
            <div className="mt-10">
              <h2 className="text-h3 text-ink">Highlights</h2>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {tour.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-ink-secondary">
                    <Check size={16} className="mt-0.5 shrink-0 text-purple-700" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tour.itinerary && tour.itinerary.length > 0 && (
            <div className="mt-10">
              <h2 className="text-h3 text-ink">Itinerary</h2>
              <div className="mt-4 space-y-4">
                {tour.itinerary.map((day) => (
                  <div key={day.day} className="rounded-card border border-purple-900/10 p-5">
                    <p className="text-sm font-medium text-purple-700">Day {day.day}: {day.title}</p>
                    {day.description && <p className="mt-1.5 text-sm text-ink-secondary">{day.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {((tour.inclusions?.length ?? 0) > 0 || (tour.exclusions?.length ?? 0) > 0) && (
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {tour.inclusions && tour.inclusions.length > 0 && (
                <div>
                  <h2 className="text-h3 text-ink">What&apos;s included</h2>
                  <ul className="mt-3 space-y-2">
                    {tour.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ink-secondary">
                        <Check size={16} className="mt-0.5 shrink-0 text-green-600" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {tour.exclusions && tour.exclusions.length > 0 && (
                <div>
                  <h2 className="text-h3 text-ink">What&apos;s excluded</h2>
                  <ul className="mt-3 space-y-2">
                    {tour.exclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-ink-secondary">
                        <XIcon size={16} className="mt-0.5 shrink-0 text-red-400" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {tour.gallery && tour.gallery.length > 0 && (
            <div className="mt-10">
              <h2 className="text-h3 text-ink">Gallery</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {tour.gallery.map((img, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-control">
                    <Image
                      src={urlFor(img).width(400).height(400).url()}
                      alt={`${tour.name ?? "Tour"} gallery image ${i + 1}`}
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 rounded-card border border-purple-900/10 bg-beige p-6">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">From</p>
            <p className="mt-1 text-h2 text-ink">{formattedPrice}</p>

            {tour.availableDates && tour.availableDates.length > 0 && (
              <div className="mt-5">
                <p className="text-xs font-medium text-ink-secondary">Available dates</p>
                <ul className="mt-2 space-y-1.5">
                  {tour.availableDates.map((date) => (
                    <li key={date} className="flex items-center gap-2 text-sm text-ink-secondary">
                      <Calendar size={14} />
                      {new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button asChild size="lg" className="mt-6 w-full">
              <Link href={`/booking?tour=${tour.slug}`}>Enquire / Book this tour</Link>
            </Button>
          </div>
        </aside>
      </section>
    </>
  );
}
