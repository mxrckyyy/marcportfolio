import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Send } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import { viewportOnce, fadeUp } from '../../utils/animations'

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
    <section className="section" id="contact">
      <div className="container">
        <SectionHeading
          eyebrow="Contact"
          title="Get In Touch"
          description="Let's Connect for Opportunities, Projects, or Collaboration"
        />

        <div className="contact__grid">
          <div className="contact__info">
            {contactCards.map(({ id, label, value, href, icon: Icon }) => {
              const content = (
                <>
                  <span className="contact__card-icon">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="contact__card-body">
                    <span className="contact__card-label">{label}</span>
                    <span className="contact__card-value">{value}</span>
                  </span>
                </>
              )

              return href ? (
                <motion.a
                  key={id}
                  href={href}
                  className="contact__card"
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
                  className="contact__card"
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
            className="contact__form"
            onSubmit={handleSubmit}
            noValidate
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <div className="contact__row">
              <div className="contact__field">
                <label className="contact__label" htmlFor="contact-name">
                  Name
                </label>
                <input
                  className="contact__input"
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
              <div className="contact__field">
                <label className="contact__label" htmlFor="contact-email">
                  Email
                </label>
                <input
                  className="contact__input"
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

            <div className="contact__field">
              <label className="contact__label" htmlFor="contact-subject">
                Subject
              </label>
              <input
                className="contact__input"
                id="contact-subject"
                name="subject"
                type="text"
                placeholder="What is this about?"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className="contact__field">
              <label className="contact__label" htmlFor="contact-message">
                Message
              </label>
              <textarea
                className="contact__textarea"
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
                className={`contact__status is-${status.type}`}
                role="status"
                aria-live="polite"
              >
                {status.message}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              className="contact__submit"
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
      </div>
    </section>
  )
}

export default Contact
