import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!SUPABASE_URL) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
}
if (!SUPABASE_KEY) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_KEY");
}

export const client = createClient(SUPABASE_URL, SUPABASE_KEY);

export const getAnyLangs = async () => {
  const { data, error } = await client
    .from("langs2onprofiles")
    .select("*")
    .order("created_at");
  if (!error && data) {
    console.log(data);
    return data;
  }
  return [];
};

export const getLangs = async (id: string | string[] | undefined) => {
  const { data, error } = await client
    .from("langs2onprofiles")
    .select("*")
    .eq("user_name", id);
  if (!error && data) {
    console.log(data);
    return data;
  }
  return [];
};

export const getLang = async (id: string | string[] | undefined) => {
  const { data, error } = await client
    .from("langs2")
    .select("*")
    .eq("id", id)
    .single();
  if (!error && data) {
    return data;
  }
  return;
};

export const getProfile = async (user_id: string) => {
  const { data, error } = await client
    .from("profiles")
    .select("*")
    .eq("user_id", user_id);
  if (!error && data) {
    return data[0];
  }
};
