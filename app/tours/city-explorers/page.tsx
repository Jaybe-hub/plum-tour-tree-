import type { Metadata } from "next";
import { CategoryTourExperience } from "@/components/sections/category-tour-experience";

export const metadata: Metadata = {
  title: "City Adventures",
  description: "City Adventures tours from Plum Tree Tours — vibrant streets, skylines and city life across Nigeria."
};

export const dynamic = "force-dynamic";

export default function CityExplorersPage() {
  return (
    <CategoryTourExperience
      backgroundImage="/images/headers/city-adventures.jpg"
      backgroundPosition="center"
      category="City Explorers"
      eyebrow="City Adventures"
      heading="The Pulse of Nigeria's Cities"
      subtitle="Step into fast-moving streets, iconic skylines and the everyday energy that makes Nigeria's cities unforgettable."
    />
  );
}
