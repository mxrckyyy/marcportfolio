import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowDown } from 'lucide-react'
import Button from '../components/ui/Button'
import SocialLinks from '../components/ui/SocialLinks'
import { staggerContainer, staggerItem } from '../utils/animations'
import { containerClasses } from '../utils/container'

const techTags = ['React', 'JavaScript', 'CSS', 'C#', 'MySQL', 'Supabase', 'Git']

function Home() {
  return (
    <section className="py-[clamp(3.5rem,10vh,6rem)]">
      <div className={containerClasses}>
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-[clamp(2rem,5vw,4rem)]">
          <motion.div
            className="flex justify-center md:col-start-2 md:row-start-1"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.div
              className="aspect-[3/4] w-[clamp(180px,55vw,240px)] rounded-lg border border-border bg-surface p-2 shadow-[0_0_0_1px_rgba(96,165,250,0.22),0_18px_40px_rgba(0,0,0,0.45)] md:w-[clamp(200px,24vw,300px)]"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            >
              <img
                src="/images/profile.jpg"
                alt="John Marc Comeros — aspiring web developer"
                className="h-full w-full rounded-md object-cover"
                width="1536"
                height="2048"
                loading="eager"
                decoding="async"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="min-w-0 md:col-start-1 md:row-start-1"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.p
              className="relative inline-flex max-w-full items-center gap-2.5 rounded-full border border-primary/30 bg-background/60 px-4 py-2 font-mono text-[clamp(0.72rem,2.6vw,0.84rem)] leading-normal text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_10px_30px_rgba(0,0,0,0.4),0_0_18px_rgba(96,165,250,0.12)] backdrop-blur-[10px]"
              role="status"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <span className="relative inline-block size-2 shrink-0 rounded-full bg-success shadow-[0_0_0_3px_rgba(52,211,153,0.18)]" aria-hidden="true">
                <motion.span
                  className="absolute inset-0 rounded-full bg-success shadow-[0_0_8px_rgba(52,211,153,0.55)]"
                  animate={{ scale: [1, 2.4], opacity: [0.65, 0] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              </span>
              Available for Internship &amp; Junior Web Developer Roles
            </motion.p>

            <motion.h1
              className="mt-5 text-[clamp(1.75rem,5vw,3rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-foreground"
              variants={staggerItem}
            >
              Hi, I&apos;m <span className="inline-block">John Marc Comeros</span>
            </motion.h1>

            <motion.p
              className="mt-2 font-mono text-[clamp(1.15rem,3.5vw,1.6rem)] font-semibold tracking-[-0.01em] text-primary"
              variants={staggerItem}
            >
              BSIT Student · Aspiring Web Developer
            </motion.p>

            <motion.p
              className="mt-5 max-w-[560px] text-[1.05rem] text-muted"
              variants={staggerItem}
            >
              I build practical, responsive, and interactive web experiences
              with React and JavaScript, and I&apos;m continuously developing
              my skills as a web developer.
            </motion.p>

            <motion.ul
              className="mt-6 flex flex-wrap gap-2"
              aria-label="Primary technologies"
              variants={staggerItem}
            >
              {techTags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-sm border border-border-subtle bg-surface px-2.5 py-1 font-mono text-[0.78rem] text-muted transition-colors duration-200 hover:border-primary hover:text-primary"
                >
                  [{tag}]
                </li>
              ))}
            </motion.ul>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              variants={staggerItem}
            >
              <Button to="/projects" variant="primary">
                View My Projects <ArrowRight size={16} aria-hidden="true" />
              </Button>
              <Button to="/contact" variant="secondary">
                Contact Me
              </Button>
            </motion.div>

            <motion.div className="mt-8" variants={staggerItem}>
              <SocialLinks />
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-[clamp(2rem,5vh,3.5rem)] flex justify-center">
          <Link
            to="/about"
            className="inline-flex size-11 animate-bounce-soft items-center justify-center rounded-full border border-border-strong text-muted transition-colors duration-200 hover:border-primary hover:bg-primary-soft hover:text-primary"
            aria-label="Go to the About page"
          >
            <ArrowDown size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Home
