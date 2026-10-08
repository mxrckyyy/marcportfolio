# PROJECT_CONTEXT.md — Source of Truth

> Re-read this file after any OpenCode session reset, context reset, or machine
> restart before continuing work on this project. Read it together with
> `PROJECT_ARCHITECTURE.md`.

## 1. Project Identity

| Field       | Value                                                             |
| ----------- | ----------------------------------------------------------------- |
| Name        | John Marc Comeros — Web Developer Portfolio (`mxrckyyy-web-portfolio`) |
| Owner       | John Marc Comeros (also known as Marc)                            |
| Positioning | **BSIT Student · Aspiring Web Developer**                         |
| Institution | BS Information Technology (2nd Year), Asian College of Technology (ACT), Cebu City, Philippines |
| Repo        | https://github.com/mxrckyyy/marcportfolio                         |
| Live        | marcportfolio-seven.vercel.app (Vercel)                           |

Branding rules (apply to ALL copy):

- Describe Marc as a BSIT student and aspiring web developer.
- Never claim: senior / professional / full-stack / experienced developer.
- Never invent years of experience, clients, companies, statistics, or testimonials.

## 2. Tech Stack

- **React 19** + **Vite 7** (JavaScript / JSX, `type: module`)
- **Tailwind CSS v4** (`tailwindcss` + `@tailwindcss/vite` plugin — v4 architecture,
  no `tailwind.config.js`)
- **React Router v7** (`react-router-dom`) — client-side multi-page routing
- **Framer Motion 12** (`MotionConfig reducedMotion="user"` at app root)
- **Lucide React** icons
- **EmailJS** (`@emailjs/browser`) for the contact form
- Deployed to **Vercel** (SPA rewrites in `vercel.json`), GitHub for version control
- No test runner and no linter configured in `package.json`
  (scripts: `dev`, `build`, `preview` only)

## 3. Phase Status

- **Phase 1 (audit + contrast fixes): COMPLETE.**
- **Phase 2 (multi-page routing + Tailwind CSS v4 + design system): COMPLETE.**
- **Not started** (later phases): page redesigns (Hero/About/Skills/Projects/
  Resume/Contact/Footer polish), new portfolio sections, per-route SEO titles/
  meta, security audit, performance optimization, final QA.

## 4. Current Architecture (post-Phase 2)

Multi-page SPA. Seven real routes served by React Router; shared Navbar/Footer
via a layout route with `<Outlet />`.

| Route           | Page         | Content                                |
| --------------- | ------------ | -------------------------------------- |
| `/`             | `Home`       | Hero (name, positioning, tags, CTAs)   |
| `/about`        | `About`      | Bio + highlight cards                  |
| `/skills`       | `Skills`     | Badge groups + note                    |
| `/projects`     | `Projects`   | Project cards + GitHub banner          |
| `/resume`       | `Resume`     | Resume actions + education/tech/focus  |
| `/contact`      | `Contact`    | Contact cards + EmailJS form           |
| `*`             | `NotFound`   | 404 with links home/to projects        |

```
App (MotionConfig reducedMotion="user")
└── BrowserRouter
    └── Routes
        └── Route element={<Layout />}
            ├── ScrollToTop        (instant scroll on pathname change)
            ├── Skip link          (#main-content)
            ├── Navbar             (NavLink active states + mobile drawer)
            ├── motion.main key={pathname}  (subtle 0.25s fade per route)
            │   └── <Outlet /> → page
            ├── Footer
            └── BackToTop
```

### File map (post-Phase 2)

```
src/
├── components/
│   ├── layout/   Layout.jsx, Navbar.jsx, Footer.jsx, Page.jsx
│   └── ui/       Button.jsx, Card.jsx, Chip.jsx, PageHeader.jsx,
│                 ProjectCard.jsx, SocialLinks.jsx, BackToTop.jsx
├── pages/        Home, About, Skills, Projects, Resume, Contact, NotFound (.jsx)
├── data/         projects.js, skills.js, socialLinks.js   (unchanged)
├── utils/        animations.js, container.js, formStyles.js
├── App.jsx       (router config)
├── main.jsx      (unchanged)
└── index.css     (Tailwind v4 import + @theme tokens + global base)
vercel.json       (SPA rewrite: all routes → /index.html)
```

Removed in Phase 2 (superseded): `components/sections/*` (became pages),
`ui/SectionHeading.jsx` (became `ui/PageHeader.jsx`), the ~1540-line legacy
stylesheet, `Linkedin`/`Facebook` icon-map entries (confirmed unused).

## 5. Design System (Tailwind v4 `@theme` in `src/index.css`)

### Color tokens → utilities

| Token                  | Value                      | Utility examples                     |
| ---------------------- | -------------------------- | ------------------------------------ |
| `--color-background`   | `#0b0f17`                  | `bg-background`, page background     |
| `--color-foreground`   | `#f0f6fc`                  | `text-foreground` (primary text)     |
| `--color-surface`      | `#161b22`                  | `bg-surface` (cards)                 |
| `--color-surface-elevated` | `#1a202c`              | `bg-surface-elevated` (chips/tags)   |
| `--color-primary`      | `#60a5fa`                  | `bg-primary`, `text-primary`         |
| `--color-primary-hover`| `#3b82f6`                  | `hover:bg-primary-hover`             |
| `--color-primary-foreground` | `#0b0f17`            | `text-primary-foreground` (on primary) |
| `--color-primary-soft` | `rgba(96,165,250,.12)`     | `bg-primary-soft`, focus rings       |
| `--color-muted`        | `#8b949e`                  | `text-muted` (secondary text/labels) |
| `--color-foreground-strong` | `#c9d1d9`             | `text-foreground-strong` (links)     |
| `--color-border`       | `#30363d`                  | `border-border` (dividers/inputs)    |
| `--color-border-strong`| `#7d8590`                  | `border-border-strong` (interactive controls — ≥3:1 non-text contrast) |
| `--color-border-subtle`| `rgba(255,255,255,.08)`    | `border-border-subtle` (card borders)|
| `--color-success`      | `#34d399`                  | success states                       |
| `--color-warning`      | `#fbbf24`                  | warning states (token reserved)      |
| `--color-danger`       | `#f87171`                  | error states                         |

Other tokens: `--font-sans` / `--font-mono` (Fira Code → system mono fallback),
`--radius-sm/md/lg` (6/10/16px), `--container-page: 1200px` → `max-w-page`,
`--animate-bounce-soft` + `@keyframes bounce-soft`.

Theme: **dark only** — single consistent visual theme, no toggle (none existed
before Phase 2; none was added).

### Typography hierarchy (utility recipes, applied consistently)

- Display/Hero: `text-[clamp(1.75rem,5vw,3rem)] font-extrabold tracking-[-0.03em]`
- Page H1 (`PageHeader`): `text-[clamp(1.6rem,4vw,2.25rem)] font-bold tracking-[-0.02em]`
- H2 (block/card titles): `text-base font-bold` … `text-lg font-bold`
- Body: `text-base` / body-large `text-[1.05rem]`
- Small/muted: `text-sm text-muted`
- Labels: `text-sm font-semibold`
- Eyebrow/mono label: `text-xs font-mono uppercase tracking-[0.08em]`
- Nav: `text-sm font-medium` (active `font-semibold`)
- Buttons: `text-sm font-semibold`

### Container / page system

- Container: `mx-auto w-full max-w-page px-4 sm:px-6 lg:px-8`
  (single source: `src/utils/container.js` → `containerClasses`).
- Page wrapper: `components/layout/Page.jsx` = vertical padding
  `py-12 sm:py-14 md:py-20` + container. Home/Hero uses its own clamp padding.

### Component system

- **Button** (`ui/Button.jsx`): variants `primary` | `secondary` | `ghost` |
  `icon`; sizes `sm` | `md` | `lg`; `to` prop → React Router `<Link>`
  (client-side nav), `href` → anchor (auto `target=_blank` for http/mailto),
  else `<button>`. States: hover, active, focus-visible (global outline),
  `disabled` (`disabled:pointer-events-none disabled:opacity-60`).
  Min touch target 44px (`min-h-11` / `size-11`).
  - NOTE: legacy `variant="ghost"` visually equalled the bordered chip style →
    those usages are now `secondary`; `ghost` is now the low-emphasis text button.
- **Card** (`ui/Card.jsx`): `rounded-lg border border-border-subtle bg-surface`,
  optional `hover` prop (`hover:border-primary`), motion-forwarding for
  variants, padding via `className` (standard `p-6`). Used by Skills + Resume.
- **Chip** (`ui/Chip.jsx`): pill (`rounded-full bg-surface-elevated`), optional
  `hover`. Used by Resume.
- **PageHeader** (`ui/PageHeader.jsx`): `// eyebrow` + `h1` + description,
  `align="center"` option; each page has exactly one `h1`.
- **Form styles** (`utils/formStyles.js`): `labelClasses`, `inputClasses`,
  `textareaClasses`, `errorClasses`, `statusClasses.success|error`.
  Field-error pattern when needed: error `<p id="{id}-error">` + control gets
  `aria-describedby="{id}-error"` (and `aria-invalid`); Contact currently uses a
  form-level `role="status"` region instead.

## 6. Navigation Architecture

- Desktop: `NavLink` list (Home/About/Skills/Projects/Resume/Contact) + CTA
  button. Active page: accent color, `font-semibold`, animated underline
  (`after:` pseudo) **and** `aria-current="page"` (set automatically by NavLink).
- Home link uses `end` so `/` is only active at exactly `/`.
- Mobile (<768px): icon toggle (`aria-expanded`, `aria-controls="mobile-menu"`)
  opens a drawer + dim overlay; Escape closes; body scroll locks; resize ≥768px
  closes; drawer links close on click; closed links have `tabIndex={-1}`.
- Scroll-spy/IntersectionObserver removed (routing owns active state).
- Route changes: instant scroll to top + subtle main fade (Framer Motion),
  both respecting `prefers-reduced-motion`.

## 7. Responsive Strategy

- Mobile-first, Tailwind default breakpoints only: sm 640 / md 768 / lg 1024 /
  xl 1280 / 2xl 1536 (legacy one-off 900/560/480px breakpoints standardized).
- Target widths: 320, 375, 390, 430, 768, 1024, 1280, 1440+.
- Overflow safety: `min-w-0`/`minmax(0,…)` on grid children, `overflow-x: hidden`
  + `overflow-wrap: break-word` on body, wrapping flex containers everywhere.

## 8. Accessibility Baseline

- Semantic HTML; one `h1` per page; no skipped heading levels (page `h1` →
  block `h2`).
- Skip link → `main#main-content` (`tabIndex={-1}`); `main:focus` outline suppressed.
- Global `:focus-visible` = 2px `--color-primary` outline, 3px offset.
- 44px minimum touch targets; interactive borders use `border-strong` (≥3:1).
- Text contrast ≥4.5:1 (foreground 17.6:1, muted ~6.4:1, primary ~7.5:1).
- `aria-current` on active nav; labelled nav landmarks; `aria-hidden` + `tabIndex`
  drawer management; `aria-live` on form status; meaningful `alt` text.
- `prefers-reduced-motion`: global CSS kills animations/transitions; Framer
  `reducedMotion="user"`.

## 9. Content/Data Rules

- `src/data/projects.js` (2 projects), `skills.js` (4 badge groups),
  `socialLinks.js` (Email + GitHub) — single source, never duplicated in pages.
- Resume PDF: `/MarcResume.pdf`. Profile image: `/images/profile.jpg`.
- EmailJS (hard-coded in Contact): service `service_2a39b0m`,
  template `template_d8s622i`, public key `x3w2xijWKl8BvMqHt`.
- Contact: johnmarccomeros16@gmail.com · 09690487218 · Cebu City ·
  github.com/mxrckyyy.

## 10. Validation Status (end of Phase 2)

- `npm run build` ✓ (Vite 7 + Tailwind v4 plugin; CSS ~31KB gzip 6.6KB).
- SSR smoke render of all 7 routes ✓ (main/nav/footer/h1 present, no `undefined`
  output, `aria-current` on all 6 real routes, none on 404).
- `vite preview` direct-route loads `//, /about, /skills, /projects, /resume,
  /contact, /invalid-route, /deep/nested/route` → 200 + index shell ✓.
- Dev server direct loads ✓; no `tailwind.config.js` ✓; custom tokens verified
  present in emitted CSS ✓.
- No linter/tests exist in the repo (nothing to run).
- Not yet machine-verified: visual rendering in a real browser (console,
  pixel-level overflow) — do in QA phase.

## 11. Constraints Recap

- Tailwind CSS **v4 only** — never v3, never `tailwind.config.js`.
- No fake content, no unnecessary dependencies, no premature page redesigns.
- Navbar/Footer are shared — never duplicate them inside pages.
- Portfolio data lives only in `src/data/`.
