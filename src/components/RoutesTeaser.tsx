import { Link } from "react-router-dom";
import { popularRoutes, getRouteSlug } from "@/data/routes";
import { formatLocationName } from "@/data/locations";
import { routeContent } from "@/data/route-content";
import { MapPin, Clock, ArrowRight, Compass, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

// Curated top 4 showcase routes for the homepage teaser
const featuredSlugs = [
  "airport-to-kandy",
  "colombo-to-ella",
  "ella-to-yala",
  "airport-to-mirissa",
];

export default function RoutesTeaser() {
  const featuredRoutes = popularRoutes.filter((r) =>
    featuredSlugs.includes(getRouteSlug(r))
  );

  return (
    <section id="routes-preview" className="section-padding bg-muted/20 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Island-Wide Transfer Network</span>
          </div>
          <h2 className="section-title mb-3">
            Popular Taxi Routes Across <span className="text-primary">Sri Lanka</span>
          </h2>
          <p className="section-subtitle">
            Fixed-rate private transfers connecting Colombo Airport, the central tea country, wildlife safari parks, and southern surf beaches.
          </p>
        </div>

        {/* 4 Preview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-10">
          {featuredRoutes.map((route) => {
            const slug = getRouteSlug(route);
            const content = routeContent[slug];
            const fromName = formatLocationName(route.from);
            const toName = formatLocationName(route.to);

            return (
              <Link
                key={slug}
                to={`/taxi/${slug}`}
                className="bg-card p-5 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-semibold text-primary block mb-1">
                    {fromName} &rarr; {toName}
                  </span>
                  <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors mb-2">
                    Taxi to {toName}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                    {content?.description || `Private air-conditioned taxi from ${fromName} to ${toName}.`}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                  {content?.distance && (
                    <span className="inline-flex items-center gap-1 font-medium text-foreground">
                      <MapPin className="w-3 h-3 text-primary" />
                      {content.distance}
                    </span>
                  )}
                  {content?.duration && (
                    <span className="inline-flex items-center gap-1 font-medium text-foreground">
                      <Clock className="w-3 h-3 text-primary" />
                      {content.duration}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Prominent CTA to Dedicated Routes Page */}
        <div className="text-center px-2">
          <Link to="/routes#routes" className="inline-block max-w-full">
            <Button
              size="lg"
              className="w-full sm:w-auto h-auto py-3.5 px-6 text-sm sm:text-base font-bold shadow-md hover:shadow-lg transition-all gap-2 group whitespace-normal text-center"
            >
              <Sparkles className="w-4 h-4 text-primary-foreground shrink-0 group-hover:rotate-12 transition-transform" />
              <span>Explore All Routes &amp; Destinations</span>
              <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <p className="text-xs text-muted-foreground mt-3 max-w-md mx-auto">
            Browse fixed fares, departure hubs, travel times, and detailed route guides across Sri Lanka.
          </p>
        </div>
      </div>
    </section>
  );
}
