import { useState, useMemo } from "react";
import { format } from "date-fns";
import { CalendarIcon, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { countries, generateWhatsAppURL } from "@/data/pricing";
import safariBg from "@/assets/safari-bg.jpg";

const SafariSection = () => {
  const [activeTab, setActiveTab] = useState<"full" | "half" | "shared">("full");

  return (
    <section id="safari" className="section-padding relative">
      <div className="absolute inset-0">
        <img src={safariBg} alt="Yala Safari" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(216,16%,9%,0.92), hsla(216,16%,9%,0.85))" }} />
      </div>
      <div className="relative container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-4">
            Yala <span className="text-primary">Safari</span> Booking
          </h2>
          <p className="text-secondary-foreground/70 max-w-2xl mx-auto">
            We provide affordable Yala safari tours with experienced drivers and comfortable 4x4 safari jeeps.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex mb-6">
            {(["full", "half", "shared"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={cn(
                  "flex-1 py-3 px-4 font-semibold rounded-t-lg transition-colors text-sm",
                  activeTab === t
                    ? t === "shared"
                      ? "bg-primary text-primary-foreground shared-safari-tab-glow"
                      : "bg-primary text-primary-foreground"
                    : t === "shared"
                    ? "bg-secondary/50 text-primary hover:text-primary shared-safari-attract"
                    : "bg-secondary/50 text-secondary-foreground/70 hover:text-secondary-foreground"
                )}
              >
                {t === "full" ? "Full Day Safari" : t === "half" ? "Half Day Safari" : "Shared Safari"}
              </button>
            ))}
          </div>

          <div className="bg-card rounded-b-xl rounded-tr-xl p-6 md:p-8">
            {activeTab === "full" ? <FullDaySafari /> : activeTab === "half" ? <HalfDaySafari /> : <SharedSafari />}
          </div>
        </div>
      </div>
    </section>
  );
};

function FullDaySafari() {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [country, setCountry] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [breakfast, setBreakfast] = useState(true);
  const [lunch, setLunch] = useState(true);
  const [water, setWater] = useState(true);

  const totalPeople = adults + children;
  const mealCost = useMemo(() => {
    let cost = 0;
    if (breakfast) cost += 10 * totalPeople;
    if (lunch) cost += 15 * totalPeople;
    if (water) cost += 5 * totalPeople;
    return cost;
  }, [breakfast, lunch, water, totalPeople]);

  // Base price per person (example)
  const basePricePerAdult = 45;
  const basePricePerChild = 25;
  const totalPrice = (adults * basePricePerAdult) + (children * basePricePerChild) + mealCost;

  const handleBook = () => {
    const meals = [breakfast && "Breakfast Box", lunch && "Packed Lunch", water && "Bottled Water"].filter(Boolean).join(", ");
    const msg = `🦁 *Full Day Yala Safari - LKTaxi*\n\n📅 Date: ${format(date, "PPP")}\n⏰ Time: 5:30 AM – 6:00 PM\n👥 Adults: ${adults}\n👶 Children: ${children}\n🌍 Country: ${country}\n🍽️ Meals: ${meals || "None"}\n💰 Total: $${totalPrice}\n\n✅ Includes: Private 4x4 safari jeep, Park entrance fees`;
    window.open(generateWhatsAppURL(msg), "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock /> <span>5:30 AM – 6:00 PM</span>
      </div>
      <div className="space-y-2">
        <h4 className="font-semibold text-foreground text-sm">Includes:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {["Private 4x4 safari jeep", "Park entrance fees", "Breakfast box", "Packed lunch", "Bottled water"].map((i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-primary" /> {i}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NumberField label="Adults" value={adults} onChange={setAdults} min={1} />
        <NumberField label="Children" value={children} onChange={setChildren} min={0} />
      </div>

      <CountrySelect value={country} onChange={setCountry} />
      <SafariDatePicker date={date} setDate={setDate} />

      <div className="space-y-3">
        <h4 className="font-semibold text-foreground text-sm">Meal Options:</h4>
        <MealCheckbox label="Breakfast Box" price={10} checked={breakfast} onChange={setBreakfast} />
        <MealCheckbox label="Packed Lunch" price={15} checked={lunch} onChange={setLunch} />
        <MealCheckbox label="Bottled Water 1.5L" price={5} checked={water} onChange={setWater} />
      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
        <p className="text-sm text-muted-foreground">Total Price</p>
        <p className="text-3xl font-bold text-primary">${totalPrice}</p>
      </div>

      <Button onClick={handleBook} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12">
        <Send className="w-4 h-4 mr-2" /> Book Safari via WhatsApp
      </Button>
    </div>
  );
}

function HalfDaySafari() {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [country, setCountry] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [breakfast, setBreakfast] = useState(false);
  const [water, setWater] = useState(false);

  const totalPeople = adults + children;
  const mealCost = useMemo(() => {
    let cost = 0;
    if (breakfast) cost += 10 * totalPeople;
    if (water) cost += 5 * totalPeople;
    return cost;
  }, [breakfast, water, totalPeople]);

  const basePricePerAdult = 35;
  const basePricePerChild = 20;
  const totalPrice = (adults * basePricePerAdult) + (children * basePricePerChild) + mealCost;

  const handleBook = () => {
    const meals = [breakfast && "Breakfast Box", water && "Bottled Water"].filter(Boolean).join(", ");
    const msg = `🦁 *Half Day Yala Safari - LKTaxi*\n\n📅 Date: ${format(date, "PPP")}\n👥 Adults: ${adults}\n👶 Children: ${children}\n🌍 Country: ${country}\n🍽️ Meals: ${meals || "None"}\n💰 Total: $${totalPrice}\n\n✅ Includes: Private 4x4 safari jeep, Park entrance fees`;
    window.open(generateWhatsAppURL(msg), "_blank");
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="font-semibold text-foreground text-sm">Includes:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {["Private 4x4 safari jeep", "Park entrance fees"].map((i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-primary" /> {i}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NumberField label="Adults" value={adults} onChange={setAdults} min={1} />
        <NumberField label="Children" value={children} onChange={setChildren} min={0} />
      </div>

      <CountrySelect value={country} onChange={setCountry} />
      <SafariDatePicker date={date} setDate={setDate} />

      <div className="space-y-3">
        <h4 className="font-semibold text-foreground text-sm">Add-ons:</h4>
        <MealCheckbox label="Breakfast Box" price={10} checked={breakfast} onChange={setBreakfast} />
        <MealCheckbox label="Bottled Water 1.5L" price={5} checked={water} onChange={setWater} />
      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
        <p className="text-sm text-muted-foreground">Total Price</p>
        <p className="text-3xl font-bold text-primary">${totalPrice}</p>
      </div>

      <Button onClick={handleBook} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12">
        <Send className="w-4 h-4 mr-2" /> Book Safari via WhatsApp
      </Button>
    </div>
  );
}

function SharedSafari() {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [country, setCountry] = useState("");
  const [date, setDate] = useState<Date>(new Date());

  const totalPeople = adults + children;

  const handleBook = () => {
    const msg = `🦁 *Shared Yala Safari - LKTaxi*\n\n📅 Date: ${format(date, "PPP")}\n👥 Adults: ${adults}\n👶 Children: ${children}\n👤 Total Guests: ${totalPeople}\n🌍 Country: ${country}\n\n✅ Option: Shared Safari Jeep\n\nPlease confirm seat availability and final price.`;
    window.open(generateWhatsAppURL(msg), "_blank");
  };

  return (
    <div className="space-y-6 shared-safari-panel">
      <div className="shared-safari-spotlight rounded-xl p-4">
        <p className="text-xs uppercase tracking-[0.16em] text-primary font-semibold">Popular Choice</p>
        <p className="text-sm text-foreground/80 mt-1">Join other travelers and enjoy a lively shared safari experience.</p>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-foreground text-sm">Includes:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {["Shared safari jeep seat", "Park entrance guidance", "Pickup coordination"].map((i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="w-4 h-4 text-primary" /> {i}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NumberField label="Adults" value={adults} onChange={setAdults} min={1} />
        <NumberField label="Children" value={children} onChange={setChildren} min={0} />
      </div> shared-safari-price-glow

      <CountrySelect value={country} onChange={setCountry} />
      <SafariDatePicker date={date} setDate={setDate} />

      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
        <p className="text-sm text-muted-foreground">Shared Safari Request</p>
        <p className="text-lg font-bold text-primary">Seat availability and price on confirmation</p>
      </div>

      <Button onClick={handleBook} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold h-12">
        <Send className="w-4 h-4 mr-2" /> Book Shared Safari via WhatsApp
      </Button>
    </div>
  );
}

function Clock() {
  return <span className="text-primary">⏰</span>;
}

function NumberField({ label, value, onChange, min = 0 }: { label: string; value: number; onChange: (v: number) => void; min?: number }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1 block">{label}</label>
      <Input type="number" min={min} value={value} onChange={(e) => onChange(Math.max(min, parseInt(e.target.value) || 0))} />
    </div>
  );
}

function MealCheckbox({ label, price, checked, onChange }: { label: string; price: number; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center gap-3">
      <Checkbox checked={checked} onCheckedChange={(v) => onChange(v === true)} id={label} />
      <label htmlFor={label} className="text-sm text-foreground cursor-pointer">
        {label} – <span className="text-primary font-semibold">${price}/person</span>
      </label>
    </div>
  );
}

function CountrySelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1 block">Country</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select your country" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((c) => (
            <SelectItem key={c} value={c}>{c}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function SafariDatePicker({ date, setDate }: { date: Date; setDate: (d: Date) => void }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1 block">Select Date</label>
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

export default SafariSection;
