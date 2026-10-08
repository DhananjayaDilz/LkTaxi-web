import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServicesSection from "@/components/ServicesSection";
import FAQSection from "@/components/FAQSection";

const TourPackages = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection 
          title="Sri Lanka Tour Packages"
          subtitle="Discover the best of Sri Lanka with our carefully curated private tour itineraries."
        />
        <section className="container py-16 prose prose-lg dark:prose-invert max-w-4xl mx-auto">
          <h2>Private Tour Itineraries</h2>
          <p>
            Whether you have a few days or a few weeks, our private tour packages are designed to showcase the incredible diversity of Sri Lanka. All tours include a private vehicle and an experienced English-speaking driver-guide.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose mt-8">
            <div className="border rounded-xl p-6 bg-card text-card-foreground shadow-sm">
              <h3 className="text-xl font-bold mb-2">South Coast & Safari (5 Days)</h3>
              <p className="text-muted-foreground mb-4">Colombo - Galle - Mirissa - Yala National Park - Colombo</p>
              <ul className="text-sm space-y-1 mb-4 text-muted-foreground">
                <li>• Galle Fort exploration</li>
                <li>• Whale watching in Mirissa</li>
                <li>• Leopard safari in Yala</li>
                <li>• Relaxing on southern beaches</li>
              </ul>
              <a href="#contact" className="text-primary font-medium hover:underline">Contact us to customize &rarr;</a>
            </div>

            <div className="border rounded-xl p-6 bg-card text-card-foreground shadow-sm">
              <h3 className="text-xl font-bold mb-2">Classic Sri Lanka (7 Days)</h3>
              <p className="text-muted-foreground mb-4">Colombo - Kandy - Nuwara Eliya - Ella - Yala - South Coast</p>
              <ul className="text-sm space-y-1 mb-4 text-muted-foreground">
                <li>• Temple of the Tooth</li>
                <li>• Scenic tea plantations & waterfalls</li>
                <li>• Famous Ella train ride</li>
                <li>• Wildlife safari</li>
              </ul>
              <a href="#contact" className="text-primary font-medium hover:underline">Contact us to customize &rarr;</a>
            </div>
            
            <div className="border rounded-xl p-6 bg-card text-card-foreground shadow-sm">
              <h3 className="text-xl font-bold mb-2">Grand Island Tour (14 Days)</h3>
              <p className="text-muted-foreground mb-4">Comprehensive tour covering the Cultural Triangle, Hill Country, and Beaches.</p>
              <ul className="text-sm space-y-1 mb-4 text-muted-foreground">
                <li>• Sigiriya, Polonnaruwa, Dambulla</li>
                <li>• Kandy & Tea Country</li>
                <li>• Multiple national parks</li>
                <li>• Extended beach stay</li>
              </ul>
              <a href="#contact" className="text-primary font-medium hover:underline">Contact us to customize &rarr;</a>
            </div>
          </div>
          
          <h3 className="mt-12">Customise Your Tour</h3>
          <p>
            These packages are just starting points. We specialize in tailor-made holidays. Contact us on WhatsApp with your preferences, travel dates, and group size, and we will craft the perfect Sri Lanka itinerary for you.
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

export default TourPackages;
