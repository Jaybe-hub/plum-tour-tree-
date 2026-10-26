import type { Metadata } from "next";
import { CategoryTourExperience } from "@/components/sections/category-tour-experience";

export const metadata: Metadata = {
  title: "Wildlife & Safari",
  description: "Wildlife & Safari tours from Plum Tree Tours — reserves, forests and Nigeria's wild landscapes."
};

export const dynamic = "force-dynamic";

export default function SafariAdventurePage() {
  return (
    <CategoryTourExperience
      backgroundImage="/images/headers/wildlife-safari.jpg"
      backgroundPosition="center"
      category="Wildlife and Safari"
      eyebrow="Wildlife & Safari"
      heading="Into Nigeria's Wild Places"
      subtitle="Venture beyond the cities into the reserves, forests and open landscapes where Nigeria's wildlife still roams free."
    />
  );
}
