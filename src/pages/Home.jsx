import Hero from '../components/home/Hero'
import FeaturedProject from '../components/home/FeaturedProject'
import Button from '../components/ui/Button'
import SelectedWork from '../components/home/SelectedWork'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { skillGroups } from '../data/skills'
import { containerClasses } from '../utils/container'
import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '../utils/animations'

function Home() {
  return (
    <>
      <Hero />
      <FeaturedProject />
      <SelectedWork />

      <section className="border-t border-border py-12 md:py-16">
        <div className={containerClasses}>
          <motion.div
            className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <div className="min-w-0">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary before:text-muted before:content-['//_']">
                about
              </p>
              <h2 className="mt-2 text-[clamp(1.35rem,3vw,1.75rem)] font-bold tracking-[-0.02em] text-foreground">
                A little about me
              </h2>
              <p className="mt-3 max-w-[640px] text-[1.05rem] leading-relaxed text-muted">
                I&apos;m Marc, a second-year BSIT student learning web development
                by building practical, responsive interfaces. Most of what I know
                has come from small projects I&apos;ve built myself.
              </p>
            </div>
            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              Read more <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-border py-12 md:py-16">
        <div className={containerClasses}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary before:text-muted before:content-['//_']">
              skills
            </p>
            <h2 className="mt-2 text-[clamp(1.35rem,3vw,1.75rem)] font-bold tracking-[-0.02em] text-foreground">
              Skills &amp; Technologies
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {skillGroups.flatMap((g) => g.skills).map((skill) => (
                <span
                  key={skill.name}
                  className="rounded-sm border border-border bg-surface px-3 py-1.5 text-sm text-foreground"
                >
                  {skill.name}
                </span>
              ))}
            </div>
            <Link
              to="/skills"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              View all skills <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-border py-12 md:py-16">
        <div className={containerClasses}>
          <motion.div
            className="rounded-lg border border-border bg-surface p-6 text-center sm:p-8 md:p-10"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <h2 className="text-[clamp(1.35rem,3vw,1.75rem)] font-bold tracking-[-0.02em] text-foreground">
              Let&apos;s work together
            </h2>
            <p className="mx-auto mt-3 max-w-[560px] text-[1.05rem] leading-relaxed text-muted">
              I&apos;m open to projects, collaborations, and opportunities. Feel
              free to reach out.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 min-[430px]:flex-row sm:gap-4">
              <Button to="/contact" variant="primary" size="lg">
                Contact Me <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button to="/projects" variant="secondary" size="lg">
                View Projects
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Home