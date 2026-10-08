import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import SafariSection from "@/components/SafariSection";
import FAQSection from "@/components/FAQSection";

const YalaSafari = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection 
          title="Yala Safari Booking from Tissamaharama"
          subtitle="Experience the best leopard safari in Sri Lanka. Private Jeep Tours with experienced wildlife trackers."
        />
        <SafariSection />
        <section className="container py-16 prose prose-lg dark:prose-invert max-w-4xl mx-auto">
          <h2>Yala National Park Safari Tours</h2>
          <p>
            Join us for an unforgettable wildlife adventure in Yala National Park, famous for its high density of leopards, elephants, sloth bears, and diverse birdlife. We are based in Tissamaharama, the gateway to Yala.
          </p>
          <h3>Our Safari Packages</h3>
          <ul>
            <li><strong>Morning Safari:</strong> 5:00 AM - 10:00 AM. Best time for leopard sightings and active wildlife.</li>
            <li><strong>Afternoon Safari:</strong> 2:00 PM - 6:00 PM. Great for elephants and sunset photography.</li>
            <li><strong>Full Day Safari:</strong> 5:00 AM - 6:00 PM. Maximum chances to see all major species. Includes lunch inside the park.</li>
          </ul>
          <h3>Why Book Your Yala Safari With Us?</h3>
          <ul>
            <li><strong>Expert Local Trackers:</strong> Our drivers know the park inside out and can spot wildlife you might miss.</li>
            <li><strong>Private Comfortable Jeeps:</strong> Modified 4x4 safari jeeps (Toyota Hilux, Mahindra Bolero) with comfortable elevated seating.</li>
            <li><strong>Transparent Pricing:</strong> Our quotes include jeep hire, park entrance fees, and tracker fees. No hidden costs.</li>
          </ul>
        </section>
        <FAQSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default YalaSafari;
