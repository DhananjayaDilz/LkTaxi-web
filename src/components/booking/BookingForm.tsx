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
  const [activeStep, setActiveStep] = useState(0);
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

  const getStepErrors = (step: number) => {
    const nextErrors: BookingErrors = {};

    if ((step === 0 || step === 3) && !pickup) {
      nextErrors.pickup = "Select a pickup location.";
    }

    if ((step === 0 || step === 3) && !drop) {
      nextErrors.drop = "Select a drop location.";
    }

    if ((step === 2 || step === 3) && !vehicle) {
      nextErrors.vehicle = "Choose a vehicle type.";
    }

    if ((step === 1 || step === 3) && !pickupDate) {
      nextErrors.date = "Select a pickup date.";
    }

    if ((step === 1 || step === 3) && (!pickupHour || !pickupMinute || !pickupAmPm)) {
      nextErrors.time = "Select a pickup time.";
    }

    if ((step === 0 || step === 3) && pickup && drop && pickup.latitude === drop.latitude && pickup.longitude === drop.longitude) {
      nextErrors.drop = "Pickup and drop locations must be different.";
    }

    return nextErrors;
  };

  const validateStep = (step: number) => {
    const nextErrors = getStepErrors(step);

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const validateAll = () => {
    const nextErrors = getStepErrors(3);
    setErrors(nextErrors);

    if (nextErrors.pickup || nextErrors.drop) {
      setActiveStep(0);
      return false;
    }

    if (nextErrors.date || nextErrors.time) {
      setActiveStep(1);
      return false;
    }

    if (nextErrors.vehicle) {
      setActiveStep(2);
      return false;
    }

    return true;
  };

  const goNext = () => {
    if (!validateStep(activeStep)) {
      return;
    }

    setActiveStep((current) => Math.min(current + 1, 3));
  };

  const goBack = () => {
    setActiveStep((current) => Math.max(current - 1, 0));
  };

  const handleCalculate = async () => {
    if (!validateAll() || !pickup || !drop || !vehicle) {
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
      setActiveStep(3);
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
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm lg:hidden">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Booking Flow</p>
            <h2 className="text-lg font-bold text-foreground">Step {activeStep + 1} of 4</h2>
          </div>
          <div className="flex gap-1.5">
            {[0, 1, 2, 3].map((step) => (
              <span
                key={step}
                className={step <= activeStep ? "h-2.5 w-2.5 rounded-full bg-primary" : "h-2.5 w-2.5 rounded-full bg-muted"}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>

        <div className="space-y-5">
          {activeStep === 0 ? (
            <div className="space-y-4">
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
          ) : null}

          {activeStep === 1 ? (
            <div className="space-y-4">
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
          ) : null}

          {activeStep === 2 ? (
            <VehicleSelector
              value={vehicle}
              onChange={(nextVehicle) => {
                setVehicle(nextVehicle);
                setErrors((current) => ({ ...current, vehicle: undefined, general: undefined }));
              }}
              error={errors.vehicle}
            />
          ) : null}

          {activeStep === 3 ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Review your booking</p>
                <p className="mt-1 leading-6">Tap Calculate Fare to get distance, duration, and price based on the route.</p>
              </div>
              <FareResult result={fareResult} pickupTimeLabel={pickupDateTimeLabel} />
              <TaxiMap pickup={fareResult?.pickup ?? pickup} drop={fareResult?.drop ?? drop} route={route} />
            </div>
          ) : null}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={goBack}
              disabled={activeStep === 0}
              className="h-12 flex-1 rounded-xl"
            >
              Back
            </Button>

            {activeStep < 3 ? (
              <Button type="button" onClick={goNext} className="h-12 flex-1 rounded-xl bg-primary font-semibold text-primary-foreground hover:bg-primary/90">
                Next
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleCalculate}
                disabled={isCalculating}
                className="h-12 flex-1 rounded-xl bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
              >
                {isCalculating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Calculate Fare
              </Button>
            )}
          </div>

          {fareResult ? (
            <Button
              onClick={handleWhatsAppBooking}
              className="h-12 w-full rounded-xl border border-[#25D366] bg-[#25D366] text-white shadow-sm transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Send className="mr-2 h-4 w-4" />
              Book via WhatsApp
            </Button>
          ) : null}

          {errors.general ? (
            <div className="flex items-start gap-3 rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{errors.general}</p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="grid gap-4 lg:grid-cols-2">
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

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
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

        <div className="mt-4">
          <VehicleSelector
            value={vehicle}
            onChange={(nextVehicle) => {
              setVehicle(nextVehicle);
              setErrors((current) => ({ ...current, vehicle: undefined, general: undefined }));
            }}
            error={errors.vehicle}
          />
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            onClick={handleCalculate}
            disabled={isCalculating}
            className="h-12 flex-1 bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {isCalculating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Calculate Fare
          </Button>
          {fareResult ? (
            <Button
              onClick={handleWhatsAppBooking}
              className="h-12 flex-1 rounded-xl border border-[#25D366] bg-[#25D366] text-white shadow-sm transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Send className="mr-2 h-4 w-4" />
              Book via WhatsApp
            </Button>
          ) : null}
        </div>

        {errors.general ? (
          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>{errors.general}</p>
          </div>
        ) : null}

        <div ref={resultsRef} className="mt-4 grid gap-4 scroll-mt-24 xl:grid-cols-[1fr_1.1fr]">
          <FareResult result={fareResult} pickupTimeLabel={pickupDateTimeLabel} />
          <TaxiMap pickup={fareResult?.pickup ?? pickup} drop={fareResult?.drop ?? drop} route={route} />
        </div>
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