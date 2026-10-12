import TransferGuide from "@/components/TransferGuide";
import { useParams, Navigate, Link } from "react-router-dom";
import { Location, locations, formatLocationName } from "../data/locations";
import { locationContent } from "../data/location-content";
import { popularRoutes, getRouteSlug } from "../data/routes";
import { routeContent } from "../data/route-content";
import HeroSection from "../components/HeroSection";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import ServicesSection from "../components/ServicesSection";
import FAQSection from "../components/FAQSection";
import ContactSection from "../components/ContactSection";

const LocationPage = () => {
  const { slug: location } = useParams<{ slug: string }>();

  if (!location || !locations.includes(location as Location)) {
    return <Navigate to="/404" replace />;
  }

  const loc = location as Location;
  const name = formatLocationName(loc);
  const content = locationContent[loc];

  const directRoutes = popularRoutes.filter(r => r.from === loc || r.to === loc);
  const fallbackRoutes = popularRoutes.slice(0, 4);
  const displayedRoutes = directRoutes.length > 0 ? directRoutes : fallbackRoutes;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection 
          title={`Professional ${name} Taxi Service`}
          subtitle={content?.intro || `Arrange private transfers to and from ${name}. Reliable drivers and clean vehicles.`}
        />
        <TransferGuide location={loc} />

        {/* Unique destination content */}
        <section className="container py-16">
          <h2 className="text-3xl font-bold mb-6 text-center">About {name} Taxi Service</h2>
          <div className="prose prose-lg max-w-4xl mx-auto dark:prose-invert">
            <p>{content?.intro || `Looking for a reliable taxi in ${name}? LKTaxi offers the best private transport solutions for tourists and locals alike. Our ${name} taxi service provides 24/7 support with experienced drivers who know the area perfectly.`}</p>

            {content?.highlights && (
              <>
                <h3 className="text-2xl font-semibold mt-8 mb-4">Key Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {content.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </>
            )}

            {content?.travelTip && (
              <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg mt-6">
                <p className="font-semibold text-foreground mb-1">💡 Travel Tip</p>
                <p className="text-muted-foreground">{content.travelTip}</p>
              </div>
            )}

            <h3 className="text-2xl font-semibold mt-8 mb-4">Why choose our taxi in {name}?</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Punctual and professional local drivers</li>
              <li>Confirm your fare and inclusions before booking</li>
              <li>Modern vehicles with ample space for luggage</li>
              <li>Easy booking via WhatsApp or online form</li>
              <li>Ask about child-seat availability before booking</li>
            </ul>

            {content?.nearbyAttractions && (
              <>
                <h3 className="text-2xl font-semibold mt-8 mb-4">Nearby Attractions</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {content.nearbyAttractions.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>

        {/* Bidirectional Transfer Routes connected to this location */}
        <section className="container py-12 max-w-4xl border-t border-border">
          <h2 className="text-2xl font-bold mb-3 text-center md:text-left">
            {directRoutes.length > 0
              ? `Popular Taxi Routes Connecting ${name}`
              : `Popular Sri Lanka Taxi Transfers from ${name}`}
          </h2>
          <p className="text-sm text-muted-foreground mb-6 text-center md:text-left">
            Pre-book your private transfer with fixed rates, air-conditioned sedans or vans, and English-speaking drivers.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {displayedRoutes.map((r) => {
              const rSlug = getRouteSlug(r);
              const rData = routeContent[rSlug];
              return (
                <Link
                  key={rSlug}
                  to={`/taxi/${rSlug}`}
                  className="p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-base mb-1">
                      {formatLocationName(r.from)} to {formatLocationName(r.to)}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {rData ? `${rData.distance} • ~${rData.duration}` : "Door-to-door private transfer"}
                    </p>
                  </div>
                  <span className="text-primary text-xs font-medium mt-3 inline-flex items-center">
                    View Route &amp; Fares &rarr;
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Location-specific FAQ or generic FAQ */}
        {content?.faqs && content.faqs.length > 0 ? (
          <FAQSection customFaqs={content.faqs} locationName={name} />
        ) : (
          <FAQSection />
        )}
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default LocationPage;
