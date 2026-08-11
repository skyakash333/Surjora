export const siteConfig = {
  name: 'Surjora',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://surjora.com',
  email: process.env.CONTACT_TO_EMAIL ?? 'contact@surjora.com',
  telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL ?? '',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? '',
  description:
    'Verified digital Chinese accounts and services. WeChat, QQ, Alipay, WeCom, Xiaohongshu, Douyin, Taobao and more. Request a quote via Telegram or WhatsApp.',
} as const;

export const mainNav = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Knowledge', href: '/knowledge' },
  { label: 'About', href: '/about' },
  { label: 'Support', href: '/support' },
  { label: 'Contact', href: '/contact' },
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
  { name: 'WeChat Accounts', blurb: 'Ready-to-use WeChat accounts for messaging, Moments and Mini Program access.' },
  { name: 'QQ Accounts', blurb: 'QQ accounts for chat, game logins and signing in across Tencent services.' },
  { name: 'Alipay Accounts', blurb: 'Alipay accounts for payments, wallet features and everyday transactions.' },
  { name: 'WeCom Accounts', blurb: 'WeCom (Enterprise WeChat) accounts for business messaging and customer contact.' },
  { name: 'Xiaohongshu Accounts', blurb: 'Xiaohongshu (RED) accounts to browse, post and follow the lifestyle community.' },
  { name: 'Douyin Accounts', blurb: 'Douyin accounts for short video, live streams and trending content.' },
  { name: 'Taobao Accounts', blurb: "Taobao accounts for shopping across China's largest consumer marketplace." },
  { name: '1688 Accounts', blurb: '1688 accounts for sourcing and wholesale buying direct from suppliers.' },
  { name: 'JD Accounts', blurb: 'JD.com accounts for electronics, brands and fast domestic delivery.' },
  { name: 'Baidu Accounts', blurb: 'Baidu accounts for search, Tieba, cloud storage and other Baidu services.' },
  { name: 'Bilibili Accounts', blurb: "Bilibili accounts to watch, comment and join China's video community." },
  { name: 'Chinese Phone Numbers', blurb: 'Chinese mobile numbers for receiving SMS and completing platform sign-ups.' },
  { name: 'Chinese Email Accounts', blurb: 'Chinese email accounts for registrations and contact with domestic services.' },
] as const;

/** Homepage service highlights with short, customer-facing descriptions. */
export const serviceHighlights = [
  {
    name: 'WeChat QR Scan',
    blurb: 'We scan WeChat QR codes on your behalf to complete logins and steps that need a China-based scan.',
  },
  {
    name: 'Chinese Verification',
    blurb: 'Help getting through phone, SMS and identity verification steps on Chinese platforms.',
  },
  {
    name: 'Account Assistance',
    blurb: 'Hands-on help with setup, recovery and everyday account questions.',
  },
  {
    name: 'Custom Requests',
    blurb: "Something specific in mind? Tell us the platform or task and we'll find a way to help.",
  },
] as const;

/** The three-step buyer journey shown on the homepage and support page. */
export const howItWorks = [
  {
    title: 'Tell us what you need',
    text: 'Pick an account or service and message us on Telegram, WhatsApp or the contact form.',
  },
  {
    title: 'Get a quote',
    text: 'We reply with pricing and details — usually within a few hours, not days.',
  },
  {
    title: 'Receive your account',
    text: 'Everything is delivered digitally with setup guidance and after-sale support.',
  },
] as const;
