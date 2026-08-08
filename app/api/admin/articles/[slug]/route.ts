import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  try {
    await prisma.article.delete({ where: { slug: params.slug } });
  } catch {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }

  revalidatePath('/knowledge', 'page');
  return NextResponse.json({ ok: true }, { status: 200 });
}
