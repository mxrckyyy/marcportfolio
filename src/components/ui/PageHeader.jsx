import { motion } from 'framer-motion'
import { fadeUp } from '../../utils/animations'

function PageHeader({ eyebrow, title, description, align = 'left' }) {
  const classes = [
    'mb-11 max-w-[40rem]',
    align === 'center' ? 'mx-auto text-center' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <motion.header
      className={classes}
      initial="hidden"
      animate="visible"
      variants={fadeUp}
    >
      {eyebrow && (
        <p className="mb-2.5 inline-block font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary before:text-muted before:content-['//_']">
          {eyebrow}
        </p>
      )}
      <h1 className="text-[clamp(1.6rem,4vw,2.25rem)] font-bold leading-tight tracking-[-0.02em] text-foreground">
        {title}
      </h1>
      {description && (
        <p className="mt-3 text-[1.05rem] leading-relaxed text-muted">
          {description}
        </p>
      )}
    </motion.header>
  )
}

export default PageHeader
