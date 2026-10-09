import { motion } from 'framer-motion'
import {
  ArrowRight,
  BookOpen,
  Database,
  GitBranch,
  Layers,
  Palette,
  Terminal,
} from 'lucide-react'
import Page from '../components/layout/Page'
import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import Chip from '../components/ui/Chip'
import Button from '../components/ui/Button'
import { skillGroups } from '../data/skills'
import { projects } from '../data/projects'
import { viewportOnce, fadeUp, staggerContainer, staggerItem } from '../utils/animations'

const iconMap = {
  BookOpen,
  Database,
  GitBranch,
  Layers,
  Palette,
  Terminal,
}

const focusAreas = [
  'Strengthening my JavaScript fundamentals',
  'Building more responsive React interfaces',
  'Improving accessibility and UI/UX decisions in what I build',
  'Practicing database integration through my projects',
]

function phraseTitles(titles) {
  if (titles.length <= 1) return titles.join('')
  return `${titles.slice(0, -1).join(', ')} and ${titles[titles.length - 1]}`
}

function Skills() {
  const projectTitles = phraseTitles(projects.map((project) => project.title))

  return (
    <Page>
      <PageHeader
        eyebrow="Skills"
        title="Skills & Technologies"
        description="The technologies and tools I'm exploring as I learn to build practical web applications and thoughtful user experiences."
      />

      <motion.p
        className="max-w-[640px] text-[1.05rem] leading-relaxed text-muted"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        My skills are growing through coursework, experimentation, and the
        projects I build. What follows is a current snapshot — what I&apos;ve
        actually used so far, where I&apos;m still a beginner, and what
        I&apos;m focusing on next.
      </motion.p>

      <motion.ul
        className="mt-9 border-b border-border-subtle"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {skillGroups.map((group) => {
          const Icon = iconMap[group.icon] ?? BookOpen
          const notes = group.skills.filter((skill) => skill.note)

          return (
            <motion.li
              className="border-t border-border-subtle py-5 md:grid md:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] md:items-start md:gap-8"
              key={group.id}
              variants={staggerItem}
            >
              <div className="flex min-w-0 items-start gap-2.5">
                <Icon
                  size={18}
                  className="mt-1 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <h2 className="min-w-0 text-base font-bold leading-snug text-foreground">
                  {group.title}
                </h2>
              </div>

              <div className="mt-3 min-w-0 md:mt-0">
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Chip key={skill.name}>{skill.name}</Chip>
                  ))}
                </ul>
                {notes.length > 0 && (
                  <p className="mt-2.5 text-xs leading-relaxed text-muted">
                    {notes
                      .map((skill) => `${skill.name}: ${skill.note}`)
                      .join(' · ')}
                  </p>
                )}
              </div>
            </motion.li>
          )
        })}
      </motion.ul>

      <Card
        className="mt-14 p-6 sm:p-8 md:mt-16"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        <h2 className="text-lg font-bold tracking-[-0.01em] text-foreground">
          What I&apos;m focusing on now
        </h2>
        <p className="mt-2.5 max-w-[560px] text-[1.05rem] leading-relaxed text-muted">
          Learning goals in progress — not finished achievements.
        </p>
        <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          {focusAreas.map((area) => (
            <li
              className="flex min-w-0 items-start gap-2.5 text-sm leading-relaxed text-muted"
              key={area}
            >
              <span
                className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                aria-hidden="true"
              />
              {area}
            </li>
          ))}
        </ul>
      </Card>

      <motion.section
        className="mt-14 border-t border-border-subtle pt-12 md:mt-16 md:pt-16"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        <h2 className="text-lg font-bold tracking-[-0.01em] text-foreground">
          See it in context
        </h2>
        <p className="mt-3 max-w-[640px] text-[1.05rem] leading-relaxed text-muted">
          The clearest way to judge them is in what I&apos;ve actually built so
          far: {projectTitles}. All are live if you&apos;d like to dig in.
        </p>
        <div className="mt-6 flex flex-col gap-3 min-[430px]:flex-row min-[430px]:flex-wrap sm:gap-4">
          <Button to="/projects" variant="primary" size="lg">
            Explore My Projects <ArrowRight size={16} aria-hidden="true" />
          </Button>
          <Button to="/contact" variant="secondary" size="lg">
            Get in touch
          </Button>
        </div>
      </motion.section>
    </Page>
  )
}

export default Skills
