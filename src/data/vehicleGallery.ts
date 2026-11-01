import type { VehicleType } from "@/types/booking";

export interface VehiclePhoto {
  id: string;
  url: string;
  category: "exterior" | "interior";
  title: string;
  description: string;
  alt: string;
}

export interface VehicleGalleryItem {
  type: VehicleType;
  displayName: string;
  shortName: string;
  tagline: string;
  passengers: string;
  luggage: string;
  airConditioned: boolean;
  idealFor: string;
  features: string[];
  photos: VehiclePhoto[];
}

export const vehicleGalleries: Record<VehicleType, VehicleGalleryItem> = {
  Sedan: {
    type: "Sedan",
    displayName: "Toyota Prius / Axio (Sedan)",
    shortName: "Sedan",
    tagline: "Comfortable, smooth ride with ample trunk capacity for couples and small families.",
    passengers: "1-4 Passengers",
    luggage: "3 Large Suitcases",
    airConditioned: true,
    idealFor: "Airport pickups, couples, business travelers & inter-city tours",
    features: [
      "Dual Air Conditioning",
      "Quiet hybrid engine & smooth suspension",
      "Dedicated spacious trunk for 3 large suitcases",
      "Generous rear legroom with plush seats",
    ],
    photos: [
      {
        id: "sedan-front-ext",
        url: "/vehicles/sedan/lktaxi-sedan-front-exterior-sri-lanka.webp",
        category: "exterior",
        title: "Front Exterior View",
        description: "Front view of modern, clean air-conditioned sedan for private airport transfers and Sri Lanka road trips.",
        alt: "LKTaxi comfortable Toyota Sedan front exterior private taxi in Sri Lanka",
      },
      {
        id: "sedan-side-view",
        url: "/vehicles/sedan/lktaxi-sedan-side-view.webp",
        category: "exterior",
        title: "Side Profile View",
        description: "Sleek aerodynamic sedan profile ideal for couples and small family travel across Sri Lanka.",
        alt: "LKTaxi private sedan taxi side view for Colombo airport transfers and tours",
      },
      {
        id: "sedan-interior-seats",
        url: "/vehicles/sedan/lktaxi-sedan-interior-seats.webp",
        category: "interior",
        title: "Passenger Interior & Clean Seats",
        description: "Plush, well-maintained passenger seating with full air conditioning and ample legroom.",
        alt: "LKTaxi sedan air-conditioned clean passenger seating and legroom",
      },
      {
        id: "sedan-luggage-space",
        url: "/vehicles/sedan/lktaxi-sedan-luggage-space.webp",
        category: "interior",
        title: "Trunk & Luggage Space",
        description: "Dedicated large boot capacity accommodating up to 3 large suitcases and travel bags.",
        alt: "LKTaxi sedan spacious trunk and luggage space for tourist suitcases",
      },
    ],
  },
  "Mini van": {
    type: "Mini van",
    displayName: "Honda Freed / Avanza (Mini Van)",
    shortName: "Mini Van",
    tagline: "Spacious family transporter with flexible seating and generous luggage space.",
    passengers: "4-6 Passengers",
    luggage: "4 Suitcases + Hand Luggage",
    airConditioned: true,
    idealFor: "Small families, groups with child strollers, or surf / sports gear",
    features: [
      "Dual-zone Climate Control",
      "Sliding doors for effortless boarding",
      "Adjustable 3rd-row seats for flexible luggage volume",
      "Elevated seating posture for scenic sightseeing",
    ],
    photos: [
      {
        id: "minivan-front-ext",
        url: "/vehicles/mini-van/lktaxi-mini-van-front-exterior-sri-lanka.webp",
        category: "exterior",
        title: "Front Exterior View",
        description: "Spacious multi-purpose mini van ready for family tours and intercity transfers.",
        alt: "LKTaxi Honda Freed mini van front exterior taxi service in Sri Lanka",
      },
      {
        id: "minivan-side-view",
        url: "/vehicles/mini-van/lktaxi-mini-van-side-view.webp",
        category: "exterior",
        title: "Side View & Sliding Doors",
        description: "Convenient dual sliding doors for effortless boarding and scenic sightseeing journeys.",
        alt: "LKTaxi mini van side view with convenient sliding doors for family travel",
      },
      {
        id: "minivan-interior-seats",
        url: "/vehicles/mini-van/lktaxi-mini-van-interior-seats.webp",
        category: "interior",
        title: "Spacious Cabin Seating",
        description: "Flexible 3-row seating arrangement with dedicated air conditioning vents and wide windows.",
        alt: "LKTaxi air-conditioned mini van passenger seats and flexible interior room",
      },
      {
        id: "minivan-luggage-space",
        url: "/vehicles/mini-van/lktaxi-mini-van-luggage-space.webp",
        category: "interior",
        title: "Luggage & Cargo Area",
        description: "Generous cargo space designed for 4 full-sized suitcases, strollers, and holiday luggage.",
        alt: "LKTaxi mini van large luggage boot space for family travel and airport pickups",
      },
    ],
  },
  "KDH High roof": {
    type: "KDH High roof",
    displayName: "Toyota HiAce KDH (High Roof)",
    shortName: "KDH High Roof",
    tagline: "Maximum headroom and luxury space for large tour groups and extended expeditions.",
    passengers: "7-12 Passengers",
    luggage: "8-12 Large Suitcases",
    airConditioned: true,
    idealFor: "Large group tours, corporate excursions, surf expeditions & extended travel",
    features: [
      "Extra high-roof ceiling allows standing upright inside the van",
      "Multi-zone high-capacity roof-mounted air conditioning",
      "Independent individual passenger seats with recline",
      "Dedicated heavy luggage area at the rear",
    ],
    photos: [
      {
        id: "kdhhigh-front-ext",
        url: "/vehicles/kdh-high-roof/lktaxi-kdh-high-roof-front-exterior-sri-lanka.webp",
        category: "exterior",
        title: "Front High-Roof Profile",
        description: "High-clearance Toyota HiAce Commuter high-roof passenger touring van.",
        alt: "LKTaxi Toyota HiAce KDH high roof van front exterior for Sri Lanka tour groups",
      },
      {
        id: "kdhhigh-side-view",
        url: "/vehicles/kdh-high-roof/lktaxi-kdh-high-roof-side-view.webp",
        category: "exterior",
        title: "Side Profile & Touring Chassis",
        description: "Extended body touring van providing maximum headroom and highway stability.",
        alt: "LKTaxi KDH high roof passenger touring van side view in Sri Lanka",
      },
      {
        id: "kdhhigh-interior-seats",
        url: "/vehicles/kdh-high-roof/lktaxi-kdh-high-roof-interior-seats.webp",
        category: "interior",
        title: "Standing Height Cabin & Seats",
        description: "Spacious aisle with individual reclining passenger seats, high ceiling, and multi-zone AC.",
        alt: "LKTaxi KDH high roof spacious passenger seating with high ceiling and air conditioning",
      },
      {
        id: "kdhhigh-luggage-space",
        url: "/vehicles/kdh-high-roof/lktaxi-kdh-high-roof-luggage-space.webp",
        category: "interior",
        title: "Heavy Cargo & Luggage Bay",
        description: "Massive rear luggage area accommodating 8-12 large travel suitcases, backpacks, and surf gear.",
        alt: "LKTaxi KDH high roof massive rear luggage space for suitcases and surfboards",
      },
    ],
  },
  KDH: {
    type: "KDH",
    displayName: "Toyota HiAce KDH (Flat Roof)",
    shortName: "KDH Van",
    tagline: "The Sri Lankan touring standard for mid-sized groups, families & round tours.",
    passengers: "5-9 Passengers",
    luggage: "6-8 Suitcases",
    airConditioned: true,
    idealFor: "Family vacations, friend groups, wedding transfers & island-wide tours",
    features: [
      "Rear individual air-conditioning vents for every row",
      "Reclining high-back touring seats",
      "Extensive rear boot space for large luggage and equipment",
      "Tinted UV-protected windows for passenger privacy and comfort",
    ],
    photos: [
      {
        id: "kdh-front-ext",
        url: "/vehicles/kdh-flat-roof/lktaxi-kdh-flat-roof-front-exterior-sri-lanka.webp",
        category: "exterior",
        title: "Front Exterior View",
        description: "Classic Toyota HiAce KDH flat roof touring van, the gold standard for Sri Lankan group travel.",
        alt: "LKTaxi Toyota HiAce KDH flat roof touring van front exterior in Sri Lanka",
      },
      {
        id: "kdh-side-view",
        url: "/vehicles/kdh-flat-roof/lktaxi-kdh-flat-roof-side-view.webp",
        category: "exterior",
        title: "Side View & Bodywork",
        description: "Sleek van profile with tinted privacy windows and easy sliding passenger door.",
        alt: "LKTaxi KDH flat roof private van side profile for round tours in Sri Lanka",
      },
      {
        id: "kdh-interior-seats",
        url: "/vehicles/kdh-flat-roof/lktaxi-kdh-flat-roof-interior-seats.webp",
        category: "interior",
        title: "Reclining Passenger Seating",
        description: "Comfortable high-back seats with individual overhead A/C vents for long island journeys.",
        alt: "LKTaxi KDH flat roof van comfortable reclining seats and individual AC vents",
      },
      {
        id: "kdh-luggage-space",
        url: "/vehicles/kdh-flat-roof/lktaxi-kdh-flat-roof-luggage-space.webp",
        category: "interior",
        title: "Deep Trunk & Luggage Capacity",
        description: "Spacious rear trunk holding 6-8 large suitcases for family vacations and group expeditions.",
        alt: "LKTaxi KDH flat roof van generous luggage capacity for mid-sized tourist groups",
      },
    ],
  },
  Wagonr: {
    type: "Wagonr",
    displayName: "Suzuki WagonR (Hatchback)",
    shortName: "WagonR",
    tagline: "Economical & compact, ideal for solo travelers, couples & short city transfers.",
    passengers: "1-3 Passengers",
    luggage: "2 Standard Suitcases",
    airConditioned: true,
    idealFor: "Solo travelers, couples, city rides & budget airport transfers",
    features: [
      "Full Air Conditioning",
      "Compact & nimble for Sri Lankan roads",
      "Clean & sanitized interior",
      "Budget-friendly rates",
    ],
    photos: [
      {
        id: "wagonr-front-ext",
        url: "/vehicles/wagon-r/lktaxi-suzuki-wagon-r-front-exterior-sri-lanka.webp",
        category: "exterior",
        title: "Front Exterior Profile",
        description: "Compact Suzuki WagonR hatchback for agile city journeys and budget airport transfers.",
        alt: "LKTaxi Suzuki WagonR hatchback front exterior budget taxi in Sri Lanka",
      },
      {
        id: "wagonr-side-view",
        url: "/vehicles/wagon-r/lktaxi-suzuki-wagon-r-side-view.webp",
        category: "exterior",
        title: "Side Profile View",
        description: "Nimble 4-door mini car with clean bodywork and tinted windows.",
        alt: "LKTaxi Suzuki WagonR mini car side view for short transfers and city travel",
      },
      {
        id: "wagonr-interior-seats",
        url: "/vehicles/wagon-r/lktaxi-suzuki-wagon-r-interior-seats.webp",
        category: "interior",
        title: "Clean Cabin & Seating",
        description: "Sanitized passenger interior with active air conditioning and comfortable seating.",
        alt: "LKTaxi Suzuki WagonR air-conditioned clean interior cabin and comfortable seats",
      },
      {
        id: "wagonr-luggage-space",
        url: "/vehicles/wagon-r/lktaxi-suzuki-wagon-r-luggage-space.webp",
        category: "interior",
        title: "Luggage & Boot Space",
        description: "Rear trunk space suitable for 2 standard suitcases and carry-on bags.",
        alt: "LKTaxi Suzuki WagonR hatchback trunk space for standard luggage and backpacks",
      },
    ],
  },
};

export function getVehicleGallery(type: VehicleType): VehicleGalleryItem {
  return vehicleGalleries[type] ?? vehicleGalleries["Sedan"];
}
