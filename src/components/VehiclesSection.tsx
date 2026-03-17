import miniCarImg from "@/assets/mini-car.webp";
import sedanImg from "@/assets/sedan.jpg";
import kdhImg from "@/assets/kdh.webp";
import kdhHighroofImg from "@/assets/kdh-highroof.jpg";

const vehiclesData = [
  { name: "MINI CAR", image: miniCarImg, desc: "Compact and economical, perfect for short city rides and airport transfers for solo travelers or couples.", passengers: "1-3" },
  { name: "SEDAN", image: sedanImg, desc: "Comfortable sedan ideal for families and small groups. Spacious trunk for luggage and smooth ride quality.", passengers: "1-4" },
  { name: "KDH VAN", image: kdhImg, desc: "Spacious van for group travel and long tours. Air-conditioned with ample luggage space for comfortable journeys.", passengers: "5-9" },
  { name: "KDH HIGHROOF", image: kdhHighroofImg, desc: "Extra spacious high-roof van, perfect for large groups and extended tours with maximum comfort and headroom.", passengers: "7-12" },
];

const VehiclesSection = () => (
  <section id="vehicles" className="section-padding bg-background">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h2 className="section-title mb-4">Our <span className="text-primary">Vehicles</span></h2>
        <p className="section-subtitle">Well-maintained, air-conditioned vehicles for every travel need</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {vehiclesData.map((v) => (
          <div key={v.name} className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group border border-border">
            <div className="h-48 overflow-hidden">
              <img src={v.image} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-foreground mb-1">{v.name}</h3>
              <span className="text-xs font-medium text-primary mb-2 inline-block">{v.passengers} Passengers</span>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default VehiclesSection;
