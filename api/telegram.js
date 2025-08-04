// api/telegram.js

global.latestCommandStore = global.latestCommandStore || {};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    const body = req.body;

    const chatId = body?.message?.chat?.id?.toString();
    const text = body?.message?.text?.trim();

    if (!chatId || !text) {
      return res.status(400).json({ error: "Invalid Telegram message format" });
    }

    // Save the command
    global.latestCommandStore[chatId] = text;

    console.log(`[Telegram] Command from ${chatId}: ${text}`);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error handling telegram webhook:", err);
    return res.status(500).json({ error: err.message });
  }
}
