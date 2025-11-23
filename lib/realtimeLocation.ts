import { supabase } from "../utils/supabase";

export type LocationUpdate = {
  user_id: string;
  lat: number;
  lng: number;
  heading?: number;
  speed?: number;
};

/**
 * Upsert the current user's location into the realtime_location table
 */
export async function upsertMyLocation(update: LocationUpdate): Promise<void> {
  const { error } = await supabase.from("realtime_location").upsert(
    {
      user_id: update.user_id,
      latitude: update.lat,
      longitude: update.lng,
      heading: update.heading ?? null,
      speed: update.speed ?? null,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "user_id",
    }
  );

  if (error) {
    throw new Error(`Failed to update location: ${error.message}`);
  }
}

/**
 * Get the realtime location for a specific user
 */
export async function getUserLocation(userId: string): Promise<{
  latitude: number;
  longitude: number;
  heading: number | null;
  speed: number | null;
  updated_at: string;
} | null> {
  const { data, error } = await supabase
    .from("realtime_location")
    .select("latitude, longitude, heading, speed, updated_at")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.warn(`Failed to fetch location for user ${userId}:`, error.message);
    return null;
  }

  return data;
}
