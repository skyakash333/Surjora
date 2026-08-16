import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { SectionHeading } from '@/components/ui/section-heading';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'How Wechatscan collects, uses and protects customer, request and website information.',
  path: '/privacy',
});

export default function PrivacyPage() {
  const sections = [
    [
      'Information collected',
      'Wechatscan collects information you submit, such as email, Telegram or WhatsApp contact, request details, quantity and product interest. Security systems may process IP address, bot-verification information and basic technical logs.',
    ],
    [
      'How information is used',
      'Information is used to review requests, provide quotes, communicate, fulfil accepted work, prevent abuse, maintain records and improve the website. It is not sold.',
    ],
    [
      'Sensitive information',
      'Do not send passwords, one-time codes, payment PINs or identity documents in an initial request. If a service genuinely requires sensitive information, Wechatscan will explain the purpose and appropriate submission method first.',
    ],
    [
      'Service providers',
      'Information may be processed by infrastructure, database, email, bot-protection and communications providers used to operate Wechatscan. Each provider receives only information needed for its function.',
    ],
    [
      'Retention',
      'Request and transaction records are retained as reasonably necessary for support, security, accounting, disputes and legal obligations. Unneeded information may be deleted or anonymized.',
    ],
    [
      'Security',
      'Wechatscan uses access controls and reasonable technical measures, but no internet system is risk-free. Customers should also protect their communication accounts and devices.',
    ],
    [
      'Your choices',
      'You may ask to review, correct or delete eligible personal information by contacting Wechatscan. Some records may need to be retained for legal, security or transaction purposes.',
    ],
    [
      'International processing',
      'Wechatscan and its service providers may process data in countries different from yours. By submitting a request, you acknowledge this operational necessity subject to applicable law.',
    ],
    [
      'Contact',
      'Use the contact page for privacy requests and identify the request reference when available.',
    ],
  ];
  return (
    <div className="container py-12">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
      <SectionHeading
        as="h1"
        eyebrow="Legal"
        title="Privacy Policy"
        description="Last updated 14 August 2026"
      />
      <div className="mt-10 max-w-3xl space-y-8">
        {sections.map(([heading, text]) => (
          <section key={heading}>
            <h2 className="text-xl font-semibold text-ink-900">{heading}</h2>
            <p className="mt-3 leading-relaxed text-ink-600">{text}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
