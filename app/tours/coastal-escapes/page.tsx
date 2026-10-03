import type { Metadata } from "next";
import { PlaceCard } from "@/components/cards/place-card";
import { CategoryTourExperience } from "@/components/sections/category-tour-experience";

export const metadata: Metadata = {
  title: "Coastal Getaways",
  description: "Coastal Getaways tours from Plum Tree Tours — beaches, waterfronts and slow days by Nigeria's coast."
};

export const dynamic = "force-dynamic";

const COASTAL_PLACES = [
  {
    name: "Tarkwa Bay, Lagos",
    description: "A secluded Lagos beach experience known for its coastal setting, relaxed atmosphere and beautiful Atlantic views."
  },
  {
    name: "Badagry, Lagos",
    description: "Explore a historic coastal town where Nigeria's rich history meets waterways, beaches and the Atlantic coastline."
  },
  {
    name: "Lekki Conservation Centre, Lagos",
    description: "Experience the coastal side of Lagos through its natural surroundings, waterfront attractions and relaxing escapes."
  },
  {
    name: "La Campagne Tropicana, Lagos",
    description: "A tropical coastal retreat combining beach scenery, nature and a peaceful getaway experience along the Lagos coastline."
  },
  {
    name: "Elegushi Beach, Lekki",
    description: "A popular Lagos coastal destination offering beach scenery and an easy escape from the city's busy pace."
  }
];

function CoastalPlacesSection() {
  return (
    <section className="bg-beige py-16">
      <div className="container">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-eyebrow uppercase text-ink-muted">Coastal destinations</p>
          <h2 className="mt-3 text-h2 text-ink">Places You&apos;ll Visit</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
            Discover some of Nigeria&apos;s most inviting coastal destinations, from peaceful beaches and waterfront
            escapes to the historic shores of Badagry.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COASTAL_PLACES.map((place) => (
            <PlaceCard key={place.name} {...place} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CoastalEscapesPage() {
  return (
    <CategoryTourExperience
      category="Coastal Getaways"
      eyebrow="Coastal Getaways"
      heading="Sun, Shoreline and Slow Days by the Water"
      subtitle="Trade the noise of the city for open water, golden sand and the easy rhythm of Nigeria's coast."
      placesSection={<CoastalPlacesSection />}
    />
  );
}
