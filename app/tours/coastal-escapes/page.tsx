import type { Metadata } from "next";
import { CategoryTourExperience } from "@/components/sections/category-tour-experience";

export const metadata: Metadata = {
  title: "Coastal Getaways",
  description: "Coastal Getaways tours from Plum Tree Tours — beaches, waterfronts and slow days by Nigeria's coast."
};

export const dynamic = "force-dynamic";

export default function CoastalEscapesPage() {
  return (
    <CategoryTourExperience
      backgroundImage="/images/headers/coastal-getaways.jpg"
      backgroundPosition="center"
      category="Coastal Getaways"
      eyebrow="Coastal Getaways"
      heading="Sun, Shoreline and Slow Days by the Water"
      subtitle="Trade the noise of the city for open water, golden sand and the easy rhythm of Nigeria's coast."
    />
  );
}
