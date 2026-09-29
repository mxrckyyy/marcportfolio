import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import ProjectCard from '../ui/ProjectCard'
import Button from '../ui/Button'
import { projects, githubProfile } from '../../data/projects'
import { viewportOnce, staggerGrid, fadeUp } from '../../utils/animations'

const filters = [
  { id: 'all', label: 'All' },
  { id: 'featured', label: 'Featured' },
  { id: 'web', label: 'Web Apps' },
]

function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')

  const visibleProjects = projects.filter((project) => {
    if (activeFilter === 'featured') return project.featured
    if (activeFilter === 'web') return project.type === 'web'
    return true
  })

  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHeading
          eyebrow="Projects"
          title="Featured Projects"
          description="Practical Applications Built with Modern Web Tech & Databases"
        />

        <div className="projects__filters" role="group" aria-label="Filter projects">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={`projects__filter ${
                activeFilter === filter.id ? 'is-active' : ''
              }`}
              aria-pressed={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {visibleProjects.length === 0 ? (
          <motion.p
            className="projects__empty"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            No projects in this filter yet.
          </motion.p>
        ) : (
          <motion.div
            className="projects__grid"
            key={activeFilter}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={staggerGrid}
          >
            {visibleProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        )}

        <motion.div
          className="projects__banner"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <p className="projects__banner-text">
            Want to see more code and repositories?
          </p>
          <Button href={githubProfile} variant="primary">
            <Github size={16} aria-hidden="true" /> Visit My GitHub Profile
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
