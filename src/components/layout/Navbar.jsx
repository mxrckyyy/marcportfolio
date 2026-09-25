import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Button from '../ui/Button'

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeId, setActiveId] = useState('top')

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )

    const ids = ['top', ...navLinks.map((link) => link.id)]
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <header
      className={`navbar ${isScrolled ? 'navbar--scrolled' : ''} ${
        isOpen ? 'navbar--menu-open' : ''
      }`}
    >
      <div className="container navbar__inner">
        <a
          href="#top"
          className="navbar__brand"
          aria-label="John Marc Comeros — back to top"
          onClick={closeMenu}
        >
          <span className="navbar__brand-bracket" aria-hidden="true">
            &lt;
          </span>
          <span className="navbar__brand-name">JMC</span>
          <span className="navbar__brand-bracket" aria-hidden="true">
            /&gt;
          </span>
        </a>

        <nav className="navbar__nav" aria-label="Main navigation">
          <ul className="navbar__list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`navbar__link ${
                    activeId === link.id ? 'is-active' : ''
                  }`}
                  aria-current={activeId === link.id ? 'true' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href="#contact" variant="primary" className="navbar__cta">
            Get in Touch
          </Button>
        </nav>

        <button
          type="button"
          className="navbar__toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`navbar__drawer ${isOpen ? 'is-open' : ''}`}
        aria-hidden={!isOpen}
      >
        <nav aria-label="Mobile navigation">
          <ul className="navbar__drawer-list">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`navbar__drawer-link ${
                    activeId === link.id ? 'is-active' : ''
                  }`}
                  onClick={closeMenu}
                  tabIndex={isOpen ? 0 : -1}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button
            href="#contact"
            variant="primary"
            className="navbar__drawer-cta"
            onClick={closeMenu}
            tabIndex={isOpen ? 0 : -1}
          >
            Get in Touch
          </Button>
        </nav>
      </div>

      <div
        className={`navbar__overlay ${isOpen ? 'is-open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
    </header>
  )
}

export default Navbar
