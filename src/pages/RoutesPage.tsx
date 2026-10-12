import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import RoutesExplorer from "@/components/RoutesExplorer";
import TransferGuide from "@/components/TransferGuide";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import HeroSection from "@/components/HeroSection";

export default function RoutesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection
          title="Sri Lanka Taxi Routes & Destination Directory"
          subtitle="Explore fixed-rate private transfers across Sri Lanka. Filter by departure hub, view travel times, compare distances, and read comprehensive guides for all 33 destinations."
        />

        {/* Transfer Planning Guide */}
        <TransferGuide />

        {/* Full Interactive Routes & Destination Explorer with Hub Dropdowns */}
        <RoutesExplorer />

        {/* FAQ Section */}
        <FAQSection />

        {/* Contact Form */}
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
