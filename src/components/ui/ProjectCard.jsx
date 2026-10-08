import { motion } from 'framer-motion'
import { Github, ExternalLink, Star, Check } from 'lucide-react'
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
    featured,
  } = project

  const cardClasses = featured
    ? 'flex flex-col gap-5 rounded-lg border border-primary/[0.35] bg-[linear-gradient(180deg,rgba(96,165,250,0.12),transparent_45%)] bg-surface p-[clamp(1.5rem,4vw,2.25rem)] transition-colors duration-200 hover:border-primary'
    : 'flex flex-col gap-5 rounded-lg border border-border-subtle bg-surface p-6 transition-colors duration-200 hover:border-primary'

  const titleClasses = featured
    ? 'text-[clamp(1.3rem,3vw,1.6rem)] font-bold tracking-[-0.01em] text-foreground'
    : 'text-lg font-bold tracking-[-0.01em] text-foreground'

  const descriptionClasses = featured
    ? 'mt-2 text-base leading-relaxed text-muted'
    : 'mt-2 text-[0.95rem] leading-relaxed text-muted'

  return (
    <motion.article
      className={cardClasses}
      variants={staggerCard}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="rounded-full border border-border-subtle bg-surface-elevated px-2.5 py-1 font-mono text-xs uppercase tracking-[0.04em] text-muted">
          {category}
        </span>
        {featured && (
          <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-[0.04em] text-primary">
            <Star size={12} className="fill-current" aria-hidden="true" />{' '}
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <h2 className={titleClasses}>{title}</h2>
        <p className={descriptionClasses}>{description}</p>

        {features.length > 0 && (
          <ul className="mt-4 flex flex-col gap-[0.45rem]">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-sm leading-[1.45] text-muted"
              >
                <Check size={14} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {technologies.length > 0 && (
          <ul
            className="mt-[1.15rem] flex flex-wrap gap-1.5"
            aria-label="Technologies used"
          >
            {technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-sm border border-border-subtle bg-surface-elevated px-2.5 py-1 font-mono text-xs text-muted"
              >
                [{tech}]
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-auto flex flex-wrap gap-2.5">
        {github && (
          <Button href={github} variant="secondary" size="sm">
            <Github size={16} aria-hidden="true" /> View Code
          </Button>
        )}
        {demo && (
          <Button href={demo} variant="secondary" size="sm">
            <ExternalLink size={16} aria-hidden="true" /> Live Demo
          </Button>
        )}
      </div>
    </motion.article>
  )
}

export default ProjectCard
