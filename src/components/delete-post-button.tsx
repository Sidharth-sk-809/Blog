"use client";

import { Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";

function DeleteButtonInner() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-full border border-[#d8a793] bg-[#fff4ee] px-5 py-3 text-sm font-semibold text-accent-strong hover:bg-[#ffe9de] disabled:cursor-not-allowed disabled:opacity-70"
    >
      <Trash2 className="size-4" />
      {pending ? "Removing..." : "Remove this story"}
    </button>
  );
}

export function DeletePostButton({
  action,
}: {
  action: () => Promise<void>;
}) {
  return (
    <form action={action}>
      <DeleteButtonInner />
    </form>
  );
}
