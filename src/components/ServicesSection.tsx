import { useState } from "react";
import { Button } from "@/components/ui/button";
import airportImg from "@/assets/airport-transfer.webp";
import dayToursImg from "@/assets/day-tours.jpg";
import longToursImg from "@/assets/long-tours.webp";
import hotelImg from "@/assets/hotel-transfer.jpg";

const services = [
  {
    title: "Airport Transfer",
    image: airportImg,
    short: "Reliable airport pickup and drop-off services at Bandaranaike International Airport. Comfortable vehicles with professional drivers for a stress-free start to your Sri Lanka journey.",
    detail: "Our airport transfer service covers all major airports in Sri Lanka. We monitor flight schedules to ensure timely pickups and offer meet-and-greet services for international travelers.",
  },
  {
    title: "Day Tours",
    image: dayToursImg,
    short: "Explore Sri Lanka's best attractions in a single day with our customized day tour packages. Visit ancient temples, wildlife parks, and scenic viewpoints with expert guidance.",
    detail: "Popular day tours include Sigiriya & Dambulla, Kandy Temple Tour, Galle Fort & Southern Coast, and Pinnawala Elephant Orphanage visits.",
  },
  {
    title: "Long Tours",
    image: longToursImg,
    short: "Multi-day tour packages across Sri Lanka with comfortable vehicles and experienced drivers who double as guides. Discover the island's diverse landscapes and rich culture.",
    detail: "We offer customizable 3-14 day itineraries covering the Cultural Triangle, Hill Country, Southern Coast, and Northern heritage sites with accommodation recommendations.",
  },
  {
    title: "Hotel Transfer",
    image: hotelImg,
    short: "Seamless hotel-to-hotel transfer services across Sri Lanka. Whether you're moving between cities or heading to a remote beach resort, we ensure comfortable and timely transportation.",
    detail: "Our hotel transfer service includes door-to-door pickup, luggage assistance, and flexible scheduling to match your travel plans perfectly.",
  },
];

const ServicesSection = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="services" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Our <span className="text-primary">Services</span></h2>
          <p className="section-subtitle">Professional transportation services tailored for every traveler in Sri Lanka</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div key={s.title} className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group">
              <div className="h-48 overflow-hidden">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{s.short}</p>
                {expanded === i && (
                  <p className="text-sm text-muted-foreground mb-3 animate-fade-in">{s.detail}</p>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="text-primary hover:text-primary/80 p-0 h-auto font-semibold"
                >
                  {expanded === i ? "Show Less" : "Learn More →"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
