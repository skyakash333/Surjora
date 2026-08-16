import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { AdminNav } from '@/components/admin/admin-nav';
import { SignOutButton } from '@/components/admin/sign-out-button';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  return (
    <div className="min-h-screen bg-ink-50">
      <header className="sticky top-0 z-40 border-b border-ink-200 bg-white">
        <div className="container flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-lg font-bold tracking-tight text-ink-900">
              Wechatscan Admin
            </Link>
            <AdminNav />
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-ink-600 hover:text-brand-600">
              View site →
            </Link>
            <SignOutButton />
          </div>
        </div>
      </header>
      <main className="container py-10">{children}</main>
    </div>
  );
}
