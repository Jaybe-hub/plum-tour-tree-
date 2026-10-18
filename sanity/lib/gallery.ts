import type { Image } from "sanity";
import { sanityFetch } from "./live";
import { allSitePhotosQuery, type GalleryImageItem } from "./queries";
import { isSanityConfigured } from "../env";

interface AllPhotosResult {
  gallery: GalleryImageItem[] | null;
  tours: { _id: string; name: string | null; tourImage: Image | null; gallery: Image[] | null }[] | null;
  destinations: { _id: string; name: string | null; image: Image | null; gallery: Image[] | null }[] | null;
}

function assetKey(image: Image | null | undefined): string | null {
  const ref = (image as { asset?: { _ref?: string } } | null | undefined)?.asset?._ref;
  return ref ?? null;
}

/**
 * Returns every published photo on the site for the Gallery: the Gallery Images first,
 * then each tour's and destination's photos. The same picture is only listed once.
 */
export async function getAllSiteGalleryImages(): Promise<GalleryImageItem[]> {
  if (!isSanityConfigured) return [];
  try {
    const { data } = await sanityFetch({ query: allSitePhotosQuery });
    const result = data as AllPhotosResult;
    const seen = new Set<string>();
    const items: GalleryImageItem[] = [];

    const add = (id: string, image: Image | null | undefined, caption: string | null, category: string | null) => {
      const key = assetKey(image);
      if (!key || seen.has(key)) return;
      seen.add(key);
      items.push({ _id: id, image: image as Image, caption, category });
    };

    (result.gallery ?? []).forEach((g) => add(g._id, g.image, g.caption, g.category));

    (result.tours ?? []).forEach((t) => {
      const name = t.name ?? "Tour";
      add(`${t._id}-main`, t.tourImage, `${name}`, name);
      (t.gallery ?? []).forEach((img, i) => add(`${t._id}-g${i}`, img, `${name} photo ${i + 1}`, name));
    });

    (result.destinations ?? []).forEach((d) => {
      const name = d.name ?? "Destination";
      add(`${d._id}-main`, d.image, `${name}`, name);
      (d.gallery ?? []).forEach((img, i) => add(`${d._id}-g${i}`, img, `${name} photo ${i + 1}`, name));
    });

    return items;
  } catch (error) {
    console.error("Failed to fetch site photos from Sanity:", error);
    return [];
  }
}
