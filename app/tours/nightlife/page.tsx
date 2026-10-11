import type { Metadata } from "next";
import { PlaceCard } from "@/components/cards/place-card";
import { NightlifeVenues } from "@/components/sections/nightlife-venues";
import { CategoryTourExperience } from "@/components/sections/category-tour-experience";

export const metadata: Metadata = {
  title: "Nightlife",
  description: "Nightlife tours from Plum Tree Tours — Nigeria's liveliest after-dark spots and entertainment districts."
};

export const dynamic = "force-dynamic";

const NIGHTLIFE_PLACES = [
  {
    name: "Victoria Island, Lagos",
    description: "Lagos's best-known entertainment district, packed with lounges, bars and late-night spots."
  },
  {
    name: "Lekki Phase 1, Lagos",
    description: "A buzzing strip of bars, lounges and restaurants popular with Lagos's nightlife crowd."
  },
  {
    name: "Freedom Park, Lagos",
    description: "A historic site turned cultural and entertainment venue, hosting live music and events."
  },
  {
    name: "Oniru / Eko Atlantic, Lagos",
    description: "A modern waterfront strip known for upscale lounges and evening entertainment."
  },
  {
    name: "Calabar, Cross River",
    description: "Home to Nigeria's famous Calabar Carnival, with lively street parties and festive nightlife."
  }
];

function NightlifePlacesSection() {
  return (
    <section className="bg-beige py-16">
      <div className="container">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-eyebrow uppercase text-ink-muted">Nightlife districts</p>
          <h2 className="mt-3 text-h2 text-ink">Places You&apos;ll Visit</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
            Experience Nigeria after dark, from Lagos's lounges and waterfront strips to Calabar's carnival streets.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {NIGHTLIFE_PLACES.map((place) => (
            <PlaceCard key={place.name} {...place} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function NightlifePage() {
  return (
    <CategoryTourExperience
      backgroundImage="/images/headers/nightlife.jpg"
      backgroundPosition="center"
      category="Nightlife"
      eyebrow="Nightlife"
      heading="Nigeria After Dark"
      subtitle="From Lagos's lounges and waterfront strips to Calabar's carnival streets, discover Nigeria's liveliest after-dark experiences."
      placesSection={
        <>
          <NightlifePlacesSection />
          <NightlifeVenues />
        </>
      }
    />
  );
}
