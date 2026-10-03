import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, MessageCircle, Mail } from "lucide-react";

const EXPLORE = [
  { label: "Tours", href: "/tours" },
  { label: "Destinations", href: "/destinations" },
  { label: "Gallery", href: "/gallery" }
];

const COMPANY = [
  { label: "About us", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "FAQs", href: "/faqs" }
];

const LEGAL = [
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms and conditions", href: "/terms-and-conditions" }
];

const WHATSAPP_URL = "https://wa.me/2349024866059?text=" + encodeURIComponent("Hello Plum Tree Tours, I'd like to make an enquiry about your tours.");

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" {...props}>
      <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7.1l-5.6-6.9L4.2 22H1l8.2-9.4L1 2h7.3l5 6.4L18.9 2Zm-1.2 18h1.9L7.4 4h-2l12.3 16Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-purple-900 text-beige/80">
      <div className="container grid grid-cols-2 gap-10 py-14 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <Image src="/images/logo.jpg" alt="Plum Tree Tours" width={44} height={44} className="h-11 w-11 rounded-full bg-white object-contain p-1" />
          <p className="mt-3 text-sm italic text-beige/70">Your gateway to memorable journeys</p>
          <div className="mt-5 flex gap-4">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-gold"><MessageCircle size={18} /></a>
            <a href="https://www.instagram.com/plumtreetours01/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gold"><Instagram size={18} /></a>
            <a href="https://x.com/Plumtreetours01" target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:text-gold"><XIcon /></a>
            <a href="https://www.facebook.com/profile.php?id=61593185916103" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-gold"><Facebook size={18} /></a>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-white">Explore</p>
          <ul className="space-y-2">
            {EXPLORE.map((l) => (
              <li key={l.href}><Link href={l.href} className="text-sm hover:text-gold">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-white">Company</p>
          <ul className="space-y-2">
            {COMPANY.map((l) => (
              <li key={l.href}><Link href={l.href} className="text-sm hover:text-gold">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-white">Get in touch</p>
          <div className="flex flex-col gap-2">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm hover:text-gold">
              <MessageCircle size={16} /> Chat with us on WhatsApp
            </a>
            <a href="mailto:plumtreetours01@gmail.com" className="inline-flex items-center gap-2 text-sm hover:text-gold">
              <Mail size={16} /> plumtreetours01@gmail.com
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-5 text-xs text-beige/60 md:flex-row">
          <p>© {new Date().getFullYear()} Plum Tree Tours. All rights reserved.</p>
          <div className="flex gap-5">
            {LEGAL.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-gold">{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
