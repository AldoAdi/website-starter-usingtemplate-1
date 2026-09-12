import type { Metadata, Viewport } from 'next'
import type { ReactElement, ReactNode } from 'react'
import { ThemeProvider } from '@aldoadi/website-template/theme'
import { GoogleAnalytics, GoogleTagManager } from '@aldoadi/website-template/analytics'
import {
  CookieBanner,
  Footer,
  Header,
  HoursTable,
  ScrollToTop,
  SkipLink,
  SocialLinks,
  TrackingInspector,
} from '@aldoadi/website-template/components'
import { AttributionCapture, BookingLink, CallLink, StickyCallBar } from '@aldoadi/website-template/booking'
import { getMetaSecurityTags } from '@aldoadi/website-template/security'
import {
  buildLocalBusinessSchema,
  buildMetadata,
  buildOrganizationSchema,
  buildWebSiteSchema,
  JsonLd,
} from '@aldoadi/website-template/seo'
import { SITE } from './siteConfig'
import { BOOKING_PATH } from './bookingConfig'
import { HOURS_ROWS, OPENING_HOURS, PRACTICE, SOCIALS } from './practice'
import { FOOTER_LINKS, NAV_LINKS } from './nav'
import './globals.css'

// Title template, description, canonical, Open Graph and Twitter card, all
// composed from the same siteUrl/basePath the sitemap uses -- so a page's
// canonical and its sitemap entry cannot disagree.
export const metadata: Metadata = buildMetadata(SITE)

// Read here rather than inside the component so the choice of tag stack is
// visible in one place at the top of the layout.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? ''

const SOCIAL_URLS = SOCIALS.map((social) => social.href)

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

/**
 * The shell every page shares: skip link, header, `<main>`, footer, and the
 * four fixed-position widgets.
 *
 * The header and footer live here rather than in each page because the site
 * now has more than one route, and a nav tree copied into three files is a
 * nav tree that disagrees with itself by the second edit. Pages render
 * sections; the shell renders everything around them.
 */
export default function RootLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    // suppressHydrationWarning is required by next-themes: its blocking
    // inline script sets the theme class on <html> before React hydrates,
    // so the server-rendered markup and the hydrated DOM differ by design.
    <html lang="en" suppressHydrationWarning>
      {/*
        GitHub Pages serves static files and cannot send HTTP response
        headers, so the CSP is delivered as a meta tag. This is genuinely
        weaker than the Vercel path: frame-ancestors and HSTS have no
        working meta form. See the library's src/security/headers.ts.
      */}
      <head>
        {getMetaSecurityTags().map((tag) => (
          <meta key={tag.httpEquiv} httpEquiv={tag.httpEquiv} content={tag.content} />
        ))}
      </head>
      <body className="bg-background text-foreground font-sans">
        <ThemeProvider>
          {/* Records the ad click on arrival, on every page. Without it the
              gclid is only read if the visitor happens to reach a booking
              CTA -- and an ad lands on the homepage far more often than on
              /book, so most clicks would go unattributed. */}
          <AttributionCapture />

          {/* First focusable element on the page. With a menu this size,
              reaching the content by keyboard without it means tabbing
              through every service on every page. */}
          <SkipLink />

          <Header
            logo={
              <a href="/" className="text-lg font-bold tracking-tight">
                {PRACTICE.name}
              </a>
            }
            links={NAV_LINKS}
            topBar={
              // One element, not a fragment: Header is a client component,
              // and a fragment handed across the RSC boundary arrives as an
              // unkeyed array React complains about from inside the library.
              <div className="flex w-full items-center justify-between gap-4">
                <span className="text-muted-foreground hidden sm:inline">
                  {`${PRACTICE.address.street}, ${PRACTICE.address.locality}`}
                </span>
                {/* Tracked from the utility bar too: on a practice like this
                    the call is frequently the larger half of the funnel. */}
                <CallLink phone={PRACTICE.phone} location="top-bar" className="font-semibold" />
              </div>
            }
            actions={
              <BookingLink
                href={BOOKING_PATH}
                location="header"
                className="bg-primary text-primary-foreground hidden rounded-md px-4 py-2 text-sm font-semibold sm:inline-flex"
              >
                Book now
              </BookingLink>
            }
          />

          {/* The skip link's target. `<main>` is focusable as a fragment
              target without a tabindex. */}
          <main id="main">{children}</main>

          <Footer
            links={FOOTER_LINKS}
            copyright={`© 2026 ${PRACTICE.name}`}
            info={
              <div className="grid gap-8 sm:grid-cols-3">
                <div className="flex flex-col gap-3">
                  <p className="font-semibold">{PRACTICE.name}</p>
                  <address className="text-muted-foreground text-sm not-italic">
                    {PRACTICE.address.street}
                    <br />
                    {PRACTICE.address.locality}, {PRACTICE.address.region}{' '}
                    {PRACTICE.address.postalCode}
                  </address>
                  <SocialLinks items={[...SOCIALS]} label="Find us online" />
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  <p className="font-semibold">Contact</p>
                  {/* The footer number is the last thing a visitor sees
                      before giving up, so it is tracked like every other. */}
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

          {/*
            Render exactly one of these. A GTM container sends to GA4 through
            its own configuration tag, so loading the direct GA4 script
            alongside it makes every event arrive twice. Each renders nothing
            until consent is granted, and nothing at all when its id is unset
            -- which is the normal state locally.

            track() picks the matching transport on its own, so the funnel
            code is identical either way.
          */}
          {GTM_ID ? <GoogleTagManager /> : <GoogleAnalytics />}

          {/* Off unless the URL carries ?debug=tracking, so real visitors
              never see it -- but it opens on any deploy, including
              production, without a rebuild. */}
          <TrackingInspector />

          <CookieBanner />

          {/* Two buttons pinned to the bottom of small screens. Renders
              nothing until the consent banner is answered -- it shares that
              edge of the viewport with CookieBanner, and burying Accept and
              Reject would mean consent could never be granted at all. */}
          <StickyCallBar phone={PRACTICE.phone} bookHref={BOOKING_PATH} />

          <ScrollToTop />

          {/*
            Site-level structured data only. Page-level markup (FAQPage,
            Service, BreadcrumbList) belongs to the page that renders the
            content it describes -- emitting a homepage FAQ from the shared
            layout would attach it to every service page too, where no such
            questions appear.

            Deliberately absent: aggregateRating. The visible trust bar shows
            a rating; marking it up would be a claim about reviews this site
            collected about itself, which is excluded from review rich results
            and invites a manual action rather than a star. The real ratings
            live on the profiles in `sameAs`.
          */}
          <JsonLd
            data={[
              buildOrganizationSchema({
                name: SITE.siteName,
                url: SITE.siteUrl,
                sameAs: SOCIAL_URLS,
              }),
              buildWebSiteSchema({ name: SITE.siteName, url: SITE.siteUrl }),
              buildLocalBusinessSchema({
                type: 'Dentist',
                name: PRACTICE.name,
                url: SITE.siteUrl,
                address: PRACTICE.address,
                telephone: PRACTICE.phone,
                priceRange: '$$',
                openingHours: OPENING_HOURS,
                sameAs: SOCIAL_URLS,
              }),
            ]}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
