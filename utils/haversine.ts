/**
 * Calculate distance in meters between two geographic points using the Haversine formula
 */
export function metersBetween(
  point1: { lat: number; lng: number } | null,
  point2: { lat: number; lng: number } | null
): number {
  if (!point1 || !point2) return Infinity;

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371000; // Earth's radius in meters

  const dLat = toRad(point2.lat - point1.lat);
  const dLng = toRad(point2.lng - point1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(point1.lat)) *
      Math.cos(toRad(point2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in meters
}

/**
 * Calculate distance in kilometers between two geographic points
 */
export function kilometersBetween(
  point1: { lat: number; lng: number } | null,
  point2: { lat: number; lng: number } | null
): number {
  return metersBetween(point1, point2) / 1000;
}
