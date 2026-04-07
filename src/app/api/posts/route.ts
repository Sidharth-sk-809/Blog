import { NextResponse } from "next/server";
import { createPost, getPostSummaries } from "@/lib/posts";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim().toLowerCase() ?? "";
  const posts = await getPostSummaries();

  const filtered = query
    ? posts.filter((post) => {
        const haystack = `${post.title} ${post.excerpt} ${post.category} ${post.author.name}`.toLowerCase();
        return haystack.includes(query);
      })
    : posts;

  return NextResponse.json(filtered);
}

export async function POST(request: Request) {
  const body = await request.json();

  const requiredFields = [
    "title",
    "excerpt",
    "category",
    "authorName",
    "authorRole",
    "coverLabel",
    "intro",
    "sectionHeading",
    "body",
  ] as const;

  for (const field of requiredFields) {
    if (!body[field] || typeof body[field] !== "string" || !body[field].trim()) {
      return NextResponse.json({ message: `Missing field: ${field}` }, { status: 400 });
    }
  }

  const post = await createPost(body);

  return NextResponse.json(post, { status: 201 });
}
