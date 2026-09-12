/**
 * The service catalogue: one entry per treatment area.
 *
 * This is the site's information architecture in a single array. The
 * homepage grid, the services hub, every `/services/[slug]` page, the
 * mega-menu tree, the sitemap and the `Service` structured data are all
 * derived from it, so adding a service is one object here rather than six
 * edits that have to agree.
 *
 * Written for a fictional practice. Replace the copy; keep the shape.
 */
export interface ServiceSection {
  readonly heading: string
  readonly paragraphs: readonly string[]
}

export interface Service {
  /** URL segment under `/services`. Kebab-case, and never changed after launch. */
  readonly slug: string
  /** Nav and card label. */
  readonly title: string
  /** One sentence. Used on the homepage card and as the page's meta description. */
  readonly summary: string
  /** The opening line of the service's own page. */
  readonly lead: string
  /**
   * Individual treatments. These become the mega-menu's third level and a
   * check list on the page -- the specific words people search for
   * ("wisdom teeth", "root canal") rather than the category they sit under.
   */
  readonly treatments: readonly string[]
  readonly sections: readonly ServiceSection[]
}

export const SERVICES: readonly Service[] = [
  {
    slug: 'general-dentistry',
    title: 'General dentistry',
    summary:
      'Exams, hygiene and X-rays for the whole family, on a schedule that suits your mouth rather than a default six months.',
    lead: 'The ordinary appointments that stop the expensive ones happening.',
    treatments: ['Check-ups & exams', 'Hygiene appointments', 'Digital X-rays', 'Children from their first tooth'],
    sections: [
      {
        heading: 'What a check-up actually involves',
        paragraphs: [
          'A look at every tooth, the gums around them, and the soft tissue most people never think about — the tongue, the floor of the mouth, the back of the throat. X-rays where there is a reason to take them, not on a timetable.',
          'You leave knowing what is going on, what needs doing, and what it costs. If nothing needs doing, we say so and book you back in.',
        ],
      },
      {
        heading: 'How often you should come',
        paragraphs: [
          'Six months is a default, not a rule. Some people need three, most need six, and a few can safely go a year. We will tell you which you are rather than booking everyone the same.',
        ],
      },
    ],
  },
  {
    slug: 'preventative-dentistry',
    title: 'Preventative dentistry',
    summary:
      'Sealants, mouthguards and screening — the cheap work that stops small problems turning into crowns.',
    lead: 'Almost everything expensive in dentistry was once something small.',
    treatments: ['Dental sealants', 'Fluoride treatment', 'Oral cancer screening', 'Nightguards & sportsguards'],
    sections: [
      {
        heading: 'Sealants and fluoride',
        paragraphs: [
          'A sealant is a thin coat over the grooves of a back tooth, which is where decay starts in almost every child and a fair number of adults. It takes minutes, costs very little, and is the single best return on money in this building.',
        ],
      },
      {
        heading: 'Screening you will not notice',
        paragraphs: [
          'Oral cancer screening is part of every exam here, not an add-on. It is a two-minute look, and it is the reason to keep coming even when nothing hurts.',
        ],
      },
    ],
  },
  {
    slug: 'cosmetic-dentistry',
    title: 'Cosmetic dentistry',
    summary:
      'Whitening, bonding and veneers, planned around the one thing you actually want changed.',
    lead: 'Tell us what bothers you. We will tell you the smallest thing that fixes it.',
    treatments: ['Professional whitening', 'Composite bonding', 'Porcelain veneers', 'Smile makeovers'],
    sections: [
      {
        heading: 'The smallest thing that works',
        paragraphs: [
          'Most people who ask about veneers need whitening and one afternoon of bonding. We will say so, even though it is the smaller invoice, because a veneer is permanent and the tooth under it never grows back.',
        ],
      },
      {
        heading: 'Seeing it first',
        paragraphs: [
          'Anything substantial starts with a scan and a mock-up, so you are agreeing to a result rather than to a description of one.',
        ],
      },
    ],
  },
  {
    slug: 'invisalign',
    title: 'Invisalign',
    summary:
      'Clear aligners with a scan and a preview of the result before you commit to anything.',
    lead: 'Straightening without the year of metal, for the cases it genuinely suits.',
    treatments: ['Clear aligner treatment', 'Digital scan & preview', 'Refinements', 'Retainers'],
    sections: [
      {
        heading: 'Whether it will work for you',
        paragraphs: [
          'Aligners handle crowding, spacing and mild-to-moderate bite problems well. Severe rotations and some bite corrections still do better with braces, and we will tell you which camp you are in at the first appointment rather than after you have paid.',
        ],
      },
      {
        heading: 'What it costs',
        paragraphs: [
          'A written quote with your insurance already deducted, before you start. Payment plans are available and carry no interest.',
        ],
      },
    ],
  },
  {
    slug: 'restorative-dentistry',
    title: 'Restorative dentistry',
    summary:
      'Fillings, crowns, bridges and dentures — rebuilding teeth so they work as well as they look.',
    lead: 'Getting a tooth back to doing its job, for as long as possible.',
    treatments: ['Tooth-coloured fillings', 'Inlays & onlays', 'Crowns', 'Bridges', 'Dentures & partials', 'Root canal treatment'],
    sections: [
      {
        heading: 'Same-visit crowns where the tooth allows',
        paragraphs: [
          'Many crowns can be scanned, milled and fitted in one appointment, which means no temporary and no second day off work. Not every tooth qualifies; we will say which yours is before you book the time off.',
        ],
      },
      {
        heading: 'Root canals are not what you have heard',
        paragraphs: [
          'A root canal relieves the pain that brought you in. With modern anaesthetic and rotary instruments it feels much like having a large filling, and it saves a tooth that would otherwise come out.',
        ],
      },
    ],
  },
  {
    slug: 'periodontics',
    title: 'Periodontics',
    summary:
      'Gum disease diagnosed, treated and kept under control — the thing that quietly loses teeth.',
    lead: 'Healthy gums are what hold everything else up.',
    treatments: ['Gum disease treatment', 'Deep cleaning & root planing', 'Gum contouring', 'Implant maintenance'],
    sections: [
      {
        heading: 'Why bleeding gums matter',
        paragraphs: [
          'Gums that bleed when you brush are not normal and are not caused by brushing too hard. It is the earliest sign of the disease that causes more tooth loss in adults than decay does, and at that stage it is reversible.',
        ],
      },
      {
        heading: 'Treatment, then maintenance',
        paragraphs: [
          'Established gum disease is controlled rather than cured: deep cleaning first, then a maintenance interval, usually three or four months, that keeps it from coming back.',
        ],
      },
    ],
  },
  {
    slug: 'oral-surgery',
    title: 'Oral surgery',
    summary: 'Extractions and minor surgical treatment, done here rather than referred across town.',
    lead: 'The procedures most practices send elsewhere, done in a room you already know.',
    treatments: ['Tooth extraction', 'Wisdom teeth', 'Bone grafting', 'Implant placement'],
    sections: [
      {
        heading: 'Wisdom teeth',
        paragraphs: [
          'Not every wisdom tooth needs to come out. The ones that do — impacted, decayed, or repeatedly infected — are better out earlier than later, when the roots are shorter and healing is faster.',
        ],
      },
      {
        heading: 'Afterwards',
        paragraphs: [
          'Written aftercare, a number to call, and a follow-up already booked before you leave.',
        ],
      },
    ],
  },
  {
    slug: 'sleep-apnea',
    title: 'Sleep apnea treatment',
    summary:
      'Custom oral appliances that hold the airway open, for people who cannot tolerate a CPAP machine.',
    lead: 'A mouthpiece instead of a mask, where the diagnosis allows it.',
    treatments: ['Oral appliance therapy', 'Snoring appliances', 'CPAP alternatives', 'Follow-up & adjustment'],
    sections: [
      {
        heading: 'Diagnosis comes first',
        paragraphs: [
          'Sleep apnea is diagnosed by a sleep physician, not by a dentist. If you have not been tested, we will refer you; if you have, bring the study and we will tell you honestly whether an appliance suits your numbers.',
        ],
      },
      {
        heading: 'What an appliance does',
        paragraphs: [
          'It holds the lower jaw slightly forward overnight, which keeps the airway open. Mild-to-moderate cases often do as well on one as on a machine, largely because people actually wear it.',
        ],
      },
    ],
  },
  {
    slug: 'orthodontics',
    title: 'Orthodontics',
    summary:
      'Braces and aligners for children, teenagers and adults, planned around the whole face rather than the front six teeth.',
    lead: 'Straight teeth are the visible half. The bite is the half that lasts.',
    treatments: ['Clear braces', 'Early orthodontics', 'Teen treatment', 'Adult orthodontics', 'Retainers'],
    sections: [
      {
        heading: 'When to bring a child in',
        paragraphs: [
          'Around age seven, which is earlier than most people expect. Nothing usually happens then — it is a look at how the adult teeth are arriving, so that if something does need guiding, it is guided while the jaw is still growing.',
        ],
      },
      {
        heading: 'Adults too',
        paragraphs: [
          'Roughly a quarter of the orthodontic patients here are adults. Teeth move at any age; they simply move a little more slowly.',
        ],
      },
    ],
  },
  {
    slug: 'emergency-dentistry',
    title: 'Emergency dentistry',
    summary:
      'Same-day appointments held back every weekday morning for pain, breaks and knocked-out teeth.',
    lead: 'Call before noon on a weekday and we will see you today.',
    treatments: ['Toothache & abscess', 'Broken or chipped teeth', 'Knocked-out teeth', 'Lost fillings & crowns'],
    sections: [
      {
        heading: 'What counts as an emergency',
        paragraphs: [
          'Pain that kept you awake, swelling, a tooth knocked out, or a break with a sharp edge. If you are not sure, call — it costs nothing to ask and we would rather see you than not.',
        ],
      },
      {
        heading: 'A knocked-out adult tooth',
        paragraphs: [
          'Hold it by the crown, not the root. Rinse it in milk if it is dirty, put it back in the socket if you can, and if you cannot, keep it in milk and come straight here. The first hour is the one that matters.',
        ],
      },
    ],
  },
]

/** Lookup used by the dynamic route. Returns undefined for an unknown slug. */
export function findService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug)
}

export const SERVICES_PATH = '/services'

export function servicePath(slug: string): string {
  return `${SERVICES_PATH}/${slug}`
}
