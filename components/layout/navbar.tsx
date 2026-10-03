"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Tours", href: "/tours" },
  { label: "Destinations", href: "/destinations" },
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" }
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-white transition-shadow duration-300",
        scrolled && "shadow-card"
      )}
    >
      <nav className="container flex h-16 items-center justify-between" aria-label="Primary">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.jpg" alt="Plum Tree Tours" width={40} height={40} className="h-10 w-10 object-contain" priority />
          <span className="hidden text-sm font-medium tracking-wide text-purple-900 sm:inline">Plum Tree Tours</span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-sm text-ink-secondary transition-colors hover:text-purple-700">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button asChild size="sm">
            <Link href="/booking">Book a Tour</Link>
          </Button>
        </div>

        <button
          type="button"
          className="text-purple-900 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-purple-900/10 bg-white lg:hidden">
          <ul className="container flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setOpen(false)} className="block py-2.5 text-sm text-ink-secondary hover:text-purple-700">
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Button asChild size="sm" className="w-full">
                <Link href="/booking" onClick={() => setOpen(false)}>Book a Tour</Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
