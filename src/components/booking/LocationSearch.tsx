import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2, MapPin, Search, X } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Location } from "@/types/booking";
import { searchLocation } from "@/services/nominatimService";

interface LocationSearchProps {
  label: string;
  placeholder: string;
  value: Location | null;
  onChange: (location: Location | null) => void;
  error?: string;
  disabled?: boolean;
}

export function LocationSearch({ label, placeholder, value, onChange, error, disabled }: LocationSearchProps) {
  const [query, setQuery] = useState(value?.displayName ?? value?.name ?? "");
  const [results, setResults] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-muted-foreground">{label}</label>
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
          {isLoading ? <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" /> : null}
          {value ? (
            <button type="button" onClick={handleClear} className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label={`Clear ${label}`}>
              <X className="h-4 w-4" />
            </button>
          ) : null}
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
                        <span className="text-xs text-muted-foreground">{location.displayName ?? `${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}`}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
                {!isLoading && results.length === 0 ? <CommandEmpty>{searchError || "No matching locations found."}</CommandEmpty> : null}
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