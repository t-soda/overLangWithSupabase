import { createClient } from "@supabase/supabase-js";
import { Lang } from "src/pages/index";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!SUPABASE_URL) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
}
if (!SUPABASE_KEY) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_KEY");
}

export const client = createClient(SUPABASE_URL, SUPABASE_KEY);

export const getEveryLangs = async (page: number) => {
  const { data, error } = await client
    .from("langs_with_name")
    .select("*")
    .order("created_at")
    .range(page * 10, page * 10 + 9);
  if (!error && data) {
    return data;
  }
  return [];
};

export const getMyLangs = async (
  users_id: string,
  follows: string[],
  page: number
) => {
  const { data, error } = await client
    .from("langs_with_name")
    .select("*")
    .in("users_id", [users_id, ...follows])
    .order("created_at", { ascending: false })
    .range(page * 10, page * 10 + 9);
  if (!error && data) {
    return data;
  }
  return [];
};

export const getUserLangs = async (name: string | string[] | undefined) => {
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

export const getUserId = async (name: string | string[] | undefined) => {
  const { data, error } = await client
    .from("profiles")
    .select("*")
    .eq("name", name)
    .single();
  if (!error && data) {
    return data;
  }
};

export const getIsFollowed = async (followId: string, followedId: string) => {
  const { data, error } = await client
    .from("follows")
    .select("*")
    .eq("follow_users_id", followId)
    .eq("followed_users_id", followedId)
    .single();
  if (!error && data) {
    return data;
  }
};

export const getFollows = async (followId: string) => {
  const { data, error } = await client
    .from("follows")
    .select("followed_users_id")
    .eq("follow_users_id", followId);
  if (!error && data) {
    const follows = data.map((value) => {
      return value.followed_users_id;
    });
    return follows;
  }
  return [];
};
