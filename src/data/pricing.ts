export const WHATSAPP_NUMBER = "94705000526";

const TISSAMAHARAMA_PICKUP = "Tissamaharama";

export const tourPricing: Record<string, number> = {
  SEDAN: 25000,
};

export const pickupLocations = [TISSAMAHARAMA_PICKUP];

export const dropLocations = [
  "Udawalawa",
  "Ella",
  "Haputhale",
  "Sinharaja",
  "Nuwara Eliya",
  "Kandy",
  "Sigiriya",
  "Dambulla",
  "Rekawa",
  "Tangalle / Beliatta",
  "Hiriketiya / Dikwella",
  "Talalla",
  "Polhena / Mirissa",
  "Weligama / Ahangama",
  "Unawatuna / Galle",
  "Hikkaduwa",
  "Bentota / Beruwala",
  "Colombo",
  "Colombo Airport",
  "Negombo",
  "Arugam Bay",
  "Trincomalee",
  "Batticaloa",
  "Anuradhapura",
];

export const locations = [TISSAMAHARAMA_PICKUP, ...dropLocations];

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

export const vehicles = ["Nano Alto", "Wagon R", "Sedan", "KDH Flatroof", "KDH Highroof"] as const;
export type VehicleType = (typeof vehicles)[number];

const ridePricing: Record<string, Record<VehicleType, number>> = {
  "Udawalawa": { "Nano Alto": 7000, "Wagon R": 8000, "Sedan": 9000, "KDH Flatroof": 11000, "KDH Highroof": 13000 },
  "Ella": { "Nano Alto": 9000, "Wagon R": 10000, "Sedan": 11000, "KDH Flatroof": 14000, "KDH Highroof": 16000 },
  "Haputhale": { "Nano Alto": 12000, "Wagon R": 14000, "Sedan": 16000, "KDH Flatroof": 18000, "KDH Highroof": 22000 },
  "Sinharaja": { "Nano Alto": 15000, "Wagon R": 16000, "Sedan": 18000, "KDH Flatroof": 22000, "KDH Highroof": 26000 },
  "Nuwara Eliya": { "Nano Alto": 17000, "Wagon R": 18000, "Sedan": 22000, "KDH Flatroof": 25000, "KDH Highroof": 28000 },
  "Kandy": { "Nano Alto": 26000, "Wagon R": 30000, "Sedan": 35000, "KDH Flatroof": 38000, "KDH Highroof": 42000 },
  "Sigiriya": { "Nano Alto": 32000, "Wagon R": 37000, "Sedan": 42000, "KDH Flatroof": 45000, "KDH Highroof": 50000 },
  "Dambulla": { "Nano Alto": 30000, "Wagon R": 36000, "Sedan": 40000, "KDH Flatroof": 45000, "KDH Highroof": 50000 },
  "Rekawa": { "Nano Alto": 7000, "Wagon R": 8000, "Sedan": 9000, "KDH Flatroof": 12000, "KDH Highroof": 15000 },
  "Tangalle / Beliatta": { "Nano Alto": 8000, "Wagon R": 9000, "Sedan": 10000, "KDH Flatroof": 13000, "KDH Highroof": 16000 },
  "Hiriketiya / Dikwella": { "Nano Alto": 9000, "Wagon R": 10000, "Sedan": 11000, "KDH Flatroof": 14000, "KDH Highroof": 17000 },
  "Talalla": { "Nano Alto": 11000, "Wagon R": 12000, "Sedan": 13000, "KDH Flatroof": 17000, "KDH Highroof": 20000 },
  "Polhena / Mirissa": { "Nano Alto": 13000, "Wagon R": 14000, "Sedan": 15000, "KDH Flatroof": 21000, "KDH Highroof": 25000 },
  "Weligama / Ahangama": { "Nano Alto": 15000, "Wagon R": 16000, "Sedan": 17000, "KDH Flatroof": 23000, "KDH Highroof": 26000 },
  "Unawatuna / Galle": { "Nano Alto": 16000, "Wagon R": 17000, "Sedan": 18000, "KDH Flatroof": 26000, "KDH Highroof": 30000 },
  "Hikkaduwa": { "Nano Alto": 18000, "Wagon R": 19000, "Sedan": 20000, "KDH Flatroof": 28000, "KDH Highroof": 32000 },
  "Bentota / Beruwala": { "Nano Alto": 24000, "Wagon R": 25000, "Sedan": 26000, "KDH Flatroof": 36000, "KDH Highroof": 40000 },
  "Colombo": { "Nano Alto": 28000, "Wagon R": 30000, "Sedan": 33000, "KDH Flatroof": 40000, "KDH Highroof": 45000 },
  "Colombo Airport": { "Nano Alto": 30000, "Wagon R": 33000, "Sedan": 35000, "KDH Flatroof": 45000, "KDH Highroof": 50000 },
  "Negombo": { "Nano Alto": 35000, "Wagon R": 39000, "Sedan": 41000, "KDH Flatroof": 47000, "KDH Highroof": 52000 },
  "Arugam Bay": { "Nano Alto": 16000, "Wagon R": 17000, "Sedan": 18000, "KDH Flatroof": 26000, "KDH Highroof": 30000 },
  "Trincomalee": { "Nano Alto": 38000, "Wagon R": 39000, "Sedan": 40000, "KDH Flatroof": 56000, "KDH Highroof": 60000 },
  "Batticaloa": { "Nano Alto": 28000, "Wagon R": 29000, "Sedan": 30000, "KDH Flatroof": 40000, "KDH Highroof": 45000 },
  "Anuradhapura": { "Nano Alto": 38000, "Wagon R": 39000, "Sedan": 40000, "KDH Flatroof": 55000, "KDH Highroof": 60000 },
};

export type RideFare = {
  distanceKm: null;
  ratePerKm: null;
  price: number;
};

export function calculateRideFare(pickup: string, drop: string, vehicle: string): RideFare | null {
  const normalizedPickup = pickup.trim().toLowerCase();
  if (normalizedPickup !== "tissamaharama" && normalizedPickup !== "thissamaharama" && normalizedPickup !== "thissmaharana") {
    return null;
  }

  const destinationPricing = ridePricing[drop];
  if (!destinationPricing) return null;

  const price = destinationPricing[vehicle as VehicleType];
  if (!price) return null;

  return {
    distanceKm: null,
    ratePerKm: null,
    price,
  };
}

export function generateWhatsAppURL(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
