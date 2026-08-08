'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function DeleteArticleButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete article "${slug}"? This cannot be undone.`)) return;
    setLoading(true);

    const response = await fetch(`/api/admin/articles/${slug}`, { method: 'DELETE' });

    setLoading(false);

    if (!response.ok) {
      alert('Failed to delete article.');
      return;
    }

    router.refresh();
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-red-600 hover:text-red-700"
      onClick={handleDelete}
      disabled={loading}
    >
      Delete
    </Button>
  );
}
