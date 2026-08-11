import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { categorySchema } from '@/schema/category';
import { slugify } from '@/lib/slug';

function isConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

async function requireSession() {
  const session = await getServerSession(authOptions);
  return Boolean(session);
}

export async function POST(request: Request) {
  if (!(await requireSession())) {
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

  const parsed = categorySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const input = parsed.data;
  const slug = slugify(input.slug);

  const data = {
    slug,
    name: input.name,
    kind: input.kind,
    description: input.description || null,
    seoTitle: input.seoTitle || null,
  };

  const existing = await prisma.category.findUnique({ where: { slug } });
  await (existing
    ? prisma.category.update({ where: { slug }, data })
    : prisma.category.create({ data }));

  revalidatePath('/admin/categories', 'page');
  revalidatePath('/knowledge', 'page');

  return NextResponse.json({ ok: true, slug }, { status: 200 });
}

export async function DELETE(request: Request) {
  if (!(await requireSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!isConfigured()) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const counts = await prisma.category.findUnique({
    where: { id },
    select: { _count: { select: { products: true, articles: true } } },
  });

  if (!counts) {
    return NextResponse.json({ error: 'Category not found' }, { status: 404 });
  }

  if (counts._count.products > 0 || counts._count.articles > 0) {
    return NextResponse.json(
      { error: 'Cannot delete a category that still has products or articles assigned.' },
      { status: 409 },
    );
  }

  await prisma.category.delete({ where: { id } });

  revalidatePath('/admin/categories', 'page');

  return NextResponse.json({ ok: true }, { status: 200 });
}
