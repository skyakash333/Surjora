import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { settingsSchema } from '@/schema/settings';

function isConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!isConfigured()) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = settingsSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const input = parsed.data;
  const data = {
    siteName: input.siteName,
    contactEmail: input.contactEmail || null,
    telegramUrl: input.telegramUrl || null,
    whatsappUrl: input.whatsappUrl || null,
    paymentPlaceholder: input.paymentPlaceholder || null,
    customersServed: input.customersServed ?? 0,
  };

  await prisma.settings.upsert({
    where: { id: 'singleton' },
    update: data,
    create: { id: 'singleton', ...data },
  });

  revalidatePath('/', 'layout');

  return NextResponse.json({ ok: true }, { status: 200 });
}
