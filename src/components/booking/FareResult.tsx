import { Badge } from "@/components/ui/badge";
import { formatDistance, formatDuration } from "@/services/fareService";
import type { FareResult as FareResultType } from "@/types/booking";

interface FareResultProps {
  result: FareResultType | null;
  pickupTimeLabel?: string;
}

export function FareResult({ result, pickupTimeLabel }: FareResultProps) {
  if (!result) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-5 text-sm leading-6 text-muted-foreground sm:p-6">
        Your fare estimate will appear here after you calculate a route.
      </div>
    );
  }

  const displayPrice = new Intl.NumberFormat("en-LK", {
    maximumFractionDigits: 0,
  }).format(result.price);

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground sm:text-sm sm:normal-case sm:tracking-normal">LK TAXI</p>
          <h3 className="text-xl font-bold text-foreground sm:text-2xl">LKR {displayPrice}</h3>
          <p className="mt-1 text-xs font-medium text-red-600">Final price is negotiable.</p>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10">
          {result.vehicle}
        </Badge>
      </div>

      <div className="grid gap-3 text-sm sm:grid-cols-2">
        <InfoRow label="Pickup" value={result.pickup.name} />
        <InfoRow label="Drop" value={result.drop.name} />
        {pickupTimeLabel ? <InfoRow label="Pickup Time" value={pickupTimeLabel} /> : null}
        <InfoRow label="Distance" value={formatDistance(result.distanceKm)} />
        <InfoRow label="Estimated Time" value={formatDuration(result.durationMinutes)} />
      </div>

      <div className="mt-4 rounded-xl bg-muted/50 p-4">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-muted-foreground">Route-based price</span>
          <span className="font-semibold text-foreground">
            {formatDistance(result.distanceKm)} × {result.vehicle}
          </span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          This estimate is calculated from live OSRM driving distance and the selected vehicle rate.
        </p>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background px-3 py-3">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 font-medium text-foreground">{value}</p>
    </div>
  );
}

export default FareResult;