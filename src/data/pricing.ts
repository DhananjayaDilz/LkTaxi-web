export const WHATSAPP_NUMBER = "94705000526";

export const tourPricing: Record<string, number> = {
  "MINI CAR": 15000,
  "SEDAN": 20000,
  "KDH FLAT ROOF": 25000,
  "KDH HIGH ROOF": 30000,
};

export const vehicles = ["Wagonr", "Sedan", "Mini van", "KDH", "KDH High roof"] as const;
export type VehicleType = (typeof vehicles)[number];

export const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Argentina",
  "Australia",
  "Austria",
  "Bangladesh",
  "Belgium",
  "Brazil",
  "Canada",
  "China",
  "Colombia",
  "Czech Republic",
  "Denmark",
  "Egypt",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hungary",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Japan",
  "Kenya",
  "Malaysia",
  "Mexico",
  "Netherlands",
  "New Zealand",
  "Nigeria",
  "Norway",
  "Pakistan",
  "Philippines",
  "Poland",
  "Portugal",
  "Romania",
  "Russia",
  "Saudi Arabia",
  "Singapore",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Sweden",
  "Switzerland",
  "Thailand",
  "Turkey",
  "UAE",
  "UK",
  "Ukraine",
  "USA",
  "Vietnam",
];

export function generateWhatsAppURL(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}