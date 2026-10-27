import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, ExternalLink } from 'lucide-react'
import Page from '../components/layout/Page'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import { socialLinks } from '../data/socialLinks'
import { skillGroups } from '../data/skills'
import { projects } from '../data/projects'
import { fadeUp } from '../utils/animations'

const resumePdf = '/John-Marc-Comeros-Resume.pdf'
const portfolioUrl = 'https://marcportfolio-seven.vercel.app'

const contactLinks = [
  ...socialLinks.map((link) => ({
    text: link.url.startsWith('http')
      ? link.url.replace(/^https:\/\//, '')
      : link.handle,
    href: link.url,
    ariaLabel: link.ariaLabel,
    external: link.url.startsWith('http'),
  })),
  {
    text: '09690487218',
    href: 'tel:09690487218',
    ariaLabel: 'Phone number',
    external: false,
  },
  {
    text: portfolioUrl.replace(/^https:\/\//, ''),
    href: portfolioUrl,
    ariaLabel: 'Portfolio website',
    external: true,
  },
]

const sectionTitleClass =
  "mb-3 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-primary before:text-muted before:content-['//_'] print:break-after-avoid"

function Resume() {
  useEffect(() => {
    document.body.setAttribute('data-print-resume', '')
    return () => document.body.removeAttribute('data-print-resume')
  }, [])

  return (
    <Page className="print:py-0">
      <div className="resume-print">
        <div className="print:hidden">
          <PageHeader
            eyebrow="Resume"
            title="My Resume"
            description="A concise snapshot of my education, technical skills, and projects. View or download the PDF for the full resume."
          />
        </div>

        <motion.div
          className="mb-8 flex flex-col gap-3 min-[430px]:flex-row min-[430px]:flex-wrap sm:gap-4 print:hidden"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <Button
            href={resumePdf}
            target="_blank"
            rel="noreferrer noopener"
            variant="primary"
            size="lg"
          >
            <ExternalLink size={16} aria-hidden="true" /> View PDF
          </Button>
          <Button
            href={resumePdf}
            download="JohnMarcComeros-Resume.pdf"
            variant="secondary"
            size="lg"
          >
            <Download size={16} aria-hidden="true" /> Download Resume
          </Button>
        </motion.div>

        <div className="resume-sheet overflow-hidden rounded-lg border border-border-subtle bg-surface p-6 sm:p-8 md:p-10 print:rounded-none print:border-0">
          <p className="text-[clamp(1.5rem,4vw,2rem)] font-extrabold leading-tight tracking-[-0.02em] text-foreground">
            John Marc Comeros
          </p>
          <p className="mt-1 font-mono text-sm text-primary">
            2nd-Year BSIT Student · Aspiring Web Developer
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {contactLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-label={link.ariaLabel}
                  className="font-medium text-foreground-strong underline decoration-border-strong underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
                  {...(link.external && {
                    target: '_blank',
                    rel: 'noreferrer noopener',
                  })}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>

          <section className="mt-6 border-t border-border-subtle pt-5">
            <h2 className={sectionTitleClass}>Objective</h2>
            <p className="text-sm leading-relaxed text-foreground-strong">
              Motivated BSIT student seeking a Junior Web Developer position to
              apply hands-on experience in modern web technologies, building
              clean, functional applications while contributing to dynamic
              software projects.
            </p>
          </section>

          <section className="mt-6 border-t border-border-subtle pt-5">
            <h2 className={sectionTitleClass}>Education</h2>
            <div className="border-l-2 border-primary pl-3.5 print:break-inside-avoid">
              <p className="font-bold text-foreground">
                BS in Information Technology (2nd Year)
              </p>
              <p className="mt-1 text-sm text-muted">
                Asian College of Technology (ACT) &mdash; Cebu City, Philippines
              </p>
              <p className="mt-0.5 text-xs text-muted">2024 – 2026</p>
            </div>
          </section>

          <section className="mt-6 border-t border-border-subtle pt-5 print:break-inside-avoid">
            <h2 className={sectionTitleClass}>Awards &amp; Honors</h2>
            <ul className="flex flex-col gap-1.5 text-sm text-foreground">
              <li>Dean's Lister — 1st Semester, AY 2024–2025</li>
              <li>Top 6 ASFA Scholar — AY 2024–2025</li>
            </ul>
          </section>

          <section className="mt-6 border-t border-border-subtle pt-5">
            <h2 className={sectionTitleClass}>Technical Skills</h2>
            <dl className="flex flex-col gap-3">
              {skillGroups.map((group) => (
                <div
                  key={group.id}
                  className="grid gap-1 md:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] md:gap-4"
                >
                  <dt className="font-mono text-xs uppercase tracking-[0.06em] text-muted md:pt-0.5">
                    {group.title}
                  </dt>
                  <dd className="text-sm text-foreground">
                    {group.skills
                      .map((skill) =>
                        skill.note ? `${skill.name} (${skill.note})` : skill.name
                      )
                      .join(' \u00b7 ')}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-6 border-t border-border-subtle pt-5">
            <h2 className={sectionTitleClass}>Selected Projects</h2>
            <div className="flex flex-col gap-4">
              {projects.map((project) => (
                <article key={project.id} className="print:break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-base font-bold text-foreground">
                      {project.title}
                    </h3>
                    <div className="flex gap-3 text-sm font-medium">
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-primary underline-offset-4 hover:underline"
                        >
                          Live demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-primary underline-offset-4 hover:underline"
                        >
                          Source
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-foreground-strong">
                    {project.description}
                  </p>
                  <p className="mt-1.5 font-mono text-xs text-muted">
                    {project.technologies.join(' \u00b7 ')}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Page>
  )
}

export default Resume
