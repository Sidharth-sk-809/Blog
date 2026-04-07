"use server";

import { redirect } from "next/navigation";
import { deletePost } from "@/lib/posts";

export async function deletePostAction(slug: string) {
  await deletePost(slug);
  redirect("/");
}
