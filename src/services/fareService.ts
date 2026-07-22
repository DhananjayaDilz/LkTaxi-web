import type { VehicleType } from "@/types/booking";

export const vehicleRates: Record<VehicleType, number> = {
  Wagonr: 120,
  Sedan: 140,
  "Mini van": 150,
  KDH: 200,
  "KDH High roof": 230,
};

export function calculateFare(distanceKm: number, vehicleType: VehicleType): number {
  return Math.round(distanceKm * vehicleRates[vehicleType]);
}

export function formatDistance(distanceKm: number): string {
  return `${Math.round(distanceKm)} km`;
}

export function formatDuration(durationMinutes: number): string {
  const roundedMinutes = Math.max(0, Math.round(durationMinutes));
  const hours = Math.floor(roundedMinutes / 60);
  const minutes = roundedMinutes % 60;

  if (hours === 0) {
    return `${minutes} min`;
  }

  return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}min`;
}