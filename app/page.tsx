import type { ReactElement } from 'react'
import {
  Card,
  ContactForm,
  Container,
  CookieBanner,
  CTA,
  FeatureGrid,
  Footer,
  Header,
  CTA_ACTION_CLASSES,
  HERO_PRIMARY_ACTION_CLASSES,
  Hero,
  Section,
} from '@aldoadi/website-template/components'
import { BookingLink } from '@aldoadi/website-template/booking'
import { BOOKING_PATH } from './bookingConfig'

// Public by design -- it names the destination inbox, it is not a secret.
// Read from env rather than inlined so each site points at its own inbox.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? ''

// A fictional practice. The sample is a dental site rather than an abstract
// "starter" because the booking funnel only reads as real against a real
// shape of business -- and because a demo you can show a client beats one
// that needs explaining first.
const PRACTICE = {
  name: 'Bayside Family Dental',
  phone: '(562) 555-0100',
  phoneHref: 'tel:+15625550100',
}

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'New patients', href: '#new-patients' },
  { label: 'Contact', href: '#contact' },
]

const FOOTER_LINKS = [{ label: 'Privacy', href: '#privacy' }]

const SERVICES = [
  {
    title: 'General dentistry',
    body: 'Cleanings, fillings and check-ups for the whole family. Evening slots on Thursdays.',
  },
  {
    title: 'Cosmetic & Invisalign',
    body: 'Whitening, veneers and clear aligners, planned around what you actually want changed.',
  },
  {
    title: 'Same-day emergencies',
    body: 'Chipped, knocked out or in pain? Call before noon and we will see you the same day.',
  },
]

/**
 * The sample page.
 *
 * Two booking CTAs on purpose, with different `location` values -- hero and
 * the mid-page band. That is the first question anyone asks of funnel data
 * ("which button actually earns bookings?") and it cannot be answered
 * retroactively, so the placement is recorded from the first click.
 *
 * Heading order is deliberate: Hero owns the page's only <h1>, each Section
 * heading is an <h2>, and Card titles sit at <h3> beneath their section.
 */
export default function Home(): ReactElement {
  return (
    <>
      <Header logo={<span className="font-bold">{PRACTICE.name}</span>} links={NAV_LINKS} />
      <main>
        <Hero
          eyebrow="Long Beach, CA"
          headline="Dentistry that fits around your week"
          subhead="Same-day emergency slots, evening appointments, and a team that explains what it is doing and why."
          primaryActionSlot={
            <BookingLink
              href={BOOKING_PATH}
              location="hero"
              className={HERO_PRIMARY_ACTION_CLASSES}
            >
              Book an appointment
            </BookingLink>
          }
          secondaryAction={{ label: 'See services', href: '#services' }}
        />

        <Section id="services" ariaLabelledBy="services-heading">
          <Container>
            <h2 id="services-heading" className="mb-8 text-3xl font-bold tracking-tight">
              What we do
            </h2>
            <FeatureGrid>
              {SERVICES.map((service) => (
                <Card key={service.title} title={service.title} body={service.body} />
              ))}
            </FeatureGrid>
          </Container>
        </Section>

        {/* Second CTA, second placement. Same funnel, different `location`. */}
        <div id="new-patients">
          <CTA
            heading="New patients welcome"
            body="Most insurance accepted. Your first visit covers an exam, X-rays and a cleaning plan."
            action={{ label: 'Book an appointment', href: BOOKING_PATH }}
          />
        </div>

        <Section id="contact" ariaLabelledBy="contact-heading">
          <Container className="max-w-xl">
            <h2 id="contact-heading" className="mb-4 text-3xl font-bold tracking-tight">
              Get in touch
            </h2>
            <p className="text-muted-foreground mb-8">
              Prefer to talk? Call{' '}
              <a className="text-primary underline underline-offset-4" href={PRACTICE.phoneHref}>
                {PRACTICE.phone}
              </a>
              .
            </p>
            <ContactForm accessKey={WEB3FORMS_KEY} subject="Website enquiry" />
          </Container>
        </Section>
      </main>
      <Footer links={FOOTER_LINKS} copyright={`© 2026 ${PRACTICE.name}`} />
      <CookieBanner />
    </>
  )
}
