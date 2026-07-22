import { useEffect, useMemo } from "react";
import L from "leaflet";
import { CircleMarker, MapContainer, Polyline, TileLayer, Tooltip, useMap } from "react-leaflet";
import { ExternalLink, MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";
import "leaflet/dist/leaflet.css";
import type { Location, RouteResult } from "@/types/booking";

interface TaxiMapProps {
  pickup: Location | null;
  drop: Location | null;
  route: RouteResult | null;
}

const sriLankaCenter: [number, number] = [7.8731, 80.7718];

function buildGoogleMapsDirectionsUrl(pickup: Location, drop: Location) {
  const origin = `${pickup.latitude},${pickup.longitude}`;
  const destination = `${drop.latitude},${drop.longitude}`;

  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=driving`;
}

function FitRouteBounds({ positions }: { positions: Array<[number, number]> }) {
  const map = useMap();

  useEffect(() => {
    if (!positions.length) {
      return;
    }

    const bounds = L.latLngBounds(positions);
    map.fitBounds(bounds.pad(0.2), { animate: false });
  }, [map, positions]);

  return null;
}

export function TaxiMap({ pickup, drop, route }: TaxiMapProps) {
  const positions = useMemo(() => {
    if (route?.geometry?.length) {
      return route.geometry;
    }

    if (pickup && drop) {
      return [
        [pickup.latitude, pickup.longitude],
        [drop.latitude, drop.longitude],
      ] as Array<[number, number]>;
    }

    return [] as Array<[number, number]>;
  }, [pickup, drop, route]);

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
          <p className="text-xs text-muted-foreground">OpenStreetMap tiles with live OSRM route geometry</p>
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
        <MapContainer center={positions[0] ?? sriLankaCenter} zoom={7} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {positions.length ? <FitRouteBounds positions={positions} /> : null}
          {positions.length ? <Polyline positions={positions} pathOptions={{ color: strokeColor, weight: 5 }} /> : null}
          <CircleMarker center={[pickup.latitude, pickup.longitude]} radius={8} pathOptions={{ color: "#16a34a", fillColor: "#22c55e", fillOpacity: 0.9 }}>
            <Tooltip>{pickup.name}</Tooltip>
          </CircleMarker>
          <CircleMarker center={[drop.latitude, drop.longitude]} radius={8} pathOptions={{ color: "#dc2626", fillColor: "#ef4444", fillOpacity: 0.9 }}>
            <Tooltip>{drop.name}</Tooltip>
          </CircleMarker>
        </MapContainer>
      </div>
    </div>
  );
}

export default TaxiMap;