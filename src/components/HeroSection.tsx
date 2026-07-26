import { useState, useMemo } from "react";
import { format } from "date-fns";
import { CalendarIcon, Car, MapPin, User, MessageSquare, Send, Calculator, Compass, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Typewriter from "typewriter-effect";
import { tourPricing, vehicles, generateWhatsAppURL } from "@/data/pricing";
import BookingForm from "@/components/booking/BookingForm";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
}

const tabs = [
  { id: 0, label: "Fare Calculator", shortLabel: "Fare Calculator", icon: Calculator },
  { id: 1, label: "Custom Ride Request", shortLabel: "Custom Ride", icon: Compass },
  { id: 2, label: "Book Tour", shortLabel: "Book Tour", icon: Map },
];

const HeroSection = ({ title, subtitle }: HeroSectionProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      <div className="absolute inset-0">
        <img 
          src={heroBg} 
          alt={title ? `${title} Background` : "Sri Lanka private taxi service — airport transfers and tours for foreign tourists"} 
          className="w-full h-full object-cover" 
          loading="eager"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(216,16%,9%,0.85), hsla(216,16%,9%,0.55))" }} />
      </div>
      <div className="relative container mx-auto px-4 py-8 sm:py-10 md:py-20">
        <div className="max-w-2xl mb-6 md:mb-12">
          <h1 className="max-w-xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-foreground mb-4 leading-[1.08] sm:leading-tight">
            {title ? (
              title
            ) : (
              <>
                Your Trusted <span className="text-primary">Taxi Service</span> in Sri Lanka
              </>
            )}
          </h1>
          {!title && (
            <div className="text-lg sm:text-2xl md:text-3xl font-semibold text-secondary-foreground/80 mb-4 min-h-[40px] sm:min-h-[48px] md:min-h-[56px]" aria-hidden="true">
              <Typewriter
                options={{
                  strings: [
                    'Book Your <span class="text-primary">Tour</span>',
                    'Book Your Private <span class="text-primary">Safari</span>',
                    'Book Your Shared <span class="text-primary">Safari</span>',
                    '<span class="text-primary">Airport Transfer</span> Experts'
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30,
                }}
              />
            </div>
          )}
          <p className="max-w-xl text-sm sm:text-base lg:text-lg text-secondary-foreground/70">
            {subtitle || "Safe, reliable and affordable transportation across Sri Lanka. Airport transfers, day tours, and long distance travel."}
          </p>
        </div>

        <div className="max-w-4xl rounded-2xl bg-card shadow-2xl overflow-hidden sm:rounded-[1.5rem]">
          {/* User-friendly Segmented Tab Navigation */}
          <div className="p-1.5 sm:p-2.5 bg-muted/40 border-b border-border">
            <div className="grid grid-cols-3 gap-1 sm:gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 sm:py-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 focus:outline-none",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md ring-1 ring-primary/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/60"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="inline sm:hidden text-[11px] truncate">{tab.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4 sm:p-5 md:p-6 lg:p-7">
            {activeTab === 0 && <BookingForm />}
            {activeTab === 1 && <CustomRideForm />}
            {activeTab === 2 && <BookTourForm />}
          </div>
        </div>
      </div>
    </section>
  );
};

function CustomRideForm() {
  const [name, setName] = useState("");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const msg = `🚕 *Custom Ride Request - LKTaxi*\n\n👤 Name: ${name}\n📍 Pickup: ${pickup}\n📍 Destination: ${destination}\n🚗 Vehicle: ${vehicle}\n💬 Message: ${message}`;
    window.open(generateWhatsAppURL(msg), "_blank");
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      <p className="text-sm leading-6 text-muted-foreground">
        Explain your travel requirement and we will help you arrange the best ride in Sri Lanka.
      </p>
      <InputField icon={<User className="w-4 h-4" />} placeholder="Your Name" value={name} onChange={setName} />
      <InputField icon={<MapPin className="w-4 h-4" />} placeholder="Pickup Location" value={pickup} onChange={setPickup} />
      <InputField icon={<MapPin className="w-4 h-4" />} placeholder="Destination" value={destination} onChange={setDestination} />
      <SelectField label="Vehicle Type" icon={<Car className="w-4 h-4" />} value={vehicle} onValueChange={setVehicle} options={[...vehicles]} />
      <div>
        <Textarea placeholder="Your message..." value={message} onChange={(e) => setMessage(e.target.value)} rows={3} />
      </div>
      <Button onClick={handleSend} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12">
        <MessageSquare className="w-4 h-4 mr-2" /> Send via WhatsApp
      </Button>
    </div>
  );
}

function BookTourForm() {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [vehicle, setVehicle] = useState("Sedan");

  const days = useMemo(() => {
    const diff = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
    return diff;
  }, [startDate, endDate]);

  const pricePerDay = vehicle ? tourPricing[vehicle] ?? null : null;
  const totalPrice = pricePerDay ? pricePerDay * days : null;

  const handleBook = () => {
    const msg = `🗺️ *Book Tour - LKTaxi*\n\n📅 Start: ${format(startDate, "PPP")}\n📅 End: ${format(endDate, "PPP")}\n📆 Days: ${days}\n🚗 Vehicle: ${vehicle}${pricePerDay ? `\n💰 Price/Day: LKR ${pricePerDay.toLocaleString()}\n💰 Total: LKR ${totalPrice?.toLocaleString()}` : ""}`;
    window.open(generateWhatsAppURL(msg), "_blank");
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <DatePickerField label="Start Date" date={startDate} setDate={setStartDate} />
        <DatePickerField label="End Date" date={endDate} setDate={setEndDate} />
      </div>
      <SelectField label="Vehicle Type" icon={<Car className="w-4 h-4" />} value={vehicle} onValueChange={setVehicle} options={Object.keys(tourPricing)} />

      {totalPrice !== null && (
        <div className="rounded-xl border border-primary/20 bg-primary/10 p-4 text-center sm:p-5">
          <p className="text-xs sm:text-sm text-muted-foreground">LKR {pricePerDay!.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / day × {days} days</p>
          <p className="mt-1 text-xl sm:text-2xl font-bold text-primary">LKR {totalPrice.toLocaleString()}</p>
        </div>
      )}

      <Button onClick={handleBook} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12 sm:h-12">
        <Send className="w-4 h-4 mr-2" /> Book Tour via WhatsApp
      </Button>
    </div>
  );
}

// Reusable sub-components
function SelectField({ label, icon, value, onValueChange, options }: { label: string; icon?: React.ReactNode; value: string; onValueChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-muted-foreground">{label}</label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="h-11 rounded-xl">
          <div className="flex items-center gap-2">
            {icon}
            <SelectValue placeholder={`Select ${label}`} />
          </div>
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>{o}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function InputField({ icon, placeholder, value, onChange }: { icon: React.ReactNode; placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
      <Input className="h-11 rounded-xl pl-10" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function DatePickerField({ date, setDate, label = "Pickup Date" }: { date: Date; setDate: (d: Date) => void; label?: string }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-muted-foreground">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-11 w-full justify-start rounded-xl text-left font-normal">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(date, "PPP")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} initialFocus className="p-3 pointer-events-auto" />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default HeroSection;
