import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is LKTaxi available 24/7?",
    a: "Yes, LKTaxi operates 24 hours a day, 7 days a week to ensure travelers can get reliable transportation at any time in Sri Lanka. Whether it is airport pickup, late night travel, or early morning tours, our drivers are available to serve you safely and comfortably.",
  },
  {
    q: "How much does a taxi cost from Colombo Airport?",
    a: "A private taxi from Colombo Bandaranaike International Airport costs approximately LKR 3,500-5,000 to Negombo (15 minutes), LKR 8,000-12,000 to Colombo city center (45-60 minutes), and LKR 25,000-35,000 to Kandy (3.5-4 hours). Pre-booked taxis include meet-and-greet service at arrivals.",
  },
  {
    q: "Do I need to pay an advance for a taxi booking?",
    a: "For normal taxi rides no advance payment is required. However for long tours or special bookings we may request a small 25% advance to confirm the reservation.",
  },
  {
    q: "Are your drivers English speaking?",
    a: "Yes, our drivers are professional and experienced in working with international travelers. Most drivers speak English and are friendly, helpful, and knowledgeable about Sri Lanka's destinations.",
  },
  {
    q: "How do I book a taxi with LKTaxi?",
    a: "You can book a taxi with LKTaxi via WhatsApp (+94 70 5000 526) or through the booking form on our website. Simply select your pickup and drop location, choose a vehicle type, and confirm your booking. We respond within minutes.",
  },
  {
    q: "What vehicles does LKTaxi offer?",
    a: "LKTaxi offers a range of vehicles including comfortable sedans for couples, spacious SUVs for families, and large vans for groups. For Yala safaris, we provide 4x4 Bolero and Hilux jeeps. All vehicles are air-conditioned and well-maintained.",
  },
  {
    q: "How much does a Yala safari cost?",
    a: "A half-day private Yala safari costs approximately Rs. 15,000-16,000 for the jeep, plus park entrance fees. A full-day safari costs Rs. 30,000-32,000. Shared safaris start from $60 per person including entrance tickets, water, and breakfast.",
  },
];

const FAQSection = () => (
  <section className="section-padding bg-background">
    <div className="container mx-auto max-w-3xl">
      <div className="text-center mb-12">
        <h2 className="section-title mb-4">Frequently Asked <span className="text-primary">Questions</span></h2>
        <p className="section-subtitle">Everything you need to know about taxi services and travel in Sri Lanka.</p>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-6 bg-card">
            <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
