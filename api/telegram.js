// api/telegram.js

import { supabase } from '../lib/supabaseClient.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const body = req.body;

    const chatId = body?.message?.chat?.id?.toString();
    const text = body?.message?.text?.trim();

    if (!chatId || !text) {
      return res.status(400).json({ error: 'Invalid Telegram message format' });
    }

    // Store command in Supabase
    const { error } = await supabase.from('commands').insert([
      {
        chat_id: chatId,
        command: text,
      },
    ]);

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: 'Failed to save command' });
    }

    console.log(`[Telegram] Saved command from ${chatId}: ${text}`);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: err.message });
  }
}
