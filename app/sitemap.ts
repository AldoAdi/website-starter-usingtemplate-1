import type { MetadataRoute } from "next";
import { buildSitemap } from "@aldoadi/website-template/seo";

import { BASE_PATH, SITE_URL, TRAILING_SLASH } from "./siteConfig";

// T2 walking skeleton is a single page (see app/page.tsx) -- add an entry
// here for each route the site grows beyond "/".
//
// /book and /book/confirmed are deliberately absent. A redirector has no
// content to rank and reads to a search engine as a doorway page; both
// routes also set robots: { index: false }. The human-readable "book an
// appointment" page is what belongs here, pointing its CTA at /book.
const ROUTES = [{ path: "/" }];

// Required by `output: 'export'`: Next treats sitemap.ts/robots.ts as route
// handlers, and refuses to statically export one without an explicit
// opt-in. Without this line the build fails with
//   export const dynamic = "force-static" ... not configured on route
// rather than silently omitting the file.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap({
    siteUrl: SITE_URL,
    basePath: BASE_PATH,
    trailingSlash: TRAILING_SLASH,
    routes: ROUTES,
  });
}
