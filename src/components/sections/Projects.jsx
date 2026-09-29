import { motion } from 'framer-motion'
import { Github } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import ProjectCard from '../ui/ProjectCard'
import Button from '../ui/Button'
import { projects, githubProfile } from '../../data/projects'
import { viewportOnce, staggerGrid, fadeUp } from '../../utils/animations'

function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHeading
          eyebrow="Projects"
          title="Featured Projects"
          description="Practical Applications Built with Modern Web Tech & Databases"
        />

        <motion.div
          className={`projects__grid${
            projects.length === 1 ? ' projects__grid--single' : ''
          }`}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerGrid}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

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
