import type { Metadata } from 'next'
import type { ReactElement } from 'react'
import {
  Container,
  CTA,
  PageHeader,
  PlaceholderImage,
  Prose,
  Section,
  CTA_ACTION_CLASSES,
} from '@aldoadi/website-template/components'
import { BookingLink } from '@aldoadi/website-template/booking'
import {
  buildBreadcrumbSchema,
  buildMetadata,
  buildPersonSchema,
  buildWebPageSchema,
  JsonLd,
} from '@aldoadi/website-template/seo'
import { SITE } from '../../siteConfig'
import { BOOKING_PATH } from '../../bookingConfig'
import { DOCTOR, PRACTICE } from '../../practice'
import { absoluteUrl } from '../../urls'

export const metadata: Metadata = buildMetadata(SITE, {
  path: DOCTOR.bioPath,
  title: DOCTOR.name,
  description: DOCTOR.summary,
})

/**
 * The clinician's own page.
 *
 * Worth a route of its own rather than a paragraph on the homepage: it is
 * what a patient sends to a family member, what a referral links to, and
 * the only page on the site that can carry `Person` structured data
 * honestly. `worksFor` is what tells a search engine that the reviews and
 * profiles held under a person's name belong to this practice.
 */
export default function DoctorPage(): ReactElement {
  return (
    <>
      <PageHeader
        eyebrow="Who you will see"
        heading={DOCTOR.name}
        lead={DOCTOR.summary}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: DOCTOR.shortName }]}
        actionSlot={
          <BookingLink href={BOOKING_PATH} location="doctor-bio-header" className={CTA_ACTION_CLASSES}>
            {`Book with ${DOCTOR.shortName}`}
          </BookingLink>
        }
      />

      <Section ariaLabelledBy="bio-heading">
        <Container className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <PlaceholderImage
            label={`Photo: ${DOCTOR.shortName}, portrait, in the practice rather than against a backdrop.`}
            aspect="1 / 1"
            className="h-fit"
          />
          <Prose>
            <h2 id="bio-heading">{`About ${DOCTOR.shortName}`}</h2>
            {DOCTOR.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <blockquote>{DOCTOR.quote}</blockquote>
          </Prose>
        </Container>
      </Section>

      <CTA
        heading="Book an appointment"
        body="New patients are usually seen within the week."
        actionSlot={
          <BookingLink href={BOOKING_PATH} location="doctor-bio-cta" className={CTA_ACTION_CLASSES}>
            Book an appointment
          </BookingLink>
        }
      />

      <JsonLd
        data={[
          buildWebPageSchema({
            name: DOCTOR.name,
            url: absoluteUrl(DOCTOR.bioPath),
            description: DOCTOR.summary,
            siteUrl: absoluteUrl('/'),
            inLanguage: 'en-US',
          }),
          buildPersonSchema({
            name: DOCTOR.name,
            jobTitle: DOCTOR.jobTitle,
            url: absoluteUrl(DOCTOR.bioPath),
            description: DOCTOR.summary,
            alumniOf: DOCTOR.alumniOf,
            worksFor: { name: PRACTICE.name, url: absoluteUrl('/') },
          }),
          buildBreadcrumbSchema({
            items: [
              { name: 'Home', url: absoluteUrl('/') },
              { name: DOCTOR.name, url: absoluteUrl(DOCTOR.bioPath) },
            ],
          }),
        ]}
      />
    </>
  )
}
