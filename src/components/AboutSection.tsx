import { Users, Clock, ThumbsUp } from "lucide-react";

const AboutSection = () => {

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center mb-16">
          {/* Left Column: Text */}
          <div className="text-left">
            <h2 className="section-title mb-6 md:text-left text-center">
              About <span className="text-primary">LKTaxi</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-medium text-center md:text-left">
              LKTaxi is a trusted taxi service in Sri Lanka providing professional drivers and comfortable vehicles for tourists and locals. We focus on safe, reliable and affordable transportation across Sri Lanka including airport transfers, day tours and long distance travel.
            </p>
            <div className="space-y-4 text-muted-foreground animate-fade-in text-justify md:text-left">
              <p>
                Based in Tissamaharama, LKTaxi arranges private transfers, airport pickups and tours across Sri Lanka. Tell us your itinerary, passenger count and luggage requirements so we can help you choose a suitable car or van.
              </p>
              <p>
                Whether you are arriving at Bandaranaike International Airport, exploring the ancient ruins of Anuradhapura, surfing in Arugam Bay, or hiking through the lush tea plantations of Ella, LKTaxi ensures you travel in comfort and style. Our experienced drivers are well-versed in Sri Lanka's roads and attractions, offering valuable insights along the way.
              </p>
              <p>
                We pride ourselves on transparent pricing, punctual service, and a commitment to making your Sri Lankan adventure unforgettable. Book with LKTaxi and experience the beauty of Sri Lanka stress-free.
              </p>
            </div>
          </div>

          {/* Right Column: Premium Bundled Photo Collage */}
          <div className="relative w-full h-[380px] sm:h-[480px] max-w-lg mx-auto flex items-center justify-center pt-8 lg:pt-0">
            {/* Center Image (Main) */}
            <div className="absolute z-30 w-[55%] aspect-[3/4] rounded-2xl shadow-2xl overflow-hidden border-[6px] border-background transition-transform duration-500 hover:scale-[1.03]">
              <img src="/lktaxi-sri-lanka-private-driver-tour-guide.webp" alt="Professional private driver and tour guide for Sri Lanka tours by LkTaxi" className="w-full h-full object-cover" loading="lazy" />
            </div>
            
            {/* Left Image (Tilted Left) */}
            <div className="absolute z-20 w-[48%] aspect-[3/4] rounded-2xl shadow-xl overflow-hidden border-[6px] border-background -translate-x-[50%] translate-y-[5%] -rotate-[10deg] transition-all duration-500 hover:-rotate-[4deg] hover:z-40 hover:scale-[1.03] opacity-95">
              <img src="/lktaxi-comfortable-taxi-service-sri-lanka.webp" alt="Safe and comfortable private taxi service across Sri Lanka" className="w-full h-full object-cover" loading="lazy" />
            </div>

            {/* Right Image (Tilted Right) */}
            <div className="absolute z-10 w-[48%] aspect-[3/4] rounded-2xl shadow-xl overflow-hidden border-[6px] border-background translate-x-[50%] translate-y-[10%] rotate-[10deg] transition-all duration-500 hover:rotate-[4deg] hover:z-40 hover:scale-[1.03] opacity-95">
              <img src="/lktaxi-reliable-airport-transfer-sri-lanka.webp" alt="Reliable airport transfers and drop-offs by LkTaxi Sri Lanka" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Why Choose Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Users, label: "Private Cars & Vans", desc: "Experienced, English-speaking drivers" },
              { icon: Clock, label: "24/7 Service Available", desc: "Round the clock transportation" },
              { icon: ThumbsUp, label: "Direct Booking Support", desc: "Discuss your journey with our team" },
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
              src="/sri-lanka-private-taxi-and-tours-hero.webp"
              alt="LKTaxi providing comfortable private transfers and tours across Sri Lanka"
              className="hidden md:block w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />

            {/* Mobile Image */}
            <img
              src="/sri-lanka-private-taxi-and-tours-mobile.webp"
              alt="LKTaxi providing comfortable private transfers and tours across Sri Lanka on mobile"
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
