# LKTaxi SEO implementation and release checklist

## Implemented

- Production build prerenders the homepage, blog index, all 33 listed destinations, 15 curated transfer routes and 3 blog articles (53 public pages).
- Each page has its own title, description, canonical URL and social metadata in the initial HTML. Client navigation updates these values, including returning to the homepage.
- Vercel serves static clean URLs. Removed the blanket rewrite to index.html. A custom 404.html includes noindex; unpublished URLs are not treated as successful homepage responses.
- The sitemap and robots.txt use https://www.lktaxi.com consistently. Sitemap generation runs during every production build; fabricated build-date lastmod values were removed.
- Blog content is rendered immediately. Removed the artificial loading delay. Article schema follows the current article.
- Removed nonfunctional SearchAction and the global FAQ schema that appeared on unrelated pages. FAQ answers now exist in the document without requiring JavaScript.
- Route pages include route-specific booking guidance and links. The homepage links to transfer routes. Unlisted city combinations now show a missing-page response rather than generating more generic pages.
- Compressed airport and long-tour images from 19.3 MB combined to about 278 KB. Added smaller WebP tour-map images; original PNG URLs remain available for existing links and sharing.
- The interactive map loads only after pickup and destination are selected.
- Added a prominent link to the supplied Google review result. Removed unsupported satisfaction totals and testimonial verification badges. No rating or review count was invented.
- Use the owner-confirmed +94 78 420 7818 for all calls and WhatsApp bookings, including header, footer, contact information, blog links and structured data.
- Added GA4 contact_click events for phone links, WhatsApp links and inquiry buttons. These are inquiry actions, not completed bookings, and contain no names, phone numbers or message text.

## Build and verification

Use Node.js 22 and install dependencies with npm ci.

- npm run build: builds the browser bundle, builds the server render bundle, and emits static pages and sitemap in dist.
- npm run generate:sitemap: updates the checked-in public/sitemap.xml from the shared page list.
- npx tsc --noEmit -p tsconfig.app.json
- npm test
- npm run test:seo: run after building; requires a Playwright Chromium browser. On Windows with Edge installed, set PLAYWRIGHT_CHANNEL=msedge first.

The SEO check verifies all page canonicals, headings, initial content, metadata, JSON-LD, asset references and sitemap entries. Browser checks cover navigation, metadata cleanup, inquiry tracking, mobile overflow, missing pages and reading route content with JavaScript disabled. Its local HTTP server models static hosting; production HTTP status codes must also be checked after deployment.

Vercel must use the committed buildCommand (npm run build) and outputDirectory (dist). Do not deploy build:dev or the dist-ssr directory. Other hosts need equivalent clean URL routing and a real 404 response, not a single-page-app fallback.

## After deployment

1. Verify /, /taxi/airport-to-kandy and one /blogs/ article return their own HTML and canonical URLs. Verify a made-up URL returns HTTP 404. Check non-www redirects to www and real pages remain accessible without .html suffixes.
2. Submit https://www.lktaxi.com/sitemap.xml in the existing Google Search Console property. Inspect the homepage and priority routes, including Google's selected canonical and rendered content, then request indexing where appropriate.
3. Review Search Console performance by query, page and country. Separate branded searches from route searches. The code audit cannot establish current Google indexing status or ranking positions.
4. In GA4 DebugView or Realtime, verify contact_click events. Mark them as key events only if inquiry clicks are the desired business metric. Track confirmed bookings separately in booking records.
5. In Google Business Profile, verify the website URL, actual business category, phone, hours and service area. Obtain the official Maps share link to replace the supplied Google search-result link when available.
6. Keep published prices, passenger capacities, availability and service promises accurate. Add actual route-specific fares, travel-time estimates and original trip photos as they are verified by the business.
7. Request honest reviews from actual customers and reply to them. No review threshold guarantees a ranking position.

## Limits and follow-up

Search Console, Analytics configuration and Business Profile settings were not accessed or changed. No live deployment is performed by these code changes. The review link is the owner-supplied Google result with unnecessary session parameters removed, not a newly verified Place ID. Google controls indexing and ranking; this implementation cannot guarantee first place.

References: [Google canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [Google JavaScript SEO guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [Google local ranking guidance](https://support.google.com/business/answer/7091?hl=en), [Vercel configuration](https://vercel.com/docs/project-configuration).
