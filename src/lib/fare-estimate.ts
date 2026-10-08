import { vehicleRates } from "@/services/fareService";
import type { VehicleType } from "@/types/booking";

/**
 * Approximate exchange rate used only to show tourists a USD reference price.
 * Update this periodically; quotes are always confirmed in LKR on WhatsApp.
 */
export const USD_TO_LKR = 300;

export const fareVehicles: { type: VehicleType; label: string; passengers: string }[] = [
  { type: "Wagonr", label: "Mini Car (Suzuki WagonR)", passengers: "1-3" },
  { type: "Sedan", label: "Sedan (Toyota Prius / Axio)", passengers: "1-4" },
  { type: "Mini van", label: "Mini Van (Honda Freed)", passengers: "4-6" },
  { type: "KDH", label: "KDH Flat Roof Van", passengers: "5-9" },
  { type: "KDH High roof", label: "KDH High Roof Van", passengers: "7-12" },
];

/** Parses the leading number from strings such as "190 km" or "7 km". */
export const parseDistanceKm = (distance: string): number => {
  const match = distance.replace(/,/g, "").match(/\d+(\.\d+)?/);
  return match ? Number(match[0]) : 0;
};

/** Uses the same per-km rates as the live fare calculator so prices stay consistent. */
export const estimateFareLKR = (distanceKm: number, vehicle: VehicleType): number =>
  Math.round((distanceKm * vehicleRates[vehicle]) / 100) * 100;

export const toUSD = (lkr: number): number => Math.round(lkr / USD_TO_LKR);

export const formatLKR = (lkr: number): string => `LKR ${lkr.toLocaleString("en-US")}`;

export const getFareTable = (distanceKm: number) =>
  fareVehicles.map((v) => {
    const lkr = estimateFareLKR(distanceKm, v.type);
    return { ...v, lkr, usd: toUSD(lkr) };
  });
