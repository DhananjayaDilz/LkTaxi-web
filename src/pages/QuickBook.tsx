import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import {
  AlertCircle,
  CalendarIcon,
  Car,
  Compass,
  Loader2,
  Map,
  MapPin,
  MessageSquare,
  Send,
  User,
  Calculator,
  Home,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { trackContact } from "@/lib/analytics";
import {
  generateWhatsAppURL,
  tourPricing,
  vehicles,
  WHATSAPP_NUMBER,
} from "@/data/pricing";
import { calculateFare } from "@/services/fareService";
import { getRoute } from "@/services/osrmService";
import { LocationSearch } from "@/components/booking/LocationSearch";
import { VehicleSelector } from "@/components/booking/VehicleSelector";
import { FareResult } from "@/components/booking/FareResult";
import type {
  FareResult as FareResultType,
  Location,
  RouteResult,
  VehicleType,
} from "@/types/booking";
const TaxiMap = lazy(() => import("@/components/map/TaxiMap"));

// ─── Shared helpers ──────────────────────────────────────────────────────────

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
  const parts = formatter
    .formatToParts(new Date())
    .reduce<Record<string, string>>((acc, p) => {
      if (p.type !== "literal") acc[p.type] = p.value;
      return acc;
    }, {});
  return {
    date: new Date(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day)
    ),
    hour: parts.hour ? String(Number(parts.hour)) : "12",
    minute: parts.minute ?? "00",
    ampm: parts.dayPeriod === "PM" ? "PM" : "AM",
  };
}

// ─── Tabs ────────────────────────────────────────────────────────────────────

const tabs = [
  {
    id: 0,
    label: "Get Fare",
    icon: Calculator,
  },
  {
    id: 1,
    label: "Custom Ride",
    icon: Compass,
  },
  {
    id: 2,
    label: "Book Tour",
    icon: Map,
  },
];

// ─── Page Component ──────────────────────────────────────────────────────────

export default function QuickBook() {
  const [activeTab, setActiveTab] = useState(0);

  // Set theme-color for the mobile status bar
  useEffect(() => {
    const existing = document.querySelector('meta[name="theme-color"]');
    if (existing) {
      existing.setAttribute("content", "#141719");
    } else {
      const meta = document.createElement("meta");
      meta.name = "theme-color";
      meta.content = "#141719";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-[100dvh] bg-[#141719] flex flex-col">
      {/* ── App-like top bar ───────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-[#141719]/95 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
          <div className="flex items-center gap-2.5">
            <img
              src="/lktaxi-sri-lanka-taxi-booking-logo.webp"
              alt="LK Taxi"
              className="h-8 w-8 rounded-lg"
              width={32}
              height={32}
            />
            <div>
              <h1 className="text-sm font-bold text-white leading-none">
                LK Taxi
              </h1>
              <p className="text-[10px] text-white/50 leading-tight mt-0.5">
                Sri Lanka • 24/7
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              className="flex items-center justify-center h-9 w-9 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-colors"
              aria-label="Call LK Taxi"
            >
              <Phone className="h-4 w-4" />
            </a>
            <a
              href="/"
              className="flex items-center justify-center h-9 w-9 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-colors"
              aria-label="Go to full website"
            >
              <Home className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* ── Tab switcher ──────────────────────────────────────────────── */}
      <div className="px-4 pt-4 pb-2 max-w-lg mx-auto w-full">
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-white/5 rounded-2xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Form area ─────────────────────────────────────────────────── */}
      <main className="flex-1 px-4 pb-6 max-w-lg mx-auto w-full overflow-y-auto">
        <div className="mt-2 rounded-2xl bg-card p-4 shadow-xl">
          {activeTab === 0 && <QuickFareForm />}
          {activeTab === 1 && <QuickCustomForm />}
          {activeTab === 2 && <QuickTourForm />}
        </div>
      </main>

      {/* ── Bottom safe-area spacer ───────────────────────────────────── */}
      <div className="h-[env(safe-area-inset-bottom,0px)]" />
    </div>
  );
}

// ─── Tab 1: Fare Calculator (reuses BookingForm logic) ───────────────────────

interface BookingErrors {
  pickup?: string;
  drop?: string;
  vehicle?: string;
  date?: string;
  time?: string;
  general?: string;
}

function QuickFareForm() {
  const sriLankaNow = useMemo(getSriLankaNow, []);
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const [pickup, setPickup] = useState<Location | null>(null);
  const [drop, setDrop] = useState<Location | null>(null);
  const [vehicle, setVehicle] = useState<VehicleType | null>(null);
  const [pickupDate, setPickupDate] = useState<Date>(sriLankaNow.date);
  const [pickupHour, setPickupHour] = useState(sriLankaNow.hour);
  const [pickupMinute, setPickupMinute] = useState(sriLankaNow.minute);
  const [pickupAmPm, setPickupAmPm] = useState(sriLankaNow.ampm);
  const [fareResult, setFareResult] = useState<FareResultType | null>(null);
  const [route, setRoute] = useState<RouteResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [errors, setErrors] = useState<BookingErrors>({});

  useEffect(() => {
    setFareResult(null);
    setRoute(null);
    setErrors((c) => ({ ...c, general: undefined }));
  }, [pickup, drop, vehicle, pickupDate, pickupHour, pickupMinute, pickupAmPm]);

  useEffect(() => {
    if (!fareResult) return;
    setTimeout(
      () =>
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      50
    );
  }, [fareResult]);

  const pickupDateTimeLabel = useMemo(() => {
    return `${format(pickupDate, "PPP")} at ${pickupHour}:${pickupMinute} ${pickupAmPm}`;
  }, [pickupDate, pickupHour, pickupMinute, pickupAmPm]);

  const validateForm = () => {
    const nextErrors: BookingErrors = {};
    if (!pickup) nextErrors.pickup = "Select a pickup location.";
    if (!drop) nextErrors.drop = "Select a drop location.";
    if (!vehicle) nextErrors.vehicle = "Choose a vehicle type.";
    if (!pickupDate) nextErrors.date = "Select a pickup date.";
    if (!pickupHour || !pickupMinute || !pickupAmPm)
      nextErrors.time = "Select a pickup time.";
    if (
      pickup &&
      drop &&
      pickup.latitude === drop.latitude &&
      pickup.longitude === drop.longitude
    )
      nextErrors.drop = "Pickup and drop locations must be different.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleCalculate = async () => {
    if (!validateForm() || !pickup || !drop || !vehicle) return;
    setIsCalculating(true);
    setErrors({});
    try {
      const routeResult = await getRoute(
        pickup.latitude,
        pickup.longitude,
        drop.latitude,
        drop.longitude
      );
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
        general:
          error instanceof Error
            ? error.message
            : "Something went wrong while calculating the fare.",
      });
      setFareResult(null);
      setRoute(null);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleWhatsAppBooking = () => {
    if (!fareResult) return;
    const message = `🚕 *LKTAXI*\n\n📍 Pickup: ${fareResult.pickup.name}\n📍 Drop: ${fareResult.drop.name}\n📅 Pickup Date: ${format(pickupDate, "PPP")}\n⏰ Pickup Time: ${pickupHour}:${pickupMinute} ${pickupAmPm}\n🚗 Vehicle: ${fareResult.vehicle}\n📏 Distance: ${fareResult.distanceKm.toFixed(1)} km\n⏱️ Duration: ${Math.round(fareResult.durationMinutes)} min\n💰 Price: LKR ${fareResult.price.toLocaleString()}`;
    trackContact("whatsapp", "QuickBook_FareCalc");
    window.open(generateWhatsAppURL(message), "_blank", "noopener,noreferrer");
  };

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  return (
    <div className="space-y-4">
      <LocationSearch
        label="Pickup Location"
        placeholder="Search location"
        value={pickup}
        onChange={(l) => {
          setPickup(l);
          setErrors((c) => ({ ...c, pickup: undefined, general: undefined }));
        }}
        error={errors.pickup}
      />
      <LocationSearch
        label="Drop Location"
        placeholder="Search location"
        value={drop}
        onChange={(l) => {
          setDrop(l);
          setErrors((c) => ({ ...c, drop: undefined, general: undefined }));
        }}
        error={errors.drop}
      />

      {/* Date */}
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-muted-foreground">
          Pickup Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-11 w-full justify-start rounded-xl text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(pickupDate, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={pickupDate}
              onSelect={(d) => d && setPickupDate(d)}
              initialFocus
              className="pointer-events-auto p-3"
            />
          </PopoverContent>
        </Popover>
        {errors.date && (
          <p className="text-xs text-destructive">{errors.date}</p>
        )}
      </div>

      {/* Time */}
      <div className="space-y-1.5">
        <label className="block text-xs font-medium text-muted-foreground">
          Pickup Time
        </label>
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <Select value={pickupHour} onValueChange={setPickupHour}>
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {hours.map((v) => (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <span className="mb-2 text-lg font-semibold text-foreground">:</span>
          <div className="flex-1">
            <Select value={pickupMinute} onValueChange={setPickupMinute}>
              <SelectTrigger className="h-11 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {minutes.map((v) => (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Select value={pickupAmPm} onValueChange={setPickupAmPm}>
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
        {errors.time && (
          <p className="text-xs text-destructive">{errors.time}</p>
        )}
      </div>

      <VehicleSelector
        value={vehicle}
        onChange={(v) => {
          setVehicle(v);
          setErrors((c) => ({ ...c, vehicle: undefined, general: undefined }));
        }}
        error={errors.vehicle}
      />

      <div className="flex flex-col gap-3">
        <Button
          type="button"
          onClick={handleCalculate}
          disabled={isCalculating}
          className="h-12 w-full rounded-xl bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
        >
          {isCalculating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Calculate Fare
        </Button>
        {fareResult && (
          <Button
            type="button"
            onClick={handleWhatsAppBooking}
            className="h-12 w-full rounded-xl border border-[#25D366] bg-[#25D366] text-white shadow-sm transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Send className="mr-2 h-4 w-4" />
            Book via WhatsApp
          </Button>
        )}
      </div>

      {errors.general && (
        <div className="flex items-start gap-3 rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{errors.general}</p>
        </div>
      )}

      <div
        ref={resultsRef}
        className="grid gap-4 scroll-mt-24"
      >
        <FareResult result={fareResult} pickupTimeLabel={pickupDateTimeLabel} />
        {pickup && drop ? (
          <Suspense fallback={<p>Loading route map...</p>}>
            <TaxiMap
              pickup={fareResult?.pickup ?? pickup}
              drop={fareResult?.drop ?? drop}
              route={route}
            />
          </Suspense>
        ) : (
          <p className="rounded-2xl border border-dashed p-6 text-sm text-muted-foreground">
            Select pickup and drop locations to preview your route.
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Tab 2: Custom Ride ──────────────────────────────────────────────────────

function QuickCustomForm() {
  const [name, setName] = useState("");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const msg = `🚕 *Custom Ride Request - LKTaxi*\n\n👤 Name: ${name}\n📍 Pickup: ${pickup}\n📍 Destination: ${destination}\n🚗 Vehicle: ${vehicle}\n💬 Message: ${message}`;
    trackContact("whatsapp", "QuickBook_CustomRide");
    window.open(generateWhatsAppURL(msg), "_blank");
  };

  return (
    <div className="space-y-4">
      <p className="text-sm leading-6 text-muted-foreground">
        Tell us your travel plan and we'll arrange the best ride.
      </p>
      <InputField
        icon={<User className="w-4 h-4" />}
        placeholder="Your Name"
        value={name}
        onChange={setName}
      />
      <InputField
        icon={<MapPin className="w-4 h-4" />}
        placeholder="Pickup Location"
        value={pickup}
        onChange={setPickup}
      />
      <InputField
        icon={<MapPin className="w-4 h-4" />}
        placeholder="Destination"
        value={destination}
        onChange={setDestination}
      />
      <div>
        <label className="mb-1 block text-xs font-medium text-muted-foreground">
          Vehicle Type
        </label>
        <Select value={vehicle} onValueChange={setVehicle}>
          <SelectTrigger className="h-11 rounded-xl">
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4" />
              <SelectValue placeholder="Select Vehicle" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {[...vehicles].map((v) => (
              <SelectItem key={v} value={v}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Textarea
          placeholder="Your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
        />
      </div>
      <Button
        onClick={handleSend}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12 rounded-xl"
      >
        <MessageSquare className="w-4 h-4 mr-2" /> Send via WhatsApp
      </Button>
    </div>
  );
}

// ─── Tab 3: Book Tour ────────────────────────────────────────────────────────

function QuickTourForm() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [vehicle, setVehicle] = useState("Sedan");

  const days = useMemo(() => {
    return Math.max(
      1,
      Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      )
    );
  }, [startDate, endDate]);

  const pricePerDay = vehicle ? tourPricing[vehicle] ?? null : null;
  const totalPrice = pricePerDay ? pricePerDay * days : null;

  const handleBook = () => {
    const msg = `🗺️ *Book Tour - LKTaxi*\n\n📅 Start: ${format(startDate, "PPP")}\n📅 End: ${format(endDate, "PPP")}\n📆 Days: ${days}\n🚗 Vehicle: ${vehicle}${pricePerDay ? `\n💰 Price/Day: LKR ${pricePerDay.toLocaleString()}\n💰 Total: LKR ${totalPrice?.toLocaleString()}` : ""}`;
    trackContact("whatsapp", "QuickBook_BookTour");
    window.open(generateWhatsAppURL(msg), "_blank");
  };

  return (
    <div className="space-y-4">
      <QBDatePicker label="Start Date" date={startDate} setDate={setStartDate} />
      <QBDatePicker label="End Date" date={endDate} setDate={setEndDate} />

      <div>
        <label className="mb-1 block text-xs font-medium text-muted-foreground">
          Vehicle Type
        </label>
        <Select value={vehicle} onValueChange={setVehicle}>
          <SelectTrigger className="h-11 rounded-xl">
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4" />
              <SelectValue placeholder="Select Vehicle" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {Object.keys(tourPricing).map((v) => (
              <SelectItem key={v} value={v}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {totalPrice !== null && (
        <div className="rounded-xl border border-primary/20 bg-primary/10 p-4 text-center">
          <p className="text-xs text-muted-foreground">
            LKR{" "}
            {pricePerDay!.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            / day × {days} days
          </p>
          <p className="mt-1 text-xl font-bold text-primary">
            LKR {totalPrice.toLocaleString()}
          </p>
        </div>
      )}

      <Button
        onClick={handleBook}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12 rounded-xl"
      >
        <Send className="w-4 h-4 mr-2" /> Book Tour via WhatsApp
      </Button>
    </div>
  );
}

// ─── Reusable tiny helpers ───────────────────────────────────────────────────

function InputField({
  icon,
  placeholder,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        {icon}
      </span>
      <Input
        className="h-11 rounded-xl pl-10"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function QBDatePicker({
  date,
  setDate,
  label,
}: {
  date: Date;
  setDate: (d: Date) => void;
  label: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-11 w-full justify-start rounded-xl text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(date, "PPP")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => d && setDate(d)}
            initialFocus
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
