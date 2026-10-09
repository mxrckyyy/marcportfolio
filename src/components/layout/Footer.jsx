import SocialLinks from '../ui/SocialLinks'
import { containerClasses } from '../../utils/container'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div
        className={`${containerClasses} flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left`}
      >
        <p className="text-sm text-muted">
          &copy; {year} John Marc Comeros. Built with React &amp; Vite.
        </p>
        <div className="flex items-center gap-3">
          <SocialLinks variant="compact" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
