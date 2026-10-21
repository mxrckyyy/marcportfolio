import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import Page from '../components/layout/Page'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import { projects } from '../data/projects'
import { viewportOnce, fadeUp } from '../utils/animations'
import { motion } from 'framer-motion'

const caseStudies = {
  fastrev: {
    overview:
      'FastRev is a free spaced-repetition flashcard app for students. It lets a student paste or import study material (PDF, images, documents, or text), generate flashcards with AI, and review them daily using FSRS scheduling with progress analytics.',
    goals: [
      'Make spaced repetition accessible and free for students.',
      'Support importing real study material instead of manual card entry.',
      'Track retention, streaks, and due forecasts to motivate daily review.',
    ],
    contribution:
      'I designed and built the application end to end: the React interface, Supabase authentication and per-user data with Row Level Security, AI-assisted card generation from imported files, FSRS review flow, and the analytics dashboard.',
    functionality: [
      'AI flashcard generation from pasted notes and imported files (PDF, images, .docx, text).',
      'FSRS spaced-repetition reviews rated Again / Hard / Good / Easy.',
      'Deck organization with per-user data protected by Row Level Security.',
      'Progress analytics: retention rate, streaks, due forecasts, and review charts.',
    ],
    improvements: [
      'Add automated tests for the review and import flows.',
      'Add offline support for review sessions.',
      'Capture and display real project screenshots.',
    ],
  },
  'inventory-system': {
    overview:
      'Inventory Management System is a real-time inventory platform with role-based access control, automated SKU generation, localized stock valuation in Philippine Peso, and client-side Excel report exports.',
    goals: [
      'Give small teams a simple way to track stock and value in real time.',
      'Separate admin and viewer permissions safely.',
      'Export reports without a backend reporting service.',
    ],
    contribution:
      'I built the React frontend and integrated Supabase for authentication and data, including role-based access, real-time stock valuation, low-stock alerts, and client-side .xlsx export.',
    functionality: [
      'Role-Based Access Control (Admin/Viewer) via Supabase Auth.',
      'Responsive drawer menu with adaptive data tables.',
      'Real-time stock valuation and low-stock alerts formatted in Philippine Peso (₱).',
      'Client-side Excel (.xlsx) report generation.',
    ],
    improvements: [
      'Add automated tests for RBAC and export flows.',
      'Add pagination and search to large inventory tables.',
      'Capture and display real project screenshots.',
    ],
  },
  'gasto-buster': {
    overview:
      'Gasto Buster is a personal finance and budget tracker that helps categorize expenses and income and provides visual budget analytics.',
    goals: [
      'Make daily expense tracking quick and readable.',
      'Give a clear visual summary of spending by category.',
      'Work well on mobile devices.',
    ],
    contribution:
      'I built the React interface for tracking, categorizing, and visualizing personal finances, with a responsive layout that works across screen sizes.',
    functionality: [
      'Categorized expense and income tracking.',
      'Interactive budget analytics and visual summaries.',
      'Responsive, modern user interface.',
    ],
    improvements: [
      'Add automated tests for tracking and analytics.',
      'Add data export and backup options.',
      'Capture and display real project screenshots.',
    ],
  },
}

function ProjectCaseStudy() {
  const { slug } = useParams()
  const project = projects.find((p) => p.id === slug)
  const study = caseStudies[slug]

  if (!project || !study) {
    return (
      <Page>
        <PageHeader
          align="center"
          eyebrow="404"
          title="Project Not Found"
          description="The project you are looking for doesn't exist or has been moved."
        />
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button to="/projects" variant="primary">
            Back to Projects
          </Button>
          <Button to="/" variant="secondary">
            Back to Home
          </Button>
        </div>
      </Page>
    )
  }

  return (
    <Page>
      <PageHeader
        eyebrow="Case Study"
        title={project.title}
        description={project.description}
      />

      <motion.section
        className="mt-2 flex flex-wrap gap-3"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        {project.demo && (
          <Button href={project.demo} variant="primary" size="sm">
            <ExternalLink size={16} aria-hidden="true" /> Live Demo
          </Button>
        )}
        {project.github && (
          <Button href={project.github} variant="secondary" size="sm">
            <Github size={16} aria-hidden="true" /> Source Code
          </Button>
        )}
        <Button to="/projects" variant="ghost" size="sm">
          <ArrowLeft size={16} aria-hidden="true" /> Back to Projects
        </Button>
      </motion.section>

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="flex flex-col gap-8">
          <section>
            <h2 className="text-lg font-bold tracking-[-0.01em] text-foreground">
              Overview
            </h2>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-muted">
              {study.overview}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold tracking-[-0.01em] text-foreground">
              Goals
            </h2>
            <ul className="mt-3 flex flex-col gap-2">
              {study.goals.map((g) => (
                <li key={g} className="flex items-start gap-2 text-sm leading-relaxed text-muted">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  {g}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold tracking-[-0.01em] text-foreground">
              My contribution
            </h2>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-muted">
              {study.contribution}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold tracking-[-0.01em] text-foreground">
              Key functionality
            </h2>
            <ul className="mt-3 flex flex-col gap-2">
              {study.functionality.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm leading-relaxed text-muted">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold tracking-[-0.01em] text-foreground">
              Limitations and future improvements
            </h2>
            <ul className="mt-3 flex flex-col gap-2">
              {study.improvements.map((i) => (
                <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-muted">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  {i}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="rounded-lg border border-border bg-surface p-6">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary before:text-muted before:content-['//_']">
              category
            </p>
            <p className="mt-2 text-sm font-semibold text-foreground">{project.category}</p>
            <p className="mt-4 font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary before:text-muted before:content-['//_']">
              technologies
            </p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-sm border border-border bg-surface-elevated px-2 py-0.5 text-xs text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Page>
  )
}

export default ProjectCaseStudy