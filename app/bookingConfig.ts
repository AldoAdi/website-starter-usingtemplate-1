// One place the booking handoff is declared, mirroring siteConfig.ts.
//
// The point of routing bookings through our own /book is that this is the
// only place the third-party scheduler is named. Every ad, every Google
// Business Profile listing and every printed card points at /book instead,
// so changing scheduler is a change here rather than a reprint.
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? 'https://example.com/schedule'

// The site's own booking route. Never the scheduler URL -- handing a visitor
// straight off-domain is exactly what this module exists to stop.
export const BOOKING_PATH = '/book'

// Sinks are not declared here. The library resolves them from the
// environment (GA4 always; a first-party ingest sink when
// NEXT_PUBLIC_BOOKING_INGEST_URL is set), because a sink carries functions
// and Next cannot pass those from a server component to a client one.
//
// This site is a static export on GitHub Pages, so it has no route handler
// to ingest into and runs on GA4 alone. See docs/BOOKING.md in the library
// for the Vercel + Postgres path.
