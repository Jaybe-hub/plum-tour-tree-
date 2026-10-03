import type { LucideIcon } from "lucide-react";
import { Card, CardBody } from "@/components/ui/card";

export interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export function ServiceCard({ icon: Icon, title, description, index }: ServiceCardProps) {
  const isAccent = index % 2 === 1;

  return (
    <Card className="group relative h-full transition-transform duration-300 hover:-translate-y-1">
      <CardBody className="flex h-full flex-col p-6">
        <span className="absolute right-5 top-5 text-eyebrow text-purple-900/10 transition-colors duration-300 group-hover:text-gold/50">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-control ${
            isAccent ? "bg-gold/15 text-gold-hover" : "bg-purple-900/10 text-purple-700"
          }`}
        >
          <Icon size={22} />
        </div>
        <h3 className="mt-5 text-h3 text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{description}</p>
      </CardBody>
    </Card>
  );
}
