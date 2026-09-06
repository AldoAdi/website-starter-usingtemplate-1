import type { Metadata, Viewport } from 'next'
import type { ReactElement, ReactNode } from 'react'
import { ThemeProvider } from '@aldoadi/website-template/theme'
import { GoogleAnalytics } from '@aldoadi/website-template/analytics'
import { getMetaSecurityTags } from '@aldoadi/website-template/security'
import { buildMetadata, buildOrganizationSchema, buildWebSiteSchema, JsonLd } from '@aldoadi/website-template/seo'
import { SITE } from './siteConfig'
import './globals.css'

// Title template, description, canonical, Open Graph and Twitter card, all
// composed from the same siteUrl/basePath the sitemap uses -- so a page's
// canonical and its sitemap entry cannot disagree.
export const metadata: Metadata = buildMetadata(SITE)

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}): ReactElement {
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
          {children}
          {/* Renders nothing until the visitor grants consent, and nothing at
              all when NEXT_PUBLIC_GA_ID is unset -- which is the normal
              state locally. */}
          <GoogleAnalytics />
          <JsonLd
            data={[
              buildOrganizationSchema({ name: SITE.siteName, url: SITE.siteUrl }),
              buildWebSiteSchema({ name: SITE.siteName, url: SITE.siteUrl }),
            ]}
          />
        </ThemeProvider>
      </body>
    </html>
  )
}
