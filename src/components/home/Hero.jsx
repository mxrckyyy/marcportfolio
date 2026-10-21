import { motion } from 'framer-motion'
import { ArrowRight, Briefcase, GraduationCap, Layers, User } from 'lucide-react'
import Button from '../ui/Button'
import { staggerContainer, staggerItem } from '../../utils/animations'
import { containerClasses } from '../../utils/container'

const summaryCards = [
  { icon: User, label: 'Current role', value: 'BSIT Student' },
  { icon: Layers, label: 'Focus', value: 'Web Development' },
  { icon: GraduationCap, label: 'Education', value: 'B.S. Information Technology' },
  { icon: Briefcase, label: 'Portfolio', value: 'Personal projects & coursework' },
]

function Hero() {
  return (
    <section className="py-12 sm:py-16 md:py-[clamp(4rem,9vh,6rem)]">
      <div className={containerClasses}>
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-[clamp(2.5rem,5vw,4rem)]">
          <motion.div
            className="min-w-0"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.p
              className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary before:text-muted before:content-['//_']"
              variants={staggerItem}
            >
              Hi, I&apos;m Marc.
            </motion.p>

            <motion.h1
              className="mt-3 text-balance text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-foreground"
              variants={staggerItem}
            >
              John Marc Comeros
            </motion.h1>

            <motion.p
              className="mt-2 text-sm text-muted"
              variants={staggerItem}
            >
              Also known as Marc
            </motion.p>

            <motion.p
              className="mt-3 font-mono text-[clamp(1rem,2.8vw,1.35rem)] font-semibold tracking-[-0.01em] text-primary"
              variants={staggerItem}
            >
              2nd-Year BSIT Student · Aspiring Web Developer
            </motion.p>

            <motion.p
              className="mt-6 max-w-[52ch] text-[1.05rem] leading-relaxed text-muted"
              variants={staggerItem}
            >
              I&apos;m learning to build responsive, accessible, and user-focused
              web interfaces with React, while continuously growing my frontend
              skills through real projects.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 min-[430px]:flex-row min-[430px]:flex-wrap sm:gap-4"
              variants={staggerItem}
            >
              <Button to="/projects" variant="primary" size="lg">
                View My Projects <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button to="/contact" variant="secondary" size="lg">
                Contact Me
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center md:justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
          >
            <figure className="w-[min(100%,clamp(200px,55vw,280px))] overflow-hidden rounded-lg border border-border bg-surface p-2 md:w-[clamp(220px,22vw,300px)]">
              <img
                src="/images/profile.jpg"
                alt="John Marc Comeros — aspiring web developer"
                className="aspect-[3/4] w-full rounded-md object-cover"
                width="1536"
                height="2048"
                loading="eager"
                decoding="async"
              />
              <figcaption className="mt-2 flex items-center gap-2 border-t border-border-subtle px-1 pb-1 pt-2 text-xs leading-snug text-muted">
                <span
                  className="size-1.5 shrink-0 rounded-full bg-success"
                  aria-hidden="true"
                />
                Available for internships &amp; junior roles
              </figcaption>
            </figure>
          </motion.div>
        </div>

        <motion.div
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {summaryCards.map(({ icon: Icon, label, value }) => (
            <motion.div
              key={label}
              className="rounded-lg border border-border bg-surface p-4"
              variants={staggerItem}
            >
              <div className="flex items-center gap-2">
                <Icon size={15} className="text-primary" aria-hidden="true" />
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted">
                  {label}
                </p>
              </div>
              <p className="mt-2 text-sm font-semibold text-foreground">{value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Hero