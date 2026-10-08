import airportImg from "@/assets/sri-lanka-airport-taxi-transfer-service.webp";
import dayToursImg from "@/assets/sri-lanka-private-day-tours-from-colombo.webp";
import longToursImg from "@/assets/sri-lanka-private-multi-day-round-tours.webp";
import hotelImg from "@/assets/sri-lanka-hotel-taxi-transfer-service.webp";

const services = [
  {
    title: "Airport Transfer",
    link: "/airport-transfer",
    image: airportImg,
    short: "Reliable airport pickup and drop-off services at Bandaranaike International Airport. Fixed prices, flight tracking, and meet & greet included.",
    detail: "Our airport transfer service covers all major airports in Sri Lanka. We monitor flight schedules to ensure timely pickups.",
  },
  {
    title: "Sri Lanka Tour Packages",
    link: "/sri-lanka-tour-packages",
    image: longToursImg,
    short: "Multi-day tour packages across Sri Lanka with comfortable vehicles and experienced driver-guides. Discover the island's diverse landscapes.",
    detail: "We offer customizable 3-14 day itineraries covering the Cultural Triangle, Hill Country, and Southern Coast beaches.",
  },
  {
    title: "Hire a Private Driver",
    link: "/private-driver-sri-lanka",
    image: dayToursImg,
    short: "The most comfortable way to explore Sri Lanka. Rent a car with an experienced English-speaking chauffeur to travel at your own pace.",
    detail: "Perfect for hotel-to-hotel transfers, daily excursions, or multi-week road trips. Comfortable sedans and vans available.",
  },
  {
    title: "Yala Safari",
    link: "/yala-safari",
    image: hotelImg, // We can reuse an image or use a safari image if available, but for now reuse hotelImg or import a safari image
    short: "Unforgettable wildlife adventure in Yala National Park. Private 4x4 Jeep Tours with expert local trackers from Tissamaharama.",
    detail: "Choose from morning, afternoon, or full-day leopard safaris. Transparent pricing including jeep and park entrance fees.",
  },
];

const ServicesSection = () => {

  return (
    <section id="services" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Our <span className="text-primary">Services</span></h2>
          <p className="section-subtitle">Professional transportation services tailored for every traveler in Sri Lanka</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <a key={s.title} href={s.link} className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group flex flex-col">
              <div className="h-48 overflow-hidden">
                <img src={s.image} alt={s.title} width="600" height="400" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 flex-grow">{s.short}</p>
                <span className="text-primary font-medium text-sm mt-auto inline-flex items-center">
                  Learn more &rarr;
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
