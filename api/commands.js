// api/commands.js

import { supabase } from '../lib/supabaseClient.js';

export default async function handler(req, res) {
  const chatId = req.query.chat_id;

  if (!chatId) {
    return res.status(400).json({ error: 'Missing chat_id' });
  }

  try {
    // Get the latest command for this chat_id
    const { data, error: fetchError } = await supabase
      .from('commands')
      .select('id, command')
      .eq('chat_id', chatId)
      .order('id', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (fetchError) {
      console.error('Fetch error:', fetchError);
      return res.status(500).json({ error: 'Failed to fetch command' });
    }

    const command = data?.command || '';

    if (data?.id) {
      // Delete the command after reading it
      const { error: deleteError } = await supabase
        .from('commands')
        .delete()
        .eq('id', data.id);

      if (deleteError) {
        console.warn('Delete failed (not critical):', deleteError);
      }
    }

    res.status(200).json({ command });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: err.message });
  }
}
