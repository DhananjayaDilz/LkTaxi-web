import { useMemo, useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader, Polyline, Marker } from "@react-google-maps/api";
import { ExternalLink, MapPinned, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Location, RouteResult } from "@/types/booking";

interface TaxiMapProps {
  pickup: Location | null;
  drop: Location | null;
  route: RouteResult | null;
}

const sriLankaCenter = { lat: 7.8731, lng: 80.7718 };

function buildGoogleMapsDirectionsUrl(pickup: Location, drop: Location) {
  const origin = `${pickup.latitude},${pickup.longitude}`;
  const destination = `${drop.latitude},${drop.longitude}`;

  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=driving`;
}

export function TaxiMap({ pickup, drop, route }: TaxiMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyB_vkm4MvzG3IWC9vaNrSQC1L8ynH2C5S8"
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  const path = useMemo(() => {
    if (route?.geometry?.length) {
      return route.geometry.map(([lat, lng]) => ({ lat, lng }));
    }

    if (pickup && drop) {
      return [
        { lat: pickup.latitude, lng: pickup.longitude },
        { lat: drop.latitude, lng: drop.longitude },
      ];
    }

    return [];
  }, [pickup, drop, route]);

  // Fit bounds when path changes
  useMemo(() => {
    if (isLoaded && map && path.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      path.forEach((point) => bounds.extend(point));
      map.fitBounds(bounds);
    }
  }, [isLoaded, map, path]);

  if (!pickup || !drop) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-3 text-foreground">
          <MapPinned className="h-5 w-5 text-primary" />
          <span className="font-semibold">Route preview</span>
        </div>
        <p className="mt-2">Select pickup and drop locations to see the route map.</p>
      </div>
    );
  }

  const strokeColor = route ? "#eab308" : "#94a3b8";

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex flex-col gap-3 border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">Route preview</p>
          <p className="text-xs text-muted-foreground">Powered by Google Maps</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {pickup && drop ? (
            <Button asChild variant="outline" size="sm" className="h-9 w-full border-primary/20 text-primary hover:bg-primary/10 sm:w-auto">
              <a href={buildGoogleMapsDirectionsUrl(pickup, drop)} target="_blank" rel="noreferrer noopener">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open in Google Maps
              </a>
            </Button>
          ) : null}
          <MapPinned className="h-5 w-5 text-primary" />
        </div>
      </div>
      <div className="h-[240px] w-full sm:h-[280px] lg:h-[320px]">
        {!isLoaded ? (
          <div className="flex h-full w-full items-center justify-center bg-muted/20">
             <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={path[0] ?? sriLankaCenter}
            zoom={7}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
            }}
          >
            {path.length > 0 && (
              <Polyline
                path={path}
                options={{
                  strokeColor: strokeColor,
                  strokeWeight: 5,
                  strokeOpacity: 0.8,
                }}
              />
            )}
            <Marker position={{ lat: pickup.latitude, lng: pickup.longitude }} title={pickup.name} icon={{ path: 0, scale: 6, fillColor: "#22c55e", fillOpacity: 0.9, strokeColor: "#16a34a" }} />
            <Marker position={{ lat: drop.latitude, lng: drop.longitude }} title={drop.name} icon={{ path: 0, scale: 6, fillColor: "#ef4444", fillOpacity: 0.9, strokeColor: "#dc2626" }} />
          </GoogleMap>
        )}
      </div>
    </div>
  );
}

export default TaxiMap;