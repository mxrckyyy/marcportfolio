import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { projects } from '../../data/projects'
import { viewportOnce, fadeUp } from '../../utils/animations'

function BuildingInterests() {
  return (
    <section className="mt-14 md:mt-16">
      <h2 className="text-lg font-bold tracking-[-0.01em] text-foreground">
        What I enjoy building
      </h2>

      <motion.div
        className="mt-7 grid grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        <div className="flex min-w-0 flex-col gap-4 text-[1.05rem] leading-relaxed text-muted">
          <p>
            I like building things that are genuinely useful: responsive
            websites that hold up on a phone, interfaces that respond clearly
            to a click or a keystroke, and small tools that make an everyday
            task easier — tracking a budget, keeping stock in check.
          </p>
          <p>
            I care about how an interface feels, not just whether it works. A
            big part of my learning has been figuring out how to make a screen
            readable at a glance — and keeping the code behind it tidy enough
            that the next change doesn&apos;t hurt.
          </p>
        </div>

        <div className="min-w-0">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-muted before:text-muted before:content-['//_']">
            Projects so far
          </p>
          <ul className="mt-3">
            {projects.map((project) => (
              <li className="border-t border-border-subtle" key={project.id}>
                <Link
                  to="/projects"
                  className="group flex items-center justify-between gap-4 py-3.5"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
                      {project.title}
                    </span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-muted">
                      {project.technologies.join(' · ')}
                    </span>
                  </span>
                  <ArrowRight
                    size={14}
                    className="shrink-0 text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  )
}

export default BuildingInterests
