import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '../../utils/animations'

const facts = [
  {
    label: 'Education',
    value: 'BS Information Technology · 2nd Year',
    detail: 'Asian College of Technology, Cebu City',
  },
  {
    label: 'Based in',
    value: 'Cebu City, Philippines',
  },
  {
    label: 'Focus',
    value: 'Web development & UI/UX design',
  },
]

function Intro() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <motion.div
        className="grid grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-14"
        variants={staggerItem}
      >
        <div className="flex min-w-0 flex-col gap-4 text-[1.05rem] leading-relaxed text-muted">
          <p className="text-foreground-strong">
            I&apos;m Marc — a second-year BSIT student who enjoys building
            things for the web. I like that an idea can start as a rough sketch
            and end up as a page you can actually click through, and most of
            what I know so far has come from small projects I&apos;ve built
            myself.
          </p>
          <p>
            Day to day, that means working with HTML, CSS, and JavaScript,
            building interfaces in React, storing data in MySQL or Supabase,
            and using Git and GitHub to manage versions — with Figma on hand
            when an interface needs planning before the code.
          </p>
          <p>
            I still have a lot to learn, and I&apos;m fine saying so. Most of
            my progress has come from building something, running into a
            problem, and going back to make it better.
          </p>
        </div>

        <div className="flex justify-center md:justify-end">
          <figure className="w-[min(100%,clamp(200px,55vw,240px))] overflow-hidden rounded-lg border border-border-subtle bg-surface p-1.5 md:w-[clamp(200px,20vw,250px)]">
            <img
              src="/images/profile.jpg"
              alt="Portrait of John Marc Comeros"
              className="aspect-[3/4] w-full rounded-md object-cover"
              width="1536"
              height="2048"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </motion.div>

      <motion.dl
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-3"
        variants={staggerItem}
      >
        {facts.map(({ label, value, detail }) => (
          <div className="min-w-0 border-t border-border-subtle pt-4" key={label}>
            <dt className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-muted">
              {label}
            </dt>
            <dd className="mt-1.5 text-sm font-semibold leading-snug text-foreground">
              {value}
              {detail && (
                <span className="mt-0.5 block text-xs font-normal text-muted">
                  {detail}
                </span>
              )}
            </dd>
          </div>
        ))}
      </motion.dl>
    </motion.div>
  )
}

export default Intro
