import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { TestimonialCard } from "@/components/cards/testimonial-card";
import { sanityFetch } from "@/sanity/lib/live";
import { testimonialsQuery, type TestimonialItem } from "@/sanity/lib/queries";
import { isSanityConfigured } from "@/sanity/env";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What our customers say about touring with Plum Tree Tours."
};

export const dynamic = "force-dynamic";

async function getTestimonials(): Promise<TestimonialItem[]> {
  if (!isSanityConfigured) return [];
  try {
    const { data } = await sanityFetch({ query: testimonialsQuery });
    return data as TestimonialItem[];
  } catch (error) {
    console.error("Failed to fetch testimonials from Sanity:", error);
    return [];
  }
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <PageHeader eyebrow="Testimonials" title="What travellers say" />
      <section className="container py-16">
        {!isSanityConfigured ? (
          <div className="mx-auto max-w-md rounded-card border border-purple-900/10 bg-beige p-8 text-center">
            <p className="text-sm font-medium text-ink">Sanity isn&apos;t connected yet</p>
            <p className="mt-2 text-sm text-ink-secondary">
              Add your Sanity project credentials to <code className="text-xs">.env.local</code> to start publishing testimonials here.
            </p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="mx-auto max-w-md rounded-card border border-purple-900/10 bg-beige p-8 text-center">
            <p className="text-sm font-medium text-ink">No testimonials yet</p>
            <p className="mt-2 text-sm text-ink-secondary">
              Real customer testimonials will appear here once added and published in Sanity Studio.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t._id} testimonial={t} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
