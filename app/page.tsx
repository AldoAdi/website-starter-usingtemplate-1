import type { ReactElement } from 'react'
import {
  Card,
  Container,
  CTA,
  FeatureGrid,
  Footer,
  Header,
  Hero,
  Section,
} from '@aldoadi/website-template/components'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Get started', href: '#get-started' },
]

const FOOTER_LINKS = [{ label: 'Source', href: 'https://github.com/AldoAdi/Website-template-lib' }]

const FEATURES = [
  {
    title: 'One library, many sites',
    body: 'Analytics, theming, SEO and security live here. A new site installs the library and inherits all of it.',
  },
  {
    title: 'Themed by CSS variables',
    body: 'Every colour, radius and spacing step is a token. Override a handful in your own stylesheet and the whole site follows.',
  },
  {
    title: 'Static-export safe',
    body: 'Nothing needs a Node server, so the same code deploys to Vercel or straight to GitHub Pages.',
  },
]

// Heading order is deliberate: Hero owns the page's only <h1>, each Section
// heading is an <h2>, and Card titles sit at <h3> beneath their section.
export default function Home(): ReactElement {
  return (
    <>
      <Header logo={<span className="font-bold">Website Template</span>} links={NAV_LINKS} />
      <main>
        <Hero
          eyebrow="Starter"
          headline="A shared template for every site you build"
          subhead="Develop the common parts once, in one library, and consume them from a pinned git reference."
          primaryAction={{ label: 'Get started', href: '#get-started' }}
          secondaryAction={{ label: 'View features', href: '#features' }}
        />

        <Section id="features" ariaLabelledBy="features-heading">
          <Container>
            <h2 id="features-heading" className="mb-8 text-3xl font-bold tracking-tight">
              What the library gives you
            </h2>
            <FeatureGrid>
              {FEATURES.map((feature) => (
                <Card key={feature.title} title={feature.title} body={feature.body} />
              ))}
            </FeatureGrid>
          </Container>
        </Section>

        <div id="get-started">
          <CTA
            heading="Start a new site"
            body="Clone the starter, repoint the library pin, and you have a themed, analytics-ready site."
            action={{ label: 'Read the source', href: 'https://github.com/AldoAdi/Website-template-lib' }}
          />
        </div>
      </main>
      <Footer links={FOOTER_LINKS} copyright="© 2026 Website Template" />
    </>
  )
}
