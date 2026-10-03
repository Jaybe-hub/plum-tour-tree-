import { Star } from "lucide-react";
import { Card, CardBody } from "@/components/ui/card";
import type { TestimonialItem } from "@/sanity/lib/queries";

export function TestimonialCard({ testimonial }: { testimonial: TestimonialItem }) {
  return (
    <Card>
      <CardBody>
        {testimonial.rating && (
          <div className="flex gap-0.5 text-gold" aria-label={`${testimonial.rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} fill={i < testimonial.rating! ? "currentColor" : "none"} />
            ))}
          </div>
        )}
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">&quot;{testimonial.quote}&quot;</p>
        <div className="mt-4 border-t border-purple-900/10 pt-3">
          <p className="text-sm font-medium text-ink">{testimonial.customerName}</p>
          {testimonial.location && <p className="text-xs text-ink-muted">{testimonial.location}</p>}
        </div>
      </CardBody>
    </Card>
  );
}
