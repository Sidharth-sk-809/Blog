"use client";

import { ArrowRight, Clock3, Search } from "lucide-react";
import Link from "next/link";
import { startTransition, useDeferredValue, useState } from "react";
import type { PostSummary } from "@/lib/posts";
import { cn } from "@/lib/utils";

const navItems = ["Homepage", "About us", "Features", "Blog", "Contact us"];

const cardGradients = [
  "from-slate-950 via-slate-700 to-slate-500",
  "from-stone-950 via-stone-700 to-stone-500",
  "from-cyan-950 via-slate-700 to-sky-500",
  "from-amber-950 via-stone-700 to-amber-500",
  "from-zinc-950 via-zinc-700 to-zinc-500",
  "from-emerald-950 via-slate-700 to-emerald-500",
];

function toneFor(index: number) {
  return cardGradients[index % cardGradients.length];
}

function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-10 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white shadow-sm">
        UI
      </div>
      <div>
        <p className="text-sm font-semibold leading-5 text-slate-950">Beyond UI</p>
        <p className="text-xs leading-4 text-slate-500">Editorial insights for digital teams</p>
      </div>
    </div>
  );
}

function FeaturedHero({ post }: { post: PostSummary }) {
  return (
    <article className="relative min-h-[370px] overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 text-white shadow-[0_24px_55px_rgba(15,23,42,0.18)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.18),transparent_22%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.12),transparent_18%),linear-gradient(135deg,rgba(15,23,42,0.28),rgba(15,23,42,0.85)),linear-gradient(110deg,#d2d5db_0%,#a8b0ba_38%,#6d7683_62%,#3a414d_100%)]"
      />
      <div aria-hidden="true" className="absolute inset-y-0 right-0 w-[38%] bg-black/10" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,transparent_58%,rgba(15,23,42,0.26)_100%)]" />
      <div className="absolute inset-0 opacity-50">
        <div className="absolute left-8 top-8 h-24 w-24 rounded-full border border-white/15" />
        <div className="absolute bottom-6 right-10 h-28 w-28 rounded-full bg-white/8 blur-3xl" />
        <div className="absolute right-[18%] top-10 h-32 w-32 rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-[2px]" />
      </div>
      <div className="relative flex h-full min-h-[370px] flex-col justify-end p-6 md:p-8">
        <div className="mb-4 inline-flex w-fit rounded-full bg-white/12 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
          {post.category}
        </div>
        <h2 className="max-w-xl text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-white md:text-5xl">
          {post.title}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/74 md:text-base md:leading-8">
          {post.excerpt}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-white/80">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
            <Clock3 className="size-4" />
            {post.readTime}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
            {post.author.name}
          </span>
          <Link
            href={`/posts/${post.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-semibold text-slate-950 shadow-sm hover:-translate-y-0.5"
          >
            Read story
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function FeaturedList({ posts }: { posts: PostSummary[] }) {
  return (
    <aside className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-medium tracking-[-0.03em] text-slate-950">Other featured posts</h2>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {posts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="group flex items-center gap-3 rounded-[18px] px-1 py-1.5 transition hover:bg-slate-50"
          >
            <div
              aria-hidden="true"
              className={cn(
                "relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br",
                toneFor(index),
              )}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.45),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_60%)]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm leading-5 text-slate-950 transition group-hover:text-slate-700">
                {post.title}
              </p>
              <p className="mt-1 text-xs text-slate-500">{post.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}

function RecentPostCard({ post, index }: { post: PostSummary; index: number }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(15,23,42,0.09)]">
      <div className={cn("relative aspect-[1.36] overflow-hidden bg-gradient-to-br", toneFor(index))}>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.45),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.18),transparent_22%),linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.44))]"
        />
        <div className="absolute inset-x-4 top-4 flex items-center justify-between text-[0.72rem] font-medium uppercase tracking-[0.18em] text-white/90">
          <span>{post.category}</span>
          <span className="rounded-full bg-white/14 px-2.5 py-1 text-white/85 backdrop-blur-sm">{post.readTime}</span>
        </div>
        <div className="absolute bottom-4 left-4 h-20 w-20 rounded-[22px] border border-white/16 bg-white/12 backdrop-blur-sm" />
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="text-[1.15rem] font-medium leading-[1.18] tracking-[-0.03em] text-slate-950 md:text-[1.35rem]">
          {post.title}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">{post.excerpt}</p>
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-200 pt-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-950">{post.author.name}</p>
            <p className="text-xs text-slate-500">{post.author.role}</p>
          </div>
          <Link
            href={`/posts/${post.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-100"
            aria-label={`Read ${post.title}`}
          >
            Read more
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
  const data = initialPosts;

  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const filteredPosts = normalizedQuery
    ? data.filter((post) => {
        const haystack = `${post.title} ${post.excerpt} ${post.category} ${post.author.name}`.toLowerCase();
        return haystack.includes(normalizedQuery);
      })
    : data;

  const featuredPost = filteredPosts[0];
  const featuredSidebarPosts = filteredPosts.slice(1, 6);
  const recentPosts = filteredPosts;

  function resetQuery() {
    startTransition(() => {
      setQuery("");
    });
  }

  return (
    <main id="content" className="editorial-shell min-h-screen px-3 py-3 text-slate-950 md:px-5 md:py-5">
      <div className="mx-auto w-full max-w-[1380px] rounded-[30px] border border-slate-200 bg-[#fbfcfe] shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
        <div className="px-4 pb-5 pt-4 md:px-6 md:pb-6 md:pt-5">
          <header className="rounded-[26px] border border-slate-200 bg-white px-5 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] md:px-6 md:py-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <BrandMark />
              <nav aria-label="Primary" className="hidden gap-8 text-sm text-slate-500 lg:flex lg:items-center">
                {navItems.map((item, index) => (
                  <a
                    key={item}
                    href="#"
                    className={cn(
                      "transition hover:text-slate-950",
                      index === 0 ? "font-medium text-slate-950" : "",
                    )}
                  >
                    {item}
                  </a>
                ))}
              </nav>
              <Link
                href="/write"
                className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 sm:inline-flex"
              >
                Demo
              </Link>
            </div>
            <div className="mt-4 flex items-center justify-start">
              <Link
                href="/write"
                className="inline-flex rounded-full bg-slate-950 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Get Started
              </Link>
            </div>
          </header>

          <section className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_360px] lg:items-start">
            {featuredPost ? (
              <FeaturedHero post={featuredPost} />
            ) : (
              <div className="flex min-h-[370px] items-center justify-center rounded-[28px] border border-slate-200 bg-white text-slate-500">
                No stories matched your search.
              </div>
            )}
            <FeaturedList posts={featuredSidebarPosts} />
          </section>

          <section id="archive" className="mt-12">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-medium tracking-[-0.04em] text-slate-950">Recent Posts</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Showing {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
                  {normalizedQuery ? ` for “${deferredQuery}”` : ""}.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <label className="relative block w-full sm:w-[260px]">
                  <span className="sr-only">Search posts</span>
                  <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    value={query}
                    onChange={(event) => {
                      const nextQuery = event.target.value;
                      startTransition(() => {
                        setQuery(nextQuery);
                      });
                    }}
                    placeholder="Search posts"
                    className="w-full rounded-full border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-950 outline-none placeholder:text-slate-400"
                  />
                </label>
                <button
                  type="button"
                  onClick={resetQuery}
                  className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  All Posts
                </button>
              </div>
            </div>

            {recentPosts.length ? (
              <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {recentPosts.map((post, index) => (
                  <RecentPostCard key={post.slug} post={post} index={index} />
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-[24px] border border-slate-200 bg-white p-10 text-center text-slate-500">
                No posts matched your search.
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
