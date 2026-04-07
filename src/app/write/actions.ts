"use server";

import { redirect } from "next/navigation";
import { createPost } from "@/lib/posts";

export type CreatePostState = {
  error?: string;
};

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function createPostAction(
  _previousState: CreatePostState,
  formData: FormData,
): Promise<CreatePostState> {
  const title = getString(formData, "title");
  const excerpt = getString(formData, "excerpt");
  const category = getString(formData, "category");
  const authorName = getString(formData, "authorName");
  const authorRole = getString(formData, "authorRole");
  const coverLabel = getString(formData, "coverLabel");
  const intro = getString(formData, "intro");
  const sectionHeading = getString(formData, "sectionHeading");
  const body = getString(formData, "body");
  const bulletPoints = getString(formData, "bulletPoints");

  if (
    !title ||
    !excerpt ||
    !category ||
    !authorName ||
    !authorRole ||
    !coverLabel ||
    !intro ||
    !sectionHeading ||
    !body
  ) {
    return {
      error: "Please complete all required fields before publishing.",
    };
  }

  const post = await createPost({
    title,
    excerpt,
    category,
    authorName,
    authorRole,
    coverLabel,
    intro,
    sectionHeading,
    body,
    bulletPoints,
  });

  redirect(`/posts/${post.slug}`);
}
