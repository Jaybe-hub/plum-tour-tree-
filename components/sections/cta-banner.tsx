import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CtaBannerProps { title: string; subtitle: string; ctaLabel: string; ctaHref: string; }

export function CtaBanner({ title, subtitle, ctaLabel, ctaHref }: CtaBannerProps) {
  return (
    <section className="bg-purple-700">
      <div className="container flex flex-col items-center gap-5 py-16 text-center">
        <h2 className="text-h2 text-white">{title}</h2>
        <p className="max-w-md text-sm text-beige/85">{subtitle}</p>
        <Button asChild size="lg"><Link href={ctaHref}>{ctaLabel}</Link></Button>
      </div>
    </section>
  );
}
