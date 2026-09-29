import { motion } from 'framer-motion'

const hoverTransition = { duration: 0.2, ease: 'easeOut' }

function Button({
  children,
  href,
  variant = 'primary',
  type = 'button',
  className = '',
  ...rest
}) {
  const classes = `btn btn--${variant} ${className}`.trim()

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:')
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02, transition: hoverTransition }}
        whileTap={{ scale: 0.98 }}
        {...(isExternal ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...rest}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      className={classes}
      whileHover={{ scale: 1.02, transition: hoverTransition }}
      whileTap={{ scale: 0.98 }}
      {...rest}
    >
      {children}
    </motion.button>
  )
}

export default Button
