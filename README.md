# John Marc Comeros — Web Developer Portfolio

A modern, responsive, job-focused web developer portfolio built with **React**, **Vite**, **Framer Motion**, and **Lucide React**.

## 🚀 Live Demo

- **Portfolio URL**: [Add your live Vercel URL here after deployment]
- **GitHub Repository**: https://github.com/mxrckyyy/marcportfolio

## 🛠️ Tech Stack & Tools

- **Frontend**: React, JavaScript (JSX), CSS3, Framer Motion, Lucide React
- **Build Tool**: Vite
- **Deployment**: Vercel

## 📁 Key Features

- **Responsive Layout**: Designed mobile-first, supporting viewports down to 320px.
- **Dark-First Design Tokens**: Custom CSS variable design system with subtle glow states and glassmorphism navbar.
- **Interactive Projects Showcase**: Categorized cards featuring open-source GitHub projects with feature breakdowns and code links.
- **Resume Access**: Instant preview and download support for `MarcResume.pdf`.
- **Contact Integration**: Accessible contact cards and direct messaging form with auto-fallback handling.

## 💻 Local Development Setup

```bash
# Clone the repository
git clone https://github.com/mxrckyyy/marcportfolio.git

# Navigate to project directory
cd marcportfolio

# Install dependencies
npm install

# Run local development server
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

## 📂 Project Structure

```
src/
├── components/
│   ├── layout/        # Navbar, Footer
│   ├── sections/      # Hero, About, Skills, Projects, Resume, Contact
│   └── ui/            # Button, SectionHeading, ProjectCard, SocialLinks, BackToTop
├── data/              # projects.js, skills.js, socialLinks.js
├── utils/             # animations.js (shared Framer Motion variants)
├── App.jsx
├── main.jsx
└── index.css          # dark-mode design tokens
public/
├── images/profile.jpg # profile photo
├── favicon.svg
└── MarcResume.pdf     # downloadable resume
```

See `PORTFOLIO_CONTEXT.txt` for the full blueprint and 10-phase build plan.
