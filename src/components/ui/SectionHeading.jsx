import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '../../utils/animations'

function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <motion.header
      className={`section-heading section-heading--${align}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
    >
      {eyebrow && <p className="section-heading__eyebrow">{eyebrow}</p>}
      <h2 className="section-heading__title">{title}</h2>
      {description && <p className="section-heading__description">{description}</p>}
    </motion.header>
  )
}

export default SectionHeading
