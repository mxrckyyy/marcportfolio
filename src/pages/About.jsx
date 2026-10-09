import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Page from '../components/layout/Page'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import Intro from '../components/about/Intro'
import LearningJourney from '../components/about/LearningJourney'
import BuildingInterests from '../components/about/BuildingInterests'
import Approach from '../components/about/Approach'
import { viewportOnce, fadeUp } from '../utils/animations'

function About() {
  return (
    <Page>
      <PageHeader
        eyebrow="About"
        title="A little about me"
        description="I'm Marc, a BSIT student exploring web development and building practical projects as I continue learning."
      />

      <Intro />
      <LearningJourney />
      <BuildingInterests />
      <Approach />

      <motion.section
        className="mt-14 rounded-lg border border-border-subtle bg-surface p-6 sm:p-8 md:mt-16"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        <h2 className="text-lg font-bold tracking-[-0.01em] text-foreground">
          What I&apos;m working toward
        </h2>
        <p className="mt-3 max-w-[640px] text-[1.05rem] leading-relaxed text-muted">
          I&apos;m still early in this journey, and there&apos;s a lot I
          haven&apos;t learned yet — that&apos;s the part I look forward to.
          The goal is straightforward: keep studying, keep building projects I
          can be honest about, and grow into a developer who ships work
          that&apos;s useful and easy to use.
        </p>
        <div className="mt-6 flex flex-col gap-3 min-[430px]:flex-row min-[430px]:flex-wrap sm:gap-4">
          <Button to="/projects" variant="primary" size="lg">
            Explore My Projects <ArrowRight size={16} aria-hidden="true" />
          </Button>
          <Button to="/skills" variant="secondary" size="lg">
            View My Skills
          </Button>
        </div>
      </motion.section>
    </Page>
  )
}

export default About
