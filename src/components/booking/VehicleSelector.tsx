import { cn } from "@/lib/utils";
import type { VehicleType } from "@/types/booking";

import wagonrImg from "@/assets/taxi-wagonr.webp";
import sedanImg from "@/assets/taxi-sedan.webp";
import miniVanImg from "@/assets/taxi-mini_van.webp";
import kdhImg from "@/assets/taxi-kdh.webp";
import kdhHighRoofImg from "@/assets/taxi-kdh-highroof.webp";

interface VehicleSelectorProps {
  value: VehicleType | null;
  onChange: (vehicle: VehicleType) => void;
  error?: string;
}

const vehicleOptions: Array<{
  type: VehicleType;
  label: string;
  image: string;
}> = [
  {
    type: "Wagonr",
    label: "WagonR (Hatchback)",
    image: wagonrImg,
  },
  {
    type: "Sedan",
    label: "Sedan",
    image: sedanImg,
  },
  {
    type: "Mini van",
    label: "Mini Van",
    image: miniVanImg,
  },
  {
    type: "KDH",
    label: "KDH Van",
    image: kdhImg,
  },
  {
    type: "KDH High roof",
    label: "KDH High Roof",
    image: kdhHighRoofImg,
  },
];

export function VehicleSelector({ value, onChange, error }: VehicleSelectorProps) {
  const selectedVehicle = vehicleOptions.find((v) => v.type === value);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-medium text-muted-foreground">Vehicle Type</label>
        {selectedVehicle ? (
          <span className="text-xs font-semibold text-primary">{selectedVehicle.label}</span>
        ) : null}
      </div>

      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {vehicleOptions.map((option) => {
          const isSelected = value === option.type;

          return (
            <button
              key={option.type}
              type="button"
              title={option.label}
              aria-label={option.label}
              onClick={() => onChange(option.type)}
              className={cn(
                "group relative flex aspect-square items-center justify-center rounded-2xl border p-1.5 text-center transition-all duration-200 hover:border-primary/60 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/40",
                isSelected
                  ? "border-primary bg-primary/10 shadow-md ring-2 ring-primary/30"
                  : "border-border bg-card hover:border-primary/40"
              )}
            >
              <img
                src={option.image}
                alt={option.label}
                className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </button>
          );
        })}
      </div>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

export default VehicleSelector;