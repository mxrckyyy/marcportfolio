import { motion } from 'framer-motion'
import { Info } from 'lucide-react'
import Page from '../components/layout/Page'
import PageHeader from '../components/ui/PageHeader'
import Card from '../components/ui/Card'
import { skills } from '../data/skills'
import {
  viewportOnce,
  staggerGrid,
  staggerCard,
  staggerItem,
} from '../utils/animations'

function Skills() {
  return (
    <Page>
      <PageHeader
        eyebrow="Skills"
        title="Technical Skills"
        description="Technologies & Tools I Work With"
      />

      <motion.div
        className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerGrid}
      >
        {skills.map((group) => (
          <Card key={group.category} hover className="p-6" variants={staggerCard}>
            <h2 className="mb-4 font-mono text-sm font-semibold tracking-[0.04em] text-primary">
              {group.category}
            </h2>
            <ul className="flex flex-wrap items-center gap-2.5">
              {group.badges.map((badge) => (
                <motion.li
                  key={badge.name}
                  variants={staggerItem}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                >
                  <img
                    className="block h-auto max-h-8 w-auto rounded-sm"
                    src={badge.src}
                    alt={`${badge.name} badge`}
                    loading="lazy"
                    decoding="async"
                  />
                </motion.li>
              ))}
            </ul>
          </Card>
        ))}
      </motion.div>

      <motion.p
        className="mt-7 flex items-start gap-2.5 rounded-md border border-primary/[0.28] bg-primary-soft p-[0.95rem_1.15rem] text-[0.925rem] text-muted"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerItem}
      >
        <Info size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
        <span>
          Currently building personal projects to expand my depth in React and
          full-stack integration.
        </span>
      </motion.p>
    </Page>
  )
}

export default Skills
