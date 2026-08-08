import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const auth = request.headers.get('x-revalidate-secret');

  if (!secret || auth !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');

  if (!path || !path.startsWith('/')) {
    return NextResponse.json({ error: 'Missing or invalid path' }, { status: 400 });
  }

  revalidatePath(path, 'page');
  return NextResponse.json({ ok: true, revalidated: path });
}
