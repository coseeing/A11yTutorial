import { cn } from "@/lib/cn"
import { Button } from "../Button/Button"
import { CurveDoodleIcon } from "../Icons/Icons"

// EventCard — from Figma「Coseeing」→ 活動花絮 (Event List, node 62:1563).
// White rounded card: date, hairline divider, title + one-line description, a
// small dark CTA, and a three-photo strip. The brand curve doodle decorates the
// top-right corner (clipped by the card).

type EventPhoto = { src: string; alt?: string }

type EventCardProps = {
  /** e.g. "2025 APR" */
  dateLabel: string
  title: string
  description?: string
  photos?: EventPhoto[]
  ctaLabel?: string
  ctaHref?: string
  onCtaClick?: React.MouseEventHandler<HTMLElement>
  className?: string
}

export function EventCard({
  dateLabel,
  title,
  description,
  photos = [],
  ctaLabel = "看更多",
  ctaHref,
  onCtaClick,
  className,
}: EventCardProps) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col gap-24 overflow-hidden rounded-[1.2rem] border border-neutral-light-gray bg-neutral-white px-24 py-24 desktop:px-40 desktop:py-36",
        className,
      )}
    >
      <CurveDoodleIcon className="absolute -top-4 right-[10rem] -rotate-45 text-orange-PRIMARY" />
      <div className="relative flex flex-col gap-16 tablet:flex-row tablet:items-center tablet:justify-between">
        <div className="flex min-w-0 items-center gap-16">
          <p className="typography-headline4 m-0 shrink-0 whitespace-nowrap text-teal-500">
            {dateLabel}
          </p>
          <div className="hidden h-[6rem] w-px shrink-0 bg-neutral-light-gray tablet:block" />
          <div className="flex min-w-0 flex-col gap-8">
            <p className="m-0 text-[2.2rem] font-bold leading-[1.25] text-teal-700">{title}</p>
            {description ? (
              <p className="typography-emphasised1 m-0 truncate text-teal-PRIMARY">
                {description}
              </p>
            ) : null}
          </div>
        </div>
        <Button variant="small" theme="dark" href={ctaHref} onClick={onCtaClick} className="shrink-0 self-start tablet:self-center">
          {ctaLabel}
        </Button>
      </div>
      {photos.length > 0 ? (
        <div className="relative grid grid-cols-1 gap-16 tablet:grid-cols-3 desktop:gap-24">
          {photos.map((photo, i) => (
            <img
              key={i}
              src={photo.src}
              alt={photo.alt ?? ""}
              className="aspect-[316/211] w-full rounded-[1.2rem] object-cover"
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
