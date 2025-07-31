import axios from 'axios';

export default async function handler(req, res) {
  const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).send('Text message is required');
  }

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await axios.post(url, {
      chat_id: CHAT_ID,
      text,
    });
    return res.status(200).json({ success: true, result: response.data });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}