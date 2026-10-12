import { useState } from "react";
import { Link } from "react-router-dom";
import { popularRoutes, getRouteSlug } from "@/data/routes";
import { formatLocationName, Location } from "@/data/locations";
import { routeContent } from "@/data/route-content";
import { MapPin, Clock, ArrowRight, Navigation, ChevronDown, Compass, ShieldCheck } from "lucide-react";

const hubOptions = [
  { id: "all", label: "All Popular Transfers", description: "Most requested intercity and airport routes" },
  { id: "airport", label: "From Colombo Airport (CMB)", description: "Direct airport drop-offs to beaches and highlands" },
  { id: "colombo", label: "From Colombo City", description: "Private city transfers to popular tourist regions" },
  { id: "kandy", label: "From Kandy (Cultural Capital)", description: "Transfers to Sigiriya, Ella, and highlands" },
  { id: "ella", label: "From Ella (Hill Country)", description: "Downhill transfers to Yala safari and southern beaches" },
  { id: "galle", label: "From Galle & South Coast", description: "Coastal transfers and wildlife safari connections" },
  { id: "mirissa", label: "From Mirissa & Weligama", description: "South coast transfers to Yala, Weligama, and airport" },
];

const destinationClusters = [
  {
    region: "Airport & West Coast",
    items: [
      { slug: "airport", name: "Colombo Airport (CMB)" },
      { slug: "colombo", name: "Colombo" },
      { slug: "negombo", name: "Negombo" },
      { slug: "kalutara", name: "Kalutara" },
    ],
  },
  {
    region: "Central Highlands",
    items: [
      { slug: "kandy", name: "Kandy" },
      { slug: "nuwara-eliya", name: "Nuwara Eliya" },
      { slug: "ella", name: "Ella" },
      { slug: "ella-rock", name: "Ella Rock" },
      { slug: "little-adams-peak", name: "Little Adam's Peak" },
      { slug: "bandarawela", name: "Bandarawela" },
      { slug: "haputale", name: "Haputale" },
      { slug: "badulla", name: "Badulla" },
      { slug: "kitulgala", name: "Kitulgala" },
    ],
  },
  {
    region: "Cultural Triangle",
    items: [
      { slug: "sigiriya", name: "Sigiriya" },
      { slug: "dambulla", name: "Dambulla" },
      { slug: "anuradhapura", name: "Anuradhapura" },
      { slug: "polonnaruwa", name: "Polonnaruwa" },
    ],
  },
  {
    region: "South Coast & Safaris",
    items: [
      { slug: "galle", name: "Galle Fort" },
      { slug: "mirissa", name: "Mirissa" },
      { slug: "weligama", name: "Weligama" },
      { slug: "unawatuna", name: "Unawatuna" },
      { slug: "hikkaduwa", name: "Hikkaduwa" },
      { slug: "bentota", name: "Bentota" },
      { slug: "tangalle", name: "Tangalle" },
      { slug: "hambantota", name: "Hambantota" },
      { slug: "tissamaharama", name: "Tissamaharama" },
      { slug: "yala", name: "Yala Safari" },
      { slug: "udawalawe", name: "Udawalawe" },
    ],
  },
  {
    region: "East Coast & Safaris",
    items: [
      { slug: "trincomalee", name: "Trincomalee" },
      { slug: "arugam-bay", name: "Arugam Bay" },
      { slug: "pasikudah", name: "Pasikudah" },
      { slug: "batticaloa", name: "Batticaloa" },
      { slug: "wilpattu", name: "Wilpattu" },
    ],
  },
];

export default function RoutesExplorer() {
  const [selectedHub, setSelectedHub] = useState("all");

  const filteredRoutes = popularRoutes.filter((r) => {
    if (selectedHub === "all") return true;
    if (selectedHub === "airport") return r.from === "airport";
    if (selectedHub === "colombo") return r.from === "colombo";
    if (selectedHub === "kandy") return r.from === "kandy" || r.to === "kandy";
    if (selectedHub === "ella") return r.from === "ella" || r.to === "ella";
    if (selectedHub === "galle") return r.from === "galle" || r.to === "galle";
    if (selectedHub === "mirissa") return r.from === "mirissa" || r.from === "weligama" || r.to === "mirissa";
    return true;
  });

  const activeHubMeta = hubOptions.find((h) => h.id === selectedHub) || hubOptions[0];

  return (
    <section id="routes" className="section-padding bg-muted/20 border-y border-border scroll-mt-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Sri Lanka Transfer Network</span>
          </div>
          <h2 className="section-title mb-3">
            Popular Taxi Routes &amp; <span className="text-primary">Destinations</span>
          </h2>
          <p className="section-subtitle">
            Explore fixed-rate private transfers across Sri Lanka with air-conditioned vehicles, professional English-speaking drivers, and 24/7 WhatsApp booking.
          </p>
        </div>

        {/* Dropdown / Filter Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-card p-4 sm:p-5 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-auto flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                Select Departure Hub:
              </span>
              <div className="relative flex-1 md:w-72">
                <select
                  value={selectedHub}
                  onChange={(e) => setSelectedHub(e.target.value)}
                  className="w-full appearance-none bg-background border border-input rounded-xl px-4 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary pr-10 cursor-pointer shadow-sm"
                  aria-label="Filter transfer routes by departure hub"
                >
                  {hubOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Quick Pills for Mobile & Desktop */}
            <div className="flex flex-wrap gap-1.5 w-full md:w-auto justify-start md:justify-end">
              {hubOptions.slice(0, 4).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedHub(opt.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    selectedHub === opt.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                  }`}
                >
                  {opt.id === "all" ? "All" : opt.label.replace("From ", "").replace(" (CMB)", "")}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-2 px-1 text-center md:text-left">
            Showing <strong className="text-foreground">{filteredRoutes.length}</strong> verified transfers: {activeHubMeta.description}.
          </p>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto mb-12">
          {filteredRoutes.map((route) => {
            const slug = getRouteSlug(route);
            const content = routeContent[slug];
            const fromName = formatLocationName(route.from);
            const toName = formatLocationName(route.to);

            return (
              <Link
                key={slug}
                to={`/taxi/${slug}`}
                className="bg-card p-5 rounded-xl border border-border hover:border-primary/60 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-primary mb-2">
                    <span className="flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5" />
                      {fromName} &rarr; {toName}
                    </span>
                    <span className="text-muted-foreground font-normal">Private Taxi</span>
                  </div>

                  <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors mb-2">
                    Taxi from {fromName} to {toName}
                  </h3>

                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                    {content?.description || `Comfortable private taxi from ${fromName} to ${toName}. Clean vehicle and experienced driver.`}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground pt-3 border-t border-border/60">
                    {content?.distance && (
                      <span className="inline-flex items-center gap-1 bg-muted px-2 py-0.5 rounded font-medium text-foreground">
                        <MapPin className="w-3 h-3 text-primary" />
                        {content.distance}
                      </span>
                    )}
                    {content?.duration && (
                      <span className="inline-flex items-center gap-1 bg-muted px-2 py-0.5 rounded font-medium text-foreground">
                        <Clock className="w-3 h-3 text-primary" />
                        {content.duration}
                      </span>
                    )}
                    <span className="ml-auto text-primary font-semibold text-xs inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      Fares <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Expandable All 33 Destinations Section */}
        <div className="max-w-4xl mx-auto">
          <details className="group bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
            <summary className="flex items-center justify-between p-5 cursor-pointer list-none select-none hover:bg-muted/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm sm:text-base">
                    Looking for a specific city? Browse all 33 Sri Lanka destinations
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Click to explore our island-wide destination guides, hotel pickups, and local taxi fares.
                  </p>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform duration-200" />
            </summary>

            <div className="p-6 border-t border-border bg-muted/10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-xs">
              {destinationClusters.map((cluster) => (
                <div key={cluster.region}>
                  <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider mb-2.5 pb-1 border-b border-border/60">
                    {cluster.region}
                  </h4>
                  <ul className="space-y-1.5">
                    {cluster.items.map((item) => (
                      <li key={item.slug}>
                        <Link
                          to={`/taxi/${item.slug}`}
                          className="text-muted-foreground hover:text-primary transition-colors block py-0.5"
                        >
                          {item.name} Taxi
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
