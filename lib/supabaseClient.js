// lib/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bubmwzagkwpjrgvkttgg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1Ym13emFna3dwanJndmt0dGdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMDY0MDksImV4cCI6MjA2OTg4MjQwOX0.LooivkbifPhztsU2ke6D2ifDQtl6e4g-iyn_CQUmUnE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

