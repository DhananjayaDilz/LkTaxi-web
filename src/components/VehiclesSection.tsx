import miniCarImg from "@/assets/suzuki-wagon-r-mini-taxi-sri-lanka.webp";
import sedanImg from "@/assets/toyota-prius-sedan-taxi-sri-lanka.webp";
import kdhImg from "@/assets/toyota-kdh-flat-roof-van-sri-lanka.webp";
import kdhHighroofImg from "@/assets/toyota-kdh-high-roof-van-sri-lanka.webp";
import minivan from "@/assets/honda-freed-mini-van-taxi-sri-lanka.webp"

const vehiclesData = [
  { name: "MINI CAR", image: miniCarImg, desc: "Compact and economical, perfect for short city rides and airport transfers for solo travelers or couples.", passengers: "1-3" },
  { name: "SEDAN", image: sedanImg, desc: "Comfortable sedan ideal for families and small groups. Spacious trunk for luggage and smooth ride quality.", passengers: "1-4" },
  { name: "MINI VAN", image: minivan, desc: "Spacious van for group travel and long tours. Air-conditioned with ample luggage space for comfortable journeys.", passengers: "4-6" },
  { name: "KDH FLAT ROOF", image: kdhImg, desc: "Standard KDH van, perfect for group travel and long tours with ample luggage space.", passengers: "5-9" },
  { name: "KDH HIGH ROOF", image: kdhHighroofImg, desc: "Extra spacious high-roof van, perfect for large groups and extended tours with maximum comfort and headroom.", passengers: "7-12" },
];

const safariJeeps = [
  { 
    name: "MAHINDRA BOLERO", 
    image: "/mahindra-bolero-safari-jeep-yala.webp", 
    desc: "Reliable and comfortable 4x4 safari jeep, perfectly suited for the rugged terrain of Yala National Park.", 
    passengers: "1-6",
    alt: "Mahindra Bolero 4x4 safari jeep used for Yala National Park tours"
  },
  { 
    name: "TOYOTA HILUX", 
    image: "/toyota-hilux-safari-jeep-yala.webp", 
    desc: "Premium 4x4 safari experience with extra comfort and elevated seating for superior wildlife viewing.", 
    passengers: "1-6",
    alt: "Toyota Hilux comfortable safari jeep for Yala wildlife tours"
  },
];

const VehiclesSection = () => (
  <section id="vehicles" className="section-padding bg-background">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h2 className="section-title mb-4">Our <span className="text-primary">Vehicles</span></h2>
        <p className="section-subtitle">Well-maintained, air-conditioned vehicles for every travel need</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {vehiclesData.map((v) => (
          <div key={v.name} className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group border border-border">
            <div className="h-48 overflow-hidden">
              <img src={v.image} alt={v.name} width="500" height="300" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-foreground mb-1">{v.name}</h3>
              <span className="text-xs font-medium text-primary mb-2 inline-block">{v.passengers} Passengers</span>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Safari <span className="text-primary">Jeeps</span></h2>
        <p className="section-subtitle">Specially modified 4x4 jeeps for the ultimate Safari experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {safariJeeps.map((j) => (
          <div key={j.name} className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group border border-border">
            <div className="h-56 bg-muted relative overflow-hidden">
              <img 
                src={j.image} 
                alt={j.alt} 
                width="600"
                height="400"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                loading="lazy" 
              />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl text-foreground mb-2">{j.name}</h3>
              <span className="text-xs font-medium text-primary mb-3 inline-block">Up to {j.passengers} Passengers</span>
              <p className="text-sm text-muted-foreground leading-relaxed">{j.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default VehiclesSection;
