import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import ServicesSection from "@/components/ServicesSection";
import TransferGuide from "@/components/TransferGuide";
import FAQSection from "@/components/FAQSection";

const AirportTransfer = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection 
          title="Colombo Airport Transfers"
          subtitle="Fixed-Price Taxi from Bandaranaike International Airport (BIA). Pre-book your reliable private transfer to anywhere in Sri Lanka."
        />
        <TransferGuide />
        <section className="container py-16 prose prose-lg dark:prose-invert max-w-4xl mx-auto">
          <h2>Reliable Airport Taxi Service in Sri Lanka</h2>
          <p>
            Start your Sri Lankan holiday stress-free with our private airport transfer service. We monitor your flight for delays, meet you at the arrivals hall with a nameboard, and drive you directly to your hotel.
          </p>
          <h3>Why Choose LKTaxi for Your Airport Transfer?</h3>
          <ul>
            <li><strong>Fixed Prices:</strong> No hidden fees, tolls and parking included in the quote.</li>
            <li><strong>Meet & Greet:</strong> Driver waits at the arrivals hall with a name sign.</li>
            <li><strong>Flight Tracking:</strong> We adjust pickup time if your flight is delayed.</li>
            <li><strong>Comfortable Vehicles:</strong> Fully air-conditioned cars, vans, and minibuses.</li>
          </ul>
          <h3>Popular Airport Taxi Routes</h3>
          <p>
            We provide transfers to all major tourist destinations including <a href="/taxi/airport-to-colombo" className="text-primary hover:underline">Colombo</a>, 
            <a href="/taxi/airport-to-negombo" className="text-primary hover:underline">Negombo</a>, 
            <a href="/taxi/airport-to-galle" className="text-primary hover:underline">Galle</a>, 
            <a href="/taxi/airport-to-unawatuna" className="text-primary hover:underline">Unawatuna</a>, 
            <a href="/taxi/airport-to-mirissa" className="text-primary hover:underline">Mirissa</a>, 
            <a href="/taxi/airport-to-ella" className="text-primary hover:underline">Ella</a>, 
            <a href="/taxi/airport-to-kandy" className="text-primary hover:underline">Kandy</a>, 
            and <a href="/taxi/airport-to-yala" className="text-primary hover:underline">Yala</a>. 
            Check our fare calculator above for an instant estimate.
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

export default AirportTransfer;
