export default function Loading() {
  return (
    <main className="editorial-shell min-h-screen px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="glass-card h-80 animate-pulse rounded-[2rem]" />
        <div className="glass-card h-28 animate-pulse rounded-[2rem]" />
        <div className="glass-card h-[26rem] animate-pulse rounded-[2rem]" />
      </div>
    </main>
  );
}
