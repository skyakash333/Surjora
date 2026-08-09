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

export async function sendTelegramMessage(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return false;

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function sendWhatsappMessage(text: string): Promise<boolean> {
  // WhatsApp Business Cloud API notification — enabled when WHATSAPP_NUMBER + token are set.
  const to = process.env.WHATSAPP_NUMBER;
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  if (!to || !token || !phoneId) return false;

  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${phoneId}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to,
          type: 'text',
          text: { body: text },
        }),
      },
    );
    return response.ok;
  } catch {
    return false;
  }
}
