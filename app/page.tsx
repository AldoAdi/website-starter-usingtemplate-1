import type { ReactElement } from 'react'
import {
  Card,
  ContactForm,
  Container,
  CookieBanner,
  CTA,
  FAQ,
  FeatureGrid,
  Footer,
  Header,
  HoursTable,
  LogoStrip,
  PlaceholderImage,
  SectionHeading,
  Section,
  Steps,
  Testimonial,
  TrustBar,
  CTA_ACTION_CLASSES,
  HERO_PRIMARY_ACTION_CLASSES,
  Hero,
} from '@aldoadi/website-template/components'
import { BookingLink, CallLink } from '@aldoadi/website-template/booking'
import { BOOKING_PATH } from './bookingConfig'
import {
  FAQS,
  FIRST_VISIT_STEPS,
  HOURS_ROWS,
  INSURERS,
  PRACTICE,
  SERVICES,
  TESTIMONIALS,
  TRUST_ITEMS,
} from './practice'

// Public by design -- it names the destination inbox, it is not a secret.
// Read from env rather than inlined so each site points at its own inbox.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? ''

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'New patients', href: '#new-patients' },
  { label: 'Visit us', href: '#visit' },
]

const FOOTER_LINKS = [
  { label: 'Privacy', href: '#privacy' },
  { label: 'Accessibility', href: '#accessibility' },
]

/**
 * The sample page.
 *
 * Ordered around the four questions a local practice actually gets asked,
 * because a page is a sequence of objections answered, not a list of things
 * the business would like to say: can I get seen, are you any good, do you
 * take my insurance, and where exactly are you.
 *
 * Four tracked CTAs with four different `location` values -- header, hero,
 * the emergency band, and the closing band. That is the first question
 * anyone asks of funnel data ("which placement actually earns bookings?")
 * and it cannot be answered retroactively, so placement is recorded from
 * the first click. The phone links are tracked the same way: on a practice
 * like this the call is frequently the larger half of the funnel, and a
 * report that counts only bookings is a report that is wrong.
 *
 * Heading order is deliberate: Hero owns the page's only <h1>, every
 * SectionHeading is an <h2>, and Card, FAQ and Steps titles sit at <h3>.
 */
export default function Home(): ReactElement {
  return (
    <>
      <Header
        logo={<span className="text-lg font-bold tracking-tight">{PRACTICE.name}</span>}
        links={NAV_LINKS}
        actions={
          <CallLink
            phone={PRACTICE.phone}
            location="header"
            className="text-primary hidden text-sm font-semibold sm:inline"
          />
        }
      />
      <main>
        <Hero
          eyebrow="Long Beach, California"
          headline="A dentist who tells you what it costs before you say yes"
          subhead="Same-day emergency appointments, Thursday evenings until 7, and a written plan with your insurance already taken off it."
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
          image={
            <PlaceholderImage
              label="Photo: the practice's own reception or treatment room, landscape. Replace before launch — stock dentistry photography is the fastest way to look like every other site in town."
              aspect="4 / 3"
            />
          }
        />

        {/* Proof points immediately under the hero, where the visitor is
            still deciding whether to keep reading. */}
        <Container className="-mt-8">
          <TrustBar items={[...TRUST_ITEMS]} />
        </Container>

        <Section id="services" ariaLabelledBy="services-heading">
          <Container className="flex flex-col gap-10">
            <SectionHeading
              id="services-heading"
              eyebrow="What we do"
              heading="Everything most families need, in one place"
              lead="General, cosmetic and emergency care under one roof — so nobody is coordinating between two offices on your behalf."
            />
            <FeatureGrid>
              {SERVICES.map((service) => (
                <Card key={service.title} title={service.title} body={service.body} />
              ))}
            </FeatureGrid>
          </Container>
        </Section>

        {/*
          The emergency band is composed here rather than with `CTA` because
          it needs the urgent palette, and `CTA` hardcodes `bg-primary`.
          Passing a competing `bg-urgent` through `className` would leave the
          winner to stylesheet order rather than to intent -- a coin flip
          that happens to land right in dev and wrong in a production build.
        */}
        <Section ariaLabel="Emergency appointments" className="bg-urgent text-urgent-foreground">
          <Container className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm font-semibold tracking-wide uppercase opacity-90">
              In pain right now?
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
              Call before noon, and we will see you today
            </h2>
            <p className="max-w-2xl text-lg text-balance opacity-90">
              Chipped, knocked out, or an abscess that kept you up. Emergency slots are held back
              every weekday morning for exactly this.
            </p>
            <CallLink
              phone={PRACTICE.phone}
              location="emergency-band"
              className="bg-background text-foreground hover:bg-background/90 mt-2 inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-semibold transition-colors"
            >
              {`Call ${PRACTICE.phone}`}
            </CallLink>
          </Container>
        </Section>

        <Section id="new-patients" ariaLabelledBy="insurance-heading" className="bg-secondary">
          <Container className="flex flex-col gap-8">
            <SectionHeading
              id="insurance-heading"
              align="center"
              eyebrow="New patients"
              heading="We are in-network with most major plans"
              lead="If yours is not listed, call and we will check it before you book rather than after."
            />
            <LogoStrip label="Insurance accepted" items={[...INSURERS]} />
            <p className="text-muted-foreground text-center text-sm">
              No insurance?{' '}
              <a className="text-primary underline underline-offset-4" href="#contact">
                Ask about the membership plan
              </a>{' '}
              — two cleanings, exams and X-rays for a flat annual fee.
            </p>
          </Container>
        </Section>

        <Section ariaLabelledBy="dentist-heading">
          <Container className="grid items-center gap-10 md:grid-cols-2">
            <PlaceholderImage
              label="Photo: Dr Reyes, portrait, in the practice rather than against a backdrop. A real face is the single biggest trust signal on a page like this."
              aspect="1 / 1"
              className="md:max-w-sm"
            />
            <div className="flex flex-col gap-6">
              <SectionHeading
                id="dentist-heading"
                eyebrow="Who you will see"
                heading="Dr Alana Reyes, DDS"
                lead="UCLA School of Dentistry. Practising in Long Beach since 2008, and living about four blocks from the office."
              />
              <p className="text-muted-foreground text-pretty">
                “Most people who walk in here have put it off for a while, and almost none of them
                need the thing they are dreading. My job is to tell you what is actually going on,
                what it costs, and what happens if you wait — and then let you decide.”
              </p>
            </div>
          </Container>
        </Section>

        <Section id="reviews" ariaLabelledBy="reviews-heading" className="bg-secondary">
          <Container className="flex flex-col gap-10">
            <SectionHeading
              id="reviews-heading"
              align="center"
              eyebrow="Reviews"
              heading="What patients say afterwards"
            />
            <FeatureGrid>
              {TESTIMONIALS.map((testimonial) => (
                <Testimonial
                  key={testimonial.author}
                  quote={testimonial.quote}
                  author={testimonial.author}
                  detail={testimonial.detail}
                  rating={testimonial.rating}
                />
              ))}
            </FeatureGrid>
          </Container>
        </Section>

        <Section ariaLabelledBy="first-visit-heading">
          <Container className="flex flex-col gap-10">
            <SectionHeading
              id="first-visit-heading"
              eyebrow="Your first visit"
              heading="No surprises, including on the bill"
              lead="The part that puts people off is not the dentistry. It is not knowing what it will cost until it is already happening."
            />
            <Steps items={[...FIRST_VISIT_STEPS]} />
          </Container>
        </Section>

        <Section id="visit" ariaLabelledBy="visit-heading" className="bg-secondary">
          <Container className="grid gap-10 md:grid-cols-2">
            <div className="flex flex-col gap-6">
              <SectionHeading
                id="visit-heading"
                eyebrow="Visit us"
                heading="On Ocean Boulevard, with parking underneath"
              />
              <address className="text-muted-foreground flex flex-col gap-1 not-italic">
                <span>{PRACTICE.address.street}</span>
                <span>
                  {PRACTICE.address.locality}, {PRACTICE.address.region}{' '}
                  {PRACTICE.address.postalCode}
                </span>
                <CallLink
                  phone={PRACTICE.phone}
                  location="visit-us"
                  className="text-primary mt-2 font-semibold"
                />
              </address>
              <a
                className="text-primary text-sm underline underline-offset-4"
                href={PRACTICE.mapsUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open in maps
              </a>
            </div>
            <div className="border-border bg-background rounded-lg border p-6">
              <HoursTable rows={[...HOURS_ROWS]} />
            </div>
          </Container>
        </Section>

        <Section ariaLabelledBy="faq-heading">
          <Container className="flex max-w-3xl flex-col gap-8">
            <SectionHeading
              id="faq-heading"
              eyebrow="Questions"
              heading="The things people call to ask"
            />
            <FAQ items={[...FAQS]} />
          </Container>
        </Section>

        <CTA
          heading="Ready when you are"
          body="Most new patients are seen within the week. Booking takes about a minute and you can move it later."
          actionSlot={
            <BookingLink href={BOOKING_PATH} location="cta-band" className={CTA_ACTION_CLASSES}>
              Book an appointment
            </BookingLink>
          }
        />

        <Section id="contact" ariaLabelledBy="contact-heading">
          <Container className="max-w-xl">
            <SectionHeading
              id="contact-heading"
              heading="Send us a message"
              lead="For anything that is not urgent. If it is, calling is faster."
              className="mb-8"
            />
            <ContactForm accessKey={WEB3FORMS_KEY} subject="Website enquiry" />
          </Container>
        </Section>
      </main>
      <Footer
        links={FOOTER_LINKS}
        copyright={`© 2026 ${PRACTICE.name}`}
        info={
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <p className="font-semibold">{PRACTICE.name}</p>
              <address className="text-muted-foreground text-sm not-italic">
                {PRACTICE.address.street}
                <br />
                {PRACTICE.address.locality}, {PRACTICE.address.region} {PRACTICE.address.postalCode}
              </address>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <p className="font-semibold">Contact</p>
              {/* Tracked, like every other phone link on the page. The footer
                  number is the last thing a visitor sees before giving up. */}
              <CallLink
                phone={PRACTICE.phone}
                location="footer"
                className="text-primary font-medium"
              />
              <a
                className="text-muted-foreground underline underline-offset-4"
                href={PRACTICE.mapsUrl}
                target="_blank"
                rel="noreferrer"
              >
                Directions
              </a>
            </div>
            <HoursTable rows={[...HOURS_ROWS]} caption="Hours" />
          </div>
        }
      />
      <CookieBanner />
    </>
  )
}
