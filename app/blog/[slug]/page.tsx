import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { postBySlugQuery, type PostDetail } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const dynamic = "force-dynamic";

async function getPost(slug: string): Promise<PostDetail | null> {
  try {
    const { data } = await sanityFetch({ query: postBySlugQuery, params: { slug } });
    return (data as PostDetail) ?? null;
  } catch (error) {
    console.error("Failed to fetch blog post from Sanity:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title ?? "Blog post", description: post.excerpt ?? undefined };
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-sm leading-relaxed text-ink-secondary last:mb-0">{children}</p>
    ),
    h2: ({ children }) => <h2 className="mb-3 mt-8 text-h3 text-ink first:mt-0">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-2 mt-6 text-sm font-medium text-ink">{children}</h3>
  }
};

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(post.publishedAt))
    : null;

  return (
    <>
      <section className="relative overflow-hidden bg-purple-900">
        {post.coverImage && (
          <Image
            src={urlFor(post.coverImage).width(1600).height(900).url()}
            alt={post.title ?? "Blog post cover image"}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
        )}
        <div className="relative container flex min-h-[340px] flex-col items-center justify-center py-20 text-center">
          {post.category && <p className="text-eyebrow uppercase text-gold">{post.category}</p>}
          <h1 className="mt-3 max-w-2xl text-h1 text-white">{post.title}</h1>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm text-beige/85">
            {post.author && <span>{post.author}</span>}
            {post.author && formattedDate && <span aria-hidden="true">·</span>}
            {formattedDate && <span>{formattedDate}</span>}
          </div>
        </div>
      </section>

      <section className="container max-w-2xl py-16">
        {post.body && post.body.length > 0 ? (
          <PortableText value={post.body as never} components={portableTextComponents} />
        ) : (
          <p className="text-sm text-ink-secondary">This post doesn&apos;t have any content yet.</p>
        )}
      </section>
    </>
  );
}
