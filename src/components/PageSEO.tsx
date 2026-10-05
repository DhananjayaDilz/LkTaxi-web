import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageSEO } from "@/lib/page-seo";

export default function PageSEO() {
  const { pathname } = useLocation();
  useEffect(() => {
    const seo = getPageSEO(pathname);
    document.title = seo.title;

    // Update canonical
    const canonical = document.querySelector('link[rel="canonical"]');
    canonical?.setAttribute("href", seo.canonical);

    // Update hreflang tags
    const hreflangEn = document.querySelector('link[hreflang="en"]');
    hreflangEn?.setAttribute("href", seo.canonical);
    const hreflangDefault = document.querySelector('link[hreflang="x-default"]');
    hreflangDefault?.setAttribute("href", seo.canonical);

    // Update meta tags
    const values = { description: seo.description, robots: seo.noindex ? "noindex, follow" : "index, follow", "og:title": seo.title, "og:description": seo.description, "og:url": seo.canonical, "og:image": seo.image, "og:type": seo.type, "twitter:title": seo.title, "twitter:description": seo.description, "twitter:image": seo.image };
    for (const [key, value] of Object.entries(values)) {
      const attr = key.startsWith("og:") ? "property" : "name";
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) { element = document.createElement("meta"); element.setAttribute(attr, key); document.head.appendChild(element); }
      element.setAttribute("content", value);
    }

    // Clean up old page-specific structured data
    document.querySelectorAll('[data-page-schema]').forEach(el => el.remove());

    // Add BlogPosting schema for blog pages
    if (seo.blog) {
      const schema = document.createElement("script");
      schema.type = "application/ld+json";
      schema.dataset.pageSchema = "";
      schema.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "BlogPosting", headline: seo.blog.title, description: seo.description, image: seo.image, datePublished: seo.blog.date, author: { "@type": "Organization", name: seo.blog.author }, mainEntityOfPage: seo.canonical });
      document.head.appendChild(schema);
    }

    // Add BreadcrumbList schema for non-homepage pages
    if (pathname !== "/") {
      const breadcrumbs: { name: string; url: string }[] = [{ name: "Home", url: "https://www.lktaxi.com/" }];
      if (pathname.startsWith("/taxi/")) {
        breadcrumbs.push({ name: "Taxi Services", url: "https://www.lktaxi.com/#services" });
        breadcrumbs.push({ name: seo.title.replace(" | LKTaxi", ""), url: seo.canonical });
      } else if (pathname === "/blogs") {
        breadcrumbs.push({ name: "Travel Blog", url: seo.canonical });
      } else if (pathname.startsWith("/blogs/")) {
        breadcrumbs.push({ name: "Travel Blog", url: "https://www.lktaxi.com/blogs" });
        breadcrumbs.push({ name: seo.title.replace(" | LKTaxi", ""), url: seo.canonical });
      }
      const schema = document.createElement("script");
      schema.type = "application/ld+json";
      schema.dataset.pageSchema = "";
      schema.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: breadcrumbs.map((b, i) => ({ "@type": "ListItem", position: i + 1, name: b.name, item: b.url })) });
      document.head.appendChild(schema);
    }
  }, [pathname]);
  return null;
}
