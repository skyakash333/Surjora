import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';
import { orderSchema } from '@/schema/order';
import { siteConfig } from '@/lib/constants';
import { sendTelegramMessage, sendWhatsappMessage } from '@/lib/channels';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { getClientIp, rateLimit } from '@/lib/rate-limit';

const ORDER_LIMIT = { windowMs: 60_000, max: 3 };

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
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
      { status: 400 },
    );
  }

  const ip = getClientIp(request);

  const limit = await rateLimit(`order:${ip}`, ORDER_LIMIT);
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many requests' },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil(limit.retryAfterMs / 1000)) },
      },
    );
  }

  const input = parsed.data;
  const requestType = input.requestType === 'buy' ? 'quote' : input.requestType;
  const turnstileOk = await verifyTurnstileToken(input.turnstileToken, ip);
  if (!turnstileOk) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
  }

  const reference = generateReference();
  const product = input.productId
    ? await prisma.product.findFirst({
        where: { id: input.productId, status: 'PUBLISHED' },
        select: { id: true, title: true, slug: true, type: true },
      })
    : null;

  if (input.productId && !product) {
    return NextResponse.json({ error: 'The selected product is unavailable' }, { status: 400 });
  }

  const order = await prisma.order.create({
    data: {
      reference,
      customerEmail: input.customerEmail,
      customerTelegram: input.customerTelegram || null,
      customerWhatsapp: input.customerWhatsapp || null,
      productId: input.productId || null,
      productTitle: product?.title ?? null,
      quantity: input.quantity,
      contactPreference: input.contactPreference,
      requestType,
      message: input.message,
      acceptedTermsAt: new Date(),
      status: 'NEW',
    },
  });

  const details = [
    `Reference: ${reference}`,
    `Type: ${requestType}`,
    `Product/service: ${product?.title ?? 'Custom request'}`,
    `Quantity: ${input.quantity}`,
    `Preferred reply: ${input.contactPreference}`,
    `Email: ${input.customerEmail}`,
    `Telegram: ${input.customerTelegram ?? '-'}`,
    `WhatsApp: ${input.customerWhatsapp ?? '-'}`,
    '',
    input.message,
    '',
    `${siteConfig.url}/admin/orders`,
  ].join('\n');

  const apiKey = process.env.RESEND_API_KEY;
  const resend = apiKey ? new Resend(apiKey) : null;
  let emailSent = false;
  if (resend) {
    try {
      const result = await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL ?? 'Wechatscan <contact@wechatscan.online>',
        to: [process.env.CONTACT_TO_EMAIL ?? 'contact@wechatscan.online'],
        reply_to: input.customerEmail,
        subject: `Wechatscan availability request ${reference}: ${product?.title ?? 'Custom request'}`,
        text: details,
      });
      if (result.error) {
        console.error('Resend error:', result.error);
      } else {
        emailSent = true;
      }
    } catch (error) {
      console.error('Resend error:', error);
    }
  }

  const telegramSent = await sendTelegramMessage(`New Wechatscan request ${reference}\n\n${details}`);
  const whatsappSent = await sendWhatsappMessage(`New Wechatscan request ${reference}\n\n${details}`);

  if (resend) {
    try {
      const result = await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL ?? 'Wechatscan <contact@wechatscan.online>',
        to: [input.customerEmail],
        subject: `We received your Wechatscan request ${reference}`,
        text: [
          'Thanks for contacting Wechatscan.',
          '',
          `Reference: ${reference}`,
          `Product/service: ${product?.title ?? 'Custom request'}`,
          `Quantity: ${input.quantity}`,
          '',
          'We will review availability and reply with the exact scope, final price, delivery estimate and available payment method.',
          'No purchase or payment is confirmed by this request.',
          '',
          `Support: ${siteConfig.email}`,
        ].join('\n'),
      });
      if (result.error) {
        console.error('Customer acknowledgement email error:', result.error);
      }
    } catch (error) {
      console.error('Customer acknowledgement email error:', error);
    }
  }

  // If no notification channel is configured, keep the submission visible in logs
  // so it is never silently dropped.
  if (!emailSent && !telegramSent && !whatsappSent) {
    console.log(`[orders] No notification channel configured. Order ${reference}:\n\n${details}`);
  }

  return NextResponse.json({ ok: true, reference }, { status: 201 });
}
