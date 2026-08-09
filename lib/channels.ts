let warnedTelegramPartial = false;
let warnedWhatsappPartial = false;

export async function sendTelegramMessage(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // A channel that is only partially configured would fail silently — make it loud.
  if ((token && !chatId) || (!token && chatId)) {
    if (!warnedTelegramPartial) {
      warnedTelegramPartial = true;
      console.error(
        '[channels] Telegram misconfiguration: both TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are required. Order notifications are disabled.',
      );
    }
    return false;
  }

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

  // A partially configured channel fails silently — make it loud.
  if (to && (!token || !phoneId)) {
    if (!warnedWhatsappPartial) {
      warnedWhatsappPartial = true;
      console.error(
        '[channels] WhatsApp misconfiguration: WHATSAPP_NUMBER requires WHATSAPP_TOKEN and WHATSAPP_PHONE_ID. Order notifications are disabled.',
      );
    }
    return false;
  }

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
