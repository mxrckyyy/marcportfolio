import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Button from '../ui/Button'
import { containerClasses } from '../../utils/container'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/resume', label: 'Resume' },
  { to: '/contact', label: 'Contact' },
]

const desktopLinkClasses = ({ isActive }) =>
  [
    'relative inline-flex min-h-11 items-center rounded-sm px-3 text-sm transition-colors duration-200 after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-center after:scale-x-0 after:bg-primary after:transition-transform after:duration-200 hover:after:scale-x-100',
    isActive
      ? 'font-semibold text-primary after:scale-x-100'
      : 'font-medium text-muted hover:bg-border-subtle hover:text-foreground',
  ].join(' ')

const drawerLinkClasses = ({ isActive }) =>
  [
    'block rounded-sm px-3 py-2.5 text-base transition-colors duration-200',
    isActive
      ? 'bg-primary-soft font-semibold text-primary'
      : 'font-medium text-muted hover:bg-border-subtle hover:text-foreground',
  ].join(' ')

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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

  const headerClasses = [
    'sticky top-0 z-[1000] w-full border-b border-transparent bg-background/55 transition-colors duration-200',
    isScrolled || isOpen ? 'border-border-subtle bg-background/75 backdrop-blur-md' : '',
  ].join(' ')

  const drawerClasses = [
    'fixed inset-x-0 top-16 z-[999] border-b border-border bg-background/95 px-4 pt-4 pb-6 shadow-lg backdrop-blur-md transition-[opacity,transform,visibility] duration-200 md:hidden sm:px-6',
    isOpen
      ? 'visible translate-y-0 opacity-100'
      : 'invisible -translate-y-2 opacity-0',
  ].join(' ')

  const overlayClasses = [
    'fixed inset-x-0 bottom-0 top-16 z-[998] bg-black/55 transition-opacity duration-200 md:hidden',
    isOpen ? 'opacity-100' : 'invisible opacity-0',
  ].join(' ')

  return (
    <header className={headerClasses}>
      <div className={`${containerClasses} flex h-16 items-center justify-between gap-4`}>
        <Link
          to="/"
          className="inline-flex min-h-11 items-center gap-px font-mono text-[1.05rem] font-bold tracking-wide"
          aria-label="John Marc Comeros — home"
          onClick={closeMenu}
        >
          <span className="text-muted" aria-hidden="true">
            &lt;
          </span>
          <span className="text-primary">JMC</span>
          <span className="text-muted" aria-hidden="true">
            /&gt;
          </span>
        </Link>

        <nav className="hidden items-center gap-3 md:flex" aria-label="Main navigation">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.end} className={desktopLinkClasses}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Button to="/contact" variant="primary" size="sm">
            Get in Touch
          </Button>
        </nav>

        <Button
          variant="icon"
          className="md:hidden"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </Button>
      </div>

      <div id="mobile-menu" className={drawerClasses} aria-hidden={!isOpen}>
        <nav aria-label="Mobile navigation">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={drawerLinkClasses}
                  onClick={closeMenu}
                  tabIndex={isOpen ? 0 : -1}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Button
            to="/contact"
            variant="primary"
            className="mt-4 w-full"
            onClick={closeMenu}
            tabIndex={isOpen ? 0 : -1}
          >
            Get in Touch
          </Button>
        </nav>
      </div>

      <div className={overlayClasses} onClick={closeMenu} aria-hidden="true" />
    </header>
  )
}

export default Navbar
