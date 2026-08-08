import Link from 'next/link';
import { siteConfig } from '@/lib/constants';

export function ContactDock() {
  return (
    <nav
      aria-label="Contact shortcuts"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-200 bg-white p-3 md:hidden"
    >
      <div className="grid grid-cols-3 gap-2">
        <a
          href={siteConfig.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-sky-500 px-3 py-2.5 text-center text-sm font-medium text-white"
        >
          Telegram
        </a>
        <a
          href={siteConfig.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-emerald-600 px-3 py-2.5 text-center text-sm font-medium text-white"
        >
          WhatsApp
        </a>
        <Link
          href="/contact"
          className="rounded-lg bg-brand-600 px-3 py-2.5 text-center text-sm font-medium text-white"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
