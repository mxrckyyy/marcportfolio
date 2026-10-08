import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Send } from 'lucide-react'
import Page from '../components/layout/Page'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import {
  labelClasses,
  inputClasses,
  textareaClasses,
  statusClasses,
} from '../utils/formStyles'
import { viewportOnce, fadeUp } from '../utils/animations'

const CONTACT_EMAIL = 'johnmarccomeros16@gmail.com'

const contactCards = [
  {
    id: 'email',
    label: 'Email',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    icon: Mail,
  },
  {
    id: 'phone',
    label: 'Phone',
    value: '09690487218',
    href: 'tel:09690487218',
    icon: Phone,
  },
  {
    id: 'location',
    label: 'Location',
    value: 'Cebu City, Philippines',
    href: null,
    icon: MapPin,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/mxrckyyy',
    href: 'https://github.com/mxrckyyy',
    icon: Github,
  },
]

const cardClasses =
  'flex items-center gap-3.5 rounded-md border border-border-subtle bg-surface px-[1.15rem] py-4'
const linkCardClasses =
  cardClasses +
  ' transition-[border-color,background-color] duration-200 hover:border-primary hover:bg-primary-soft'

const initialFormData = { name: '', email: '', subject: '', message: '' }

function Contact() {
  const [formData, setFormData] = useState(initialFormData)
  const [status, setStatus] = useState(null)
  const [isSending, setIsSending] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (status) setStatus(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const name = formData.name.trim()
    const email = formData.email.trim()
    const subject = formData.subject.trim() || 'Portfolio inquiry'
    const message = formData.message.trim()

    if (!name || !email || !message) {
      setStatus({
        type: 'error',
        message: 'Please fill in your name, email address, and message.',
      })
      return
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address.',
      })
      return
    }

    setIsSending(true)
    setStatus(null)

    const templateParams = {
      name: formData.name,
      email: formData.email,
      title: formData.subject,
      message: formData.message,
    }

    try {
      await emailjs.send(
        'service_2a39b0m',
        'template_d8s622i',
        templateParams,
        'x3w2xijWKl8BvMqHt',
      )

      setFormData(initialFormData)
      setStatus({
        type: 'success',
        message:
          'Thank you! Your message has been sent successfully. I will get back to you soon.',
      })
    } catch (error) {
      console.error('EmailJS send failed:', error)
      setStatus({
        type: 'error',
        message:
          'Failed to send message. Please email johnmarccomeros16@gmail.com directly.',
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Page>
      <PageHeader
        eyebrow="Contact"
        title="Get In Touch"
        description="Let's Connect for Opportunities, Projects, or Collaboration"
      />

      <div className="grid items-start gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4">
          {contactCards.map(({ id, label, value, href, icon: Icon }) => {
            const content = (
              <>
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-sm bg-primary-soft text-primary">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.06em] text-muted">
                    {label}
                  </span>
                  <span className="break-words text-[0.95rem] font-semibold text-foreground">
                    {value}
                  </span>
                </span>
              </>
            )

            return href ? (
              <motion.a
                key={id}
                href={href}
                className={linkCardClasses}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeUp}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                {...(href.startsWith('http')
                  ? { target: '_blank', rel: 'noreferrer noopener' }
                  : {})}
              >
                {content}
              </motion.a>
            ) : (
              <motion.div
                key={id}
                className={cardClasses}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeUp}
              >
                {content}
              </motion.div>
            )
          })}
        </div>

        <motion.form
          className="flex flex-col gap-4 rounded-lg border border-border-subtle bg-surface p-6"
          onSubmit={handleSubmit}
          noValidate
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className={labelClasses} htmlFor="contact-name">
                Name
              </label>
              <input
                className={inputClasses}
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClasses} htmlFor="contact-email">
                Email
              </label>
              <input
                className={inputClasses}
                id="contact-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClasses} htmlFor="contact-subject">
              Subject
            </label>
            <input
              className={inputClasses}
              id="contact-subject"
              name="subject"
              type="text"
              placeholder="What is this about?"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClasses} htmlFor="contact-message">
              Message
            </label>
            <textarea
              className={textareaClasses}
              id="contact-message"
              name="message"
              rows="5"
              placeholder="Tell me about the role, project, or idea..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          {status && (
            <p
              className={statusClasses[status.type]}
              role="status"
              aria-live="polite"
            >
              {status.message}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full self-start sm:w-auto"
            disabled={isSending}
          >
            {isSending ? (
              'Sending...'
            ) : (
              <>
                <Send size={16} aria-hidden="true" /> Send Message
              </>
            )}
          </Button>
        </motion.form>
      </div>
    </Page>
  )
}

export default Contact
