import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Button from '../ui/Button'
import { containerClasses } from '../../utils/container'

const drawerFocusableSelector = 'a[href], button:not([disabled])'

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
      : 'font-medium text-foreground hover:bg-surface-elevated hover:text-primary',
  ].join(' ')

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const drawerRef = useRef(null)
  const toggleRef = useRef(null)
  const wasOpenRef = useRef(false)
  const location = useLocation()

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        return
      }

      if (event.key !== 'Tab' || !isOpen) return
      const drawerFocusables = drawerRef.current
        ? Array.from(drawerRef.current.querySelectorAll(drawerFocusableSelector))
        : []
      if (drawerFocusables.length === 0) return

      const toggle = toggleRef.current
      const cycle =
        toggle && toggle.getClientRects().length > 0
          ? [toggle, ...drawerFocusables]
          : drawerFocusables
      const first = cycle[0]
      const last = cycle[cycle.length - 1]
      const active = document.activeElement

      if (!cycle.includes(active)) {
        event.preventDefault()
        ;(event.shiftKey ? last : first).focus()
      } else if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
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

  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true
      drawerRef.current?.querySelector(drawerFocusableSelector)?.focus()
      return
    }

    if (!wasOpenRef.current) return
    wasOpenRef.current = false

    const active = document.activeElement
    const focusLost =
      !active ||
      active === document.body ||
      (drawerRef.current?.contains(active) ?? false)
    if (!focusLost) return

    const toggle = toggleRef.current
    if (toggle && toggle.getClientRects().length > 0) toggle.focus()
    else document.getElementById('main-content')?.focus()
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  const headerClasses = [
    'sticky top-0 z-[1000] w-full border-b border-transparent bg-background/55 transition-colors duration-200',
    isScrolled || isOpen ? 'border-border-subtle bg-background/75 backdrop-blur-md' : '',
  ].join(' ')

  const sidebarClasses = [
    'fixed left-0 top-0 z-[1060] h-full w-[min(85vw,20rem)] overflow-y-auto border-r border-border-subtle bg-background px-6 py-6 shadow-2xl transition-transform duration-300 md:hidden',
    isOpen ? 'translate-x-0' : '-translate-x-full',
  ].join(' ')

  const overlayClasses = [
    'fixed inset-0 z-[1050] bg-black/55 transition-opacity duration-300 md:hidden',
    isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
  ].join(' ')

  const drawer = (
    <>
      <div
        className={overlayClasses}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <div
        id="mobile-menu"
        ref={drawerRef}
        className={sidebarClasses}
        aria-hidden={!isOpen}
        aria-label="Mobile navigation"
      >
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-px font-mono text-[1.05rem] font-bold tracking-wide"
            aria-label="John Marc Comeros — home"
            onClick={closeMenu}
            tabIndex={isOpen ? 0 : -1}
          >
            <span className="text-muted" aria-hidden="true">
              &lt;
            </span>
            <span className="text-primary">JMC</span>
            <span className="text-muted" aria-hidden="true">
              /&gt;
            </span>
          </Link>
          <Button
            variant="icon"
            className="md:hidden"
            aria-label="Close navigation menu"
            onClick={closeMenu}
            tabIndex={isOpen ? 0 : -1}
          >
            <X size={20} aria-hidden="true" />
          </Button>
        </div>

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
            className="mt-6 w-full"
            onClick={closeMenu}
            tabIndex={isOpen ? 0 : -1}
          >
            Get in Touch
          </Button>
        </nav>
      </div>
    </>
  )

  return (
    <>
      <header className={headerClasses}>
        <div className={`${containerClasses} flex h-16 items-center gap-4`}>
          <Button
            ref={toggleRef}
            variant="icon"
            className="md:hidden"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </Button>

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

          <nav className="hidden items-center gap-3 md:ml-auto md:flex" aria-label="Main navigation">
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
        </div>
      </header>
      {typeof document !== 'undefined' ? createPortal(drawer, document.body) : null}
    </>
  )
}

export default Navbar
