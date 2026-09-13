import type { Metadata } from 'next'
import type { ReactElement } from 'react'
import {
  Card,
  Container,
  CTA,
  FeatureGrid,
  PageHeader,
  Section,
  CTA_ACTION_CLASSES,
} from '@aldoadi/website-template/components'
import { BookingLink } from '@aldoadi/website-template/booking'
import {
  buildBreadcrumbSchema,
  buildMetadata,
  buildWebPageSchema,
  JsonLd,
} from '@aldoadi/website-template/seo'
import { SITE } from '../siteConfig'
import { BOOKING_PATH } from '../bookingConfig'
import { SERVICES, SERVICES_PATH, servicePath } from '../services'
import { absoluteUrl } from '../urls'

const TITLE = 'Our services'
const DESCRIPTION =
  'General, preventative, cosmetic, restorative and emergency dentistry in Long Beach, CA — all under one roof.'

export const metadata: Metadata = buildMetadata(SITE, {
  path: SERVICES_PATH,
  title: TITLE,
  description: DESCRIPTION,
})

const CRUMBS = [{ label: 'Home', href: '/' }, { label: TITLE }]

/**
 * The services hub.
 *
 * Every card is generated from `services.ts`, so this page cannot list a
 * service whose page does not exist, and cannot miss one that does.
 */
export default function ServicesPage(): ReactElement {
  return (
    <>
      <PageHeader
        eyebrow="What we do"
        heading={TITLE}
        lead={DESCRIPTION}
        breadcrumbs={CRUMBS}
        actionSlot={
          <BookingLink
            href={BOOKING_PATH}
            location="services-hub-header"
            className={CTA_ACTION_CLASSES}
          >
            Book an appointment
          </BookingLink>
        }
      />

      <Section ariaLabelledBy="all-services-heading">
        <Container>
          {/* The cards title at <h3>; without an <h2> here the outline jumps
              from the header's <h1>. Visually hidden: the header already
              says "Our services", so a visible repeat adds nothing. */}
          <h2 id="all-services-heading" className="sr-only">
            All services
          </h2>
          <FeatureGrid>
            {SERVICES.map((service) => (
              <Card
                key={service.slug}
                title={service.title}
                body={service.summary}
                href={servicePath(service.slug)}
              />
            ))}
          </FeatureGrid>
        </Container>
      </Section>

      <CTA
        heading="Not sure which you need?"
        body="Book a check-up and we will tell you — including which of these you do not need."
        actionSlot={
          <BookingLink
            href={BOOKING_PATH}
            location="services-hub-cta"
            className={CTA_ACTION_CLASSES}
          >
            Book an appointment
          </BookingLink>
        }
      />

      <JsonLd
        data={[
          buildWebPageSchema({
            name: TITLE,
            url: absoluteUrl(SERVICES_PATH),
            description: DESCRIPTION,
            siteUrl: absoluteUrl('/'),
            inLanguage: 'en-US',
          }),
          buildBreadcrumbSchema({
            items: [
              { name: 'Home', url: absoluteUrl('/') },
              { name: TITLE, url: absoluteUrl(SERVICES_PATH) },
            ],
          }),
        ]}
      />
    </>
  )
}
