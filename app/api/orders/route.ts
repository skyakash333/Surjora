import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';
import { orderSchema } from '@/schema/order';
import { siteConfig } from '@/lib/constants';
import { sendTelegramMessage, sendWhatsappMessage } from '@/lib/channels';
import { verifyTurnstileToken } from '@/lib/turnstile';

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 3;
const recent = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (timestamps.length >= MAX_REQUESTS) {
    return true;
  }
  timestamps.push(now);
  recent.set(ip, timestamps);
  return false;
}

function generateReference(): string {
  const now = new Date();
  const yymmdd = `${now.getUTCFullYear().toString().slice(2)}${String(now.getUTCMonth() + 1).padStart(2, '0')}${String(now.getUTCDate()).padStart(2, '0')}`;
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SRJ-${yymmdd}-${suffix}`;
}

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const input = parsed.data;
  const turnstileOk = await verifyTurnstileToken(input.turnstileToken, ip);
  if (!turnstileOk) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
  }

  const reference = generateReference();

  const order = await prisma.order.create({
    data: {
      reference,
      customerEmail: input.customerEmail,
      customerTelegram: input.customerTelegram || null,
      customerWhatsapp: input.customerWhatsapp || null,
      productId: input.productId || null,
      requestType: input.requestType,
      message: input.message,
      status: 'NEW',
    },
  });

  const details = [
    `Reference: ${reference}`,
    `Type: ${input.requestType}`,
    `Email: ${input.customerEmail}`,
    `Telegram: ${input.customerTelegram ?? '-'}`,
    `WhatsApp: ${input.customerWhatsapp ?? '-'}`,
    '',
    input.message,
    '',
    `${siteConfig.url}/admin/orders`,
  ].join('\n');

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL ?? 'Surjora <contact@surjora.com>',
        to: [process.env.CONTACT_TO_EMAIL ?? 'contact@surjora.com'],
        reply_to: input.customerEmail,
        subject: `Surjora quote request ${reference}`,
        text: details,
      });
    } catch (error) {
      console.error('Resend error:', error);
    }
  }

  await sendTelegramMessage(`New Surjora order ${reference}\n\n${details}`);
  await sendWhatsappMessage(`New Surjora order ${reference}\n\n${details}`);

  return NextResponse.json({ ok: true, reference }, { status: 201 });
}
