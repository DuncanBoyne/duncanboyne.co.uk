# SEO — duncanboyne.co.uk

Goal: rank for **"Power BI consultant Norfolk / Norwich / Great Yarmouth"** and related local terms.

> There are two sections here: **traditional SEO** (Google/Bing ranking) below, and
> **GEO** (getting cited by ChatGPT/Copilot/Perplexity and AI Overviews) at the very bottom.

The website work is done (see "What's already built" below). The remaining wins are
**off-site** and only you can do them — they matter *more* than the code for local search.

---

## Do these, in this order

### 1. Google Business Profile  ← biggest local lever, do this first
The map pack ("businesses near me") is won here, not in HTML. Free.

1. Go to https://business.google.com → **Add your business**.
2. Business name: **Duncan Boyne** (or "Duncan Boyne — Power BI Consultant").
3. Category: **Business Intelligence** / **IT Consultant** (primary). Add "Data Analyst" / "Software Consultant" as secondary if offered.
4. When asked "do you serve customers at your address?": choose **service-area business**
   (hides your home address). Add service areas: **Norfolk, Norwich, Great Yarmouth**.
5. Add website `https://www.duncanboyne.co.uk`, email, and the headshot/logo.
6. Verify (postcard, phone, or video — Google picks). **Until verified it won't show.**
7. After verifying: write the "from the business" description using the same language as the
   site ("Power BI consultant in Norfolk…"), and add 1–2 posts. Keep it active occasionally.

### 2. Google Search Console  ← tells Google to crawl, shows what you rank for
1. https://search.google.com/search-console → add property.
2. Use the **URL-prefix** property: `https://www.duncanboyne.co.uk`.
3. Verify via the **HTML tag** method (easiest here): Google gives you a
   `<meta name="google-site-verification" content="…">` tag.
   → Send me that content string and I'll add it to the site, or paste it into
     `src/app.html` inside `<head>`. Rebuild + push, then click Verify.
4. Once verified: **Sitemaps → submit** `sitemap.xml`.
5. Use **URL Inspection** on the homepage → "Request indexing" to nudge the first crawl.

### 3. Bing Webmaster Tools  ← free Bing/Copilot traffic, 5 min
1. https://www.bing.com/webmasters → sign in.
2. **Import from Google Search Console** (one click once #2 is done), or add manually.
3. Submit the same `sitemap.xml`.

### 4. Local citations (consistency is the signal)
Get your name + "Norfolk" + website listed consistently in a few places:
- **LinkedIn**: location set to Norfolk/Norwich; headline/about mention Power BI + Norfolk.
- A UK business directory or two (e.g. local Chamber of Commerce, a Norfolk business listing).
- Keep Name / Area / Website **identical** everywhere (Google cross-checks these).

---

## What's already built (on-site)

- **SSR enabled** — pages now ship real HTML (titles, copy, schema) instead of empty shells.
  This was the single biggest fix. (`src/routes/+layout.ts`)
- **Per-page SEO** via `src/lib/components/Seo.svelte` — title, description, canonical,
  Open Graph, Twitter card. Location terms in home/services/about/contact.
- **LocalBusiness schema** — `ProfessionalService` JSON-LD with `areaServed`
  (Norfolk, Norwich, Great Yarmouth), service-area only, no street address.
  (`src/routes/+layout.svelte`)
- **sitemap.xml** — static routes + blog/talk slugs. (`src/routes/sitemap.xml/+server.ts`)
- **robots.txt** — points crawlers at the sitemap. (`static/robots.txt`)
- **Footer location line** — sitewide "based in Norfolk" signal.

## How to verify the on-site bits are live
After a deploy, these should all return content:
- https://www.duncanboyne.co.uk/sitemap.xml
- https://www.duncanboyne.co.uk/robots.txt
- View-source any page → `<title>` has a location, and there's a
  `<script type="application/ld+json">` block with `ProfessionalService`.
- Test the schema: https://search.google.com/test/rich-results (paste a URL).

---

## Adding more location pages later (optional, higher effort)
The strongest play for a specific town is a dedicated page (e.g. `/power-bi-consultant-norwich`)
with genuinely town-specific copy — NOT a duplicated template (Google penalises doorway pages).
Only worth it if you have real, distinct things to say per town. Ask and I'll scaffold one.

## ⚠️ Do not delete these verification files
Both live in `static/` and must stay forever — deleting either un-verifies you:
- `static/google1539c18771c3851b.html` — Google Search Console
- `static/BingSiteAuth.xml` — Bing Webmaster Tools

## Don't bother with
- Keyword stuffing — the current copy is at the right density. More would hurt.
- Buying backlinks / directory spam — risk > reward.
- Meta keywords tag — Google ignores it.

---

# GEO — getting found on ChatGPT & other LLMs

GEO (Generative Engine Optimization) is about being the answer an assistant *cites* when
someone asks "who's a good freelance Power BI consultant in Norfolk?" — not about ranking a
blue link. The framework used here (from a talk): **CITES** —
**C**larity, **I**ntent, **T**rust, **E**vidence, **S**tructure.

## What's built for GEO (on-site)

- **`/faq` page + `FAQPage` JSON-LD** (`src/routes/faq/+page.svelte`) — 12 questions phrased
  the way people ask assistants (freelance/fractional, remote, cost, results, industries,
  experience). Each answer is a tight, self-contained, citable block. The schema is the
  payload LLMs and AI Overviews lift answers from. *(Intent + Structure)*
- **Evidence block on `/services`** — a "Selected results" list of **anonymised, number-led
  client wins** (£100k saved; refunds 15%→1–2%; post-ERP reporting rebuild; bespoke ranking
  system; invoice-chase automation) plus a "by the numbers" strip. Numbers are real, client
  names withheld. *(Evidence)*
- **Woven Q&As** on `/services` and `/contact` — page-relevant subsets that link to `/faq`.
  *(Intent)*
- **Trust enrichment** — `founder` in the `ProfessionalService` JSON-LD is now a full `Person`
  (jobTitle, 10 yrs Power BI / 12 in data, 250+ projects / 70+ orgs, founder of NPPUG &
  EoEPPS, 20+ talks in 3 countries, Sessionize in `sameAs`). *(Trust)*
- **Internal linking** — footer quick links + `/faq` in the sitemap, so crawlers/LLMs
  actually find the new content. *(Clarity/Structure)*

## The honest inputs behind the numbers
So future edits stay truthful — these are Duncan's real figures, not invented:
10 yrs Power BI / 12 yrs data & IT · 70+ organisations · 250+ projects ·
20+ talks in 3 countries (soon 5) · 8 EoEPPS events, 500+ attendees ·
**no Microsoft certifications** (deliberately not claimed anywhere).

## GEO wins that are OFF-site (only Duncan can do)
LLMs weight third-party corroboration heavily. The on-site work is necessary but not
sufficient — these move the needle most:
1. **LinkedIn** — headline/about must match the site language ("freelance/fractional Power BI
   consultant, Norfolk") and ideally restate a metric or two. LLMs read LinkedIn heavily.
2. **Consistent NAP everywhere** — same name + area + URL on every profile/directory (this is
   the "Clarity: location consistency" lever from the talk).
3. **Get mentioned in others' content** — guest posts, podcast/user-group writeups, event
   pages that name you *and* what you do. Third-party pages that state "Duncan Boyne, Power BI
   consultant in Norfolk" are what an LLM trusts more than your own site.
4. **Keep the results current** — add a new anonymised win to `/services` + `/faq` whenever you
   land one. Specific, quantified outcomes are the single most citable thing you own.

## Verify the GEO bits are live
- View-source `/faq` → one `<script type="application/ld+json">` block with `"@type":"FAQPage"`.
- Rich Results Test (https://search.google.com/test/rich-results) on `/faq` → detects FAQ.
- `/sitemap.xml` includes `/faq`.
- Ask ChatGPT/Perplexity (with browsing) "freelance Power BI consultant Norfolk" after the
  site has been re-crawled — this takes weeks, not hours. Don't expect instant results.
