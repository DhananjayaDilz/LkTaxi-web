import { Car } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_BOOKING_URL =
  "https://wa.me/94784207818?text=Hi%20LK%20Taxi%2C%20I%27d%20like%20to%20book%20a%20private%20taxi.%20Please%20share%20availability%20and%20price.";

const PrivateTaxiSection = () => {
  return (
    <section
      id="private-taxi"
      className="section-padding bg-background"
      aria-labelledby="private-taxi-heading"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Text column */}
          <div className="order-2 lg:order-1">
            <h2
              id="private-taxi-heading"
              className="section-title mb-6 text-center lg:text-left"
            >
              Private <span className="text-primary">Taxi Services</span> in
              Sri Lanka for Every Traveller
            </h2>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 text-center lg:text-left">
              From everyday journeys to business and VIP travel, LK Taxi
              provides private taxi services for individuals, families, and
              visitors across Sri Lanka. Arrange airport transfers, intercity
              journeys, or islandwide tours with a professional driver and
              courteous, personal service. Clear communication and carefully
              planned pickups help make every journey feel straightforward.
            </p>

            <div className="flex justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-md hover:shadow-lg transition-all h-12 px-8"
              >
                <a
                  href={WHATSAPP_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Car className="w-5 h-5" />
                  Book a Private Taxi
                </a>
              </Button>
            </div>
          </div>

          {/* Image column */}
          <div className="order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-border/50">
              <img
                src="/bia airport pickup vip private taxi.webp"
                alt="LK Taxi private taxi service at Bandaranaike International Airport in Sri Lanka"
                width={1024}
                height={576}
                loading="lazy"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivateTaxiSection;

