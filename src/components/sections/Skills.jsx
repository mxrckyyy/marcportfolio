import { motion } from 'framer-motion'
import {
  FileCode,
  Palette,
  Braces,
  Atom,
  Terminal,
  Database,
  Server,
  GitBranch,
  Github,
  PenTool,
  Shapes,
  Info,
} from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { skills } from '../../data/skills'
import {
  viewportOnce,
  staggerGrid,
  staggerCard,
  staggerItem,
} from '../../utils/animations'

const iconMap = {
  FileCode,
  Palette,
  Braces,
  Atom,
  Terminal,
  Database,
  Server,
  GitBranch,
  Github,
  PenTool,
  Shapes,
}

function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeading
          eyebrow="Skills"
          title="Technical Skills"
          description="Technologies & Tools I Work With"
        />

        <motion.div
          className="skills__grid"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerGrid}
        >
          {skills.map((group) => (
            <motion.div
              className="skills__group"
              key={group.category}
              variants={staggerCard}
            >
              <h3 className="skills__category">{group.category}</h3>
              <ul className="skills__list">
                {group.items.map((item) => {
                  const Icon = iconMap[item.icon] || Terminal
                  return (
                    <motion.li
                      className="skills__item"
                      key={item.name}
                      variants={staggerItem}
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    >
                      <Icon size={16} aria-hidden="true" />
                      <span>{item.name}</span>
                    </motion.li>
                  )
                })}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="skills__note"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerItem}
        >
          <Info size={16} aria-hidden="true" />
          <span>
            Currently building personal projects to expand my depth in React
            and full-stack integration.
          </span>
        </motion.p>
      </div>
    </section>
  )
}

export default Skills
