import { motion } from 'framer-motion'
import { Download, ExternalLink, GraduationCap, Target } from 'lucide-react'
import Page from '../components/layout/Page'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Chip from '../components/ui/Chip'
import {
  viewportOnce,
  fadeUp,
  staggerGrid,
  staggerCard,
} from '../utils/animations'

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
    <Page>
      <PageHeader
        eyebrow="Resume"
        title="Resume"
        description="Education, Technical Stack & Project Experience"
      />

      <motion.div
        className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
        initial="hidden"
        animate="visible"
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
          variant="secondary"
        >
          <ExternalLink size={16} aria-hidden="true" /> View Resume in New Tab
        </Button>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerGrid}
      >
        <Card className="p-6" variants={staggerCard}>
          <h2 className="mb-[1.15rem] flex items-center gap-2 text-base font-bold text-foreground">
            <GraduationCap size={18} className="text-primary" aria-hidden="true" />{' '}
            Education
          </h2>
          <div className="border-l-2 border-primary pl-3.5">
            <p className="text-[1.05rem] font-bold text-foreground">
              BS in Information Technology (2nd Year)
            </p>
            <p className="mt-1.5 text-[0.95rem] text-muted">
              Asian College of Technology (ACT) &mdash; Cebu City, Philippines
            </p>
          </div>
        </Card>

        <Card className="p-6" variants={staggerCard}>
          <h2 className="mb-[1.15rem] text-base font-bold text-foreground">
            Technical Highlights
          </h2>
          <div className="flex flex-col gap-4">
            {technicalHighlights.map((group, index) => (
              <div
                key={group.label}
                className={
                  index > 0 ? 'border-t border-border-subtle pt-4' : undefined
                }
              >
                <p className="mb-2.5 font-mono text-xs uppercase tracking-[0.06em] text-muted">
                  {group.label}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Chip hover key={item}>
                      {item}
                    </Chip>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      <Card
        className="mt-5 p-6"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        <h2 className="mb-[1.15rem] flex items-center gap-2 text-base font-bold text-foreground">
          <Target size={18} className="text-primary" aria-hidden="true" /> Key
          Focus Areas
        </h2>
        <ul className="flex flex-wrap gap-2">
          {focusAreas.map((area) => (
            <Chip key={area}>{area}</Chip>
          ))}
        </ul>
      </Card>
    </Page>
  )
}

export default Resume
