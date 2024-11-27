import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase credentials. Please make sure VITE_SUPABASE_URL and VITE_SUPABASE_KEY are set in your .env file.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);