# Project Context: Jos's Jungle Tours Website

This document captures the background, decisions, and reasoning behind this project.
It's meant for both AI coding assistants (e.g. GitHub Copilot) and future human
volunteers who help maintain this site. Read this before making changes.

## The Client & Purpose

**Jos** is a local jungle trekking guide based in a small village near the jungle
in Sumatra, Indonesia. He has no technical background whatsoever. Previously he
relied on approaching tourists in person (e.g. at bus stations) to sell tours, but
this is becoming less effective as tourists increasingly pre-book tours online
(e.g. via GetYourGuide) before arriving.

**Goal of this website:** give Jos an online presence so tourists can discover
him and reach out *before* arriving, mainly via WhatsApp and Instagram. This is a
pure information/marketing site — **no booking system**, no backend, no payment
processing. Just: inform, build trust, drive contact via WhatsApp/Instagram.

## Who's Building/Maintaining This

- **Original developer:** an experienced software engineer (Python/FastAPI/JS/React/
  Azure/AWS background) building this as a favor, with the explicit intent to hand
  it off completely and not be involved long-term.
- **Future maintainers:** random volunteers with "basic" IT affinity that Jos
  will informally ask for help later (e.g. "can you update my prices?"). They are
  **not** necessarily professional developers. This heavily influenced every
  technical decision below.

## Core Constraints (Priority Order)

1. **Near-zero cost.** Jos has very little money. Hosting must be free or
   extremely cheap. The only accepted recurring cost is a domain (~€10-15/year),
   and even that is an open decision (see "Open Decisions" below).
2. **Maintainability by non-expert volunteers.** No framework/tooling that could
   disappear, require complex setup, or gatekeep contributions behind niche
   knowledge. Prefer boring, stable, widely-known technology.

## Key Technical Decisions & Why

### Single static HTML file, no framework
- Considered: Hugo (static site generator), React/SPA framework, WordPress, Wix.
- **Rejected Hugo/React/build-tool approaches** because they require a build step
  (Node.js, static site generator installed, versions to keep compatible). A future
  volunteer should be able to open `index.html`, edit text, save, done — no
  "why won't this build" debugging required years from now.
- **Rejected WordPress/Wix** due to ongoing hosting costs/plugin maintenance and
  vendor lock-in, conflicting with the near-zero-cost constraint.
- **Considered but declined for now:** splitting HTML into includes loaded via
  `fetch()` at runtime. This avoids a build step but breaks local testing via
  double-click (file:// CORS restrictions) — you'd need a local server just to
  preview changes, adding friction for non-technical volunteers. Revisit only if
  the single-file HTML genuinely becomes unmanageable (it's currently ~300 lines).
- **Conclusion:** one `index.html`, clearly commented per section
  (`<!-- ===== SECTION NAME ===== -->`), so a volunteer can scroll to the relevant
  part and edit directly.

### Shared markup: client-side DOM injection
- Repeated markup on the tour detail pages, such as the contact CTA, is kept in a
  shared vanilla JavaScript file and inserted into a small placeholder element.
  For example, tour pages use `<div class="cta-placeholder"></div>` and load
  `../js/cta.js`.
- This is not a `fetch()`-based HTML include. Loading a normal local script and
  writing to the DOM also works when an HTML file is opened directly via
  `file://`; GitHub Pages serves the same files normally over HTTP.
- The injected markup stays in the regular document (no Shadow DOM), so the
  existing CSS classes continue to work. Page-specific differences are passed
  through simple `data-*` attributes on the placeholder.
- The shared footer uses `<div class="footer-placeholder"></div>` and loads
  `js/footer.js` from root pages or `../js/footer.js` from tour pages. The script
  injects the footer and keeps the copyright year current in one place.
- The trade-off is that the shared markup is not available when JavaScript is
  disabled. This is acceptable here because the site already uses JavaScript for
  the automatically updated footer year.

### Plain CSS, not Tailwind
- Tailwind (used properly) needs a build step (PostCSS/CLI) to purge unused classes
  — again conflicts with "no build tooling." The no-build CDN version of Tailwind
  is explicitly not recommended for production and adds runtime overhead.
- Tailwind's utility class soup (`flex items-center gap-4 md:px-8`) is not
  self-explanatory to someone without Tailwind experience. Plain CSS with semantic
  class names (`.tour-card`, `.price-tag`) is readable without framework knowledge.
- CSS lives in a separate file (`css/style.css`), not inline, for clear separation
  of content vs. styling.
- All colors/spacing are defined as CSS variables at the top of `style.css`
  (`:root { --color-primary: ...; }`) so visual tweaks happen in one place.

### Hosting: GitHub Pages
- Free, no server/backend needed, matches "one GitHub login" simplicity the
  developer wanted (single place to manage code + hosting).
- Alternatives considered: Cloudflare Pages, Netlify (also free, also valid) —
  GitHub Pages chosen mainly for familiarity/simplicity of having everything
  under one GitHub account.

### Multi-language: English + Indonesian (dropdown, extensible)
- English is the primary language (target audience: international tourists).
  Indonesian added via AI-assisted translation of the English copy.
- Implementation plan: a language `<select>` dropdown in the nav (already scaffolded
  in HTML, **not yet functional**), with text content stored in separate JSON files
  (e.g. `lang/en.json`, `lang/id.json`) and swapped via vanilla JS — no i18n
  framework. Designed to allow adding more languages later without restructuring.
- **Status: dropdown UI exists in HTML, but the actual language-switching JS logic
  has NOT been built yet.** This is a known next step.

### Content updates: code-level, no CMS
- Jos cannot use a CMS or edit code himself. Content updates (new tour, price
  change, new photos) will be done by volunteers editing the HTML/CSS/JSON files
  directly, expected to happen every few months, not in real time.
- No CMS, no admin panel, no database — deliberately, to avoid another moving part
  that could break or need maintenance/hosting.

### Booking: none, contact only
- Booking flows were explicitly rejected as too complex for Jos to manage.
  The site only drives users to WhatsApp / Instagram for direct contact.

## Site Structure (single page, anchor-link navigation)

One `index.html` with sections linked via anchors (`#about`, `#tours`, `#gallery`,
`#contact`) — no routing, no SPA framework, just a scrollable one-pager with a
sticky nav.

1. **Hero** — full-width image, headline, WhatsApp/Instagram buttons
2. **About Jos** — photo + short bio, builds trust (tourists book a *person*)
3. **Tours** — 4 tour cards (1-day/2-day/3-day/7-day) + a comparison table below
4. **Gallery** — jungle/wildlife photos (orangutans, macaques, etc.)
5. **Contact** — WhatsApp/Instagram buttons + rough location text
6. **Footer**

### Tours section detail
- Each tour is a **flip card**: front shows image, title, price, and a 2-line
  fading preview of the description with a "Read more" button; clicking the card
  (or the button) flips it via CSS `rotateY(180deg)` to reveal the full
  description on the back, with a "Back" button to flip back.
- Implementation: pure CSS 3D transform for the flip animation
  (`.tour-card` has `perspective`, `.tour-card-inner` rotates,
  `.tour-card-front`/`.tour-card-back` use `backface-visibility: hidden`), plus
  minimal inline JS (`onclick` toggling a `.is-flipped` class) for the click
  interaction — chosen over hover-only because this needs to work on mobile/touch
  (most visitors will view this on a phone).
  - Click handling has a guard (`event.target.closest('.tour-card-flip-btn')`) so
    clicking the button doesn't double-toggle the flip state.
- Cards have a **fixed height (420px)** — this is a technical requirement for the
  flip effect (front/back must overlay exactly), not a firm design choice. Revisit
  if content length varies too much across tours.
- Real prices confirmed by the developer: €70 (1-day), €130 (2-day), €170 (3-day),
  €300 (7-day / "expedition"). These are already in the HTML.
- Tour descriptions are currently **Lorem Ipsum placeholders** (5 sentences each,
  matching the developer's stated 3-10 sentence target length) — real copy from
  Jos still needs to be written and swapped in.
- The earlier idea of a "Ask about this tour" button linking to `#contact` was
  deliberately removed — it added no value since Contact is already reachable via
  nav/scroll, and the flip-card "Read more" replaced its role in the card.
- Price is shown both **on each card** and in a **comparison table** below the
  cards (duration, price side-by-side) — intentionally redundant for users who
  want a quick at-a-glance comparison.

## Current State (as of last session)

**Done:**
- Full HTML skeleton, all 5 sections, semantic structure, commented per section.
- Full CSS with variables, base layout, responsive grid for tour cards and gallery.
- Tour cards implemented as working flip cards (front preview / back full text).
- Real pricing in place: €70 (1-day), €130 (2-day), €170 (3-day), €300 (7-day).
- **All copy is final** (written collaboratively, no more Lorem Ipsum anywhere):
  - Hero headline/subtitle
  - About Jos bio
  - All 4 tour descriptions (preview sentence + full back-of-card text)
  - Tour comparison table (now just "Tour" + "Price" columns, tour names include
    duration e.g. "1-Day Jungle Trek", so the separate Duration column was removed
    as redundant/ambiguous; table width capped at 420px and centered instead of
    spanning full section width)
  - Contact section location text ("Based in Bukit Lawang, Sumatra, Indonesia")
  - Footer (shared through `js/footer.js`; the copyright year is auto-updated via
    `new Date().getFullYear()`, so it never needs manual yearly updates)
  - Branding finalized as **"Jungle of Jos"** (used in nav logo, page title,
    meta description, and footer) — this replaced the earlier working name
    "Jos's Jungle Tours" everywhere.
- All images are placeholders: empty `src=""` with descriptive `alt` text stating
  exactly what photo should go there (e.g. `alt="PLACEHOLDER: Orangutan in the
  wild, Sumatran jungle"`) — use these alt texts as the shot list when sourcing
  photos from Jos's Instagram or elsewhere.
- Color scheme: jungle green primary + warm orange/gold accent + WhatsApp green /
  Instagram pink for their respective buttons. All adjustable via CSS variables.

**Explicitly NOT done yet / open next steps:**
1. **Language switcher has no JS logic yet** — dropdown exists in HTML but doesn't
   do anything. Needs: `lang/en.json` + `lang/id.json` content files, and vanilla
   JS to swap text content based on selection. All English copy is now final and
   ready to be translated to Indonesian and moved into this structure.
2. **Real photos** — need to source from Jos's Instagram or take new ones,
   matching the `alt` text placeholders throughout the HTML.
3. **Real WhatsApp/Instagram links** — currently `href="#"` placeholders in Hero
   and Contact sections.
4. **Visual fine-tuning** — colors, spacing, typography polish was explicitly
   deferred to "the very end" by the developer; structure was prioritized first.
   The developer noted the About section wording may still get minor edits later,
   but is usable as-is for now.
5. **Domain decision** — Jos has no domain or hosting currently and doesn't
   understand recurring costs. Still open: who registers/pays for the domain long
   term, or whether to launch on a free subdomain (e.g. GitHub Pages default
   `*.github.io` URL) initially.
6. **No task-oriented README for volunteers yet** — this document covers the
   "why" behind decisions, but a shorter "how to change a price / add a photo /
   add a language" guide was also planned and not yet written.

## Facts About Jos & The Tours (for future copy/content work)

Useful background if more copy needs to be written or adjusted later:

- Jos is 54, born and raised in Bukit Lawang — youngest of eight siblings, his
  whole family is local to the village. Two children of his own, who attend
  school in the city.
- He leads treks himself, backed by a small team of local guides.
- Speaks English (functional, not fluent — keep marketing copy about this
  understated/positive, don't oversell his fluency).
- Can also help arrange onward travel (bus or private car) to Medan, Berastagi,
  or Lake Toba — mentioned briefly in the About bio as a bonus service.
- All tours take place in the jungle around Bukit Lawang. Wildlife includes
  long-tailed macaques, Thomas leaf monkeys, pig-tailed macaques, and — the main
  draw — wild orangutans (including, rarely, dominant alpha males or mothers
  with babies; these are genuinely rare sightings, so copy intentionally avoids
  overpromising them, especially on shorter tours).
- Every tour includes a fresh jungle lunch and fruit snacks, and ends with a
  tube ride down the river back to town.
- Tours of 2 days or longer additionally include dinner and an overnight stay in
  simple jungle huts with mosquito nets.
- Tour differentiation is primarily length → more distance covered, quieter/
  deeper parts of the forest reached, and higher (but still not guaranteed)
  chances of rarer sightings on longer tours.

## Working Style / Preferences (for whoever continues this)

- The developer wants to review and approve structural/UX decisions step by step,
  not receive large chunks of generated code unprompted. Confirm scope before
  generating, explain trade-offs when there's a real decision to make, then
  implement.
- Prefers being told *why* a technical choice was made (trade-offs, alternatives
  considered), not just handed a result.
- Values keeping the tech stack boring, transparent, and free of vendor lock-in
  above almost everything except cost.