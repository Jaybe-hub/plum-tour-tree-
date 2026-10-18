import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Route, MessageCircle, ShieldCheck, Compass, Users, Landmark, Mountain, ClipboardList, Briefcase, Target, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBanner } from "@/components/sections/cta-banner";
import { DestinationCard } from "@/components/cards/destination-card";
import { CategoryCard } from "@/components/cards/category-card";
import { ServiceCard } from "@/components/cards/service-card";
import { BlogCard } from "@/components/cards/blog-card";
import { HeroSlider } from "@/components/sections/hero-slider";
import { FeaturedToursCarousel } from "@/components/sections/featured-tours-carousel";
import { sanityFetch } from "@/sanity/lib/live";
import {
  toursListQuery,
  destinationsListQuery,
  postsListQuery,
  type TourListItem,
  type DestinationListItem,
  type PostListItem
} from "@/sanity/lib/queries";
import { getAllSiteGalleryImages } from "@/sanity/lib/gallery";
import { urlFor } from "@/sanity/lib/image";
import { isSanityConfigured } from "@/sanity/env";

export const metadata: Metadata = {
  title: "Plum Tree Tours — Your Gateway to Memorable Journeys",
  description: "Discover curated tours and destinations with Plum Tree Tours. Browse tours, explore destinations, and book your next adventure."
};

export const dynamic = "force-dynamic";

const TOUR_EXPERIENCES = [
  {
    name: "Coastal Getaways",
    description: "Sun-soaked beaches and laid-back shoreline escapes along Nigeria's Atlantic coast.",
    imageUrl: "/images/categories/coastal-getaways.jpg",
    href: "/tours/coastal-escapes"
  },
  {
    name: "City Adventures",
    description: "Fast-paced city life, iconic skylines, and vibrant streets waiting to be explored.",
    imageUrl: "/images/categories/city-adventures.jpg",
    href: "/tours/city-explorers"
  },
  {
    name: "Cultural Journeys",
    description: "Rich traditions, heritage, and colourful celebrations at the heart of Nigerian culture.",
    imageUrl: "/images/categories/cultural-journeys.jpg",
    href: "/tours/cultural-extravaganza"
  },
  {
    name: "Wildlife & Safari",
    description: "Untamed landscapes and wildlife encounters across Nigeria's game reserves.",
    imageUrl: "/images/categories/wildlife-safari.jpg",
    href: "/tours/safari-adventure"
  },
  {
    name: "Nightlife",
    description: "Lounges, live music and after-dark energy in Nigeria's liveliest entertainment districts.",
    imageUrl: "/images/categories/nightlife.jpg",
    href: "/tours/nightlife"
  }
];

const SERVICES = [
  {
    icon: Compass,
    title: "Curated Tour Experiences",
    description: "Discover thoughtfully planned experiences across Nigeria, from cultural landmarks and vibrant cities to nature and coastal escapes."
  },
  {
    icon: Users,
    title: "Private & Group Tours",
    description: "Explore with family, friends, colleagues or your own private group with experiences designed around your way of travelling."
  },
  {
    icon: Landmark,
    title: "Cultural & Heritage Experiences",
    description: "Connect with Nigeria's history, culture, art and heritage through experiences that go beyond ordinary sightseeing."
  },
  {
    icon: Mountain,
    title: "Nature & Adventure Escapes",
    description: "Experience Nigeria's natural beauty through scenic landscapes, wildlife, mountains, waterfalls, beaches and outdoor adventures."
  },
  {
    icon: ClipboardList,
    title: "Custom Tour Planning",
    description: "Have a particular experience in mind? We can help shape a tour around your interests, schedule and preferences."
  },
  {
    icon: Briefcase,
    title: "Corporate & Special Group Tours",
    description: "Create memorable experiences for teams, organisations, celebrations and special groups."
  }
];

const WHY_CHOOSE_US = [
  { icon: Sparkles, title: "Memorable experiences", description: "Tours designed to leave a lasting impression, not just tick a box." },
  { icon: Route, title: "Carefully planned tours", description: "Clear itineraries so you know what to expect before you go." },
  { icon: MessageCircle, title: "Easy booking/enquiries", description: "Reach us directly on WhatsApp — no complicated process." },
  { icon: ShieldCheck, title: "Professional service", description: "Responsive, dependable support from enquiry to tour day." }
];

async function getTours(): Promise<TourListItem[]> {
  if (!isSanityConfigured) return [];
  try {
    const { data } = await sanityFetch({ query: toursListQuery });
    return data as TourListItem[];
  } catch (error) {
    console.error("Failed to fetch tours from Sanity:", error);
    return [];
  }
}

async function getDestinations(): Promise<DestinationListItem[]> {
  if (!isSanityConfigured) return [];
  try {
    const { data } = await sanityFetch({ query: destinationsListQuery });
    return data as DestinationListItem[];
  } catch (error) {
    console.error("Failed to fetch destinations from Sanity:", error);
    return [];
  }
}

async function getPosts(): Promise<PostListItem[]> {
  if (!isSanityConfigured) return [];
  try {
    const { data } = await sanityFetch({ query: postsListQuery });
    return data as PostListItem[];
  } catch (error) {
    console.error("Failed to fetch blog posts from Sanity:", error);
    return [];
  }
}

const HERO_SLIDES = [
  { src: "/images/hero/01-tarkwa-bay.jpg", alt: "Tarkwa Bay beach front, Lagos" },
  { src: "/images/hero/02-abeokuta.jpg", alt: "Olumo Rock, Abeokuta" },
  { src: "/images/hero/03-lekki-conservation-centre.jpg", alt: "Canopy walkway at Lekki Conservation Centre" },
  { src: "/images/hero/04-john-randle-centre.jpg", alt: "Exhibit at the John Randle Centre" },
  { src: "/images/hero/05-nike-art-gallery.jpg", alt: "Sculptures at Nike Art Gallery, Lekki" },
  { src: "/images/hero/06-vlekete-slave-market.jpg", alt: "Memorial at the Vlekete Slave Market site" }
];

export default async function Home() {
  const [tours, destinations, galleryImages, posts] = await Promise.all([
    getTours(),
    getDestinations(),
    getAllSiteGalleryImages(),
    getPosts()
  ]);
  const featuredTours = tours.filter((tour) => tour.featured).slice(0, 6);
  const carouselTours = featuredTours.length > 0 ? featuredTours : tours.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-purple-900">
        <HeroSlider slides={HERO_SLIDES} />
        <div className="relative container flex min-h-[520px] flex-col items-center justify-center py-24 text-center">
          <p className="text-eyebrow uppercase text-gold">Plum Tree Tours</p>
          <p className="mt-2 text-sm italic text-beige/80">Your gateway to memorable journeys</p>
          <h1 className="mt-5 max-w-2xl text-h1 text-white md:text-4xl">
            Discover destinations. Experience memorable tours.
          </h1>
          <p className="mt-4 max-w-md text-sm text-beige/85">
            Browse curated tours and book your next adventure with Plum Tree Tours.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/tours">Explore Tours</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="border-white text-white hover:bg-white hover:text-purple-900">
              <Link href="/booking">Book a Tour</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tour experiences / categories */}
      <section className="container py-16">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-eyebrow uppercase text-ink-muted">Tour experiences</p>
          <h2 className="mt-3 text-h2 text-ink">Choose Your Experience</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
            Discover unforgettable ways to experience Nigeria, from coastal escapes and vibrant cities to cultural treasures and unforgettable encounters with nature.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {TOUR_EXPERIENCES.map((category) => (
            <CategoryCard key={category.href} {...category} />
          ))}
        </div>
      </section>

      {/* Featured tours */}
      <section className="container py-16">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-eyebrow uppercase text-ink-muted">Featured tours</p>
            <h2 className="mt-3 text-h2 text-ink">Tours worth exploring</h2>
          </div>
          <Link href="/tours" className="text-sm font-medium text-purple-700 hover:text-gold">View all tours →</Link>
        </div>
        {carouselTours.length > 0 ? (
          <FeaturedToursCarousel tours={carouselTours} />
        ) : (
          <p className="mt-8 text-sm text-ink-secondary">
            Tours are being added soon — check back shortly, or view the{" "}
            <Link href="/tours" className="text-purple-700 hover:text-gold">Tours page</Link>.
          </p>
        )}
      </section>

      {/* What We Offer */}
      <section className="container py-16">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-eyebrow uppercase text-ink-muted">Our services</p>
          <h2 className="mt-3 text-h2 text-ink">What We Offer</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
            From carefully curated tours to unforgettable group experiences, we make discovering Nigeria simple, exciting and memorable.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
          ))}
        </div>
      </section>

      {/* Destinations */}
      <section className="bg-beige py-16">
        <div className="container">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-eyebrow uppercase text-ink-muted">Destinations</p>
              <h2 className="mt-3 text-h2 text-ink">Where to go next</h2>
            </div>
            <Link href="/destinations" className="text-sm font-medium text-purple-700 hover:text-gold">View all destinations →</Link>
          </div>
          {destinations.length > 0 ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {destinations.slice(0, 3).map((destination) => (
                <DestinationCard key={destination._id} destination={destination} />
              ))}
            </div>
          ) : (
            <p className="mt-8 text-sm text-ink-secondary">
              Destinations are being added soon — check back shortly, or view the{" "}
              <Link href="/destinations" className="text-purple-700 hover:text-gold">Destinations page</Link>.
            </p>
          )}
        </div>
      </section>

      {/* About us teaser */}
      <section className="container py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-eyebrow uppercase text-ink-muted">About us</p>
            <h2 className="mt-3 text-h2 text-ink">Your gateway to memorable journeys</h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
              Plum Tree Tours designs curated tours for families, couples, and groups exploring Nigeria and beyond — trips built around real itineraries, clear pricing and dependable on-ground coordination.
            </p>
            <Link href="/about" className="mt-5 inline-block text-sm font-medium text-purple-700 hover:text-gold">
              Learn more about us →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-card border border-purple-900/10 bg-beige p-6">
              <Target className="text-purple-700" size={20} />
              <h3 className="mt-3 text-sm font-medium text-ink">Our mission</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">
                Premium, well-organised tours accessible to Nigerian and international travellers.
              </p>
            </div>
            <div className="rounded-card border border-purple-900/10 bg-beige p-6">
              <Eye className="text-purple-700" size={20} />
              <h3 className="mt-3 text-sm font-medium text-ink">Our vision</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">
                The most trusted name in African tour experiences — reliable and genuinely memorable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery teaser */}
      <section className="bg-beige py-16">
        <div className="container">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-eyebrow uppercase text-ink-muted">Gallery</p>
              <h2 className="mt-3 text-h2 text-ink">Moments from our tours</h2>
            </div>
            <Link href="/gallery" className="text-sm font-medium text-purple-700 hover:text-gold">View full gallery →</Link>
          </div>
          {galleryImages.length > 0 ? (
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {galleryImages.slice(0, 8).map((item) =>
                item.image?.asset ? (
                  <Link
                    key={item._id}
                    href="/gallery"
                    className="relative block aspect-square overflow-hidden rounded-control"
                  >
                    <Image
                      src={urlFor(item.image).width(400).height(400).url()}
                      alt={item.caption ?? "Gallery image"}
                      fill
                      sizes="(min-width: 640px) 25vw, 50vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </Link>
                ) : null
              )}
            </div>
          ) : (
            <p className="mt-8 text-sm text-ink-secondary">
              Gallery images are being added soon — check back shortly, or view the{" "}
              <Link href="/gallery" className="text-purple-700 hover:text-gold">Gallery page</Link>.
            </p>
          )}
        </div>
      </section>

      {/* Blog teaser */}
      <section className="container py-16">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-eyebrow uppercase text-ink-muted">Blog</p>
            <h2 className="mt-3 text-h2 text-ink">Destination guides and tour inspiration</h2>
          </div>
          <Link href="/blog" className="text-sm font-medium text-purple-700 hover:text-gold">Read the blog →</Link>
        </div>
        {posts.length > 0 ? (
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-sm text-ink-secondary">
            Blog posts are being added soon — check back shortly, or view the{" "}
            <Link href="/blog" className="text-purple-700 hover:text-gold">Blog page</Link>.
          </p>
        )}
      </section>

      {/* Why choose us */}
      <section className="container py-16">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-eyebrow uppercase text-ink-muted">Why Plum Tree Tours</p>
          <h2 className="mt-3 text-h2 text-ink">Tours planned with care</h2>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE_US.map(({ icon: Icon, title, description }) => (
            <div key={title} className="text-center sm:text-left">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-purple-700/10 text-purple-700 sm:mx-0">
                <Icon size={20} />
              </div>
              <h3 className="mt-4 text-sm font-medium text-ink">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Ready for Your Next Adventure?"
        subtitle="Tell us where you'd like to go and our team will take it from there."
        ctaLabel="Book a Tour"
        ctaHref="/booking"
      />
    </>
  );
}
