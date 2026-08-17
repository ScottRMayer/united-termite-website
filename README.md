# United Termite & Pest Control — New Website

### 👉 Live preview: **https://scottrmayer.github.io/united-termite-website/**

That link is a preview for review only — it is not the business's live site.
The real site would be published to `www.unitedtermitenj.net` (see Deploying).

A modern, fast, dependency-free static website rebuilt from the old Hibu/Duda site
(`Old Site/` mirror). All content — services, reviews, licenses, hours, photos —
was carried over from the original site and reorganized with a new design.

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Home — hero, services, why-us, reviews, service area |
| `termite-inspections.html` | Termite inspection service + termite types |
| `termite-control.html` | Termite control / ATBS bait stations |
| `pest-control.html` | Pest control, pest list, FAQ |
| `crawl-space-services.html` | Crawl space cleaning / encapsulation |
| `reviews.html` | All customer reviews |
| `contact.html` | Contact info + estimate request form |

Shared assets: `css/styles.css`, `js/main.js`, `images/`, `favicon.svg`.
Also included: `404.html` (branded not-found page; Netlify/GitHub Pages serve it
automatically), `sitemap.xml`, and `robots.txt` (update the domain in both if
the site moves off unitedtermitenj.net).

Images were resized/recompressed for the web (heroes capped at 1600px). The
untouched originals remain in the `Old Site/` mirror if ever needed.

## How to view locally

Serve the folder with any static server, e.g.:

```bash
python -m http.server 8000
```

then open http://localhost:8000. (Opening `index.html` directly with a
double-click mostly works, but page-hero background photos use root-relative
URLs and only render when served.)

## Deploying

Upload the `New Site` folder contents to any static host (Netlify, Vercel,
GitHub Pages, or the current hosting provider) — you can leave this README
out of the upload; it's documentation, not site content.
If the domain stays `www.unitedtermitenj.net`, the `<link rel="canonical">`
tags are already correct; otherwise update them in each page's `<head>`,
plus `sitemap.xml`, `robots.txt`, and `_redirects`.
`_redirects` (Netlify format) 301s the apex domain to www; on other hosts,
set up the same redirect at the server level so the site isn't crawlable
on two hostnames.

Optional polish for the owner: add the office's map coordinates
(`"geo": { "@type": "GeoCoordinates", ... }`, matching the Google Business
Profile pin) to the LocalBusiness JSON-LD in `index.html` — omitted because
coordinates shouldn't be guessed.

## The contact form

The form posts natively to **Netlify Forms** — `name="estimate"`,
`data-netlify="true"`, a hidden `form-name` input, and a honeypot field named
`company-website`. It needs no JavaScript, and on success Netlify redirects to
`thank-you.html`. After the first deploy, turn on form notifications in the
Netlify dashboard (Forms → Settings → Form notifications) so submissions are
emailed to `unitedtermitellc@comcast.net`.

**Not deploying to Netlify?** Replace the form's attributes with a
[Formspree](https://formspree.io) endpoint — `action="https://formspree.io/f/YOUR_ID"
method="POST"` — and delete `data-netlify`, `netlify-honeypot`, and the hidden
`form-name` input. Keep the honeypot paragraph either way.

## Fonts

Archivo and Inter are **self-hosted** from `fonts/` (latin subset, variable
weight, woff2). No third-party request, nothing render-blocking off-origin, and
no visitor IP sent to Google. If you change the type, replace the woff2 files
and the two `@font-face` blocks at the top of `css/styles.css`.

## Hardening & options

- `_headers` sets security and caching headers on Netlify. On Apache/nginx,
  replicate: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`,
  `Referrer-Policy: strict-origin-when-cross-origin`, and long `Cache-Control`
  for `/images`, `/css`, `/js`.
- **Analytics:** none included, deliberately — the old site's Facebook pixel
  was not carried over. Add a privacy-respecting option (e.g. Plausible,
  GoatCounter) or re-add the pixel only with a cookie notice.
- **Header/footer duplication** across the 7 pages is deliberate: no build
  step means anyone can edit the site with a text editor. If it changes often,
  adopt a templating build (Eleventy) later.

## Deliberately not done (and why)

- **`streetAddress` in the LocalBusiness schema.** The old site never published
  a street address — only "Manchester, NJ 08759". Inventing one would be worse
  than omitting it. If the business is willing to publish its street address,
  add `"streetAddress": "..."` to the `PostalAddress` in `index.html` and
  `contact.html`, and to the Google Business Profile so the NAP matches.
- **`AggregateRating` / `Review` markup.** Google's structured-data policy
  excludes *self-serving* reviews: ratings a business collects and displays
  about itself are not eligible for star rich results, and marking them up can
  draw a manual action. The legitimate route to stars in local search is the
  Google Business Profile, where reviews live on Google's side. The four
  testimonials on `reviews.html` also have no verifiable rating source — they
  came from the old site as quoted text.
- **`geo` coordinates** in the LocalBusiness schema: should match the Google
  Business Profile pin exactly, so the owner should supply them.

## Things that will bite you if you change them

- **Nav breakpoint (1200px).** The seven links need ~1155px beside the logo and
  phone button; the container maxes out at 1180px. Below 1200px the menu
  collapses to the hamburger. If you add a nav item or lengthen a label,
  re-check that width or the labels will wrap into two ragged lines.
- **`.photo--native`.** The company's own job photos are 320–370px originals.
  This class holds them at intrinsic width so they stay sharp. Remove it and
  they get stretched to ~500px and look soft.
- **CTA band photo is opt-in.** `.cta-band` shows a photo only when a page sets
  `--cta-img`; the gradient covers ~90% of it, so most pages skip the download.
- **Mobile menu height** is measured in `js/main.js` (`fitNav`) because the
  topbar wraps at some widths — a fixed CSS height leaves links off-screen on
  landscape phones.
- Hero background photos are only used where the source is ≥960px wide.

## Notes

- Google Fonts (Archivo + Inter) load from the web; the site falls back to
  system fonts offline.
- The real job photos from the old site are small (320px wide). If higher-
  resolution originals exist (truck, techs, crawl space), drop them into
  `images/` with the same filenames for a sharper look.
- Facts used on the site (licenses, hours, certifications, service promises)
  all come from the old site's content. Verify the certification badge strip
  (`images/badges.jpg`) is still current before launch.
