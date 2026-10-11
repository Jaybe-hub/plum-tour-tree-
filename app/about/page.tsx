import type { Metadata } from "next";
import { ShieldCheck, Target, Eye } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { CtaBanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Plum Tree Tours — a Nigeria-based tour operator designing curated tour experiences for families, couples, corporate travellers and international visitors."
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Your gateway to memorable journeys"
        subtitle="Plum Tree Tours designs curated tours for families, couples, and groups exploring Nigeria and beyond."
        backgroundImage="/images/backgrounds/zaria-palace-about.jpg"
      />

      <section className="container py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-h2 text-ink">Our story</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
            Plum Tree Tours was founded to make well-planned, memorable tours accessible — trips built around real itineraries, clear pricing and dependable on-ground coordination, rather than a loose list of destinations.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
            We focus on tours across Nigeria's highlands, coastlines and cities, alongside curated international destinations — each one planned around who's actually travelling, whether that's a family, a couple, or a group of friends.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          <div className="rounded-card border border-purple-900/10 bg-beige p-8">
            <Target className="text-purple-700" size={22} />
            <h3 className="mt-4 text-h3 text-ink">Our mission</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
              To make premium, well-organised tours accessible to Nigerian and international travellers, with planning that removes friction rather than adding to it.
            </p>
          </div>
          <div className="rounded-card border border-purple-900/10 bg-beige p-8">
            <Eye className="text-purple-700" size={22} />
            <h3 className="mt-4 text-h3 text-ink">Our vision</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
              To be the most trusted name in African tour experiences — known for reliability, local expertise and genuinely memorable itineraries.
            </p>
          </div>
        </div>

        <div className="mt-14 flex items-center gap-3 rounded-card border border-purple-900/10 p-6">
          <ShieldCheck className="shrink-0 text-purple-700" size={24} />
          <p className="text-sm text-ink-secondary">
            Plum Tree Tours is a Nigeria-based tour operator committed to safe, well-organised group and private tours.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-h2 text-ink">Our team</h2>
          <div className="mx-auto mt-8 max-w-md rounded-card border border-dashed border-purple-900/20 bg-beige p-8 text-center">
            <p className="text-sm font-medium text-ink">Team profiles coming soon</p>
            <p className="mt-2 text-sm text-ink-secondary">
              Add real team names, roles and photos here whenever you&apos;re ready to introduce the people behind Plum Tree Tours.
            </p>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to start planning your tour?"
        subtitle="Tell us where you'd like to go and our team will take it from there."
        ctaLabel="Book a Tour"
        ctaHref="/booking"
      />
    </>
  );
}
