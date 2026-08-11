import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const now = new Date();

async function upsertCategory(slug, name, kind, description) {
  return prisma.category.upsert({
    where: { slug },
    update: { name, kind, description },
    create: { slug, name, kind, description },
  });
}

async function upsertProduct(product) {
  const { categoryId, ...data } = product;
  await prisma.product.upsert({
    where: { slug: product.slug },
    update: {
      ...data,
      categoryId,
      createdAt: now,
      updatedAt: now,
    },
    create: {
      ...data,
      categoryId,
      createdAt: now,
      updatedAt: now,
    },
  });
}

async function upsertArticle(article) {
  const { categoryId, ...data } = article;
  await prisma.article.upsert({
    where: { slug: article.slug },
    update: {
      ...data,
      categoryId,
      updatedAt: now,
    },
    create: {
      ...data,
      categoryId,
      createdAt: now,
      updatedAt: now,
    },
  });
}

// ---------------------------------------------------------------------------
// Demo testimonials.
//
// IMPORTANT: these are SAMPLE entries, not genuine customer reviews. Each is
// flagged `isDemo: true` so the storefront can label them as illustrative
// placeholder content. Replace them with real, attributable testimonials (and
// set isDemo: false) before presenting them as social proof.
// ---------------------------------------------------------------------------
const demoTestimonials = [
  {
    quote:
      'Sample testimonial — replace with a real customer quote. Placeholder text showing how a short recommendation about delivery speed and support would appear here.',
    author: 'Sample Client',
    role: 'Cross-border seller',
    rating: 5,
    sortOrder: 1,
    visible: true,
    isDemo: true,
  },
  {
    quote:
      'Sample testimonial — replace with a real customer quote. Placeholder text illustrating feedback about the verification service and clear communication.',
    author: 'Demo Reviewer',
    role: 'Agency operator',
    rating: 5,
    sortOrder: 2,
    visible: true,
    isDemo: true,
  },
  {
    quote:
      'Sample testimonial — replace with a real customer quote. Placeholder text demonstrating how a note about account setup guidance would read.',
    author: 'Example Customer',
    role: 'Content creator',
    rating: 5,
    sortOrder: 3,
    visible: true,
    isDemo: true,
  },
];

const categories = [
  { slug: 'wechat-accounts', name: 'WeChat Accounts', kind: 'PRODUCT', description: 'WeChat accounts for personal and business use.' },
  { slug: 'qq-accounts', name: 'QQ Accounts', kind: 'PRODUCT', description: 'QQ accounts for messaging and China services.' },
  { slug: 'alipay-accounts', name: 'Alipay Accounts', kind: 'PRODUCT', description: 'Alipay accounts for payments in China.' },
  { slug: 'wecom-accounts', name: 'WeCom Accounts', kind: 'PRODUCT', description: 'WeCom (WeChat Work) accounts for teams and businesses.' },
  { slug: 'xiaohongshu-accounts', name: 'Xiaohongshu Accounts', kind: 'PRODUCT', description: 'Xiaohongshu (RED) accounts for content and social.' },
  { slug: 'douyin-accounts', name: 'Douyin Accounts', kind: 'PRODUCT', description: 'Douyin (TikTok China) accounts for short video.' },
  { slug: 'taobao-accounts', name: 'Taobao Accounts', kind: 'PRODUCT', description: 'Taobao accounts for shopping in China.' },
  { slug: '1688-accounts', name: '1688 Accounts', kind: 'PRODUCT', description: '1688 accounts for wholesale and sourcing.' },
  { slug: 'jd-accounts', name: 'JD Accounts', kind: 'PRODUCT', description: 'JD.com accounts for online shopping.' },
  { slug: 'baidu-accounts', name: 'Baidu Accounts', kind: 'PRODUCT', description: 'Baidu accounts for search and cloud services.' },
  { slug: 'bilibili-accounts', name: 'Bilibili Accounts', kind: 'PRODUCT', description: 'Bilibili accounts for video and streaming.' },
  { slug: 'chinese-phone-numbers', name: 'Chinese Phone Numbers', kind: 'PRODUCT', description: 'Chinese phone numbers for verification and services.' },
  { slug: 'chinese-email-accounts', name: 'Chinese Email Accounts', kind: 'PRODUCT', description: 'Chinese email accounts for sign-ups and verification.' },
  { slug: 'wechat-qr-scan', name: 'WeChat QR Scan', kind: 'SERVICE', description: 'WeChat QR scan and account linking service.' },
  { slug: 'chinese-verification', name: 'Chinese Verification', kind: 'SERVICE', description: 'Verification services for Chinese platforms.' },
  { slug: 'account-assistance', name: 'Account Assistance', kind: 'SERVICE', description: 'Hands-on help with your Chinese accounts.' },
  { slug: 'custom-requests', name: 'Custom Requests', kind: 'SERVICE', description: 'Tailored help for anything not listed.' },
];

const contentCategories = [
  { slug: 'guides', name: 'Guides', kind: 'CONTENT', description: 'Step-by-step guides for buying and using Chinese accounts and services.' },
  { slug: 'faq', name: 'FAQs', kind: 'CONTENT', description: 'Answers to the most common questions about Chinese platforms and accounts.' },
  { slug: 'tutorials', name: 'Tutorials', kind: 'CONTENT', description: 'Practical tutorials for setting up and using Chinese services.' },
  { slug: 'comparisons', name: 'Comparisons', kind: 'CONTENT', description: 'Side-by-side comparisons of Chinese platforms, accounts and services.' },
  { slug: 'news', name: 'News', kind: 'CONTENT', description: 'News and updates about Chinese platforms and digital services.' },
  { slug: 'case-studies', name: 'Case Studies', kind: 'CONTENT', description: 'Real examples of people and businesses using Chinese digital services.' },
];

const products = [
  {
    slug: 'wechat-accounts',
    type: 'PRODUCT',
    title: 'WeChat Accounts',
    seoTitle: 'Buy Verified WeChat Accounts | Surjora',
    seoDescription: 'Verified WeChat accounts for personal and business use. Fast delivery, real support. Request a quote today.',
    h1: 'WeChat Accounts',
    shortDescription: 'Verified WeChat accounts ready for messaging, groups, payments and business tools.',
    featured: true,
    description: [
      { type: 'paragraph', data: { text: 'WeChat is essential for anyone doing business or staying connected in China. We provide verified WeChat accounts ready to use for messaging, groups, payments and business tools.' } },
      { type: 'heading', data: { level: 2, text: 'What you get' } },
      { type: 'list', data: { ordered: false, items: ['Registered WeChat account ready to log in', 'Setup guidance for your device', 'After-sale support and security tips'] } },
      { type: 'callout', data: { title: 'Digital delivery', text: 'Everything is delivered digitally — no shipping, no hardware, no waiting on couriers.' } },
    ],
    features: [
      { title: 'Ready to use', text: 'Accounts come set up and ready to log in on your device.' },
      { title: 'Fast delivery', text: 'Most WeChat accounts are delivered shortly after confirmation.' },
      { title: 'Real support', text: 'We stay available after delivery to help with setup and security.' },
    ],
    faqs: [
      { question: 'How do I receive a WeChat account?', answer: 'We send login details through a secure channel along with setup instructions for your device.' },
      { question: 'Can I use the account on my phone?', answer: 'Yes. We provide guidance for the official WeChat app on iOS and Android.' },
      { question: 'Is it safe?', answer: 'We protect your information and advise on how to keep your account secure.' },
    ],
    priceFrom: 25,
    status: 'PUBLISHED',
    relatedProductIds: [],
    relatedArticleIds: [],
  },
  {
    slug: 'qq-accounts',
    type: 'PRODUCT',
    title: 'QQ Accounts',
    seoTitle: 'Buy QQ Accounts | Surjora',
    seoDescription: 'Verified QQ accounts for messaging, groups and access to Chinese services. Digital delivery with support.',
    h1: 'QQ Accounts',
    shortDescription: 'Verified QQ accounts with QQ Mail and access to services that accept QQ login.',
    description: [
      { type: 'paragraph', data: { text: 'QQ remains one of the most widely used messaging platforms in China. A verified QQ account gives you access to QQ groups, QQ Mail and dozens of Chinese services that accept QQ login.' } },
      { type: 'heading', data: { level: 2, text: 'What you get' } },
      { type: 'list', data: { ordered: false, items: ['Verified QQ account', 'Login details and setup help', 'Access to QQ Mail and linked services'] } },
    ],
    features: [
      { title: 'Widely supported', text: 'Use QQ login across many Chinese platforms and services.' },
      { title: 'Includes QQ Mail', text: 'Comes with access to QQ Mail for verification and communication.' },
      { title: 'Reliable access', text: 'Verified accounts with stable login credentials.' },
    ],
    faqs: [
      { question: 'What can I do with a QQ account?', answer: 'Messaging, groups, QQ Mail, and signing in to many Chinese services that support QQ.' },
      { question: 'Is QQ still used in China?', answer: 'Yes, QQ remains a major platform with hundreds of millions of active users.' },
    ],
    priceFrom: 10,
    status: 'PUBLISHED',
    relatedProductIds: [],
    relatedArticleIds: [],
  },
  {
    slug: 'alipay-accounts',
    type: 'PRODUCT',
    title: 'Alipay Accounts',
    seoTitle: 'Buy Alipay Accounts | Surjora',
    seoDescription: 'Alipay accounts for payments, transfers and access to the Chinese financial ecosystem. Digital delivery.',
    h1: 'Alipay Accounts',
    shortDescription: 'Verified Alipay accounts for payments, transfers and the Chinese financial ecosystem.',
    featured: true,
    description: [
      { type: 'paragraph', data: { text: 'Alipay is the backbone of payments in China. A verified Alipay account lets you send and receive money, pay for goods, and unlock services that depend on the Alipay ecosystem.' } },
      { type: 'heading', data: { level: 2, text: 'What you get' } },
      { type: 'list', data: { ordered: false, items: ['Verified Alipay account', 'Setup and usage guidance', 'Advice on linking payment methods'] } },
    ],
    features: [
      { title: 'Payment ready', text: 'Accounts prepared for transfers and payments in the Alipay ecosystem.' },
      { title: 'Ecosystem access', text: 'Unlock apps and services that rely on Alipay login or payment.' },
      { title: 'Guidance included', text: 'Clear steps for first use and ongoing security.' },
    ],
    faqs: [
      { question: 'Can I link my own payment method?', answer: 'We explain the options available and help you decide what works for your situation.' },
      { question: 'Is Alipay required in China?', answer: 'Alipay is one of the most used payment platforms in China and unlocks many daily services.' },
    ],
    priceFrom: 20,
    status: 'PUBLISHED',
    relatedProductIds: [],
    relatedArticleIds: [],
  },
  {
    slug: 'wecom-accounts',
    type: 'PRODUCT',
    title: 'WeCom Accounts',
    seoTitle: 'Buy WeCom Accounts | Surjora',
    seoDescription: 'WeCom (WeChat Work) accounts for teams, businesses and customer communication in China.',
    h1: 'WeCom Accounts',
    shortDescription: 'WeCom (WeChat Work) accounts for team messaging, customer management and WeChat reach.',
    description: [
      { type: 'paragraph', data: { text: 'WeCom, also known as WeChat Work, is Tencent\u2019s business messaging platform. It lets teams communicate, manage customers and connect with WeChat users directly from one workspace.' } },
      { type: 'heading', data: { level: 2, text: 'What you get' } },
      { type: 'list', data: { ordered: false, items: ['Verified WeCom account', 'Team workspace setup', 'Connection to WeChat users'] } },
    ],
    features: [
      { title: 'Business ready', text: 'Built for teams, customer service and business workflows.' },
      { title: 'WeChat integration', text: 'Reach WeChat users directly through WeCom.' },
      { title: 'Support included', text: 'Help with setup, verification and best practices.' },
    ],
    faqs: [
      { question: 'How is WeCom different from WeChat?', answer: 'WeCom is Tencent\u2019s business platform. It focuses on team communication and customer management.' },
      { question: 'Do I need WeChat to use WeCom?', answer: 'WeCom integrates with WeChat, and we help you connect them if needed.' },
    ],
    priceFrom: 40,
    status: 'PUBLISHED',
    relatedProductIds: [],
    relatedArticleIds: [],
  },
  {
    slug: 'xiaohongshu-accounts',
    type: 'PRODUCT',
    title: 'Xiaohongshu Accounts',
    seoTitle: 'Buy Xiaohongshu (RED) Accounts | Surjora',
    seoDescription: 'Xiaohongshu accounts for content creators and brands reaching Chinese consumers.',
    h1: 'Xiaohongshu Accounts',
    shortDescription: 'Xiaohongshu (RED) accounts for content creators and brands reaching Chinese consumers.',
    featured: true,
    description: [
      { type: 'paragraph', data: { text: 'Xiaohongshu (also called RED) is a leading lifestyle platform where users share reviews, photos and videos. A verified account is the first step to reaching Chinese consumers with content and community.' } },
      { type: 'heading', data: { level: 2, text: 'What you get' } },
      { type: 'list', data: { ordered: false, items: ['Verified Xiaohongshu account', 'Profile setup guidance', 'Content and growth tips'] } },
    ],
    features: [
      { title: 'Content ready', text: 'Start posting product reviews, photos and videos right away.' },
      { title: 'Brand reach', text: 'Reach an audience that actively researches products before buying.' },
      { title: 'Growth advice', text: 'Practical tips for building presence on the platform.' },
    ],
    faqs: [
      { question: 'Who uses Xiaohongshu?', answer: 'Predominantly younger Chinese consumers who research products and lifestyle topics.' },
      { question: 'Can I post from outside China?', answer: 'We provide guidance on accessing and using the platform from abroad.' },
    ],
    priceFrom: 30,
    status: 'PUBLISHED',
    relatedProductIds: [],
    relatedArticleIds: [],
  },
  {
    slug: 'douyin-accounts',
    type: 'PRODUCT',
    title: 'Douyin Accounts',
    seoTitle: 'Buy Douyin Accounts | Surjora',
    seoDescription: 'Douyin (TikTok China) accounts for short video, livestreaming and e-commerce.',
    h1: 'Douyin Accounts',
    shortDescription: 'Douyin (TikTok China) accounts for short video, livestreaming and social commerce.',
    featured: true,
    description: [
      { type: 'paragraph', data: { text: 'Douyin is the Chinese version of TikTok and one of the most influential short-video platforms in the world. A verified account lets you create, stream and sell to a massive Chinese audience.' } },
      { type: 'heading', data: { level: 2, text: 'What you get' } },
      { type: 'list', data: { ordered: false, items: ['Verified Douyin account', 'Creator setup guidance', 'Tips for short video and livestream'] } },
    ],
    features: [
      { title: 'Creator ready', text: 'Post short videos and start building an audience immediately.' },
      { title: 'Livestream support', text: 'Setup help for livestreaming and selling on Douyin.' },
      { title: 'China focused', text: 'Access the domestic Chinese short-video ecosystem.' },
    ],
    faqs: [
      { question: 'Is Douyin the same as TikTok?', answer: 'Douyin is the Chinese version operated for the domestic market, with different features and audience.' },
      { question: 'Can I run ads on Douyin?', answer: 'Yes, and we can advise on getting started with Douyin advertising.' },
    ],
    priceFrom: 35,
    status: 'PUBLISHED',
    relatedProductIds: [],
    relatedArticleIds: [],
  },
  {
    slug: 'taobao-accounts',
    type: 'PRODUCT',
    title: 'Taobao Accounts',
    seoTitle: 'Buy Taobao Accounts | Surjora',
    seoDescription: 'Taobao accounts for shopping and browsing China\u2019s largest consumer marketplace.',
    h1: 'Taobao Accounts',
    shortDescription: 'Verified Taobao accounts to browse and buy across China’s largest consumer marketplace.',
    description: [
      { type: 'paragraph', data: { text: 'Taobao is Alibaba\u2019s massive consumer marketplace. A verified Taobao account lets you browse, compare and purchase from millions of Chinese sellers.' } },
      { type: 'heading', data: { level: 2, text: 'What you get' } },
      { type: 'list', data: { ordered: false, items: ['Verified Taobao account', 'Shopping and payment guidance', 'Tips for dealing with sellers'] } },
    ],
    features: [
      { title: 'Marketplace access', text: 'Browse and buy from millions of Taobao sellers.' },
      { title: 'Local advantage', text: 'Access prices and products available to domestic Chinese buyers.' },
      { title: 'Guidance included', text: 'Help navigating the platform and communicating with sellers.' },
    ],
    faqs: [
      { question: 'Can I pay on Taobao?', answer: 'We explain the payment options available for your situation.' },
      { question: 'Does Taobao ship internationally?', answer: 'Many sellers offer international shipping or forwarders. We can advise on options.' },
    ],
    priceFrom: 15,
    status: 'PUBLISHED',
    relatedProductIds: [],
    relatedArticleIds: [],
  },
  {
    slug: '1688-accounts',
    type: 'PRODUCT',
    title: '1688 Accounts',
    seoTitle: 'Buy 1688 Accounts | Surjora',
    seoDescription: '1688 accounts for wholesale sourcing directly from Chinese manufacturers and suppliers.',
    h1: '1688 Accounts',
    shortDescription: 'Verified 1688 accounts for wholesale sourcing directly from Chinese manufacturers.',
    featured: true,
    description: [
      { type: 'paragraph', data: { text: '1688 is Alibaba\u2019s wholesale marketplace where you deal directly with manufacturers and suppliers. A verified account is the key to sourcing products at wholesale prices.' } },
      { type: 'heading', data: { level: 2, text: 'What you get' } },
      { type: 'list', data: { ordered: false, items: ['Verified 1688 account', 'Sourcing guidance', 'Advice on working with suppliers'] } },
    ],
    features: [
      { title: 'Wholesale access', text: 'Connect directly with Chinese manufacturers and suppliers.' },
      { title: 'Better prices', text: 'Access wholesale pricing not available on retail platforms.' },
      { title: 'Sourcing support', text: 'Practical advice for negotiating and ordering from suppliers.' },
    ],
    faqs: [
      { question: 'What is 1688?', answer: '1688 is Alibaba\u2019s wholesale platform connecting buyers with Chinese manufacturers.' },
      { question: 'Can I order samples?', answer: 'Yes, most suppliers provide samples. We can help you get started.' },
    ],
    priceFrom: 15,
    status: 'PUBLISHED',
    relatedProductIds: [],
    relatedArticleIds: [],
  },
  {
    slug: 'jd-accounts',
    type: 'PRODUCT',
    title: 'JD Accounts',
    seoTitle: 'Buy JD.com Accounts | Surjora',
    seoDescription: 'JD.com accounts for shopping from one of China\u2019s largest online retailers.',
    h1: 'JD Accounts',
    shortDescription: 'Verified JD.com accounts for genuine products and fast fulfillment across the JD ecosystem.',
    description: [
      { type: 'paragraph', data: { text: 'JD.com is one of China\u2019s largest online retailers, known for genuine products and fast fulfillment. A verified JD account unlocks shopping and services across the JD ecosystem.' } },
      { type: 'heading', data: { level: 2, text: 'What you get' } },
      { type: 'list', data: { ordered: false, items: ['Verified JD account', 'Shopping guidance', 'Access to JD services'] } },
    ],
    features: [
      { title: 'Trusted retailer', text: 'Shop on one of China\u2019s most trusted e-commerce platforms.' },
      { title: 'Genuine products', text: 'JD is known for authentic, quality-controlled products.' },
      { title: 'Full access', text: 'Use JD services like PLUS membership and logistics.' },
    ],
    faqs: [
      { question: 'Is JD different from Taobao?', answer: 'JD is a self-operated retailer focused on genuine products and fast delivery, while Taobao is a marketplace.' },
      { question: 'Can I use JD from abroad?', answer: 'We provide guidance on access and fulfillment options.' },
    ],
    priceFrom: 15,
    status: 'PUBLISHED',
    relatedProductIds: [],
    relatedArticleIds: [],
  },
  {
    slug: 'baidu-accounts',
    type: 'PRODUCT',
    title: 'Baidu Accounts',
    seoTitle: 'Buy Baidu Accounts | Surjora',
    seoDescription: 'Baidu accounts for search, cloud storage and the Chinese internet ecosystem.',
    h1: 'Baidu Accounts',
    shortDescription: 'Verified Baidu accounts for search, Baidu Cloud storage and the wider Baidu ecosystem.',
    description: [
      { type: 'paragraph', data: { text: 'Baidu is China\u2019s leading search engine. A verified Baidu account unlocks search personalization, Baidu Cloud storage and access to many services in the Baidu ecosystem.' } },
      { type: 'heading', data: { level: 2, text: 'What you get' } },
      { type: 'list', data: { ordered: false, items: ['Verified Baidu account', 'Access to Baidu Cloud', 'Search and service setup'] } },
    ],
    features: [
      { title: 'Search access', text: 'Use China\u2019s leading search engine with a personal account.' },
      { title: 'Cloud storage', text: 'Access Baidu Cloud (Baidu Pan) for file storage.' },
      { title: 'Ecosystem entry', text: 'Unlock many services that require a Baidu account.' },
    ],
    faqs: [
      { question: 'Why do I need a Baidu account?', answer: 'Many Chinese websites and tools require a Baidu account for full access.' },
      { question: 'What is Baidu Cloud?', answer: 'A popular cloud storage service integrated with Baidu accounts.' },
    ],
    priceFrom: 8,
    status: 'PUBLISHED',
    relatedProductIds: [],
    relatedArticleIds: [],
  },
  {
    slug: 'bilibili-accounts',
    type: 'PRODUCT',
    title: 'Bilibili Accounts',
    seoTitle: 'Buy Bilibili Accounts | Surjora',
    seoDescription: 'Bilibili accounts for video, streaming and the young Chinese internet culture.',
    h1: 'Bilibili Accounts',
    shortDescription: 'Verified Bilibili accounts to watch, comment and create for China’s young video community.',
    description: [
      { type: 'paragraph', data: { text: 'Bilibili is China\u2019s leading video and streaming platform for younger audiences, known for anime, gaming and creator content. A verified account lets you watch, comment and create.' } },
      { type: 'heading', data: { level: 2, text: 'What you get' } },
      { type: 'list', data: { ordered: false, items: ['Verified Bilibili account', 'Creator setup guidance', 'Access to full features'] } },
    ],
    features: [
      { title: 'Full access', text: 'Watch, comment and upload content on Bilibili.' },
      { title: 'Creator ready', text: 'Setup support for starting your own channel.' },
      { title: 'Youth audience', text: 'Reach one of China\u2019s most engaged younger demographics.' },
    ],
    faqs: [
      { question: 'Who uses Bilibili?', answer: 'Primarily young Chinese users interested in anime, gaming and creator content.' },
      { question: 'Can I monetize my Bilibili channel?', answer: 'Yes, Bilibili offers creator monetization. We can advise on eligibility.' },
    ],
    priceFrom: 12,
    status: 'PUBLISHED',
    relatedProductIds: [],
    relatedArticleIds: [],
  },
  {
    slug: 'chinese-phone-numbers',
    type: 'PRODUCT',
    title: 'Chinese Phone Numbers',
    seoTitle: 'Chinese Phone Numbers for Verification | Surjora',
    seoDescription: 'Chinese phone numbers for account verification and receiving SMS from Chinese platforms.',
    h1: 'Chinese Phone Numbers',
    shortDescription: 'Chinese phone numbers to receive SMS verification codes for supported Chinese platforms.',
    featured: true,
    description: [
      { type: 'paragraph', data: { text: 'Many Chinese platforms require a Chinese phone number for registration and verification. We provide Chinese numbers that can receive SMS verification codes for supported services.' } },
      { type: 'heading', data: { level: 2, text: 'What you get' } },
      { type: 'list', data: { ordered: false, items: ['Chinese phone number for verification', 'SMS receiving for supported services', 'Guidance on usage'] } },
    ],
    features: [
      { title: 'Verification ready', text: 'Receive SMS codes for supported Chinese services.' },
      { title: 'Simple setup', text: 'Clear instructions on how to use your number.' },
      { title: 'Flexible', text: 'Available for a range of registration scenarios.' },
    ],
    faqs: [
      { question: 'Can I receive SMS on the number?', answer: 'Yes, for supported services we provide guidance on receiving verification codes.' },
      { question: 'Is this a permanent number?', answer: 'Options depend on your needs. Contact us with your use case.' },
    ],
    priceFrom: 5,
    status: 'PUBLISHED',
    relatedProductIds: [],
    relatedArticleIds: [],
  },
  {
    slug: 'chinese-email-accounts',
    type: 'PRODUCT',
    title: 'Chinese Email Accounts',
    seoTitle: 'Chinese Email Accounts | Surjora',
    seoDescription: 'Chinese email accounts for sign-ups and verification on Chinese platforms.',
    h1: 'Chinese Email Accounts',
    shortDescription: 'Chinese email accounts (such as QQ Mail) ready for sign-ups and platform verification.',
    description: [
      { type: 'paragraph', data: { text: 'Some Chinese platforms prefer or require a domestic email address. We provide Chinese email accounts (such as QQ Mail) ready for sign-ups and verification.' } },
      { type: 'heading', data: { level: 2, text: 'What you get' } },
      { type: 'list', data: { ordered: false, items: ['Chinese email account', 'Access credentials', 'Usage guidance'] } },
    ],
    features: [
      { title: 'Platform friendly', text: 'Works with Chinese services that prefer domestic email.' },
      { title: 'Ready to use', text: 'Login details provided with setup help.' },
      { title: 'Versatile', text: 'Use for sign-ups, verification and communication.' },
    ],
    faqs: [
      { question: 'What email provider is used?', answer: 'Typically QQ Mail or similar Chinese providers.' },
      { question: 'Can I access it from abroad?', answer: 'Yes, with the guidance we provide.' },
    ],
    priceFrom: 5,
    status: 'PUBLISHED',
    relatedProductIds: [],
    relatedArticleIds: [],
  },
  {
    slug: 'wechat-qr-scan',
    type: 'SERVICE',
    title: 'WeChat QR Scan',
    seoTitle: 'WeChat QR Scan Service | Surjora',
    seoDescription: 'WeChat QR scan and account linking service. Get help scanning QR codes and linking accounts.',
    h1: 'WeChat QR Scan',
    shortDescription: 'We complete WeChat QR scans and account linking for you, with step-by-step guidance.',
    featured: true,
    description: [
      { type: 'paragraph', data: { text: 'Certain WeChat features and devices require a QR scan with an active account. Our WeChat QR scan service helps you complete these steps when you need a compatible account to scan with.' } },
      { type: 'heading', data: { level: 2, text: 'What you get' } },
      { type: 'list', data: { ordered: false, items: ['QR scan completed for you', 'Guidance through the process', 'Support for linked devices'] } },
    ],
    features: [
      { title: 'Handled for you', text: 'We complete the QR scan step on your behalf.' },
      { title: 'Clear guidance', text: 'Step-by-step help through the whole process.' },
      { title: 'Device support', text: 'Help connecting WeChat to supported devices.' },
    ],
    faqs: [
      { question: 'What do I need to provide?', answer: 'Usually just details of what you are trying to do. We guide you from there.' },
      { question: 'Is this safe?', answer: 'We keep your information private and explain every step before proceeding.' },
    ],
    priceFrom: 10,
    status: 'PUBLISHED',
    relatedProductIds: [],
    relatedArticleIds: [],
  },
  {
    slug: 'chinese-verification',
    type: 'SERVICE',
    title: 'Chinese Verification',
    seoTitle: 'Chinese Verification Service | Surjora',
    seoDescription: 'Verification services for Chinese platforms. Get verified accounts and services checked.',
    h1: 'Chinese Verification',
    shortDescription: 'Identity and phone verification help to unlock full features on supported Chinese platforms.',
    featured: true,
    description: [
      { type: 'paragraph', data: { text: 'Many Chinese platforms require identity or phone verification to unlock full features. Our verification service helps you complete these requirements for supported platforms.' } },
      { type: 'heading', data: { level: 2, text: 'What you get' } },
      { type: 'list', data: { ordered: false, items: ['Verification completed for supported platforms', 'Guidance on requirements', 'Ongoing support'] } },
    ],
    features: [
      { title: 'Supported platforms', text: 'Help verifying on a range of Chinese platforms.' },
      { title: 'Step by step', text: 'We walk you through exactly what is needed.' },
      { title: 'Reliable', text: 'Clear communication throughout the process.' },
    ],
    faqs: [
      { question: 'What does verification involve?', answer: 'It depends on the platform. Contact us with your goal and we explain the options.' },
      { question: 'Do I need to share personal documents?', answer: 'Only what the platform itself requires. We handle everything transparently.' },
    ],
    priceFrom: 10,
    status: 'PUBLISHED',
    relatedProductIds: [],
    relatedArticleIds: [],
  },
  {
    slug: 'account-assistance',
    type: 'SERVICE',
    title: 'Account Assistance',
    seoTitle: 'Account Assistance Service | Surjora',
    seoDescription: 'Hands-on help with Chinese accounts — setup, recovery, security and best practices.',
    h1: 'Account Assistance',
    shortDescription: 'Hands-on help with setup, recovery, security and best practices for your Chinese accounts.',
    featured: true,
    description: [
      { type: 'paragraph', data: { text: 'Already have an account but need help? Our account assistance service covers setup, recovery, security and best practices for your Chinese platforms.' } },
      { type: 'heading', data: { level: 2, text: 'What you get' } },
      { type: 'list', data: { ordered: false, items: ['Hands-on help with your accounts', 'Setup and recovery guidance', 'Security best practices'] } },
    ],
    features: [
      { title: 'Practical help', text: 'Real assistance with the account issues you face.' },
      { title: 'Setup and recovery', text: 'Help getting accounts working or recovered.' },
      { title: 'Security advice', text: 'Protect your accounts with proven practices.' },
    ],
    faqs: [
      { question: 'What can you help with?', answer: 'Setup, recovery, security, linking services, and general usage questions.' },
      { question: 'How do we start?', answer: 'Tell us your situation through the contact form and we take it from there.' },
    ],
    priceFrom: 10,
    status: 'PUBLISHED',
    relatedProductIds: [],
    relatedArticleIds: [],
  },
  {
    slug: 'custom-requests',
    type: 'SERVICE',
    title: 'Custom Requests',
    seoTitle: 'Custom Requests | Surjora',
    seoDescription: 'Need something specific? Tell us your goal and we will help with tailored digital services.',
    h1: 'Custom Requests',
    shortDescription: 'Tell us your goal and we build a tailored solution for anything not listed on the site.',
    featured: true,
    description: [
      { type: 'paragraph', data: { text: 'Not sure which product or service fits? Tell us what you are trying to achieve and we will help you get there. Custom requests are our specialty.' } },
      { type: 'heading', data: { level: 2, text: 'What you get' } },
      { type: 'list', data: { ordered: false, items: ['Personalized guidance', 'Tailored digital solutions', 'Clear next steps'] } },
    ],
    features: [
      { title: 'Anything tailored', text: 'Solutions built around your specific goal.' },
      { title: 'Expert advice', text: 'We help you figure out the best path forward.' },
      { title: 'No commitment', text: 'Start with a conversation to see how we can help.' },
    ],
    faqs: [
      { question: 'What kind of requests do you handle?', answer: 'Any digital need related to Chinese platforms, accounts and services.' },
      { question: 'How do I make a request?', answer: 'Use the contact form or reach us on Telegram and WhatsApp.' },
    ],
    priceFrom: null,
    status: 'PUBLISHED',
    relatedProductIds: [],
    relatedArticleIds: [],
  },
];

const articles = [
  {
    slug: 'wechat-registration-china-guide',
    title: 'WeChat Registration in China: A Step-by-Step Guide',
    excerpt: 'Everything you need to know about registering a WeChat account in China, from phone number verification to account security.',
    categorySlug: 'guides',
    coverImageId: null,
    readTimeMinutes: 7,
    tags: ['wechat', 'registration', 'guide'],
    publishedAt: '2026-07-10T00:00:00Z',
    status: 'PUBLISHED',
    body: [
      { type: 'paragraph', data: { text: 'WeChat is essential for life in China, but getting started can feel overwhelming. This guide walks through the entire registration process step by step.' } },
      { type: 'heading', data: { level: 2, text: 'What you need before you start' } },
      { type: 'list', data: { ordered: true, items: ['A phone number that can receive SMS', 'A stable internet connection', 'Your government-issued ID for verification'] } },
      { type: 'paragraph', data: { text: 'Once your account is set up, bind a payment method and enable two-factor authentication to keep your account secure.' } },
    ],
    relatedProductSlugs: ['wechat-accounts', 'chinese-phone-numbers', 'wechat-qr-scan'],
  },
  {
    slug: 'why-buy-verified-alipay-account',
    title: 'Why a Verified Alipay Account Matters for Global Businesses',
    excerpt: 'Verified Alipay accounts unlock payments, Alipay+ and merchant tools. Here is why verification changes everything.',
    categorySlug: 'guides',
    coverImageId: null,
    readTimeMinutes: 6,
    tags: ['alipay', 'payments', 'business'],
    publishedAt: '2026-07-05T00:00:00Z',
    status: 'PUBLISHED',
    body: [
      { type: 'paragraph', data: { text: 'A verified Alipay account goes far beyond the basic wallet. For businesses, it is the key to receiving payments, refunds and merchant services inside China.' } },
      { type: 'heading', data: { level: 2, text: 'The verification tiers' } },
      { type: 'list', data: { ordered: false, items: ['Unverified: limited to small payments', 'Basic verification: larger transfers and wallet balance', 'Full verification: merchant features and Alipay+'] } },
      { type: 'paragraph', data: { text: 'Most global users will want at least basic verification. Full verification is ideal for teams doing serious business volume.' } },
    ],
    relatedProductSlugs: ['alipay-accounts', 'chinese-verification'],
  },
  {
    slug: 'douyin-vs-tiktok-differences',
    title: 'Douyin vs TikTok: Key Differences You Should Know',
    excerpt: 'They look similar, but Douyin and TikTok are different products. Learn what changes when you target the Chinese market.',
    categorySlug: 'comparisons',
    coverImageId: null,
    readTimeMinutes: 8,
    tags: ['douyin', 'tiktok', 'comparison'],
    publishedAt: '2026-07-01T00:00:00Z',
    status: 'PUBLISHED',
    body: [
      { type: 'paragraph', data: { text: 'Douyin is the Chinese version of short video, but calling it "TikTok China" misses the point. The two platforms have different content, commerce and advertising ecosystems.' } },
      { type: 'heading', data: { level: 2, text: 'Where they differ' } },
      { type: 'list', data: { ordered: false, items: ['Monetization: Douyin commerce is far deeper', 'Ecosystem: Douyin integrates with the rest of ByteDance', 'Audience: Douyin skews domestic and Mandarin-first'] } },
      { type: 'paragraph', data: { text: 'If your goal is the Chinese consumer, Douyin is where the money moves.' } },
    ],
    relatedProductSlugs: ['douyin-accounts'],
  },
  {
    slug: 'what-is-wecom-wechat-work',
    title: 'What Is WeCom (WeChat Work) and Who Is It For?',
    excerpt: 'WeCom is WeChat for teams. Understand how it differs from personal WeChat and when your business actually needs it.',
    categorySlug: 'faq',
    coverImageId: null,
    readTimeMinutes: 5,
    tags: ['wecom', 'wechat work', 'business'],
    publishedAt: '2026-06-25T00:00:00Z',
    status: 'PUBLISHED',
    body: [
      { type: 'paragraph', data: { text: 'WeCom (WeChat Work) is the enterprise version of WeChat, built for internal communication and connecting your business to the WeChat ecosystem.' } },
      { type: 'heading', data: { level: 2, text: 'Common questions' } },
      { type: 'list', data: { ordered: false, items: ['Can it talk to personal WeChat? Yes, through WeCom.', 'Is it a separate app? Yes, but it shares login tools.', 'Do I need it? Only if you manage a team or customer service in China.'] } },
      { type: 'paragraph', data: { text: 'For most small teams, WeCom is a big upgrade over managing everything through personal WeChat.' } },
    ],
    relatedProductSlugs: ['wecom-accounts'],
  },
  {
    slug: 'how-to-receive-sms-verification-china',
    title: 'How to Receive SMS Verification Codes for Chinese Platforms',
    excerpt: 'Many Chinese platforms require a Chinese phone number for verification. Here is how to get one that works.',
    categorySlug: 'tutorials',
    coverImageId: null,
    readTimeMinutes: 6,
    tags: ['sms', 'verification', 'phone number'],
    publishedAt: '2026-06-20T00:00:00Z',
    status: 'PUBLISHED',
    body: [
      { type: 'paragraph', data: { text: 'Chinese platforms like WeChat, Taobao and Alipay frequently send verification codes to a Chinese phone number. International numbers often do not qualify.' } },
      { type: 'heading', data: { level: 2, text: 'Getting a working number' } },
      { type: 'list', data: { ordered: true, items: ['Use a Chinese phone number for sign-up', 'Keep the number active for future codes', 'Never share verification codes with anyone'] } },
      { type: 'paragraph', data: { text: 'If you only need the account for occasional use, a dedicated verification number is the simplest path.' } },
    ],
    relatedProductSlugs: ['chinese-phone-numbers', 'chinese-verification'],
  },
  {
    slug: 'getting-started-xiaohongshu-content',
    title: 'Getting Started with Xiaohongshu Content Marketing',
    excerpt: 'Xiaohongshu (RED) is China trend lab. Learn the basics of building a content presence on RED.',
    categorySlug: 'tutorials',
    coverImageId: null,
    readTimeMinutes: 9,
    tags: ['xiaohongshu', 'content', 'marketing'],
    publishedAt: '2026-06-15T00:00:00Z',
    status: 'PUBLISHED',
    body: [
      { type: 'paragraph', data: { text: 'Xiaohongshu is where Chinese consumers discover brands. Its blend of search, notes and community makes it a powerful channel for organic growth.' } },
      { type: 'heading', data: { level: 2, text: 'Your first 30 days' } },
      { type: 'list', data: { ordered: false, items: ['Publish consistently, even before you are perfect', 'Research trending keywords in your niche', 'Engage with the community, not just your own posts'] } },
      { type: 'paragraph', data: { text: 'RED rewards authenticity. Jump in and iterate.' } },
    ],
    relatedProductSlugs: ['xiaohongshu-accounts'],
  },
  {
    slug: 'case-study-1688-wholesale-sourcing',
    title: 'Case Study: Sourcing Wholesale Goods on 1688',
    excerpt: 'How a small retailer used a 1688 account to source products directly from Chinese manufacturers at wholesale prices.',
    categorySlug: 'case-studies',
    coverImageId: null,
    readTimeMinutes: 7,
    tags: ['1688', 'sourcing', 'case study'],
    publishedAt: '2026-06-10T00:00:00Z',
    status: 'PUBLISHED',
    body: [
      { type: 'paragraph', data: { text: 'A retailer in Southeast Asia wanted to drop the middleman and buy directly from factories. A verified 1688 account made that possible.' } },
      { type: 'heading', data: { level: 2, text: 'The results' } },
      { type: 'list', data: { ordered: false, items: ['Ordering directly from manufacturers', 'Lower per-unit costs across the catalog', 'Access to a much wider product range'] } },
      { type: 'paragraph', data: { text: 'The key was spending the first two weeks vetting suppliers, then scaling the best-performing categories.' } },
    ],
    relatedProductSlugs: ['1688-accounts', 'account-assistance'],
  },
  {
    slug: 'china-platform-news-2026-midyear',
    title: 'Chinese Platform News: Mid-Year 2026 Roundup',
    excerpt: 'The biggest platform updates across WeChat, Alipay, Douyin and Taobao so far in 2026.',
    categorySlug: 'news',
    coverImageId: null,
    readTimeMinutes: 5,
    tags: ['news', 'roundup', '2026'],
    publishedAt: '2026-06-05T00:00:00Z',
    status: 'PUBLISHED',
    body: [
      { type: 'paragraph', data: { text: 'Chinese platforms continue to evolve quickly. Here are the updates worth tracking this year.' } },
      { type: 'heading', data: { level: 2, text: 'What changed' } },
      { type: 'list', data: { ordered: false, items: ['WeChat deepened WeCom and payment integration', 'Alipay expanded cross-border merchant tools', 'Douyin pushed further into local services'] } },
      { type: 'paragraph', data: { text: 'We will keep this roundup updated as the ecosystem moves.' } },
    ],
    relatedProductSlugs: ['wechat-accounts', 'alipay-accounts', 'douyin-accounts'],
  },
  {
    slug: 'bilibili-vs-other-video-platforms',
    title: 'Bilibili vs Mainstream Video Platforms: Where Do Creators Go?',
    excerpt: 'Bilibili is a niche with a loyal community. See how it compares to Douyin and other video destinations in China.',
    categorySlug: 'comparisons',
    coverImageId: null,
    readTimeMinutes: 6,
    tags: ['bilibili', 'video', 'comparison'],
    publishedAt: '2026-05-30T00:00:00Z',
    status: 'PUBLISHED',
    body: [
      { type: 'paragraph', data: { text: 'Bilibili has a reputation for long-form, community-driven content that is very different from Douyin short-form.' } },
      { type: 'heading', data: { level: 2, text: 'Bilibili vs Douyin' } },
      { type: 'list', data: { ordered: false, items: ['Bilibili: longer videos, deeper community', 'Douyin: short clips, massive reach', 'Both: strong advertising and creator tools'] } },
      { type: 'paragraph', data: { text: 'Creators often run both, using each for a different job.' } },
    ],
    relatedProductSlugs: ['bilibili-accounts', 'douyin-accounts'],
  },
  {
    slug: 'how-to-keep-wechat-account-secure',
    title: 'How to Keep Your WeChat Account Secure',
    excerpt: 'Account takeover is a real risk. These are the security steps every WeChat user should take today.',
    categorySlug: 'faq',
    coverImageId: null,
    readTimeMinutes: 5,
    tags: ['wechat', 'security', 'tips'],
    publishedAt: '2026-05-20T00:00:00Z',
    status: 'PUBLISHED',
    body: [
      { type: 'paragraph', data: { text: 'Your WeChat account is tied to payments, contacts and your digital identity. Protecting it matters.' } },
      { type: 'heading', data: { level: 2, text: 'Security checklist' } },
      { type: 'list', data: { ordered: true, items: ['Enable two-factor authentication', 'Never share verification codes', 'Review active logins regularly', 'Use a strong, unique password'] } },
      { type: 'paragraph', data: { text: 'If you ever lose access, our account assistance service can help you recover it.' } },
    ],
    relatedProductSlugs: ['wechat-accounts', 'account-assistance'],
  },
];

// Cross-sell relations (product slug → related product/service slugs). Grouped by
// use-case so related rows feel curated rather than random.
const productRelations = {
  'wechat-accounts': ['wecom-accounts', 'chinese-phone-numbers', 'wechat-qr-scan'],
  'qq-accounts': ['wechat-accounts', 'chinese-email-accounts'],
  'alipay-accounts': ['taobao-accounts', 'chinese-verification', 'chinese-phone-numbers'],
  'wecom-accounts': ['wechat-accounts', 'account-assistance'],
  'xiaohongshu-accounts': ['douyin-accounts', 'account-assistance'],
  'douyin-accounts': ['xiaohongshu-accounts', 'bilibili-accounts'],
  'taobao-accounts': ['alipay-accounts', '1688-accounts', 'jd-accounts'],
  '1688-accounts': ['taobao-accounts', 'alipay-accounts', 'account-assistance'],
  'jd-accounts': ['taobao-accounts', 'alipay-accounts'],
  'baidu-accounts': ['chinese-email-accounts', 'chinese-phone-numbers'],
  'bilibili-accounts': ['douyin-accounts', 'xiaohongshu-accounts'],
  'chinese-phone-numbers': ['chinese-verification', 'wechat-accounts', 'chinese-email-accounts'],
  'chinese-email-accounts': ['chinese-phone-numbers', 'qq-accounts'],
  'wechat-qr-scan': ['wechat-accounts', 'account-assistance'],
  'chinese-verification': ['chinese-phone-numbers', 'alipay-accounts', 'account-assistance'],
  'account-assistance': ['custom-requests', 'chinese-verification'],
  'custom-requests': ['account-assistance', 'chinese-verification'],
};

async function main() {
  const categoryBySlug = {};
  for (const c of [...categories, ...contentCategories]) {
    const cat = await upsertCategory(c.slug, c.name, c.kind, c.description);
    categoryBySlug[c.slug] = cat.id;
  }

  for (const p of products) {
    const categoryId = categoryBySlug[p.slug];
    if (!categoryId) {
      throw new Error(`Missing category for product ${p.slug}`);
    }
    await upsertProduct({ ...p, categoryId });
  }

  const productBySlug = {};
  const productRows = await prisma.product.findMany({ select: { id: true, slug: true } });
  for (const row of productRows) {
    productBySlug[row.slug] = row.id;
  }

  // Wire related products/services from human-readable slugs → ids so cross-sell
  // blocks are populated out of the box. Kept as a map (rather than a field on each
  // product) so the catalog objects stay focused on content.
  for (const [slug, relatedSlugs] of Object.entries(productRelations)) {
    const relatedIds = relatedSlugs.map((s) => productBySlug[s]).filter(Boolean);
    if (relatedIds.length > 0 && productBySlug[slug]) {
      await prisma.product.update({
        where: { slug },
        data: { relatedProductIds: relatedIds },
      });
    }
  }

  for (const a of articles) {
    const categoryId = categoryBySlug[a.categorySlug];
    if (!categoryId) {
      throw new Error(`Missing category for article ${a.slug}`);
    }
    const relatedProductIds = (a.relatedProductSlugs || []).map((s) => productBySlug[s]).filter(Boolean);
    const { categorySlug, relatedProductSlugs, ...rest } = a;
    await upsertArticle({ ...rest, categoryId, relatedProductIds });
  }

  // Link a few products back to relevant articles (bidirectional internal linking).
  const articleRows = await prisma.article.findMany({ select: { id: true, slug: true } });
  const articleBySlug = {};
  for (const row of articleRows) articleBySlug[row.slug] = row.id;
  const productArticleLinks = {
    'wechat-accounts': ['wechat-registration-china-guide', 'how-to-keep-wechat-account-secure'],
    'alipay-accounts': ['why-buy-verified-alipay-account'],
    'chinese-phone-numbers': ['how-to-receive-sms-verification-china'],
    'xiaohongshu-accounts': ['getting-started-xiaohongshu-content'],
    'douyin-accounts': ['douyin-vs-tiktok-differences'],
    '1688-accounts': ['case-study-1688-wholesale-sourcing'],
    'bilibili-accounts': ['bilibili-vs-other-video-platforms'],
    'wecom-accounts': ['what-is-wecom-wechat-work'],
  };
  for (const [slug, articleSlugs] of Object.entries(productArticleLinks)) {
    const ids = articleSlugs.map((s) => articleBySlug[s]).filter(Boolean);
    if (ids.length > 0 && productBySlug[slug]) {
      await prisma.product.update({ where: { slug }, data: { relatedArticleIds: ids } });
    }
  }

  // Demo testimonials (clearly flagged isDemo). Reset the demo set on each seed so
  // re-seeding stays idempotent; genuine (isDemo:false) testimonials are untouched.
  await prisma.testimonial.deleteMany({ where: { isDemo: true } });
  for (const t of demoTestimonials) {
    await prisma.testimonial.create({ data: t });
  }

  // Settings singleton — safe defaults; contact links still come from env at runtime.
  await prisma.settings.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      siteName: 'Surjora',
      paymentPlaceholder: 'Payments handled manually per order. Payment integration is a later phase.',
      customersServed: 0,
    },
  });

  const featuredCount = products.filter((p) => p.featured).length;
  console.log(
    `Seeded ${categories.length + contentCategories.length} categories, ${products.length} products/services ` +
      `(${featuredCount} featured), ${articles.length} articles, ${demoTestimonials.length} demo testimonials and settings.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
