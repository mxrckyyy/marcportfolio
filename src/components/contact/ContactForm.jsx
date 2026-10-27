import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { Loader2, Send } from 'lucide-react'
import Button from '../ui/Button'
import { socialLinks } from '../../data/socialLinks'
import {
  labelClasses,
  inputClasses,
  textareaClasses,
  errorClasses,
  statusClasses,
} from '../../utils/formStyles'
import { viewportOnce, fadeUp } from '../../utils/animations'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export const isEmailJsConfigured = Boolean(
  EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY,
)

const fallbackEmail =
  socialLinks.find((link) => link.id === 'email')?.handle ?? ''

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const initialFormData = { name: '', email: '', subject: '', message: '' }

const fieldIds = {
  name: 'contact-name',
  email: 'contact-email',
  subject: 'contact-subject',
  message: 'contact-message',
}

export function validateContactForm(values) {
  const errors = {}

  if (!values.name.trim()) {
    errors.name = 'Please enter your name.'
  }
  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email =
      'Please enter a valid email address, such as name@example.com.'
  }
  if (!values.message.trim()) {
    errors.message = 'Please enter a message.'
  }

  return errors
}

function ContactForm() {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [isSending, setIsSending] = useState(false)
  const statusRef = useRef(null)

  const focusStatus = () => statusRef.current?.focus()

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev))
    setStatus((prev) => (prev?.type === 'success' ? null : prev))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSending) return

    const nextErrors = validateContactForm(formData)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatus({
        type: 'error',
        message: 'Please check the highlighted fields and try again.',
      })
      const firstInvalid = ['name', 'email', 'message'].find(
        (field) => nextErrors[field],
      )
      // focus after React commits so aria-describedby (the field error)
      // is already in the DOM when the field receives focus
      queueMicrotask(() =>
        document.getElementById(fieldIds[firstInvalid])?.focus(),
      )
      return
    }

    setErrors({})

    if (!isEmailJsConfigured) {
      setStatus({
        type: 'error',
        message: (
          <>
            The contact form is not set up on this site yet. Please email me
            directly at{' '}
            <a
              className="font-semibold underline underline-offset-2"
              href={`mailto:${fallbackEmail}`}
            >
              {fallbackEmail}
            </a>
            .
          </>
        ),
      })
      focusStatus()
      return
    }

    setIsSending(true)
    setStatus({
      type: 'sending',
      message: 'Sending your message…',
      srOnly: true,
    })
    focusStatus()

    const templateParams = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      title: formData.subject.trim() || 'Portfolio inquiry',
      message: formData.message.trim(),
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        { publicKey: EMAILJS_PUBLIC_KEY },
      )

      setFormData(initialFormData)
      setStatus({
        type: 'success',
        message:
          'Thank you! Your message has been sent successfully. I will get back to you soon.',
      })
      focusStatus()
    } catch (error) {
      console.error('Contact form submission failed:', error)
      setStatus({
        type: 'error',
        message: (
          <>
            Sorry, your message could not be sent right now. Please try again in
            a few minutes, or email me directly at{' '}
            <a
              className="font-semibold underline underline-offset-2"
              href={`mailto:${fallbackEmail}`}
            >
              {fallbackEmail}
            </a>
            .
          </>
        ),
      })
      focusStatus()
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section aria-labelledby="contact-form-heading" className="min-w-0">
      <h2
        id="contact-form-heading"
        className="text-lg font-bold tracking-[-0.01em] text-foreground"
      >
        Send me a message
      </h2>
      <p className="mt-2 max-w-[560px] text-[1.05rem] leading-relaxed text-muted">
        Share a few details about the project, opportunity, or question and it
        comes straight to my inbox.
      </p>

      <motion.form
        className="mt-5 flex flex-col gap-4 rounded-lg border border-border-subtle bg-surface p-5 sm:p-6"
        onSubmit={handleSubmit}
        noValidate
        aria-busy={isSending}
        aria-labelledby="contact-form-heading"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
      >
        <p className="text-xs text-muted">
          Fields marked with{' '}
          <span aria-hidden="true" className="text-danger">
            *
          </span>
          <span className="sr-only">an asterisk </span>
          are required.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className={labelClasses} htmlFor={fieldIds.name}>
              Name{' '}
              <span aria-hidden="true" className="text-danger">
                *
              </span>
            </label>
            <input
              className={inputClasses}
              id={fieldIds.name}
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              aria-invalid={errors.name ? 'true' : undefined}
              aria-describedby={
                errors.name ? `${fieldIds.name}-error` : undefined
              }
            />
            {errors.name && (
              <p id={`${fieldIds.name}-error`} className={errorClasses}>
                {errors.name}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClasses} htmlFor={fieldIds.email}>
              Email{' '}
              <span aria-hidden="true" className="text-danger">
                *
              </span>
            </label>
            <input
              className={inputClasses}
              id={fieldIds.email}
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
              aria-invalid={errors.email ? 'true' : undefined}
              aria-describedby={
                errors.email ? `${fieldIds.email}-error` : undefined
              }
            />
            {errors.email && (
              <p id={`${fieldIds.email}-error`} className={errorClasses}>
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClasses} htmlFor={fieldIds.subject}>
            Subject{' '}
            <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            className={inputClasses}
            id={fieldIds.subject}
            name="subject"
            type="text"
            autoComplete="off"
            placeholder="What is this about?"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClasses} htmlFor={fieldIds.message}>
            Message{' '}
            <span aria-hidden="true" className="text-danger">
              *
            </span>
          </label>
          <textarea
            className={textareaClasses}
            id={fieldIds.message}
            name="message"
            rows="5"
            placeholder="Tell me about the role, project, or idea..."
            value={formData.message}
            onChange={handleChange}
            required
            aria-invalid={errors.message ? 'true' : undefined}
            aria-describedby={
              errors.message ? `${fieldIds.message}-error` : undefined
            }
          />
          {errors.message && (
            <p id={`${fieldIds.message}-error`} className={errorClasses}>
              {errors.message}
            </p>
          )}
        </div>

        <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite">
          {status && (
            <p
              className={
                status.srOnly ? 'sr-only' : statusClasses[status.type] ?? ''
              }
            >
              {status.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full self-start sm:w-auto"
          disabled={isSending}
        >
          {isSending ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              <Send size={16} aria-hidden="true" /> Send Message
            </>
          )}
        </Button>
      </motion.form>
    </section>
  )
}

export default ContactForm
