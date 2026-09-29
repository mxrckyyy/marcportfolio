import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Facebook, Globe } from 'lucide-react'
import { socialLinks } from '../../data/socialLinks'

const iconMap = {
  Mail,
  Github,
  Linkedin,
  Facebook,
  Globe,
}

function SocialLinks({ variant = 'default' }) {
  return (
    <ul className={`social-links social-links--${variant}`}>
      {socialLinks.map(({ id, label, ariaLabel, url, icon }) => {
        const Icon = iconMap[icon] || Globe
        const isExternal = url.startsWith('http')
        const name = ariaLabel || label

        return (
          <li key={id}>
            <motion.a
              href={url}
              className="social-links__link"
              aria-label={name}
              title={name}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
              {...(isExternal
                ? { target: '_blank', rel: 'noreferrer noopener' }
                : {})}
            >
              <Icon size={18} aria-hidden="true" />
              {variant === 'default' && <span>{label}</span>}
            </motion.a>
          </li>
        )
      })}
    </ul>
  )
}

export default SocialLinks
