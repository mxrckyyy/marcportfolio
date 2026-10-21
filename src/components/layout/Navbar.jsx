import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Code2, FileText, FolderKanban, Home, Mail, Menu, User, X } from 'lucide-react'
import Button from '../ui/Button'
import SocialLinks from '../ui/SocialLinks'
import { containerClasses } from '../../utils/container'

const drawerFocusableSelector = 'a[href], button:not([disabled])'

const navLinks = [
  { to: '/', label: 'Home', end: true, icon: Home },
  { to: '/about', label: 'About', icon: User },
  { to: '/skills', label: 'Skills', icon: Code2 },
  { to: '/projects', label: 'Projects', icon: FolderKanban },
  { to: '/resume', label: 'Resume', icon: FileText },
  { to: '/contact', label: 'Contact', icon: Mail },
]

const desktopLinkClasses = ({ isActive }) =>
  [
    'group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors duration-200',
    isActive
      ? 'bg-primary-soft font-semibold text-primary'
      : 'font-medium text-muted hover:bg-surface-elevated hover:text-foreground',
  ].join(' ')

const drawerLinkClasses = ({ isActive }) =>
  [
    'block rounded-md px-3 py-2.5 text-base transition-colors duration-200',
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

  const desktopSidebarClasses = 'hidden md:flex md:flex-col md:fixed md:left-0 md:top-0 md:h-full md:w-[260px] md:border-r md:border-border md:bg-surface md:px-6 md:py-6 md:z-40'

  const mobileHeaderClasses = [
    'md:hidden sticky top-0 z-[1000] w-full border-b border-border bg-surface/80 backdrop-blur-md transition-colors duration-200',
    isScrolled ? 'shadow-sm' : '',
  ].join(' ')

  const sidebarClasses = [
    'fixed left-0 top-0 z-[1060] h-full w-[min(85vw,20rem)] overflow-y-auto border-r border-border-subtle bg-surface px-6 py-6 shadow-2xl transition-transform duration-300 md:hidden',
    isOpen ? 'translate-x-0' : '-translate-x-full',
  ].join(' ')

  const overlayClasses = [
    'fixed inset-0 z-[1050] bg-black/30 transition-opacity duration-300 md:hidden',
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
      {/* Desktop persistent sidebar */}
      <aside className={desktopSidebarClasses}>
        <Link
          to="/"
          className="mb-6 inline-flex min-h-11 items-center gap-px font-mono text-[1.05rem] font-bold tracking-wide"
          aria-label="John Marc Comeros — home"
        >
          <span className="text-muted" aria-hidden="true">
            &lt;
          </span>
          <span className="text-primary">JMC</span>
          <span className="text-muted" aria-hidden="true">
            /&gt;
          </span>
        </Link>

        <div className="mb-6">
          <p className="text-sm font-semibold text-foreground">John Marc Comeros</p>
          <p className="text-xs text-muted">2nd-Year BSIT Student · Aspiring Web Developer</p>
        </div>

        <nav aria-label="Main navigation" className="flex-1">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <li key={link.to}>
                  <NavLink to={link.to} end={link.end} className={desktopLinkClasses}>
                    <Icon size={16} aria-hidden="true" />
                    {link.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="mt-6 border-t border-border pt-4">
          <p className="mb-2 text-xs text-muted">Available for internships</p>
          <SocialLinks variant="compact" />
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className={mobileHeaderClasses}>
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
        </div>
      </header>

      {typeof document !== 'undefined' ? createPortal(drawer, document.body) : null}
    </>
  )
}

export default Navbar