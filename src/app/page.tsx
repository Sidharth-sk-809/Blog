import type { Metadata } from "next";
import { BlogShowcase } from "@/components/blog-showcase";
import { HomeStructuredData } from "@/components/structured-data";
import { getPostSummaries } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Horizon Journal | Stories for builders, creators, and modern teams",
  description:
    "Explore thoughtful articles on product design, engineering, remote collaboration, and digital publishing.",
  openGraph: {
    title: "Horizon Journal",
    description:
      "A modern editorial blog experience built with Next.js, Tailwind CSS, and accessible editorial patterns.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Horizon Journal",
    description:
      "Stories for builders, creators, and modern teams navigating the web.",
  },
};

export default async function HomePage() {
  const posts = await getPostSummaries();

  return (
    <>
      <HomeStructuredData />
      <BlogShowcase posts={posts} />
    </>
  );
}
