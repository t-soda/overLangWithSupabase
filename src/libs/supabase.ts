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
    .from("langs_with_name")
    .select("*")
    .order("created_at");
  if (!error && data) {
    return data;
  }
  return [];
};

export const getMyLangs = async (name: string | string[] | undefined) => {
  const { data, error } = await client
    .from("langs_with_name")
    .select("*")
    .eq("name", name);
  if (!error && data) {
    return data;
  }
  return [];
};

export const getLangs = async (name: string | string[] | undefined) => {
  const { data, error } = await client
    .from("langs_with_name")
    .select("*")
    .eq("name", name);
  if (!error && data) {
    return data;
  }
  return [];
};

export const getLang = async (id: string | string[] | undefined) => {
  const { data, error } = await client
    .from("langs")
    .select("*")
    .eq("id", id)
    .single();
  if (!error && data) {
    return data;
  }
  return;
};

export const getProfile = async (usersId: string) => {
  const { data, error } = await client
    .from("profiles")
    .select("*")
    .eq("users_id", usersId)
    .single();
  if (!error && data) {
    return data;
  }
};

export const getUserId = async (user_name: string | string[] | undefined) => {
  const { data, error } = await client
    .from("profiles")
    .select("*")
    .eq("user_name", user_name)
    .single();
  if (!error && data) {
    return data;
  }
};

export const getIsFollowed = async (
  followingId: number | null,
  followedId: number | null
) => {
  const { data, error } = await client
    .from("follows")
    .select("*")
    .eq("following", followingId)
    .eq("followed", followedId)
    .single();
  if (!error && data) {
    return data;
  }
};
