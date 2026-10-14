import { readFile, writeFile } from 'node:fs/promises';
import { publicPaths, getPageSEO } from '../dist-ssr/entry-server.js';

// Use known dates for content that has actual modification records.
// Blog dates come from the content itself; existing pages preserve their lastmod date; new pages use deployment date.
const today = new Date().toISOString().split('T')[0];

const existingLastmods = new Map();
try {
  const existingXml = await readFile('public/sitemap.xml', 'utf8');
  const locRegex = /<url>[\s\S]*?<loc>(.*?)<\/loc>[\s\S]*?<lastmod>(.*?)<\/lastmod>[\s\S]*?<\/url>/g;
  let match;
  while ((match = locRegex.exec(existingXml)) !== null) {
    existingLastmods.set(match[1].trim(), match[2].trim());
  }
} catch {
  // If reading fails, fallback to today
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicPaths.map(path => {
  const seo = getPageSEO(path);
  // Blog pages have a real date; existing pages retain their date; new pages use today's build date
  const lastmod = seo.blog?.date || existingLastmods.get(seo.canonical) || today;
  return `  <url>
    <loc>${seo.canonical}</loc>
    <lastmod>${lastmod}</lastmod>${path === '/' ? '\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>' : path.startsWith('/blogs/') ? '\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>' : '\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>'}
  </url>`;
}).join('\n')}
</urlset>
`;
await writeFile('public/sitemap.xml', xml);
console.log(`Generated ${publicPaths.length} canonical URLs with lastmod dates.`);
