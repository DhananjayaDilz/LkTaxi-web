import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2, LocateFixed, MapPin, Search, X } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Location } from "@/types/booking";
import { reverseGeocode, searchLocation } from "@/services/nominatimService";

export const BIA_AIRPORT_LOCATION: Location = {
  name: "BIA Airport",
  displayName: "Bandaranaike International Airport (CMB), Katunayake",
  latitude: 7.1804,
  longitude: 79.8841,
  placeId: "bia-airport",
};

export const POPULAR_LOCATIONS: Location[] = [BIA_AIRPORT_LOCATION];

interface LocationSearchProps {
  label: string;
  placeholder: string;
  value: Location | null;
  onChange: (location: Location | null) => void;
  error?: string;
  disabled?: boolean;
  quickSelections?: Location[];
}

export function LocationSearch({
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled,
  quickSelections = POPULAR_LOCATIONS,
}: LocationSearchProps) {
  const [query, setQuery] = useState(value?.displayName ?? value?.name ?? "");
  const [results, setResults] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const searchSequence = useRef(0);

  useEffect(() => {
    setQuery(value?.displayName ?? value?.name ?? "");
  }, [value]);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2 || !isOpen) {
      setResults([]);
      setIsLoading(false);
      setSearchError(null);
      return;
    }

    const timeoutId = window.setTimeout(async () => {
      const requestId = ++searchSequence.current;

      setIsLoading(true);
      setSearchError(null);

      try {
        const matches = await searchLocation(trimmedQuery);

        if (searchSequence.current === requestId) {
          setResults(matches);
        }
      } catch (error) {
        if (searchSequence.current === requestId) {
          setResults([]);
          setSearchError(error instanceof Error ? error.message : "Location search failed.");
        }
      } finally {
        if (searchSequence.current === requestId) {
          setIsLoading(false);
        }
      }
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [query, isOpen]);

  const selectedLabel = useMemo(() => value?.displayName ?? value?.name ?? "", [value]);

  const handleSelect = (location: Location) => {
    onChange(location);
    setQuery(location.displayName ?? location.name);
    setResults([]);
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange(null);
    setQuery("");
    setResults([]);
    setSearchError(null);
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setSearchError("Geolocation is not supported by your browser.");
      return;
    }

    setIsGettingLocation(true);
    setSearchError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const location = await reverseGeocode(latitude, longitude);
          handleSelect(location);
        } catch (err) {
          setSearchError("Failed to resolve current location.");
        } finally {
          setIsGettingLocation(false);
        }
      },
      (geoError) => {
        setIsGettingLocation(false);
        if (geoError.code === geoError.PERMISSION_DENIED) {
          setSearchError("Location access denied. Please enable location permissions.");
        } else {
          setSearchError("Unable to retrieve current location.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="space-y-2">
      {/* Header with Label & BIA Quick Select pill above text field */}
      <div className="flex items-center justify-between gap-2">
        <label className="block text-xs font-medium text-muted-foreground">{label}</label>

        {quickSelections && quickSelections.length > 0 ? (
          <div className="flex items-center gap-1.5">
            {quickSelections.map((loc) => {
              const isSelected =
                value?.placeId === loc.placeId ||
                (value?.latitude === loc.latitude && value?.longitude === loc.longitude);

              return (
                <button
                  key={loc.placeId || loc.name}
                  type="button"
                  onClick={() => handleSelect(loc)}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-lg border px-2 py-0.5 text-xs font-medium transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-primary",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground font-semibold shadow-xs"
                      : "border-border/80 bg-muted/40 text-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                  )}
                >
                  ✈ {loc.name}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="relative">
        <div
          className={cn(
            "flex items-center gap-2 rounded-xl border border-input bg-background px-3 shadow-sm transition focus-within:ring-2 focus-within:ring-primary/20",
            disabled && "opacity-60",
          )}
        >
          <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => {
              onChange(null);
              setQuery(event.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onBlur={() => window.setTimeout(() => setIsOpen(false), 150)}
            placeholder={placeholder}
            disabled={disabled}
            className="h-11 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
          />

          <div className="flex items-center gap-1.5 shrink-0">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /> : null}
            {value ? (
              <button
                type="button"
                onClick={handleClear}
                className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label={`Clear ${label}`}
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
            <button
              type="button"
              onClick={handleGetCurrentLocation}
              disabled={isGettingLocation || disabled}
              title="Use Current Location"
              aria-label="Use Current Location"
              className="flex items-center gap-1 rounded-lg bg-primary/10 px-2 py-1 text-xs font-semibold text-primary transition-all hover:bg-primary/20 focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
            >
              {isGettingLocation ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <LocateFixed className="h-3.5 w-3.5" />
              )}
              <span className="hidden sm:inline">Current</span>
            </button>
          </div>
        </div>

        {isOpen && query.trim().length >= 2 ? (
          <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-border bg-popover shadow-xl">
            <Command shouldFilter={false}>
              <CommandList className="max-h-64 sm:max-h-72">
                <CommandGroup heading="Search results">
                  {results.map((location) => (
                    <CommandItem
                      key={`${location.latitude}-${location.longitude}-${location.name}`}
                      value={location.displayName ?? location.name}
                      onSelect={() => handleSelect(location)}
                      className="cursor-pointer px-3 py-3 sm:py-2.5"
                    >
                      <div className="flex w-full flex-col items-start gap-1 text-left">
                        <span className="font-medium text-foreground">{location.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {location.displayName ?? `${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}`}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
                {!isLoading && results.length === 0 ? (
                  <CommandEmpty>{searchError || "No matching locations found."}</CommandEmpty>
                ) : null}
              </CommandList>
            </Command>
          </div>
        ) : null}
      </div>

      {selectedLabel ? <p className="text-xs text-muted-foreground">Selected: {selectedLabel}</p> : null}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
      {searchError && !error ? <p className="text-xs text-destructive">{searchError}</p> : null}
    </div>
  );
}

export default LocationSearch;