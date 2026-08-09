import Link from 'next/link';
import { siteConfig } from '@/lib/constants';

export function ContactDock() {
  const hasTelegram = Boolean(siteConfig.telegram);
  const hasWhatsapp = Boolean(siteConfig.whatsapp);
  const cols = [hasTelegram, hasWhatsapp].filter(Boolean).length + 1;

  return (
    <nav
      aria-label="Contact shortcuts"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-200 bg-white p-3 md:hidden"
    >
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {hasTelegram && (
          <a
            href={siteConfig.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-sky-500 px-3 py-2.5 text-center text-sm font-medium text-white"
          >
            Telegram
          </a>
        )}
        {hasWhatsapp && (
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-emerald-600 px-3 py-2.5 text-center text-sm font-medium text-white"
          >
            WhatsApp
          </a>
        )}
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
