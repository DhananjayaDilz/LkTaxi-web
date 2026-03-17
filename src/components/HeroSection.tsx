import { useState, useMemo } from "react";
import { format } from "date-fns";
import { CalendarIcon, Car, MapPin, Clock, User, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { calculateRideFare, tourPricing, pickupLocations, dropLocations, vehicles, generateWhatsAppURL } from "@/data/pricing";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Book Ride", "Custom Ride Request", "Book Tour"];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Sri Lanka coastal road" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(216,16%,9%,0.85), hsla(216,16%,9%,0.55))" }} />
      </div>
      <div className="relative container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-foreground mb-4 leading-tight">
            Your Trusted <span className="text-primary">Taxi Service</span> in Sri Lanka
          </h1>
          <p className="text-lg text-secondary-foreground/70">
            Safe, reliable and affordable transportation across Sri Lanka. Airport transfers, day tours, and long distance travel.
          </p>
        </div>

        <div className="max-w-2xl bg-card rounded-xl shadow-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-border">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={cn(
                  "flex-1 py-3 px-2 text-xs md:text-sm font-semibold transition-colors",
                  activeTab === i
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-4 md:p-6">
            {activeTab === 0 && <BookRideForm />}
            {activeTab === 1 && <CustomRideForm />}
            {activeTab === 2 && <BookTourForm />}
          </div>
        </div>
      </div>
    </section>
  );
};

function BookRideForm() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState(() => {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12}:${m.toString().padStart(2, "0")} ${ampm}`;
  });
  const [vehicle, setVehicle] = useState("");

  const fare = useMemo(() => {
    if (!pickup || !drop || !vehicle) return null;
    return calculateRideFare(pickup, drop, vehicle);
  }, [pickup, drop, vehicle]);

  const handleBook = () => {
    const msg = `🚕 *Book Ride - LKTaxi*\n\n📍 Pickup: ${pickup}\n📍 Drop: ${drop}\n📅 Date: ${format(date, "PPP")}\n⏰ Time: ${time}\n🚗 Vehicle: ${vehicle}${fare ? `\n💰 Price: LKR ${fare.price.toLocaleString()}` : ""}`;
    window.open(generateWhatsAppURL(msg), "_blank");
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField label="Pickup Location" icon={<MapPin className="w-4 h-4" />} value={pickup} onValueChange={setPickup} options={pickupLocations} />
        <SelectField label="Drop Location" icon={<MapPin className="w-4 h-4" />} value={drop} onValueChange={setDrop} options={dropLocations} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DatePickerField date={date} setDate={setDate} />
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Pickup Time</label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input value={time} onChange={(e) => setTime(e.target.value)} className="pl-10" placeholder="10:00 AM" />
          </div>
        </div>
      </div>
      <SelectField label="Vehicle Type" icon={<Car className="w-4 h-4" />} value={vehicle} onValueChange={setVehicle} options={[...vehicles]} />
      
      {fare !== null && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground">Estimated Price</p>
          <p className="text-2xl font-bold text-primary mt-1">LKR {fare.price.toLocaleString()}</p>
        </div>
      )}

      <Button onClick={handleBook} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12">
        <Send className="w-4 h-4 mr-2" /> Book Ride via WhatsApp
      </Button>
    </div>
  );
}

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
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
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
  const vehicle = "SEDAN";

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
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DatePickerField label="Start Date" date={startDate} setDate={setStartDate} />
        <DatePickerField label="End Date" date={endDate} setDate={setEndDate} />
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">Vehicle Type</label>
        <Input value="Sedan" readOnly />
      </div>

      {totalPrice !== null && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground">LKR {pricePerDay!.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / day × {days} days</p>
          <p className="text-2xl font-bold text-primary">LKR {totalPrice.toLocaleString()}</p>
        </div>
      )}

      <Button onClick={handleBook} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12">
        <Send className="w-4 h-4 mr-2" /> Book Tour via WhatsApp
      </Button>
    </div>
  );
}

// Reusable sub-components
function SelectField({ label, icon, value, onValueChange, options }: { label: string; icon?: React.ReactNode; value: string; onValueChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1 block">{label}</label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
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
      <Input className="pl-10" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function DatePickerField({ date, setDate, label = "Pickup Date" }: { date: Date; setDate: (d: Date) => void; label?: string }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1 block">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-left font-normal">
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
