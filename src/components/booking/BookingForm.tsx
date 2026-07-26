import { useEffect, useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import { AlertCircle, CalendarIcon, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateWhatsAppURL } from "@/data/pricing";
import { calculateFare } from "@/services/fareService";
import { getRoute } from "@/services/osrmService";
import type { FareResult as FareResultType, Location, RouteResult, VehicleType } from "@/types/booking";
import { LocationSearch } from "@/components/booking/LocationSearch";
import { VehicleSelector } from "@/components/booking/VehicleSelector";
import { FareResult } from "@/components/booking/FareResult";
import { TaxiMap } from "@/components/map/TaxiMap";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BookingErrors {
  pickup?: string;
  drop?: string;
  vehicle?: string;
  date?: string;
  time?: string;
  general?: string;
}

const defaultFareResult: FareResultType | null = null;

function getSriLankaNow() {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Colombo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const parts = formatter.formatToParts(new Date()).reduce<Record<string, string>>((accumulator, part) => {
    if (part.type !== "literal") {
      accumulator[part.type] = part.value;
    }

    return accumulator;
  }, {});

  return {
    date: new Date(Number(parts.year), Number(parts.month) - 1, Number(parts.day)),
    hour: parts.hour ? String(Number(parts.hour)) : "12",
    minute: parts.minute ?? "00",
    ampm: parts.dayPeriod === "PM" ? "PM" : "AM",
  };
}

export function BookingForm() {
  const sriLankaNow = useMemo(getSriLankaNow, []);
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const [pickup, setPickup] = useState<Location | null>(null);
  const [drop, setDrop] = useState<Location | null>(null);
  const [vehicle, setVehicle] = useState<VehicleType | null>(null);
  const [pickupDate, setPickupDate] = useState<Date>(sriLankaNow.date);
  const [pickupHour, setPickupHour] = useState(sriLankaNow.hour);
  const [pickupMinute, setPickupMinute] = useState(sriLankaNow.minute);
  const [pickupAmPm, setPickupAmPm] = useState(sriLankaNow.ampm);
  const [fareResult, setFareResult] = useState<FareResultType | null>(defaultFareResult);
  const [route, setRoute] = useState<RouteResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [errors, setErrors] = useState<BookingErrors>({});

  useEffect(() => {
    setFareResult(null);
    setRoute(null);
    setErrors((current) => ({ ...current, general: undefined }));
  }, [pickup, drop, vehicle, pickupDate, pickupHour, pickupMinute, pickupAmPm]);

  useEffect(() => {
    if (!fareResult) {
      return;
    }

    window.setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, [fareResult]);

  const pickupDateTimeLabel = useMemo(() => {
    const formattedDate = format(pickupDate, "PPP");
    return `${formattedDate} at ${pickupHour}:${pickupMinute} ${pickupAmPm}`;
  }, [pickupDate, pickupHour, pickupMinute, pickupAmPm]);

  const validateForm = () => {
    const nextErrors: BookingErrors = {};

    if (!pickup) {
      nextErrors.pickup = "Select a pickup location.";
    }

    if (!drop) {
      nextErrors.drop = "Select a drop location.";
    }

    if (!vehicle) {
      nextErrors.vehicle = "Choose a vehicle type.";
    }

    if (!pickupDate) {
      nextErrors.date = "Select a pickup date.";
    }

    if (!pickupHour || !pickupMinute || !pickupAmPm) {
      nextErrors.time = "Select a pickup time.";
    }

    if (pickup && drop && pickup.latitude === drop.latitude && pickup.longitude === drop.longitude) {
      nextErrors.drop = "Pickup and drop locations must be different.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleCalculate = async () => {
    if (!validateForm() || !pickup || !drop || !vehicle) {
      return;
    }

    setIsCalculating(true);
    setErrors({});

    try {
      const routeResult = await getRoute(pickup.latitude, pickup.longitude, drop.latitude, drop.longitude);
      const price = calculateFare(routeResult.distanceKm, vehicle);

      setRoute(routeResult);
      setFareResult({
        pickup,
        drop,
        vehicle,
        distanceKm: routeResult.distanceKm,
        durationMinutes: routeResult.durationMinutes,
        price,
        routeGeometry: routeResult.geometry,
      });
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : "Something went wrong while calculating the fare.",
      });
      setFareResult(null);
      setRoute(null);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleWhatsAppBooking = () => {
    if (!fareResult) {
      return;
    }

    const message = `🚕 *LK TAXI*\n\n📍 Pickup: ${fareResult.pickup.name}\n📍 Drop: ${fareResult.drop.name}\n📅 Pickup Date: ${format(pickupDate, "PPP")}\n⏰ Pickup Time: ${pickupHour}:${pickupMinute} ${pickupAmPm}\n🚗 Vehicle: ${fareResult.vehicle}\n📏 Distance: ${fareResult.distanceKm.toFixed(1)} km\n⏱️ Duration: ${Math.round(fareResult.durationMinutes)} min\n💰 Price: LKR ${fareResult.price.toLocaleString()}`;
    window.open(generateWhatsAppURL(message), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-5">
      {/* Locations */}
      <div className="grid gap-4 md:grid-cols-2">
        <LocationSearch
          label="Pickup Location"
          placeholder="Search location"
          value={pickup}
          onChange={(location) => {
            setPickup(location);
            setErrors((current) => ({ ...current, pickup: undefined, general: undefined }));
          }}
          error={errors.pickup}
        />
        <LocationSearch
          label="Drop Location"
          placeholder="Search location"
          value={drop}
          onChange={(location) => {
            setDrop(location);
            setErrors((current) => ({ ...current, drop: undefined, general: undefined }));
          }}
          error={errors.drop}
        />
      </div>

      {/* Date and Time */}
      <div className="grid gap-4 sm:grid-cols-2">
        <DatePickerField label="Pickup Date" date={pickupDate} setDate={setPickupDate} error={errors.date} />
        <TimePickerField
          hour={pickupHour}
          setHour={setPickupHour}
          minute={pickupMinute}
          setMinute={setPickupMinute}
          ampm={pickupAmPm}
          setAmpm={setPickupAmPm}
          error={errors.time}
        />
      </div>

      {/* Vehicle Type */}
      <VehicleSelector
        value={vehicle}
        onChange={(nextVehicle) => {
          setVehicle(nextVehicle);
          setErrors((current) => ({ ...current, vehicle: undefined, general: undefined }));
        }}
        error={errors.vehicle}
      />

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="button"
          onClick={handleCalculate}
          disabled={isCalculating}
          className="h-12 flex-1 rounded-xl bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
        >
          {isCalculating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Calculate Fare
        </Button>
        {fareResult ? (
          <Button
            type="button"
            onClick={handleWhatsAppBooking}
            className="h-12 flex-1 rounded-xl border border-[#25D366] bg-[#25D366] text-white shadow-sm transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Send className="mr-2 h-4 w-4" />
            Book via WhatsApp
          </Button>
        ) : null}
      </div>

      {/* General Error Banner */}
      {errors.general ? (
        <div className="flex items-start gap-3 rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{errors.general}</p>
        </div>
      ) : null}

      {/* Fare Result and Map */}
      <div ref={resultsRef} className="grid gap-4 scroll-mt-24 xl:grid-cols-[1fr_1.1fr]">
        <FareResult result={fareResult} pickupTimeLabel={pickupDateTimeLabel} />
        <TaxiMap pickup={fareResult?.pickup ?? pickup} drop={fareResult?.drop ?? drop} route={route} />
      </div>
    </div>
  );
}

function DatePickerField({
  label,
  date,
  setDate,
  error,
}: {
  label: string;
  date: Date;
  setDate: (value: Date) => void;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-muted-foreground">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-11 w-full justify-start rounded-xl text-left font-normal">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(date, "PPP")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={(value) => value && setDate(value)} initialFocus className="pointer-events-auto p-3" />
        </PopoverContent>
      </Popover>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

function TimePickerField({
  hour,
  setHour,
  minute,
  setMinute,
  ampm,
  setAmpm,
  error,
}: {
  hour: string;
  setHour: (value: string) => void;
  minute: string;
  setMinute: (value: string) => void;
  ampm: string;
  setAmpm: (value: string) => void;
  error?: string;
}) {
  const hours = Array.from({ length: 12 }, (_, index) => (index + 1).toString());
  const minutes = Array.from({ length: 60 }, (_, index) => index.toString().padStart(2, "0"));

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-muted-foreground">Pickup Time</label>
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Select value={hour} onValueChange={setHour}>
            <SelectTrigger className="h-11 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {hours.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <span className="mb-2 text-lg font-semibold text-foreground">:</span>
        <div className="flex-1">
          <Select value={minute} onValueChange={setMinute}>
            <SelectTrigger className="h-11 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {minutes.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Select value={ampm} onValueChange={setAmpm}>
            <SelectTrigger className="h-11 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="PM">PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

export default BookingForm;