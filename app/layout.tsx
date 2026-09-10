import type { Metadata, Viewport } from 'next'
import type { ReactElement, ReactNode } from 'react'
import { ThemeProvider } from '@aldoadi/website-template/theme'
import { GoogleAnalytics, GoogleTagManager } from '@aldoadi/website-template/analytics'
import { TrackingInspector } from '@aldoadi/website-template/components'
import { AttributionCapture } from '@aldoadi/website-template/booking'
import { getMetaSecurityTags } from '@aldoadi/website-template/security'
import {
  buildMetadata,
  buildOrganizationSchema,
  buildWebSiteSchema,
  JsonLd,
} from '@aldoadi/website-template/seo'
import { SITE } from './siteConfig'
import './globals.css'

// Title template, description, canonical, Open Graph and Twitter card, all
// composed from the same siteUrl/basePath the sitemap uses -- so a page's
// canonical and its sitemap entry cannot disagree.
export const metadata: Metadata = buildMetadata(SITE)

// Read here rather than inside the component so the choice of tag stack is
// visible in one place at the top of the layout.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? ''

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

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
          {children}
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
          <JsonLd
            data={[
              buildOrganizationSchema({
                name: SITE.siteName,
                url: SITE.siteUrl,
              }),
              buildWebSiteSchema({ name: SITE.siteName, url: SITE.siteUrl }),
            ]}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
