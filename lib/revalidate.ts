import { revalidatePath } from 'next/cache';

export function revalidatePage(path: string): void {
  revalidatePath(path, 'page');
}
