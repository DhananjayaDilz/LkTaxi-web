import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { resolve, extname } from 'node:path';
import { JSDOM } from 'jsdom';
import { chromium } from '@playwright/test';
import { publicPaths, getPageSEO } from '../dist-ssr/entry-server.js';

for (const path of [...publicPaths, '/404']) {
  const html = await readFile(path === '/' ? 'dist/index.html' : `dist${path}.html`, 'utf8');
  const document = new JSDOM(html).window.document;
  assert.equal(document.querySelectorAll('link[rel="canonical"]').length, 1, path);
  assert.equal(document.querySelector('link[rel="canonical"]').href, getPageSEO(path).canonical, path);
  assert.equal(document.title, getPageSEO(path).title, path);
  assert.equal(document.querySelectorAll('h1').length, 1, `${path}: one descriptive heading`);
  assert.ok(document.querySelector('#root').textContent.length > 20, `${path}: content before JS`);
  assert.equal(document.querySelector('meta[name="robots"]').content.includes('noindex'), path === '/404', path);
  for (const script of document.querySelectorAll('script[type="application/ld+json"]')) JSON.parse(script.textContent);
  for (const el of document.querySelectorAll('[src^="/assets/"], [href^="/assets/"]')) {
    await stat(resolve('dist', (el.getAttribute('src') || el.getAttribute('href')).slice(1)));
  }
}
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
assert.equal((sitemap.match(/<loc>/g) || []).length, publicPaths.length);
assert.ok(!sitemap.includes('https://lktaxi.com'));
const hosting = JSON.parse(await readFile('vercel.json', 'utf8'));
assert.equal(hosting.cleanUrls, true);
assert.equal(hosting.rewrites, undefined, 'Do not rewrite missing URLs to a successful homepage');

// Model static hosting locally, including clean URLs and real missing-page responses.
const server = createServer(async (request, response) => {
  const path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  let file = resolve('dist', path === '/' ? 'index.html' : path.slice(1));
  if (!file.startsWith(resolve('dist'))) { response.writeHead(403); response.end(); return; }
  if (!extname(file)) file += '.html';
  let data;
  try { data = await readFile(file); } catch { file = resolve('dist/404.html'); data = await readFile(file); response.statusCode = 404; }
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.xml': 'application/xml' };
  response.setHeader('Content-Type', types[extname(file)] || 'text/plain'); response.end(data);
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
let browser;
try {
  browser = await chromium.launch({ ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}), headless: true });
  const context = await browser.newContext();
  await context.route('**/*', route => route.request().url().startsWith(origin) ? route.continue() : route.abort());
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(origin + '/taxi/airport-to-kandy');
  await page.waitForFunction(() => document.title.includes('Colombo Airport to Kandy'));
  await page.getByRole('link', { name: 'Home', exact: true }).first().click();
  await page.waitForFunction(() => document.title === 'Sri Lanka Private Taxi & Airport Transfers | LKTaxi');
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://www.lktaxi.com/');
  await page.getByText('Are your drivers English speaking?', { exact: true }).click();
  assert.ok(await page.locator('details[open]').count());
  await page.getByRole('link', { name: 'Blogs', exact: true }).first().click();
  await page.waitForFunction(() => document.title.includes('Travel Guides & Safari Tips'));
  const blogPath = publicPaths.find(p => p.startsWith('/blogs/'));
  await page.goto(origin + blogPath);
  await page.waitForFunction(() => !!document.querySelector('[data-page-schema]'));
  assert.equal(await page.locator('meta[property="og:type"]').getAttribute('content'), 'article');
  await page.getByRole('link', { name: 'Home', exact: true }).first().click();
  await page.waitForFunction(() => document.title === 'Sri Lanka Private Taxi & Airport Transfers | LKTaxi');
  assert.equal(await page.locator('meta[property="og:type"]').getAttribute('content'), 'website');
  assert.equal(await page.locator('[data-page-schema]').count(), 0);
  await page.evaluate(() => {
    window.__contactEvents = [];
    window.gtag = (...args) => window.__contactEvents.push(args);
    window.open = () => null;
  });
  await page.getByRole('button', { name: 'Custom Ride Request' }).click();
  await page.getByPlaceholder('Your Name', { exact: true }).fill('Test traveler');
  await page.getByRole('button', { name: 'Send via WhatsApp', exact: true }).first().click();
  const events = await page.evaluate(() => window.__contactEvents);
  assert.equal(events.length, 1);
  assert.equal(events[0][1], 'contact_click');
  assert.equal(events[0][2].contact_method, 'whatsapp');
  assert.ok(!JSON.stringify(events).includes('Test traveler'), 'Contact events must not include personal form data');
  await page.getByRole('button', { name: 'Fare Calculator' }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), 'No horizontal overflow on mobile');
  await page.screenshot({ path: 'dist-ssr/seo-mobile-check.png', fullPage: false });
  const missing = await page.goto(origin + '/missing-seo-test');
  assert.equal(missing.status(), 404);
  await page.waitForFunction(() => document.querySelector('meta[name="robots"]').content === 'noindex, follow');
  assert.deepEqual(errors, []);
  const noJS = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await noJS.newPage();
  await staticPage.goto(origin + '/taxi/airport-to-kandy');
  assert.ok((await staticPage.locator('main').innerText()).includes('Plan your private transfer'));
  console.log(`Passed: ${publicPaths.length} static pages, schema JSON, asset paths, sitemap, browser navigation, mobile layout and 404/no-JS checks.`);
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
