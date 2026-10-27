import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import Page from '../components/layout/Page'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import NotFound from './NotFound'
import { projects } from '../data/projects'
import { viewportOnce, fadeUp } from '../utils/animations'
import { motion } from 'framer-motion'

const caseStudies = {
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
    return <NotFound />
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