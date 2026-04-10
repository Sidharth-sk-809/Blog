import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Write a Story",
  description: "Create a new blog post with author details and publish it into the Horizon Journal archive.",
};

export default function WritePage() {
  return (
    <main
      id="content"
      className="editorial-shell min-h-screen px-4 py-6 md:px-8 md:py-8"
    >
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="glass-card rounded-[2rem] p-8 md:p-10">
          <p className="text-sm font-semibold tracking-[0.32em] uppercase text-accent">Author Studio</p>
          <h1 className="display-text mt-4 text-balance text-5xl leading-none md:text-6xl">
            Add a blog for a person and publish it right away.
          </h1>
          <p className="mt-6 text-base leading-8 text-muted">
            This authoring area lets you enter the writer&apos;s name, role, article details, and body copy, then
            create a new post page in one flow.
          </p>

          <div className="mt-8 rounded-[1.75rem] border border-line bg-[#fffaf3] p-6">
            <p className="text-sm font-semibold tracking-[0.24em] uppercase text-muted">What to include</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-foreground/80">
              <li>Author details so the post clearly belongs to a person.</li>
              <li>A concise excerpt for the archive and metadata.</li>
              <li>A body with blank lines between paragraphs for better formatting.</li>
            </ul>
          </div>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-full border border-line-strong bg-white/70 px-5 py-3 text-sm font-semibold text-foreground hover:-translate-y-0.5"
          >
            Back to homepage
          </Link>
        </section>

        <section className="glass-card rounded-[2rem] p-8 md:p-10">
          <div className="mb-6">
            <p className="text-sm font-semibold tracking-[0.32em] uppercase text-muted">New story</p>
            <p className="mt-2 text-sm leading-7 text-muted">
              GitHub Pages can only host a static export, so publishing is disabled in this deployment.
              This page remains as a drafting reference for the story fields used by the demo.
            </p>
          </div>
          <div className="grid gap-5">
            <div className="rounded-[1.25rem] border border-line-strong bg-white/85 px-4 py-3 text-sm text-foreground/80">
              Author details, title, category, excerpt, intro, and article body are all part of the content model.
            </div>
            <div className="rounded-[1.25rem] border border-dashed border-line-strong bg-[#fffaf3] p-6 text-sm leading-7 text-muted">
              If you want to re-enable publishing later, the app needs a real backend or a different deployment
              target than GitHub Pages.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
