import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import SocialLinks from '../ui/SocialLinks'
import { staggerContainer, staggerItem } from '../../utils/animations'
import { containerClasses } from '../../utils/container'

function Hero() {
  return (
    <section className="py-10 sm:py-14 md:py-[clamp(3.5rem,10vh,6rem)]">
      <div className={containerClasses}>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-[clamp(2rem,5vw,4rem)] lg:gap-16">
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
              className="mt-3 text-balance text-[clamp(1.75rem,5vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-foreground"
              variants={staggerItem}
            >
              John Marc Comeros
            </motion.h1>

            <motion.p
              className="mt-3 font-mono text-[clamp(1.05rem,3.2vw,1.5rem)] font-semibold tracking-[-0.01em] text-primary"
              variants={staggerItem}
            >
              2nd-Year BSIT Student · Aspiring Web Developer
            </motion.p>

            <motion.p
              className="mt-5 max-w-[560px] text-[1.05rem] leading-relaxed text-muted"
              variants={staggerItem}
            >
              I build practical, responsive, and interactive web experiences
              while continuously developing my skills in modern web
              technologies.
            </motion.p>

            <motion.div
              className="mt-7 flex flex-col gap-3 min-[430px]:flex-row min-[430px]:flex-wrap sm:gap-4"
              variants={staggerItem}
            >
              <Button to="/projects" variant="primary" size="lg">
                View My Projects <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button to="/resume" variant="secondary" size="lg">
                View Resume
              </Button>
            </motion.div>

            <motion.div className="mt-7" variants={staggerItem}>
              <SocialLinks />
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center md:justify-end"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          >
            <figure className="w-[min(100%,clamp(220px,60vw,300px))] overflow-hidden rounded-lg border border-border bg-surface p-2 shadow-[0_0_0_1px_rgba(96,165,250,0.22),0_18px_40px_rgba(0,0,0,0.45)] md:w-[clamp(240px,24vw,340px)]">
              <img
                src="/images/profile.jpg"
                alt="John Marc Comeros — aspiring web developer"
                className="aspect-[3/4] w-full rounded-md object-cover"
                width="1536"
                height="2048"
                loading="eager"
                decoding="async"
              />
              <figcaption className="mt-2 flex items-start gap-2 border-t border-border-subtle px-1 pb-1 pt-2.5 text-xs leading-snug text-muted">
                <span
                  className="mt-1 size-2 shrink-0 rounded-full bg-success"
                  aria-hidden="true"
                />
                Available for internships &amp; junior roles
              </figcaption>
            </figure>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
