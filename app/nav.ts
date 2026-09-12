import type { NavItem } from '@aldoadi/website-template/components'
import { SERVICES, SERVICES_PATH, servicePath } from './services'
import { DOCTOR } from './practice'

/**
 * The primary navigation tree, derived from the service catalogue rather
 * than typed out beside it.
 *
 * A hand-written mega menu and a page list drift apart within about two
 * edits: a service is renamed on its page and keeps its old label in the
 * menu, or is added to the menu before its page exists. Deriving the whole
 * Services branch from `services.ts` makes both impossible.
 *
 * Everything that is not a service is listed explicitly, because those
 * entries have no single source to derive from.
 */
export const NAV_LINKS: readonly NavItem[] = [
  {
    label: 'Services',
    href: SERVICES_PATH,
    items: SERVICES.map((service) => ({
      label: service.title,
      href: servicePath(service.slug),
      // The individual treatments have no pages of their own yet, so each
      // points at the service page that covers it. A deep link to a section
      // would be a lie about a heading that is not there.
      items: service.treatments.map((treatment) => ({
        label: treatment,
        href: servicePath(service.slug),
      })),
    })),
  },
  {
    label: 'About',
    items: [
      { label: DOCTOR.shortName, href: DOCTOR.bioPath, description: 'Meet the dentist' },
      { label: 'New patients', href: '/#new-patients' },
      { label: 'Your first visit', href: '/#first-visit' },
      { label: 'Reviews', href: '/#reviews' },
    ],
  },
  { label: 'Offers', href: '/#offers' },
  { label: 'Visit us', href: '/#visit' },
  { label: 'Contact', href: '/#contact' },
]

export const FOOTER_LINKS = [
  { label: 'Privacy', href: '/#privacy' },
  { label: 'Accessibility', href: '/#accessibility' },
]
