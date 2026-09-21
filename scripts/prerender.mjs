import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { render, publicPaths, getPageSEO } from '../dist-ssr/entry-server.js';

const template = await readFile('dist/index.html', 'utf8');
const escape = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
for (const path of [...publicPaths, '/404']) {
  const seo = getPageSEO(path);
  let html = template.replace(/<title>.*?<\/title>/s, `<title>${escape(seo.title)}</title>`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${seo.canonical}" />`);
  const values = { description: seo.description, robots: seo.noindex ? 'noindex, follow' : 'index, follow', 'og:title': seo.title, 'og:description': seo.description, 'og:url': seo.canonical, 'og:image': seo.image, 'og:type': seo.type, 'twitter:title': seo.title, 'twitter:description': seo.description, 'twitter:image': seo.image };
  for (const [key, value] of Object.entries(values)) {
    html = html.replace(new RegExp(`<meta (?:name|property)="${key}"[^>]*>`), `<meta ${key.startsWith('og:') ? 'property' : 'name'}="${key}" content="${escape(value)}" />`);
  }
  if (seo.blog) {
    const b = seo.blog;
    const schema = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: b.title, description: b.excerpt, image: seo.image, datePublished: b.date, author: { '@type': 'Organization', name: b.author }, mainEntityOfPage: seo.canonical };
    html = html.replace('</head>', `<script type="application/ld+json" data-page-schema>${JSON.stringify(schema).replace(/</g, '\\u003c')}</script></head>`);
  }
  html = html.replace('<div id="root"></div>', () => `<div id="root">${render(path)}</div>`);
  const file = path === '/' ? 'dist/index.html' : `dist${path}.html`;
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publicPaths.map(path => `  <url><loc>${getPageSEO(path).canonical}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile('dist/sitemap.xml', sitemap);
console.log(`Prerendered ${publicPaths.length} public pages and a 404 page.`);
