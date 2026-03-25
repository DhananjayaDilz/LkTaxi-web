import { Location, formatLocationName } from "./locations";

export interface SEOKeywords {
  primary: string;
  variations: string[];
}

export const generateLocationKeywords = (loc: Location): SEOKeywords => {
  const name = formatLocationName(loc);
  return {
    primary: `${name} Taxi`,
    variations: [
      `taxi in ${name}`,
      `${name} cab service`,
      `${name} transport sri lanka`,
      `taxi from ${name}`,
      `affordable taxi ${name}`,
      `private taxi ${name} sri lanka`,
      `book a cab in ${name}`,
    ],
  };
};

export const generateRouteKeywords = (from: Location, to: Location): SEOKeywords => {
  const fromName = formatLocationName(from);
  const toName = formatLocationName(to);
  return {
    primary: `${fromName} to ${toName} Taxi`,
    variations: [
      `taxi from ${fromName} to ${toName}`,
      `cab service ${fromName} to ${toName}`,
      `transport from ${fromName} to ${toName} sri lanka`,
      `private car ${fromName} to ${toName}`,
      `best way to get from ${fromName} to ${toName}`,
      `${fromName} to ${toName} transfer`,
    ],
  };
};
