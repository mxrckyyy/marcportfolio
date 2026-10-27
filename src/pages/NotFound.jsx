import Page from '../components/layout/Page'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'

function NotFound() {
  return (
    <Page>
      <PageHeader
        align="center"
        eyebrow="404"
        title="Page Not Found"
        description="The page you are looking for doesn't exist or has been moved."
      />
      <div className="flex flex-col items-center gap-3 min-[430px]:flex-row min-[430px]:justify-center sm:gap-4">
        <Button to="/" variant="primary">
          Back to Home
        </Button>
        <Button to="/projects" variant="secondary">
          View Projects
        </Button>
      </div>
    </Page>
  )
}

export default NotFound
