// One place the booking handoff is declared, mirroring siteConfig.ts.
//
// The point of routing bookings through our own /book is that this is the
// only place the third-party scheduler is named. Every ad, every Google
// Business Profile listing and every printed card points at /book instead,
// so changing scheduler is a change here rather than a reprint.
//
// `||`, not `??`: an unset GitHub Actions variable arrives as an empty
// string, which `??` keeps -- and /book would then redirect to itself.
export const BOOKING_URL = assertHttpsUrl(
  process.env.NEXT_PUBLIC_BOOKING_URL || 'https://example.com/schedule',
)

// This value is handed to location.replace() and an <a href>, so a
// `javascript:` or `data:` URL here is script execution on our origin. The
// library passes an unparsable URL through untouched, so the check lives at
// this boundary and fails the build rather than shipping.
function assertHttpsUrl(raw: string): string {
  let url: URL
  try {
    url = new URL(raw)
  } catch {
    throw new Error(`NEXT_PUBLIC_BOOKING_URL is not an absolute URL: ${raw}`)
  }
  if (url.protocol !== 'https:') {
    throw new Error(`NEXT_PUBLIC_BOOKING_URL must use https: ${raw}`)
  }
  return raw
}

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
