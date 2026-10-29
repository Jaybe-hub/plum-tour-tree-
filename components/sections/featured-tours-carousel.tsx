"use client";

import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import type { TourListItem } from "@/sanity/lib/queries";

const AUTOPLAY_MS = 6500;

function formatPrice(price: number | null, currency: string | null) {
  if (price === null || price === undefined) return null;
  const symbol = currency === "USD" ? "$" : currency === "GBP" ? "£" : currency === "EUR" ? "€" : "₦";
  return `${symbol}${price.toLocaleString()}`;
}

export function FeaturedToursCarousel({ tours }: { tours: TourListItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % tours.length) + tours.length) % tours.length);
    },
    [tours.length]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (tours.length <= 1 || isPaused || prefersReducedMotion.current) return;
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % tours.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [tours.length, isPaused]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    }
  };

  if (tours.length === 0) return null;

  const tour = tours[activeIndex];
  const price = formatPrice(tour.price, tour.currency);

  return (
    <div
      ref={trackRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured tours"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className="relative mt-8 rounded-card outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
    >
      <div className="grid overflow-hidden rounded-card shadow-card sm:grid-cols-2">
        <div className="relative aspect-[4/3] bg-beige sm:aspect-auto">
          {tour.tourImage?.asset ? (
            <Image
              key={tour._id}
              src={urlFor(tour.tourImage).width(700).height(560).url()}
              alt={tour.name ?? "Featured tour"}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover transition-opacity duration-500"
              priority={activeIndex === 0}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-ink-muted">No image yet</div>
          )}
        </div>
        <div className="flex flex-col justify-center bg-white p-6 sm:p-8">
          {tour.destination && <p className="text-eyebrow uppercase text-ink-muted">{tour.destination}</p>}
          <h3 className="mt-2 text-h3 text-ink">{tour.name}</h3>
          {tour.shortDescription && (
            <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{tour.shortDescription}</p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-ink-secondary">
            {tour.duration && <span>{tour.duration} {tour.duration === 1 ? "day" : "days"}</span>}
            {price && <span className="font-medium text-purple-700">{price}</span>}
          </div>
          <Link
            href={`/tours/${tour.slug || tour._id}`}
            className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-control bg-purple-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-purple-700"
          >
            View Details
          </Link>
        </div>
      </div>

      {tours.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous tour"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-purple-900 shadow-card transition-colors hover:bg-gold hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next tour"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-purple-900 shadow-card transition-colors hover:bg-gold hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <ChevronRight size={20} />
          </button>

          <div className="mt-4 flex items-center justify-center gap-2">
            {tours.map((t, index) => (
              <button
                key={t._id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Go to tour ${index + 1}`}
                aria-current={index === activeIndex}
                className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  index === activeIndex ? "w-6 bg-purple-900" : "w-2 bg-purple-900/20 hover:bg-purple-900/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
