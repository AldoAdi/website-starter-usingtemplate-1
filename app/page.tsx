import type { ReactElement } from 'react'
import {
  Card,
  Carousel,
  CheckList,
  ContactCards,
  ContactForm,
  Container,
  CTA,
  FAQ,
  FeatureGrid,
  HoursTable,
  LogoStrip,
  MapEmbed,
  OfferCard,
  PlaceholderImage,
  Reveal,
  SectionHeading,
  Section,
  SplitSection,
  Steps,
  Testimonial,
  TrustBar,
  CTA_ACTION_CLASSES,
  HERO_PRIMARY_ACTION_CLASSES,
  Hero,
} from '@aldoadi/website-template/components'
import { BookingLink, CallLink } from '@aldoadi/website-template/booking'
import { buildFaqPageSchema, buildWebPageSchema, JsonLd } from '@aldoadi/website-template/seo'
import { BOOKING_PATH } from './bookingConfig'
import { SITE } from './siteConfig'
import { SERVICES, SERVICES_PATH, servicePath } from './services'
import { absoluteUrl } from './urls'
import {
  DOCTOR,
  FAQS,
  FIRST_VISIT_STEPS,
  HOURS_ROWS,
  INSURERS,
  MAP,
  OFFERS,
  PRACTICE,
  TESTIMONIALS,
  TRUST_ITEMS,
  VALUE_PROPS,
} from './practice'

// Public by design -- it names the destination inbox, it is not a secret.
// Read from env rather than inlined so each site points at its own inbox.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? ''

/**
 * The home page.
 *
 * Ordered around the questions a local practice actually gets asked,
 * because a page is a sequence of objections answered, not a list of things
 * the business would like to say: can I get seen, is there an offer, who
 * will I see, are you any good, what do you do, do you take my insurance,
 * and where exactly are you.
 *
 * Every CTA carries a distinct `location`. That is the first question
 * anyone asks of funnel data ("which placement actually earns bookings?")
 * and it cannot be answered retroactively, so placement is recorded from
 * the first click. The phone links are tracked the same way: on a practice
 * like this the call is frequently the larger half of the funnel, and a
 * report that counts only bookings is a report that is wrong.
 *
 * Heading order is deliberate: Hero owns the page's only <h1>, every
 * SectionHeading is an <h2>, and Card, FAQ, Steps and offer titles sit at
 * <h3>. The shell (header, footer, main) lives in layout.tsx.
 */
export default function Home(): ReactElement {
  return (
    <>
      <Hero
        eyebrow="Long Beach, California"
        headline="A dentist who tells you what it costs before you say yes"
        subhead="Same-day emergency appointments, Thursday evenings until 7, and a written plan with your insurance already taken off it."
        primaryActionSlot={
          <BookingLink href={BOOKING_PATH} location="hero" className={HERO_PRIMARY_ACTION_CLASSES}>
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

      {/* The three promises, each one something the practice can be held
          to. Vague claims are absent on purpose: every site in town makes
          them, so they distinguish nothing. */}
      <SplitSection
        ariaLabelledBy="promises-heading"
        mediaSide="end"
        media={
          <PlaceholderImage
            label="Photo: a real patient interaction — front desk, or a hygienist mid-appointment. Faces, not equipment."
            aspect="4 / 3"
          />
        }
      >
        <SectionHeading
          id="promises-heading"
          eyebrow="Why people stay"
          heading="Made to fit around the rest of your week"
        />
        <CheckList items={[...VALUE_PROPS]} label="What we promise" />
      </SplitSection>

      <Section ariaLabelledBy="welcome-heading" className="bg-secondary">
        <Container className="flex max-w-3xl flex-col gap-6 text-center">
          <SectionHeading
            id="welcome-heading"
            align="center"
            eyebrow={`Welcome to ${PRACTICE.name}`}
            heading="Family dentistry in Long Beach, done unhurriedly"
          />
          <p className="text-muted-foreground text-lg text-pretty">
            We look after every age in a household, from a toddler&rsquo;s first tooth to a
            grandparent&rsquo;s implants, and we book appointments long enough to explain what we
            found. Routine check-ups, same-day emergencies, and the restorative work other
            practices refer out — all in one building, off one car park.
          </p>
        </Container>
      </Section>

      <Section id="offers" ariaLabelledBy="offers-heading">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            id="offers-heading"
            align="center"
            eyebrow="New patients"
            heading="Two offers worth knowing about before you book"
            lead="Both are for people without insurance, and both include the X-rays that usually turn a quoted price into a bigger one."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {OFFERS.map((offer, index) => (
              <Reveal key={offer.title} delayMs={index * 80}>
                <OfferCard
                  eyebrow={offer.eyebrow}
                  title={offer.title}
                  body={offer.body}
                  terms={offer.terms}
                  actionSlot={
                    <BookingLink
                      href={BOOKING_PATH}
                      location={`offer-${index + 1}`}
                      className="bg-primary text-primary-foreground inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold"
                    >
                      Claim this offer
                    </BookingLink>
                  }
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* The three answers to "how do I reach you", together, rather than
          scattered between the header, the hero and the footer. */}
      <Section ariaLabel="Ways to get in touch" className="bg-secondary">
        <Container>
          <ContactCards
            items={[
              {
                icon: '☎',
                title: 'Call us',
                content: <CallLink phone={PRACTICE.phone} location="contact-cards" />,
              },
              {
                icon: '🗓',
                title: 'Appointments',
                content: (
                  <BookingLink
                    href={BOOKING_PATH}
                    location="contact-cards"
                    className="text-primary"
                  >
                    Book appointment
                  </BookingLink>
                ),
              },
              {
                icon: '📍',
                title: 'Visit us',
                content: (
                  <a className="text-primary" href="#visit">
                    {PRACTICE.address.street}
                  </a>
                ),
              },
            ]}
          />
        </Container>
      </Section>

      <SplitSection
        ariaLabelledBy="dentist-heading"
        media={
          <PlaceholderImage
            label={`Photo: ${DOCTOR.shortName}, portrait, in the practice rather than against a backdrop. A real face is the single biggest trust signal on a page like this.`}
            aspect="1 / 1"
            className="md:max-w-sm"
          />
        }
      >
        <SectionHeading
          id="dentist-heading"
          eyebrow="Who you will see"
          heading={DOCTOR.name}
          lead={DOCTOR.summary}
        />
        <p className="text-muted-foreground text-pretty">&ldquo;{DOCTOR.quote}&rdquo;</p>
        <a
          className="text-primary text-sm font-semibold underline underline-offset-4"
          href={DOCTOR.bioPath}
        >
          Read the full bio
        </a>
      </SplitSection>

      {/* A carousel rather than a grid: reviews are read one at a time, and
          a row of three on desktop scrolls to the rest without pushing the
          services section a screen further down. */}
      <Section id="reviews" ariaLabelledBy="reviews-heading" className="bg-secondary">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            id="reviews-heading"
            align="center"
            eyebrow="Reviews"
            heading="What patients say afterwards"
          />
          <Carousel
            label="Patient reviews"
            items={TESTIMONIALS.map((testimonial) => (
              <Testimonial
                key={testimonial.author}
                quote={testimonial.quote}
                author={testimonial.author}
                detail={testimonial.detail}
                rating={testimonial.rating}
              />
            ))}
          />
        </Container>
      </Section>

      <Section id="services" ariaLabelledBy="services-heading">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            id="services-heading"
            eyebrow="What we do"
            heading="Everything most families need, in one place"
            lead="General, cosmetic, restorative and emergency care under one roof — so nobody is coordinating between two offices on your behalf."
          />
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
          <p className="text-muted-foreground text-sm">
            <a className="text-primary underline underline-offset-4" href={SERVICES_PATH}>
              See all services
            </a>
          </p>
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
            <a className="text-primary underline underline-offset-4" href="#offers">
              Start with the $75 new patient offer
            </a>{' '}
            — or ask about the membership plan, two cleanings and exams for a flat annual fee.
          </p>
        </Container>
      </Section>

      <Section id="first-visit" ariaLabelledBy="first-visit-heading">
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

      <SplitSection
        ariaLabelledBy="technology-heading"
        mediaSide="end"
        className="bg-secondary"
        media={
          <PlaceholderImage
            label="Photo: the scanner or the X-ray unit in use, with a person in frame. Equipment alone photographs as a stock catalogue."
            aspect="4 / 3"
          />
        }
      >
        <SectionHeading
          id="technology-heading"
          eyebrow="Advanced technology"
          heading="Fewer appointments, less guesswork"
          lead="Digital scanning instead of impression trays, and X-rays at a fraction of the dose of the film they replaced."
        />
        <p className="text-muted-foreground text-pretty">
          Same-visit crowns where the tooth allows it, a scan you can see on the screen while we
          talk through it, and records that go to a specialist electronically rather than in an
          envelope you have to carry.
        </p>
      </SplitSection>

      <Section id="visit" ariaLabelledBy="visit-heading">
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
                {PRACTICE.address.locality}, {PRACTICE.address.region} {PRACTICE.address.postalCode}
              </span>
              <CallLink
                phone={PRACTICE.phone}
                location="visit-us"
                className="text-primary mt-2 font-semibold"
              />
            </address>
            <div className="border-border bg-background rounded-lg border p-6">
              <HoursTable rows={[...HOURS_ROWS]} />
            </div>
            <a
              className="text-primary text-sm underline underline-offset-4"
              href={PRACTICE.mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open in maps
            </a>
          </div>
          {/* Renders a placeholder with a plain directions link until the
              visitor allows third-party cookies -- directions are never
              reachable only by accepting tracking. */}
          <MapEmbed embedUrl={MAP.embedUrl} linkUrl={MAP.linkUrl} title={MAP.title} />
        </Container>
      </Section>

      <Section ariaLabelledBy="faq-heading" className="bg-secondary">
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

      {/* Page-level markup: the questions and the page identity are this
          page's content, so they are emitted here rather than from the
          shared layout, where they would attach to every route. */}
      <JsonLd
        data={[
          buildWebPageSchema({
            name: SITE.defaultTitle,
            url: absoluteUrl('/'),
            description: SITE.description,
            siteUrl: absoluteUrl('/'),
            inLanguage: 'en-US',
          }),
          buildFaqPageSchema({ items: [...FAQS] }),
        ]}
      />
    </>
  )
}
