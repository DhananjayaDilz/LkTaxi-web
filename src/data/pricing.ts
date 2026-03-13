export const WHATSAPP_NUMBER = "94705000526";

const locationCoordinates: Record<string, { lat: number; lng: number }> = {
  "Colombo": { lat: 6.9271, lng: 79.8612 },
  "Airport (BIA)": { lat: 7.1808, lng: 79.8841 },
  "Kandy": { lat: 7.2906, lng: 80.6337 },
  "Galle": { lat: 6.0535, lng: 80.221 },
  "Ella": { lat: 6.8667, lng: 81.0466 },
  "Sigiriya": { lat: 7.957, lng: 80.7603 },
  "Nuwara Eliya": { lat: 6.9497, lng: 80.7891 },
  "Mirissa": { lat: 5.9485, lng: 80.4588 },
  "Trincomalee": { lat: 8.5874, lng: 81.2152 },
  "Jaffna": { lat: 9.6615, lng: 80.0255 },
  "Anuradhapura": { lat: 8.3114, lng: 80.4037 },
  "Polonnaruwa": { lat: 7.9403, lng: 81.0188 },
  "Dambulla": { lat: 7.8567, lng: 80.6517 },
  "Bentota": { lat: 6.4253, lng: 79.9956 },
  "Hikkaduwa": { lat: 6.1407, lng: 80.1018 },
  "Unawatuna": { lat: 6.0104, lng: 80.249 },
  "Tissamaharama": { lat: 6.2792, lng: 81.2897 },
  "Yala": { lat: 6.3725, lng: 81.5185 },
  "Arugam Bay": { lat: 6.8404, lng: 81.8368 },
  "Negombo": { lat: 7.2083, lng: 79.8358 },
};

export const tourPricing: Record<string, number> = {
  KDH: 24000,
  SEDAN: 13000,
};

export const locations = [
  "Colombo",
  "Airport (BIA)",
  "Kandy",
  "Galle",
  "Ella",
  "Sigiriya",
  "Nuwara Eliya",
  "Mirissa",
  "Trincomalee",
  "Jaffna",
  "Anuradhapura",
  "Polonnaruwa",
  "Dambulla",
  "Bentota",
  "Hikkaduwa",
  "Unawatuna",
  "Tissamaharama",
  "Yala",
  "Arugam Bay",
  "Negombo",
];

export const countries = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria", "Bangladesh",
  "Belgium", "Brazil", "Canada", "China", "Colombia", "Czech Republic", "Denmark",
  "Egypt", "Finland", "France", "Germany", "Greece", "Hungary", "India", "Indonesia",
  "Iran", "Iraq", "Ireland", "Israel", "Italy", "Japan", "Kenya", "Malaysia", "Mexico",
  "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan", "Philippines", "Poland",
  "Portugal", "Romania", "Russia", "Saudi Arabia", "Singapore", "South Africa", "South Korea",
  "Spain", "Sri Lanka", "Sweden", "Switzerland", "Thailand", "Turkey", "UAE", "UK",
  "Ukraine", "USA", "Vietnam",
];

export const vehicles = ["MINI CAR", "SEDAN", "KDH", "KDH HIGHROOF"] as const;
export type VehicleType = (typeof vehicles)[number];

export const vehicleRatePerKm: Record<VehicleType, number> = {
  "MINI CAR": 60,
  "SEDAN": 120,
  "KDH": 180,
  "KDH HIGHROOF": 200,
};

export type RideFare = {
  distanceKm: number;
  ratePerKm: number;
  price: number;
};

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function getEstimatedDistanceKm(pickup: string, drop: string): number | null {
  const start = locationCoordinates[pickup];
  const end = locationCoordinates[drop];
  if (!start || !end || pickup === drop) return null;

  const earthRadiusKm = 6371;
  const deltaLat = toRadians(end.lat - start.lat);
  const deltaLng = toRadians(end.lng - start.lng);
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(toRadians(start.lat)) * Math.cos(toRadians(end.lat)) *
      Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightLineKm = earthRadiusKm * c;

  // Apply a road-distance factor to approximate actual travel distance.
  return Math.max(1, Math.round(straightLineKm * 1.28));
}

export function calculateRideFare(pickup: string, drop: string, vehicle: string): RideFare | null {
  const distanceKm = getEstimatedDistanceKm(pickup, drop);
  if (distanceKm === null) return null;

  const ratePerKm = vehicleRatePerKm[vehicle as VehicleType];
  if (!ratePerKm) return null;

  return {
    distanceKm,
    ratePerKm,
    price: distanceKm * ratePerKm,
  };
}

export function generateWhatsAppURL(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
