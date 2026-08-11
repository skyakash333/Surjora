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
