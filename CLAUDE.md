# Miami Market — Marketing Website Agent Context

> **Read the root CLAUDE.md first.** This file extends it with web-specific rules.
> Root CLAUDE.md location: `../CLAUDE.md` (or see repo wiki).

> **Submodule context:** This repo lives at `web/` inside
> `git@github.com:AndroForces/miami-market-root.git`.
> Always work inside this directory. Never edit these files from the root repo context.
> Remote: `git@github.com:babulpatel1309/miami-market-web.git`
> Branch: `main`

---

## 0. What This Repo Is

This is the **public marketing website** for Miami Market — a single-page,
server-rendered Next.js site that presents the deli's menu, hours, hot plate
specials, and location. It is a static/informational site, not a transactional
app.

**Important — this repo is a different brand context than the rest of the
monorepo.** The root `CLAUDE.md` describes the Indian-cuisine Smart Pickup
Ordering System (`backend` / `admin` / `app`). This `web` repo instead ships
the site for **Miami Market, a family-owned deli in Milford, Ohio**
(sandwiches, hot plates, drive-thru). Domain vocabulary, design tokens, and
business rules from the root file (order status flow, loyalty ledger, Stripe,
etc.) **do not apply here**. Treat this file as the source of truth for `web/`.

This site has **no auth and no payments**. It reads its marketing content
(copy, prices, hours, images, links) from the `miami-market-backend`'s public
`website-content` CMS API at request time — see §3 for the fetch pattern and
§10 for the fetch contract. It still has no database of its own and no
order/checkout flow. **There is no fallback data** — if the backend is
unreachable, pages fail to render (including at build time). See §10.

---

## 1. Stack & Versions

```
Framework:      Next.js 16.x (App Router)
Language:       TypeScript 5.x (strict mode)
UI Library:     React 19.x
Styling:        Tailwind CSS 4.x (CSS-first config via @theme in globals.css)
Fonts:          Google Fonts — Bricolage Grotesque (display) + Hanken Grotesk (body)
                loaded via <link> tags in app/layout.tsx, not next/font
Linting:        ESLint 9.x (flat config, eslint-config-next)
Hosting target: Static/SSR deploy (e.g. Vercel)
```

There is currently no test runner configured. See §9 before adding tests.

---

## 2. Project Structure

```
src/
├── app/
│   ├── layout.tsx                # <html>/<head>, metadata, Google Fonts preconnect + link
│   ├── page.tsx                  # Single page — composes all sections in order
│   ├── globals.css               # Tailwind import, @theme design tokens, keyframes
│   └── image.png                 # Favicon source (imported directly in layout.tsx)
│
├── components/
│   ├── layout/
│   │   ├── Nav.tsx                # Sticky header, nav links, phone CTA
│   │   ├── Footer.tsx             # Address, socials, copyright
│   │   └── Checker.tsx            # Decorative checkerboard divider strip
│   └── sections/                  # One component per landing-page section
│       ├── Hero.tsx
│       ├── Marquee.tsx
│       ├── About.tsx
│       ├── MenuSection.tsx        # "Deli Sandwiches" — build-your-own + hot subs
│       ├── HotPlate.tsx
│       ├── HoursSection.tsx       # Live open/closed status + weekly schedule table
│       └── VisitSection.tsx       # Map embed + directions + contact
│
├── hooks/
│   └── useOpenStatus.ts           # Client hook: computes open/closed state from Date
│
├── constants/
│   └── site.ts                    # Brand tokens, contact info, nav/social links
│
└── types/
    └── status.types.ts            # OpenStatus shape
```

`page.tsx` is intentionally a flat composition of section components in
visual order — do not introduce nested routing or additional pages unless the
site is growing beyond a single landing page.

---

## 3. Content & Data Rules

**As of the Website CMS migration, content is fetched from the backend, not
imported from constants.** Section components self-fetch via
`src/lib/cms.ts#getWebsiteContent()` — a cached loader (`fetch` with
`next: { revalidate: 300 }`) that every section calls independently. Next.js's
built-in fetch request memoization collapses these identical calls to one
real network request per render, so sections stay self-contained (§5) without
`page.tsx` fetching once and prop-drilling.

```typescript
// CORRECT — section self-fetches directly, no fallback
export default async function Hero() {
  const hero = (await getWebsiteContent()).hero;
  return <h1>{hero.heading_line1}</h1>;
}

// WRONG — never hardcode prices/copy directly inside a section component
// with no path to CMS-driven content
<span>Roast Beef — $7.50</span>

// WRONG — do not reintroduce fallback constants / try-catch swallowing.
// A CMS fetch failure should propagate and fail the render (see §10).
```

- There is no fallback data source. `src/constants/site.ts` holds only
  non-CMS static values (brand tokens, nav/social links used directly by
  `Nav.tsx`/`Footer.tsx`) — it is not a fallback for `getWebsiteContent()`.
  Do not add typed fallback constants back to this directory.
- New static, purely structural values (design tokens, anchor IDs) still
  belong in `src/constants/` as before.
- All types for CMS content live in `src/lib/cms.ts` (`WebsiteHero`,
  `WebsiteMenu`, `WebsiteHours`, etc.) and are imported with
  `import type { ... }`.

---

## 4. Design Tokens (Tailwind v4 `@theme`)

**Never hardcode brand hex colors, radii, or animation names inside a
component.** Every design token is declared once in `globals.css` under
`@theme` and consumed as a Tailwind utility class.

```css
/* app/globals.css */
@theme {
  --color-accent: #d2452a;
  --color-cream: #faf4e8;
  --color-green-dark: #143d22;
  --font-bricolage: "Bricolage Grotesque", sans-serif;
  --font-hanken: "Hanken Grotesk", system-ui, sans-serif;
  --radius-mm: 16px;
  --animate-marquee: mm-marquee 30s linear infinite;
  /* ... */
}
```

```tsx
// CORRECT
<div className="bg-cream text-green-dark rounded-mm font-bricolage">

// WRONG — arbitrary values duplicate a token that already exists
<div className="bg-[#faf4e8] text-[#143d22] rounded-[16px]">
```

**Typography convention:**
- Headings / display text: `font-bricolage font-extrabold` (Bricolage Grotesque)
- Body copy, nav, buttons: default (Hanken Grotesk is the base `font-hanken`
  applied at the page root in `page.tsx`)
- Accent price / callouts: `text-accent font-bricolage font-extrabold`

**Adding a new token:** add it to the `@theme` block once, then reference it
by Tailwind class everywhere. Never introduce a one-off color, radius, or
animation duration with an arbitrary-value bracket class if an equivalent
token already exists.

---

## 5. Component Conventions

### Sections are self-contained and presentational
Each file in `components/sections/` renders one full-width `<section id="...">`
and pulls its own content by calling `getWebsiteContent()` itself (see §3).
Sections remain prop-free from `page.tsx`'s perspective — `page.tsx` just
lists them in order, same as before the CMS migration.

```tsx
// CORRECT — self-fetches, no props from page.tsx
export default async function HotPlate() {
  const hotPlate = (await getWebsiteContent()).hot_plate;
  return <section id="hotplate">{/* ...renders hotPlate... */}</section>;
}

// WRONG — sections should not require prop drilling from page.tsx
export default function HotPlate({ items }: { items: HotPlateItem[] }) { ... }
```

**The one exception:** `HoursSection` and `VisitSection` each split into an
async server wrapper (`HoursSection.tsx` / `VisitSection.tsx`, fetches
content + structured hours + server-computed status) and a `*Client.tsx` leaf
(`"use client"`, e.g. `HoursSectionClient.tsx`) that receives that data as
props and ticks the live OPEN/CLOSED status every 60s. This is necessary
because a component can't be both `"use client"` (required for the live
interval) and `async` (required for the fetch) — no other section may take
props from its caller.

### Server vs Client Components
- Default to Server Components (no directive) — every section is now `async`
  by default so it can self-fetch from the CMS.
- Add `"use client"` only when a component needs browser state/effects —
  currently only `HoursSectionClient.tsx` and `VisitSectionClient.tsx` (via
  `useOpenStatus`) need this, via the server/client split described above.
- Keep client boundaries as small and as low in the tree as possible; don't
  mark a whole section `"use client"` if only a small piece needs it.

### Images
- Plain `<img>` tags are used intentionally for this marketing site (with
  `/* eslint-disable @next/next/no-img-element */` where required) rather than
  `next/image`, to keep asset handling simple for static marketing imagery.
  Follow this existing pattern for new images unless there's a clear LCP/perf
  reason to switch a specific image to `next/image`.
- Static images live in `public/images/` and are referenced by absolute path
  (`/images/logo.png`), not imported.
- The favicon (`app/image.png`) is the one exception — imported directly in
  `layout.tsx` so Next can generate the icon metadata.

### Anchors & navigation
- This is a single page — in-page navigation uses hash anchors (`#build`,
  `#hotplate`, `#hours`, `#visit`) matched to section `id` attributes.
- Keep `NAV_LINKS` in `constants/site.ts` in sync with actual section `id`s.
  Never add a nav link that doesn't resolve to a real section anchor.

---

## 6. Open/Closed Status Logic

`useOpenStatus` (in `src/hooks/useOpenStatus.ts`) is the single source of
truth for "is the store open right now" on the client. Never duplicate this
logic in a component. As of the CMS migration, the underlying business rule
(which days/hours each service type is open) is **data, not code** — it lives
in the backend's `WebsiteHours` table, editable from the admin panel's Hours
tab, not in a hardcoded literal here.

```typescript
// computeStatus(hours, now) reads open/close/is_closed from the structured
// hours rows passed in — it no longer hardcodes "Mon-Sat 10-20" etc.
export function computeStatus(hours: WebsiteStructuredHoursRow[], now: Date): OpenStatus { ... }

// useOpenStatus(hours, initial) seeds from a server-computed `initial` value
// (from WebsiteStatus, computed backend-side in a pinned timezone) — no more
// "return null until mounted" hydration trick, since the server already
// supplies a real value for first paint. It re-derives every 60s using the
// visitor's local clock against the same `hours` rows (an accepted
// approximation for the interval tick only; the authoritative initial value
// comes from the backend's WEBSITE_TIMEZONE-pinned calculation).
export function useOpenStatus(hours: WebsiteStructuredHoursRow[], initial: OpenStatus | null): OpenStatus | null
```

`HoursSection.tsx` / `VisitSection.tsx` (server) fetch `hours.structured` and
`hours.status` from `getWebsiteContent()` and pass them to
`HoursSectionClient.tsx` / `VisitSectionClient.tsx` (client), which call
`useOpenStatus`. If store hours change, edit them in the admin panel — the
schedule table and the OPEN/CLOSED calculation are derived from the same 21
`WebsiteHours` rows server-side, so they can no longer drift out of sync the
way the old hardcoded `computeStatus()` schedule could.

---

## 7. Animations

All keyframes and animation utility names are defined once in `globals.css`
(`@keyframes mm-*`, `--animate-*` tokens) and consumed via Tailwind's
`animate-*` classes (e.g. `animate-rise`, `animate-float`, `animate-marquee`).

- Staggered entrance delays use the pre-defined `.animate-rise-XX` utility
  classes (e.g. `animate-rise-16`, `animate-rise-27`) rather than inline
  `style={{ animationDelay }}`.
- Scroll-triggered reveals use `.animate-reveal-view` (CSS `animation-timeline:
  view()`), applied to section-level wrapper divs.
- `@media (prefers-reduced-motion: reduce)` is already handled globally —
  never add animation code that bypasses this.

---

## 8. SEO & Metadata

- Page metadata (`title`, `description`, favicon) is defined once via the
  `metadata` export in `app/layout.tsx`. Update copy there when the pitch or
  branding changes — don't add competing `<title>` tags elsewhere.
- Keep `description` accurate to what's actually on the page (menu, hours,
  location, drive-thru, beer & wine) since this is the only page search
  engines will index.

---

## 9. Testing Expectations

No test runner is currently configured in this repo. Before adding
significant new interactive logic (e.g. another stateful hook beyond
`useOpenStatus`), add a lightweight test setup (Vitest + React Testing
Library is consistent with the rest of the monorepo's Next.js stack — see
`admin/CLAUDE.md`) rather than shipping untested client logic.

At minimum, before opening a PR:

```bash
npm run lint          # ESLint — zero warnings
npx tsc --noEmit      # Type-check (no dedicated script yet; add one if missing)
npm run build         # Production build must succeed
```

**Manual checklist for any content/hours change:**
- [ ] `HoursSection` "OPEN"/"CLOSED" sign matches the actual current time for
      each day-of-week branch (Mon–Sat vs Sunday vs after-hours)
- [ ] Nav links still scroll to an existing section id
- [ ] Prices/hours edited in the admin panel appear on the site after the
      5-minute CMS revalidation window (or immediately on a fresh server
      restart in dev)
- [ ] `NAV_LINKS` / `SOCIAL_LINKS` (admin-managed) hrefs are valid, live URLs
- [ ] Site builds and renders correctly at mobile widths (sections use
      `clamp()`/`auto-fit` grids — verify they don't break on narrow screens)
- [ ] The backend is actually running and reachable at `NEXT_PUBLIC_BACKEND_URL`
      before `npm run build` / `npm run dev` — there is no fallback data, so
      every server component (including `generateMetadata` in `layout.tsx`)
      fails its render if the CMS fetch fails.

---

## 10. CMS Fetch Contract

- `src/lib/cms.ts#getWebsiteContent()` is the **only** place that calls the
  backend. Every section calls it independently; never fetch inside a loop or
  pass fetched data through more than one component boundary (the one
  documented Hours/Visit server→client split in §5 is the sole exception).
- **There is no fallback data and no try/catch around the fetch.** A CMS
  fetch failure (network error, non-2xx, malformed body) propagates and fails
  the section's render — this includes build-time static generation. Do not
  reintroduce fallback constants or swallow the error; if this behavior needs
  to change, that's a product decision, not a default to restore silently.
- **Env var:** `NEXT_PUBLIC_BACKEND_URL` (see `.env.example`) — the backend
  origin, no trailing slash, no `/api/v1` suffix (the loader appends it).
  Defaults to `http://localhost:5001` if unset.
- **Revalidation:** the loader uses `next: { revalidate: 300 }` (5 minutes).
  Admin edits are visible on the site within that window, or immediately after
  a fresh request if the Next.js cache has been cleared (e.g. a redeploy).
