import type { Metadata } from "next";
import { MessageCircle, Instagram, Facebook, Mail } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Plum Tree Tours on WhatsApp, Instagram, X or Facebook."
};

const WHATSAPP_URL =
  "https://wa.me/2349024866059?text=" +
  encodeURIComponent("Hello Plum Tree Tours, I'd like to make an enquiry about your tours.");

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} fill="currentColor" {...props}>
      <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7.1l-5.6-6.9L4.2 22H1l8.2-9.4L1 2h7.3l5 6.4L18.9 2Zm-1.2 18h1.9L7.4 4h-2l12.3 16Z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/plumtreetours01/", icon: Instagram },
  { label: "X", href: "https://x.com/Plumtreetours01", icon: XIcon },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61593185916103", icon: Facebook }
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        subtitle="The fastest way to reach us is WhatsApp — we're happy to answer questions about any tour."
      />

      <section className="container py-16">
        <div className="mx-auto max-w-md rounded-card border border-purple-900/10 bg-beige p-8 text-center">
          <MessageCircle className="mx-auto text-purple-700" size={32} />
          <h2 className="mt-4 text-h3 text-ink">Chat with us on WhatsApp</h2>
          <p className="mt-2 text-sm text-ink-secondary">
            Send us a message and we&apos;ll respond as soon as we can.
          </p>
          <Button asChild size="lg" className="mt-6">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              Message us on WhatsApp
            </a>
          </Button>
        </div>

        <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-2 text-sm text-ink-secondary">
          <Mail size={16} className="shrink-0 text-purple-700" />
          <a href="mailto:plumtreetours01@gmail.com" className="hover:text-purple-700">
            plumtreetours01@gmail.com
          </a>
        </div>

        <div className="mx-auto mt-12 max-w-md text-center">
          <p className="text-sm font-medium text-ink">Follow us</p>
          <div className="mt-4 flex justify-center gap-5">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-purple-900/10 text-purple-700 transition-colors hover:bg-purple-700 hover:text-white"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
