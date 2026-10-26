import type { Metadata } from "next";
import { NightlifeVenues } from "@/components/sections/nightlife-venues";
import { CategoryTourExperience } from "@/components/sections/category-tour-experience";

export const metadata: Metadata = {
  title: "Nightlife",
  description: "Nightlife tours from Plum Tree Tours — Nigeria's liveliest after-dark spots and entertainment districts."
};

export const dynamic = "force-dynamic";

export default function NightlifePage() {
  return (
    <CategoryTourExperience
      backgroundImage="/images/headers/nightlife.jpg"
      backgroundPosition="center"
      category="Nightlife"
      eyebrow="Nightlife"
      heading="Nigeria After Dark"
      subtitle="From Lagos's lounges and waterfront strips to Calabar's carnival streets, discover Nigeria's liveliest after-dark experiences."
      placesSection={<NightlifeVenues />}
    />
  );
}
