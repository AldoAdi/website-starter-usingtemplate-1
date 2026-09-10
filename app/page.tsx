import type { ReactElement } from "react";
import {
  Card,
  ContactForm,
  Container,
  CookieBanner,
  CTA,
  FeatureGrid,
  Footer,
  Header,
  HERO_PRIMARY_ACTION_CLASSES,
  Hero,
  Section,
} from "@aldoadi/website-template/components";
import { BookingLink } from "@aldoadi/website-template/booking";
import { BOOKING_PATH } from "./bookingConfig";

// Public by design -- it names the destination inbox, it is not a secret.
// Read from env rather than inlined so each site points at its own inbox.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Get started", href: "#get-started" },
  { label: "Contact", href: "#contact" },
];

const LIB_REPO = "https://github.com/AldoAdi/Website-template-lib";

const FOOTER_LINKS = [{ label: "Source", href: LIB_REPO }];

// Each card carries an href so the sample exercises Card's stretched-link
// path -- the whole card is clickable through the single link on its title.
const FEATURES = [
  {
    title: "One library, many sites",
    body: "Analytics, theming, SEO and security live here. A new site installs the library and inherits all of it.",
    href: `${LIB_REPO}/tree/main/src`,
  },
  {
    title: "Themed by CSS variables",
    body: "Every colour, radius and spacing step is a token. Override a handful in your own stylesheet and the whole site follows.",
    href: `${LIB_REPO}/blob/main/src/theme/theme.css`,
  },
  {
    title: "Static-export safe",
    body: "Nothing needs a Node server, so the same code deploys to Vercel or straight to GitHub Pages.",
    href: `${LIB_REPO}/blob/main/src/config/defineNextConfig.ts`,
  },
];

// Heading order is deliberate: Hero owns the page's only <h1>, each Section
// heading is an <h2>, and Card titles sit at <h3> beneath their section.
export default function Home(): ReactElement {
  return (
    <>
      <Header
        logo={<span className="font-bold">Website Template</span>}
        links={NAV_LINKS}
      />
      <main>
        {/* The primary CTA is a BookingLink rather than Hero's own
            primaryAction: a plain <Link> records nothing, and the click that
            starts a booking is the one click on the page worth measuring.
            `location` is what lets the funnel rank CTA placements later. */}
        <Hero
          eyebrow="Starter"
          headline="A shared template for every site you build"
          subhead="Develop the common parts once, in one library, and consume them from a pinned git reference."
          primaryActionSlot={
            <BookingLink
              href={BOOKING_PATH}
              location="hero"
              className={HERO_PRIMARY_ACTION_CLASSES}
            >
              Book an appointment
            </BookingLink>
          }
          secondaryAction={{ label: "View features", href: "#features" }}
        />

        <Section id="features" ariaLabelledBy="features-heading">
          <Container>
            <h2
              id="features-heading"
              className="mb-8 text-3xl font-bold tracking-tight"
            >
              What the library gives you
            </h2>
            <FeatureGrid>
              {FEATURES.map((feature) => (
                <Card
                  key={feature.title}
                  title={feature.title}
                  body={feature.body}
                  href={feature.href}
                />
              ))}
            </FeatureGrid>
          </Container>
        </Section>

        <div id="get-started">
          <CTA
            heading="Start a new site"
            body="Clone the starter, repoint the library pin, and you have a themed, analytics-ready site."
            action={{ label: "Read the source", href: LIB_REPO }}
          />
        </div>
        <Section id="contact" ariaLabelledBy="contact-heading">
          <Container className="max-w-xl">
            <h2
              id="contact-heading"
              className="mb-8 text-3xl font-bold tracking-tight"
            >
              Get in touch
            </h2>
            <ContactForm
              accessKey={WEB3FORMS_KEY}
              subject="Website template enquiry"
            />
          </Container>
        </Section>
      </main>
      <Footer links={FOOTER_LINKS} copyright="© 2026 Website Template" />
      <CookieBanner />
    </>
  );
}
