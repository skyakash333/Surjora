'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="container py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">500</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink-900">Something went wrong</h1>
      <p className="mt-4 text-ink-600">An unexpected error occurred. Please try again.</p>
      <div className="mt-8 flex justify-center gap-3">
        <button
          onClick={() => reset()}
          className="rounded-lg bg-brand-600 px-6 py-3 font-medium text-white transition hover:bg-brand-700"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-lg border border-ink-300 px-6 py-3 font-medium text-ink-800 transition hover:bg-ink-100"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
