import { GraduationCap, MapPin, Code, Lightbulb } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'

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
    <section className="section" id="about">
      <div className="container">
        <SectionHeading
          eyebrow="About"
          title="About Me"
          description="Background & Focus"
        />

        <div className="about__layout">
          <div className="about__content">
            <p>
              I am a 19-year-old 2nd-year BS Information Technology student at
              Asian College of Technology (ACT) in Cebu City, Philippines. I am
              passionate about web development, UI design, and turning concepts
              into working applications.
            </p>
            <p>
              My approach focuses on writing clean, readable code and
              understanding the core mechanics behind modern frameworks.
              Whether building interactive React interfaces, working with
              relational databases like MySQL and Supabase, or modeling
              application logic in C#, I enjoy tackling new technical
              challenges.
            </p>
          </div>

          <ul className="about__highlights">
            {highlights.map(({ id, label, value, icon: Icon }) => (
              <li className="about__highlight" key={id}>
                <Icon size={20} className="about__highlight-icon" aria-hidden="true" />
                <p className="about__highlight-label">{label}</p>
                <p className="about__highlight-value">{value}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default About
