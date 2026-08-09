import Link from 'next/link';
import { accountTypes, mainNav, serviceTypes, siteConfig } from '@/lib/constants';

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-200 bg-white">
      <div className="container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold tracking-tight text-ink-900">{siteConfig.name}</p>
          <p className="mt-3 max-w-xs text-sm text-ink-600">{siteConfig.description}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink-900">Navigate</p>
          <ul className="mt-3 space-y-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-ink-600 hover:text-brand-600">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink-900">Accounts</p>
          <ul className="mt-3 space-y-2">
            {accountTypes.slice(0, 8).map((item) => (
              <li key={item}>
                <Link href="/contact" className="text-sm text-ink-600 hover:text-brand-600">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink-900">Services</p>
          <ul className="mt-3 space-y-2">
            {serviceTypes.map((item) => (
              <li key={item}>
                <Link href="/services" className="text-sm text-ink-600 hover:text-brand-600">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-200 py-6">
        <div className="container flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-ink-500">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-ink-500">
            {siteConfig.telegram && (
              <a href={siteConfig.telegram} target="_blank" rel="noopener noreferrer">
                Telegram
              </a>
            )}
            {siteConfig.whatsapp && (
              <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
