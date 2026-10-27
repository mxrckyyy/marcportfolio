import { containerClasses } from '../../utils/container'

function Page({ children, className = '' }) {
  const classes = ['py-12 sm:py-14 md:py-20', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      <div className={containerClasses}>{children}</div>
    </div>
  )
}

export default Page
