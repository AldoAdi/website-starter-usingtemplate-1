import { buildCanonicalUrl } from '@aldoadi/website-template/seo'
import { BASE_PATH, SITE_URL } from './siteConfig'

/**
 * A page path as the absolute URL structured data requires.
 *
 * Wraps the library's canonical builder with this site's origin and
 * basePath so a `BreadcrumbList` item, a `WebPage` url and the page's own
 * `<link rel="canonical">` are all produced by the same function -- on
 * GitHub Pages the basePath segment is easy to forget in exactly one of the
 * three, and the disagreement is invisible until a crawler reports it.
 */
export function absoluteUrl(path: string): string {
  return buildCanonicalUrl(SITE_URL, BASE_PATH, path)
}
