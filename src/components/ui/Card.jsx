import { motion } from 'framer-motion'

function Card({ hover = false, className = '', children, ...rest }) {
  const classes = [
    'rounded-lg border border-border-subtle bg-surface transition-colors duration-200',
    hover ? 'hover:border-primary' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <motion.div className={classes} {...rest}>
      {children}
    </motion.div>
  )
}

export default Card
