import TransferGuide from "@/components/TransferGuide";
import { useParams, Navigate } from "react-router-dom";
import { parseRouteSlug } from "../data/routes";
import { formatLocationName } from "../data/locations";
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



  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection 
          title={`Taxi from ${fromName} to ${toName}`}
          subtitle={`Arrange a private transfer from ${fromName} to ${toName}. Confirm your pickup, vehicle and price with our team.`}
        />
        <TransferGuide route={routeSlug} />
        <ServicesSection />
        <section className="container py-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Transfer from {fromName} to {toName}</h2>
          <div className="prose prose-lg max-w-4xl mx-auto dark:prose-invert">
            <p>
              Looking for a comfortable and safe taxi from {fromName} to {toName}? LKTaxi 
              provides professional private transfer services between these destinations. 
              Avoid the crowds of public transport and enjoy the beauty of Sri Lanka 
              from the comfort of your private car.
            </p>
            <p>
              Our drivers are highly experienced in the long-distance route from {fromName} to {toName}, 
              ensuring you get to your destination quickly and safely. We offer a variety of 
              vehicles to suit your needs, from standard sedans to large vans for families and groups.
            </p>
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
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default RoutePage;
