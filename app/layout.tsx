import type { Metadata, Viewport } from 'next'
import type { ReactElement, ReactNode } from 'react'
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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
