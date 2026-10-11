import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { PostListItem } from "@/sanity/lib/queries";

export function BlogCard({ post }: { post: PostListItem }) {
  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(post.publishedAt))
    : null;

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-beige">
        {post.coverImage?.asset ? (
          <Image
            src={urlFor(post.coverImage).width(600).height(450).url()}
            alt={post.title ?? "Blog post"}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-ink-muted">No image yet</div>
        )}
      </div>
      {post.category && <p className="mt-4 text-eyebrow uppercase text-gold">{post.category}</p>}
      <h3 className="mt-1.5 text-h3 text-ink group-hover:text-purple-700">{post.title}</h3>
      {post.excerpt && <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">{post.excerpt}</p>}
      {formattedDate && <p className="mt-2 text-xs text-ink-muted">{formattedDate}</p>}
    </Link>
  );
}
