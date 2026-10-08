import { GraduationCap, MapPin, Code, Lightbulb } from 'lucide-react'
import Page from '../components/layout/Page'
import PageHeader from '../components/ui/PageHeader'

const highlights = [
  {
    id: 'education',
    label: 'Education',
    value: 'BS Information Technology (2nd Year)',
    icon: GraduationCap,
  },
  {
    id: 'location',
    label: 'Location',
    value: 'Cebu City, Philippines',
    icon: MapPin,
  },
  {
    id: 'focus',
    label: 'Core Focus',
    value: 'Frontend Development & Web Applications',
    icon: Code,
  },
  {
    id: 'interests',
    label: 'Interest Areas',
    value: 'UI/UX Design, Relational Databases, Version Control',
    icon: Lightbulb,
  },
]

function About() {
  return (
    <Page>
      <PageHeader
        eyebrow="About"
        title="About Me"
        description="Background & Focus"
      />

      <div className="grid gap-[clamp(2rem,4vw,3.5rem)] md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-start">
        <div className="flex flex-col gap-4 text-[1.05rem] text-muted">
          <p>
            I am a 19-year-old 2nd-year BS Information Technology student at
            Asian College of Technology (ACT) in Cebu City, Philippines. I am
            passionate about web development, UI design, and turning concepts
            into working applications.
          </p>
          <p>
            My approach focuses on writing clean, readable code and
            understanding the core mechanics behind modern frameworks. Whether
            building interactive React interfaces, working with relational
            databases like MySQL and Supabase, or modeling application logic in
            C#, I enjoy tackling new technical challenges.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {highlights.map(({ id, label, value, icon: Icon }) => (
            <li
              className="rounded-md border border-border-subtle bg-surface p-5 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary"
              key={id}
            >
              <Icon size={20} className="mb-3 text-primary" aria-hidden="true" />
              <p className="mb-1 font-mono text-[0.72rem] font-medium uppercase tracking-[0.06em] text-muted">
                {label}
              </p>
              <p className="text-[0.95rem] font-semibold leading-snug text-foreground">
                {value}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Page>
  )
}

export default About
