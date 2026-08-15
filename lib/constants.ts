export const siteConfig = {
  name: 'Surjora',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://surjora.com',
  email: process.env.CONTACT_TO_EMAIL ?? 'contact@surjora.com',
  telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL ?? '',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? '',
  description:
    'Manually reviewed access requests and assistance for WeChat, QQ, Alipay, WeCom, Xiaohongshu, Douyin, Taobao and other Chinese platforms.',
} as const;

export const mainNav = [
  { label: 'Home', href: '/' },
  { label: 'Accounts', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Knowledge', href: '/knowledge' },
  { label: 'About', href: '/about' },
] as const;

export const accountTypes = [
  'WeChat Accounts',
  'QQ Accounts',
  'Alipay Accounts',
  'WeCom Accounts',
  'Xiaohongshu Accounts',
  'Douyin Accounts',
  'Taobao Accounts',
  '1688 Accounts',
  'JD Accounts',
  'Baidu Accounts',
  'Bilibili Accounts',
  'Chinese Phone Numbers',
  'Chinese Email Accounts',
] as const;

export const serviceTypes = [
  'WeChat QR Scan',
  'Chinese Verification',
  'Account Assistance',
  'Custom Requests',
] as const;

/**
 * Homepage account categories with short, customer-facing descriptions. Slugs are
 * derived from `name` via slugify() so they stay in sync with the category pages.
 */
export const accountCategories = [
  {
    name: 'WeChat Accounts',
    blurb: 'Reviewed options for eligible messaging, communication and setup needs.',
  },
  {
    name: 'QQ Accounts',
    blurb: 'Account options for QQ messaging, QQ Mail and supported Tencent sign-ins.',
  },
  {
    name: 'Alipay Accounts',
    blurb: 'Eligibility and setup options for supported Alipay use cases.',
  },
  {
    name: 'WeCom Accounts',
    blurb: 'Organization and account assistance for eligible team workflows.',
  },
  {
    name: 'Xiaohongshu Accounts',
    blurb: 'Account options for eligible browsing, publishing and creator activity.',
  },
  {
    name: 'Douyin Accounts',
    blurb: 'Reviewed account options for eligible viewing and creator workflows.',
  },
  {
    name: 'Taobao Accounts',
    blurb: 'Account and setup options for supported shopping workflows.',
  },
  {
    name: '1688 Accounts',
    blurb: 'Account options for buyers preparing wholesale sourcing workflows.',
  },
  {
    name: 'JD Accounts',
    blurb: 'Account and setup options for eligible JD.com shopping.',
  },
  {
    name: 'Baidu Accounts',
    blurb: 'Account options for supported Baidu search, cloud and community services.',
  },
  {
    name: 'Bilibili Accounts',
    blurb: 'Account options for eligible viewing, community and creator use.',
  },
  {
    name: 'Chinese Phone Numbers',
    blurb: 'Reviewed number options for supported SMS and account requirements.',
  },
  {
    name: 'Chinese Email Accounts',
    blurb: 'Email account options for supported registration and communication needs.',
  },
] as const;

/** Homepage service highlights with short, customer-facing descriptions. */
export const serviceHighlights = [
  {
    name: 'WeChat QR Scan',
    blurb:
      'Assistance when an official WeChat flow requests an eligible user to confirm a QR code.',
  },
  {
    name: 'Chinese Verification',
    blurb: 'Guidance for legitimate phone, SMS, identity and platform verification steps.',
  },
  {
    name: 'Account Assistance',
    blurb: 'Scoped guidance for setup, security, recovery and platform questions.',
  },
  {
    name: 'Custom Requests',
    blurb: 'A manual review for lawful China-platform needs not covered by the catalog.',
  },
] as const;

/** The three-step buyer journey shown on the homepage and support page. */
export const howItWorks = [
  {
    title: 'Tell us what you need',
    text: 'Pick an account or service and message us on Telegram, WhatsApp or the contact form.',
  },
  {
    title: 'Review the written quote',
    text: 'We confirm availability, exact scope, final price, delivery estimate and payment options.',
  },
  {
    title: 'Confirm and receive',
    text: 'After you accept the quote and pay, we complete the agreed digital delivery and guidance.',
  },
] as const;
