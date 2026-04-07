"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Clock3, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { startTransition, useDeferredValue, useState } from "react";
import type { PostSummary } from "@/lib/posts";
import { cn } from "@/lib/utils";

async function fetchPosts() {
  const response = await fetch("/api/posts", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Unable to load posts");
  }

  return (await response.json()) as PostSummary[];
}

function PostCard({ post, featured = false }: { post: PostSummary; featured?: boolean }) {
  return (
    <article
      className={cn(
        "glass-card group rounded-[2rem] p-6 md:p-7",
        featured ? "relative overflow-hidden" : "h-full",
      )}
    >
      {featured ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,193,108,0.4),transparent_28%),linear-gradient(135deg,rgba(189,93,56,0.08),transparent_55%)]"
        />
      ) : null}
      <div className="relative flex h-full flex-col gap-5">
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
          <span className="rounded-full border border-line-strong bg-white/70 px-3 py-1 font-semibold tracking-[0.18em] uppercase">
            {post.category}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="size-4" />
            {post.readTime}
          </span>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold tracking-[0.32em] uppercase text-accent">
            {post.publishedAt}
          </p>
          <h2
            className={cn(
              "display-text text-balance text-3xl leading-tight text-foreground",
              featured ? "max-w-2xl text-4xl md:text-6xl" : "text-3xl",
            )}
          >
            {post.title}
          </h2>
          <p className="max-w-2xl text-base leading-8 text-muted md:text-lg">{post.excerpt}</p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-line pt-5">
          <div>
            <p className="font-semibold">{post.author.name}</p>
            <p className="text-sm text-muted">{post.author.role}</p>
          </div>
          <Link
            href={`/posts/${post.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-[#20160f] px-5 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-accent-strong"
            aria-label={`Read ${post.title}`}
          >
            Read story
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function BlogShowcase({ posts: initialPosts }: { posts: PostSummary[] }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const { data = initialPosts } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialData: initialPosts,
  });

  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const filteredPosts = normalizedQuery
    ? data.filter((post) => {
        const haystack = `${post.title} ${post.excerpt} ${post.category} ${post.author.name}`.toLowerCase();
        return haystack.includes(normalizedQuery);
      })
    : data;

  const featuredPost = filteredPosts[0];
  const secondaryPosts = filteredPosts.slice(1);

  return (
    <main
      id="content"
      className="editorial-shell min-h-screen px-4 py-6 text-foreground md:px-8 md:py-8"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <section className="hero-fade glass-card overflow-hidden rounded-[2rem] px-6 py-8 md:px-10 md:py-10">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_0.8fr] lg:items-end">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/70 px-4 py-2 text-sm font-semibold tracking-[0.2em] uppercase text-accent">
                <Sparkles className="size-4" />
                Editorial Notes
              </div>
              <div className="space-y-5">
                <p className="text-sm font-semibold tracking-[0.38em] uppercase text-muted">
                  Thoughtful reads for digital teams
                </p>
                <h1 className="display-text max-w-4xl text-balance text-5xl leading-none md:text-7xl">
                  A warm, tactile blog crafted for modern storytelling.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-muted md:text-lg">
                  Horizon Journal pairs long-form writing with a magazine-inspired interface so readers can
                  move from discovery to deep reading without friction.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/write"
                    className="inline-flex items-center gap-2 rounded-full bg-[#20160f] px-5 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-accent-strong"
                  >
                    Write a story
                    <ArrowRight className="size-4" />
                  </Link>
                  <a
                    href="#archive"
                    className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/70 px-5 py-3 text-sm font-semibold text-foreground hover:-translate-y-0.5"
                  >
                    Browse archive
                  </a>
                </div>
              </div>
            </div>
            <div className="stagger-1 grid gap-4 rounded-[1.75rem] border border-line bg-white/65 p-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-[1.5rem] bg-[#20160f] p-4 text-white">
                  <p className="text-sm uppercase tracking-[0.2em] text-white/70">Stories</p>
                  <p className="mt-3 text-4xl font-semibold">{data.length}</p>
                </div>
                <div className="rounded-[1.5rem] bg-sage p-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-foreground/70">Topics</p>
                  <p className="mt-3 text-4xl font-semibold">5</p>
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-dashed border-line-strong bg-[#fffaf3] p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-muted">Built with</p>
                <p className="mt-2 text-lg font-semibold text-foreground">Next.js SSR, React Query, Tailwind CSS</p>
              </div>
            </div>
          </div>
        </section>

        <section className="stagger-2 glass-card rounded-[2rem] px-6 py-5 md:px-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-[0.32em] uppercase text-muted">Search the archive</p>
              <p className="mt-1 text-sm text-muted">
                Filter instantly by title, topic, excerpt, or author.
              </p>
            </div>
            <label className="relative block w-full md:max-w-md">
              <span className="sr-only">Search articles</span>
              <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  const nextQuery = event.target.value;
                  startTransition(() => {
                    setQuery(nextQuery);
                  });
                }}
                placeholder="Search by title, author, or category"
                className="w-full rounded-full border border-line-strong bg-white/85 py-3 pr-5 pl-12 text-sm outline-none placeholder:text-muted"
              />
            </label>
          </div>
          <p
            aria-live="polite"
            className="mt-4 text-sm text-muted"
          >
            Showing {filteredPosts.length} {filteredPosts.length === 1 ? "story" : "stories"}
            {normalizedQuery ? ` for “${deferredQuery}”` : ""}.
          </p>
        </section>

        {featuredPost ? (
          <section className="stagger-3">
            <PostCard
              post={featuredPost}
              featured
            />
          </section>
        ) : (
          <section className="glass-card rounded-[2rem] p-10 text-center">
            <h2 className="display-text text-3xl">No stories matched your search.</h2>
            <p className="mt-3 text-muted">Try a different keyword to uncover more articles.</p>
          </section>
        )}

        {secondaryPosts.length ? (
          <section
            id="archive"
            aria-label="Article list"
            className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {secondaryPosts.map((post, index) => (
              <div
                key={post.slug}
                className={cn(
                  index % 3 === 0 ? "md:-mt-6" : "",
                  index % 3 === 1 ? "xl:mt-10" : "",
                )}
              >
                <PostCard post={post} />
              </div>
            ))}
          </section>
        ) : null}
      </div>
    </main>
  );
}
