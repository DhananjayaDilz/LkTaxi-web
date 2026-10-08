import TransferGuide from "@/components/TransferGuide";
import { useParams, Navigate, Link } from "react-router-dom";
import { parseRouteSlug, popularRoutes, getRouteSlug } from "../data/routes";
import { formatLocationName } from "../data/locations";
import { routeContent } from "../data/route-content";
import HeroSection from "../components/HeroSection";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import ServicesSection from "../components/ServicesSection";
import AboutSection from "../components/AboutSection";
import ReviewsSection from "../components/ReviewsSection";
import FAQSection from "../components/FAQSection";
import ContactSection from "../components/ContactSection";
import { parseDistanceKm, getFareTable, formatLKR } from "@/lib/fare-estimate";

const RoutePage = () => {
  const { slug: routeSlug } = useParams<{ slug: string }>();

  const parsedRoute = routeSlug ? parseRouteSlug(routeSlug) : null;

  if (!parsedRoute) {
    return <Navigate to="/404" replace />;
  }

  const { from, to } = parsedRoute;
  const fromName = formatLocationName(from);
  const toName = formatLocationName(to);
  const content = routeSlug ? routeContent[routeSlug] : undefined;

  const distanceKm = content ? parseDistanceKm(content.distance) : 0;
  const fareTable = distanceKm > 0 ? getFareTable(distanceKm) : [];
  const startingPrice = fareTable.length > 0 ? formatLKR(fareTable[0].lkr) : "Contact Us";

  const relatedRoutes = popularRoutes
    .filter(r => (r.from === from || r.to === to) && (r.from !== from || r.to !== to))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection 
          title={`Taxi from ${fromName} to ${toName}`}
          subtitle={content?.description || `Arrange a private transfer from ${fromName} to ${toName}. Confirm your pickup, vehicle and price with our team.`}
        />
        <TransferGuide route={routeSlug} />

        {/* Route details with distance, time, and pricing */}
        {content && (
          <section className="container py-8 max-w-4xl">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
                <p className="text-sm text-muted-foreground mb-1">Distance</p>
                <p className="text-2xl font-bold text-foreground">{content.distance}</p>
              </div>
              <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
                <p className="text-sm text-muted-foreground mb-1">Travel Time</p>
                <p className="text-2xl font-bold text-foreground">{content.duration}</p>
              </div>
              <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
                <p className="text-sm text-muted-foreground mb-1">Starting From</p>
                <p className="text-2xl font-bold text-primary">{startingPrice}</p>
              </div>
            </div>
          </section>
        )}

        <ServicesSection />

        <section className="container py-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Transfer from {fromName} to {toName}</h2>
          <div className="prose prose-lg max-w-4xl mx-auto dark:prose-invert">
            <p>
              {content?.description || `Looking for a comfortable and safe taxi from ${fromName} to ${toName}? LKTaxi provides professional private transfer services between these destinations. Avoid the crowds of public transport and enjoy the beauty of Sri Lanka from the comfort of your private car.`}
            </p>

            {content?.scenicHighlights && (
              <>
                <h3 className="text-2xl font-semibold mt-8 mb-4">Scenic Highlights Along the Route</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {content.scenicHighlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </>
            )}

            {content?.travelTips && (
              <>
                <h3 className="text-2xl font-semibold mt-8 mb-4">Travel Tips</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {content.travelTips.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </>
            )}

            <h3 className="text-2xl font-semibold mt-8 mb-4">Journey Highlights</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Direct door-to-door transfer</li>
              <li>Optional stops for photo opportunities or refreshments</li>
              <li>Fully air-conditioned modern vehicles</li>
              <li>Confirm tolls, parking and waiting charges in your quote</li>
              <li>Available 24 hours a day, 7 days a week</li>
            </ul>

            <h3 id="fares" className="text-2xl font-semibold mt-8 mb-4 scroll-mt-24">Estimated Taxi Fares</h3>
            {fareTable.length > 0 ? (
              <div className="overflow-x-auto mb-8">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="p-3 font-medium">Vehicle Type</th>
                      <th className="p-3 font-medium">Passengers</th>
                      <th className="p-3 font-medium">Est. Price (LKR)</th>
                      <th className="p-3 font-medium">Est. Price (USD)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fareTable.map((fare, i) => (
                      <tr key={i} className="border-b border-border">
                        <td className="p-3">{fare.label}</td>
                        <td className="p-3">{fare.passengers} pax</td>
                        <td className="p-3">{formatLKR(fare.lkr)}</td>
                        <td className="p-3">~ ${fare.usd}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-muted-foreground mt-2">
                  * Prices are estimated based on typical distance. Highway tolls and parking charges (if applicable) are extra. Contact us on WhatsApp for exact quotes.
                </p>
              </div>
            ) : (
              <p className="text-muted-foreground mb-8">
                Prices for this specific route depend on exact pickup and drop-off locations. Please contact us via WhatsApp for a custom quote.
              </p>
            )}

            {relatedRoutes.length > 0 && (
              <>
                <h3 className="text-2xl font-semibold mt-8 mb-4">Related Transfers</h3>
                <div className="flex flex-col gap-2">
                  {relatedRoutes.map((r, i) => (
                    <Link key={i} to={`/taxi/${getRouteSlug(r)}#fares`} className="text-primary hover:underline">
                      Taxi from {formatLocationName(r.from)} to {formatLocationName(r.to)}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        <AboutSection />
        <ReviewsSection />

        {/* Route-specific FAQ or generic FAQ */}
        {content?.faqs && content.faqs.length > 0 ? (
          <FAQSection customFaqs={content.faqs} locationName={`${fromName} to ${toName}`} />
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

export default RoutePage;
