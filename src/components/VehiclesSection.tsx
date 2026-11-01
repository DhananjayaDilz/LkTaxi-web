import { useState } from "react";
import miniCarImg from "@/assets/suzuki-wagon-r-mini-taxi-sri-lanka.webp";
import sedanImg from "@/assets/toyota-prius-sedan-taxi-sri-lanka.webp";
import kdhImg from "@/assets/toyota-kdh-flat-roof-van-sri-lanka.webp";
import kdhHighroofImg from "@/assets/toyota-kdh-high-roof-van-sri-lanka.webp";
import minivan from "@/assets/honda-freed-mini-van-taxi-sri-lanka.webp";
import { VehicleGalleryModal } from "@/components/booking/VehicleGalleryModal";
import type { VehicleType } from "@/types/booking";
import { Button } from "@/components/ui/button";
import { Camera, Images } from "lucide-react";

interface VehicleCardData {
  name: string;
  type: VehicleType;
  image: string;
  desc: string;
  passengers: string;
}

const vehiclesData: VehicleCardData[] = [
  {
    name: "MINI CAR",
    type: "Wagonr",
    image: miniCarImg,
    desc: "Compact and economical, perfect for short city rides and airport transfers for solo travelers or couples.",
    passengers: "1-3",
  },
  {
    name: "SEDAN",
    type: "Sedan",
    image: sedanImg,
    desc: "Comfortable sedan ideal for families and small groups. Spacious trunk for luggage and smooth ride quality.",
    passengers: "1-4",
  },
  {
    name: "MINI VAN",
    type: "Mini van",
    image: minivan,
    desc: "Spacious van for group travel and long tours. Air-conditioned with ample luggage space for comfortable journeys.",
    passengers: "4-6",
  },
  {
    name: "KDH FLAT ROOF",
    type: "KDH",
    image: kdhImg,
    desc: "Standard KDH van, perfect for group travel and long tours with ample luggage space.",
    passengers: "5-9",
  },
  {
    name: "KDH HIGH ROOF",
    type: "KDH High roof",
    image: kdhHighroofImg,
    desc: "Extra spacious high-roof van, perfect for large groups and extended tours with maximum comfort and headroom.",
    passengers: "7-12",
  },
];

const safariJeeps = [
  {
    name: "MAHINDRA BOLERO",
    image: "/mahindra-bolero-safari-jeep-yala.webp",
    desc: "Reliable and comfortable 4x4 safari jeep, perfectly suited for the rugged terrain of Yala National Park.",
    passengers: "1-6",
    alt: "Mahindra Bolero 4x4 safari jeep used for Yala National Park tours",
  },
  {
    name: "TOYOTA HILUX",
    image: "/toyota-hilux-safari-jeep-yala.webp",
    desc: "Premium 4x4 safari experience with extra comfort and elevated seating for superior wildlife viewing.",
    passengers: "1-6",
    alt: "Toyota Hilux comfortable safari jeep for Yala wildlife tours",
  },
];

const VehiclesSection = () => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedVehicleType, setSelectedVehicleType] = useState<VehicleType>("Sedan");

  const handleOpenGallery = (type: VehicleType) => {
    setSelectedVehicleType(type);
    setGalleryOpen(true);
  };

  return (
    <section id="vehicles" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">
            Our <span className="text-primary">Vehicles</span>
          </h2>
          <p className="section-subtitle">
            Well-maintained, air-conditioned vehicles for every travel need
          </p>
        </div>

        {/* 5 Vehicle Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
          {vehiclesData.map((v) => (
            <div
              key={v.name}
              className="flex flex-col bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-border hover:border-primary/40"
            >
              {/* Image with quick-click camera pill */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={v.image}
                  alt={v.name}
                  width="500"
                  height="300"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <button
                  type="button"
                  onClick={() => handleOpenGallery(v.type)}
                  aria-label={`View real photos of ${v.name}`}
                  className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/65 hover:bg-black/85 text-white text-[11px] font-semibold backdrop-blur-md transition-all shadow-md focus:outline-none active:scale-95"
                >
                  <Camera className="w-3.5 h-3.5 text-primary" />
                  <span>Photos</span>
                </button>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-lg text-foreground mb-1">{v.name}</h3>
                <span className="text-xs font-semibold text-primary mb-2 inline-block">
                  {v.passengers} Passengers
                </span>
                <p className="text-sm text-muted-foreground flex-1 mb-4 leading-relaxed">
                  {v.desc}
                </p>

                {/* Show More Images Button */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenGallery(v.type)}
                  className="w-full flex items-center justify-center gap-2 text-xs font-bold rounded-xl border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 mt-auto py-2.5 h-auto shadow-xs active:scale-98"
                >
                  <Images className="w-4 h-4" />
                  <span>Show More Images</span>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Safari Jeeps Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">
            Safari <span className="text-primary">Jeeps</span>
          </h2>
          <p className="section-subtitle">
            Specially modified 4x4 jeeps for the ultimate Safari experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {safariJeeps.map((j) => (
            <div
              key={j.name}
              className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group border border-border"
            >
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
                <span className="text-xs font-medium text-primary mb-3 inline-block">
                  Up to {j.passengers} Passengers
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed">{j.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vehicle Gallery Popup Modal */}
      <VehicleGalleryModal
        open={galleryOpen}
        onOpenChange={setGalleryOpen}
        initialVehicleType={selectedVehicleType}
      />
    </section>
  );
};

export default VehiclesSection;
