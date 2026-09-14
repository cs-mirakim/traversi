/**
 * Supabase Client Helper (Placeholder / Ready for Keys)
 * Team member Moi can add real credentials into .env.local
 */

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

// In-memory mock cache for hackathon demo if Supabase keys are not yet inserted
const mockSearchCache: SearchLog[] = [];

export async function logSearchToSupabase(search: SearchLog) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("xxx")) {
      // Mock fallback
      mockSearchCache.push({ ...search, created_at: new Date().toISOString() });
      return { success: true, cachedLocally: true };
    }

    // When real keys exist:
    // const { createClient } = await import('@supabase/supabase-js');
    // const supabase = createClient(supabaseUrl, supabaseKey);
    // await supabase.from('searches').insert([search]);
    return { success: true };
  } catch (err) {
    console.warn("Supabase log notice:", err);
    return { success: false };
  }
}
