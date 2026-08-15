import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactSchema } from '@/schema/contact';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { getClientIp, rateLimit } from '@/lib/rate-limit';

const CONTACT_LIMIT = { windowMs: 60_000, max: 3 };

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (
    typeof body === 'object' &&
    body !== null &&
    'website' in body &&
    (body as { website?: string }).website
  ) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const ip = getClientIp(request);

  const limit = await rateLimit(`contact:${ip}`, CONTACT_LIMIT);
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'Too many requests' },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil(limit.retryAfterMs / 1000)) },
      },
    );
  }

  const turnstileToken =
    typeof body === 'object' && body !== null
      ? (body as { turnstileToken?: string }).turnstileToken
      : undefined;

  const turnstileOk = await verifyTurnstileToken(turnstileToken, ip);
  if (!turnstileOk) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
  }

  const { name, email, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? 'Surjora <contact@surjora.com>',
      to: [process.env.CONTACT_TO_EMAIL ?? 'contact@surjora.com'],
      reply_to: email,
      subject: `Surjora contact form — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });
    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
    }
  } else if (process.env.NODE_ENV !== 'production') {
    console.log('Contact submission (no RESEND_API_KEY):', { name, email, message });
  } else {
    return NextResponse.json(
      { error: 'Email delivery is not configured. Please use a direct contact channel.' },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
