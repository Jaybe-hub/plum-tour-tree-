import { ImageIcon } from "lucide-react";

export interface PlaceCardProps {
  name: string;
  description: string;
}

export function PlaceCard({ name, description }: PlaceCardProps) {
  return (
    <div className="group overflow-hidden rounded-card border border-purple-900/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 border-b border-dashed border-purple-900/20 bg-beige-dark px-4 text-center transition-colors duration-300 group-hover:bg-beige">
        <ImageIcon size={22} className="text-purple-300" />
        <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">Replace with photo of {name}</span>
      </div>
      <div className="p-5">
        <h3 className="text-h3 text-ink">{name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{description}</p>
      </div>
    </div>
  );
}
