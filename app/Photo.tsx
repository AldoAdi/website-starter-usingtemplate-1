import type { ReactElement } from 'react'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { preload } from 'react-dom'
import Image from 'next/image'
import { BASE_PATH, DEPLOY_TARGET } from './siteConfig'

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
 * Downscaled copies the static target can offer phones, as `<name>-<width>.jpg`
 * beside the original. Make them with:
 *
 *   sips -Z 960 -s formatOptions 72 reception.jpg --out reception-960.jpg
 *
 * A missing copy is skipped, not linked, so a new photo without them still
 * renders -- it just ships the full file to every screen.
 */
const VARIANT_WIDTHS = [640, 960] as const

/** `srcset` of the copies that exist on disk, plus the original at its own width. */
function staticSrcSet(src: string, width: number): string {
  const dot = src.lastIndexOf('.')
  const variants = VARIANT_WIDTHS.filter((w) => w < width)
    .map((w) => ({ w, path: `${src.slice(0, dot)}-${w}${src.slice(dot)}` }))
    .filter(({ path }) => existsSync(join(process.cwd(), 'public', path)))
  return [...variants, { w: width, path: src }]
    .map(({ w, path }) => `${BASE_PATH ?? ''}${path} ${w}w`)
    .join(', ')
}

/**
 * A site photograph, with the deploy target's `basePath` applied.
 *
 * On the GitHub Pages target the site is served from `/<repo>/`, and a
 * `/public` file referenced as `/images/x.jpg` is not there -- it is at
 * `/<repo>/images/x.jpg`. Prefixing here means no page has to remember, and
 * `BASE_PATH` is `undefined` on Vercel so the same call renders unprefixed.
 *
 * `next/image` does **not** fix the prefix for us: the static target sets
 * `images.unoptimized`, which passes `src` straight through untouched.
 * `assetPrefix` does not cover it either -- that is `_next/*` output only.
 *
 * `images.unoptimized` also drops `srcset` (and overwrites one passed in),
 * so every phone downloaded the 1200px original. The static target therefore
 * renders a plain `<img>` with a `srcset` of pre-built copies. Vercel keeps
 * `next/image`, whose optimizer generates its own.
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
  const classes = className ? `${PHOTO_CLASSES} ${className}` : PHOTO_CLASSES
  const fullSrc = `${BASE_PATH ?? ''}${src}`

  if (DEPLOY_TARGET !== 'github-pages') {
    return (
      <Image
        src={fullSrc}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className={classes}
      />
    )
  }

  const srcSet = staticSrcSet(src, width)
  if (priority) {
    // The preload next/image used to emit, now carrying the srcset so a phone
    // does not preload the full-size file it will not use.
    preload(fullSrc, { as: 'image', imageSrcSet: srcSet, imageSizes: sizes, fetchPriority: 'high' })
  }

  return (
    // srcSet and sizes before src: when React creates this element on the
    // client, it sets attributes in prop order, and a src set first starts
    // (then aborts) a download of the full-size file.
    <img
      srcSet={srcSet}
      sizes={sizes}
      src={fullSrc}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={classes}
    />
  )
}
