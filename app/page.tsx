import type { ReactElement } from 'react'
import { Container, Footer, Header, Section } from '@aldoadi/website-template/components'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const FOOTER_LINKS = [{ label: 'Privacy', href: '/privacy' }]

// T5 shell: Header / Container / Section / Footer, assembled from the
// library's layout primitives. Header now owns the theme toggle, so the
// standalone <ThemeToggle> from the T2-T4 placeholder is gone. The real
// sample page content (Hero / FeatureGrid / CTA / ContactForm /
// CookieBanner) lands across T6-T11 inside the <Section> below.
export default function Home(): ReactElement {
  return (
    <>
      <Header logo={<span className="font-bold">Website Template</span>} links={NAV_LINKS} />
      <main>
        <Section ariaLabel="Introduction">
          <Container>
            <p>Website Template Starter</p>
          </Container>
        </Section>
      </main>
      <Footer links={FOOTER_LINKS} copyright="© 2026 Website Template" />
    </>
  )
}
