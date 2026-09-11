import type { DayOfWeek, OpeningHoursInput } from '@aldoadi/website-template/seo'
import type { HoursRow } from '@aldoadi/website-template/components'

/**
 * Everything about the practice, in one place.
 *
 * This file exists for the same reason `siteConfig.ts` does: the address in
 * the footer, the hours in the location block and the hours inside the
 * `LocalBusiness` structured data are the same facts rendered three ways,
 * and a search engine treats a disagreement between the visible page and the
 * markup as a reason to distrust both. Declaring them once makes that class
 * of drift impossible rather than merely unlikely.
 *
 * Bayside Family Dental is fictional, and so is every number here --
 * including the rating and the review count. Replace the whole file when you
 * clone this; none of it is a safe default.
 */

export const PRACTICE = {
  name: 'Bayside Family Dental',
  /** Written the way it should read. `toTelHref` derives the dial string. */
  phone: '(562) 555-0100',
  email: 'hello@baysidefamilydental.example',
  address: {
    street: '4200 E Ocean Blvd, Suite 210',
    locality: 'Long Beach',
    region: 'CA',
    postalCode: '90803',
    country: 'US',
  },
  /** Opens the address in whichever map app the visitor actually uses. */
  mapsUrl: 'https://maps.google.com/?q=4200+E+Ocean+Blvd+Long+Beach+CA+90803',
} as const

/**
 * Opening hours, declared once in machine order and rendered two ways.
 *
 * `label` is what a human reads; `days`/`opens`/`closes` is what
 * `buildLocalBusinessSchema` needs. A closed day carries no times at all --
 * schema.org expresses "closed" by omission, not by a zero-length range.
 */
interface HoursEntry {
  readonly label: string
  readonly display: string
  readonly closed?: boolean
  readonly days?: readonly DayOfWeek[]
  readonly opens?: string
  readonly closes?: string
}

const HOURS: readonly HoursEntry[] = [
  {
    label: 'Mon – Wed',
    display: '8:00am – 5:00pm',
    days: ['Monday', 'Tuesday', 'Wednesday'],
    opens: '08:00',
    closes: '17:00',
  },
  {
    label: 'Thursday',
    display: '8:00am – 7:00pm',
    days: ['Thursday'],
    opens: '08:00',
    closes: '19:00',
  },
  {
    label: 'Friday',
    display: '8:00am – 2:00pm',
    days: ['Friday'],
    opens: '08:00',
    closes: '14:00',
  },
  { label: 'Sat – Sun', display: 'Closed', closed: true },
]

/** The visible table. */
export const HOURS_ROWS: readonly HoursRow[] = HOURS.map((entry) => ({
  days: entry.label,
  hours: entry.display,
  ...(entry.closed === true ? { closed: true } : {}),
}))

/** The same hours, as structured data. Closed days are absent by design. */
export const OPENING_HOURS: readonly OpeningHoursInput[] = HOURS.filter(
  (entry): entry is HoursEntry & Required<Pick<HoursEntry, 'days' | 'opens' | 'closes'>> =>
    entry.days !== undefined && entry.opens !== undefined && entry.closes !== undefined,
).map((entry) => ({ days: entry.days, opens: entry.opens, closes: entry.closes }))

export const SERVICES = [
  {
    title: 'Check-ups & cleanings',
    body: 'Exams, hygiene and X-rays on a schedule that suits your mouth rather than a default six months.',
  },
  {
    title: 'Fillings & crowns',
    body: 'Tooth-coloured restorations, and same-visit crowns where the tooth allows it.',
  },
  {
    title: 'Invisalign',
    body: 'Clear aligners with a scan and a preview of the result before you commit to anything.',
  },
  {
    title: 'Implants',
    body: 'Placement and restoration under one roof, so nobody is coordinating between two offices.',
  },
  {
    title: 'Whitening & veneers',
    body: 'Planned around the one thing you actually want changed, not a full-mouth sales pitch.',
  },
  {
    title: 'Emergencies',
    body: 'Chipped, knocked out, or keeping you awake. Call before noon and we will see you today.',
  },
] as const

export const FIRST_VISIT_STEPS = [
  {
    title: 'Book in 60 seconds',
    body: 'Pick a time online or call. New patients send their insurance details ahead so nothing is filled in on a clipboard.',
  },
  {
    title: 'A real examination',
    body: 'Exam, X-rays where they are needed, and a look at anything that has been bothering you.',
  },
  {
    title: 'A plan with prices on it',
    body: 'What needs doing now, what can wait, and what each part costs after your insurance. In writing, before you agree.',
  },
] as const

/**
 * Answers are plain strings, not JSX, because the same array feeds both the
 * visible `FAQ` component and `buildFaqPageSchema` -- and structured data
 * that says something different from the page is the definition of the
 * violation it would be flagged for.
 */
export const FAQS = [
  {
    question: 'Do you take my insurance?',
    answer:
      'We are in-network with Delta Dental, Cigna, MetLife, Aetna, Guardian and United Concordia, and we file claims for most other PPO plans as an out-of-network provider. If your plan is not listed, call and we will check it before you book.',
  },
  {
    question: 'What if I have no insurance?',
    answer:
      'Ask about the in-house membership plan. It covers two cleanings, exams and X-rays for a flat annual fee, and takes a percentage off any treatment you go on to have.',
  },
  {
    question: 'I am nervous about the dentist. Can you work with that?',
    answer:
      'Yes, and you are in a large majority. Tell us when you book. We schedule longer appointments, explain each step before it happens, and stop whenever you ask us to.',
  },
  {
    question: 'Do you see children?',
    answer:
      'From their first tooth. Children under six are usually booked in the morning, when they have the most patience for it.',
  },
  {
    question: 'How quickly can I be seen in an emergency?',
    answer:
      'Call before noon on a weekday and we will find you a slot the same day. If it is out of hours, the phone message gives the on-call number.',
  },
  {
    question: 'Where do I park?',
    answer:
      'There is free parking under the building, accessed from Ocean Boulevard. Suite 210 is on the second floor and the lift is opposite the entrance.',
  },
] as const

export const TESTIMONIALS = [
  {
    quote:
      'I had put off going for about four years. They took X-rays, told me what actually needed doing, and it was less than I had been dreading. Nobody made me feel stupid about the gap.',
    author: 'Marisol G.',
    detail: 'Patient since 2021',
    rating: 5,
  },
  {
    quote:
      'Chipped a front tooth on a Tuesday morning. I called at ten and was walking out with it fixed by half two. You cannot ask for more than that.',
    author: 'Danny W.',
    detail: 'Emergency appointment',
    rating: 5,
  },
  {
    quote:
      'They gave me the Invisalign quote in writing with the insurance already taken off, which is the first time a dentist has done that for me. Made the decision easy.',
    author: 'Priya N.',
    detail: 'Invisalign, 2024',
    rating: 5,
  },
] as const

export const INSURERS = [
  'Delta Dental',
  'Cigna',
  'MetLife',
  'Aetna',
  'Guardian',
  'United Concordia',
] as const

/**
 * Proof points for the trust bar. Every one of these is invented for the
 * sample -- the rating in particular. It is rendered as a visible claim and
 * deliberately never marked up as `aggregateRating`; see the note in the
 * library's `buildLocalBusinessSchema`.
 */
export const TRUST_ITEMS = [
  { value: 'Since 2008', label: 'In Long Beach' },
  { value: '4.9 ★', label: 'From 312 reviews' },
  { value: '6 insurers', label: 'In-network' },
  { value: 'Same day', label: 'For emergencies' },
] as const
