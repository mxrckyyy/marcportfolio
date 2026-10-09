import { motion } from 'framer-motion'
import { Github, ExternalLink, Check } from 'lucide-react'
import Button from './Button'
import { staggerCard } from '../../utils/animations'

function ProjectCard({ project }) {
  const {
    title,
    category,
    description,
    technologies = [],
    features = [],
    github,
    demo,
  } = project

  return (
    <motion.article
      className="flex h-full flex-col overflow-hidden rounded-lg border border-border-subtle bg-surface transition-colors duration-200 hover:border-primary"
      variants={staggerCard}
    >
      <div className="flex aspect-[16/9] flex-col justify-between gap-4 border-b border-border-subtle bg-surface-elevated p-5 sm:p-6">
        <p className="min-w-0 font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary">
          {category}
        </p>
        <h2 className="min-w-0 text-balance text-[clamp(1.25rem,2.6vw,1.6rem)] font-bold leading-tight tracking-[-0.01em] text-foreground">
          {title}
        </h2>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <p className="text-[0.95rem] leading-relaxed text-muted">
          {description}
        </p>

        {features.length > 0 && (
          <ul
            className="flex flex-col gap-2"
            aria-label="Key features"
          >
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm leading-[1.45] text-muted"
              >
                <Check
                  size={14}
                  className="mt-0.5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {technologies.length > 0 && (
          <ul
            className="mt-auto flex flex-wrap gap-1.5 pt-1"
            aria-label="Technologies used"
          >
            {technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-sm border border-border-subtle bg-surface-elevated px-2 py-0.5 text-xs text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-2.5">
          {demo && (
            <Button href={demo} variant="primary" size="sm">
              <ExternalLink size={16} aria-hidden="true" /> Live Demo
            </Button>
          )}
          {github && (
            <Button
              href={github}
              variant={demo ? 'secondary' : 'primary'}
              size="sm"
            >
              <Github size={16} aria-hidden="true" /> View Code
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default ProjectCard
