import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageSEO } from "@/lib/page-seo";

export default function PageSEO() {
  const { pathname } = useLocation();
  useEffect(() => {
    const seo = getPageSEO(pathname);
    document.title = seo.title;
    const canonical = document.querySelector('link[rel="canonical"]');
    canonical?.setAttribute("href", seo.canonical);
    const values = { description: seo.description, robots: seo.noindex ? "noindex, follow" : "index, follow", "og:title": seo.title, "og:description": seo.description, "og:url": seo.canonical, "og:image": seo.image, "og:type": seo.type, "twitter:title": seo.title, "twitter:description": seo.description, "twitter:image": seo.image };
    for (const [key, value] of Object.entries(values)) {
      const attr = key.startsWith("og:") ? "property" : "name";
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) { element = document.createElement("meta"); element.setAttribute(attr, key); document.head.appendChild(element); }
      element.setAttribute("content", value);
    }
    // Static structured data belongs to the initial URL only.
    document.querySelectorAll('[data-page-schema]').forEach(el => el.remove());
    if (seo.blog) {
      const schema = document.createElement("script");
      schema.type = "application/ld+json";
      schema.dataset.pageSchema = "";
      schema.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "BlogPosting", headline: seo.blog.title, description: seo.description, image: seo.image, datePublished: seo.blog.date, author: { "@type": "Organization", name: seo.blog.author }, mainEntityOfPage: seo.canonical });
      document.head.appendChild(schema);
    }
  }, [pathname]);
  return null;
}
