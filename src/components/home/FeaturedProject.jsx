import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Github } from 'lucide-react'
import Button from '../ui/Button'
import { projects } from '../../data/projects'
import { viewportOnce, fadeUp } from '../../utils/animations'
import { containerClasses } from '../../utils/container'

function FeaturedProject() {
  const project = projects.find((p) => p.id === 'fastrev')
  if (!project) return null

  return (
    <section className="border-t border-border py-12 md:py-16">
      <div className={containerClasses}>
        <motion.div
          className="mb-6 flex flex-col gap-1"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary before:text-muted before:content-['//_']">
            featured project
          </p>
          <h2 className="text-[clamp(1.35rem,3vw,1.75rem)] font-bold tracking-[-0.02em] text-foreground">
            FastRev
          </h2>
        </motion.div>

        <motion.article
          className="grid grid-cols-1 gap-6 overflow-hidden rounded-lg border border-border bg-surface shadow-sm md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <div className="relative aspect-[16/9] overflow-hidden border-b border-border-subtle bg-surface-elevated md:aspect-auto md:border-b-0 md:border-r">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, var(--color-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--color-primary) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
            <div className="relative flex h-full flex-col justify-between gap-4 p-6">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary">
                {project.category}
              </p>
              <h3 className="text-balance text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight tracking-[-0.02em] text-foreground">
                {project.title}
              </h3>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-6">
            <p className="text-[1.05rem] leading-relaxed text-muted">
              {project.description}
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-sm border border-border bg-surface-elevated px-2 py-0.5 text-xs text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-wrap gap-3">
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
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  )
}

export default FeaturedProject