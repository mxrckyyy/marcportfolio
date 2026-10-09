import Page from '../components/layout/Page'
import PageHeader from '../components/ui/PageHeader'
import ContactInfo from '../components/contact/ContactInfo'
import ContactForm from '../components/contact/ContactForm'

function Contact() {
  return (
    <Page>
      <PageHeader
        eyebrow="Contact"
        title="Let's work together"
        description="I'm a second-year BSIT student and aspiring web developer, open to projects, collaborations, and opportunities — feel free to reach out."
      />

      <div className="grid items-start gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <ContactInfo />
        <ContactForm />
      </div>
    </Page>
  )
}

export default Contact
