import { writeFile } from 'node:fs/promises';
import { publicPaths, getPageSEO } from '../dist-ssr/entry-server.js';

// Build dates are not content modification dates. Omit lastmod until tracked accurately.
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publicPaths.map(path => `  <url><loc>${getPageSEO(path).canonical}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile('public/sitemap.xml', xml);
console.log(`Generated ${publicPaths.length} canonical URLs.`);
