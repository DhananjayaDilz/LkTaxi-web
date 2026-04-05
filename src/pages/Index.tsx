import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import VehiclesSection from "@/components/VehiclesSection";
import SafariSection from "@/components/SafariSection";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
// import LeadershipSection from "@/components/LeadershipSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <>
      <WhatsAppButton />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <VehiclesSection />
        <SafariSection />
        <ReviewsSection />
        <FAQSection />
        {/* <LeadershipSection /> */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
