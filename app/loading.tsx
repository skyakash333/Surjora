export default function Loading() {
  return (
    <main id="main" className="container py-24 text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-ink-200 border-t-brand-600" />
      <p className="mt-4 text-ink-500">Loading…</p>
    </main>
  );
}
