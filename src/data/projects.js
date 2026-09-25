export const githubProfile = 'https://github.com/mxrckyyy'

export const projects = [
  {
    id: 'student-expense-tracker',
    title: 'Student Expense Tracker',
    category: 'Web Application',
    type: 'web',
    description:
      'A web application designed to help students track daily expenses, manage category budgets, and analyze spending habits.',
    technologies: ['React', 'JavaScript', 'CSS', 'Supabase'],
    features: [
      'Expense logging & categorization',
      'Budget threshold tracking',
      'Persistent data storage with Supabase',
      'Clean responsive UI',
    ],
    github: 'https://github.com/mxrckyyy/StudentExpenseTracker',
    demo: '',
    featured: true,
  },
  {
    id: 'study-notes',
    title: 'Study Notes Manager',
    category: 'Productivity App',
    type: 'web',
    description:
      'A lightweight web app for organizing course notes, tagging subjects, and managing academic study sessions.',
    technologies: ['React', 'JavaScript', 'CSS'],
    features: [
      'Subject/topic tagging',
      'Rich text note creation',
      'Search and filter functionality',
      'Local storage / cloud sync',
    ],
    github: 'https://github.com/mxrckyyy/StudyNotes',
    demo: '',
    featured: true,
  },
  {
    id: 'orasfy',
    title: 'Orasfy — Time & Productivity App',
    category: 'Web Utility',
    type: 'web',
    description:
      'A focused productivity tool incorporating customizable timers and task session tracking for student workflows.',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    features: [
      'Custom timer intervals',
      'Task logging during sessions',
      'Minimalist dark interface',
    ],
    github: 'https://github.com/mxrckyyy/Orasfy',
    demo: '',
    featured: true,
  },
  {
    id: 'inventory-system',
    title: 'Inventory Management System',
    category: 'Database & Backend Application',
    type: 'database',
    description:
      'An inventory management solution built to handle product stock levels, transaction logging, and database updates.',
    technologies: ['C#', 'MySQL'],
    features: [
      'CRUD operations for inventory items',
      'Relational database integration',
      'Stock level alerts',
    ],
    github: 'https://github.com/mxrckyyy/Inventory-System',
    demo: '',
    featured: false,
  },
]

export default projects
