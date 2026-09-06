import type { MetadataRoute } from 'next'
import { buildRobots } from '@aldoadi/website-template/seo'

import { BASE_PATH, SITE_URL } from './siteConfig'

// Production/preview switch, taken from env rather than hardcoded so the
// same code path serves both. Mirrors Vercel's own auto-set VERCEL_ENV for
// that target; NEXT_PUBLIC_SITE_ENV covers GitHub Pages, where nothing is
// set automatically -- .github/workflows/deploy-pages.yml passes
// NEXT_PUBLIC_SITE_ENV=production for the live deploy.
//
// Unset, this blocks all crawling. That is deliberate: a local or preview
// build should never be indexable by accident, and opting in is a single
// explicit line in the deploy workflow. See buildRobots' doc comment.
const isProduction =
  process.env.VERCEL_ENV === 'production' || process.env.NEXT_PUBLIC_SITE_ENV === 'production'

// Required by `output: 'export'`: Next treats sitemap.ts/robots.ts as route
// handlers, and refuses to statically export one without an explicit
// opt-in. Without this line the build fails with
//   export const dynamic = "force-static" ... not configured on route
// rather than silently omitting the file.
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return buildRobots({ siteUrl: SITE_URL, basePath: BASE_PATH, isProduction })
}
