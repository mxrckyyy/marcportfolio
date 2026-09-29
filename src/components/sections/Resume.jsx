import { motion } from 'framer-motion'
import { Download, ExternalLink, GraduationCap, Target } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import {
  viewportOnce,
  fadeUp,
  staggerGrid,
  staggerCard,
} from '../../utils/animations'

const technicalHighlights = [
  {
    label: 'Languages & Frameworks',
    items: ['HTML', 'CSS', 'JavaScript', 'React', 'C#'],
  },
  {
    label: 'Backend & Database',
    items: ['MySQL', 'Supabase'],
  },
  {
    label: 'Developer & Design Tools',
    items: ['Git', 'GitHub', 'Figma', 'Inkscape'],
  },
]

const focusAreas = [
  'Frontend Application Development',
  'UI/UX Prototyping',
  'Relational Database Integration',
]

function Resume() {
  return (
    <section className="section" id="resume">
      <div className="container">
        <SectionHeading
          eyebrow="Resume"
          title="Resume"
          description="Education, Technical Stack & Project Experience"
        />

        <motion.div
          className="resume__actions"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <Button
            href="/MarcResume.pdf"
            download="MarcResume.pdf"
            variant="primary"
          >
            <Download size={16} aria-hidden="true" /> Download Resume (PDF)
          </Button>
          <Button
            href="/MarcResume.pdf"
            target="_blank"
            rel="noreferrer noopener"
            variant="ghost"
          >
            <ExternalLink size={16} aria-hidden="true" /> View Resume in New
            Tab
          </Button>
        </motion.div>

        <motion.div
          className="resume__grid"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerGrid}
        >
          <motion.div className="resume__card" variants={staggerCard}>
            <h3 className="resume__card-title">
              <GraduationCap size={18} aria-hidden="true" /> Education
            </h3>
            <div className="resume__entry">
              <p className="resume__role">
                BS in Information Technology (2nd Year)
              </p>
              <p className="resume__org">
                Asian College of Technology (ACT) &mdash; Cebu City, Philippines
              </p>
            </div>
          </motion.div>

          <motion.div className="resume__card" variants={staggerCard}>
            <h3 className="resume__card-title">Technical Highlights</h3>
            <div className="resume__tech">
              {technicalHighlights.map((group) => (
                <div className="resume__tech-group" key={group.label}>
                  <p className="resume__tech-label">{group.label}</p>
                  <ul className="resume__tech-list">
                    {group.items.map((item) => (
                      <li className="skills__item" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="resume__card resume__card--focus"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <h3 className="resume__card-title">
            <Target size={18} aria-hidden="true" /> Key Focus Areas
          </h3>
          <ul className="resume__focus-list">
            {focusAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

export default Resume
