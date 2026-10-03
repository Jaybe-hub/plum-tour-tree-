interface PageHeaderProps { eyebrow: string; title: string; subtitle?: string; }

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <section className="bg-purple-900 py-16">
      <div className="container text-center">
        <p className="text-eyebrow uppercase text-gold">{eyebrow}</p>
        <h1 className="mt-3 text-h1 text-white">{title}</h1>
        {subtitle && <p className="mx-auto mt-3 max-w-xl text-sm text-beige/85">{subtitle}</p>}
      </div>
    </section>
  );
}
