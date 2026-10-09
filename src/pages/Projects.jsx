import { motion } from 'framer-motion'
import { Github } from 'lucide-react'
import Page from '../components/layout/Page'
import PageHeader from '../components/ui/PageHeader'
import ProjectCard from '../components/ui/ProjectCard'
import Button from '../components/ui/Button'
import { projects, githubProfile } from '../data/projects'
import { viewportOnce, staggerGrid, fadeUp } from '../utils/animations'

const gridClasses =
  projects.length === 1
    ? 'mx-auto grid max-w-[48rem] grid-cols-1 gap-5'
    : 'grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6'

function Projects() {
  return (
    <Page>
      <PageHeader
        eyebrow="Projects"
        title="Things I've built"
        description="A collection of projects I've worked on while learning web development, exploring new technologies, and building practical applications."
      />

      <motion.div
        className={gridClasses}
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
        className="mt-10 flex flex-col items-stretch gap-5 rounded-lg border border-border-subtle bg-surface p-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        <p className="text-[clamp(1.05rem,2.5vw,1.25rem)] font-semibold text-foreground">
          Want to see more code and repositories?
        </p>
        <Button href={githubProfile} variant="primary">
          <Github size={16} aria-hidden="true" /> Visit My GitHub Profile
        </Button>
      </motion.div>
    </Page>
  )
}

export default Projects
