import Link from 'next/link';
import { accountTypes, serviceTypes, siteConfig } from '@/lib/constants';
import { slugify } from '@/lib/slug';
import { Logo } from '@/components/layout/logo';

const knowledgeLinks = [
  { label: 'Guides', href: '/knowledge/guides' },
  { label: 'FAQs', href: '/knowledge/faq' },
  { label: 'Tutorials', href: '/knowledge/tutorials' },
  { label: 'Comparisons', href: '/knowledge/comparisons' },
];

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Support', href: '/support' },
  { label: 'Contact', href: '/contact' },
  { label: 'Knowledge Hub', href: '/knowledge' },
];

const legalLinks = [
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Refund & Delivery', href: '/refund-delivery-policy' },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-200 bg-white">
      <div className="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-6">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-600">
            {siteConfig.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {siteConfig.telegram && (
              <a
                href={siteConfig.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-ink-100 px-3 py-1.5 text-xs font-medium text-ink-700 transition hover:bg-sky-50 hover:text-sky-700"
              >
                Telegram
              </a>
            )}
            {siteConfig.whatsapp && (
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-ink-100 px-3 py-1.5 text-xs font-medium text-ink-700 transition hover:bg-emerald-50 hover:text-emerald-700"
              >
                WhatsApp
              </a>
            )}
            <a
              href={`mailto:${siteConfig.email}`}
              className="rounded-lg bg-ink-100 px-3 py-1.5 text-xs font-medium text-ink-700 transition hover:bg-brand-50 hover:text-brand-700"
            >
              Email
            </a>
          </div>
        </div>

        <FooterColumn title="Accounts">
          {accountTypes.slice(0, 8).map((item) => (
            <FooterLink key={item} href={`/products/${slugify(item)}`}>
              {item}
            </FooterLink>
          ))}
          <FooterLink href="/products">View all accounts →</FooterLink>
        </FooterColumn>

        <FooterColumn title="Services">
          {serviceTypes.map((item) => (
            <FooterLink key={item} href={`/services/${slugify(item)}`}>
              {item}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Knowledge">
          {knowledgeLinks.map((item) => (
            <FooterLink key={item.href} href={item.href}>
              {item.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Company">
          {companyLinks.map((item) => (
            <FooterLink key={item.href} href={item.href}>
              {item.label}
            </FooterLink>
          ))}
        </FooterColumn>
        <FooterColumn title="Legal">
          {legalLinks.map((item) => (
            <FooterLink key={item.href} href={item.href}>
              {item.label}
            </FooterLink>
          ))}
        </FooterColumn>
      </div>

      <div className="border-t border-ink-200 py-6">
        <div className="container flex flex-col items-center justify-between gap-3 text-xs text-ink-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Independent service · not affiliated with listed platforms.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-semibold text-ink-900">{title}</p>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-ink-600 transition-colors hover:text-brand-600">
        {children}
      </Link>
    </li>
  );
}
