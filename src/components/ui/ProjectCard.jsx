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

  return (
    <motion.article
      className="project-card"
      variants={staggerCard}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="project-card__header">
        <span className="project-card__category">{category}</span>
        {featured && (
          <span className="project-card__featured">
            <Star size={12} aria-hidden="true" /> Featured
          </span>
        )}
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__description">{description}</p>

        {features.length > 0 && (
          <ul className="project-card__features">
            {features.map((feature) => (
              <li key={feature}>
                <Check size={14} aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {technologies.length > 0 && (
          <ul className="project-card__tags" aria-label="Technologies used">
            {technologies.map((tech) => (
              <li key={tech} className="project-card__tag">
                [{tech}]
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="project-card__links">
        {github && (
          <Button href={github} variant="ghost" className="project-card__btn">
            <Github size={16} aria-hidden="true" /> View Code
          </Button>
        )}
        {demo && (
          <Button
            href={demo}
            variant="ghost"
            className="project-card__btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={16} aria-hidden="true" /> Live Demo
          </Button>
        )}
      </div>
    </motion.article>
  )
}

export default ProjectCard
