export const githubProfile = 'https://github.com/mxrckyyy'

export const projects = [
  {
    id: 'gasto-buster',
    title: 'Gasto Buster',
    category: 'Full-Stack Financial & Budget Tracker',
    type: 'web',
    description:
      'A modern web application built to streamline personal finance management, track daily expenses, categorize transactions, and provide visual budget analytics.',
    technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Vercel'],
    features: [
      'Categorized Expense & Income Tracking',
      'Interactive Budget Analytics & Visual Summaries',
      'Responsive, Modern User Interface',
    ],
    demo: 'https://gastobuster.vercel.app',
    github: 'https://github.com/mxrckyyy/Gasto-Buster',
    featured: true,
  },
  {
    id: 'inventory-system',
    title: 'Inventory Management System',
    category: 'Full-Stack Web App',
    type: 'web',
    description:
      'Full-stack real-time inventory platform featuring role-based access control (Admin/Viewer), automated SKU generation, localized financial analytics (₱), and native .xlsx Excel exports.',
    technologies: [
      'React',
      'Vite',
      'Supabase',
      'Tailwind CSS',
      'SheetJS',
      'Vercel',
    ],
    features: [
      'Role-Based Access Control (RBAC) via Supabase Auth',
      'Responsive drawer menu with 100% full-width adaptive data tables',
      'Real-time stock valuation & low-stock alerts formatted in Philippine Peso (₱)',
      'Client-side Excel (.xlsx) report generation',
    ],
    demo: 'https://inventory-system-pi-self.vercel.app',
    github: 'https://github.com/mxrckyyy/InventorySystem',
    featured: true,
  },
  {
    id: 'fastrev',
    title: 'FastRev',
    category: 'Full-Stack AI Flashcard App',
    type: 'web',
    description:
      'A free spaced-repetition flashcard app for students — paste or import study material (PDF, images, documents, or text), turn it into flashcards with AI, and review daily with FSRS scheduling and progress analytics.',
    technologies: [
      'React',
      'Vite',
      'Tailwind CSS',
      'Supabase',
      'ts-fsrs',
      'Recharts',
      'Vercel',
    ],
    features: [
      'AI flashcard generation from pasted notes and imported files (PDF, images, .docx, text)',
      'FSRS spaced-repetition reviews rated Again / Hard / Good / Easy',
      'Deck organization with Supabase Auth and per-user data protected by Row Level Security',
      'Progress analytics — retention rate, streaks, due forecasts, and review charts',
    ],
    demo: 'https://fast-rev-chi.vercel.app',
    github: 'https://github.com/mxrckyyy/FastRev',
    featured: true,
  },
]

export default projects
