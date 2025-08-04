// api/commands.js

global.latestCommandStore = global.latestCommandStore || {};

export default function handler(req, res) {
  const chatId = req.query.chat_id;

  if (!chatId) {
    return res.status(400).json({ error: "Missing chat_id" });
  }

  const command = global.latestCommandStore[chatId] || "";

  // Clear the command after delivering it (so it's only read once)
  delete global.latestCommandStore[chatId];

  res.status(200).json({ command });
}
