import type { Metadata } from "next";
import { PlaceCard } from "@/components/cards/place-card";
import { CategoryTourExperience } from "@/components/sections/category-tour-experience";

export const metadata: Metadata = {
  title: "Wildlife & Safari",
  description: "Wildlife & Safari tours from Plum Tree Tours — reserves, forests and Nigeria's wild landscapes."
};

export const dynamic = "force-dynamic";

const SAFARI_PLACES = [
  {
    name: "Yankari National Park, Bauchi",
    description: "Nigeria's most renowned game reserve, home to elephants, baboons and the Wikki Warm Spring."
  },
  {
    name: "Cross River National Park, Cross River",
    description: "A rainforest reserve known for its biodiversity, primates and dense tropical canopy."
  },
  {
    name: "Kainji National Park, Niger / Kwara",
    description: "One of Nigeria's oldest national parks, home to savannah wildlife including lions and hippos."
  },
  {
    name: "Obudu Mountain Resort, Cross River",
    description: "A cool highland retreat with panoramic views, a cable car ride and sweeping mountain scenery."
  },
  {
    name: "Gashaka Gumti National Park, Taraba",
    description: "Nigeria's largest national park, known for rugged terrain and its chimpanzee population."
  }
];

function SafariPlacesSection() {
  return (
    <section className="bg-beige py-16">
      <div className="container">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-eyebrow uppercase text-ink-muted">Wildlife destinations</p>
          <h2 className="mt-3 text-h2 text-ink">Places You&apos;ll Visit</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
            Venture into Nigeria's reserves and wild landscapes, home to its most remarkable wildlife and scenery.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SAFARI_PLACES.map((place) => (
            <PlaceCard key={place.name} {...place} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function SafariAdventurePage() {
  return (
    <CategoryTourExperience
      category="Wildlife and Safari"
      eyebrow="Wildlife & Safari"
      heading="Into Nigeria's Wild Places"
      subtitle="Venture beyond the cities into the reserves, forests and open landscapes where Nigeria's wildlife still roams free."
      placesSection={<SafariPlacesSection />}
    />
  );
}
