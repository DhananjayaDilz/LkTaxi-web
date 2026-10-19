# SEO Fixes Implemented — LKTaxi

**Branch:** `seo-audit-fixes-2026-10-19`  
**Date:** 2026-10-19  
**Status:** Fixed locally — awaiting deployment authorization

---

## Changes Implemented

### Fix 1: Remove duplicate boilerplate from route pages (SEO-02)

**Rationale:** All 31 route pages contained an identical "Journey Highlights" section (5 bullet points, word-for-word same). This contributes to Google treating these pages as thin/duplicate content — the primary suspected cause of 57 pages in "Discovered — currently not indexed" status.

**File changed:** [`src/pages/RoutePage.tsx`](file:///e:/Achintha/LK_TAXI_UPDATE/LkTaxi-web/src/pages/RoutePage.tsx)

**What was removed:**
```diff
-            <h3>Journey Highlights</h3>
-            <ul>
-              <li>Direct door-to-door private transfer with an experienced, English-speaking Srilankan taxi driver</li>
-              <li>Optional scenic stops for photography, tea factory tours, or refreshments along the way</li>
-              <li>Fully air-conditioned, well-maintained modern vehicles with dedicated luggage capacity</li>
-              <li>Upfront fixed quotes with confirmed highway tolls, parking, and waiting time</li>
-              <li>Available 24 hours a day, 7 days a week with flexible departure scheduling</li>
-            </ul>
```

**Impact:** Reduces duplicate content across 31 pages. Each route page now relies on its unique `routeContent` data (description, scenic highlights, travel tips, FAQs) for differentiation.

**Verification:** TypeScript compiles, ESLint passes, route pages render correctly in dev server.

---

### Fix 2: Add image dimensions to blog cover images (SEO-05)

**Rationale:** Blog cover `<img>` tags lacked `width` and `height` attributes, causing Cumulative Layout Shift (CLS) during page load.

**File changed:** [`src/pages/BlogDetail.tsx`](file:///e:/Achintha/LK_TAXI_UPDATE/LkTaxi-web/src/pages/BlogDetail.tsx)

```diff
 <img
   src={post.coverImage}
   alt={post.title}
   loading="eager"
+  width={1200}
+  height={675}
 />
```

**Impact:** Reduces CLS on 6 blog pages by providing intrinsic dimensions for the 16:9 aspect-ratio container.

---

### Fix 3: Complete breadcrumb schema for service pages (SEO-06)

**Rationale:** Four service pages (`/airport-transfer`, `/yala-safari`, `/private-driver-sri-lanka`, `/sri-lanka-tour-packages`) were missing BreadcrumbList structured data because the breadcrumb generation logic only handled `/routes`, `/taxi/*`, and `/blogs/*` paths.

**Files changed:**
- [`scripts/prerender.mjs`](file:///e:/Achintha/LK_TAXI_UPDATE/LkTaxi-web/scripts/prerender.mjs) (build-time)
- [`src/components/PageSEO.tsx`](file:///e:/Achintha/LK_TAXI_UPDATE/LkTaxi-web/src/components/PageSEO.tsx) (client-side)

```diff
     } else if (path.startsWith('/blogs/')) {
       breadcrumbs.push({ name: 'Travel Blog', url: '...' });
       breadcrumbs.push({ name: seo.title.replace(' | LKTaxi', ''), url: seo.canonical });
+    } else {
+      breadcrumbs.push({ name: seo.title.replace(' | LKTaxi', ''), url: seo.canonical });
     }
```

**Impact:** 4 service pages now have proper `Home → Page Title` breadcrumb schema in both prerendered HTML and client navigation.

---

### Fix 4: Switch OG/Twitter image from 1.5MB PNG to 80KB WebP (SEO-07)

**Rationale:** The OG image was referencing a 1.5MB PNG file (`sri-lanka-private-taxi-and-tours-hero.png`). The equivalent WebP file already exists at 80KB — 95% smaller.

**Files changed:**
- [`index.html`](file:///e:/Achintha/LK_TAXI_UPDATE/LkTaxi-web/index.html) — OG meta, Twitter meta, Organization schema
- [`src/lib/page-seo.ts`](file:///e:/Achintha/LK_TAXI_UPDATE/LkTaxi-web/src/lib/page-seo.ts) — default image fallback
- [`src/lib/seo-utils.ts`](file:///e:/Achintha/LK_TAXI_UPDATE/LkTaxi-web/src/lib/seo-utils.ts) — TaxiService schema image

All references updated from `.png` to `.webp`.

**Impact:** Social sharing previews load ~20x faster. Note: Some social platforms may not fully support WebP for OG images — monitor and revert if needed.

---

## Verification Results

| Check | Command | Result |
|-------|---------|--------|
| TypeScript | `npx tsc --noEmit` | ✅ Pass (exit 0) |
| ESLint | `npx eslint <modified files>` | ✅ Pass (exit 0) |
| Dev server | `npm run dev` | ✅ Running, no errors |
| 404 handling | `curl -s -o /dev/null -w "%{http_code}" https://www.lktaxi.com/nonexistent-page` | ✅ Returns 404 |
| Production robots.txt | Fetched live | ✅ Correct |
| Production sitemap | 77 URLs, all canonical | ✅ Correct |

**Not yet verified (requires build + deploy):**
- Prerendered HTML output with updated breadcrumbs
- Updated sitemap with correct schemas
- Full `npm run build` + `npm run test:seo` checks

---

## Remaining Risks

1. **WebP OG image compatibility:** Some older social platforms (LinkedIn, older Facebook crawlers) may not render WebP OG images. The PNG file is preserved and can be reverted.

2. **Thin content pages still exist:** Removing the boilerplate reduces duplication but doesn't add unique content. Location pages without entries in `location-content.ts` still fall back to generic template text. Consider adding unique content for at least the top 10-15 destinations.

3. **FAQPage schema duplication:** The `FAQSection` component renders FAQPage JSON-LD via React's `dangerouslySetInnerHTML`, which is included in prerendered HTML. However, pages with the default FAQ (no `customFaqs`) all emit the same FAQ schema — Google may treat this as duplicate structured data across pages.

---

## Rollback Instructions

All changes are on branch `seo-audit-fixes-2026-10-19`. To rollback:

```bash
git checkout main
git branch -D seo-audit-fixes-2026-10-19  # delete local branch
```

Individual file rollback:
```bash
git checkout main -- src/pages/RoutePage.tsx
git checkout main -- src/pages/BlogDetail.tsx
git checkout main -- scripts/prerender.mjs
git checkout main -- src/components/PageSEO.tsx
git checkout main -- src/lib/page-seo.ts
git checkout main -- src/lib/seo-utils.ts
git checkout main -- index.html
```
