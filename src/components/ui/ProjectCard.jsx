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
    image,
  } = project

  return (
    <motion.article
      className="flex h-full flex-col overflow-hidden rounded-lg border border-border-subtle bg-surface transition-colors duration-200 hover:border-primary"
      variants={staggerCard}
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-border-subtle bg-surface-elevated">
        {image ? (
          <>
            <img
              src={image}
              alt={`${title} — project preview`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/85 to-transparent p-4">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary">
                {category}
              </p>
              <h2 className="text-balance text-base font-bold leading-tight tracking-[-0.01em] text-foreground">
                {title}
              </h2>
            </div>
          </>
        ) : (
          <div className="relative flex h-full flex-col justify-between gap-4 p-5 sm:p-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, var(--color-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--color-primary) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
            <p className="relative font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary">
              {category}
            </p>
            <div className="relative flex items-end justify-between gap-3">
              <h2 className="min-w-0 text-balance text-[clamp(1.25rem,2.6vw,1.6rem)] font-bold leading-tight tracking-[-0.01em] text-foreground">
                {title}
              </h2>
              <span
                aria-hidden="true"
                className="shrink-0 font-mono text-3xl font-bold text-primary/25"
              >
                {title.charAt(0)}
              </span>
            </div>
          </div>
        )}
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
