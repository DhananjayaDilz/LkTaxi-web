export interface Location {
  name: string;
  latitude: number;
  longitude: number;
  displayName?: string;
  placeId?: string;
}

export type VehicleType = "Wagonr" | "Sedan" | "Mini van" | "KDH" | "KDH High roof";

export interface RouteResult {
  distanceKm: number;
  durationMinutes: number;
  geometry: Array<[number, number]>;
}

export interface FareResult {
  pickup: Location;
  drop: Location;
  vehicle: VehicleType;
  distanceKm: number;
  durationMinutes: number;
  price: number;
  routeGeometry: Array<[number, number]>;
}