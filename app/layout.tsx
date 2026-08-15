import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { PlausibleScript } from '@/components/analytics/plausible';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://surjora.com';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Surjora — Digital Chinese Accounts & Services',
    template: '%s | Surjora',
  },
  description:
    'Manually reviewed Chinese platform account and assistance requests for WeChat, Alipay, QQ, Xiaohongshu, Douyin, Taobao, Baidu and more.',
  applicationName: 'Surjora',
  authors: [{ name: 'Surjora' }],
  creator: 'Surjora',
  publisher: 'Surjora',
  keywords: [
    'Chinese WeChat account',
    'Alipay account assistance',
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
    description: 'Request reviewed account options and assistance for major Chinese platforms.',
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
    description: 'Request reviewed account options and assistance for major Chinese platforms.',
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
  category: 'business',
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
    <html lang="en" className={inter.variable}>
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
