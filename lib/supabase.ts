import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder") &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project")
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SearchLog {
  id?: string;
  budget: number;
  days: number;
  vibe: string;
  pax: number;
  origin: string;
  created_at?: string;
}

export interface CachedDestination {
  city: string;
  country: string;
  flight_price_rm: number;
  hotel_per_night_rm: number;
  food_per_day_rm: number;
  visa_free_for_my: boolean;
  halal_score: string;
}

// In-memory mock cache fallback
const mockSearchCache: SearchLog[] = [];

export async function logSearchToSupabase(search: SearchLog) {
  try {
    if (!isSupabaseConfigured) {
      mockSearchCache.push({ ...search, created_at: new Date().toISOString() });
      return { success: true, cachedLocally: true };
    }

    const { error } = await supabase.from("searches").insert([search]);
    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.warn("Supabase log notice:", err);
    mockSearchCache.push({ ...search, created_at: new Date().toISOString() });
    return { success: true, fallback: true };
  }
}

/**
 * Trigger Google OAuth 2.0 Sign In or Sign Up via Supabase
 */
export async function signInWithGoogle(mode: "login" | "register" = "login") {
  const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
  
  if (typeof window !== "undefined") {
    localStorage.setItem("traversi_auth_mode", mode);
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback?mode=${mode}`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.error("Google auth error:", error.message);
    throw error;
  }

  return data;
}

/**
 * Sign Out
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Sign out error:", error.message);
    throw error;
  }
}

// ==============================================================================
// 3NF Database Helpers (Profiles, Starred, History, Audit Logs)
// ==============================================================================

/**
 * Fetch user profile from 3NF public.profiles table
 */
export async function fetchProfileFromDb(userId: string) {
  try {
    if (!isSupabaseConfigured) return null;
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (err) {
    console.warn("fetchProfileFromDb notice:", err);
    return null;
  }
}

/**
 * Fetch starred destinations from 3NF public.user_starred_destinations junction table
 */
export async function fetchUserStarredFromDb(userId: string): Promise<string[]> {
  try {
    if (!isSupabaseConfigured) return [];
    const { data, error } = await supabase
      .from("user_starred_destinations")
      .select("destination_id")
      .eq("user_id", userId);

    if (error) throw error;
    return (data || []).map((row: any) => row.destination_id);
  } catch (err) {
    console.warn("fetchUserStarredFromDb notice:", err);
    return [];
  }
}

/**
 * Toggle starred destination in 3NF public.user_starred_destinations table
 */
export async function toggleStarInDb(userId: string, destinationId: string, shouldStar: boolean) {
  try {
    if (!isSupabaseConfigured) return;
    if (shouldStar) {
      await supabase.from("user_starred_destinations").upsert({
        user_id: userId,
        destination_id: destinationId,
        starred_at: new Date().toISOString(),
      });
    } else {
      await supabase
        .from("user_starred_destinations")
        .delete()
        .eq("user_id", userId)
        .eq("destination_id", destinationId);
    }
  } catch (err) {
    console.warn("toggleStarInDb notice:", err);
  }
}

/**
 * Record authentication audit log in 3NF public.user_auth_logs table
 */
export async function logAuthEventToDb(
  userId: string,
  email: string,
  action: "SIGN_UP" | "SIGN_IN" | "ACCOUNT_DELETED"
) {
  try {
    if (!isSupabaseConfigured) return;
    await supabase.from("user_auth_logs").insert([
      {
        user_id: userId,
        email: email.toLowerCase().trim(),
        action,
        provider: "google",
      },
    ]);
  } catch (err) {
    console.warn("logAuthEventToDb notice:", err);
  }
}

