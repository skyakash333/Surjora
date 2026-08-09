import type { Metadata, Viewport } from 'next';
import { PlausibleScript } from '@/components/analytics/plausible';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://surjora.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Surjora — Digital Chinese Accounts & Services',
    template: '%s | Surjora',
  },
  description:
    'Surjora provides verified digital Chinese accounts and services: WeChat, Alipay, QQ, Xiaohongshu, Douyin, Taobao, Baidu and more. Request a quote via Telegram or WhatsApp.',
  applicationName: 'Surjora',
  authors: [{ name: 'Surjora' }],
  creator: 'Surjora',
  publisher: 'Surjora',
  keywords: [
    'Chinese WeChat account',
    'buy Alipay account',
    'QQ account',
    'WeCom account',
    'Xiaohongshu account',
    'Douyin account',
    'Taobao account',
    'Chinese phone number',
    'Chinese verification service',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Surjora',
    title: 'Surjora — Digital Chinese Accounts & Services',
    description:
      'Verified digital Chinese accounts and services. Request a quote via Telegram or WhatsApp.',
    images: [
      {
        url: '/og.svg',
        width: 1200,
        height: 630,
        alt: 'Surjora — Digital Chinese Accounts & Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Surjora — Digital Chinese Accounts & Services',
    description:
      'Verified digital Chinese accounts and services. Request a quote via Telegram or WhatsApp.',
    images: ['/og.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'shopping',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <PlausibleScript />
        {children}
      </body>
    </html>
  );
}
