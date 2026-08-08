export function telegramUrl(usernameOrHandle?: string | null): string | null {
  if (!usernameOrHandle) return null;
  return `https://t.me/${usernameOrHandle.replace(/^@/, '')}`;
}

export function whatsappUrl(phoneNumber?: string | null): string | null {
  if (!phoneNumber) return null;
  const digits = phoneNumber.replace(/\D/g, '');
  if (!digits) return null;
  return `https://wa.me/${digits}`;
}
