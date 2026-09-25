import { motion } from 'framer-motion'
import {
  FileCode,
  Palette,
  Braces,
  Atom,
  Terminal,
  Database,
  Server,
  GitBranch,
  Github,
  PenTool,
  Shapes,
  Info,
} from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { skills } from '../../data/skills'
import {
  viewportOnce,
  staggerGrid,
  staggerCard,
  staggerItem,
  fadeUp,
} from '../../utils/animations'

const iconMap = {
  FileCode,
  Palette,
  Braces,
  Atom,
  Terminal,
  Database,
  Server,
  GitBranch,
  Github,
  PenTool,
  Shapes,
}

const techStack = [
  {
    name: 'C#',
    badgeUrl:
      'https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white',
  },
  {
    name: 'JavaScript',
    badgeUrl:
      'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black',
  },
  {
    name: 'HTML5',
    badgeUrl:
      'https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white',
  },
  {
    name: 'CSS3',
    badgeUrl:
      'https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white',
  },
  {
    name: 'Vercel',
    badgeUrl:
      'https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white',
  },
  {
    name: 'Netlify',
    badgeUrl:
      'https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white',
  },
  {
    name: 'Render',
    badgeUrl:
      'https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white',
  },
  {
    name: '.NET',
    badgeUrl:
      'https://img.shields.io/badge/.NET-512BD4?style=for-the-badge&logo=dotnet&logoColor=white',
  },
  {
    name: 'Blazor',
    badgeUrl:
      'https://img.shields.io/badge/Blazor-512BD4?style=for-the-badge&logo=blazor&logoColor=white',
  },
  {
    name: 'Next.js',
    badgeUrl:
      'https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white',
  },
  {
    name: 'React',
    badgeUrl:
      'https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB',
  },
  {
    name: 'Vite',
    badgeUrl:
      'https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white',
  },
  {
    name: 'Tailwind CSS',
    badgeUrl:
      'https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white',
  },
  {
    name: 'MySQL',
    badgeUrl:
      'https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white',
  },
  {
    name: 'Supabase',
    badgeUrl:
      'https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white',
  },
  {
    name: 'Adobe Photoshop',
    badgeUrl:
      'https://img.shields.io/badge/Adobe_Photoshop-31A8FF?style=for-the-badge&logo=adobephotoshop&logoColor=white',
  },
  {
    name: 'Figma',
    badgeUrl:
      'https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white',
  },
  {
    name: 'Canva',
    badgeUrl:
      'https://img.shields.io/badge/Canva-00C4CC?style=for-the-badge&logo=canva&logoColor=white',
  },
  {
    name: 'Inkscape',
    badgeUrl:
      'https://img.shields.io/badge/Inkscape-000000?style=for-the-badge&logo=inkscape&logoColor=white',
  },
  {
    name: 'Git',
    badgeUrl:
      'https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white',
  },
  {
    name: 'GitHub',
    badgeUrl:
      'https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white',
  },
]

function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeading
          eyebrow="Skills"
          title="Technical Skills"
          description="Technologies & Tools I Work With"
        />

        <motion.div
          className="skills__grid"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerGrid}
        >
          {skills.map((group) => (
            <motion.div
              className="skills__group"
              key={group.category}
              variants={staggerCard}
            >
              <h3 className="skills__category">{group.category}</h3>
              <ul className="skills__list">
                {group.items.map((item) => {
                  const Icon = iconMap[item.icon] || Terminal
                  return (
                    <motion.li
                      className="skills__item"
                      key={item.name}
                      variants={staggerItem}
                      whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    >
                      <Icon size={16} aria-hidden="true" />
                      <span>{item.name}</span>
                    </motion.li>
                  )
                })}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="skills__badges flex flex-wrap gap-2"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          {techStack.map((tech) => (
            <img
              key={tech.name}
              className="skills__badge"
              src={tech.badgeUrl}
              alt={`${tech.name} badge`}
              loading="lazy"
            />
          ))}
        </motion.div>

        <motion.p
          className="skills__note"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerItem}
        >
          <Info size={16} aria-hidden="true" />
          <span>
            Currently building personal projects to expand my depth in React
            and full-stack integration.
          </span>
        </motion.p>
      </div>
    </section>
  )
}

export default Skills
