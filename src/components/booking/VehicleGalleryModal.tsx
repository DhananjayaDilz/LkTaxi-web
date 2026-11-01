import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { VehicleType } from "@/types/booking";
import {
  getVehicleGallery,
  type VehiclePhoto,
} from "@/data/vehicleGallery";
import {
  Users,
  Briefcase,
  Snowflake,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Camera,
  Car,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VehicleGalleryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialVehicleType?: VehicleType | null;
  onSelectVehicle?: (vehicle: VehicleType) => void;
  selectedVehicle?: VehicleType | null;
}

type CategoryFilter = "all" | "exterior" | "interior";

const vehicleTabs: Array<{ type: VehicleType; label: string }> = [
  { type: "Wagonr", label: "WagonR" },
  { type: "Sedan", label: "Sedan" },
  { type: "Mini van", label: "Mini Van" },
  { type: "KDH", label: "KDH Flat Roof" },
  { type: "KDH High roof", label: "KDH High Roof" },
];

export function VehicleGalleryModal({
  open,
  onOpenChange,
  initialVehicleType,
  onSelectVehicle,
  selectedVehicle,
}: VehicleGalleryModalProps) {
  const [activeVehicleType, setActiveVehicleType] = useState<VehicleType>(
    initialVehicleType || "Sedan"
  );
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({});

  // Touch gesture coordinates for mobile swipe
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  // Thumbnail refs to scroll active thumbnail into view
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Sync active vehicle when modal opens
  useEffect(() => {
    if (initialVehicleType && open) {
      setActiveVehicleType(initialVehicleType);
      setActivePhotoIndex(0);
      setCategoryFilter("all");
    }
  }, [initialVehicleType, open]);

  const vehicleData = useMemo(() => {
    return getVehicleGallery(activeVehicleType);
  }, [activeVehicleType]);

  const filteredPhotos = useMemo(() => {
    if (categoryFilter === "all") {
      return vehicleData.photos;
    }
    return vehicleData.photos.filter((p) => p.category === categoryFilter);
  }, [vehicleData, categoryFilter]);

  // Reset photo index when filter changes or active index is out of bounds
  useEffect(() => {
    if (activePhotoIndex >= filteredPhotos.length) {
      setActivePhotoIndex(0);
    }
  }, [filteredPhotos, activePhotoIndex]);

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    const activeThumb = thumbnailRefs.current[activePhotoIndex];
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activePhotoIndex]);

  const currentPhoto: VehiclePhoto | undefined =
    filteredPhotos[activePhotoIndex] || filteredPhotos[0];

  const handlePrev = useCallback(() => {
    if (filteredPhotos.length <= 1) return;
    setActivePhotoIndex((prev) =>
      prev === 0 ? filteredPhotos.length - 1 : prev - 1
    );
  }, [filteredPhotos.length]);

  const handleNext = useCallback(() => {
    if (filteredPhotos.length <= 1) return;
    setActivePhotoIndex((prev) =>
      prev === filteredPhotos.length - 1 ? 0 : prev + 1
    );
  }, [filteredPhotos.length]);

  // Keyboard navigation support (Arrow keys)
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, handlePrev, handleNext]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
    touchStartYRef.current = e.targetTouches[0].clientY;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const deltaX = touchStartXRef.current - touchEndXRef.current;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartYRef.current ? Math.abs(touchStartYRef.current - touchEndY) : 0;

    // Minimum swipe threshold & ensure horizontal intent over vertical scroll
    const minSwipeDistance = 35;
    if (Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaX) > deltaY) {
      if (deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[96vw] max-w-[calc(100vw-1rem)] sm:max-w-3xl max-h-[92dvh] sm:max-h-[90vh] flex flex-col p-0 gap-0 rounded-2xl sm:rounded-2xl bg-card border-border shadow-2xl overflow-hidden focus:outline-none z-50">
        
        {/* Mobile Top Drag Indicator */}
        <div className="sm:hidden pt-2.5 pb-1 flex justify-center bg-card">
          <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
        </div>

        {/* Sticky Header with Vehicle Info & Switcher */}
        <DialogHeader className="p-3 sm:p-5 pb-2 sm:pb-3 border-b border-border/80 bg-card/95 backdrop-blur-md sticky top-0 z-20 space-y-2 text-left">
          <div className="flex items-center justify-between gap-2 pr-8 sm:pr-10">
            <div className="flex items-center gap-2 min-w-0">
              <span className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Car className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <div className="min-w-0">
                <DialogTitle className="text-base sm:text-xl font-bold tracking-tight truncate">
                  {vehicleData.displayName}
                </DialogTitle>
                <DialogDescription className="text-[11px] sm:text-xs text-muted-foreground line-clamp-1">
                  {vehicleData.tagline}
                </DialogDescription>
              </div>
            </div>

            {selectedVehicle === activeVehicleType ? (
              <Badge variant="outline" className="shrink-0 border-primary/40 bg-primary/10 text-primary text-[10px] sm:text-xs font-semibold px-2 py-0.5">
                Selected
              </Badge>
            ) : null}
          </div>

          {/* Quick Vehicle Switcher Tabs - Mobile scrollable pill strip */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 pt-1 no-scrollbar -mx-3 px-3 sm:mx-0 sm:px-0">
            {vehicleTabs.map((tab) => {
              const isActive = activeVehicleType === tab.type;
              return (
                <button
                  key={tab.type}
                  type="button"
                  onClick={() => {
                    setActiveVehicleType(tab.type);
                    setActivePhotoIndex(0);
                  }}
                  className={cn(
                    "whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 active:scale-95 focus:outline-none",
                    isActive
                      ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                      : "bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </DialogHeader>

        {/* Scrollable Modal Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-3 sm:px-6 py-3 space-y-3">
          
          {/* Key Capacity Specs - Mobile Optimized Cards */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-xl bg-muted/40 border border-border/40 text-[11px] sm:text-xs">
              <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary shrink-0" />
              <span className="font-semibold text-foreground truncate">{vehicleData.passengers}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-xl bg-muted/40 border border-border/40 text-[11px] sm:text-xs">
              <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary shrink-0" />
              <span className="font-semibold text-foreground truncate">{vehicleData.luggage}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 rounded-xl bg-muted/40 border border-border/40 text-[11px] sm:text-xs">
              <Snowflake className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary shrink-0" />
              <span className="font-semibold text-foreground truncate">Full A/C</span>
            </div>
          </div>

          {/* Category Filter Pills (All / Exterior / Interior) & Counter */}
          <div className="flex items-center justify-between gap-2 pt-0.5">
            <div className="flex items-center gap-1 bg-muted/70 p-1 rounded-xl text-xs">
              <button
                type="button"
                onClick={() => {
                  setCategoryFilter("all");
                  setActivePhotoIndex(0);
                }}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-medium transition-all active:scale-95",
                  categoryFilter === "all"
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                All ({vehicleData.photos.length})
              </button>
              <button
                type="button"
                onClick={() => {
                  setCategoryFilter("exterior");
                  setActivePhotoIndex(0);
                }}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-medium transition-all active:scale-95",
                  categoryFilter === "exterior"
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Exterior ({vehicleData.photos.filter((p) => p.category === "exterior").length})
              </button>
              <button
                type="button"
                onClick={() => {
                  setCategoryFilter("interior");
                  setActivePhotoIndex(0);
                }}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-medium transition-all active:scale-95",
                  categoryFilter === "interior"
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Interior ({vehicleData.photos.filter((p) => p.category === "interior").length})
              </button>
            </div>

            {/* Photo Counter */}
            <span className="text-[11px] font-medium text-muted-foreground shrink-0 bg-muted/40 px-2 py-0.5 rounded-full">
              {filteredPhotos.length > 0
                ? `${activePhotoIndex + 1} / ${filteredPhotos.length}`
                : "0 / 0"}
            </span>
          </div>

          {/* Main Photo Showcase with Touch Gesture Support */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative select-none group overflow-hidden rounded-2xl border border-border bg-neutral-950 aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center touch-pan-y"
          >
            {currentPhoto ? (
              imgErrorMap[currentPhoto.id] ? (
                <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground space-y-2">
                  <Camera className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground/50" />
                  <p className="text-xs sm:text-sm font-semibold text-foreground">Real Photo Coming Soon</p>
                  <p className="text-[11px] sm:text-xs text-muted-foreground max-w-xs">
                    {currentPhoto.title} — {currentPhoto.description}
                  </p>
                </div>
              ) : (
                <img
                  key={currentPhoto.id}
                  src={currentPhoto.url}
                  alt={currentPhoto.alt || `${vehicleData.displayName} - ${currentPhoto.title} | LKTaxi Sri Lanka`}
                  onError={() =>
                    setImgErrorMap((prev) => ({ ...prev, [currentPhoto.id]: true }))
                  }
                  className="w-full h-full object-cover transition-opacity duration-200"
                />
              )
            ) : (
              <div className="text-xs text-muted-foreground">No photos found in this category</div>
            )}

            {/* Category tag pill */}
            {currentPhoto ? (
              <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex items-center gap-1.5">
                <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md bg-black/65 text-white shadow-sm border border-white/10">
                  {currentPhoto.category === "interior" ? "Interior View" : "Exterior View"}
                </span>
              </div>
            ) : null}

            {/* Mobile Swipe Hint Indicator / Dots */}
            {filteredPhotos.length > 1 ? (
              <div className="absolute top-2.5 right-2.5 sm:hidden flex items-center gap-1 px-2 py-0.5 rounded-full backdrop-blur-md bg-black/50 text-white text-[10px]">
                <span>Swipe</span>
                <span className="font-semibold">{activePhotoIndex + 1}/{filteredPhotos.length}</span>
              </div>
            ) : null}

            {/* Navigation Arrows with touch-friendly hit areas */}
            {filteredPhotos.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous photo"
                  className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/80 hover:scale-105 active:scale-95 focus:outline-none"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next photo"
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/80 hover:scale-105 active:scale-95 focus:outline-none"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            ) : null}

            {/* Photo caption overlay with gradient */}
            {currentPhoto && !imgErrorMap[currentPhoto.id] ? (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-2.5 sm:p-4 text-white">
                <p className="text-xs sm:text-sm font-semibold truncate">{currentPhoto.title}</p>
                <p className="text-[10px] sm:text-xs text-white/80 line-clamp-1">
                  {currentPhoto.description}
                </p>
              </div>
            ) : null}
          </div>

          {/* Dots Indicator for Mobile - Preserves stable height so content never jumps */}
          <div className="flex items-center justify-center gap-1.5 py-1 min-h-[16px] sm:hidden">
            {filteredPhotos.length > 1 ? (
              filteredPhotos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActivePhotoIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all focus:outline-none",
                    i === activePhotoIndex
                      ? "w-5 bg-primary"
                      : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                />
              ))
            ) : null}
          </div>

          {/* Thumbnail Selector Strip (Always visible to maintain rock-solid layout stability) */}
          <div className="flex gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar scroll-smooth min-h-[54px] sm:min-h-[72px] items-center">
            {filteredPhotos.map((photo, index) => {
              const isSelected = index === activePhotoIndex;
              return (
                <button
                  key={photo.id}
                  ref={(el) => {
                    thumbnailRefs.current[index] = el;
                  }}
                  type="button"
                  onClick={() => setActivePhotoIndex(index)}
                  className={cn(
                    "relative h-12 w-16 sm:h-16 sm:w-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all focus:outline-none active:scale-95",
                    isSelected
                      ? "border-primary ring-2 ring-primary/40 shadow-sm opacity-100"
                      : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <img
                    src={photo.url}
                    alt={photo.alt || `${vehicleData.displayName} - ${photo.title}`}
                    onError={() =>
                      setImgErrorMap((prev) => ({ ...prev, [photo.id]: true }))
                    }
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[8px] sm:text-[9px] text-white text-center py-0.5 truncate px-0.5 uppercase tracking-tighter">
                    {photo.category}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Features Highlights */}
          <div className="rounded-xl border border-border/60 bg-muted/20 p-2.5 sm:p-3 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Key Vehicle Highlights</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-0.5">
              {vehicleData.features.map((feature) => (
                <div key={feature} className="flex items-center gap-1.5 text-[11px] sm:text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="truncate">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Mobile Bottom Action Bar (Thumb-friendly CTA) */}
        <div className="sticky bottom-0 z-20 bg-card/95 backdrop-blur-md border-t border-border px-3.5 py-2.5 sm:px-6 sm:py-3.5 flex items-center justify-between gap-3 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
              Ideal for: <span className="text-foreground font-medium">{vehicleData.idealFor}</span>
            </p>
            <p className="text-xs sm:text-sm font-bold text-foreground truncate">
              {vehicleData.displayName}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="text-xs h-9 sm:h-10 px-4 font-semibold rounded-xl border-border hover:bg-muted"
            >
              Close
            </Button>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}

export default VehicleGalleryModal;
