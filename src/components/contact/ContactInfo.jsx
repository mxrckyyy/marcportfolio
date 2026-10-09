import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github } from 'lucide-react'
import { socialLinks } from '../../data/socialLinks'
import {
  staggerContainer,
  staggerItem,
  viewportOnce,
} from '../../utils/animations'

const iconMap = { Mail, Phone, MapPin, Github }

const PHONE_VALUE = '09690487218'
const LOCATION_VALUE = 'Cebu City, Philippines'

function socialCard(id) {
  const link = socialLinks.find((item) => item.id === id)
  if (!link) return null

  return {
    id: link.id,
    label: link.label,
    value: link.url.startsWith('http')
      ? link.url.replace(/^https?:\/\//, '')
      : link.handle,
    href: link.url,
    icon: link.icon,
    external: link.external,
  }
}

const contactCards = [
  socialCard('email'),
  {
    id: 'phone',
    label: 'Phone',
    value: PHONE_VALUE,
    href: `tel:${PHONE_VALUE}`,
    icon: 'Phone',
    external: false,
  },
  {
    id: 'location',
    label: 'Location',
    value: LOCATION_VALUE,
    href: null,
    icon: 'MapPin',
    external: false,
  },
  socialCard('github'),
].filter(Boolean)

const cardClasses =
  'flex h-full items-center gap-3.5 rounded-md border border-border-subtle bg-surface px-[1.15rem] py-4'
const linkCardClasses =
  cardClasses +
  ' transition-[border-color,background-color] duration-200 hover:border-primary hover:bg-primary-soft'

function ContactInfo() {
  return (
    <section aria-labelledby="contact-info-heading" className="min-w-0">
      <h2
        id="contact-info-heading"
        className="text-lg font-bold tracking-[-0.01em] text-foreground"
      >
        Contact information
      </h2>
      <p className="mt-2 text-[1.05rem] leading-relaxed text-muted">
        A few direct ways to reach me.
      </p>

      <motion.ul
        className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        {contactCards.map(({ id, label, value, href, icon, external }) => {
          const Icon = iconMap[icon] ?? Mail

          const content = (
            <>
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-sm bg-primary-soft text-primary">
                <Icon size={18} aria-hidden="true" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.06em] text-muted">
                  {label}
                </span>
                <span className="break-words text-[0.95rem] font-semibold text-foreground">
                  {value}
                </span>
              </span>
            </>
          )

          return (
            <motion.li
              key={id}
              className="min-w-0"
              variants={staggerItem}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
            >
              {href ? (
                <a
                  href={href}
                  className={linkCardClasses}
                  {...(external
                    ? { target: '_blank', rel: 'noreferrer noopener' }
                    : {})}
                >
                  {content}
                </a>
              ) : (
                <div className={cardClasses}>{content}</div>
              )}
            </motion.li>
          )
        })}
      </motion.ul>
    </section>
  )
}

export default ContactInfo
