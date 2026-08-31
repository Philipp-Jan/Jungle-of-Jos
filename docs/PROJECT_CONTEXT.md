# Project Context: Jungle of Jos Website

This document records the purpose, constraints, architectural decisions, and
current implementation status of the website. Read it before changing the
structure, shared scripts, pricing, or public tour content.

## Client and purpose

Jos is a local jungle trekking guide based in Bukit Lawang, Sumatra, Indonesia.
The website gives him an online presence so travelers can learn about the tours
and contact him before arriving, mainly through WhatsApp and Instagram.

This is an information and marketing site. It has no booking system, backend,
payment processing, database, or CMS. Booking is handled directly with Jos.

## People and constraints

The original developer is building the site as a favor and intends to hand it
over completely. Future maintenance will likely be done by volunteers with
basic IT skills rather than professional developers.

Priorities, in order:

1. Keep recurring costs close to zero.
2. Keep maintenance understandable without specialist tooling.
3. Avoid vendor lock-in and dependencies that require regular technical upkeep.

Content updates happen occasionally, not in real time. Volunteers edit the
HTML, CSS, JavaScript, and image files directly. Jos is not expected to operate
a CMS or edit code himself.

## Architecture decisions

### Static HTML, CSS, and vanilla JavaScript

The project deliberately uses ordinary HTML files, one shared CSS file, and
small vanilla JavaScript files. There is no framework, package manager, build
step, or generated output. A volunteer can open an HTML file, make a change,
and preview it directly.

Frameworks, Hugo, React, WordPress, Wix, and Tailwind were rejected because
they add build tooling, hosting/plugin maintenance, vendor dependency, or
knowledge that future volunteers should not need.

### Current multi-page structure

The original one-page concept was replaced by a static multi-page website as
the number of tours and the amount of detail grew. The current structure is:

- `index.html`: home page with hero, About, featured tours, gallery, and contact.
- `faq.html`: booking, payment, equipment, weather, and general FAQ sections.
- `tours/all-tours.html`: complete tour overview.
- `tours/3-hour.html`, `tours/1-day.html`, `tours/2-day.html`, `tours/3-day.html`,
  `tours/4-day.html`, `tours/5-day.html`, `tours/6-day.html`, `tours/7-day.html`,
  `tours/kuta-cane.html`, and `tours/orangutan-monitoring.html`: individual
  tour detail pages.

Tour cards are ordinary links to detail pages. The earlier CSS flip-card idea
was replaced because detail pages provide more room for itineraries, inclusions,
fitness information, and booking guidance.

### Shared page elements

Repeated markup is injected into placeholders by normal local scripts:

- `js/nav.js` inserts the navigation.
- `js/footer.js` inserts the footer and current copyright year.
- `js/cta.js` inserts the contact CTA on tour pages.

This is intentionally not a `fetch()`-based include. Normal scripts can write
to the DOM when a page is opened through `file://`, so local preview remains
simple. Relative paths are used so the site works on GitHub Pages project URLs,
custom domains, and local previews.

The trade-off is that shared navigation, footer, and CTA markup are absent if
JavaScript is disabled. This is accepted because the site already relies on
JavaScript for shared elements and the dynamic footer year.

### Styling

Styling is kept in `css/style.css`. Colors, spacing, layout width, and corner
radius are CSS variables near the top of the file. The visual direction uses
jungle green, a warm gold accent, WhatsApp green, and Instagram pink.

## Hosting and domain

GitHub Pages is the preferred hosting option because it is free, static, and
fits the one-account maintenance model. Cloudflare Pages and Netlify are valid
alternatives, but are not currently selected.

The domain decision is still open. Launching first on the free GitHub Pages
subdomain is acceptable. If a custom domain is purchased, long-term ownership
and payment responsibility must be agreed with Jos first.

## Tours and pricing

The home page highlights four offers: the 3-hour trek, 2-day trek, 3-day trek,
and Kuta Cane expedition. The full overview currently contains ten tour links,
including 1-day and 4- to 7-day treks plus Orangutan Monitoring.

By agreement, `tours/all-tours.html` is the current source of truth for the
public overview and prices:

Orangutan Monitoring is listed but its description and format are still marked
as unconfirmed. It must not be treated as final public content until Jos
confirms what the activity includes.

## Content and factual guidance

Jos is 54, born and raised in Bukit Lawang, and the youngest of eight siblings.
He leads treks himself with support from local guides, speaks functional
English, and can help arrange onward travel to Medan, Berastagi, or Lake Toba.

Tours take place in the jungle around Bukit Lawang. Wildlife may include
long-tailed macaques, Thomas leaf monkeys, pig-tailed macaques, and wild
orangutans. Rare sightings must never be promised, especially on shorter tours.

Tours generally include a fresh jungle lunch and fruit snacks. Tours of two or
more days additionally include dinner and an overnight stay in simple jungle
huts with mosquito nets. River tubing is included at the end of the standard
treks where the relevant page says so. Confirm exceptions with Jos before
publishing copy.

## Current implementation status

Implemented:

- `Jungle of Jos` branding across the existing pages.
- Static home page, FAQ page, tour overview, and individual tour pages.
- Responsive plain-CSS layout and link-based tour cards.
- Shared navigation, footer, and tour CTA scripts.
- Automatic copyright year in the shared footer.
- A working Instagram link in the shared tour CTA: `jungle_of_jos`.
- Image files in `images/` and `images/gallery/`, with some already referenced.

Still incomplete or requiring review:

- WhatsApp links are still `href="#"` placeholders.
- Some pages have empty image sources or placeholder alt text. Existing image
  files are mixed with unverified assets; check ownership, suitability, and
  correct placement before publication.
- FAQ answers, itinerary times, several inclusions, and some tour descriptions
  still contain `PLACEHOLDER` text and require facts from Jos.
- Prices need to be synchronized from `tours/all-tours.html` to detail pages.
- The domain and the long-term payer/owner remain undecided.
- A larger visual polish pass remains optional and should not compromise easy
  maintenance or mobile readability.

## Working style

Keep changes small and explain structural or UX trade-offs before making them.
Prefer transparent HTML and existing local patterns over new abstractions.
Do not invent prices, itineraries, inclusions, wildlife guarantees, contact
details, or translations. When a fact is missing, leave a clear placeholder or
ask for confirmation.
