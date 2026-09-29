import { ArrowUp } from 'lucide-react'
import SocialLinks from '../ui/SocialLinks'

function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__copy">
          &copy; {year} John Marc Comeros. Built with React &amp; Vite.
        </p>
        <div className="footer__actions">
          <SocialLinks variant="compact" />
          <button
            type="button"
            className="footer__top"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
