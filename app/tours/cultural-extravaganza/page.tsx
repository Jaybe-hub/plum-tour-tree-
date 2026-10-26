import type { Metadata } from "next";
import { CategoryTourExperience } from "@/components/sections/category-tour-experience";

export const metadata: Metadata = {
  title: "Cultural Journeys",
  description: "Cultural Journeys tours from Plum Tree Tours — heritage, art and living tradition across Nigeria."
};

export const dynamic = "force-dynamic";

export default function CulturalExtravaganzaPage() {
  return (
    <CategoryTourExperience
      backgroundImage="/images/headers/cultural-journeys.jpg"
      backgroundPosition="center 35%"
      category="Cultural Journeys"
      eyebrow="Cultural Journeys"
      heading="Stories, Heritage and Living Tradition"
      subtitle="Get closer to the history, craft and celebrations that shape Nigerian culture, told by the places that hold them."
    />
  );
}
