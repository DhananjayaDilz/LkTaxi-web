export const locations = [
  "colombo",
  "negombo",
  "airport",
  "ella",
  "kandy",
  "nuwara-eliya",
  "sigiriya",
  "dambulla",
  "anuradhapura",
  "polonnaruwa",
  "trincomalee",
  "arugam-bay",
  "pasikudah",
  "batticaloa",
  "mirissa",
  "weligama",
  "galle",
  "unawatuna",
  "hikkaduwa",
  "bentota",
  "kalutara",
  "tangalle",
  "hambantota",
  "tissamaharama",
  "yala",
  "udawalawe",
  "wilpattu",
  "kitulgala",
  "haputale",
  "bandarawela",
  "badulla",
  "ella-rock",
  "little-adams-peak",
] as const;

export type Location = typeof locations[number];

export const formatLocationName = (slug: string): string => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .replace("Airport", "Bandaranaike International Airport (CMB)");
};
