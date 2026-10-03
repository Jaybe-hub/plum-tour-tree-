import type { Metadata } from "next";
import { PlaceCard } from "@/components/cards/place-card";
import { CategoryTourExperience } from "@/components/sections/category-tour-experience";

export const metadata: Metadata = {
  title: "City Adventures",
  description: "City Adventures tours from Plum Tree Tours — vibrant streets, skylines and city life across Nigeria."
};

export const dynamic = "force-dynamic";

const LAGOS_PLACES = [
  {
    name: "John Randle Centre",
    description: "A cultural landmark bringing Lagos history and heritage to life through exhibitions and design."
  },
  {
    name: "Freedom Park",
    description: "A green, open-air landmark blending history with live events, food and relaxed city energy."
  },
  {
    name: "National Theatre",
    description: "One of Lagos's most iconic buildings, a symbol of Nigerian arts, culture and performance."
  },
  {
    name: "Lekki Conservation Centre",
    description: "A canopy walkway and nature reserve offering a green escape within the city."
  },
  {
    name: "Nike Art Gallery",
    description: "A multi-floor gallery showcasing contemporary Nigerian art, sculpture and craftsmanship."
  },
  {
    name: "Lagos Island",
    description: "The historic heart of Lagos, dense with markets, architecture and everyday city life."
  },
  {
    name: "Victoria Island",
    description: "A modern hub of skylines, waterfronts and the fast pace that defines Lagos today."
  }
];

const ABUJA_PLACES = [
  {
    name: "Aso Rock",
    description: "The dramatic rock formation that has become a defining landmark of Nigeria's capital."
  },
  {
    name: "Millennium Park",
    description: "A landscaped city park known for its open lawns, walkways and calm city-centre setting."
  },
  {
    name: "City Park",
    description: "A relaxed recreational spot in the city, popular for leisurely outings and green space."
  },
  {
    name: "National Children's Park & Zoo",
    description: "A family-friendly park combining green space with a variety of animal exhibits."
  }
];

function CityPlacesSection() {
  return (
    <section className="bg-beige py-16">
      <div className="container">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-eyebrow uppercase text-ink-muted">City destinations</p>
          <h2 className="mt-3 text-h2 text-ink">Places You&apos;ll Visit</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
            Experience Nigeria through its vibrant cities, iconic landmarks, art, culture and the energy that makes
            each destination unique.
          </p>
        </div>

        <div className="mt-12">
          <h3 className="text-h3 text-purple-900">
            Lagos
            <span className="ml-3 inline-block h-px w-12 align-middle bg-gold" />
          </h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LAGOS_PLACES.map((place) => (
              <PlaceCard key={place.name} {...place} />
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h3 className="text-h3 text-purple-900">
            Abuja
            <span className="ml-3 inline-block h-px w-12 align-middle bg-gold" />
          </h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ABUJA_PLACES.map((place) => (
              <PlaceCard key={place.name} {...place} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CityExplorersPage() {
  return (
    <CategoryTourExperience
      category="City Explorers"
      eyebrow="City Adventures"
      heading="The Pulse of Nigeria's Cities"
      subtitle="Step into fast-moving streets, iconic skylines and the everyday energy that makes Nigeria's cities unforgettable."
      placesSection={<CityPlacesSection />}
    />
  );
}
