import Image from "next/image";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Optional local background photo path (e.g. "/images/backgrounds/x.jpg"). When omitted, renders the original solid purple header — no visual change for pages that don't pass it. */
  backgroundImage?: string;
  /** Overlay strength — lets different sections feel visually distinct while keeping text readable. Defaults to "medium". */
  overlay?: "medium" | "strong";
  /** CSS object-position for the background photo, e.g. "center 30%". */
  imagePosition?: string;
}

export function PageHeader({ eyebrow, title, subtitle, backgroundImage, overlay = "medium", imagePosition }: PageHeaderProps) {
  const overlayClass =
    overlay === "strong"
      ? "bg-gradient-to-b from-purple-900/90 via-purple-900/80 to-purple-900/90"
      : "bg-gradient-to-b from-purple-900/85 via-purple-900/60 to-purple-900/85";

  return (
    <section className="relative overflow-hidden bg-purple-900 py-16">
      {backgroundImage && (
        <>
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={imagePosition ? { objectPosition: imagePosition } : undefined}
          />
          <div className={`absolute inset-0 ${overlayClass}`} />
        </>
      )}
      <div className="relative container text-center">
        <p className="text-eyebrow uppercase text-gold">{eyebrow}</p>
        <h1 className="mt-3 text-h1 text-white">{title}</h1>
        {subtitle && <p className="mx-auto mt-3 max-w-xl text-sm text-beige/85">{subtitle}</p>}
      </div>
    </section>
  );
}
