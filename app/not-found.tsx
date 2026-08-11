import { ButtonLink } from '@/components/ui/button';
import { ArrowRightIcon } from '@/components/ui/icons';

const helpfulLinks = [
  { label: 'Browse accounts', href: '/products' },
  { label: 'Explore services', href: '/services' },
  { label: 'Knowledge Hub', href: '/knowledge' },
  { label: 'Contact us', href: '/contact' },
];

export default function NotFound() {
  return (
    <main id="main" className="container py-24">
      <div className="mx-auto max-w-lg text-center">
        <p className="eyebrow text-brand-600">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 text-ink-600">
          The page you are looking for does not exist or has been moved. Try one of these instead:
        </p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {helpfulLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group surface-interactive flex items-center justify-between px-4 py-3 text-sm font-medium text-ink-800"
              >
                {link.label}
                <ArrowRightIcon className="text-brand-600 transition-transform group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <ButtonLink href="/" size="lg">
            Back to home
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
