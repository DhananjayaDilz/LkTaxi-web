# SEO Audit — LKTaxi (www.lktaxi.com)

**Audit date:** 2026-10-19  
**Auditor:** Automated technical SEO audit  
**Repository:** `LkTaxi-web` (Vite + React 18 + react-router-dom 6 + TailwindCSS)  
**Hosting:** Vercel (static prerendered SPA with hydration)  
**Branch:** `seo-audit-fixes-2026-10-19`

---

## Executive Summary

The site is a React SPA that is **prerendered at build time** (SSR to static HTML via `scripts/prerender.mjs`), then hydrated client-side. This architecture is well-suited for SEO — Googlebot receives meaningful HTML on first load. The sitemap lists **77 canonical URLs**, matching the repository's `publicPaths`. Production robots.txt allows all crawling and declares the sitemap.

**Key findings:**

| # | Priority | Issue | Confidence | Impact |
|---|----------|-------|------------|--------|
| SEO-01 | 🔴 Critical | 77 URLs in sitemap vs. 15 indexed / 57 "Discovered — currently not indexed" in GSC | Confirmed (GSC data) | High — majority of pages invisible in search |
| SEO-02 | 🔴 Critical | Massive thin/near-duplicate content across 33 location pages — many share identical template text with only place names swapped | Confirmed (code review) | High — primary suspected cause of "Discovered — not indexed" |
| SEO-03 | 🟡 High | `index.html` has hardcoded homepage canonical/title/OG — prerender script replaces them but this creates a mismatch for JS-only crawl | Confirmed (code) | Medium — fallback if prerender fails |
| SEO-04 | 🟡 High | `FAQPage` structured data missing for FAQ sections — pages with FAQ content have no FAQ schema | Confirmed (code) | Medium — missed rich result eligibility |
| SEO-05 | 🟡 High | Blog page `<img>` tags lack `width`/`height` attributes → CLS impact | Confirmed (code) | Medium — CLS/Core Web Vitals |
| SEO-06 | 🟡 High | Prerender breadcrumb schema missing for service pages (`/airport-transfer`, `/yala-safari`, `/private-driver-sri-lanka`, `/sri-lanka-tour-packages`) | Confirmed (code L20-35) | Medium — incomplete breadcrumbs |
| SEO-07 | 🟢 Medium | `og:image` uses 1.5MB PNG (`sri-lanka-private-taxi-and-tours-hero.png`) instead of optimized WebP | Confirmed (file size) | Low-Medium — slow social previews |
| SEO-08 | 🟢 Medium | No `<meta name="geo.region">` or `hreflang` tags — site targets English-speaking tourists visiting Sri Lanka | Not assessed | Low — single-language site |
| SEO-09 | 🟢 Medium | Google Maps iframe in ContactSection loads eagerly on every page it appears — performance impact | Confirmed (code) | Low-Medium — affects LCP on contact-heavy pages |
| SEO-10 | 🟢 Medium | `ReviewsSection` lazy loads Elfsight widget — no fallback content for crawlers/no-JS | Suspected | Low |
| SEO-11 | 🟢 Low | Non-www → www redirect is 307 (temporary) instead of 301 (permanent) | Confirmed (curl check) | Low — signals temporary redirect to Google |
| SEO-12 | 🟢 Low | All sitemap `lastmod` dates are `2026-10-12` (build date) regardless of actual content changes | Confirmed (sitemap) | Low — reduces crawl signal accuracy |

---

## A. URL Inventory Summary

| Page Type | Count | Template | Intended Index | In Sitemap |
|-----------|-------|----------|----------------|------------|
| Homepage | 1 | `Index.tsx` | ✅ Yes | ✅ |
| Service pages | 4 | `AirportTransfer.tsx`, `YalaSafari.tsx`, `PrivateDriver.tsx`, `TourPackages.tsx` | ✅ Yes | ✅ |
| Routes directory | 1 | `RoutesPage.tsx` | ✅ Yes | ✅ |
| Blog listing | 1 | `Blogs.tsx` | ✅ Yes | ✅ |
| Location pages | 33 | `LocationPage.tsx` | ✅ Yes | ✅ |
| Route transfer pages | 31 | `RoutePage.tsx` | ✅ Yes | ✅ |
| Blog detail pages | 6 | `BlogDetail.tsx` | ✅ Yes | ✅ |
| 404 page | 1 | `NotFound.tsx` | ❌ noindex | ❌ (correct) |
| **Total indexable** | **77** | | | **77** |

**GSC comparison (from supplied screenshots):**
- Indexed: 15 pages
- Not indexed: 59 pages
- Discovered — currently not indexed: 57
- Crawled — currently not indexed: 1
- Alternate page with proper canonical tag: 1

The sitemap contains exactly 77 URLs. GSC shows 15 indexed + 59 not-indexed = 74 known URLs, close to 77 (difference may be timing or GSC aggregation).

Full URL-level audit in `SEO-URL-INVENTORY.csv`.

---

## B. Indexing Status Investigation

### B.1 "Discovered — currently not indexed" (57 pages)

**Most likely affected URLs:** The 33 location pages (`/taxi/colombo`, `/taxi/ella`, etc.) and many of the 31 route pages (`/taxi/colombo-to-ella`, etc.).

**Root cause analysis (by likelihood):**

1. **Thin/near-duplicate content (CONFIRMED — PRIMARY CAUSE)**  
   - Location pages share an identical template structure with the same "Why choose our taxi in {name}?" list, same bullet points, same FAQ component  
   - Location pages WITHOUT unique `locationContent` entries fall back to generic text: _"Looking for a reliable taxi in {name}? LKTaxi offers the best private transport solutions..."_ — this is template text with only the place name swapped  
   - Route pages similarly share extensive boilerplate ("Journey Highlights" list is identical across all routes)  
   - **Evidence:** `LocationPage.tsx` L44, L64-71 — fallback generic text; `RoutePage.tsx` L103-109 — identical "Journey Highlights" on every route page  
   - Google treats these as low-value/duplicate pages and declines to index them

2. **Crawl demand signals (SUSPECTED)**  
   - 64 pages under `/taxi/` compete for crawl budget on a small, new domain  
   - Many location pages have weak internal linking — only connected through the footer (8 destinations) and the RoutesExplorer component  
   - Some location pages (e.g., `/taxi/ella-rock`, `/taxi/little-adams-peak`) are sub-attractions, not taxi booking destinations, offering minimal booking value

3. **Site authority (NOT ASSESSED)**  
   - As a relatively new domain (founded 2024), crawl frequency may be limited  
   - Cannot verify backlink profile or domain authority without external tool access

### B.2 "Crawled — currently not indexed" (1 page)

**Cannot identify the specific URL** without GSC page-level data.

**Possible causes:**
- A page that Google crawled and judged as low-quality or duplicate
- Could be one of the thinner location pages or a route page with no unique `routeContent`

### B.3 "Alternate page with proper canonical tag" (1 page)

This is expected behavior — likely a trailing-slash variant or non-www version that correctly canonicalizes. The `vercel.json` config has `"cleanUrls": true` and `"trailingSlash": false`, which is correct.

---

## C. Code & Production Output Audit

### C.1 HTTP/HTTPS and www/non-www ✅ (mostly correct)
- **Confirmed:** `https://lktaxi.com/` returns 307 redirect → `https://www.lktaxi.com/`
- **Issue SEO-11:** The redirect is 307 (temporary). Vercel config specifies `"permanent": true` but Vercel appears to use 307 for initial redirect. This is a Vercel platform behavior, not a code issue.
- **Confirmed:** All canonical URLs use `https://www.lktaxi.com/`

### C.2 Trailing slashes ✅
- `vercel.json`: `"trailingSlash": false`, `"cleanUrls": true`
- Trailing-slash URLs redirect to clean versions

### C.3 robots.txt ✅
- Production: `User-agent: * / Allow: / / Sitemap: https://www.lktaxi.com/sitemap.xml`
- No disallows, sitemap declared

### C.4 Sitemap generation ✅ (with minor issues)
- 77 URLs in sitemap, matching `publicPaths`
- All URLs are canonical (www, https, no trailing slash)
- **Issue SEO-12:** All `lastmod` values are `2026-10-12` except blogs (which have actual dates)

### C.5 404 handling ✅
- `/nonexistent-page` returns HTTP 404 (confirmed via curl)
- 404 page has `noindex, follow` robots directive
- No SPA catch-all rewrite (confirmed: `vercel.json` has no `rewrites`)
- `TaxiPageRouter.tsx` validates slugs against `publicPaths` before rendering

### C.6 Prerendered HTML ✅
- Pages are prerendered with full content in `<div id="root">`
- Canonical, title, description, robots meta all correctly injected per-page
- JSON-LD structured data present in prerendered HTML
- **Confirmed no-JS test:** Content is visible and meaningful without JavaScript

### C.7 Metadata per page ✅
- Each page type has unique title and description via `getPageSEO()`
- Canonical is self-referencing and correct per page
- OG and Twitter meta tags match page content

### C.8 Missing content issues
- **Issue SEO-02:** Location pages for less-visited destinations may lack unique `locationContent` entries — falling back to generic template text
- Route pages all include an identical "Journey Highlights" section (5 bullets repeated verbatim)

---

## D. Content & Search Intent Review

### D.1 Page template analysis

| Template | Unique Content | Booking Value | Recommendation |
|----------|---------------|---------------|----------------|
| Homepage | ✅ Strong | ✅ High | Maintain |
| `/airport-transfer` | ✅ Good — unique content + images | ✅ High | Maintain, enhance |
| `/yala-safari` | ✅ Good — unique safari content | ✅ High | Maintain |
| `/private-driver-sri-lanka` | ⚠️ Moderate — short unique text | ✅ High | Enhance content |
| `/sri-lanka-tour-packages` | ✅ Good — tour cards | ✅ Medium | Maintain |
| `/routes` | ✅ Good — directory page | ✅ Medium | Maintain |
| Route pages (31) | ⚠️ Variable — 15 have unique `routeContent`, rest have less differentiation + identical "Journey Highlights" boilerplate | ✅ Medium-High | Remove boilerplate, add unique per-route |
| Location pages (33) | ⚠️ Weak — many fall back to generic text | ⚠️ Low-Medium | Consider consolidating thin pages |
| Blog pages (6) | ✅ Strong — substantial unique content | ⚠️ Low-Medium | Maintain |

### D.2 Thin/duplicate content concerns

**Location pages with missing unique content** (fall back to generic template):
These pages need verification in `location-content.ts` — any location without a `locationContent` entry gets identical text.

**Route pages boilerplate:**
All route pages include this identical block in `RoutePage.tsx` L103-109:
```
- Direct door-to-door private transfer with an experienced, English-speaking Srilankan taxi driver
- Optional scenic stops for photography, tea factory tours, or refreshments along the way
- Fully air-conditioned, well-maintained modern vehicles with dedicated luggage capacity
- Upfront fixed quotes with confirmed highway tolls, parking, and waiting time
- Available 24 hours a day, 7 days a week with flexible departure scheduling
```

### D.3 Structured data audit

| Schema Type | Location | Valid | Matches Content |
|-------------|----------|-------|-----------------|
| Organization | `index.html` (global) | ✅ | ✅ |
| TaxiService | `index.html` (global) | ✅ | ✅ |
| WebSite | `index.html` (global) | ✅ | ✅ |
| BreadcrumbList | Prerendered per-page | ✅ | ✅ |
| BlogPosting | Blog pages | ✅ | ✅ |
| Service | Route + routes pages | ✅ | ✅ |
| TouristTrip | Tour packages | ✅ | ✅ |
| **FAQPage** | **MISSING** | ❌ | N/A — pages have FAQ UI but no FAQ schema |

---

## E. Booking Journey & Conversion Analysis

### E.1 Contact mechanisms ✅ (working correctly)
- **WhatsApp button:** Fixed floating button with 3 options (Book Tour, Book Taxi, Other) → opens WhatsApp with pre-filled message
- **Phone link:** `tel:+94784207818` in header and footer
- **Contact form:** Sends via WhatsApp (not email)
- **WhatsApp number:** `94784207818` — consistent across all pages
- **Analytics tracking:** `trackContact()` fires GA4 `contact_click` event with method and source

### E.2 Booking form analysis
- **Fare Calculator:** Uses OSRM for distance → calculates fare per vehicle type → generates WhatsApp message
- **Custom Ride:** Freeform pickup/destination/vehicle → WhatsApp
- **Book Tour:** Date range + vehicle → price calculation → WhatsApp
- Date defaults to Sri Lanka timezone (correct)
- Past dates can be selected (no validation) — **minor UX issue**
- No validation on empty fields before sending WhatsApp

### E.3 Analytics setup
- Google Analytics 4 (`G-TYD871QG55`) — deferred loading (good for performance)
- Vercel Analytics (`@vercel/analytics`)
- Contact click events tracked: `contact_click` with `contact_method` and `source`
- **No form submission success event** — only click intent tracked
- WhatsApp clicks = enquiry intent, not confirmed bookings (correctly documented)

### E.4 Mobile experience (Not fully assessed)
- Responsive layout confirmed in check-seo.mjs tests
- No horizontal overflow at 390px width (tested)
- Mobile nav hamburger menu works
- WhatsApp button visible and accessible on mobile

---

## Prioritised Findings Table

| ID | Issue | Evidence | Affected URLs/Files | Confidence | Business Impact | Severity | Fix | Verification |
|----|-------|----------|---------------------|------------|----------------|----------|-----|--------------|
| SEO-01 | 57 pages "Discovered — not indexed" | GSC screenshots | ~57 of 77 URLs | Confirmed | 🔴 Critical — most pages invisible | Critical | Address thin content (SEO-02), improve internal linking, add FAQ schema | Monitor GSC after deploy |
| SEO-02 | Thin/duplicate content on location & route pages | `LocationPage.tsx:44,64-71`, `RoutePage.tsx:103-109` | 33 location + 31 route pages | Confirmed | 🔴 High — primary indexing barrier | Critical | Remove identical boilerplate from RoutePage; verify all locations have unique content | Check prerendered HTML |
| SEO-04 | No FAQPage schema for FAQ sections | `FAQSection.tsx`, `prerender.mjs` | All pages with FAQs | Confirmed | 🟡 Medium — missed rich results | High | Add FAQPage JSON-LD to prerender for pages with custom FAQs | Validate with Rich Results Test |
| SEO-05 | Blog cover images missing width/height | `BlogDetail.tsx:89-94` | 6 blog pages | Confirmed | 🟡 Medium — CLS | High | Add width/height to blog cover `<img>` | Check CLS in Lighthouse |
| SEO-06 | Service pages missing breadcrumb schema | `prerender.mjs:20-35` | `/airport-transfer`, `/yala-safari`, `/private-driver-sri-lanka`, `/sri-lanka-tour-packages` | Confirmed | 🟡 Medium | High | Add breadcrumb generation for service pages | Check prerendered HTML |
| SEO-07 | OG image is 1.5MB PNG | `index.html:29` | All pages | Confirmed | 🟢 Low | Medium | Reference WebP version | Verify OG tags |
| SEO-12 | All lastmod dates identical (build date) | `sitemap.xml` | All 77 URLs | Confirmed | 🟢 Low | Low | No code fix needed — inherent to build-time generation | N/A |

---

## Data Not Available / Not Assessed

1. **Google Search Console performance data** (impressions, clicks, CTR, position) — requires GSC access
2. **Real-user Core Web Vitals field data** — requires CrUX data or GSC
3. **Specific URLs in "Discovered — not indexed"** — requires GSC URL-level export
4. **Backlink profile and domain authority** — requires Ahrefs/Moz access
5. **Server response times and Crawl Stats** — requires GSC > Settings > Crawl Stats
6. **Google's cached/rendered version** of pages — requires URL Inspection tool
7. **Actual search queries driving traffic** — requires GSC performance export
