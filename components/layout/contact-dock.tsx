import Link from 'next/link';
import { siteConfig } from '@/lib/constants';
import { ChatIcon } from '@/components/ui/icons';

export function ContactDock() {
  const hasTelegram = Boolean(siteConfig.telegram);
  const hasWhatsapp = Boolean(siteConfig.whatsapp);
  const cols = [hasTelegram, hasWhatsapp].filter(Boolean).length + 1;

  return (
    <nav
      aria-label="Contact shortcuts"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-200 bg-white/95 p-3 backdrop-blur md:hidden"
    >
      <div
        className="container grid gap-2 px-0"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {hasTelegram && (
          <a
            href={siteConfig.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-xl bg-sky-500 px-3 py-2.5 text-sm font-semibold text-white"
          >
            Telegram
          </a>
        )}
        {hasWhatsapp && (
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2.5 text-sm font-semibold text-white"
          >
            WhatsApp
          </a>
        )}
        <Link
          href="/contact"
          className="flex items-center justify-center gap-1.5 rounded-xl bg-brand-600 px-3 py-2.5 text-sm font-semibold text-white"
        >
          <ChatIcon className="h-4 w-4" />
          Contact
        </Link>
      </div>
    </nav>
  );
}
