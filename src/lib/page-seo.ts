import { blogsData } from "../data/blogs";
import { locations, formatLocationName } from "../data/locations";
import { popularRoutes, getRouteSlug } from "../data/routes";

export const SITE_URL = "https://www.lktaxi.com";
export const publicPaths = ["/", "/blogs", ...locations.map(l => `/taxi/${l}`), ...popularRoutes.map(r => `/taxi/${getRouteSlug(r)}`), ...blogsData.map(b => `/blogs/${b.slug}`)];

export function getPageSEO(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const slug = path.split("/").pop();
  const blog = path.startsWith("/blogs/") ? blogsData.find(b => b.slug === slug) : undefined;
  const route = popularRoutes.find(r => path === `/taxi/${getRouteSlug(r)}`);
  const location = locations.find(l => path === `/taxi/${l}`);
  const noindex = !publicPaths.includes(path);
  let title = "Sri Lanka Private Taxi & Airport Transfers | LKTaxi";
  let description = "Book a private taxi in Sri Lanka with LKTaxi. Colombo airport transfers, hotel transfers, private tours and Yala safaris. Request your quote on WhatsApp.";
  if (path === "/blogs") {
    title = "Sri Lanka Travel Guides & Safari Tips | LKTaxi";
    description = "Plan your Sri Lanka trip with LKTaxi's destination guides, Yala safari information and private transfer booking advice.";
  } else if (blog) {
    title = `${blog.title} | LKTaxi`;
    description = blog.excerpt;
  } else if (route) {
    title = `${route.from === "airport" ? "Colombo Airport" : formatLocationName(route.from)} to ${formatLocationName(route.to)} Taxi | LKTaxi`;
    description = `Arrange your private taxi from ${formatLocationName(route.from)} to ${formatLocationName(route.to)}. Discuss pickup, luggage and stops; request a quote on WhatsApp.`;
  } else if (location) {
    title = `${location === "airport" ? "Colombo Airport" : formatLocationName(location)} Taxi & Private Transfers | LKTaxi`;
    description = `Arrange a private taxi to or from ${formatLocationName(location)} with LKTaxi. Choose a car or van and confirm your journey details and price on WhatsApp.`;
  } else if (noindex) {
    title = "Page Not Found | LKTaxi";
    description = "This page could not be found. Browse LKTaxi's Sri Lanka taxi services and travel guides.";
  }
  return { title, description, canonical: SITE_URL + path, noindex, image: new URL(blog?.coverImage || "/srilanaka_tour.png", SITE_URL).href, type: blog ? "article" : "website", blog };
}
