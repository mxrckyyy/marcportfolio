import { motion } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import Button from '../ui/Button'
import SocialLinks from '../ui/SocialLinks'
import { staggerContainer, staggerItem } from '../../utils/animations'

const techTags = ['React', 'JavaScript', 'CSS', 'C#', 'MySQL', 'Supabase', 'Git']

function Hero() {
  return (
    <section className="hero section" id="top">
      <div className="container hero__inner">
        <motion.div
          className="hero__media"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.div
            className="hero__avatar-frame"
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
              alt="John Marc Comeros - Web Developer"
              className="hero__avatar"
              width="1536"
              height="2048"
              loading="eager"
              decoding="async"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.p
            className="hero__status"
            role="status"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span className="hero__status-dot" aria-hidden="true">
              <motion.span
                className="hero__status-dot-pulse"
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

          <motion.h1 className="hero__title" variants={staggerItem}>
            Hi, I&apos;m <span className="hero__name">John Marc Comeros</span>
          </motion.h1>

          {/* CHANGED (job title): sub-headline "Aspiring Web Developer" -> "Frontend Developer" */}
          <motion.p className="hero__subtitle" variants={staggerItem}>
            Frontend Developer
          </motion.p>

          <motion.p className="hero__description" variants={staggerItem}>
            I build functional, practical web applications with React,
            JavaScript, C#, and Supabase. Focused on clean code, responsive
            interfaces, and continuous technical growth.
          </motion.p>

          <motion.ul
            className="hero__tags"
            aria-label="Primary technologies"
            variants={staggerItem}
          >
            {techTags.map((tag) => (
              <li key={tag} className="hero__tag">
                [{tag}]
              </li>
            ))}
          </motion.ul>

          <motion.div className="hero__actions" variants={staggerItem}>
            <Button href="#projects" variant="primary">
              View My Projects <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button href="#contact" variant="ghost">
              Contact Me
            </Button>
          </motion.div>

          <motion.div variants={staggerItem}>
            <SocialLinks />
          </motion.div>
        </motion.div>
      </div>

      <div className="hero__scroll-wrap">
        <a href="#about" className="hero__scroll" aria-label="Scroll to About section">
          <ArrowDown size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}

export default Hero
