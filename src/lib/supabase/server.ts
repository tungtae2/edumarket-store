import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

// For use in Server Components only
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-anon-key';

  return createClient<Database>(supabaseUrl, supabaseAnonKey);
}
