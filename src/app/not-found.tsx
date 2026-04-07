import Link from "next/link";

export default function NotFound() {
  return (
    <main className="editorial-shell flex min-h-screen items-center justify-center px-4 py-8">
      <div className="glass-card max-w-xl rounded-[2rem] p-10 text-center">
        <p className="text-sm font-semibold tracking-[0.32em] uppercase text-accent">404</p>
        <h1 className="display-text mt-4 text-5xl">The story you&apos;re looking for drifted away.</h1>
        <p className="mt-4 text-lg leading-8 text-muted">
          The article may have moved, or the link may be incomplete. The archive is still right here.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[#20160f] px-5 py-3 text-sm font-semibold text-white hover:bg-accent-strong"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
