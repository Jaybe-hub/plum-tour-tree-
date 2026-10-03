import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/shared/page-header";
import { sanityFetch } from "@/sanity/lib/live";
import { galleryImagesQuery, type GalleryImageItem } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { isSanityConfigured } from "@/sanity/env";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A look at moments from Plum Tree Tours."
};

export const dynamic = "force-dynamic";

async function getGalleryImages(): Promise<GalleryImageItem[]> {
  if (!isSanityConfigured) return [];
  try {
    const { data } = await sanityFetch({ query: galleryImagesQuery });
    return data as GalleryImageItem[];
  } catch (error) {
    console.error("Failed to fetch gallery images from Sanity:", error);
    return [];
  }
}

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <>
      <PageHeader eyebrow="Gallery" title="Moments from our tours" />
      <section className="container py-16">
        {!isSanityConfigured ? (
          <div className="mx-auto max-w-md rounded-card border border-purple-900/10 bg-beige p-8 text-center">
            <p className="text-sm font-medium text-ink">Sanity isn&apos;t connected yet</p>
            <p className="mt-2 text-sm text-ink-secondary">
              Add your Sanity project credentials to <code className="text-xs">.env.local</code> to start publishing gallery images here.
            </p>
          </div>
        ) : images.length === 0 ? (
          <div className="mx-auto max-w-md rounded-card border border-purple-900/10 bg-beige p-8 text-center">
            <p className="text-sm font-medium text-ink">No images published yet</p>
            <p className="mt-2 text-sm text-ink-secondary">
              Add and publish a Gallery Image in Sanity Studio and it will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {images.map((item) =>
              item.image ? (
                <div key={item._id} className="relative aspect-square overflow-hidden rounded-control">
                  <Image
                    src={urlFor(item.image).width(500).height(500).url()}
                    alt={item.caption ?? "Gallery image"}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ) : null
            )}
          </div>
        )}
      </section>
    </>
  );
}
