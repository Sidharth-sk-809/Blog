"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createPostAction } from "@/app/write/actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-full bg-[#20160f] px-5 py-3 text-sm font-semibold text-white hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Publishing..." : "Publish story"}
    </button>
  );
}

function Field({
  label,
  name,
  placeholder,
  required = true,
}: {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-foreground">{label}</span>
      <input
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-[1.25rem] border border-line-strong bg-white/85 px-4 py-3 text-sm outline-none placeholder:text-muted"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  placeholder,
  rows,
  required = true,
}: {
  label: string;
  name: string;
  placeholder: string;
  rows: number;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-foreground">{label}</span>
      <textarea
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-[1.25rem] border border-line-strong bg-white/85 px-4 py-3 text-sm leading-7 outline-none placeholder:text-muted"
      />
    </label>
  );
}

export function WritePostForm() {
  const [state, formAction] = useActionState(createPostAction, {});

  return (
    <form
      action={formAction}
      className="grid gap-5"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Author name"
          name="authorName"
          placeholder="Jordan Lee"
        />
        <Field
          label="Author role"
          name="authorRole"
          placeholder="Staff Writer"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Story title"
          name="title"
          placeholder="Designing a calmer reading experience"
        />
        <Field
          label="Category"
          name="category"
          placeholder="Design"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Cover label"
          name="coverLabel"
          placeholder="Feature story"
        />
        <Field
          label="Section heading"
          name="sectionHeading"
          placeholder="What changed"
        />
      </div>

      <TextArea
        label="Excerpt"
        name="excerpt"
        rows={3}
        placeholder="A short summary that appears on the homepage and in metadata."
      />

      <TextArea
        label="Intro"
        name="intro"
        rows={4}
        placeholder="Write the opening paragraph that frames the article."
      />

      <TextArea
        label="Main story"
        name="body"
        rows={10}
        placeholder="Write the article body here. Separate paragraphs with a blank line."
      />

      <TextArea
        label="Bullet points"
        name="bulletPoints"
        rows={4}
        required={false}
        placeholder="Optional. Add one takeaway per line."
      />

      {state.error ? (
        <p className="rounded-[1rem] border border-[#d1a38f] bg-[#fff4ee] px-4 py-3 text-sm text-accent-strong">
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton />
        <p className="text-sm text-muted">
          Stories publish immediately in this demo and appear at the top of the archive.
        </p>
      </div>
    </form>
  );
}
