import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { Card, CardImage, CardBody } from "@/components/ui/card";
import { urlFor } from "@/sanity/lib/image";
import type { TourListItem } from "@/sanity/lib/queries";

export function TourCard({ tour }: { tour: TourListItem }) {
  const formattedPrice = tour.price
    ? new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: tour.currency || "NGN",
        maximumFractionDigits: 0
      }).format(tour.price)
    : "Price on request";

  return (
    <Link href={`/tours/${tour.slug || tour._id}`} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
        <CardImage className="aspect-[4/5] rounded-t-card">
          {tour.tourImage?.asset ? (
            <Image
              src={urlFor(tour.tourImage).width(700).height(875).url()}
              alt={tour.name || "Tour image"}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-beige text-xs text-ink-muted">
              No image yet
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-purple-900/70 via-purple-900/0 to-transparent" />
          <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
            {tour.category ? (
              <span className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-purple-900 backdrop-blur-sm">
                {tour.category}
              </span>
            ) : (
              <span />
            )}
            {tour.duration && (
              <span className="flex items-center gap-1 rounded-full bg-purple-900/70 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                <Clock size={12} /> {tour.duration}d
              </span>
            )}
          </div>
          {tour.destination && (
            <span className="absolute inset-x-3 bottom-3 flex items-center gap-1 text-xs font-medium text-white drop-shadow-sm">
              <MapPin size={13} /> {tour.destination}
            </span>
          )}
        </CardImage>
        <CardBody className="flex flex-1 flex-col p-5">
          <h3 className="text-h3 text-ink transition-colors duration-200 group-hover:text-purple-700">
            {tour.name}
          </h3>
          {tour.shortDescription && (
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-secondary line-clamp-2">
              {tour.shortDescription}
            </p>
          )}
          <div className="mt-4 flex items-center justify-between border-t border-purple-900/10 pt-4">
            <span className="text-base font-semibold text-ink">{formattedPrice}</span>
            <span className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-gold-hover transition-colors duration-200 group-hover:text-purple-900">
              View details
              <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
