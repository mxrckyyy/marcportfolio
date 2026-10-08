import { motion } from 'framer-motion'
import { Mail, Github, Globe } from 'lucide-react'
import { socialLinks } from '../../data/socialLinks'

const iconMap = {
  Mail,
  Github,
  Globe,
}

const defaultLinkClasses =
  'inline-flex min-h-11 items-center gap-2 rounded-sm border border-border-strong px-3.5 py-2 text-sm text-foreground-strong transition-colors duration-200 hover:border-primary hover:bg-primary-soft hover:text-primary'

const compactLinkClasses =
  'inline-flex size-11 items-center justify-center rounded-sm border border-border-strong text-foreground-strong transition-colors duration-200 hover:border-primary hover:bg-primary-soft hover:text-primary'

function SocialLinks({ variant = 'default' }) {
  const isCompact = variant === 'compact'
  const linkClasses = isCompact ? compactLinkClasses : defaultLinkClasses

  return (
    <ul
      className={
        isCompact
          ? 'flex flex-wrap items-center gap-2'
          : 'flex flex-wrap items-center gap-3'
      }
    >
      {socialLinks.map(({ id, label, ariaLabel, url, icon }) => {
        const Icon = iconMap[icon] || Globe
        const isExternal = url.startsWith('http')
        const name = ariaLabel || label

        return (
          <li key={id}>
            <motion.a
              href={url}
              className={linkClasses}
              aria-label={name}
              title={name}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
              {...(isExternal
                ? { target: '_blank', rel: 'noreferrer noopener' }
                : {})}
            >
              <Icon size={18} aria-hidden="true" />
              {!isCompact && <span>{label}</span>}
            </motion.a>
          </li>
        )
      })}
    </ul>
  )
}

export default SocialLinks
