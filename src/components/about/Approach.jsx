import { motion } from 'framer-motion'
import { viewportOnce, staggerContainer, staggerItem } from '../../utils/animations'

const principles = [
  {
    title: 'Keep interfaces clear',
    text: 'If someone has to stop and figure out how a screen works, the layout needs another pass.',
  },
  {
    title: 'Solve practical problems',
    text: "I'd rather build something useful for a real situation than a demo that only looks impressive.",
  },
  {
    title: 'Learn by creating',
    text: 'Projects teach me more than tutorials alone — especially the parts I get wrong the first time.',
  },
  {
    title: 'Improve through iteration',
    text: "I revisit earlier work as my skills grow; that's usually where the most learning happens.",
  },
]

function Approach() {
  return (
    <section className="mt-14 md:mt-16">
      <h2 className="text-lg font-bold tracking-[-0.01em] text-foreground">
        My approach
      </h2>
      <p className="mt-2.5 max-w-[560px] text-[1.05rem] leading-relaxed text-muted">
        Principles I&apos;m trying to build into my work as my skills develop.
      </p>

      <motion.ul
        className="mt-7 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {principles.map(({ title, text }, index) => (
          <motion.li
            className="min-w-0 border-t border-border-subtle pt-4"
            key={title}
            variants={staggerItem}
          >
            <span className="font-mono text-xs text-primary" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-2 text-base font-bold text-foreground">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}

export default Approach
