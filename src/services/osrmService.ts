import type { RouteResult } from "@/types/booking";

const OSRM_ENDPOINT = "https://router.project-osrm.org/route/v1/driving";

interface OsrmResponse {
  code?: string;
  message?: string;
  routes?: Array<{
    distance: number;
    duration: number;
    geometry?: {
      coordinates?: Array<[number, number]>;
    };
  }>;
}

export async function getRoute(
  pickupLat: number,
  pickupLng: number,
  dropLat: number,
  dropLng: number,
): Promise<RouteResult> {
  const response = await fetch(
    `${OSRM_ENDPOINT}/${pickupLng},${pickupLat};${dropLng},${dropLat}?overview=full&geometries=geojson&steps=false`,
  );

  if (!response.ok) {
    throw new Error("Route service is unavailable right now.");
  }

  const data = (await response.json()) as OsrmResponse;

  if (data.code !== "Ok" || !data.routes?.length) {
    throw new Error(data.message || "No route could be calculated for the selected locations.");
  }

  const route = data.routes[0];
  const geometry = route.geometry?.coordinates?.length
    ? route.geometry.coordinates.map(([lng, lat]) => [lat, lng] as [number, number])
    : [
        [pickupLat, pickupLng],
        [dropLat, dropLng],
      ];

  return {
    distanceKm: route.distance / 1000,
    durationMinutes: route.duration / 60,
    geometry,
  };
}