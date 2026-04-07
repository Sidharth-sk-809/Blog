import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import { cache } from "react";
import { BlogShowcase } from "@/components/blog-showcase";
import { HomeStructuredData } from "@/components/structured-data";
import { getQueryClient } from "@/lib/query-client";
import { getPostSummaries } from "@/lib/posts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Horizon Journal | Stories for builders, creators, and modern teams",
  description:
    "Explore thoughtful articles on product design, engineering, remote collaboration, and digital publishing.",
  openGraph: {
    title: "Horizon Journal",
    description:
      "A modern editorial blog experience built with Next.js, SSR, Tailwind CSS, and React Query.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Horizon Journal",
    description:
      "Stories for builders, creators, and modern teams navigating the web.",
  },
};

const getInitialPosts = cache(getPostSummaries);

export default async function HomePage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: getInitialPosts,
  });

  const posts = queryClient.getQueryData<Awaited<ReturnType<typeof getPostSummaries>>>([
    "posts",
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeStructuredData />
      <BlogShowcase posts={posts ?? []} />
    </HydrationBoundary>
  );
}
