import { useState, useEffect } from "react";
import { X, MessageCircle, Map, Car } from "lucide-react";
import { generateWhatsAppURL } from "@/data/pricing";

export const BlogSidebarAd = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when user scrolls down 300px
      if (window.scrollY > 300) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Tour and Taxi Booking Advertisement"
      className={`fixed z-40 transition-all duration-500 ease-in-out ${
        hasScrolled
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      } 
      /* Mobile Layout (Bottom Sticky Popup) */
      bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.15)] p-3 md:p-4 flex justify-between items-center rounded-t-xl
      /* Desktop Layout (Right Sidebar) */
      xl:bottom-auto xl:top-1/4 xl:left-auto xl:right-8 2xl:right-[max(32px,calc(50vw-448px-280px-32px))] xl:w-[260px] xl:flex-col xl:bg-card xl:border xl:shadow-2xl xl:rounded-2xl xl:p-0 xl:translate-y-0
      `}
    >
      {/* Desktop Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="hidden xl:flex absolute top-2 right-2 p-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/70 transition-colors z-10"
        aria-label="Close Advertisement"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Desktop Header Image */}
      <div className="hidden xl:block w-full h-32 overflow-hidden relative">
        <img
          src="https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=2070&auto=format&fit=crop"
          alt="Sri Lanka beautiful landscape"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <span className="text-white font-bold text-lg px-2 text-center drop-shadow-md">
            Explore Sri Lanka
          </span>
        </div>
      </div>

      {/* Desktop Content */}
      <div className="hidden xl:flex flex-col p-5 items-center text-center gap-3">
        <h3 className="font-bold text-xl text-card-foreground">Book Your Taxi or Tour</h3>
        <p className="text-sm text-card-foreground/70 mb-2">
          Experience Sri Lanka safely with our comfortable vehicles and engaging wildlife safaris.
        </p>
        
        <div className="flex w-full flex-col gap-2">
          <a
            href={generateWhatsAppURL("Hello! I am reading the LKTaxi blog and would like to book a taxi/tour.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-md active:scale-95"
          >
            <MessageCircle className="w-5 h-5" />
            Book via WhatsApp
          </a>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="flex xl:hidden items-center gap-3 md:gap-4 flex-1 pr-4">
        <div className="flex-shrink-0 bg-primary/20 p-2.5 rounded-full hidden sm:block">
          <Car className="w-5 h-5 text-primary" />
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold text-sm md:text-base leading-tight text-foreground">
            Book Your Taxi or Tour
          </h3>
          <p className="text-xs text-foreground/70 hidden sm:block truncate">
            Affordable rides & unforgettable safaris.
          </p>
        </div>
      </div>

      {/* Mobile Actions */}
      <div className="flex xl:hidden items-center gap-2 md:gap-3 flex-shrink-0">
        <a
          href={generateWhatsAppURL("Hello! I am reading the LKTaxi blog and would like to book a taxi/tour.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-2 px-3 md:px-4 md:py-2.5 rounded-lg transition-colors text-sm whitespace-nowrap shadow-sm"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden xs:inline">Book Now</span>
          <span className="inline xs:hidden">Book</span>
        </a>
        <button
          onClick={() => setIsVisible(false)}
          className="p-2 text-foreground/50 hover:bg-secondary hover:text-foreground rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
};
