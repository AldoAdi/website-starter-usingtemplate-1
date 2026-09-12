import type { Metadata } from 'next'
import type { ReactElement } from 'react'
import { notFound } from 'next/navigation'
import {
  CheckList,
  Container,
  CTA,
  PageHeader,
  Prose,
  Section,
  CTA_ACTION_CLASSES,
} from '@aldoadi/website-template/components'
import { BookingLink, CallLink } from '@aldoadi/website-template/booking'
import {
  buildBreadcrumbSchema,
  buildMetadata,
  buildServiceSchema,
  buildWebPageSchema,
  JsonLd,
} from '@aldoadi/website-template/seo'
import { SITE } from '../../siteConfig'
import { BOOKING_PATH } from '../../bookingConfig'
import { PRACTICE } from '../../practice'
import { SERVICES, SERVICES_PATH, findService, servicePath } from '../../services'
import { absoluteUrl } from '../../urls'

interface ServicePageProps {
  // Next 15 onward hands route params in asynchronously.
  readonly params: Promise<{ readonly slug: string }>
}

/**
 * Required by `output: 'export'`: without it there is no list of slugs to
 * render, and the build emits no service pages at all rather than failing
 * loudly. Deriving it from the catalogue means a new service ships a page
 * with no second edit.
 */
export function generateStaticParams(): { slug: string }[] {
  return SERVICES.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = findService(slug)

  if (!service) return buildMetadata(SITE)

  return buildMetadata(SITE, {
    path: servicePath(service.slug),
    title: service.title,
    description: service.summary,
  })
}

/**
 * One treatment area.
 *
 * All ten pages are this file. The copy lives in `services.ts`, so a new
 * service is an object in an array rather than a page to build, and every
 * page keeps the same heading order, the same breadcrumb trail and the same
 * structured data without anyone having to remember to add it.
 */
export default async function ServicePage({ params }: ServicePageProps): Promise<ReactElement> {
  const { slug } = await params
  const service = findService(slug)

  // A slug outside `generateStaticParams` cannot normally be reached under
  // a static export, but the guard is what turns an impossible route into
  // a 404 rather than a crash if one ever is.
  if (!service) notFound()

  const path = servicePath(service.slug)

  return (
    <>
      <PageHeader
        eyebrow="Services"
        heading={service.title}
        lead={service.lead}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: SERVICES_PATH },
          { label: service.title },
        ]}
        actionSlot={
          <>
            <BookingLink
              href={BOOKING_PATH}
              location={`service-${service.slug}-header`}
              className={CTA_ACTION_CLASSES}
            >
              Book an appointment
            </BookingLink>
            <CallLink
              phone={PRACTICE.phone}
              location={`service-${service.slug}-header`}
              className="border-border inline-flex items-center justify-center rounded-md border px-5 py-2.5 text-sm font-semibold"
            />
          </>
        }
      />

      <Section ariaLabelledBy="detail-heading">
        <Container className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <Prose>
            <h2 id="detail-heading">{`About ${service.title}`}</h2>
            {service.sections.map((section) => (
              <section key={section.heading}>
                <h3>{section.heading}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </Prose>

          <aside className="border-border bg-secondary h-fit rounded-lg border p-6">
            <h2 className="mb-4 text-lg font-semibold tracking-tight">What this covers</h2>
            <CheckList items={[...service.treatments]} label={`${service.title} treatments`} />
          </aside>
        </Container>
      </Section>

      <CTA
        heading="Book, or just ask"
        body="If you are not sure this is what you need, call and describe it. We will tell you."
        actionSlot={
          <BookingLink
            href={BOOKING_PATH}
            location={`service-${service.slug}-cta`}
            className={CTA_ACTION_CLASSES}
          >
            Book an appointment
          </BookingLink>
        }
      />

      <JsonLd
        data={[
          buildWebPageSchema({
            name: service.title,
            url: absoluteUrl(path),
            description: service.summary,
            siteUrl: absoluteUrl('/'),
            inLanguage: 'en-US',
          }),
          buildServiceSchema({
            name: service.title,
            description: service.summary,
            url: absoluteUrl(path),
            serviceType: service.title,
            areaServed: `${PRACTICE.address.locality}, ${PRACTICE.address.region}`,
            provider: { name: PRACTICE.name, url: absoluteUrl('/') },
          }),
          buildBreadcrumbSchema({
            items: [
              { name: 'Home', url: absoluteUrl('/') },
              { name: 'Services', url: absoluteUrl(SERVICES_PATH) },
              { name: service.title, url: absoluteUrl(path) },
            ],
          }),
        ]}
      />
    </>
  )
}
