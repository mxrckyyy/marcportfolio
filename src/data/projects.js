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
]

export default projects
