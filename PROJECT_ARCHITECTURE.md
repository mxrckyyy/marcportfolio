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
libraries (Redux/Zustand), backend code, tests, linter/formatter, CI config.
**Env files:** `.env.example` (variable names + setup docs, no values) and
gitignored `.env.local` (real `VITE_EMAILJS_*` values) exist since Phase 8.

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
├── .env.example               # EmailJS VITE_* variable names + setup (no values)
├── .env.local                 # gitignored (*.local) — real EmailJS values (local only)
├── .gitignore                 # node_modules, dist, dist-ssr, *.local, .DS_Store, *.log
│
├── public/                    # Static files copied verbatim to dist/
│   ├── favicon.svg            # "JM" monogram favicon (token colors #60a5fa on #0b0f17, Phase 9)
│   ├── MarcResume.pdf         # Downloadable resume (linked by Resume page)
│   └── images/
│       └── profile.jpg        # Hero avatar + og:image (1536×2048, 52 KB)
│
├── src/
│   ├── main.jsx               # createRoot().render(<StrictMode><App/>), imports index.css
│   ├── App.jsx                # MotionConfig → BrowserRouter → Routes → Layout
│   ├── index.css              # @import "tailwindcss" + @theme tokens + @layer base
│   │                          # + @media print block scoped to Resume (175 lines)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.jsx     # Shared shell: ScrollToTop, skip link, Navbar, <Outlet/>, Footer, BackToTop
│   │   │   ├── Navbar.jsx     # NavLink desktop list + mobile drawer (focus-managed, Phase 9)
│   │   │   ├── Footer.jsx     # Copyright + compact social links (Phase 9: back-to-top button removed)
│   │   │   └── Page.jsx       # Page shell: vertical padding + container
│   │   ├── home/
│   │   │   ├── Hero.jsx       # Home hero: content stack + photo figure + CTAs (Phase 3)
│   │   │   └── SelectedWork.jsx # 2 project teasers → /projects (Phase 3)
│   │   ├── about/
│   │   │   ├── Intro.jsx      # First-person intro + portrait + fact strip (Phase 4)
│   │   │   ├── LearningJourney.jsx # 6 learning themes in a responsive grid (Phase 4)
│   │   │   ├── BuildingInterests.jsx # Prose + project list from data/projects.js (Phase 4)
│   │   │   └── Approach.jsx   # 4 numbered principles (Phase 4)
│   │   ├── contact/
│   │   │   ├── ContactInfo.jsx # Contact cards from data/socialLinks.js + phone/location (Phase 8)
│   │   │   └── ContactForm.jsx # Accessible form + validation + EmailJS env config (Phase 8)
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
| `/about` | About | Intro + sections + closing CTA (§5) |
| `/skills` | Skills | Skill groups + focus + CTA (§5) |
| `/projects` | Projects | Preview-led cards + GitHub banner (§5) |
| `/resume` | Resume | Document-style on-page résumé + `/MarcResume.pdf` view/download; print styles scoped via `body[data-print-resume]` (§5) |
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
    │   ├── Home      → components/home/Hero + SelectedWork
    │   │               Hero → Button, SocialLinks, animations, container
    │   │               SelectedWork → Button, Link, data/projects, animations
    │   ├── About     → Page, PageHeader + components/about/ sections
    │   │               Intro → animations, LearningJourney → lucide icons,
    │   │               BuildingInterests → Link + data/projects, Approach
    │   ├── Skills    → Page, PageHeader, Card, Chip, Button, data/skills,
    │   │               data/projects, animations
    │   ├── Projects  → Page, PageHeader, ProjectCard, Button, data/projects
    │   ├── Resume    → Page, PageHeader, Button, data/skills, data/projects,
    │   │               data/socialLinks, animations; print scope via
    │   │               body[data-print-resume] + index.css @media print
    │   ├── Contact   → Page, PageHeader, components/contact/ContactInfo
    │   │               (data/socialLinks, lucide icons, animations) +
    │   │               components/contact/ContactForm (Button, formStyles,
    │   │               data/socialLinks, animations, @emailjs/browser,
    │   │               import.meta.env VITE_EMAILJS_*)
    │   └── NotFound  → Page, Button
    ├── Footer        → SocialLinks (copyright + compact socials)
    ├── BackToTop     → framer-motion AnimatePresence (sole back-to-top, Phase 9)
    └── ScrollToTop    → react-router useLocation (route scroll reset)
```

**UI primitives**

| Component | API |
| --- | --- |
| `Button({ children, to, href, variant='primary', size='md', type='button', className, ...rest })` | `to` → React Router `<Link>`; `href` → `<a>` (auto `target="_blank" rel="noreferrer noopener"` for `http*`/`mailto:*`); otherwise `<button>`. Variants: `primary`, `secondary`, `ghost`, `icon`; sizes `sm`/`md`/`lg`. CSS hover/active scale (no motion). |
| `Card({ children, hover, className, ...rest })` | Motion-forwarding surface card; optional hover border. |
| `Chip({ children, hover, className })` | Pill for tags/skills. |
| `PageHeader({ eyebrow, title, description, align='left' })` | `motion.header` with `fadeUp` entrance; the page's single `h1`. |
| `ProjectCard({ project })` | Data-driven card; schema in `PROJECT_CONTEXT.md` §11. Structure: 16:9 text-led preview cover (mono category + h2 title — screenshot fallback) → description → "Key features" list → "Technologies used" tags → conditional actions (`Live Demo` primary when `demo` exists; `View Code` secondary, or primary when no demo). Equal treatment for all projects (`featured` no longer rendered); hover = border color only. |
| `SocialLinks({ variant='default' \| 'compact' })` | Maps `data/socialLinks.js` (Email, GitHub). |
| `Page({ children, className })` | Page shell: `py-12 sm:py-14 md:py-20` + container. |
| `BackToTop()` | Floating button, visible after `scrollY > 0.8 × innerHeight` — the only back-to-top control (the Footer's duplicate button was removed in Phase 9). |

**Home page structure (Phase 3)**

```text
pages/Home.jsx            (composition only — no markup of its own)
├── components/home/Hero.jsx
│   ├── content stack (motion, staggerContainer/staggerItem):
│   │   eyebrow "// Hi, I'm Marc."
│   │   → h1 "John Marc Comeros"        (page's only h1)
│   │   → positioning (2nd-Year BSIT Student · Aspiring Web Developer)
│   │   → value proposition
│   │   → CTAs: Button to="/projects" (primary lg)
│   │           Button to="/resume"   (secondary lg)
│   │   → <SocialLinks />               (data/socialLinks.js: Email, GitHub)
│   └── visual (motion entrance, no loop):
│       <figure> → img /images/profile.jpg + figcaption availability bar
└── components/home/SelectedWork.jsx
    ├── header: eyebrow + h2 "Things I've built" + Button to="/projects"
    └── ul → 2 × Link to="/projects" cards built from data/projects.js
        (category, h3 title, description, tech chips, "View project →")
```

- **Reusable components used by Hero:** `Button`, `SocialLinks`,
  `staggerContainer`/`staggerItem` (`utils/animations.js`),
  `containerClasses` (`utils/container.js`). Selected Work additionally uses
  `viewportOnce` and raw `Link`. No new primitives, no data duplication.
- **Routing destinations:** `/projects` (Hero CTA, teaser cards, header
  button) and `/resume` (Hero secondary CTA) — all React Router `Link`s via
  `Button to`; hash anchors intentionally absent.
- **Animation implementation:** Hero = mount-time stagger only (content
  readable <0.5s) + one photo entrance (0.6s / 0.15s delay); Selected Work =
  `whileInView` + `viewportOnce` per block. No infinite loops anywhere on
  Home (photo float, pill pulse, bounce arrow removed). Reduced motion via
  `MotionConfig reducedMotion="user"` + global CSS.
- **Responsive strategy:** content-first DOM order (mobile shows text + CTAs
  before the photo — first-viewport CTA visibility at 320–430px); `md:` grid
  `[minmax(0,1.15fr)_minmax(0,0.85fr)]` with natural DOM order (content left,
  photo right); CTA row stacks below 430px (`min-[430px]:flex-row`); photo
  `w-[min(100%,clamp(220px,60vw,300px))]` mobile → `clamp(240px,24vw,340px)`
  `md+`; clamp/min-w-0/wrap everywhere, no fixed widths.

**About page structure (Phase 4)**

```text
pages/About.jsx                  (PageHeader + composition + closing CTA)
├── ui/PageHeader                (h1 "A little about me" + lead description)
├── components/about/Intro.jsx
│   ├── grid [minmax(0,1.2fr)_minmax(0,0.8fr)] (md+): 3 intro paragraphs
│   │   | portrait figure (/images/profile.jpg)
│   └── <dl> fact strip: Education / Based in / Focus (border-t, sm:3 cols)
├── components/about/LearningJourney.jsx
│   └── h2 + lead + 6 theme items (lucide icon + h3 + line), grid 1→2→3
├── components/about/BuildingInterests.jsx
│   ├── h2 + 2 prose paragraphs
│   └── "Projects so far" list → Link to="/projects" (data/projects.js)
├── components/about/Approach.jsx
│   └── h2 + lead + 4 numbered principles (aria-hidden mono numbers), sm:2 cols
└── closing <section>: h2 + statement + Button to="/projects" (primary)
                       + Button to="/skills" (secondary)
```

- **Reusable components used:** `Page`, `PageHeader`, `Button`, `fadeUp` /
  `staggerContainer` / `staggerItem` / `viewportOnce`
  (`utils/animations.js`), `containerClasses` (`utils/container.js`),
  `data/projects.js`. No new primitives, no new dependencies, no data
  duplication.
- **Routing destinations:** `/projects` (project list rows + primary CTA) and
  `/skills` (secondary CTA) — all React Router `Link`s; hash anchors
  intentionally absent.
- **Animation:** Intro = mount-time stagger; LearningJourney/Approach =
  `whileInView` + `viewportOnce` item staggers; BuildingInterests/closing =
  single `fadeUp` reveals. No loops; reduced motion via `MotionConfig` +
  global CSS. The pathname-based page fade in Layout is untouched.
- **Responsive:** content-first DOM order (intro text before portrait on
  mobile); journey grid `lg:3 → sm:2 → 1`; approach/facts `sm:2|3 → 1`;
  portrait `w-[min(100%,clamp(200px,55vw,240px))]` → `clamp(200px,20vw,250px)`
  `md+`; closing CTAs stack below 430px; `min-w-0` everywhere, no fixed
  widths.

**Skills page structure (Phase 5)**

```text
pages/Skills.jsx                 (single file — no sub-components)
├── ui/PageHeader                (h1 "Skills & Technologies" + lead)
├── intro <p>                    (coursework/experimentation/projects framing)
├── <ul> skill groups            (border-t rows, border-b on the list)
│   └── row: icon + h2 category | <ul> of Chip pills + optional note
│       (6 groups from data/skills.js — verified profile only)
├── ui/Card                      (h2 "What I'm focusing on now" + 4 learning
│                                  goals in a sm:2-col list)
└── closing <section>: h2 + prose with project titles from data/projects.js
                       + Button to="/projects" (primary)
                       + Button to="/contact" (secondary)
```

- **Reusable components used:** `Page`, `PageHeader`, `Card`, `Chip` (renders
  the `<li>`), `Button`, `fadeUp` / `staggerContainer` / `staggerItem` /
  `viewportOnce`, `data/skills.js`, `data/projects.js`. Icon names in the
  data map to `lucide-react` components via a local `iconMap` (same pattern
  as `data/socialLinks.js` + `SocialLinks`).
- **Honesty:** no percentages/ratings/levels/years; JavaScript carries a
  "basic knowledge, still learning" note; focus items are labeled learning
  goals. Unverified badge entries were removed with the badge redesign.
- **Routing destinations:** `/projects` (primary CTA) and `/contact`
  (secondary CTA) — React Router only, no hash anchors.
- **Animation:** intro `fadeUp` on mount; group rows `whileInView` +
  `viewportOnce` stagger (rows animate as blocks — icons never individually);
  focus card + closing = single `fadeUp` reveals. No loops; the pathname
  page fade in Layout is untouched.
- **Responsive:** rows stack on mobile → `md:grid-cols-[minmax(0,13rem)_minmax(0,1fr)]`;
  chips `flex-wrap`; focus grid 1→2 at `sm`; closing CTAs stack below 430px;
  `min-w-0` everywhere, no fixed widths.

**Projects page structure (Phase 6)**

```text
pages/Projects.jsx               (header + grid + GitHub banner — thin)
├── ui/PageHeader                (h1 "Things I've built" + lead)
├── grid (staggerGrid, viewportOnce): 1 col → md:grid-cols-2, gap-5/6
│   └── ui/ProjectCard × N       (staggerCard — fully data-driven)
│       ├── preview cover        aspect-[16/9] bg-surface-elevated:
│       │                        mono category (primary) + h2 title
│       ├── description          data.description
│       ├── "Key features" ul    data.features[] (Check icons, aria-hidden)
│       ├── "Technologies used"  data.technologies[] mono tags (mt-auto)
│       └── actions              demo → primary "Live Demo";
│                                github → "View Code" (secondary, primary
│                                if no demo); rendered only when present
└── GitHub banner                Button href={githubProfile} (external)
```

- **Data:** `data/projects.js` unchanged in Phase 6 — schema, URLs, and
  `featured` flags intact, so `components/home/SelectedWork.jsx` (Home
  teasers) is untouched. `featured` is retained in data but not rendered
  (both projects featured → equal cards).
- **Link safety:** `Button` `href` gives every external action
  `target="_blank"` + `rel="noreferrer noopener"`; missing `demo`/`github`
  omits the button (no empty/fake links).
- **No filter:** 2 projects, both `type: 'web'` — no meaningful category
  split, so no filter UI (per Phase 6 brief; revisit if the collection
  grows).
- **Heading hierarchy:** h1 → h2 per project (inside the preview cover);
  list `aria-label`s on features/technologies; decorative icons
  `aria-hidden`; no clickable `div`s.
- **Animation:** grid/card entrance variants unchanged; the card's
  `whileHover` y−4 lift was removed — hover is `hover:border-primary` only.
- **Screenshots:** none exist; the preview cover is the documented
  text-led fallback (upgrade path: real captures in a later phase).

**Resume page structure (Phase 7)**

```text
pages/Resume.jsx                 (single file — no new components)
├── Page (print:py-0)
├── div.resume-print             print color-scope hook
├── ui/PageHeader                h1 "My Resume" + lead referencing the PDF
├── actions (fadeUp, print:hidden)
│   ├── Button primary           View PDF → /MarcResume.pdf (target=_blank)
│   └── Button secondary         Download Resume → download attribute
│                                "JohnMarcComeros-Resume.pdf"
└── div.resume-sheet             bg-surface document sheet
    │                            (print:rounded-none print:border-0)
    ├── identity                 name <p>, positioning, contact <ul>
    ├── section Profile          h2 + suggested summary copy
    ├── section Education        h2 + border-l-2 accent (verified strings)
    ├── section Technical Skills h2 + <dl>/<dt>/<dd> from data/skills.js
    │                            (JS note inline: "(basic knowledge, ...)")
    └── section Selected Projects h2 + <article> per data/projects.js
                                 (h3 title, demo/source text links,
                                  description, mono technology list)
```

- **Data:** zero hardcoded content — `skillGroups` (6 groups / 13 skills),
  both `projects`, and `socialLinks` (Email + GitHub) are imported; one
  module-local `portfolioUrl` constant (documented URL). The old
  `technicalHighlights`/`focusAreas` arrays are deleted (issue #5).
- **PDF:** `/MarcResume.pdf` from `public/` (the byte-identical unused
  duplicate in `src/assets/` was deleted in Phase 9); Phase 7 did not
  modify the PDF and its text contents were not machine-verified in-session.
- **Print scoping:** `useEffect` sets `data-print-resume` on `<body>`
  (cleared on unmount); `@media print` rules at the end of `index.css`
  activate only for that attribute — white background, site chrome hidden
  (`header/footer/nav/button` outside `<main>` + skip link), dark
  print-safe color overrides for `.resume-print`, `.resume-sheet` background
  reset. The PageHeader is additionally wrapped in `print:hidden` (Phase 9),
  so the printed résumé starts at the identity block. Other pages' print
  output is untouched.
- **Heading hierarchy:** h1 → h2 per section → h3 per project; identity name
  is a `<p>`; section titles reuse the mono `//` eyebrow pattern.
- **Animation:** PageHeader `fadeUp` + actions `fadeUp` on mount only; the
  document body is static (no `whileInView`) so nothing prints mid-reveal.

**Contact page structure (Phase 8)**

```text
pages/Contact.jsx                 (thin composition — PageHeader + grid)
├── ui/PageHeader                 h1 "Let's work together" + honest lead
└── grid gap-6, items-start → 1 col → md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]
    ├── components/contact/ContactInfo.jsx
    │   ├── h2 "Contact information" + short lead
    │   └── motion.ul (staggerContainer/viewportOnce) → 4 × motion.li cards
    │       (staggerItem + y −2px whileHover):
    │       ├── Email   ← data/socialLinks.js (mailto, no target)
    │       ├── Phone   ← local verified tel: link
    │       ├── Location← local verified static div
    │       └── GitHub  ← data/socialLinks.js (target=_blank rel=noreferrer noopener)
    └── components/contact/ContactForm.jsx
        ├── h2 "Send me a message" + short lead
        └── motion.form (noValidate, aria-busy, aria-labelledby, fadeUp)
            ├── required-fields hint (asterisk aria-hidden + sr-only)
            ├── Name (required) / Email (required) grid sm:2
            ├── Subject (optional → template param "Portfolio inquiry")
            ├── Message (required, textarea)
            ├── persistent live region div (role="status", aria-live="polite",
            │   tabindex=-1) — always mounted so changes are announced
            └── Button submit (disabled + Loader2 spinner while sending)
```

- **Data:** contact cards derive Email + GitHub from `data/socialLinks.js`
  (single source; `mailto` shows `handle`, http(s) shows the URL minus
  protocol; a missing email entry omits the card); Phone/Location are the
  verified local entries documented in `PROJECT_CONTEXT.md` §14. Fallback
  email addresses in error messages come from the same data file.
- **Validation:** exported `validateContactForm(values)` helper (no schema
  library); per-field errors with `aria-invalid` + `aria-describedby`, red
  border via `aria-invalid:border-danger` (in `formStyles.js` `fieldBase`),
  focus to the first invalid field after commit; summary announced through
  the persistent live region.
- **Submission flow:** `isSending` guard (no duplicate submits) → disabled
  button + `aria-busy` + sr-only pending message + focus moved to the status
  region → success resets the form and shows the success status; failure
  keeps all user input and shows an error status with a `mailto:` fallback.
- **EmailJS (env-driven):** `import.meta.env.VITE_EMAILJS_SERVICE_ID`,
  `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` (values in gitignored
  `.env.local`; names documented in `.env.example`); `emailjs.send(service,
  template, params, { publicKey })`. Missing values → `isEmailJsConfigured`
  is false and submission shows an explicit not-configured error (no silent
  failure, no fake success). Template params unchanged: `name`, `email`,
  `title` (subject), `message`.
- **Responsive:** mobile stacks (cards then form) at 1 col; `md` two-column
  balance with the wider form column; card grid `auto-fit minmax(230px,1fr)`;
  full-width submit below `sm`; `min-w-0` everywhere, no fixed widths.
- **Animation:** PageHeader `fadeUp`; cards `staggerContainer`/`staggerItem`
  `whileInView` once (+ documented y −2px hover lift on the `li`); form single
  `fadeUp` `whileInView`. No loops; reduced motion via `MotionConfig` + CSS.

---

## 6. Styling Architecture

**System:** Tailwind CSS v4 through the `@tailwindcss/vite` plugin. One global
stylesheet, `src/index.css` (175 lines), imported once by `src/main.jsx`.
No `tailwind.config.js`, no Tailwind v3, no CSS preprocessors, no CSS
frameworks besides Tailwind.

**File structure:**

```text
src/index.css
├── @import "tailwindcss"      # v4 engine (no config file — zero-config)
├── @theme { … }               # semantic design tokens → generate utilities
├── @layer base                # html/body, ::selection, :focus-visible,
│                              # scrollbar (dark), prefers-reduced-motion
└── @media print               # scoped to Resume: active only while
                               # body[data-print-resume] is set (Phase 7)
```

**Authoritative design-token table:** `PROJECT_CONTEXT.md` §8 (colors, fonts,
radii, container width, animation tokens → utility mapping, typography
hierarchy, component system).

**Breakpoints:** Tailwind defaults only — sm 640 / md 768 / lg 1024 / xl 1280 /
2xl 1536. No one-off breakpoints.

**Custom CSS boundary:** allowed only for `@theme` tokens, `@layer base`
element styles, scrollbar, selection, focus-visible, reduced-motion
overrides, and the Resume-scoped `@media print` block (gated by
`body[data-print-resume]`). Everything else is utilities in JSX (avoid
`@apply` and inline styles for normal UI).

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
| Skills badges | None — Skills renders text chips (Phase 5); shields.io no longer used |
| Icons | Bundled `lucide-react` components |
| Unused (deleted Phase 9) | `ME.jpg` (root) and `src/assets/MarcResume.pdf` removed as verified-unused duplicates; git history retains them |

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
  export const skillGroups = [ { id, title, icon, skills: [{ name, note? }] } ]
                                                                   // 6 groups, 13 text skills

src/data/socialLinks.js
  export const socialLinks = [ { id, label, ariaLabel, handle, url,
      icon, external } ]                                          // 2 entries: Email, GitHub
```

**Local component data (not yet centralized):** `About` sections' `facts`
(`about/Intro.jsx`), `journey` (`about/LearningJourney.jsx`), `principles`
(`about/Approach.jsx`), `Navbar.navLinks`, `ContactInfo.contactCards`'
phone + location entries (`contact/ContactInfo.jsx` — its Email/GitHub cards
come from `data/socialLinks.js` as of Phase 8), and Resume's two constants
(`resumePdf`, `portfolioUrl` — its skills, projects, and contact links are
imported from `data/` as of Phase 7). These are
page-specific content with no counterpart in `data/` (the old `Home.techTags`,
`About.highlights`, Resume's `technicalHighlights`/`focusAreas`, and the old
`Contact.contactCards` Email/GitHub duplicates were
removed in Phases 3, 4, 7, and 8).

---

## 10. Contact / Form Architecture

```text
pages/Contact.jsx                  (composition only: PageHeader + grid)
└── components/contact/ContactForm.jsx
  state: formData { name, email, subject, message },
         errors { name?, email?, message? }, status { type, message, srOnly? }, isSending
  exported: validateContactForm(values), isEmailJsConfigured
  handleChange  → updates the field, clears that field's error,
                  clears a success status (error statuses persist)
  handleSubmit  → preventDefault + isSending guard (no duplicate submits)
                  1. validateContactForm() → per-field errors
                     ├─ invalid: set errors + summary status,
                     │           focus first invalid field (post-commit)
                     └─ valid ↓
                  2. !isEmailJsConfigured → explicit "not configured" error
                     status with a mailto: fallback (no request attempted)
                  3. isSending = true + sr-only pending status + focus status
                  4. emailjs.send(VITE_SERVICE, VITE_TEMPLATE,
                                  { name, email, title, message },
                                  { publicKey: VITE_PUBLIC_KEY })
                  5. success → reset form ONLY here + success status
                     failure → error status with mailto: fallback
                                (user input is preserved) + console.error
                                (error object only — never form contents)
  UI: <motion.form noValidate aria-busy={isSending} aria-labelledby=…>
      visible <label> per field, required markers (aria-hidden * + sr-only),
      per-field <p id="{id}-error"> wired with aria-invalid/aria-describedby,
      persistent <div role="status" aria-live="polite" tabindex="-1"> live
      region (mounts empty so every message change is announced),
      submit Button disabled + Loader2 spinner while sending
```

- Validation: manual (custom `validateContactForm`), no schema library; native
  `required`/`type=email` attributes retained for semantics while `noValidate`
  keeps messages styled, focusable, and consistent.
- Delivery: EmailJS client-side only; **configuration comes exclusively from
  environment variables** `VITE_EMAILJS_SERVICE_ID`,
  `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` (Phase 8 — the old
  hardcoded values in `src/pages/Contact.jsx` were removed). Values live in
  gitignored `.env.local` for local work; `.env.example` documents the names
  and setup; the same variables must be added to Vercel project settings
  before deploying (missing vars are detected at runtime and reported, never
  silently treated as valid). The public key is a browser-side public value —
  never put an EmailJS private key in this codebase or in documentation.
- Alternative contact paths: `mailto:` / `tel:` links and the GitHub link in
  `ContactInfo` (all from verified data).
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

- Home: Hero mount-time stagger + one photo entrance; Selected Work blocks
  use `whileInView` + `viewportOnce` (all loops removed in Phase 3).
- About (Phase 4): Intro mount-time stagger; LearningJourney/Approach item
  staggers and BuildingInterests/closing `fadeUp`, all `whileInView` once.
- Skills (Phase 5): intro `fadeUp` on mount; skill-group rows stagger
  `whileInView`; focus card + closing `fadeUp`, `whileInView` once.
- Projects: content blocks use
  `initial="hidden" whileInView="visible"`. Contact (Phase 8): PageHeader
  `fadeUp` on mount, contact cards `staggerContainer`/`staggerItem`
  `whileInView` once, form a single `fadeUp` `whileInView` (no loops).
  Resume (Phase 7) uses
  mount-time `fadeUp` on the header + actions only — its document body is
  static so nothing can be caught mid-reveal when printing.
- Route change: `motion.main key={pathname}` — 0.25s fade.
- Hover lifts: `SocialLinks`/Contact card y −2px, `BackToTop` y −3px
  (`whileTap` 0.95); project cards use border-color hover only (lift
  removed in Phase 6).
- Buttons/Chips: CSS-only hover scale/translate (no motion).
- `BackToTop`: `AnimatePresence` mount/unmount.
- CSS-only animation: `--animate-bounce-soft` keyframes — token declared but
  currently unused (the Home scroll-down link was removed in Phase 3).

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
| Environment variables | `.env.example` (names/setup, no values) + gitignored `.env.local` hold `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`; **not yet configured in Vercel** — required before the next deploy |

Do not change deployment settings without explicit instruction.

---

## 13. External Services

| Service | Used by | Purpose |
| --- | --- | --- |
| EmailJS (`@emailjs/browser`) | `components/contact/ContactForm.jsx` | Sends the contact form to Marc's inbox (config via `VITE_EMAILJS_*` env vars since Phase 8) |
| Vercel | hosting | Deployment + HTTPS + CDN |
| GitHub | repo + Projects links | Source control, profile link |
| lucide.dev icons (bundled) | all components | Icon set |

Not used: analytics, auth, CMS, CDN font services, img.shields.io (badge
images removed in Phase 5 — Skills renders text chips).

---

## 14. Environment Variables

Introduced in Phase 8 (Vite `import.meta.env.VITE_*` convention):

| Variable | Used by | Where the value lives |
| --- | --- | --- |
| `VITE_EMAILJS_SERVICE_ID` | `components/contact/ContactForm.jsx` | `.env.local` (gitignored) + Vercel project settings (pending) |
| `VITE_EMAILJS_TEMPLATE_ID` | same | same |
| `VITE_EMAILJS_PUBLIC_KEY` | same | same |

- `.env.example` documents the three names and the setup steps — **no real
  values are written there** (secrets/config stay out of the repository and
  out of documentation).
- `.env.local` is ignored by the pre-existing `*.local` rule in
  `.gitignore`; it is required for local dev/build so the form is configured.
- Deployment: add all three in Vercel → Project Settings → Environment
  Variables, then redeploy. Until then the deployed form shows its explicit
  "not configured" error with a `mailto:` fallback (missing vars are detected
  via the exported `isEmailJsConfigured` flag, never silently ignored).
- Anything shipped to the browser is public by definition — the EmailJS
  **public** key belongs on the client; an EmailJS **private** key must never
  be added here.

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

### Phase 3 (Home page, Hero & personal branding)

- Added `src/components/home/`: `Hero.jsx` (identity, positioning, value
  prop, router CTAs, photo `<figure>` + availability caption) and
  `SelectedWork.jsx` (2 data-driven project teasers → `/projects`);
  `pages/Home.jsx` is now a two-line composition of both.
- Hero redesign: single dominant `h1`, strict content hierarchy, content-first
  DOM order (mobile CTA fold fixed), secondary CTA switched from "Contact
  Me" → **View Resume** (`/resume`), visual kept to the real `profile.jpg`
  with a caption bar.
- Removed from Home: `role="status"` availability pill, hardcoded `techTags`
  row, hash-style bounce arrow, and all infinite animations (photo float, dot
  pulse, bounce).
- Untouched: routing architecture, Navbar, Footer, Button, SocialLinks, data
  files, `index.css`, all other pages.
- Validated: build ✓, SSR 20/20 checks ✓, preview + dev route/transform
  checks ✓ (details in `PROJECT_CONTEXT.md` §16).

### Phase 4 (About page UI/UX redesign)

- Rewrote `src/pages/About.jsx` as a composition of `PageHeader` + new
  `src/components/about/` sections: `Intro` (first-person introduction,
  portrait figure, Education/Based-in/Focus fact strip), `LearningJourney`
  (6 themes drawn from documented skills), `BuildingInterests` (prose +
  project list built from `data/projects.js`), `Approach` (4 numbered
  principles), plus a closing CTA section (`/projects`, `/skills`).
- Replaced the old About highlight cards and "Background & Focus" header.
- Reused `Page`, `PageHeader`, `Button`, animation utilities, and design
  tokens; no new dependencies. Navbar, Footer, routing, and all other pages
  untouched.
- Validated: `npm run build` ✓, SSR smoke render 35/35 checks ✓ (About
  structure, heading hierarchy, and 6-page regression render),
  `vite preview` `/` `/about` `/resume` → 200 ✓ (details in
  `PROJECT_CONTEXT.md` §16).

### Phase 5 (Skills page UI/UX redesign)

- Restructured `src/data/skills.js`: `skillGroups` replaces the badge schema
  — 6 groups / 13 text skills with `icon` names and an optional per-skill
  `note` (JavaScript: "basic knowledge, still learning"). All shields.io
  badge URLs removed; unverified entries (Next.js, .NET, Blazor, Vercel,
  Netlify, Render, Tailwind-as-skill) no longer displayed.
- Rewrote `src/pages/Skills.jsx`: PageHeader ("Skills & Technologies") +
  honest intro paragraph, ruled category rows (icon + h2 + `Chip` pills +
  JavaScript note), a `Card` of 4 learning goals, and a closing section
  interpolating project titles from `data/projects.js` with `/projects` and
  `/contact` CTAs.
- No new dependencies; Navbar, Footer, routing, and all other pages
  untouched.
- Validated: `npm run build` ✓, SSR smoke render 55/55 checks ✓ (Skills
  structure, honesty absences, CTA links, heading hierarchy, 7-page
  regression render), `vite preview` `/` `/about` `/skills` `/projects` →
  200 ✓ (details in `PROJECT_CONTEXT.md` §16).

### Phase 6 (Projects page UI/UX redesign)

- Redesigned `ui/ProjectCard.jsx` in place (no new components): 16:9
  text-led preview cover (mono category + h2 title — the documented
  screenshot fallback), verified description + feature list, tech tags
  aligned with Home's SelectedWork style, and conditional actions
  (`Live Demo` primary; `View Code` secondary, primary if no demo).
  Removed the per-card "Featured" star and the `whileHover` y−4 lift —
  both projects are `featured: true`, so cards render equally.
- `pages/Projects.jsx`: header copy → "Things I've built" + honest lead;
  grid logic kept (1 col → `md:grid-cols-2`); GitHub banner kept.
- `data/projects.js` **unchanged** — Home teasers unaffected. No filters
  (2 projects, both web). No new dependencies.
- Validated: `npm run build` ✓, SSR smoke render 61/61 checks ✓ (full
  data-field verification, link safety, heading hierarchy, Home teaser
  regression, 7-page render), `vite preview` `/` `/projects` `/skills`
  `/about` → 200 ✓ (details in `PROJECT_CONTEXT.md` §16).

### Phase 7 (Resume page UI/UX redesign)

- Rewrote `src/pages/Resume.jsx` as a document-style on-page résumé (single
  file, no new components): identity block (name, positioning, contact links
  from `data/socialLinks.js` + one `portfolioUrl` constant), Profile summary,
  Education (verified strings), Technical Skills as `<dl>` rows rendered from
  `data/skills.js` (all 13 skills, JavaScript honesty note inline), and
  Selected Projects rendered from `data/projects.js`. The hardcoded
  `technicalHighlights`/`focusAreas` arrays were deleted (issue #5).
- PDF actions: `View PDF` (primary, new tab) + `Download Resume` (secondary,
  `download="JohnMarcComeros-Resume.pdf"`) → `/MarcResume.pdf`. The PDF file
  itself is unchanged; its text contents were **not machine-verified** in
  this session (no PDF extraction available) — the `src/assets/` duplicate
  remains unused.
- Print styles: `@media print` block appended to `src/index.css`, active only
  while `pages/Resume.jsx` sets `data-print-resume` on `<body>` (removed on
  unmount) — white page, site chrome hidden (header/footer/nav/buttons
  outside `<main>` + skip link), dark print-safe color overrides scoped to
  `.resume-print`/`.resume-sheet`. Printing other pages is unchanged.
  In-page: actions `print:hidden`, headings `print:break-after-avoid`,
  entries `print:break-inside-avoid`, `Page print:py-0`.
- Heading hierarchy: h1 → h2 per section → h3 per project (identity is a
  `<p>`). Animation reduced to header + actions `fadeUp` on mount; document
  body static (no `whileInView`).
- No new dependencies; data files, Navbar, Footer, routing, and all other
  pages untouched.
- Validated: `npm run build` ✓, SSR smoke render 72/72 checks ✓ (Resume
  structure, both PDF links, all skills/projects/contact data, heading
  hierarchy, 7-page regression render), print CSS present in the built
  bundle, `vite preview` all 6 routes + `/MarcResume.pdf` → 200 ✓ (details
  in `PROJECT_CONTEXT.md` §16).

### Phase 8 (Contact page redesign + EmailJS env config)

- Rewrote `src/pages/Contact.jsx` as a thin composition of new
  `src/components/contact/ContactInfo.jsx` (h2 + contact-card `<ul>` derived
  from `data/socialLinks.js` for Email/GitHub plus the verified phone and
  location entries, with `target="_blank"`/`rel="noreferrer noopener"` only on
  the external GitHub link) and `src/components/contact/ContactForm.jsx`
  (h2 + form card). New PageHeader copy: "Let's work together" with an honest
  BSIT-student/aspiring-developer lead.
- Form overhaul: visible labels + required markers (aria-hidden `*` with an
  sr-only "an asterisk" hint line), optional subject, exported
  `validateContactForm` helper, per-field errors wired with `aria-invalid` +
  `aria-describedby`, focus to the first invalid field after commit, a
  persistent `role="status"`/`aria-live="polite"`/`tabindex="-1"` live region
  for pending/success/error messages, `aria-busy` on the form, disabled
  submit + Loader2 spinner while sending (with focus moved to the status
  region so keyboard focus is never dropped), success-only form reset,
  input preservation on failure, duplicate-submit guard, and a `mailto:`
  fallback in every error message.
- EmailJS configuration moved out of source into
  `VITE_EMAILJS_SERVICE_ID` / `VITE_EMAILJS_TEMPLATE_ID` /
  `VITE_EMAILJS_PUBLIC_KEY` (issue #22): `.env.local` (gitignored via the
  existing `*.local` rule) holds the real values locally, `.env.example`
  documents the names/setup with no values, and missing variables surface as
  an explicit not-configured error instead of a silent failure (issue #15 and
  #22 both resolved).
- `src/utils/formStyles.js`: `fieldBase` gained
  `aria-invalid:border-danger` / `aria-invalid:focus:border-danger` (only the
  Contact form uses these classes) so error fields get a red border without
  losing the global focus ring.
- No new dependencies; Navbar, Footer, routing, data files, résumé/PDF, and
  all other pages untouched.
- Validated: `npm run build` ✓ (2136 modules, CSS 33.99 kB / gzip 7.28 kB),
  SSR smoke render **73/73 checks ✓** (Contact structure, contact data, link
  safety, labels/required/autocomplete, live region, validation-helper unit
  checks, 7-page regression, zero React warnings) + a **missing-env run
  (72/72 ✓)** after temporarily moving `.env.local` aside (restored and
  verified), built-bundle env-inlining + CSS order checks, and
  `vite preview` direct loads of all 6 routes + an unknown route → 200 ✓
  (details in `PROJECT_CONTEXT.md` §16). **Not tested:** a real EmailJS
  delivery and any interactive/visual browser behavior (no browser
  automation) — deferred to QA; **Vercel env vars still need to be added**
  before the next deploy.

### Phase 9 (portfolio-wide UI/UX audit + focused fixes)

- Portfolio-wide audit (design system, layout/nav, all seven pages and
  their components, animation, responsive/a11y/interaction/print/
  performance) followed by six focused fixes:
  - `components/layout/Footer.jsx` — the duplicate back-to-top button (and
    its `scrollToTop`/`ArrowUp` code) removed; the floating `BackToTop` is
    now the sole control (issues #5/#27).
  - `components/layout/Navbar.jsx` — mobile drawer focus management (focus
    moves to the first link on open, restored to the visible toggle or
    `main#main-content` on close), Tab/Shift+Tab wrapped within toggle +
    drawer links while open, and `max-h-[calc(100dvh-4rem)] overflow-y-auto`
    so the menu scrolls on short/landscape phone viewports.
  - `pages/Resume.jsx` — PageHeader wrapped in `print:hidden` so a printed
    résumé starts at the identity block instead of site chrome.
  - `public/favicon.svg` — colors aligned to tokens (#60a5fa on #0b0f17;
    issue #10).
  - `src/index.css` — never-loaded `"Fira Code"` removed from `--font-mono`
    (issue #8; rendered output unchanged).
  - Deleted verified-unused duplicates `ME.jpg` and
    `src/assets/MarcResume.pdf` (issue #24); empty `src/assets/` removed
    (both files remain in git history).
- No new dependencies; routing, data files, the PDF, EmailJS
  configuration, and all page content/copy untouched.
- Validated: `npm run build` ✓ (2136 modules, CSS 34.32 kB / gzip 7.31 kB,
  no warnings), SSR smoke render **112/112 checks ✓** across all 7 routes
  (structure, landmarks, single h1, back-to-top dedupe regression, zero
  React warnings), `vite preview` → 7 routes + `/MarcResume.pdf` +
  `/favicon.svg` + `/images/profile.jpg` all 200 ✓, built-output audit
  (no "Fira Code" in CSS, print block intact, `100dvh`/`print:hidden`
  utilities emitted, token favicon in dist, no `ME.jpg` in dist), and a
  diff review of the 7 changed files (no secrets, no data/PDF changes —
  details in `PROJECT_CONTEXT.md` §16). **Not tested in a real browser:**
  the new drawer focus behavior, actual Ctrl+P print output, and visual
  breakpoints (no browser automation) — deferred to QA.
