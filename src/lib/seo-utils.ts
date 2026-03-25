import { Location, formatLocationName } from "../data/locations";

export const generateLocationMetadata = (location: Location) => {
  const name = formatLocationName(location);
  return {
    title: `${name} Taxi Service Sri Lanka | LKTaxi`,
    description: `Book ${name} taxi service in Sri Lanka. Safe, affordable and reliable transport with professional drivers. Airport pickup available.`,
  };
};

export const generateRouteMetadata = (from: Location, to: Location) => {
  const fromName = formatLocationName(from);
  const toName = formatLocationName(to);
  return {
    title: `${fromName} to ${toName} Taxi Service Sri Lanka | LKTaxi`,
    description: `Book taxi from ${fromName} to ${toName} in Sri Lanka. Comfortable and safe private transfer service with experienced drivers.`,
  };
};

export const generateStructuredData = (location?: Location, from?: Location, to?: Location) => {
  const name = location ? formatLocationName(location) : (from && to ? `${formatLocationName(from)} to ${formatLocationName(to)}` : "Sri Lanka");
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "LKTaxi",
    "image": "https://lktaxi.com/logo.png", // Replace with real logo URL
    "@id": `https://lktaxi.com/#${location || "main"}`,
    "url": "https://lktaxi.com",
    "telephone": "+94700000000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "No 123, Galle Road",
      "addressLocality": "Colombo",
      "addressRegion": "Western Province",
      "postalCode": "00300",
      "addressCountry": "LK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 6.9271,
      "longitude": 79.8612
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "areaServed": location ? {
      "@type": "City",
      "name": name
    } : {
      "@type": "Country",
      "name": "Sri Lanka"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Taxi Services",
      "itemListElement": [
        {
          "@type": "Service",
          "name": `${name} Private Taxi Transfer`,
          "provider": {
            "@type": "LocalBusiness",
            "name": "LKTaxi"
          }
        }
      ]
    }
  };

  return JSON.stringify(schema);
};
