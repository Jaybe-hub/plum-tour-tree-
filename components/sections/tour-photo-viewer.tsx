"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface TourPhoto {
  /** Small image used in the grid. */
  thumb: string;
  /** Large image used in the expanded view. */
  full: string;
  alt: string;
}

/** Clickable photo grid for a tour. Clicking a photo opens it large, with next/previous. */
export function TourPhotoViewer({ photos }: { photos: TourPhoto[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );
  const showNext = useCallback(
    () => setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activeIndex, close, showPrev, showNext]);

  if (photos.length === 0) return null;
  const active = activeIndex !== null ? photos[activeIndex] : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((photo, index) => (
          <button
            key={`${photo.thumb}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`View photo ${index + 1} of ${photos.length} full size`}
            className="relative aspect-square cursor-zoom-in overflow-hidden rounded-control focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Image
              src={photo.thumb}
              alt={photo.alt}
              fill
              sizes="(min-width: 640px) 200px, 50vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-purple-900/95 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <X size={22} />
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:left-6"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:right-6"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          <div className="relative h-[80vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image src={active.full} alt={active.alt} fill sizes="90vw" className="object-contain" />
            <p className="absolute bottom-[-2.25rem] left-0 right-0 text-center text-sm text-beige/85">
              {(activeIndex ?? 0) + 1} / {photos.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
