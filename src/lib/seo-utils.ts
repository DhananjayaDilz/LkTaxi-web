import { Location, formatLocationName } from "../data/locations";

export const generateLocationMetadata = (location: Location) => {
  const name = formatLocationName(location);
  return {
    title: `${name} Taxi Service Sri Lanka | Book Private Transfer | LKTaxi`,
    description: `Book a reliable ${name} taxi in Sri Lanka. Private airport transfers, day tours & long-distance travel. WhatsApp booking, fixed prices, no hidden fees.`,
  };
};

export const generateRouteMetadata = (from: Location, to: Location) => {
  const fromName = formatLocationName(from);
  const toName = formatLocationName(to);
  return {
    title: `${fromName} to ${toName} Taxi | Private Transfer Sri Lanka | LKTaxi`,
    description: `Book a private taxi from ${fromName} to ${toName} in Sri Lanka. Comfortable air-conditioned vehicles, experienced drivers. WhatsApp for an instant quote.`,
  };
};

export const generateStructuredData = (location?: Location, from?: Location, to?: Location) => {
  const name = location
    ? formatLocationName(location)
    : from && to
    ? `${formatLocationName(from)} to ${formatLocationName(to)}`
    : "Sri Lanka";

  const schema = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "name": "LKTaxi",
    "image": "https://www.lktaxi.com/srilanaka_tour.png",
    "logo": "https://www.lktaxi.com/LOGO.png",
    "@id": `https://www.lktaxi.com/#${location || "main"}`,
    "url": "https://www.lktaxi.com",
    "telephone": "+94705000526",
    "description": "Safe and reliable taxi and Yala safari booking service in Sri Lanka for foreign tourists. Airport transfers, private tours, and wildlife safaris island-wide.",
    "priceRange": "$$",
    "serviceType": ["Airport Transfer", "Yala Safari Booking", "Private Tours", "Hotel Transfers"],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Tissamaharama",
      "addressRegion": "Southern Province",
      "addressCountry": "LK"
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
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+94705000526",
      "contactType": "reservations",
      "availableLanguage": ["English", "Sinhala"]
    },
    "areaServed": location
      ? { "@type": "City", "name": name }
      : { "@type": "Country", "name": "Sri Lanka" },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Taxi & Safari Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": `${name} Private Taxi Transfer`,
          }
        }
      ]
    }
  };

  return JSON.stringify(schema);
};

export const generateBlogPostSchema = (post: {
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  date: string;
  slug: string;
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.coverImage,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Organization",
      "name": post.author,
      "url": "https://www.lktaxi.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "LKTaxi",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.lktaxi.com/LOGO.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.lktaxi.com/blogs/${post.slug}`
    }
  };
  return JSON.stringify(schema);
};
