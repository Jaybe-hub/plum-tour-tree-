import type { Metadata } from "next";
import { PlaceCard } from "@/components/cards/place-card";
import { CategoryTourExperience } from "@/components/sections/category-tour-experience";

export const metadata: Metadata = {
  title: "Cultural Journeys",
  description: "Cultural Journeys tours from Plum Tree Tours — heritage, art and living tradition across Nigeria."
};

export const dynamic = "force-dynamic";

const CULTURAL_PLACES = [
  {
    name: "Osun-Osogbo Sacred Grove, Osogbo",
    description: "A UNESCO World Heritage sacred forest along the Osun River, rich in Yoruba tradition and shrines."
  },
  {
    name: "Kano Ancient City Walls, Kano",
    description: "Centuries-old fortifications marking one of West Africa's oldest and most historic cities."
  },
  {
    name: "Benin City National Museum, Benin City",
    description: "Home to royal artefacts and treasures from the historic Benin Kingdom."
  },
  {
    name: "Ogbunike Caves, Anambra",
    description: "A network of sacred limestone caves regarded as a spiritual and historical landmark."
  },
  {
    name: "Sungbo's Eredo, Ijebu Ode",
    description: "Ancient earthworks and moats linked to centuries of Yoruba history and legend."
  }
];

function CulturalPlacesSection() {
  return (
    <section className="bg-beige py-16">
      <div className="container">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-eyebrow uppercase text-ink-muted">Cultural destinations</p>
          <h2 className="mt-3 text-h2 text-ink">Places You&apos;ll Visit</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
            Step into the history, heritage and living traditions that continue to shape Nigerian culture today.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CULTURAL_PLACES.map((place) => (
            <PlaceCard key={place.name} {...place} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CulturalExtravaganzaPage() {
  return (
    <CategoryTourExperience
      category="Cultural Journeys"
      eyebrow="Cultural Journeys"
      heading="Stories, Heritage and Living Tradition"
      subtitle="Get closer to the history, craft and celebrations that shape Nigerian culture, told by the places that hold them."
      placesSection={<CulturalPlacesSection />}
    />
  );
}
