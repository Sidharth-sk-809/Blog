import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleStructuredData } from "@/components/structured-data";
import { getPostBySlug, getPostSummaries, getRelatedPosts } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = await getPostSummaries();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article not found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.slug, post.category);

  return (
    <main
      id="content"
      className="editorial-shell min-h-screen px-3 py-4 sm:px-4 md:px-8 md:py-8"
    >
      <ArticleStructuredData
        title={post.title}
        description={post.excerpt}
        publishedAt={post.publishedAt}
        author={post.author.name}
        slug={post.slug}
      />
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:gap-6">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-line-strong bg-white/70 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-foreground hover:-translate-y-0.5"
        >
          <ArrowLeft className="size-3 sm:size-4" />
          Back to stories
        </Link>

        <article className="glass-card overflow-hidden rounded-lg sm:rounded-xl md:rounded-[2rem]">
          <div className="border-b border-line px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted">
              <span className="rounded-full border border-line-strong bg-white/80 px-2 sm:px-3 py-1 text-xs font-semibold tracking-[0.18em] uppercase">
                {post.category}
              </span>
              <span>{post.publishedAt}</span>
              <span className="inline-flex items-center gap-1 sm:gap-1.5">
                <Clock3 className="size-3 sm:size-4" />
                {post.readTime}
              </span>
            </div>

            <div className="mt-4 sm:mt-6 md:mt-7 grid gap-6 md:gap-8 lg:grid-cols-[1.3fr_0.65fr]">
              <div>
                <p className="text-xs font-semibold tracking-[0.32em] uppercase text-accent">
                  {post.coverLabel}
                </p>
                <h1 className="display-text mt-2 sm:mt-3 md:mt-4 max-w-4xl text-balance text-3xl sm:text-4xl md:text-5xl md:text-7xl leading-none">
                  {post.title}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{post.intro}</p>
              </div>

              <aside className="rounded-[1.75rem] border border-line bg-[#fffaf3] p-6">
                <p className="text-sm font-semibold tracking-[0.28em] uppercase text-muted">Written by</p>
                <p className="mt-4 text-2xl font-semibold">{post.author.name}</p>
                <p className="mt-1 text-muted">{post.author.role}</p>
                <div className="mt-6 border-t border-line pt-5">
                  <p className="text-sm uppercase tracking-[0.2em] text-muted">Summary</p>
                  <p className="mt-3 text-base leading-7 text-foreground/80">{post.excerpt}</p>
                </div>
              </aside>
            </div>
          </div>

          <div className="grid gap-8 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-[1.15fr_0.55fr]">
            <div className="rich-text">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets ? (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            <aside className="space-y-4">
              <div className="rounded-[1.75rem] border border-line bg-white/70 p-6">
                <p className="text-sm font-semibold tracking-[0.28em] uppercase text-muted">Why it matters</p>
                <p className="mt-4 leading-8 text-foreground/80">
                  Strong editorial interfaces turn reading into a product experience. The better the handoff from
                  discovery to depth, the easier it is for a story to keep its momentum.
                </p>
              </div>

              {relatedPosts.length ? (
                <div className="rounded-[1.75rem] border border-line bg-white/70 p-6">
                  <p className="text-sm font-semibold tracking-[0.28em] uppercase text-muted">Keep reading</p>
                  <div className="mt-5 space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.slug}
                        href={`/posts/${relatedPost.slug}`}
                        className="block rounded-[1.25rem] border border-line bg-[#fffaf3] p-4 hover:border-line-strong hover:bg-white"
                      >
                        <p className="text-xs font-semibold tracking-[0.22em] uppercase text-accent">
                          {relatedPost.category}
                        </p>
                        <p className="mt-2 text-lg font-semibold leading-7">{relatedPost.title}</p>
                        <p className="mt-2 text-sm leading-6 text-muted">{relatedPost.excerpt}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>
          </div>
        </article>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#20160f] px-5 py-3 text-sm font-semibold text-white hover:bg-accent-strong"
          >
            Explore more articles
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
