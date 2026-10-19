# Google Search Console — Post-Deployment Steps

**Date:** 2026-10-19  
**Prerequisite:** Deploy branch `seo-audit-fixes-2026-10-19` to production

---

## Immediate Post-Deployment Steps

### 1. Verify deployment (Day 0)

- Confirm the production build completed successfully
- Spot-check 3-5 pages for correct prerendered HTML:
  - `https://www.lktaxi.com/` — verify OG image is `.webp`
  - `https://www.lktaxi.com/airport-transfer` — verify BreadcrumbList schema in `<head>`
  - `https://www.lktaxi.com/taxi/colombo-to-ella` — verify "Journey Highlights" boilerplate removed
  - `https://www.lktaxi.com/blogs/taxi-lanka-srilankan-taxi` — verify blog image has `width`/`height`

### 2. Submit updated sitemap (Day 0)

> **Note:** A validation is already running for the "Discovered — currently not indexed" category. Do not cancel it.

1. Go to **Google Search Console → Sitemaps**
2. If the existing sitemap `https://www.lktaxi.com/sitemap.xml` is already listed, click it and select **Resubmit**
3. If not listed, add it

### 2b. Submit all URLs to IndexNow (Bing / Yandex / Seznam / Naver)

IndexNow provides immediate search engine notifications whenever URLs are published or updated.
- Verification Key: `87ed4e8947b330cfa68e66c17385abea`
- Key URL: `https://www.lktaxi.com/87ed4e8947b330cfa68e66c17385abea.txt`

Once the site is deployed, submit all 77 pages instantly with one command:
```bash
npm run submit:indexnow
```
Or test in dry-run mode before submission:
```bash
npm run submit:indexnow -- --dry-run
```

### 3. Request URL Inspection for key pages (Day 0-1)

Use **URL Inspection** → **Request Indexing** for these priority pages only (Google limits daily requests):

**Day 0 — High-priority service pages:**
1. `https://www.lktaxi.com/airport-transfer`
2. `https://www.lktaxi.com/yala-safari`
3. `https://www.lktaxi.com/private-driver-sri-lanka`
4. `https://www.lktaxi.com/sri-lanka-tour-packages`

**Day 1 — Top route pages:**
5. `https://www.lktaxi.com/taxi/airport-to-kandy`
6. `https://www.lktaxi.com/taxi/airport-to-ella`
7. `https://www.lktaxi.com/taxi/colombo-to-ella`
8. `https://www.lktaxi.com/taxi/airport-to-mirissa`
9. `https://www.lktaxi.com/taxi/airport-to-galle`
10. `https://www.lktaxi.com/taxi/kandy-to-ella`

**Do NOT** bulk-request all 77 URLs. Google treats excessive indexing requests as low-quality signals.

### 4. Validate the existing "Discovered — currently not indexed" issue (Day 0)

The GSC screenshots show validation has already started for this category. After deployment:

1. Go to **Pages → Discovered — currently not indexed**
2. The validation should continue automatically
3. If it has completed or failed, click **Validate Fix** to restart
4. This tells Google to recrawl the affected URLs over the next 1-2 weeks

---

## 30-Day Measurement Plan

### Week 1 (Days 1-7)

| Metric | Where to Check | What to Look For |
|--------|---------------|------------------|
| Pages indexed | GSC → Pages | Increase from 15 |
| "Discovered — not indexed" count | GSC → Pages | Decrease from 57 |
| Crawl stats | GSC → Settings → Crawl Stats | Crawl requests increasing |
| URL Inspection results | GSC → URL Inspection | Pages showing as "Indexable" |

**Action:** If no change after 7 days, this is normal. Google recrawl takes time for new/small sites.

### Week 2 (Days 8-14)

| Metric | Where to Check | What to Look For |
|--------|---------------|------------------|
| New pages indexed | GSC → Pages | Some route/location pages moving to indexed |
| Impressions | GSC → Performance | Any increase in search impressions |
| Structured data | GSC → Enhancements | FAQPage, BreadcrumbList appearing |

**Action:** Check which specific URLs moved from "Discovered" to "Indexed" or "Crawled — not indexed." If pages move to "Crawled — not indexed," this suggests Google reviewed the content and judged it insufficient — prioritize adding unique content to those pages.

### Week 3-4 (Days 15-30)

| Metric | Where to Check | What to Look For |
|--------|---------------|------------------|
| Total indexed pages | GSC → Pages | Target: 30+ pages indexed (up from 15) |
| Organic clicks | GSC → Performance → Clicks | Any increase, especially from airport transfer queries |
| Top queries | GSC → Performance → Queries | New queries appearing for route pages |
| WhatsApp enquiries | GA4 → Events → contact_click | Baseline for daily enquiry count |
| Rich results | GSC → Enhancements → FAQ | FAQ rich results appearing |

**Action items at Day 30:**
1. Export GSC Performance data for the 30-day period
2. Compare indexed page count vs. starting 15
3. Compare total impressions and clicks vs. previous period
4. Count WhatsApp click events in GA4
5. Record actual confirmed bookings (manual count)

---

## What To Track for Bookings

WhatsApp clicks tracked in GA4 represent **enquiry intent**, not confirmed bookings.

To measure actual business impact:

1. **GA4 contact_click events** → Count of WhatsApp opens (enquiry intent)
2. **WhatsApp Business** → Count of unique conversations started (actual enquiries)
3. **Manual booking log** → Confirmed bookings from those conversations

Create a simple spreadsheet:

| Date | GA4 WhatsApp Clicks | WA Conversations Started | Bookings Confirmed | Revenue |
|------|--------------------|--------------------------|--------------------|---------|

---

## Content Improvement Priorities (Post-Deploy)

The code fixes reduce duplication but do not add new unique content. For the best indexing results, prioritize adding unique content to location pages in `src/data/location-content.ts` for these high-demand destinations:

1. **Airport** (`/taxi/airport`) — already has content ✅
2. **Colombo** (`/taxi/colombo`) — already has content ✅
3. **Ella** (`/taxi/ella`) — already has content ✅
4. **Kandy** (`/taxi/kandy`) — already has content ✅
5. **Galle** (`/taxi/galle`) — verify content exists
6. **Mirissa** (`/taxi/mirissa`) — verify content exists
7. **Sigiriya** (`/taxi/sigiriya`) — verify content exists
8. **Negombo** (`/taxi/negombo`) — verify content exists
9. **Yala** (`/taxi/yala`) — verify content exists
10. **Nuwara Eliya** (`/taxi/nuwara-eliya`) — verify content exists

For the remaining 23 locations, verify each has a unique `locationContent` entry. Pages without unique content are the most likely candidates for "Discovered — not indexed."

---

## Important Notes

- **Do not use** Google's Indexing API for these pages — it is reserved for `JobPosting` and `BroadcastEvent` schema types
- **Do not** mass-submit URLs through third-party indexing services
- **Do not** remove pages from the sitemap to improve the indexed ratio — this hides the problem
- **Do not** add artificial `lastmod` date changes to force recrawling
- Indexing improvements may take 2-4 weeks for a site of this size and authority
- If "Discovered — not indexed" count doesn't decrease after 4 weeks, the primary remaining cause is likely content quality/uniqueness — focus on enriching the thinner pages
