import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!SUPABASE_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_KEY');
}

export const client = createClient(SUPABASE_URL, SUPABASE_KEY);

export const getAnyLangs = async () => {
  const { data, error } = await client
    .from('langs')
    .select('*')
    .order('created_at');
  if (!error && data) {
    return data;
  }
  return [];
};

export const getLangs = async (id: string | string[] | undefined) => {
  const { data, error } = await client
    .from('langs')
    .select('*')
    .eq('user_id', id)
    .order('created_at');
  if (!error && data) {
    return data;
  }
  return [];
};

export const getProfile = async () => {
  const { data, error } = await client.from('profile').select('*');
  if (!error && data) {
    return data[0];
  }
};
