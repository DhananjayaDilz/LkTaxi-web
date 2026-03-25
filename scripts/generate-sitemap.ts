import fs from "fs";
import { locations } from "./src/data/locations";
import { popularRoutes, getRouteSlug } from "./src/data/routes";

const BASE_URL = "https://lktaxi.com";

const generateSitemap = () => {
  const staticPages = ["", "about", "contact", "services"];
  
  const locationPages = locations.map(loc => `taxi/${loc}`);
  const routePages = popularRoutes.map(route => `taxi/${getRouteSlug(route)}`);

  const allPages = [...staticPages, ...locationPages, ...routePages];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map((page) => {
      return `
    <url>
      <loc>${BASE_URL}/${page}</loc>
      <changefreq>weekly</changefreq>
      <priority>${page === "" ? "1.0" : "0.7"}</priority>
    </url>`;
    })
    .join("")}
</urlset>`;

  fs.writeFileSync("./public/sitemap.xml", sitemapXml);
  console.log("Sitemap generated successfully!");
};

generateSitemap();
