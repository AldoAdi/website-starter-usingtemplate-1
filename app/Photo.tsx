import type { ReactElement } from 'react'
import Image from 'next/image'
import { BASE_PATH } from './siteConfig'

export interface PhotoProps {
  /** Root-relative path under `/public`, e.g. `'/images/reception.jpg'`. */
  readonly src: string
  /**
   * What the photograph shows, for someone who cannot see it.
   *
   * Required, and written per use rather than derived from the filename:
   * the same portrait means "the dentist you will see" on the home page and
   * carries the page's subject on the bio page. Purely decorative photos do
   * not belong in this component -- they belong in CSS.
   */
  readonly alt: string
  /** Intrinsic pixel size of the file. Reserves the space, so nothing shifts as it loads. */
  readonly width: number
  readonly height: number
  /** Layout hint for the browser's source selection, e.g. `'(min-width: 768px) 50vw, 100vw'`. */
  readonly sizes?: string
  /** Set on the one image above the fold. Exactly one per page, or it means nothing. */
  readonly priority?: boolean
  readonly className?: string
}

const PHOTO_CLASSES = 'h-auto w-full rounded-lg object-cover'

/**
 * A site photograph, with the deploy target's `basePath` applied.
 *
 * That prefix is the whole reason this component exists. On the GitHub
 * Pages target the site is served from `/<repo>/`, and a `/public` file
 * referenced as `/images/x.jpg` is not there -- it is at
 * `/<repo>/images/x.jpg`.
 *
 * `next/image` does **not** fix this for us. It applies `basePath` to the
 * optimizer URL it generates, and the static target sets
 * `images.unoptimized`, which passes `src` straight through to the `<img>`
 * untouched. So the images work on Vercel, 404 on Pages, and nothing in the
 * build says a word about it -- verified by reading the exported HTML, not
 * assumed from the documentation.
 *
 * `assetPrefix` does not cover it either: that applies to `_next/*` build
 * output, not to files in `/public`.
 *
 * Prefixing here rather than at each call site means no page has to
 * remember, and `BASE_PATH` is `undefined` on Vercel so the same call
 * renders an unprefixed src there.
 */
export function Photo({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
  className,
}: PhotoProps): ReactElement {
  return (
    <Image
      src={`${BASE_PATH ?? ''}${src}`}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={className ? `${PHOTO_CLASSES} ${className}` : PHOTO_CLASSES}
    />
  )
}
