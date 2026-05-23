import * as fs from "fs";
import { locations } from "../src/data/locations";
import { popularRoutes, getRouteSlug } from "../src/data/routes";
import { blogsData } from "../src/data/blogs";

const BASE_URL = "https://lktaxi.com";

const generateSitemap = () => {
  const staticPages = ["", "blogs"];
  
  const locationPages = locations.map(loc => `taxi/${loc}`);
  const routePages = popularRoutes.map(route => `taxi/${getRouteSlug(route)}`);
  const blogPages = blogsData.map(blog => `blogs/${blog.slug}`);

  const allPages = [...staticPages, ...locationPages, ...routePages, ...blogPages];
  const today = new Date().toISOString().split('T')[0];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map((page) => {
      let priority = "0.7";
      let changefreq = "weekly";
      
      if (page === "") {
        priority = "1.0";
        changefreq = "daily";
      } else if (page === "blogs") {
        priority = "0.9";
        changefreq = "daily";
      } else if (page.startsWith("blogs/")) {
        priority = "0.8";
        changefreq = "monthly";
      }

      return `
    <url>
      <loc>${BASE_URL}/${page}</loc>
      <lastmod>${today}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>`;
    })
    .join("")}
</urlset>`;

  fs.writeFileSync("./public/sitemap.xml", sitemapXml);
  console.log("Sitemap generated successfully!");
};

generateSitemap();
