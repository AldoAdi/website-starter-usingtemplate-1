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

/**
 * The clinician, and the page that introduces them.
 *
 * A named face is the strongest trust signal a local practice has, and it
 * is the one piece of content a stock-photo template cannot fake. `bioPath`
 * is declared here rather than built at the call site so the homepage link,
 * the nav entry and the `Person` structured data all point at the same URL.
 */
export const DOCTOR = {
  name: 'Dr Alana Reyes, DDS',
  shortName: 'Dr Reyes',
  jobTitle: 'DDS',
  bioPath: '/about/dr-reyes',
  alumniOf: 'UCLA School of Dentistry',
  summary:
    'UCLA School of Dentistry. Practising in Long Beach since 2008, and living about four blocks from the office.',
  quote:
    'Most people who walk in here have put it off for a while, and almost none of them need the thing they are dreading. My job is to tell you what is actually going on, what it costs, and what happens if you wait — and then let you decide.',
  bio: [
    'Dr Reyes qualified at UCLA in 2006 and has practised in Long Beach ever since, the last fourteen years in this building. She took the practice over from its founder in 2015 and has kept the parts that worked: long appointments, plain language, and a written price before anything starts.',
    'Her clinical interest is in restoring teeth that other practices have offered to remove. She completed her implant training through the UCLA continuing education programme and places and restores implants here rather than referring them out.',
    'Outside the practice she is on the water most weekends, usually badly, and coaches a junior sailing squad at Alamitos Bay.',
  ],
} as const

/**
 * Advertised offers.
 *
 * Every one carries its terms. A headline price with no conditions attached
 * is the kind of claim that draws a regulator's attention in healthcare
 * advertising, which is why `OfferCard` makes `terms` a required prop rather
 * than an optional one.
 */
export const OFFERS = [
  {
    eyebrow: 'New patient offer',
    title: '$75 cleaning, exam & X-rays',
    body: 'A full first appointment — exam, hygiene, and a complete set of digital X-rays.',
    terms:
      '*New patients without insurance only. Excludes periodontal (deep) cleaning, which we will quote separately if it is what you need. Cannot be combined with other offers.',
  },
  {
    eyebrow: 'New patient offer',
    title: '$29 emergency exam & X-ray',
    body: 'Seen the same day, with the problem diagnosed and the cost of fixing it quoted before anything starts.',
    terms:
      '*New patients only. Covers the examination and one X-ray; any treatment is quoted separately and is never started without your agreement.',
  },
] as const

/**
 * The three promises the hero makes, each one a thing the practice can
 * actually be held to. Vague claims ("caring team", "state of the art") are
 * deliberately absent -- every site in town makes them, so they distinguish
 * nothing.
 */
export const VALUE_PROPS = [
  'Thursday evenings until 7, so nobody books a day off',
  'Same-day emergency slots held back every weekday morning',
  'A written price, with your insurance already deducted, before anything starts',
] as const

/**
 * Review and social profiles.
 *
 * These are also the `sameAs` targets in the structured data: they are how
 * a search engine finds the ratings this site is careful not to claim for
 * itself.
 */
export const SOCIALS = [
  { label: 'Google', href: 'https://www.google.com/maps', icon: 'G' },
  { label: 'Yelp', href: 'https://www.yelp.com', icon: 'Y' },
  { label: 'Instagram', href: 'https://www.instagram.com', icon: 'IG' },
] as const

/**
 * The map, as the two URLs every map block needs: one to embed, one to
 * open. The embed URL is the `/maps/embed?pb=` form from Google's own
 * "Share → Embed a map" dialog; an ordinary maps link will not render in a
 * frame.
 */
export const MAP = {
  embedUrl:
    'https://www.google.com/maps/embed/v1/place?key=REPLACE_ME&q=4200+E+Ocean+Blvd+Long+Beach+CA+90803',
  linkUrl: PRACTICE.mapsUrl,
  title: `Map to ${PRACTICE.name}`,
} as const
