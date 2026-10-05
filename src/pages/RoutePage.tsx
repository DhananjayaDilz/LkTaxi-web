import TransferGuide from "@/components/TransferGuide";
import { useParams, Navigate } from "react-router-dom";
import { parseRouteSlug } from "../data/routes";
import { formatLocationName } from "../data/locations";
import { routeContent } from "../data/route-content";
import HeroSection from "../components/HeroSection";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import ServicesSection from "../components/ServicesSection";
import FAQSection from "../components/FAQSection";
import ContactSection from "../components/ContactSection";

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
                <p className="text-2xl font-bold text-primary">{content.priceRange}</p>
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
          </div>
        </section>

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
