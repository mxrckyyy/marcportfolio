import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import { projects } from '../../data/projects'
import { staggerContainer, staggerItem, viewportOnce } from '../../utils/animations'
import { containerClasses } from '../../utils/container'

function SelectedWork() {
  return (
    <section className="border-t border-border-subtle py-12 md:py-16">
      <div className={containerClasses}>
        <motion.div
          className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div className="min-w-0" variants={staggerItem}>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary before:text-muted before:content-['//_']">
              selected work
            </p>
            <h2 className="mt-2 text-[clamp(1.35rem,3vw,1.75rem)] font-bold tracking-[-0.02em] text-foreground">
              Things I&apos;ve built
            </h2>
          </motion.div>
          <motion.div className="shrink-0 self-start sm:self-end" variants={staggerItem}>
            <Button to="/projects" variant="secondary" size="md">
              All projects <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </motion.div>
        </motion.div>

        <motion.ul
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          {projects.map((project) => (
            <motion.li key={project.id} className="min-w-0" variants={staggerItem}>
              <Link
                to="/projects"
                className="group flex h-full flex-col gap-3 rounded-lg border border-border-subtle bg-surface p-5 transition-colors duration-200 hover:border-primary md:p-6"
              >
                <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
                  {project.category}
                </p>
                <h3 className="text-lg font-bold text-foreground transition-colors duration-200 group-hover:text-primary">
                  {project.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-sm border border-border-subtle bg-surface-elevated px-2 py-0.5 text-xs text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  View project
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

export default SelectedWork
