import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main" className="container py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink-900">Page not found</h1>
      <p className="mt-4 text-ink-600">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-lg bg-brand-600 px-6 py-3 font-medium text-white transition hover:bg-brand-700"
      >
        Back to home
      </Link>
    </main>
  );
}
