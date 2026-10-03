import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { BlogCard } from "@/components/cards/blog-card";
import { sanityFetch } from "@/sanity/lib/live";
import { postsListQuery, type PostListItem } from "@/sanity/lib/queries";
import { isSanityConfigured } from "@/sanity/env";

export const metadata: Metadata = {
  title: "Blog",
  description: "Useful information, guides and inspiration for discovering destinations and memorable tour experiences with Plum Tree Tours."
};

export const dynamic = "force-dynamic";

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

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Destination guides and tour inspiration"
        subtitle="Useful information and inspiration for discovering destinations and memorable tour experiences."
      />
      <section className="container py-16">
        {!isSanityConfigured ? (
          <div className="mx-auto max-w-md rounded-card border border-purple-900/10 bg-beige p-8 text-center">
            <p className="text-sm font-medium text-ink">Sanity isn&apos;t connected yet</p>
            <p className="mt-2 text-sm text-ink-secondary">
              Add your Sanity project credentials to <code className="text-xs">.env.local</code> to start publishing posts here.
            </p>
          </div>
        ) : posts.length === 0 ? (
          <div className="mx-auto max-w-md rounded-card border border-purple-900/10 bg-beige p-8 text-center">
            <p className="text-sm font-medium text-ink">No blog posts yet</p>
            <p className="mt-2 text-sm text-ink-secondary">
              Write and publish a post in Sanity Studio and it will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
