import type { Metadata, Viewport } from 'next'
import type { ReactElement, ReactNode } from 'react'
import { ThemeProvider } from '@aldoadi/website-template/theme'
import { GoogleAnalytics } from '@aldoadi/website-template/analytics'
import './globals.css'

export const metadata: Metadata = {
  title: 'Website Template Starter',
  description: 'T2 walking skeleton for @aldoadi/website-template.',
}

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
      <body className="bg-background text-foreground font-sans">
        <ThemeProvider>
          {children}
          {/* Renders nothing until the visitor grants consent, and nothing at
              all when NEXT_PUBLIC_GA_ID is unset -- which is the normal
              state locally. */}
          <GoogleAnalytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
