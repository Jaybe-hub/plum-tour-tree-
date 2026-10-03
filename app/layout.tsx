import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SanityLive } from "@/sanity/lib/live";
import { isSanityConfigured } from "@/sanity/env";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Plum Tree Tours — Your Gateway to Memorable Journeys", template: "%s | Plum Tree Tours" },
  description: "Plum Tree Tours designs curated tours and destination experiences across Nigeria and beyond, with clear itineraries and easy booking enquiries."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        {isSanityConfigured && <SanityLive />}
      </body>
    </html>
  );
}
