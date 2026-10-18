import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { GalleryLightbox } from "@/components/sections/gallery-lightbox";
import { getAllSiteGalleryImages } from "@/sanity/lib/gallery";
import { isSanityConfigured } from "@/sanity/env";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A look at moments from Plum Tree Tours."
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const images = await getAllSiteGalleryImages();

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Moments from our tours"
        backgroundImage="/images/backgrounds/yemisi-shyllon-gallery.jpg"
        overlay="strong"
      />
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
          <GalleryLightbox images={images} />
        )}
      </section>
    </>
  );
}
