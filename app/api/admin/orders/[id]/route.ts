import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { orderStatuses } from '@/schema/order';

const statusSchema = z.object({
  status: z.enum(orderStatuses),
  quotedPrice: z.coerce.number().min(0).max(1_000_000).nullable().optional(),
  internalNotes: z.string().trim().max(5000).nullable().optional(),
});

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = statusSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid request update' },
      { status: 400 },
    );
  }

  try {
    await prisma.order.update({
      where: { id: params.id },
      data: {
        status: parsed.data.status,
        quotedPrice: parsed.data.quotedPrice,
        internalNotes: parsed.data.internalNotes,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  revalidatePath('/admin/orders', 'page');
  return NextResponse.json({ ok: true }, { status: 200 });
}
