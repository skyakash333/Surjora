import Link from 'next/link';

export default function HomePage() {
  return (
    <main id="main" className="container py-16">
      <h1 className="text-4xl font-bold tracking-tight text-ink-900">
        Surjora — Digital Chinese Accounts & Services
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-600">
        Verified digital Chinese accounts and related services. SEO-first marketing site —
        scaffolding only at Phase 0.
      </p>
      <Link
        href="/contact"
        className="mt-8 inline-block rounded-lg bg-brand-600 px-6 py-3 font-medium text-white transition hover:bg-brand-700"
      >
        Contact
      </Link>
    </main>
  );
}
