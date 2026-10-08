import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import BackToTop from '../ui/BackToTop'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

function Layout() {
  const { pathname } = useLocation()

  return (
    <>
      <ScrollToTop />

      <a
        href="#main-content"
        className="fixed left-3 top-3 z-[1200] inline-flex min-h-11 -translate-y-[calc(100%_+_1.5rem)] items-center rounded-sm bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition-transform duration-200 focus:translate-y-0 focus:outline-2 focus:outline-offset-2 focus:outline-foreground"
      >
        Skip to main content
      </a>

      <Navbar />

      <motion.main
        id="main-content"
        tabIndex={-1}
        key={pathname}
        className="focus:outline-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <Outlet />
      </motion.main>

      <Footer />
      <BackToTop />
    </>
  )
}

export default Layout
