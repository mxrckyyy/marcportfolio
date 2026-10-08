# PROJECT_CONTEXT.md

Primary context file for future OpenCode sessions.
Read this **before** making any change to the portfolio.

Companion file: `PROJECT_ARCHITECTURE.md` (technical architecture, routes, design system, deployment).

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
| Portfolio owner | John Marc Comeros |
| Preferred name / nickname | Marc |
| Current status | 2nd Year BSIT Student |
| Professional positioning | BSIT Student · Aspiring Web Developer |
| Age | 19 |
| Location | Cebu City, Philippines |
| School | Asian College of Technology (ACT) |
| Email | johnmarccomeros16@gmail.com |
| Phone | 09690487218 |
| GitHub | https://github.com/mxrckyyy |
| Employment history | None — no professional work experience yet |

**Positioning rule:** do not describe the owner as a professional, senior, or full-stack developer unless the actual project context supports that claim. The truthful positioning is a student developer who is still learning and actively building.

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

The portfolio must **not** look like a fake corporate agency website. It should feel like a strong **student developer portfolio**: modern, clean, practical, and truthful.

**Hard rules (from `PORTFOLIO_CONTEXT.txt`):**

- No invented work experience, clients, metrics, certifications, or skill percentages.
- No "Senior" / "Full-Stack" titles unless genuinely supported.
- Projects are the core proof (project-centric portfolio, because there is no employment history).

---

## 3. Current Skills

Only technologies that are actually used or genuinely known should be documented here.

### Frontend

- HTML
- CSS
- JavaScript
- React
- Vite (build tool used by this portfolio and by the Gasto Buster / Inventory projects)

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

### Needs verification (shown in `src/data/skills.js` but not confirmed by the project blueprint)

The Skills section currently also displays these badges. They are **not** confirmed in `PORTFOLIO_CONTEXT.txt` and must be verified with the owner before being presented as known skills:

- Next.js — Needs verification
- Tailwind CSS — used by the two portfolio projects (Gasto Buster, Inventory System), so it is project-level evidence, but not listed as a personal skill. Needs verification.
- .NET — Needs verification
- Blazor — Needs verification
- Netlify — Needs verification
- Render — Needs verification
- Adobe Photoshop — Needs verification

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

**Known branding inconsistency (documented, not fixed yet):**
`src/components/sections/Hero.jsx:74` renders the subtitle **"Frontend Developer"** (an inline code comment shows it was changed from "Aspiring Web Developer"). The rest of the site (index.html metadata, About, Resume) positions Marc as a BSIT student / aspiring web developer. This must be reconciled in a later phase — decide with the owner which title is truthful.

---

## 5. Existing Portfolio Analysis

The site is a **single-page application**: one route (`/`), sections stacked vertically, navigated with hash links (`#about`, `#skills`, …) and `scroll-padding-top` offset for the sticky navbar. There is no router library.

Global structure (`src/App.jsx`):

```text
MotionConfig (reducedMotion="user")
├── Skip link (#main-content)
├── Navbar            (sticky)
├── <main id="main-content">
│   ├── Hero      (#top)
│   ├── About     (#about)
│   ├── Skills    (#skills)
│   ├── Projects  (#projects)
│   ├── Resume    (#resume)
│   └── Contact   (#contact)
├── Footer
└── BackToTop (floating)
```

---

### 5.1 Navigation — `src/components/layout/Navbar.jsx`

```text
Current implementation
  Sticky header, brand "<JMC/>", 5 hash links + "Get in Touch" CTA.
  Desktop: horizontal list with animated underline for the active link.
  Mobile (<768px): hamburger toggle opens a fixed drawer + dark overlay.
  Active section detected with IntersectionObserver
  (rootMargin '-40% 0px -55% 0px'); scroll state toggles glass background.

Purpose
  Primary wayfinding for a single-page site; drives users to Projects and Contact.

Important components
  navLinks array (local), Button (ui), lucide Menu/X icons,
  .navbar / .navbar__drawer / .navbar__overlay CSS.

Data source
  Hardcoded local `navLinks` array.

Dependencies
  React hooks, lucide-react, Button, index.css section 9.

Known problems
  - Nav link order/labels duplicated conceptually by section IDs elsewhere.
  - Mobile drawer relies on CSS `visibility` + tabIndex switching; links keep
    `aria-hidden` container state in sync only through React re-render.
  - Toggle button uses `--border` (1.6:1 contrast) despite the WCAG fix
    applied to other controls via `--border-strong`.

Potential improvements
  - Extract navLinks to a shared data file.
  - Align contrast tokens with the accessibility fix.
  - Consider scroll-spy fallback for browsers without IntersectionObserver.
```

### 5.2 Hero — `src/components/sections/Hero.jsx`

```text
Current implementation
  Two-column grid: content left, framed avatar right (stacked on mobile).
  Status pill with pulsing green dot ("Available for Internship & Junior
  Web Developer Roles"), H1 name, subtitle, description, 7 tech tags,
  two CTA buttons, social links, bouncing scroll-down link.
  Entrance animation: fade/slide + avatar float loop + stagger.

Purpose
  First impression, personal branding, primary CTAs (Projects / Contact).

Important components
  Button, SocialLinks, staggerContainer/staggerItem variants,
  .hero__avatar-frame, .hero__status.

Data source
  Hardcoded `techTags` array inside Hero.jsx (duplicated knowledge vs
  data/skills.js and Resume.jsx technicalHighlights).

Dependencies
  framer-motion, lucide-react, index.css section 11.

Known problems
  - Subtitle "Frontend Developer" conflicts with student positioning.
  - Avatar <img> claims 1536x2048 (correct) but the source JPEG is a full
    portrait photo served without responsive sizes/srcset.
  - Continuous animations (pulse, float, bounce) — motion is heavy but
    reduced-motion is respected.
  - Tech tag list is a third duplicate of the skills list.

Potential improvements
  - Reconcile the job title wording.
  - Add responsive image sizing / smaller hero crop.
  - Source tech tags from one shared data file.
```

### 5.3 About — `src/components/sections/About.jsx`

```text
Current implementation
  SectionHeading + two-column layout: two paragraphs of bio on the left,
  2x2 grid of highlight cards (Education, Location, Core Focus, Interest
  Areas) with lucide icons on the right.

Purpose
  Human context: who Marc is, where he studies, what he focuses on.

Important components
  SectionHeading, `highlights` local array, lucide icons.

Data source
  Hardcoded local `highlights` array + two hardcoded paragraphs.

Dependencies
  lucide-react, index.css section 11.

Known problems
  - Personal facts are hardcoded in JSX (not in a data file), so wording
    changes require editing component code.
  - Collapses to one column at 900px while other sections use 768px.

Potential improvements
  - Move bio/highlights into `src/data/`.
  - Unify responsive breakpoints.
```

### 5.4 Skills — `src/components/sections/Skills.jsx`

```text
Current implementation
  4 groups (Frontend, Programming & Backend, Tools & Hosting, UI & Vector
  Design) rendered as cards containing shields.io badge <img> elements.
  Grid: 1 col <768px, 2 cols ≥768px, 4 cols ≥1024px. Info note below.

Purpose
  Quick visual inventory of technologies.

Important components
  SectionHeading, `skills` data, badge images, stagger animation.

Data source
  `src/data/skills.js` — external badge URLs (img.shields.io).

Dependencies
  framer-motion, index.css, **external network requests to shields.io**.

Known problems
  - ~20 remote badge images: network dependency, layout shift risk, slow on
    poor connections, and each badge is an extra request.
  - Content is image-only: if shields.io is blocked/offline the section is
    empty (alt text is the only fallback).
  - Claims skills that are not confirmed (see §3 Needs verification).
  - Badge style (shields.io "for-the-badge") does not match the site's own
    design tokens — visually foreign.

Potential improvements
  - Replace remote badges with local text/icon chips using design tokens.
  - Verify every listed technology with the owner.
```

### 5.5 Projects — `src/components/sections/Projects.jsx` + `src/components/ui/ProjectCard.jsx`

```text
Current implementation
  Renders `projects` array into a responsive grid (1 col <768px, 2 cols ≥).
  Each card: category pill, Featured star, title, description, feature
  checklist, `[tech]` tags, "View Code" + "Live Demo" buttons.
  Bottom banner CTA to the GitHub profile.

Purpose
  The core proof section of the portfolio.

Important components
  SectionHeading, ProjectCard, Button, lucide Github/Star/Check.

Data source
  `src/data/projects.js` (2 entries, both `featured: true`).

Dependencies
  framer-motion, lucide-react, index.css section 11.

Known problems
  - No screenshots or images for any project — weakest part of the
    presentation.
  - Only 2 projects; the grid `--single` modifier exists but is unused.
  - Cards are text-dense and visually identical; no hierarchy between them.
  - Category label and description do not explain the stack visually
    (no logos/visual anchors).

Potential improvements
  - Add real project screenshots (asset slots must be created first).
  - Add a third project when one exists; do not invent projects.
  - Differentiate featured presentation.
```

### 5.6 Resume — `src/components/sections/Resume.jsx`

```text
Current implementation
  Download + "view in new tab" buttons for /MarcResume.pdf, then cards:
  Education (BSIT 2nd Year, ACT Cebu), Technical Highlights (3 hardcoded
  groups), Key Focus Areas (3 chips).

Purpose
  Provide a downloadable resume and summarise education/stack.

Important components
  SectionHeading, Button, `technicalHighlights`, `focusAreas`.

Data source
  Hardcoded arrays in the component; PDF served from /public/MarcResume.pdf.

Dependencies
  framer-motion, lucide-react, index.css.

Known problems
  - Skills are listed a third time (drift risk vs data/skills.js).
  - No experience/projects timeline — fine for a student, but the section
    mostly repeats other sections.

Potential improvements
  - Single source of truth for skills.
  - Consider a compact timeline (education + projects) instead of repeated
    skill lists.
```

### 5.7 Contact — `src/components/sections/Contact.jsx`

```text
Current implementation
  Left: 4 contact cards (Email, Phone, Location, GitHub).
  Right: controlled form (name, email, subject, message) with manual
  validation, sending state, success/error status message, sent through
  EmailJS (@emailjs/browser).

Purpose
  Main conversion point — let visitors message Marc directly.

Important components
  SectionHeading, Button, `contactCards`, EmailJS send call.

Data source
  Hardcoded `contactCards`; EmailJS IDs hardcoded in the component.

Dependencies
  @emailjs/browser, framer-motion, lucide-react, index.css.

Known problems
  - EmailJS service/template/public keys are hardcoded in source
    (src/components/sections/Contact.jsx around lines 90-95). No .env usage.
  - Errors are not linked to inputs via aria-invalid / aria-describedby.
  - No spam protection (honeypot / rate limit).
  - Status message is transient only (no persistence).

Potential improvements
  - Move EmailJS configuration to environment variables (Vite import.meta.env).
  - Improve field-level error announcements.
```

### 5.8 Footer — `src/components/layout/Footer.jsx`

```text
Current implementation
  Copyright line, compact social links (Email, GitHub), back-to-top button.

Purpose
  Legal/branding close + quick social access.

Known problems
  - Back-to-top duplicates the floating BackToTop component (two controls
    doing the same job).
  - No navigation links or section index.

Potential improvements
  - Reuse a single back-to-top control; optionally add mini-nav.
```

### 5.9 Shared UI (`src/components/ui/`)

| Component | Purpose | Notes |
| --- | --- | --- |
| `Button.jsx` | Polymorphic `<a>` / `<button>` with primary/ghost variants | Adds framer-motion scale hover; auto `target=_blank` for http/mailto |
| `SectionHeading.jsx` | Eyebrow (`//` prefix) + H2 + description | Used by every section; align prop exists but only default `left` is used |
| `ProjectCard.jsx` | Project presentation card | See §5.5 |
| `SocialLinks.jsx` | Icon/link list, `default` and `compact` variants | `iconMap` includes Linkedin/Facebook/Globe that are **not** in data — dead code |
| `BackToTop.jsx` | Floating scroll-to-top button via AnimatePresence | Appears after 0.8 viewport scroll; duplicates Footer button |

---

## 6. Project Inventory

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

No other projects are referenced anywhere in the codebase. Do not invent additional projects.

---

## 7. Asset Inventory

| Asset | Location | Used? | Notes |
| --- | --- | --- | --- |
| `public/images/profile.jpg` | 1536×2048 JPEG, 52 KB | Yes — Hero avatar, `og:image`, `twitter:image` | Only photo in use |
| `public/favicon.svg` | 64×64 SVG "JM" | Yes — `index.html` icon | Accent `#4f8cff` differs from site accent `#60a5fa` |
| `public/MarcResume.pdf` | 92.5 KB | Yes — linked by Resume section | Served at `/MarcResume.pdf` |
| `src/assets/MarcResume.pdf` | 92.5 KB | **No** | Byte-identical duplicate of the public copy; not imported anywhere |
| `ME.jpg` (repo root) | 52 KB | **No** | Byte-identical duplicate of `public/images/profile.jpg`; tracked in git but unused |
| `dist/` build output | generated | n/a | gitignored, regenerated by `npm run build` |

**Not present:** project screenshots, logo/brand marks, custom icons (all icons come from lucide-react), local fonts, background art, videos.

**Rules for this phase:** do not delete assets. Flag for later optimization:

- Duplicated `ME.jpg` and `src/assets/MarcResume.pdf` (candidates for cleanup in a later phase).
- `profile.jpg` is served at full 1536×2048 with no responsive variants (candidate for resizing/WebP).
- No screenshots exist for the two showcased projects (must be captured/added before a visual redesign of the Projects section).

**External assets (not in repo):**

- ~20 shields.io badge images in `src/data/skills.js`.
- lucide-react SVG icons (bundled).

**Fonts:** the CSS declares `--font-mono: 'Fira Code', …` but **no font is loaded** anywhere (no `@font-face`, no Google Fonts link). Fira Code only renders if installed locally; otherwise it silently falls back to `ui-monospace`. Body font is the system stack.

---

## 8. Current Issues

Problems identified in the current portfolio. **Documented only — do not fix yet.**

### Visual / UI-UX

1. **Weak visual hierarchy in Hero** — status pill, H1, subtitle, description, tags, buttons, and socials are all stacked with similar visual weight; nothing dominates the fold.
2. **Weak project presentation** — no screenshots, no visual differentiation between the two cards; the strongest content of the site is the least visual.
3. **Badge-heavy Skills section** — shields.io images clash with the site's dark design tokens; section reads as a sticker sheet rather than a skill breakdown.
4. **Unclear personal branding** — "Frontend Developer" (Hero) vs "BSIT Student · Aspiring Web Developer" (metadata/About/Resume).
5. **Inconsistent components** — two back-to-top controls; three separate hardcoded skills lists (Hero tags, Skills data, Resume highlights).
6. **Dead UI data** — `SocialLinks.iconMap` supports Linkedin/Facebook/Globe but no such links exist; no LinkedIn link at all.
7. **Section 11 of `index.css` is still labelled "SECTION PLACEHOLDERS (refined in later phases)"** — the design was never finished to a final pass.

### Typography & Color

8. **Declared mono font never loads** (Fira Code) — typography intent is not actually delivered.
9. **No display/headline typeface** — headings rely on the system UI font only.
10. **Inconsistent accent usage** — favicon uses `#4f8cff` while the design token is `#60a5fa`; status green `#34d399` and success/error colors are ad-hoc values outside the token table.

### Responsive

11. **Inconsistent breakpoints** — 480 / 560 / 767.98 / 768 / 900 / 1024 px are all used; About and Resume collapse at 900px while everything else uses 768px.
12. **Hero on mobile** places the avatar above the text, pushing the CTAs below the fold on small screens.
13. **Full-width buttons under 480px** (`.btn { width: 100% }`) make small inline actions (e.g. footer/social chips) inconsistent.

### Accessibility

14. **Partial contrast fix** — `--border-strong` was introduced for WCAG 1.4.11, but `.navbar__toggle`, `.footer__top`, `.hero__scroll`, `.back-to-top`, and `.navbar__drawer` border still use `--border` (≈1.6:1) for interactive borders.
15. **Form errors are not programmatically associated** with inputs (no `aria-invalid` / `aria-describedby`).
16. **Skill badges are image-only content** — no text fallback if images fail.
17. **`role="status"` on the Hero availability pill** means screen readers announce a continuously-updating region for a static string.

### Performance

18. **~20 remote badge requests** on the Skills section (third-party, render-blocking visually).
19. **framer-motion is the largest non-React bundle** (~127 KB / 41.7 KB gzip) for hover-scale and fade effects that CSS could do.
20. **Full-resolution 1536×2048 portrait** used as the hero avatar with no `srcset`/sizes and no modern format.
21. **No SEO assets**: no `robots.txt`, no sitemap, no web manifest; `og:url` points to the GitHub profile instead of the deployed site.

### Technical / Maintainability

22. **Hardcoded EmailJS configuration** in source instead of environment variables.
23. **Single 1540-line `index.css`** mixing tokens, base, layout, and every section — no modular structure.
24. **Duplicated files in the repo** (`ME.jpg`, `src/assets/MarcResume.pdf`).
25. **No linter, formatter, or tests** configured.
26. **Node engine mismatch warning** — Vite 7 / plugin-react 5 require Node ^20.19 or ≥22.12; the local machine runs 20.18.0 (build still succeeds today, but this may break on a Vite upgrade).
27. **Footer back-to-top duplicates `BackToTop`** — unnecessary component duplication.

---

## 9. Development Rules

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

**Phase rules for the redesign (applies to Phases 2+):**

- The existing styling system is **plain CSS with custom properties** — there is **no Tailwind CSS** in this project. Do not introduce a CSS framework during the redesign unless explicitly instructed in that phase. If Tailwind is ever adopted later, it must be Tailwind v4 (`@theme` + CSS variables, no `tailwind.config.js`).
- Do not change the framework (React + Vite) or add a router.
- Keep claims truthful; verify every "Needs verification" item with the owner before publishing it.
- Never write secrets (EmailJS keys, tokens) into documentation or commit them to the repo.

---

## 10. Validation Baseline (as of this analysis)

| Check | Result |
| --- | --- |
| `npm ci` | Pass (71 packages; EBADENGINE warnings for Node 20.18.0) |
| `npm run dev` | Pass — Vite ready on http://localhost:5173 |
| `npm run build` | Pass — `dist/` produced (CSS 22.6 KB, JS chunks: react 221.7 KB, motion 127 KB, index 25.5 KB, icons 5.5 KB, vendor 3.5 KB) |
| Source changes in this phase | None (documentation files only) |
| Dependencies installed in this phase | None added |
| Pre-existing issues | Node 20.18.0 < required 20.19+ (warning only); all issues in §8 predate this phase |
