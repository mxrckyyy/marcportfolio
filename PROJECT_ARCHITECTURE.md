# PROJECT_ARCHITECTURE.md — Architecture Map

> Source of truth for how the portfolio is wired. Re-read after any session
> reset together with `PROJECT_CONTEXT.md`.

## 1. Application Structure (current)

```
Application
├── Router (BrowserRouter, react-router-dom v7)
│   └── Routes
│       ├── Layout route (element={<Layout />})
│       │   ├── Navbar        (shared, NavLink active states + mobile drawer)
│       │   ├── Page Content  (<Outlet /> → matched page, keyed by pathname)
│       │   └── Footer        (shared, social links + back-to-top)
│       │
│       ├── Pages
│       │   ├── Home        (/)
│       │   ├── About       (/about)
│       │   ├── Skills      (/skills)
│       │   ├── Projects    (/projects)
│       │   ├── Resume      (/resume)
│       │   ├── Contact     (/contact)
│       │   └── NotFound    (*  → 404 Not Found page)
│       │
│       ├── Shared UI
│       │   ├── Button        (primary | secondary | ghost | icon; sm/md/lg;
│       │   │                 `to` → Link, `href` → anchor, else <button>)
│       │   ├── Card          (motion-forwarding surface card + hover option)
│       │   ├── Chip          (pill for tags/skills)
│       │   ├── PageHeader    (eyebrow + h1 + description; one h1 per page)
│       │   ├── ProjectCard   (data-driven project card)
│       │   ├── SocialLinks   (default + compact)
│       │   ├── Page          (page shell: vertical padding + container)
│       │   └── BackToTop     (floating, appears after 0.8 viewport scroll)
│       │
│       ├── Data
│       │   ├── projects.js    (project entries + githubProfile)
│       │   ├── skills.js      (badge groups)
│       │   └── socialLinks.js (Email, GitHub)
│       │
│       ├── Utilities
│       │   ├── animations.js  (viewportOnce, fadeUp, stagger*)
│       │   ├── container.js   (containerClasses — single container definition)
│       │   └── formStyles.js  (label/input/textarea/error/status classes)
│       │
│       └── Styling
│           └── Tailwind CSS v4
│               ├── index.css → @import "tailwindcss"
│               ├── @theme → semantic design tokens (colors, fonts, radii,
│               │           container width, animate + keyframes)
│               └── @layer base → html/body, selection, focus-visible,
│                                 scrollbar, prefers-reduced-motion
└── Deployment
    ├── Vite 7 (plugin order: react(), tailwindcss())
    └── Vercel — vercel.json rewrites all paths → /index.html (SPA fallback)
```

## 2. Runtime Behavior

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

## 3. Routing Table

| Path            | Component | Notes                          |
| --------------- | --------- | ------------------------------ |
| `/` (index)     | Home      | Hero only                      |
| `/about`        | About     |                                |
| `/skills`       | Skills    |                                |
| `/projects`     | Projects  |                                |
| `/resume`       | Resume    | `/MarcResume.pdf` download/view |
| `/contact`      | Contact   | EmailJS form                   |
| `*`             | NotFound  | Any unknown path → 404         |

## 4. Styling Rules (govern all phases)

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

## 5. Conventions

- One `h1` per page (from `PageHeader`, or Hero's title on Home); next level
  down is `h2` — never skip levels.
- Data is read only from `src/data/`; components receive data via props.
- Buttons/links: `to` for internal routes, `href` for external/file targets.
- Keep Navbar/Footer single-instance (layout route only).
- Re-check `PROJECT_CONTEXT.md` + this file after any session interruption.
