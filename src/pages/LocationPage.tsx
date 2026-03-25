import React, { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Location, locations, formatLocationName } from "../data/locations";
import { generateLocationMetadata, generateStructuredData } from "../lib/seo-utils";
import HeroSection from "../components/HeroSection";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import ServicesSection from "../components/ServicesSection";
import FAQSection from "../components/FAQSection";
import ContactSection from "../components/ContactSection";

const LocationPage = () => {
  const { location } = useParams<{ location: string }>();

  if (!location || !locations.includes(location as Location)) {
    return <Navigate to="/404" replace />;
  }

  const loc = location as Location;
  const name = formatLocationName(loc);
  const metadata = generateLocationMetadata(loc);
  const schema = generateStructuredData(loc);

  useEffect(() => {
    document.title = metadata.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", metadata.description);
    } else {
      const newMeta = document.createElement("meta");
      newMeta.name = "description";
      newMeta.content = metadata.description;
      document.head.appendChild(newMeta);
    }

    // Add JSON-LD schema
    const existingScript = document.getElementById("json-ld-schema");
    if (existingScript) existingScript.remove();

    const script = document.createElement("script");
    script.id = "json-ld-schema";
    script.type = "application/ld+json";
    script.innerHTML = schema;
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById("json-ld-schema");
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [metadata, schema]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection 
          title={`Professional ${name} Taxi Service`}
          subtitle={`The most reliable and affordable private transfers to and from ${name}. Reliable drivers and clean vehicles.`}
        />
        <ServicesSection />
        <section className="container py-16">
          <h2 className="text-3xl font-bold mb-6 text-center">About {name} Taxi Service</h2>
          <div className="prose prose-lg max-w-4xl mx-auto dark:prose-invert">
            <p>
              Looking for a reliable taxi in {name}? LKTaxi offers the best private transport solutions
              for tourists and locals alike. Our {name} taxi service provides 24/7 support with 
              experienced drivers who know the area perfectly.
            </p>
            <p>
              Whether you are traveling from the airport to {name} or need a local transfer within 
              the city, our fleet of modern, air-conditioned cars is at your service. 
              Book {name} taxi today for an stress-free journey.
            </p>
            <h3 className="text-2xl font-semibold mt-8 mb-4">Why choose our taxi in {name}?</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Punctual and professional local drivers</li>
              <li>Fixed, transparent pricing with no hidden fees</li>
              <li>Modern vehicles with ample space for luggage</li>
              <li>Easy booking via WhatsApp or online form</li>
              <li>Complimentary child seats available on request</li>
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

export default LocationPage;
