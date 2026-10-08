# PROJECT_ARCHITECTURE.md — Architecture Map

> Technical architecture reference for the John Marc Comeros portfolio
> (how the portfolio is wired: routes, styling, data, deployment).
> Read together with `PROJECT_CONTEXT.md`. Re-read after any session reset.

---

## OPEN CODE SESSION RECOVERY

If the OpenCode session, terminal, or Windows environment resets:

1. Read PROJECT_CONTEXT.md.
2. Read PROJECT_ARCHITECTURE.md.
3. Read the README if necessary.
4. Inspect the relevant source files.
5. Determine the current implementation before making changes.
6. Continue from the existing architecture.
7. Do not recreate components or architecture that already exist.
8. Test the changes.
9. Update PROJECT_CONTEXT.md or PROJECT_ARCHITECTURE.md if the architecture changes.

This is mandatory for future phases.

---

## 1. Technology Stack

| Layer | Choice | Version (package.json) |
| --- | --- | --- |
| UI library | React (JSX, function components + hooks) | `^19.1.1` (lockfile 19.3.0) |
| Renderer | react-dom `createRoot` (StrictMode) | `^19.1.1` |
| Build tool | Vite | `^7.1.5` |
| React plugin | `@vitejs/plugin-react` | `^5.0.0` |
| Styling | **Tailwind CSS v4** (`@tailwindcss/vite` plugin, `@theme` tokens, no config file) | `^4.3.3` |
| Routing | **react-router-dom v7** — client-side SPA routing | `^7.18.4` |
| Animation | framer-motion (`MotionConfig reducedMotion="user"`) | `^12.23.12` |
| Icons | lucide-react | `^0.544.0` |
| Email delivery | `@emailjs/browser` | `^4.4.1` |
| State management | **None** — local `useState`/`useEffect` only | — |
| Data layer | Static JS modules in `src/data/` | — |
| Package manager | npm (`package-lock.json`) | — |
| Deployment | Vercel (SPA rewrites in `vercel.json`) | — |
| Runtime (local) | Node v24.19.0 (satisfies Vite 7: ^20.19 or ≥22.12) | — |

**Not present:** TypeScript, CSS frameworks besides Tailwind, state
libraries (Redux/Zustand), backend code, tests, linter/formatter, `.env`
files, CI config.

---

## 2. Folder Structure

```text
marcportfolio/
├── index.html                 # HTML shell, SEO/OG/Twitter meta, entry script
├── package.json               # scripts + dependencies
├── package-lock.json
├── vite.config.js             # react() + tailwindcss() plugins + rollup manualChunks
├── vercel.json                # SPA rewrites: all paths → /index.html
├── README.md
├── PORTFOLIO_CONTEXT.txt      # Original build blueprint (10-phase plan)
├── PROJECT_CONTEXT.md         # Source of truth: context, content rules, issues
├── PROJECT_ARCHITECTURE.md    # This file
├── ME.jpg                     # Unused duplicate of public/images/profile.jpg
├── .gitignore                 # node_modules, dist, dist-ssr, *.local, .DS_Store, *.log
│
├── public/                    # Static files copied verbatim to dist/
│   ├── favicon.svg            # "JM" monogram favicon (accent #4f8cff — out of sync, known issue)
│   ├── MarcResume.pdf         # Downloadable resume (linked by Resume page)
│   └── images/
│       └── profile.jpg        # Hero avatar + og:image (1536×2048, 52 KB)
│
├── src/
│   ├── main.jsx               # createRoot().render(<StrictMode><App/>), imports index.css
│   ├── App.jsx                # MotionConfig → BrowserRouter → Routes → Layout
│   ├── index.css              # @import "tailwindcss" + @theme tokens + @layer base (124 lines)
│   ├── assets/
│   │   └── MarcResume.pdf     # Unused duplicate of public/MarcResume.pdf
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.jsx     # Shared shell: ScrollToTop, skip link, Navbar, <Outlet/>, Footer, BackToTop
│   │   │   ├── Navbar.jsx     # NavLink desktop list + mobile drawer
│   │   │   ├── Footer.jsx     # Social links + copyright + back-to-top button
│   │   │   └── Page.jsx       # Page shell: vertical padding + container
│   │   └── ui/
│   │       ├── Button.jsx     # Polymorphic Link/anchor/button
│   │       ├── Card.jsx       # Motion-forwarding surface card
│   │       ├── Chip.jsx       # Pill tag
│   │       ├── PageHeader.jsx # Eyebrow + h1 + description (one h1 per page)
│   │       ├── ProjectCard.jsx
│   │       ├── SocialLinks.jsx
│   │       └── BackToTop.jsx  # Floating scroll-to-top (AnimatePresence)
│   ├── pages/                 # Home, About, Skills, Projects, Resume, Contact, NotFound
│   ├── data/                  # projects.js, skills.js, socialLinks.js
│   └── utils/                 # animations.js, container.js, formStyles.js
│
└── dist/                      # Build output (gitignored)
```

Removed in Phase 2: `src/components/sections/*` (became `src/pages/`),
`ui/SectionHeading.jsx` (became `ui/PageHeader.jsx`), the 1540-line legacy
stylesheet.

---

## 3. Application Entry Point

1. `index.html` → `<div id="root">` + `<script type="module" src="/src/main.jsx">`
2. `src/main.jsx` → `createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)` and imports `./index.css`
3. `src/App.jsx` → `<MotionConfig reducedMotion="user">` wraps
   `<BrowserRouter>` → `<Routes>` → layout `<Route element={<Layout />}>`
   (Navbar + `<Outlet />` + Footer) with the seven page routes (§4).

No lazy loading / code splitting at the component level; splitting happens
only through Vite `manualChunks` (§15).

---

## 4. Routing & Runtime Behavior

**Multi-page SPA** — react-router-dom v7; no server-side routing.

### Routing table

| Path | Component | Notes |
| --- | --- | --- |
| `/` (index) | Home | Hero only; `end` on its NavLink |
| `/about` | About | |
| `/skills` | Skills | |
| `/projects` | Projects | |
| `/resume` | Resume | `/MarcResume.pdf` download/view |
| `/contact` | Contact | EmailJS form |
| `*` | NotFound | Any unknown path → 404 |

### Runtime behavior

- **Navigation**: all internal links go through React Router (`Link`/`NavLink`
  via `Button` `to` prop) — no full-page reloads. Back/forward works through
  the History API.
- **Scroll**: `ScrollToTop` (inside Layout) resets to top instantly on pathname
  change; skip link still jumps to `#main-content`.
- **Transitions**: `motion.main key={pathname}` gives a subtle 0.25s fade per
  page; `MotionConfig reducedMotion="user"` + global reduced-motion CSS disable
  animation for users who ask for it.
- **Active state**: `NavLink` computes it from the URL (with `end` for `/`) and
  sets `aria-current="page"` automatically.
- **Direct URL loads**: Vercel rewrite serves `index.html` for every path, so
  `/about` etc. work when pasted/bookmarked.
- **Authentication**: none anywhere.

---

## 5. Component Architecture

**Conventions**

- Function components, one component per file, `export default`.
- Styling is **Tailwind utility classes in JSX** (see §7 Styling Rules) — no
  BEM class names, no CSS Modules, no styled-components. Shared class strings
  live in `src/utils/` (`container.js`, `formStyles.js`).
- Animation is opt-in per component via framer-motion `variants`; shared
  variants live in `src/utils/animations.js`.
- Icons come from `lucide-react` and are always `aria-hidden="true"` when
  decorative.
- Data arrives via props (from `src/data/` or module-local page constants).

**Layer diagram**

```text
App (MotionConfig)
└── BrowserRouter → Routes → Layout
    ├── Navbar        → Button, react-router NavLink, lucide Menu/X
    ├── <Outlet/> → matched page:
    │   ├── Home      → Button, SocialLinks, Link, animations, container
    │   ├── About     → Page, PageHeader, local highlights + lucide icons
    │   ├── Skills    → Page, PageHeader, Card, data/skills, animations
    │   ├── Projects  → Page, PageHeader, ProjectCard, Button, data/projects
    │   ├── Resume    → Page, PageHeader, Button, Card, Chip, animations
    │   ├── Contact   → Page, PageHeader, Button, formStyles, @emailjs/browser
    │   └── NotFound  → Page, Button
    ├── Footer        → SocialLinks, lucide ArrowUp (own scroll-to-top)
    ├── BackToTop     → framer-motion AnimatePresence (floating)
    └── ScrollToTop    → react-router useLocation (route scroll reset)
```

**UI primitives**

| Component | API |
| --- | --- |
| `Button({ children, to, href, variant='primary', size='md', type='button', className, ...rest })` | `to` → React Router `<Link>`; `href` → `<a>` (auto `target="_blank" rel="noreferrer noopener"` for `http*`/`mailto:*`); otherwise `<button>`. Variants: `primary`, `secondary`, `ghost`, `icon`; sizes `sm`/`md`/`lg`. CSS hover/active scale (no motion). |
| `Card({ children, hover, className, ...rest })` | Motion-forwarding surface card; optional hover border. |
| `Chip({ children, hover, className })` | Pill for tags/skills. |
| `PageHeader({ eyebrow, title, description, align='left' })` | `motion.header` with `fadeUp` entrance; the page's single `h1`. |
| `ProjectCard({ project })` | Data-driven card; expects the project schema documented in `PROJECT_CONTEXT.md` §11. |
| `SocialLinks({ variant='default' \| 'compact' })` | Maps `data/socialLinks.js` (Email, GitHub). |
| `Page({ children, className })` | Page shell: `py-12 sm:py-14 md:py-20` + container. |
| `BackToTop()` | Floating button, visible after `scrollY > 0.8 × innerHeight`. |

---

## 6. Styling Architecture

**System:** Tailwind CSS v4 through the `@tailwindcss/vite` plugin. One global
stylesheet, `src/index.css` (124 lines), imported once by `src/main.jsx`.
No `tailwind.config.js`, no Tailwind v3, no CSS preprocessors, no CSS
frameworks besides Tailwind.

**File structure:**

```text
src/index.css
├── @import "tailwindcss"      # v4 engine (no config file — zero-config)
├── @theme { … }               # semantic design tokens → generate utilities
└── @layer base                # html/body, ::selection, :focus-visible,
                               # scrollbar (dark), prefers-reduced-motion
```

**Authoritative design-token table:** `PROJECT_CONTEXT.md` §8 (colors, fonts,
radii, container width, animation tokens → utility mapping, typography
hierarchy, component system).

**Breakpoints:** Tailwind defaults only — sm 640 / md 768 / lg 1024 / xl 1280 /
2xl 1536. No one-off breakpoints.

**Custom CSS boundary:** allowed only for `@theme` tokens, `@layer base`
element styles, scrollbar, selection, focus-visible, and reduced-motion
overrides. Everything else is utilities in JSX (avoid `@apply` and inline
styles for normal UI).

**States:** transitions via Tailwind (`transition`, `duration-200`,
`hover:`/`active:`/`focus-visible:`/`disabled:` variants); interactive borders
use `border-border-strong`.

**Theme:** dark-only — no light-mode utilities or `prefers-color-scheme` rules.

---

## 7. Styling Rules (govern all phases)

> **Tailwind CSS v4 is the primary styling system.** Use Tailwind utilities for
> layout, spacing, typography, colors, responsive behavior, states, borders, and
> sizing. Do not introduce Tailwind v3 configuration. Do not create
> `tailwind.config.js`. Use custom CSS only when Tailwind cannot reasonably
> handle the requirement or for global design tokens and browser-level behavior
> (`@theme` tokens, `@layer base` element styles, scrollbar, selection,
> focus-visible, reduced-motion).

- Design tokens live in `@theme` inside `src/index.css` with semantic names
  (background, foreground, surface, surface-elevated, primary, primary-hover,
  primary-foreground, muted, border, border-strong, success, warning, danger).
- Breakpoints: Tailwind defaults only (sm 640 / md 768 / lg 1024 / xl 1280 /
  2xl 1536). No one-off breakpoints.
- Container: `mx-auto w-full max-w-page px-4 sm:px-6 lg:px-8` — single source
  in `src/utils/container.js`.
- Avoid `@apply` and inline styles for normal UI. Keep conflicting utility
  classes out of one `className` (use mutually exclusive conditional branches
  or responsive variants).
- Component CSS lives in JSX utilities, not in `index.css`.

---

## 8. Asset Architecture

| Kind | Mechanism |
| --- | --- |
| Static files | `public/` → served at site root (`/images/profile.jpg`, `/MarcResume.pdf`, `/favicon.svg`) |
| Referenced in JSX | Plain string paths (`src="/images/profile.jpg"`) — not imported, so not hashed/processed by Vite |
| Resume | `href="/MarcResume.pdf"` with `download` attribute (Resume page) |
| Meta images | `og:image` / `twitter:image` → `/images/profile.jpg` (relative URL — works on Vercel, is invalid for some crawlers without an absolute URL) |
| Skills badges | Remote `https://img.shields.io/...` URLs from `data/skills.js` (21 images, `loading="lazy"` on render) |
| Icons | Bundled `lucide-react` components |
| Unused | `ME.jpg` (root), `src/assets/MarcResume.pdf` |

No image optimization pipeline, no `srcset`/`sizes`, no WebP/AVIF conversion.

---

## 9. Project Data Architecture

Static data modules, imported directly by components (no fetching, no CMS).

```text
src/data/projects.js
  export const githubProfile = 'https://github.com/mxrckyyy'
  export const projects = [ { id, title, category, type, description,
      technologies[], features[], demo, github, featured }, … ]   // 2 entries

src/data/skills.js
  export const skills = [ { category, badges: [{ name, src }] } ]  // 4 groups,
                                                                   // 21 remote badge URLs

src/data/socialLinks.js
  export const socialLinks = [ { id, label, ariaLabel, handle, url,
      icon, external } ]                                          // 2 entries: Email, GitHub
```

**Hardcoded-in-component data (not yet centralized):** `Home.techTags`,
`About.highlights`, `Navbar.navLinks`, `Resume.technicalHighlights`,
`Resume.focusAreas`, `Contact.contactCards`. These duplicate knowledge that
also lives in `data/`.

---

## 10. Contact / Form Architecture

```text
pages/Contact.jsx
  state: formData { name, email, subject, message }, status, isSending
  handleChange  → controlled inputs, clears status
  handleSubmit  → preventDefault
                  1. manual required-field check (name, email, message)
                  2. regex email check
                  3. subject defaults to 'Portfolio inquiry'
                  4. emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY)
                  5. success → reset form + success status
                     failure → error status with fallback email address
  UI: <motion.form noValidate> with labels, role="status" aria-live="polite"
```

- Validation: manual, no schema library.
- Delivery: EmailJS (client-side only; **configuration values are hardcoded in
  `src/pages/Contact.jsx` (lines ~104-106)** — treat them as sensitive, do not
  copy them into documentation, and consider moving them to Vite env vars
  later).
- Alternative contact paths: `mailto:` and `tel:` links in `contactCards`.
- No spam protection, no server, no persistence.

---

## 11. Animation Architecture

**Library:** framer-motion, always honoring `MotionConfig reducedMotion="user"`
in `App.jsx`, plus a CSS `@media (prefers-reduced-motion: reduce)` override.

**Shared variants — `src/utils/animations.js`:**

| Export | Purpose |
| --- | --- |
| `viewportOnce` | `{ once: true, margin: '-50px' }` — run `whileInView` once |
| `fadeUp` | opacity 0→1, y 20→0, 0.5s (used by `PageHeader`) |
| `staggerContainer` | parent stagger 0.08s, delayChildren 0.05s |
| `staggerItem` | opacity/y 16px, 0.4s |
| `staggerGrid` | grid stagger 0.1s |
| `staggerCard` | card entrance y 24px + nested stagger (used by `ProjectCard`) |

**Usage map**

- Home: entrance sequence, avatar float loop (4.5s), status-dot pulse (1.8s).
- Pages (Skills/Projects/Resume/Contact): content blocks use
  `initial="hidden" whileInView="visible"`.
- Route change: `motion.main key={pathname}` — 0.25s fade.
- Cards/social links: `whileHover` y −2/−4px; `BackToTop` `whileTap` 0.95.
- Buttons/Chips: CSS-only hover scale/translate (no motion).
- `BackToTop`: `AnimatePresence` mount/unmount.
- CSS-only animation: `--animate-bounce-soft` keyframes (Home scroll-down link).

---

## 12. Deployment Architecture

| Item | Value |
| --- | --- |
| Provider | Vercel |
| Live URL | https://marcportfolio-seven.vercel.app (verified live) |
| Config file | **`vercel.json`** — SPA rewrites: all paths → `/index.html` (deep links work on refresh) |
| Framework preset | Vite |
| Build command | `npm run build` (`vite build`) |
| Output directory | `dist` |
| Install command | `npm install` / `npm ci` |
| Dev command | `npm run dev` |
| Node requirement | Vite 7 wants ^20.19 or ≥22.12 — local machine has **v24.19.0** (satisfied) |
| Git | repo `https://github.com/mxrckyyy/marcportfolio.git`, branch **master**, tracks `origin/master` (remote also has a `main` branch) |
| `.gitignore` | `node_modules`, `dist`, `dist-ssr`, `*.local`, `.DS_Store`, `*.log` |
| Environment variables | **None configured** — no `.env*` files in the repo, no `import.meta.env` usage |

Do not change deployment settings without explicit instruction.

---

## 13. External Services

| Service | Used by | Purpose |
| --- | --- | --- |
| EmailJS (`@emailjs/browser`) | `pages/Contact.jsx` | Sends the contact form to Marc's inbox (config hardcoded in source) |
| img.shields.io | `data/skills.js` | Skill badge images (21 remote requests, lazy-loaded) |
| Vercel | hosting | Deployment + HTTPS + CDN |
| GitHub | repo + Projects links | Source control, profile link |
| lucide.dev icons (bundled) | all components | Icon set |

Not used: analytics, auth, CMS, CDN font services.

---

## 14. Environment Variables

- None exist. `.gitignore` covers `*.local` (Vite's `.env.local` pattern), but
  no env files have been created.
- If env vars are introduced later, use Vite's `import.meta.env.VITE_*`
  convention and keep secrets out of the repository (note: anything shipped to
  the browser is public by definition — EmailJS public keys belong on the
  client, private keys do not).

---

## 15. Important Dependencies

**Runtime**

| Package | Why it exists | Notes |
| --- | --- | --- |
| `react` / `react-dom` 19 | UI | Core |
| `react-router-dom` 7 | Multi-page routing (Layout route, NavLink, Link) | All internal navigation |
| `framer-motion` 12 | Entrances, hover, AnimatePresence | Largest non-React chunk (~127 KB / 41.7 KB gzip) |
| `lucide-react` 0.544 | Icons | Tree-shaken into `icons` chunk |
| `@emailjs/browser` 4 | Contact form delivery | Only used by Contact page |

**Dev**

| Package | Why |
| --- | --- |
| `vite` 7 | Dev server + production build |
| `@vitejs/plugin-react` 5 | JSX + Fast Refresh |
| `tailwindcss` + `@tailwindcss/vite` 4 | Utility CSS engine (v4, config-free) |

**Build optimization — `vite.config.js`:** plugins run in order
`[react(), tailwindcss()]`; `build.rollupOptions.output.manualChunks` splits
`node_modules` into `react` (react + scheduler), `motion` (framer-motion,
motion-dom, motion-*), `icons` (lucide-react), and `vendor` (everything else).
Preserve this when editing the config.

---

## 16. Development Workflow

```text
npm ci           # install exact deps from package-lock.json
npm run dev      # dev server → http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the production build locally
```

There is **no** lint, format, test, or typecheck script. Before declaring any
change complete:

1. `npm run build` must succeed.
2. `npm run dev` + manual check of the affected page (desktop ≥1024px, tablet
   ~768px, mobile ≤480px).
3. Verify keyboard navigation, focus-visible outlines, and reduced-motion
   behavior are still intact.
4. Update `PROJECT_CONTEXT.md` / `PROJECT_ARCHITECTURE.md` if structure,
   dependencies, routes, or design tokens changed.

---

## 17. Change Log

### Phase 1 (docs-only audit — commit `f45d3eb`)

- Created `PROJECT_CONTEXT.md` and `PROJECT_ARCHITECTURE.md` (audit of the
  original single-page hash-anchor app; the per-component analysis is
  preserved in git history).
- No source file, styling, content, or configuration was modified; no new
  dependencies.

### Phase 2 (multi-page routing + Tailwind CSS v4 — commit `7d65cb9`)

- Added `react-router-dom` v7: `App.jsx` = `MotionConfig → BrowserRouter →
  Routes → Layout` route; seven pages (`/`, `/about`, `/skills`, `/projects`,
  `/resume`, `/contact`, `*` NotFound).
- Shared `Layout` (Navbar + `<Outlet />` + Footer + `ScrollToTop` + skip link +
  `BackToTop`), `Page` shell, `PageHeader` (replaced `SectionHeading`).
- Replaced the ~1540-line plain-CSS stylesheet with **Tailwind CSS v4**
  (`@tailwindcss/vite`, `@theme` tokens, `@layer base`); no
  `tailwind.config.js`.
- Removed `components/sections/*` (became `pages/`) and dead
  `Linkedin`/`Facebook` icon-map entries.
- New/extended UI: `Card`, `Chip`, `PageHeader`; `Button` gained
  `secondary`/`icon` variants, sizes, and `to` (router Link) support; new
  `utils/container.js` and `utils/formStyles.js`.
- Added `vercel.json` SPA rewrites so deep links work on refresh.
- Validated: `npm run build` ✓, SSR smoke render of all 7 routes ✓,
  `vite preview` + dev-server direct-route loads ✓.
