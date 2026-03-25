import { Location, locations } from "./locations";

export interface Route {
  from: Location;
  to: Location;
}

// Generate popular route combinations (High Conversion SEO)
export const popularRoutes: Route[] = [
  { from: "colombo", to: "ella" },
  { from: "ella", to: "yala" },
  { from: "airport", to: "mirissa" },
  { from: "kandy", to: "sigiriya" },
  { from: "galle", to: "tangalle" },
  { from: "airport", to: "kandy" },
  { from: "airport", to: "ella" },
  { from: "mirissa", to: "weligama" },
  { from: "nuwara-eliya", to: "ella" },
  { from: "negombo", to: "sigiriya" },
  { from: "bentota", to: "galle" },
  { from: "unawatuna", to: "mirissa" },
  { from: "udawalawe", to: "yala" },
  { from: "trincomalee", to: "sigiriya" },
  { from: "hikkaduwa", to: "bentota" },
];

// Helper to generate a unique key for the route
export const getRouteSlug = (route: Route): string => `${route.from}-to-${route.to}`;

// Helper to parse route from slug
export const parseRouteSlug = (slug: string): Route | null => {
  const parts = slug.split("-to-");
  if (parts.length !== 2) return null;
  const [from, to] = parts;
  if (locations.includes(from as Location) && locations.includes(to as Location)) {
    return { from: from as Location, to: to as Location };
  }
  return null;
};
