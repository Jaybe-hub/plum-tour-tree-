import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { Check } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/live";
import { destinationBySlugQuery, type DestinationDetail } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { TourPhotoViewer, type TourPhoto } from "@/components/sections/tour-photo-viewer";

export const dynamic = "force-dynamic";

async function getDestination(slug: string): Promise<DestinationDetail | null> {
  try {
    const { data } = await sanityFetch({ query: destinationBySlugQuery, params: { slug } });
    return (data as DestinationDetail) ?? null;
  } catch (error) {
    console.error("Failed to fetch destination from Sanity:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const destination = await getDestination(params.slug);
  if (!destination) return { title: "Destination not found" };
  return { title: destination.name ?? "Destination", description: destination.tagline ?? undefined };
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-sm leading-relaxed text-ink-secondary last:mb-0">{children}</p>
    )
  }
};

export default async function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const destination = await getDestination(params.slug);
  if (!destination) notFound();

  const destinationName = destination.name ?? "Destination";
  const photos: TourPhoto[] = [];
  if (destination.image?.asset) {
    photos.push({
      thumb: urlFor(destination.image).width(400).height(400).url(),
      full: urlFor(destination.image).width(1600).url(),
      alt: `${destinationName} main photo`
    });
  }
  (destination.gallery ?? [])
    .filter((img) => img?.asset)
    .forEach((img, i) => {
      photos.push({
        thumb: urlFor(img).width(400).height(400).url(),
        full: urlFor(img).width(1600).url(),
        alt: `${destinationName} photo ${i + 1}`
      });
    });

  return (
    <>
      <section className="relative overflow-hidden bg-purple-900">
        {destination.image?.asset && (
          <Image
            src={urlFor(destination.image).width(1600).height(900).url()}
            alt={destination.name ?? "Destination image"}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
        )}
        <div className="relative container flex min-h-[360px] flex-col items-center justify-center py-20 text-center">
          {destination.tagline && <p className="text-eyebrow uppercase text-gold">{destination.tagline}</p>}
          <h1 className="mt-3 text-h1 text-white">{destination.name}</h1>
        </div>
      </section>

      <section className="container max-w-2xl py-16">
        {destination.description && destination.description.length > 0 && (
          <PortableText value={destination.description as never} components={portableTextComponents} />
        )}

        {destination.highlights && destination.highlights.length > 0 && (
          <div className="mt-10">
            <h2 className="text-h3 text-ink">Highlights</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {destination.highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-secondary">
                  <Check size={16} className="mt-0.5 shrink-0 text-purple-700" /> {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {photos.length > 0 && (
          <div className="mt-10">
            <h2 className="text-h3 text-ink">Photos</h2>
            <p className="mt-1 text-xs text-ink-muted">Click any photo to view it larger.</p>
            <div className="mt-4">
              <TourPhotoViewer photos={photos} />
            </div>
          </div>
        )}
      </section>
    </>
  );
}
