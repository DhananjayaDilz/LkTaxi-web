import type { Location } from "@/types/booking";

const NOMINATIM_ENDPOINT = "https://nominatim.openstreetmap.org/search";
const searchCache = new Map<string, Location[]>();

const locationAliases: Array<{ variants: string[]; canonicalQuery: string }> = [
  {
    variants: ["bia", "cmb", "bandaranaike international airport", "bandaranayaka international airport", "colombo airport", "colombo international airport"],
    canonicalQuery: "Bandaranaike International Airport, Sri Lanka",
  },
  {
    variants: ["tissamaharama", "thissamaharama", "tissa", "tissamarama"],
    canonicalQuery: "Tissamaharama, Sri Lanka",
  },
  {
    variants: ["yala national park", "yala"],
    canonicalQuery: "Yala National Park, Sri Lanka",
  },
  {
    variants: ["ella"],
    canonicalQuery: "Ella, Sri Lanka",
  },
  {
    variants: ["mirissa"],
    canonicalQuery: "Mirissa, Sri Lanka",
  },
  {
    variants: ["galle fort", "galle"],
    canonicalQuery: "Galle, Sri Lanka",
  },
];

function normalizeQuery(query: string) {
  return query.toLowerCase().replace(/[^a-z0-9]+/g, "").trim();
}

function resolveCanonicalQuery(query: string) {
  const normalizedQuery = normalizeQuery(query);

  for (const alias of locationAliases) {
    if (alias.variants.some((variant) => normalizeQuery(variant) === normalizedQuery)) {
      return alias.canonicalQuery;
    }
  }

  return query.trim();
}

function getSearchVariants(query: string) {
  const trimmedQuery = query.trim();
  const canonicalQuery = resolveCanonicalQuery(trimmedQuery);

  if (canonicalQuery.toLowerCase() === trimmedQuery.toLowerCase()) {
    return [trimmedQuery];
  }

  return [canonicalQuery, trimmedQuery];
}

function mergeUniqueLocations(groups: Location[][]) {
  const seen = new Set<string>();
  const merged: Location[] = [];

  for (const group of groups) {
    for (const location of group) {
      const key = location.placeId ?? `${location.latitude.toFixed(6)}:${location.longitude.toFixed(6)}`;

      if (seen.has(key)) {
        continue;
      }

      seen.add(key);
      merged.push(location);
    }
  }

  return merged;
}

async function fetchSearchResults(searchTerm: string): Promise<Location[]> {
  const url = new URL(NOMINATIM_ENDPOINT);
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("q", searchTerm);
  url.searchParams.set("limit", "6");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("accept-language", "en");
  url.searchParams.set("countrycodes", "lk");

  const response = await fetch(url.toString(), {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Location search is unavailable right now.");
  }

  const data = (await response.json()) as Array<Record<string, unknown>>;

  return Array.isArray(data)
    ? data.map(toLocation).filter((item): item is Location => item !== null)
    : [];
}

function toLocation(result: Record<string, unknown>): Location | null {
  const latitude = Number(result.lat);
  const longitude = Number(result.lon);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return null;
  }

  const displayName = typeof result.display_name === "string" ? result.display_name : "";
  const name =
    (typeof result.name === "string" && result.name.trim()) ||
    displayName.split(",")[0]?.trim() ||
    displayName ||
    "Unknown location";

  return {
    name,
    displayName,
    latitude,
    longitude,
    placeId: result.place_id !== undefined ? String(result.place_id) : undefined,
  };
}

export async function searchLocation(query: string): Promise<Location[]> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const cacheKey = normalizeQuery(trimmedQuery);
  const cached = searchCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const searchTerms = getSearchVariants(trimmedQuery);

  const responseGroups = await Promise.allSettled(searchTerms.map((searchTerm) => fetchSearchResults(searchTerm)));
  const successfulGroups = responseGroups
    .filter((result): result is PromiseFulfilledResult<Location[]> => result.status === "fulfilled")
    .map((result) => result.value);

  if (!successfulGroups.length) {
    throw new Error("Location search is unavailable right now.");
  }

  const results = mergeUniqueLocations(successfulGroups);

  searchCache.set(cacheKey, results);

  return results;
}