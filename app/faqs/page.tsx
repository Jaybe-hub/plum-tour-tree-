import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { sanityFetch } from "@/sanity/lib/live";
import { faqsQuery, type FaqItem } from "@/sanity/lib/queries";
import { isSanityConfigured } from "@/sanity/env";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers to common questions about booking and joining a tour with Plum Tree Tours."
};

export const dynamic = "force-dynamic";

async function getFaqs(): Promise<FaqItem[]> {
  if (!isSanityConfigured) return [];
  try {
    const { data } = await sanityFetch({ query: faqsQuery });
    return data as FaqItem[];
  } catch (error) {
    console.error("Failed to fetch FAQs from Sanity:", error);
    return [];
  }
}

export default async function FaqsPage() {
  const faqs = await getFaqs();

  return (
    <>
      <PageHeader eyebrow="FAQs" title="Common questions" />
      <section className="container max-w-2xl py-16">
        {!isSanityConfigured ? (
          <div className="mx-auto max-w-md rounded-card border border-purple-900/10 bg-beige p-8 text-center">
            <p className="text-sm font-medium text-ink">Sanity isn&apos;t connected yet</p>
            <p className="mt-2 text-sm text-ink-secondary">
              Add your Sanity project credentials to <code className="text-xs">.env.local</code> to start publishing FAQs here.
            </p>
          </div>
        ) : faqs.length === 0 ? (
          <div className="mx-auto max-w-md rounded-card border border-purple-900/10 bg-beige p-8 text-center">
            <p className="text-sm font-medium text-ink">No FAQs published yet</p>
            <p className="mt-2 text-sm text-ink-secondary">
              Add and publish a question in Sanity Studio and it will appear here automatically.
            </p>
          </div>
        ) : (
          <FaqAccordion items={faqs} />
        )}
      </section>
    </>
  );
}
