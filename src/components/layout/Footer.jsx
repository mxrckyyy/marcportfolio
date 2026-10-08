import { ArrowUp } from 'lucide-react'
import Button from '../ui/Button'
import SocialLinks from '../ui/SocialLinks'
import { containerClasses } from '../../utils/container'

function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }

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
          <Button
            variant="icon"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp size={16} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
