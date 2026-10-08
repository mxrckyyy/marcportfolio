# PROJECT_ARCHITECTURE.md

Technical architecture reference for the John Marc Comeros portfolio.
Read together with `PROJECT_CONTEXT.md`.

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

## Technology Stack

| Layer | Choice | Version (lockfile) |
| --- | --- | --- |
| UI library | React (JSX, function components + hooks) | 19.3.0 |
| Renderer | react-dom `createRoot` (StrictMode) | 19.3.0 |
| Build tool | Vite | 7.3.6 |
| React plugin | `@vitejs/plugin-react` | 5.2.0 |
| Styling | Plain CSS (single global stylesheet + CSS custom properties) | — |
| Animation | framer-motion | 12.43.0 |
| Icons | lucide-react | 0.544.0 |
| Email delivery | `@emailjs/browser` | 4.4.1 |
| Routing | **None** — hash anchors on a single page | — |
| State management | **None** — local `useState`/`useEffect` only | — |
| Data layer | Static JS modules in `src/data/` | — |
| Package manager | npm (`package-lock.json`) | npm 10.8.2 |
| Deployment | Vercel (Vite preset, no `vercel.json`) | — |
| Runtime (local) | Node 20.18.0 — below Vite's required 20.19+ (warning only) | — |

**Not present:** TypeScript, Tailwind/other CSS frameworks, router, Redux/Zustand, backend code, tests, linter/formatter, `.env` files, CI config.

---

## Folder Structure

```text
marcportfolio/
├── index.html                 # HTML shell, SEO/OG/Twitter meta, entry script
├── package.json               # scripts + dependencies
├── package-lock.json
├── vite.config.js             # React plugin + rollup manualChunks
├── README.md
├── PORTFOLIO_CONTEXT.txt      # Original build blueprint (10-phase plan)
├── PROJECT_CONTEXT.md         # NEW — project context & issues (this phase)
├── PROJECT_ARCHITECTURE.md    # NEW — architecture reference (this phase)
├── ME.jpg                     # Unused duplicate of public/images/profile.jpg
├── .gitignore                 # node_modules, dist, dist-ssr, *.local, .DS_Store, *.log
│
├── public/                    # Static files copied verbatim to dist/
│   ├── favicon.svg            # "JM" monogram favicon
│   ├── MarcResume.pdf         # Downloadable resume (linked by Resume section)
│   └── images/
│       └── profile.jpg        # Hero avatar + og:image (1536×2048, 52 KB)
│
├── src/
│   ├── main.jsx               # createRoot().render(<StrictMode><App/>)
│   ├── App.jsx                # Section composition inside MotionConfig
│   ├── index.css              # THE design system (1540 lines, 12 sections)
│   ├── assets/
│   │   └── MarcResume.pdf     # Unused duplicate of public/MarcResume.pdf
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Resume.jsx
│   │   │   └── Contact.jsx
│   │   └── ui/
│   │       ├── BackToTop.jsx
│   │       ├── Button.jsx
│   │       ├── ProjectCard.jsx
│   │       ├── SectionHeading.jsx
│   │       └── SocialLinks.jsx
│   ├── data/
│   │   ├── projects.js        # projects[] + githubProfile
│   │   ├── skills.js          # skills[] (badge image URLs)
│   │   └── socialLinks.js     # socialLinks[]
│   └── utils/
│       └── animations.js      # Shared framer-motion variants
│
└── dist/                      # Build output (gitignored)
```

---

## Application Entry Point

1. `index.html` → `<div id="root">` + `<script type="module" src="/src/main.jsx">`
2. `src/main.jsx` → `createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)` and imports `./index.css`
3. `src/App.jsx` → wraps everything in `<MotionConfig reducedMotion="user">` and renders:

```text
skip-link → Navbar → main#main-content → Hero, About, Skills, Projects,
Resume, Contact → Footer → BackToTop
```

No lazy loading / code splitting at the component level; splitting happens only through Vite `manualChunks`.

---

## Routing

**There is no router.** The site is a single page at `/`.

| URL | Purpose | Behavior |
| --- | --- | --- |
| `/` | Entire portfolio | Renders all sections in order |
| `/#top` | Hero (section id `top`) | Brand link target |
| `/#about` | About | Hash scroll (`scroll-behavior: smooth`, `scroll-padding-top: calc(var(--nav-height) + 1rem)`) |
| `/#skills` | Skills | same |
| `/#projects` | Projects | same |
| `/#resume` | Resume | same |
| `/#contact` | Contact | Primary CTA target |
| `/#main-content` | Skip-link target | Accessibility, `main` has `tabIndex={-1}` |

**Navigation behavior**

- Active link state: `IntersectionObserver` in `Navbar.jsx` (`rootMargin: '-40% 0px -55% 0px'`), sets `activeId` and `aria-current="true"`.
- Scroll state: `window.scrollY > 8` toggles `navbar--scrolled` (glass background + border).
- Mobile: `< 768.98px` hides `.navbar__nav`, shows hamburger → `.navbar__drawer` + `.navbar__overlay`; body scroll locked while open; closes on Escape, on resize ≥768px, on link click, or on overlay click.
- Authentication: none anywhere.

**Section → component map**

| Section id | Component | Main data |
| --- | --- | --- |
| `top` | `sections/Hero.jsx` | local `techTags` |
| `about` | `sections/About.jsx` | local `highlights` |
| `skills` | `sections/Skills.jsx` | `data/skills.js` |
| `projects` | `sections/Projects.jsx` | `data/projects.js` |
| `resume` | `sections/Resume.jsx` | local `technicalHighlights`, `focusAreas`, `/MarcResume.pdf` |
| `contact` | `sections/Contact.jsx` | local `contactCards` + EmailJS |

---

## Component Architecture

**Conventions**

- Function components with named exports avoided — every component uses `export default`.
- Styling is by **BEM-like class names** (`.project-card__title`, `.btn--primary`, `.navbar--scrolled`), never CSS Modules or styled-components.
- Animation is opt-in per component via framer-motion `variants`; shared variants live in `src/utils/animations.js`.
- Icons come from `lucide-react` and are always `aria-hidden="true"` when decorative.

**Layer diagram**

```text
App
├── layout/Navbar        → ui/Button
├── sections/Hero        → ui/Button, ui/SocialLinks, utils/animations
├── sections/About       → ui/SectionHeading
├── sections/Skills      → ui/SectionHeading, data/skills, utils/animations
├── sections/Projects    → ui/SectionHeading, ui/ProjectCard → ui/Button,
│                          data/projects, utils/animations
├── sections/Resume      → ui/SectionHeading, ui/Button, utils/animations
├── sections/Contact     → ui/SectionHeading, ui/Button, @emailjs/browser
├── layout/Footer        → ui/SocialLinks
└── ui/BackToTop         → framer-motion AnimatePresence
```

**UI primitives**

| Component | API |
| --- | --- |
| `Button({ children, href, variant='primary', type='button', className, ...rest })` | Renders `<motion.a>` when `href` is provided (auto `target="_blank" rel="noreferrer noopener"` for `http*`/`mailto:*`), otherwise `<motion.button>`. Variants: `primary`, `ghost`. |
| `SectionHeading({ eyebrow, title, description, align='left' })` | Renders `.section-heading` with `//` prefixed mono eyebrow; `whileInView` fade-up. |
| `ProjectCard({ project })` | Full card; expects the project schema documented in `PROJECT_CONTEXT.md §6`. |
| `SocialLinks({ variant='default' | 'compact' })` | Maps `data/socialLinks.js` through a local `iconMap` (Mail, Github, Linkedin, Facebook, Globe). |
| `BackToTop()` | Floating button, visible after `scrollY > 0.8 × innerHeight`. |

---

## Styling Architecture

**System:** one global stylesheet, `src/index.css` (1540 lines), imported once by `src/main.jsx`. No CSS framework, no CSS Modules, no preprocessor.

**File sections (numbered comments):**

```text
 1. Design tokens (:root custom properties)      lines 1–43
 2. Reset & base                                 46–109
 3. Accessibility (focus-visible, skip-link,
    prefers-reduced-motion)                      111–160
 4. Scrollbar (dark)                             163–187
 5. Layout (.container, .section)                190–202
 6. Buttons (.btn, .btn--primary, .btn--ghost)   204–258
 7. Section heading                              260–301
 8. Social links                                 303–349
 9. Navbar (+ mobile drawer <768px)              351–570
10. Footer                                       573–620
 9b. Back-to-top                                 624–656
11. Section styles (Hero, About, Skills,
    Projects, Resume, Contact)  ← still labelled
    "PLACEHOLDERS (refined in later phases)"     659–1510
12. Responsive token overrides                   1513–1540
```

**Design tokens (authoritative list)**

```css
/* surfaces */
--bg: #0b0f17;            /* page background */
--bg-elevated: #0d1117;   /* footer, inputs */
--surface: #161b22;       /* cards */
--surface-2: #1a202c;     /* chips, tags */

/* borders */
--border: #30363d;             /* decorative borders (low contrast) */
--border-subtle: rgba(255,255,255,0.08);
--border-strong: #7d8590;      /* interactive borders (WCAG 1.4.11) */

/* text */
--text-primary: #f0f6fc;
--text-strong: #c9d1d9;
--text-secondary: #8b949e;
--text-muted: #808b99;

/* accent */
--accent: #60a5fa;
--accent-hover: #3b82f6;
--accent-soft: rgba(96,165,250,0.12);
--on-accent: #0b0f17;

/* type */
--font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
             'Helvetica Neue', Arial, sans-serif;
--font-mono: 'Fira Code', ui-monospace, SFMono-Regular, 'SF Mono', Menlo,
             Consolas, 'Liberation Mono', monospace;   /* ⚠ Fira Code is never loaded */

/* layout */
--container-width: 1200px;
--container-padding: 1.5rem;   /* 1.25rem ≤480px */
--section-pad: 5rem;           /* 3.5rem ≤768px, 3rem ≤480px */
--nav-height: 64px;

/* shape & motion */
--radius-sm: 6px; --radius-md: 10px; --radius-lg: 16px;  /* + 999px pills */
--transition: 180ms ease;
--shadow-sm / --shadow-md
```

**Semantic (non-token) colors used inline:** status green `#34d399` (Hero dot), success text `#6ee7b7`, error text `#fca5a5` — these are outside the token table.

**Utilities:** `.container` (max-width + centering), `.section` (vertical padding), `.skip-link`, `:focus-visible` outline, reduced-motion override block.

**Dark mode:** dark-only. There are no light-mode utilities or `prefers-color-scheme` rules.

---

## Asset Architecture

| Kind | Mechanism |
| --- | --- |
| Static files | `public/` → served at site root (`/images/profile.jpg`, `/MarcResume.pdf`, `/favicon.svg`) |
| Referenced in JSX | Plain string paths (`src="/images/profile.jpg"`) — not imported, so not hashed/processed by Vite |
| Resume | `href="/MarcResume.pdf"` with `download` attribute (Resume.jsx) |
| Meta images | `og:image` / `twitter:image` → `/images/profile.jpg` (relative URL — works on Vercel, is invalid for some crawlers without an absolute URL) |
| Skills badges | Remote `https://img.shields.io/...` URLs from `data/skills.js` |
| Icons | Bundled `lucide-react` components |
| Unused | `ME.jpg` (root), `src/assets/MarcResume.pdf` |

No image optimization pipeline, no `srcset`/`sizes`, no WebP/AVIF conversion.

---

## Project Data Architecture

Static data modules, imported directly by components (no fetching, no CMS).

```text
src/data/projects.js
  export const githubProfile = 'https://github.com/mxrckyyy'
  export const projects = [ { id, title, category, type, description,
      technologies[], features[], demo, github, featured }, … ]   // 2 entries

src/data/skills.js
  export const skills = [ { category, badges: [{ name, src }] } ]  // 4 groups,
                                                                   // remote badge URLs

src/data/socialLinks.js
  export const socialLinks = [ { id, label, ariaLabel, handle, url,
      icon, external } ]                                          // 2 entries: Email, GitHub
```

**Hardcoded-in-component data (not yet centralized):** `Hero.techTags`, `About.highlights`, `Navbar.navLinks`, `Resume.technicalHighlights`, `Resume.focusAreas`, `Contact.contactCards`. These duplicate knowledge that also lives in `data/`.

---

## Contact / Form Architecture

```text
Contact.jsx
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
- Delivery: EmailJS (client-side only; **configuration values are hardcoded in `src/components/sections/Contact.jsx`** — treat them as sensitive, do not copy them into documentation, and consider moving them to Vite env vars later).
- Alternative contact paths: `mailto:` and `tel:` links in `contactCards`.
- No spam protection, no server, no persistence.

---

## Animation Architecture

**Library:** framer-motion, always honoring `MotionConfig reducedMotion="user"` in `App.jsx`, plus a CSS `@media (prefers-reduced-motion: reduce)` override.

**Shared variants — `src/utils/animations.js`:**

| Export | Purpose |
| --- | --- |
| `viewportOnce` | `{ once: true, margin: '-50px' }` — run `whileInView` once |
| `fadeUp` | opacity 0→1, y 20→0, 0.5s |
| `staggerContainer` | parent stagger 0.08s, delayChildren 0.05s |
| `staggerItem` | opacity/y 16px, 0.4s |
| `staggerGrid` | grid stagger 0.1s |
| `staggerCard` | card entrance y 24px + nested stagger |

**Usage map**

- Hero: entrance sequence, avatar float loop (4.5s), status-dot pulse (1.8s).
- Skills / Projects / Resume / Contact / SectionHeading: `initial="hidden" whileInView="visible"`.
- Buttons: `whileHover` scale 1.02, `whileTap` 0.98.
- ProjectCard / contact cards / social links: `whileHover` y −2/−4px.
- BackToTop: `AnimatePresence` mount/unmount.
- CSS-only animation: `hero-bounce` keyframes on the scroll-down link.

---

## Deployment Architecture

| Item | Value |
| --- | --- |
| Provider | Vercel |
| Live URL | https://marcportfolio-seven.vercel.app (verified live) |
| Config file | **None** — no `vercel.json`; Vercel auto-detects Vite |
| Framework preset | Vite |
| Build command | `npm run build` (`vite build`) |
| Output directory | `dist` |
| Install command | `npm install` / `npm ci` |
| Dev command | `npm run dev` |
| Node requirement | Vite 7 wants ^20.19 or ≥22.12 — **local machine has 20.18.0** (warning only today) |
| Git | repo `https://github.com/mxrckyyy/marcportfolio.git`, branch **master**, tracks `origin/master` (remote also has a `main` branch) |
| `.gitignore` | `node_modules`, `dist`, `dist-ssr`, `*.local`, `.DS_Store`, `*.log` |
| Environment variables | **None configured** — no `.env*` files in the repo, no `import.meta.env` usage |

Do not change deployment settings without explicit instruction.

---

## External Services

| Service | Used by | Purpose |
| --- | --- | --- |
| EmailJS (`@emailjs/browser`) | `Contact.jsx` | Sends the contact form to Marc's inbox (config hardcoded in source) |
| img.shields.io | `data/skills.js` | Skill badge images (~20 remote requests) |
| Vercel | hosting | Deployment + HTTPS + CDN |
| GitHub | repo + Projects links | Source control, profile link |
| lucide.dev icons (bundled) | all components | Icon set |

Not used: analytics, auth, CMS, CDN font services.

---

## Environment Variables

- None exist. `.gitignore` covers `*.local` (Vite's `.env.local` pattern), but no env files have been created.
- If env vars are introduced later, use Vite's `import.meta.env.VITE_*` convention and keep secrets out of the repository (note: anything shipped to the browser is public by definition — EmailJS public keys belong on the client, private keys do not).

---

## Important Dependencies

**Runtime**

| Package | Why it exists | Notes |
| --- | --- | --- |
| `react` / `react-dom` 19 | UI | Core |
| `framer-motion` 12 | Entrances, hover, AnimatePresence | Largest non-React chunk (~127 KB / 41.7 KB gzip) |
| `lucide-react` 0.544 | Icons | Tree-shaken into `icons` chunk |
| `@emailjs/browser` 4 | Contact form delivery | Only used by Contact section |

**Dev**

| Package | Why |
| --- | --- |
| `vite` 7 | Dev server + production build |
| `@vitejs/plugin-react` 5 | JSX + Fast Refresh |

**Build optimization — `vite.config.js`:** `build.rollupOptions.output.manualChunks` splits `node_modules` into `react` (react + scheduler), `motion` (framer-motion, motion-dom, motion-*), `icons` (lucide-react), and `vendor` (everything else). Preserve this when editing the config.

---

## Development Workflow

```text
npm ci           # install exact deps from package-lock.json
npm run dev      # dev server → http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the production build locally
```

There is **no** lint, format, test, or typecheck script. Before declaring any change complete:

1. `npm run build` must succeed.
2. `npm run dev` + manual check of the affected section (desktop ≥1024px, tablet ~768px, mobile ≤480px).
3. Verify keyboard navigation, focus-visible outlines, and reduced-motion behavior are still intact.
4. Update `PROJECT_CONTEXT.md` / `PROJECT_ARCHITECTURE.md` if structure, dependencies, routes, or design tokens changed.

---

## Design Architecture (current — for analysis only, do not redesign yet)

### Colors

| Role | Value |
| --- | --- |
| Page background | `#0b0f17` |
| Elevated background / inputs | `#0d1117` |
| Card surface | `#161b22` |
| Chip surface | `#1a202c` |
| Border (decorative) | `#30363d`, `rgba(255,255,255,0.08)` |
| Border (interactive) | `#7d8590` |
| Primary text | `#f0f6fc` |
| Secondary text | `#8b949e` / `#c9d1d9` |
| Muted text | `#808b99` |
| Accent | `#60a5fa` (hover `#3b82f6`, soft `rgba(96,165,250,0.12)`) |
| Success / error | `#34d399`/`#6ee7b7` — `#f87171`/`#fca5a5` |
| Favicon accent | `#4f8cff` (out of sync with `--accent`) |

### Typography

- Font families: system sans (body/headings), `'Fira Code'` mono (**declared but never loaded**).
- H1: `clamp(1.75rem, 5vw, 3rem)`, weight 800, line-height 1.08, tracking −0.03em.
- H2 (section): `clamp(1.6rem, 4vw, 2.25rem)`, weight 700, tracking −0.02em.
- H3 (card titles): 1.15rem–1.6rem, weight 700.
- Hero subtitle: `clamp(1.15rem, 3.5vw, 1.6rem)`, mono, accent color.
- Body: 1rem / 1.6; section descriptions 1.05rem.
- Eyebrows / labels: mono 0.7–0.85rem, uppercase, letter-spacing 0.04–0.08em.

### Spacing

- Section vertical padding: 5rem desktop / 3.5rem ≤768px / 3rem ≤480px.
- Container: 1200px max, 1.5rem horizontal padding (1.25rem ≤480px).
- Card padding: 1.5rem (featured project cards `clamp(1.5rem, 4vw, 2.25rem)`).
- Section heading bottom margin: 2.75rem.
- Grid gaps: 1.25rem (projects/skills/resume), 1.5rem (contact), `clamp(2rem, 5vw, 4rem)` (hero).
- Heading→content rhythm: 0.6 / 0.75 / 1 / 1.25 / 1.5 / 2rem increments.

### Components

| Component | Style |
| --- | --- |
| Button | min-height 44px, radius `--radius-sm`, weight 600; primary = accent fill, ghost = chip fill + `--border-strong` |
| Nav | sticky 64px, translucent → blurred on scroll; underline active indicator |
| Cards (about/skills/resume/contact/project) | `--surface`, `1px --border-subtle`, radius `--radius-md/lg`, hover → accent border + 2px lift |
| Badges/chips | pill (999px), `--surface-2`, mono 0.72–0.78rem |
| Inputs | 44px min-height, `--bg-elevated`, focus = accent border + 3px soft ring |
| Modals | none (mobile drawer + overlay instead) |
| Section layout | eyebrow → H2 → description → content grid |

### Responsive System

Breakpoints actually used: **480px, 560px, 767.98px, 768px, 900px, 1024px** (inconsistent — see Current Issues).

| Viewport | Behavior |
| --- | --- |
| ≥1024px | Skills 4 columns; container 1200px; hero 2 columns (content left, avatar right) |
| ≥768px | Horizontal nav; projects 2 columns; skills 2 columns |
| <768px | Hamburger + drawer nav; hero stacks (avatar first); projects 1 column; contact grid 1 column |
| ≤900px | About and Resume layouts collapse to 1 column |
| ≤560px | About highlights 1 column; contact name/email row splits; projects banner stacks |
| ≤480px | All buttons full-width; hero CTAs stacked; footer centered column; container padding 1.25rem |
| ≤320px | Targeted by design rules (no horizontal scroll claimed in README) |

Touch targets are consistently ≥44px (nav links, buttons, social links, icon buttons).

---

## Changes Made in Phase 1

- Created `PROJECT_CONTEXT.md`.
- Created `PROJECT_ARCHITECTURE.md`.
- Installed dependencies with `npm ci` (already required to validate the build); **no new dependencies added**.
- Ran `npm run dev` and `npm run build` for validation; `dist/` regenerated (gitignored).
- **No source file, styling, content, or configuration was modified.**
