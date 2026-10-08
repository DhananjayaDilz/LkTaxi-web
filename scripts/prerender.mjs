import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { render, publicPaths, getPageSEO } from '../dist-ssr/entry-server.js';

const template = await readFile('dist/index.html', 'utf8');
const escape = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const today = new Date().toISOString().split('T')[0];

for (const path of [...publicPaths, '/404']) {
  const seo = getPageSEO(path);
  let html = template.replace(/<title>.*?<\/title>/s, `<title>${escape(seo.title)}</title>`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${seo.canonical}" />`);

  // Update hreflang tags for each page
  html = html.replace(/<link rel="alternate" hreflang="en"[^>]*>/, `<link rel="alternate" hreflang="en" href="${seo.canonical}" />`);
  html = html.replace(/<link rel="alternate" hreflang="x-default"[^>]*>/, `<link rel="alternate" hreflang="x-default" href="${seo.canonical}" />`);

  const values = { description: seo.description, robots: seo.noindex ? 'noindex, follow' : 'index, follow', 'og:title': seo.title, 'og:description': seo.description, 'og:url': seo.canonical, 'og:image': seo.image, 'og:type': seo.type, 'twitter:title': seo.title, 'twitter:description': seo.description, 'twitter:image': seo.image };
  for (const [key, value] of Object.entries(values)) {
    html = html.replace(new RegExp(`<meta (?:name|property)="${key}"[^>]*>`), `<meta ${key.startsWith('og:') ? 'property' : 'name'}="${key}" content="${escape(value)}" />`);
  }

  // Add BreadcrumbList schema for all pages except homepage
  if (path !== '/' && !seo.noindex) {
    const breadcrumbs = [{ name: 'Home', url: 'https://www.lktaxi.com/' }];
    if (path.startsWith('/taxi/')) {
      breadcrumbs.push({ name: 'Taxi Services', url: 'https://www.lktaxi.com/#services' });
      breadcrumbs.push({ name: seo.title.replace(' | LKTaxi', ''), url: seo.canonical });
    } else if (path === '/blogs') {
      breadcrumbs.push({ name: 'Travel Blog', url: seo.canonical });
    } else if (path.startsWith('/blogs/')) {
      breadcrumbs.push({ name: 'Travel Blog', url: 'https://www.lktaxi.com/blogs' });
      breadcrumbs.push({ name: seo.title.replace(' | LKTaxi', ''), url: seo.canonical });
    }
    const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: breadcrumbs.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: b.url })) };
    html = html.replace('</head>', `<script type="application/ld+json" data-page-schema>${JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c')}</script></head>`);
  }

  if (seo.blog) {
    const b = seo.blog;
    const schema = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: b.title, description: b.excerpt, image: seo.image, datePublished: b.date, author: { '@type': 'Organization', name: b.author }, mainEntityOfPage: seo.canonical };
    html = html.replace('</head>', `<script type="application/ld+json" data-page-schema>${JSON.stringify(schema).replace(/</g, '\\u003c')}</script></head>`);
  } else if (path.startsWith('/taxi/')) {
    // Basic Service schema with offers
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: seo.title.split('|')[0].trim(),
      provider: { '@type': 'Organization', name: 'LKTaxi' },
      areaServed: { '@type': 'Country', name: 'Sri Lanka' },
      description: seo.description,
      offers: { '@type': 'Offer', priceCurrency: 'LKR', price: 'Contact Us', availability: 'https://schema.org/InStock' }
    };
    html = html.replace('</head>', `<script type="application/ld+json" data-page-schema>${JSON.stringify(schema).replace(/</g, '\\u003c')}</script></head>`);
  } else if (path === '/sri-lanka-tour-packages') {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      name: 'Sri Lanka Private Tour Packages',
      description: seo.description,
      provider: { '@type': 'Organization', name: 'LKTaxi' }
    };
    html = html.replace('</head>', `<script type="application/ld+json" data-page-schema>${JSON.stringify(schema).replace(/</g, '\\u003c')}</script></head>`);
  }
  html = html.replace('<div id="root"></div>', () => `<div id="root">${render(path)}</div>`);
  const file = path === '/' ? 'dist/index.html' : `dist${path}.html`;
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}

// Generate sitemap with lastmod and priority
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicPaths.map(path => {
  const seo = getPageSEO(path);
  const lastmod = seo.blog?.date || today;
  const priority = path === '/' ? '1.0' : path.startsWith('/blogs/') ? '0.7' : '0.8';
  const changefreq = path === '/' ? 'weekly' : 'monthly';
  return `  <url>
    <loc>${seo.canonical}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n')}
</urlset>
`;
await writeFile('dist/sitemap.xml', sitemap);
console.log(`Prerendered ${publicPaths.length} public pages and a 404 page.`);
