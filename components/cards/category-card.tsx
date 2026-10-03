import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface CategoryCardProps {
  name: string;
  description: string;
  imageUrl: string;
  href: string;
}

export function CategoryCard({ name, description, imageUrl, href }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-card shadow-card transition-shadow duration-300 hover:shadow-card-hover"
    >
      <Image
        src={imageUrl}
        alt={name}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/35 to-transparent" />
      <div className="relative p-5">
        <h3 className="text-h3 text-white">{name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-beige/85">{description}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-gold transition-colors duration-200 group-hover:text-white">
          Explore Experience
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
