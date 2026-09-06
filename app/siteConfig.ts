import type { SiteMetadataConfig } from '@aldoadi/website-template/seo'

// One place the site's identity and URL shape are declared. sitemap.ts,
// robots.ts and layout.tsx all read from here, so a sitemap entry, a
// robots Sitemap: line and a page's <link rel="canonical"> cannot drift
// apart -- they are all composed from the same siteUrl and basePath.
export const DEPLOY_TARGET =
  process.env.DEPLOY_TARGET === 'github-pages' ? 'github-pages' : 'vercel'

export const REPO_NAME = process.env.NEXT_PUBLIC_REPO_NAME ?? 'website-starter-usingtemplate-1'

export const BASE_PATH = DEPLOY_TARGET === 'github-pages' ? `/${REPO_NAME}` : undefined

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aldoadi.github.io'

// Must match what defineNextConfig sets for the target: it turns
// trailingSlash on for github-pages. Next then adds a trailing slash to
// rendered canonical URLs but not to sitemap URLs, so the sitemap has to be
// told, or the two disagree about the same page.
export const TRAILING_SLASH = DEPLOY_TARGET === 'github-pages'

export const SITE: SiteMetadataConfig = {
  siteUrl: SITE_URL,
  basePath: BASE_PATH,
  siteName: 'Website Template Starter',
  defaultTitle: 'Website Template Starter',
  description:
    'A starter site built on @aldoadi/website-template — shared theming, analytics, SEO and security for many sites from one library.',
}
