# PROJECT_CONTEXT.md — Source of Truth

> Primary context file for future OpenCode sessions. Read this **before** making
> any change to the portfolio, together with `PROJECT_ARCHITECTURE.md`
> (technical architecture, routes, design system, deployment).
> Re-read after any session reset, context reset, or machine restart.

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

## 1. Project Identity

| Field | Value |
| --- | --- |
| Portfolio owner | John Marc Comeros (also known as Marc) |
| Portfolio name | Web Developer Portfolio (repo: `mxrckyyy/marcportfolio`) |
| Positioning | **BSIT Student · Aspiring Web Developer** |
| Current status | 2nd Year BS Information Technology, Asian College of Technology (ACT), Cebu City, Philippines |
| Age | 19 |
| Email | johnmarccomeros16@gmail.com |
| Phone | 09690487218 |
| GitHub | https://github.com/mxrckyyy |
| Live | https://marcportfolio-seven.vercel.app (Vercel) |
| Employment history | None — no professional work experience yet |

**Positioning rules (apply to ALL copy):**

- Describe Marc as a BSIT student and aspiring web developer.
- Do not describe the owner as a professional, senior, or full-stack developer
  unless the actual project context supports that claim. The truthful
  positioning is a student developer who is still learning and actively building.
- Never invent years of experience, clients, companies, statistics, or
  testimonials.

---

## 2. Portfolio Purpose

The portfolio exists to:

- Present John Marc Comeros professionally and honestly.
- Showcase real web development projects (GitHub + live demos).
- Demonstrate frontend and UI/UX skills.
- Show technical growth over time as a student.
- Help with future internship, entry-level, and freelance opportunities.
- Provide an easy way for people to contact him.
- Present skills honestly as a student who is still learning.

The portfolio must **not** look like a fake corporate agency website. It should
feel like a strong **student developer portfolio**: modern, clean, practical,
and truthful.

**Hard rules (from `PORTFOLIO_CONTEXT.txt`):**

- No invented work experience, clients, metrics, certifications, or skill
  percentages.
- No "Senior" / "Full-Stack" titles unless genuinely supported.
- Projects are the core proof (project-centric portfolio, because there is no
  employment history).

---

## 3. Current Skills

Only technologies that are actually used or genuinely known should be
documented here.

### Frontend

- HTML
- CSS
- JavaScript
- React
- Vite (build tool used by this portfolio and by the Gasto Buster / Inventory projects)
- Tailwind CSS (used in this portfolio since Phase 2 — project-level evidence)

### Backend / Programming

- C#

### Database

- MySQL
- Supabase

### Development Tools

- Git
- GitHub

### Design Tools

- Figma
- Canva
- Inkscape
- Adobe Photoshop (part of the owner's "Adobe tools", verified in the
  Phase 5 profile)

### What the Skills page presents (Phase 5)

The Skills page shows only the owner's verified list, organized into six
groups in `src/data/skills.js`: HTML, CSS, JavaScript · React · C# ·
MySQL, Supabase · Git, GitHub · Figma, Inkscape, Canva, Adobe Photoshop.
JavaScript carries an explicit "basic knowledge, still learning" note.
Tailwind CSS and Vite are used by the portfolio itself (see Frontend above)
but are **not** presented as personal skills.

### Needs verification (not displayed on the site)

These were previously shown as Skills-page badges and are **not** confirmed
in `PORTFOLIO_CONTEXT.txt`. Do not add them to the site without verifying
with the owner first:

- Next.js — Needs verification
- Tailwind CSS — as a personal skill (project-level evidence only)
- .NET — Needs verification
- Blazor — Needs verification
- Netlify — Needs verification
- Render — Needs verification

Do not add new technologies simply because they are popular.

---

## 4. Personal Branding

Preferred positioning:

```text
John Marc Comeros
Also known as Marc

BSIT Student · Aspiring Web Developer
```

The portfolio should communicate:

- Learning
- Building
- Practical development
- UI/UX awareness
- Responsive web development
- Curiosity
- Continuous improvement

**Branding consistency:** the Home hero shows the exact string
**"2nd-Year BSIT Student · Aspiring Web Developer"**
(`src/components/home/Hero.jsx`); `index.html` metadata uses the equivalent
"BSIT student and aspiring web developer"; the About page (post-Phase 4)
introduces Marc in first person as "a second-year BSIT student" and
"BSIT student exploring web development"; the Resume page states "BS in
Information Technology (2nd Year)". The pre-Phase-2 inconsistency
("Frontend Developer" in the old Hero) is resolved — keep all future copy on
the truthful student positioning (decide with the owner before ever changing
the title).

---

## 5. Tech Stack

- **React 19** (`^19.1.1`, lockfile 19.3.0) + **Vite 7** (`^7.1.5`)
  (JavaScript / JSX, `type: module`)
- **Tailwind CSS v4** (`tailwindcss` + `@tailwindcss/vite` `^4.3.3` — v4
  architecture, no `tailwind.config.js`)
- **React Router v7** (`react-router-dom` `^7.18.4`) — client-side multi-page
  routing
- **Framer Motion 12** (`^12.23.12`, `MotionConfig reducedMotion="user"` at
  app root)
- **Lucide React** icons (`^0.544.0`)
- **EmailJS** (`@emailjs/browser` `^4.4.1`) for the contact form
- Deployed to **Vercel** (SPA rewrites in `vercel.json`), GitHub for version
  control
- No test runner and no linter configured in `package.json`
  (scripts: `dev`, `build`, `preview` only)

---

## 6. Phase Status

- **Phase 1 (audit + contrast fixes): COMPLETE** — docs-only audit recorded in
  git history (commit `f45d3eb`).
- **Phase 2 (multi-page routing + Tailwind CSS v4 + design system): COMPLETE**
  (commit `7d65cb9`).
- **Phase 3 (Home page, Hero & personal branding): COMPLETE** — Hero +
  Selected Work in `src/components/home/` (see §7).
- **Phase 4 (About page UI/UX redesign): COMPLETE** — new section components
  in `src/components/about/` (see §7).
- **Phase 5 (Skills page UI/UX redesign): COMPLETE** — categorized text-chip
  skill groups in `data/skills.js` + redesigned `pages/Skills.jsx` (see §7).
- **Not started** (later phases): page redesigns (Projects/Resume/Contact/
  Footer polish), new portfolio sections, per-route SEO titles/
  meta, security audit, performance optimization, final QA.

---

## 7. Current Architecture (post-Phase 4)

Multi-page SPA. Seven real routes served by React Router; shared Navbar/Footer
via a layout route with `<Outlet />`.

| Route | Page | Content |
| --- | --- | --- |
| `/` | `Home` | Hero (identity, positioning, value prop, CTAs) + Selected Work teaser |
| `/about` | `About` | Intro + portrait + facts, learning journey, what I enjoy building, approach, closing CTA |
| `/skills` | `Skills` | Intro, 6 categorized skill groups (text chips), learning focus, projects CTA |
| `/projects` | `Projects` | Project cards + GitHub banner |
| `/resume` | `Resume` | Resume actions + education/tech/focus |
| `/contact` | `Contact` | Contact cards + EmailJS form |
| `*` | `NotFound` | 404 with links home/to projects |

```text
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

### File map (post-Phase 5)

```text
src/
├── components/
│   ├── layout/   Layout.jsx, Navbar.jsx, Footer.jsx, Page.jsx
│   ├── home/     Hero.jsx, SelectedWork.jsx   (Home page sections, Phase 3)
│   ├── about/    Intro.jsx, LearningJourney.jsx, BuildingInterests.jsx,
│   │             Approach.jsx   (About page sections, Phase 4)
│   └── ui/       Button.jsx, Card.jsx, Chip.jsx, PageHeader.jsx,
│                 ProjectCard.jsx, SocialLinks.jsx, BackToTop.jsx
├── pages/        Home, About, Skills, Projects, Resume, Contact, NotFound (.jsx)
├── data/         projects.js, skills.js, socialLinks.js
├── utils/        animations.js, container.js, formStyles.js
├── App.jsx       (router config)
├── main.jsx      (unchanged)
└── index.css     (Tailwind v4 import + @theme tokens + global base, 124 lines)
vercel.json       (SPA rewrite: all routes → /index.html)
```

Removed in Phase 2 (superseded): `components/sections/*` (became pages),
`ui/SectionHeading.jsx` (became `ui/PageHeader.jsx`), the ~1540-line legacy
stylesheet, `Linkedin`/`Facebook` icon-map entries (confirmed unused).

### Navigation Architecture

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

### Home Page & Hero (post-Phase 3)

`pages/Home.jsx` is a composition only:

```text
<>
├── Hero         (components/home/Hero.jsx)
└── SelectedWork (components/home/SelectedWork.jsx)
```

**Hero hierarchy (strict, top → bottom):**

1. Eyebrow: `// Hi, I'm Marc.` (mono, primary, PageHeader-style `//` prefix)
2. `h1` **John Marc Comeros** — `clamp(1.75rem,5vw,3rem)` display recipe; the
   page's only h1 and the single dominant element (`text-balance`)
3. Positioning: `2nd-Year BSIT Student · Aspiring Web Developer` (mono,
   primary)
4. Value proposition: practical/responsive/interactive experiences + growing
   skills (body-large, muted, `max-w-[560px]`)
5. CTAs: **View My Projects** (primary, `lg`, router Link → `/projects`) /
   **View Resume** (secondary, `lg` → `/resume` — the Resume page owns the
   PDF; no download logic in the Hero)
6. `<SocialLinks />` (Email + GitHub from `data/socialLinks.js` — no invented
   accounts)

**Visual strategy:** the real photo (`public/images/profile.jpg`) inside a
framed `<figure>` card (border, `bg-surface`, subtle accent ring) with a
`figcaption` availability bar: green dot (`aria-hidden`) + "Available for
internships & junior roles". No invented screenshots/stats/logos; typographic
hierarchy does the heavy lifting.

**Responsive/mobile priority:** content-first DOM order — text + CTAs render
before the photo on small screens, so identity, positioning, description, and
the primary CTA are all visible in the first viewport at 320–430px (fixes the
old avatar-first fold problem). CTAs stack full-width below 430px
(`min-[430px]:flex-row`), row + wrap at ≥430px. `md:` two-column grid with
natural DOM order (content left `1.15fr`, photo right `0.85fr` — no col-start
hacks); photo centered on mobile, flush right on `md+`. All sizing via
clamp/min/max + `min-w-0` — no fixed widths.

**Animation (entrance only, no loops):** content stack uses
`staggerContainer`/`staggerItem` (0.08s stagger, readable <0.5s); photo card
fades/slides once (0.6s, 0.15s delay). The old infinite photo float, pill dot
pulse, and bounce arrow were removed. Selected Work uses
`whileInView` + `viewportOnce`. Reduced motion: `MotionConfig
reducedMotion="user"` + global CSS.

**Selected Work:** header (eyebrow + `h2` "Things I've built" + secondary
Button → `/projects`) and 2 cards from `data/projects.js` — the whole card is
a single router `Link` to `/projects` (category, `h3` title, full description,
tech chips, "View project →" hint). Deliberately no demo/GitHub buttons or
feature checklists — those live on `/projects` (no duplication).

**Accessibility:** heading order h1 (Hero) → h2 (Selected Work) → h3 (project
titles); no `role="status"` anywhere on Home; availability caption is real
text; decorative dot `aria-hidden`; global focus-visible; 44px targets via
Button/SocialLinks; token contrast unchanged. Navbar untouched — Home
`NavLink` `end` still marks `aria-current="page"` correctly.

### About Page (post-Phase 4)

`pages/About.jsx` composes `PageHeader` + four section components + a closing
CTA section:

```text
Page (vertical padding + container)
├── PageHeader        (eyebrow "// About", h1 "A little about me", lead description)
├── Intro             (components/about/Intro.jsx)
│   ├── two columns: first-person intro (3 paragraphs) | compact portrait figure
│   │   (/images/profile.jpg — lazy, width/height declared, centered on mobile,
│   │    right-aligned md+)
│   └── <dl> fact strip: Education / Based in / Focus (border-t cells, 1→3 cols)
├── LearningJourney   (components/about/LearningJourney.jsx)
│   └── h2 + lead + 6 theme items (lucide icon, h3, one line) — grid 1→2→3 cols
├── BuildingInterests (components/about/BuildingInterests.jsx)
│   ├── h2 + 2 prose paragraphs (what I like to build)
│   └── "Projects so far" list built from data/projects.js — each row is a
│       router Link to /projects (title + technology line)
├── Approach          (components/about/Approach.jsx)
│   └── h2 + lead + 4 principle items (mono number, h3, one line) — 2-col list
└── closing section (in About.jsx): h2 "What I'm working toward" + statement
    + CTAs: Button to="/projects" (primary) / Button to="/skills" (secondary)
```

**Content rules:** first-person and conversational; facts limited to verified
profile data (2nd-year BSIT, Asian College of Technology, Cebu City, UI/UX
focus); the six journey themes map 1:1 to documented skills; the only project
references come from `data/projects.js`; no dates, milestones, certifications,
statistics, or experience claims — principles are framed as goals, not
achievements.

**Heading hierarchy:** h1 (PageHeader) → h2 per section → h3 for journey and
principle items. Journey icons and principle numbers are decorative
(`aria-hidden`). Portrait `alt` is descriptive; fact strip uses `<dl>/<dt>/<dd>`.

**Responsive:** content-first DOM order (intro text renders before the
portrait on mobile); grids collapse `lg:3 → sm:2 → 1` (journey) and
`sm:2 → 1` (approach/intro facts); portrait `w-[min(100%,clamp(200px,55vw,240px))]`
mobile → `clamp(200px,20vw,250px)` `md+`; closing CTAs stack full-width below
430px (`min-[430px]:flex-row`); `min-w-0` on grid children, no fixed widths.

**Animation:** Intro = mount-time `staggerContainer` (2 children, gentle);
LearningJourney/Approach = `whileInView` + `viewportOnce` item staggers;
BuildingInterests and the closing section = single `fadeUp` reveals. No
loops, no per-paragraph animation; reduced motion via `MotionConfig` +
global CSS.

### Skills Page (post-Phase 5)

`pages/Skills.jsx` is a single file (no sub-components), driven by
`data/skills.js`:

```text
Page
├── PageHeader        (eyebrow "// Skills", h1 "Skills & Technologies", lead)
├── intro <p>         (coursework / experimentation / projects framing, fadeUp)
├── skill groups      <ul> ruled rows — border-t per row, border-b on list:
│   ├── row: decorative icon + h2 category (left, md 13rem column)
│   │        | <ul> of Chip skill pills (right) + honesty note (JavaScript)
│   └── 6 groups from data/skills.js:
│       Web fundamentals      HTML, CSS, JavaScript (basic knowledge, still learning)
│       Frameworks & libraries React
│       Programming           C#
│       Databases & backend   MySQL, Supabase
│       Version control       Git, GitHub
│       Design tools          Figma, Inkscape, Canva, Adobe Photoshop
├── focus Card        (h2 "What I'm focusing on now" + lead "learning goals in
│                      progress — not finished achievements" + 4 goals, sm:2 cols)
└── closing section   (h2 "See it in context" + prose interpolating project
                       titles from data/projects.js + CTAs Button to="/projects"
                       (primary) / to="/contact" (secondary))
```

**Honesty rules:** no percentages, ratings, levels, years, or project counts
anywhere; JavaScript is explicitly labeled "basic knowledge, still learning";
the focus list is framed as goals in progress; only owner-verified
technologies appear (unverified former badges — Next.js, .NET, Blazor,
Netlify, Render — were removed along with the badge images).

**Heading hierarchy:** h1 → h2 per category, focus, and closing (no h3, no
skips); category icons and focus dots decorative (`aria-hidden`); skills are
plain-text chips — `Chip` renders the `<li>` inside a `<ul>`.

**Responsive:** rows stack on mobile, `md:grid-cols-[minmax(0,13rem)_minmax(0,1fr)]`;
chips wrap (`flex-wrap`); focus grid 1→2 cols at `sm`; closing CTAs stack
below 430px (`min-[430px]:flex-row`); `min-w-0` everywhere, no fixed widths.

**Animation:** intro `fadeUp` on mount; group rows `whileInView` +
`viewportOnce` stagger (rows animate as whole blocks — icons are never
animated individually); focus card + closing section = single `fadeUp`
reveals. No loops; reduced motion via `MotionConfig` + global CSS.

---

## 8. Design System (Tailwind v4 `@theme` in `src/index.css`)

### Color tokens → utilities

| Token | Value | Utility examples |
| --- | --- | --- |
| `--color-background` | `#0b0f17` | `bg-background`, page background |
| `--color-foreground` | `#f0f6fc` | `text-foreground` (primary text) |
| `--color-surface` | `#161b22` | `bg-surface` (cards) |
| `--color-surface-elevated` | `#1a202c` | `bg-surface-elevated` (chips/tags) |
| `--color-primary` | `#60a5fa` | `bg-primary`, `text-primary` |
| `--color-primary-hover` | `#3b82f6` | `hover:bg-primary-hover` |
| `--color-primary-foreground` | `#0b0f17` | `text-primary-foreground` (on primary) |
| `--color-primary-soft` | `rgba(96,165,250,.12)` | `bg-primary-soft`, focus rings |
| `--color-muted` | `#8b949e` | `text-muted` (secondary text/labels) |
| `--color-foreground-strong` | `#c9d1d9` | `text-foreground-strong` (links) |
| `--color-border` | `#30363d` | `border-border` (dividers/inputs) |
| `--color-border-strong` | `#7d8590` | `border-border-strong` (interactive controls — ≥3:1 non-text contrast) |
| `--color-border-subtle` | `rgba(255,255,255,.08)` | `border-border-subtle` (card borders) |
| `--color-success` | `#34d399` | success states |
| `--color-warning` | `#fbbf24` | warning states (token reserved) |
| `--color-danger` | `#f87171` | error states |

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
  `hover`; renders an `<li>` (use inside a `<ul>`). Used by Skills + Resume.
- **PageHeader** (`ui/PageHeader.jsx`): `// eyebrow` + `h1` + description,
  `align="center"` option; each page has exactly one `h1`.
- **Form styles** (`utils/formStyles.js`): `labelClasses`, `inputClasses`,
  `textareaClasses`, `errorClasses`, `statusClasses.success|error`.
  Field-error pattern when needed: error `<p id="{id}-error">` + control gets
  `aria-describedby="{id}-error"` (and `aria-invalid`); Contact currently uses a
  form-level `role="status"` region instead.

---

## 9. Responsive Strategy

- Mobile-first, Tailwind default breakpoints only: sm 640 / md 768 / lg 1024 /
  xl 1280 / 2xl 1536 (legacy one-off 900/560/480px breakpoints standardized).
- Target widths: 320, 375, 390, 430, 768, 1024, 1280, 1440+.
- Overflow safety: `min-w-0`/`minmax(0,…)` on grid children, `overflow-x: hidden`
  + `overflow-wrap: break-word` on body, wrapping flex containers everywhere.

---

## 10. Accessibility Baseline

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

---

## 11. Project Inventory

Projects currently shown in `src/data/projects.js`:

### 1. Gasto Buster

```text
Project name: Gasto Buster
Description: Personal finance / budget tracker — expense & income tracking,
             categorisation, visual budget analytics.
Technologies: React, JavaScript, Tailwind CSS, Vercel
Status: Deployed (live demo reachable)
GitHub: https://github.com/mxrckyyy/Gasto-Buster
Live/demo: https://gastobuster.vercel.app
Screenshots/assets: none in this repository — Needs verification (screenshots
                    may exist inside the project repo, not here)
Important features:
  - Categorized expense & income tracking
  - Interactive budget analytics & visual summaries
  - Responsive modern UI
```

### 2. Inventory Management System

```text
Project name: Inventory Management System
Description: Real-time inventory platform with role-based access control,
             automated SKU generation, ₱ stock valuation, .xlsx exports.
Technologies: React, Vite, Supabase, Tailwind CSS, SheetJS, Vercel
Status: Deployed (live demo reachable)
GitHub: https://github.com/mxrckyyy/InventorySystem
Live/demo: https://inventory-system-pi-self.vercel.app
Screenshots/assets: none in this repository — Needs verification
Important features:
  - RBAC (Admin/Viewer) via Supabase Auth
  - Responsive drawer menu + full-width adaptive data tables
  - Real-time stock valuation & low-stock alerts (PHP ₱)
  - Client-side Excel (.xlsx) report generation
```

**Schema required by `ProjectCard`:**
`id, title, category, type, description, technologies[], features[], demo, github, featured`

No other projects are referenced anywhere in the codebase. Do not invent
additional projects.

---

## 12. Asset Inventory

| Asset | Location | Used? | Notes |
| --- | --- | --- | --- |
| `public/images/profile.jpg` | 1536×2048 JPEG, 52 KB | Yes — Home hero avatar, `og:image`, `twitter:image` | Only photo in use |
| `public/favicon.svg` | 64×64 SVG "JM" | Yes — `index.html` icon | Accent `#4f8cff` differs from site accent `#60a5fa` |
| `public/MarcResume.pdf` | 92.5 KB | Yes — linked by Resume page | Served at `/MarcResume.pdf` |
| `src/assets/MarcResume.pdf` | 92.5 KB | **No** | Byte-identical duplicate of the public copy; not imported anywhere |
| `ME.jpg` (repo root) | 52 KB | **No** | Byte-identical duplicate of `public/images/profile.jpg`; tracked in git but unused |
| `dist/` build output | generated | n/a | gitignored, regenerated by `npm run build` |

**Not present:** project screenshots, logo/brand marks, custom icons (all icons
come from lucide-react), local fonts, background art, videos.

**Rules:** do not delete assets in unrelated phases. Flag for later
optimization:

- Duplicated `ME.jpg` and `src/assets/MarcResume.pdf` (candidates for cleanup
  in a later phase).
- `profile.jpg` is served at full 1536×2048 with no responsive variants
  (candidate for resizing/WebP).
- No screenshots exist for the two showcased projects (must be captured/added
  before a visual redesign of the Projects section).

**External assets (not in repo):**

- None loaded as images — the Skills page renders text chips (Phase 5);
  shields.io is no longer used anywhere.
- lucide-react SVG icons (bundled).

**Fonts:** `--font-mono: 'Fira Code', …` is declared in `@theme` but **no font
is loaded** anywhere (no `@font-face`, no Google Fonts link). Fira Code only
renders if installed locally; otherwise it silently falls back to
`ui-monospace`. Body font is the system stack.

---

## 13. Known Issues & Backlog

Problems identified in the Phase 1 audit, re-validated after Phase 2.
**Backlog for later phases — do not fix during unrelated work.** Items marked
`[RESOLVED — Phase 2]` were fixed or made obsolete by the Phase 2 refactor.
The full Phase 1 component-by-component analysis of the old hash-anchor version
is preserved in git history (`f45d3eb:PROJECT_CONTEXT.md` §5) — do not restore
it into this file; it describes files that no longer exist.

### Visual / UI-UX

1. **Weak visual hierarchy in Hero** `[RESOLVED — Phase 3]` — Hero redesigned:
   one dominant `h1` with strict eyebrow → name → positioning → value prop →
   CTA hierarchy; glow pill, tech-tag chips, and equal-weight CTAs removed.
2. **Weak project presentation** `[OPEN]` — no screenshots, no visual
   differentiation between the two cards; the strongest content of the site is
   the least visual.
3. **Badge-heavy Skills page** `[RESOLVED — Phase 5]` — badges replaced by
   categorized text chips driven by `data/skills.js`; no remote images remain
   on the page.
4. **Personal branding inconsistency** `[RESOLVED — Phase 2]` — Home hero now
   says "BSIT Student · Aspiring Web Developer" (was "Frontend Developer").
5. **Inconsistent components** `[OPEN]` — two back-to-top controls (Footer
   button + floating `BackToTop`); hardcoded skill-like lists remain in
   `pages/Resume.jsx` (`technicalHighlights`, `focusAreas`) — drift risk vs
   `data/skills.js`. (Home's hardcoded `techTags` was removed in Phase 3.)
6. **Dead UI data — SocialLinks iconMap** `[RESOLVED — Phase 2]` —
   Linkedin/Facebook/Globe entries removed (they were unused). Note:
   `data/socialLinks.js` still only has Email + GitHub — no LinkedIn link at
   all (add only if the owner provides one).
7. **Legacy `index.css` section 11 "PLACEHOLDERS"** `[RESOLVED — Phase 2]` —
   the 1540-line stylesheet was replaced by a 124-line Tailwind v4 file
   (`@import` + `@theme` + `@layer base`).

### Typography & Color

8. **Declared mono font never loads (Fira Code)** `[OPEN]` — declared in
   `@theme --font-mono`, still no `@font-face`/link; falls back to
   `ui-monospace`.
9. **No display/headline typeface** `[OPEN]` — headings rely on the system UI
   font only.
10. **Inconsistent accent usage** `[OPEN]` — `public/favicon.svg` uses
    `#4f8cff` while the design token is `#60a5fa`; success/error values are
    now tokens (`--color-success`/`--color-danger`) but the favicon is out of
    sync.

### Responsive

11. **Inconsistent breakpoints** `[RESOLVED — Phase 2]` — legacy 480/560/768/
    900/1024px one-off breakpoints standardized to Tailwind defaults
    (sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536).
12. **Hero on mobile** `[RESOLVED — Phase 3]` — content-first DOM order: text
    and CTAs render before the photo on small screens; identity, positioning,
    description, and the primary CTA are visible in the first viewport at
    320–430px.
13. **Full-width buttons under 480px** `[RESOLVED — Phase 2]` — legacy
    `.btn { width: 100% }` rule deleted with the old stylesheet.

### Accessibility

14. **Partial contrast fix (interactive borders)** `[RESOLVED — Phase 2]` —
    `border-strong` is now the documented default for interactive controls in
    the token system (see Accessibility Baseline). Keep this convention when
    adding components.
15. **Form errors not programmatically associated** `[OPEN]` — no
    `aria-invalid`/`aria-describedby` wiring in `pages/Contact.jsx`; only a
    form-level `role="status"` region.
16. **Skill badges are image-only content** `[RESOLVED — Phase 5]` — badges
    removed; skills are now real text with an explicit JavaScript honesty
    note.
17. **`role="status"` on the static Hero availability pill**
    `[RESOLVED — Phase 3]` — pill removed; availability is now plain
    `figcaption` text in the Hero visual card (no live region anywhere on
    Home).

### Performance

18. **21 remote badge requests** `[RESOLVED — Phase 5]` — shields.io is no
    longer used anywhere; the Skills page makes zero remote image requests.
19. **framer-motion is the largest non-React bundle** `[OPEN]` (~127 KB /
    41.7 KB gzip, Vite `manualChunks` `motion` chunk) for effects that CSS
    could do.
20. **Full-resolution 1536×2048 portrait** `[OPEN]` — hero avatar has no
    `srcset`/modern format (`width`/`height` now declared).
21. **No SEO assets** `[OPEN]` — no `robots.txt`, sitemap, or web manifest;
    `og:url` points to the GitHub profile instead of the deployed site;
    `og:image` is a relative URL.

### Technical / Maintainability

22. **Hardcoded EmailJS configuration** `[OPEN]` —
    `src/pages/Contact.jsx:104-106` instead of environment variables.
23. **Single 1540-line `index.css`** `[RESOLVED — Phase 2]` — now 124 lines
    (`@import "tailwindcss"` + `@theme` tokens + `@layer base`); component
    styles live in JSX utilities.
24. **Duplicated files in the repo** `[OPEN]` — `ME.jpg`,
    `src/assets/MarcResume.pdf`.
25. **No linter, formatter, or tests** `[OPEN]`.
26. **Node engine mismatch warning** `[RESOLVED]` — local machine now runs
    Node v24.19.0 (Vite 7 wants ^20.19 or ≥22.12).
27. **Footer back-to-top duplicates `BackToTop`** `[OPEN]` — unnecessary
    component duplication (same as #5).

---

## 14. Content/Data Rules

- `src/data/projects.js` (2 projects), `skills.js` (6 skill groups / 13 text
  skills), `socialLinks.js` (Email + GitHub) — single source, never
  duplicated in pages.
- Resume PDF: `/MarcResume.pdf`. Profile image: `/images/profile.jpg`.
- EmailJS (hard-coded in `src/pages/Contact.jsx`): service `service_2a39b0m`,
  template `template_d8s622i`, public key `x3w2xijWKl8BvMqHt`.
- Contact: johnmarccomeros16@gmail.com · 09690487218 · Cebu City ·
  github.com/mxrckyyy.

---

## 15. Development Rules

```text
1. Read PROJECT_CONTEXT.md before making changes.
2. Read PROJECT_ARCHITECTURE.md before making architectural changes.
3. Inspect existing code before creating new components.
4. Reuse existing components whenever appropriate.
5. Do not duplicate functionality.
6. Do not invent personal information or project information.
7. Keep portfolio claims truthful.
8. Preserve responsive behavior.
9. Preserve accessibility.
10. Test changes before declaring them complete.
11. Update documentation when architecture changes.
12. Avoid unnecessary dependencies.
13. Keep the UI modern, clean, responsive, and maintainable.
```

**Phase rules (updated after Phase 2):**

- **Tailwind CSS v4 is the styling system.** Never introduce Tailwind v3
  configuration or a `tailwind.config.js`. Use utilities for UI; custom CSS
  only for tokens, global base behavior, scrollbar/selection/focus/reduced-
  motion.
- React + Vite and React Router (multi-page SPA) are fixed architecture
  decisions — do not remove the router or collapse back to a single
  hash-anchor page.
- Navbar/Footer are shared (layout route) — never duplicate them inside pages.
- Portfolio data lives only in `src/data/`.
- Keep claims truthful; verify every "Needs verification" item in §3 with the
  owner before publishing it.
- Never write secrets (EmailJS keys, tokens) into documentation or commit them
  to the repo.

---

## 16. Validation Status

### End of Phase 2

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

### End of Phase 3 (Home / Hero)

- `npm run build` ✓ (2130 modules; CSS 30.4 kB / gzip 6.6 kB; no warnings).
- SSR smoke render of `/` (full App): **20/20 checks ✓** — single `h1` =
  "John Marc Comeros"; positioning + eyebrow present; `href="/projects"` and
  `href="/resume"` CTAs; zero hash anchors; no `role="status"` on Home;
  availability caption; h1 → h2 → h3 hierarchy; social links (GitHub +
  mailto); `aria-current="page"` on Home nav; skip link + footer present; no
  `undefined` output.
- `vite preview`: `/`, `/about`, `/skills` → 200 + SPA shell ✓.
- Dev server: `/` → 200; `Home.jsx` / `Hero.jsx` / `SelectedWork.jsx`
  transforms → 200 ✓; no errors in dev/preview logs ✓.
- Structural responsive review (320–1440): clamp/min-w-0/flex-wrap only, CTA
  stack below 430px — pixel-level + real-console checks deferred to QA phase
  (no browser automation in this environment).

### End of Phase 4 (About page)

- `npm run build` ✓ (2134 modules; CSS 31.33 kB / gzip 6.78 kB; no warnings).
- SSR smoke render (Vite `ssrLoadModule` + `MemoryRouter`, throwaway script):
  **35/35 checks ✓** — About: single `h1` = "A little about me"; heading
  sequence 1→2→3 with no skips; portrait `alt` + declared `width`/`height`;
  facts `<dl>`; `href="/projects"` and `href="/skills"` CTAs; project list
  rendered from `data/projects.js`; zero hash anchors; no `role="status"`; no
  `undefined` output. Regression: Home/Skills/Resume/Contact/Projects/
  NotFound all render with no `undefined`; Home keeps its single h1 and both
  CTAs.
- `vite preview` direct loads `/`, `/about`, `/resume` → 200 + SPA shell ✓.
- Not performed: real-browser visual checks at the target viewport widths
  (no browser automation in this environment) — deferred to QA phase.

### End of Phase 5 (Skills page)

- `npm run build` ✓ (2134 modules; CSS 31.30 kB / gzip 6.77 kB; no warnings).
- SSR smoke render (Vite `ssrLoadModule` + `MemoryRouter`, throwaway script):
  **55/55 checks ✓** — Skills: single `h1` = "Skills & Technologies"; all 6
  categories and all 13 skill chips present; JavaScript honesty note attached
  ("JavaScript: basic knowledge, still learning"); learning-goals framing;
  absence of Next.js/.NET/Blazor/Netlify/Render, shields.io, any `<img>`,
  `%`, hash anchors, and `role="status"`; CTAs `href="/projects"` +
  `href="/contact"`; project titles interpolated from `data/projects.js`;
  heading sequence 1→2 with no skips. Regression: About/Home/Resume/
  Contact/Projects/NotFound all render with no `undefined`; About and Home
  h1s intact.
- `vite preview` direct loads `/`, `/about`, `/skills`, `/projects` → 200 +
  SPA shell ✓.
- Not performed: real-browser visual checks at target viewport widths and a
  live keyboard-focus pass (no browser automation in this environment) —
  deferred to QA phase.
