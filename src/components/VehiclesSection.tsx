import miniCarImg from "@/assets/mini-car.jpg";
import sedanImg from "@/assets/sedan.jpg";
import kdhImg from "@/assets/kdh.jpg";
import kdhHighroofImg from "@/assets/kdh-highroof.jpg";
// Note: bolero.jpg and hilux.jpg need to be added to assets folder
// import boleroImg from "@/assets/bolero.jpg";
// import hiluxImg from "@/assets/hilux.jpg";

const vehiclesData = [
  { name: "MINI CAR", image: miniCarImg, desc: "Compact and economical, perfect for short city rides and airport transfers for solo travelers or couples.", passengers: "1-3" },
  { name: "SEDAN", image: sedanImg, desc: "Comfortable sedan ideal for families and small groups. Spacious trunk for luggage and smooth ride quality.", passengers: "1-4" },
  { name: "KDH VAN", image: kdhImg, desc: "Spacious van for group travel and long tours. Air-conditioned with ample luggage space for comfortable journeys.", passengers: "5-9" },
  { name: "KDH HIGHROOF", image: kdhHighroofImg, desc: "Extra spacious high-roof van, perfect for large groups and extended tours with maximum comfort and headroom.", passengers: "7-12" },
];

const safariJeeps = [
  { name: "MAHINDRA BOLERO", image: null, desc: "Reliable and comfortable 4x4 safari jeep, perfectly suited for the rugged terrain of Yala National Park.", passengers: "1-6" },
  { name: "TOYOTA HILUX", image: null, desc: "Premium 4x4 safari experience with extra comfort and elevated seating for superior wildlife viewing.", passengers: "1-6" },
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

      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Safari <span className="text-primary">Jeeps</span></h2>
        <p className="section-subtitle">Specially modified 4x4 jeeps for the ultimate Safari experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {safariJeeps.map((j) => (
          <div key={j.name} className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group border border-border">
            <div className="h-56 bg-muted relative overflow-hidden">
              {j.image ? (
                <img src={j.image} alt={j.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground italic text-sm">
                  {j.name} Photo Coming Soon
                </div>
              )}
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
