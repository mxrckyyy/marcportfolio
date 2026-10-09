import { motion } from 'framer-motion'
import {
  BookOpen,
  Code,
  Terminal,
  Database,
  Palette,
  GitBranch,
} from 'lucide-react'
import { viewportOnce, staggerContainer, staggerItem } from '../../utils/animations'

const journey = [
  {
    icon: BookOpen,
    title: 'Web fundamentals',
    text: 'HTML, CSS, and JavaScript — the base everything else I build is stacked on.',
  },
  {
    icon: Code,
    title: 'React interfaces',
    text: 'Practicing component-based UI and learning how state flows through an app.',
  },
  {
    icon: Terminal,
    title: 'C# & applications',
    text: 'Exploring application logic and programming fundamentals beyond the browser.',
  },
  {
    icon: Database,
    title: 'Working with data',
    text: 'Storing and managing real data with MySQL and Supabase.',
  },
  {
    icon: Palette,
    title: 'UI/UX design',
    text: 'Planning interfaces in Figma so a build starts with a clear direction.',
  },
  {
    icon: GitBranch,
    title: 'Git & GitHub',
    text: 'Tracking changes and managing my projects with version control.',
  },
]

function LearningJourney() {
  return (
    <section className="mt-12 border-t border-border-subtle pt-12 md:mt-16 md:pt-16">
      <h2 className="text-lg font-bold tracking-[-0.01em] text-foreground">
        My learning journey
      </h2>
      <p className="mt-2.5 max-w-[560px] text-[1.05rem] leading-relaxed text-muted">
        The areas I keep coming back to as my skills grow.
      </p>

      <motion.div
        className="mt-7 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {journey.map(({ icon: Icon, title, text }) => (
          <motion.div
            className="min-w-0 border-t border-border-subtle pt-4"
            key={title}
            variants={staggerItem}
          >
            <Icon size={18} className="text-primary" aria-hidden="true" />
            <h3 className="mt-3 text-base font-bold text-foreground">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default LearningJourney
