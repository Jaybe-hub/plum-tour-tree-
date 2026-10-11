import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { Check } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/live";
import { destinationBySlugQuery, type DestinationDetail } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

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

        {destination.gallery && destination.gallery.filter((img) => img?.asset).length > 0 && (
          <div className="mt-10">
            <h2 className="text-h3 text-ink">Gallery</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {destination.gallery
                .filter((img) => img?.asset)
                .map((img, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-control">
                    <Image
                      src={urlFor(img).width(400).height(400).url()}
                      alt={`${destination.name ?? "Destination"} gallery image ${i + 1}`}
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
