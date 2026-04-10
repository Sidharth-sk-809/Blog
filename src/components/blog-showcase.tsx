"use client";

import { useQuery } from "@tanstack/react-query";
import { Clock3, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { startTransition, useDeferredValue, useState } from "react";
import type { PostSummary } from "@/lib/posts";

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

function Navbar() {
  return (
    <header className="flex flex-col gap-3 border-b border-slate-200/80 px-4 py-4 sm:gap-5 sm:px-6 sm:py-5 md:flex-row md:items-center md:justify-between md:px-10">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex size-8 sm:size-10 items-center justify-center rounded-full bg-slate-900 text-xs sm:text-sm font-bold text-white">
          UI
        </div>
        <div>
          <p className="text-base sm:text-lg font-bold tracking-tight text-slate-900">Beyond UI</p>
          <p className="text-xs sm:text-sm text-slate-500">Editorial insights for digital teams</p>
        </div>
      </div>
      <nav
        aria-label="Primary"
        className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-slate-600"
      >
        <a href="#" className="rounded-full px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-slate-100 hover:text-slate-900">Homepage</a>
        <a href="#" className="rounded-full px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-slate-100 hover:text-slate-900">About us</a>
        <a href="#featured" className="rounded-full px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-slate-100 hover:text-slate-900">Features</a>
        <a href="#recent" className="rounded-full px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-slate-100 hover:text-slate-900">Blog</a>
        <a href="/write" className="rounded-full px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-slate-100 hover:text-slate-900">Contact us</a>
        <button className="hidden sm:block rounded-full border border-slate-200 px-4 py-2 text-slate-700">Demo</button>
        <Link
          href="/write"
          className="rounded-full bg-slate-900 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white hover:bg-slate-700"
        >
          Get Started
        </Link>
      </nav>
    </header>
  );
}

function FeaturedStory({ post }: { post: PostSummary }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group relative block overflow-hidden rounded-lg sm:rounded-xl md:rounded-[24px]"
      aria-label={`Open featured post ${post.title}`}
    >
      <Image
        src={post.image}
        alt={post.title}
        width={1200}
        height={800}
        className="h-48 w-full object-cover sm:h-64 md:h-[420px]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 md:p-8">
        <span className="inline-flex rounded-full border border-white/20 bg-black/35 px-2 sm:px-3 py-1 text-xs font-semibold text-white">
          {post.category}
        </span>
        <h1 className="mt-2 sm:mt-3 max-w-xl text-balance text-xl sm:text-2xl md:text-3xl md:text-[2.6rem] font-semibold leading-tight text-white">
          {post.title}
        </h1>
        <p className="mt-2 sm:mt-3 max-w-2xl text-xs sm:text-sm md:text-base leading-6 sm:leading-7 text-white/80">{post.excerpt}</p>
      </div>
    </Link>
  );
}

function SidebarPost({ post }: { post: PostSummary }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="flex items-center gap-2 sm:gap-3 md:gap-4 rounded-lg sm:rounded-xl md:rounded-[20px] border border-transparent p-1.5 sm:p-2 hover:border-slate-200 hover:bg-slate-50"
    >
      <Image
        src={post.image}
        alt={post.title}
        width={64}
        height={64}
        className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-lg sm:rounded-xl md:rounded-[16px] object-cover flex-shrink-0"
      />
      <div className="min-w-0">
        <p className="line-clamp-2 text-xs sm:text-sm font-semibold leading-5 sm:leading-6 text-slate-900">{post.title}</p>
        <p className="mt-0.5 sm:mt-1 text-xs text-slate-500">{post.category}</p>
      </div>
    </Link>
  );
}

function RecentPostCard({ post }: { post: PostSummary }) {
  return (
    <article className="group">
      <Link href={`/posts/${post.slug}`} className="block">
        <Image
          src={post.image}
          alt={post.title}
          width={720}
          height={460}
          className="h-40 sm:h-48 md:h-56 w-full rounded-lg sm:rounded-xl md:rounded-[20px] object-cover"
        />
      </Link>
      <div className="mt-2 sm:mt-3 md:mt-4 space-y-2 sm:space-y-2.5 md:space-y-3">
        <Link href={`/posts/${post.slug}`}>
          <h2 className="text-balance text-base sm:text-lg md:text-[1.75rem] font-semibold leading-6 sm:leading-8 md:leading-10 tracking-[-0.03em] text-slate-900 group-hover:text-slate-700">
            {post.title}
          </h2>
        </Link>
        <p className="line-clamp-2 text-xs sm:text-sm leading-5 sm:leading-6 md:leading-7 text-slate-500">{post.excerpt}</p>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
          <span className="font-medium text-slate-700">{post.author.name}</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <Clock3 className="size-3 sm:size-4" />
            {post.readTime}
          </span>
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
  const sidebarPosts = filteredPosts.slice(1, 6);
  const recentPosts = filteredPosts.slice(1, 4);

  return (
    <main id="content" className="min-h-screen bg-[#d4d5db] p-2 sm:p-3 md:p-5">
      <div className="mx-auto max-w-[1240px] overflow-hidden rounded-lg sm:rounded-xl md:rounded-[28px] border border-slate-300/70 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
        <Navbar />

        <div className="space-y-6 sm:space-y-8 md:space-y-10 px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10">
          <section className="flex flex-col gap-6 xl:flex-row" id="featured">
            <div className="min-w-0 flex-1">
              {featuredPost ? (
                <FeaturedStory post={featuredPost} />
              ) : (
                <div className="flex h-[320px] items-center justify-center rounded-[24px] border border-slate-200 bg-slate-50 text-center">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">No posts found</h2>
                    <p className="mt-2 text-sm text-slate-500">Try a different search term.</p>
                  </div>
                </div>
              )}
            </div>

            <aside className="w-full xl:max-w-[340px]">
              <div className="rounded-lg sm:rounded-xl md:rounded-[24px] border border-slate-200 bg-white p-1">
                <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3">
                  <h2 className="text-lg sm:text-2xl md:text-[1.7rem] font-semibold tracking-[-0.04em] text-slate-900">
                    Other featured posts
                  </h2>
                </div>
                <div className="space-y-1 px-1 pb-2">
                  {sidebarPosts.map((post) => (
                    <SidebarPost key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            </aside>
          </section>

          <section className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-[2rem] font-semibold tracking-[-0.04em] text-slate-900">Recent Posts</h2>
              <p aria-live="polite" className="mt-1 text-xs sm:text-sm text-slate-500">
                Showing {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
                {normalizedQuery ? ` for "${deferredQuery}"` : ""}.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:gap-3 sm:flex-row sm:items-center">
              <label className="relative block w-full sm:min-w-[240px]">
                <span className="sr-only">Search articles</span>
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 sm:size-5 -translate-y-1/2 text-slate-400" />
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
                  className="w-full rounded-full border border-slate-200 bg-white py-2 sm:py-3 pr-4 sm:pr-5 pl-10 sm:pl-12 text-xs sm:text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </label>

              <Link
                href="/write"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                All Posts
              </Link>
            </div>
          </section>

          {recentPosts.length ? (
            <section
              id="recent"
              aria-label="Recent post grid"
              className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-3"
            >
              {recentPosts.map((post) => (
                <RecentPostCard key={post.slug} post={post} />
              ))}
            </section>
          ) : (
            <section className="rounded-[24px] border border-slate-200 bg-slate-50 px-6 py-16 text-center">
              <h2 className="text-2xl font-semibold text-slate-900">No recent posts available</h2>
              <p className="mt-2 text-sm text-slate-500">Create a new article or reset the search to see more.</p>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
