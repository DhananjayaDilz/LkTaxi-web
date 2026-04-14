import { useState } from "react";
import { ChevronDown, ChevronUp, Users, Clock, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="section-title mb-4">
            About <span className="text-primary">LKTaxi</span>
          </h2>
          <p className="section-subtitle">
            LKTaxi is a trusted taxi service in Sri Lanka providing professional drivers and comfortable vehicles for tourists and locals. We focus on safe, reliable and affordable transportation across Sri Lanka including airport transfers, day tours and long distance travel.
          </p>
          {expanded && (
            <div className="mt-4 text-muted-foreground animate-fade-in">
              <p className="mb-3">
                With years of experience in Sri Lanka's tourism industry, LKTaxi has built a strong reputation for providing top-quality transportation services. Our fleet includes modern sedans, spacious vans, and luxury vehicles to cater to every traveler's needs.
              </p>
              <p className="mb-3">
                Whether you are arriving at Bandaranaike International Airport, exploring the ancient ruins of Anuradhapura, surfing in Arugam Bay, or hiking through the lush tea plantations of Ella, LKTaxi ensures you travel in comfort and style. Our experienced drivers are well-versed in Sri Lanka's roads and attractions, offering valuable insights along the way.
              </p>
              <p>
                We pride ourselves on transparent pricing, punctual service, and a commitment to making your Sri Lankan adventure unforgettable. Book with LKTaxi and experience the beauty of Sri Lanka stress-free.
              </p>
            </div>
          )}
          <Button
            variant="outline"
            onClick={() => setExpanded(!expanded)}
            className="mt-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            {expanded ? "Show Less" : "Learn More"}
            {expanded ? <ChevronUp className="ml-2 w-4 h-4" /> : <ChevronDown className="ml-2 w-4 h-4" />}
          </Button>
        </div>

        {/* Why Choose Us */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Why Choose Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Users, label: "10+ Professional Drivers", desc: "Experienced, English-speaking drivers" },
              { icon: Clock, label: "24/7 Service Available", desc: "Round the clock transportation" },
              { icon: ThumbsUp, label: "100% Customer Satisfaction", desc: "Trusted by thousands of travelers" },
            ].map((item) => (
              <div key={item.label} className="text-center p-6 rounded-xl bg-muted/50">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-bold text-foreground mb-1">{item.label}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto mb-16">
            Our team has strong experience in Sri Lanka tourism and provides comfortable vehicles with friendly drivers.
          </p>

          {/* Sri Lanka Tour Image Section */}
          <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10 pointer-events-none" />
            
            {/* Desktop Image */}
            <img 
              src="/srilanaka_tour.png" 
              alt="Sri Lanka Tour Map & Highlights" 
              className="hidden md:block w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
            
            {/* Mobile Image */}
            <img 
              src="/srilanka_tour_mo.png" 
              alt="Sri Lanka Tour Map & Highlights Mobile" 
              className="block md:hidden w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 z-20 pointer-events-none text-white hidden md:block">
              <h4 className="text-2xl font-bold mb-2 text-white">Explore Sri Lanka</h4>
              <p className="text-gray-200">Discover top destinations and ultimate routes tailored for your perfect journey.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
