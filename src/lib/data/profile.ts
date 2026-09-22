import { createClient } from "@/lib/supabase/server";
import type { Profile, Address } from "@/types/domain";

// ---------------------------------------------------------------------------
// Supabase availability check
// ---------------------------------------------------------------------------

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !!url && url !== "your-project-url" && !url.includes("placeholder");
}

// ---------------------------------------------------------------------------
// Data-fetching functions
// ---------------------------------------------------------------------------

/**
 * Return the profile for a given user ID.
 * Returns null when Supabase is not configured or the profile doesn't exist.
 */
export async function getUserProfile(
  userId: string,
): Promise<Profile | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error || !data) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

/**
 * Return all delivery addresses for a given user, ordered with the
 * default address first.
 */
export async function getUserAddresses(
  userId: string,
): Promise<Address[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("profile_id", userId)
      .order("is_default", { ascending: false })
      .order("created_at", { ascending: false });

    if (error || !data) {
      return [];
    }

    return data;
  } catch {
    return [];
  }
}
