import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { DestinationListItem } from "@/sanity/lib/queries";

export function DestinationCard({ destination }: { destination: DestinationListItem }) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-card bg-beige"
    >
      {destination.image ? (
        <Image
          src={urlFor(destination.image).width(600).height(800).url()}
          alt={destination.name ?? "Destination"}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-xs text-ink-muted">No image yet</div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-h3 text-white">{destination.name}</h3>
        {destination.tagline && <p className="mt-1 text-xs text-beige/85">{destination.tagline}</p>}
      </div>
    </Link>
  );
}
