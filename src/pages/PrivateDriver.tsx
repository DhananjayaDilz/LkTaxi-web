import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServicesSection from "@/components/ServicesSection";
import FAQSection from "@/components/FAQSection";

const PrivateDriver = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection 
          title="Hire a Private Driver in Sri Lanka"
          subtitle="Car with Driver Tours. The most comfortable and flexible way to explore Sri Lanka at your own pace."
        />
        <section className="container py-16 prose prose-lg dark:prose-invert max-w-4xl mx-auto">
          <h2>Sri Lanka Private Driver Services</h2>
          <p>
            Renting a car with a private chauffeur-guide is the best way to travel around Sri Lanka. Avoid the stress of navigating local traffic and public transport, and enjoy the scenic drives while your experienced driver handles the roads.
          </p>
          <h3>What's Included in a Chauffeur Tour?</h3>
          <ul>
            <li><strong>Professional English-speaking Driver:</strong> Your driver is also a knowledgeable guide who can help you discover hidden gems.</li>
            <li><strong>Comfortable Air-Conditioned Vehicle:</strong> We provide modern Sedans for couples and Vans for families or groups.</li>
            <li><strong>Flexible Itinerary:</strong> You have the freedom to change plans, stop for photos, or take detours.</li>
            <li><strong>Driver's Accommodation & Meals:</strong> Generally included in our daily rate or managed by the driver (depending on the package).</li>
          </ul>
          <h3>How It Works</h3>
          <p>
            You can hire our drivers for a few days to explore the South Coast, or for a multi-week round trip covering the Cultural Triangle, Tea Country, and beaches. Let us know your itinerary and we will provide a comprehensive quote.
          </p>
        </section>
        <ServicesSection />
        <FAQSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default PrivateDriver;
