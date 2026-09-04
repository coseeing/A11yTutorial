import { cn } from "@/lib/cn"

// UpcomingEventItem — from Figma「Coseeing」→ 活動頁 近期活動 (2025-03-12
// addition). List row with a date block, title + description, and a pill CTA.
// `tone="highlight"` inverts the row (orange fill, teal date block) as in the
// design's emphasized state; `imageSrc` switches to the featured layout with a
// photo and an inline date pill. Colors are mapped to the brand tokens
// (orange-100 / orange-PRIMARY / teal-PRIMARY).

type UpcomingEventItemProps = {
  /** e.g. "5月13日 (五)" */
  date: string
  /** e.g. "17:00 - 18:00" */
  time?: string
  title: string
  description?: string
  tone?: "default" | "highlight"
  /** Featured layout: photo on the left, date+time as an inline pill. */
  imageSrc?: string
  imageAlt?: string
  ctaLabel?: string
  ctaHref?: string
  className?: string
}

export function UpcomingEventItem({
  date,
  time,
  title,
  description,
  tone = "default",
  imageSrc,
  imageAlt = "",
  ctaLabel = "報名活動",
  ctaHref = "#",
  className,
}: UpcomingEventItemProps) {
  const highlight = tone === "highlight"

  const cta = (
    <a
      href={ctaHref}
      className={cn(
        "typography-strong1 flex shrink-0 items-center justify-center rounded-[6rem] px-20 py-8 no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        highlight
          ? "bg-teal-PRIMARY text-bg-light-off-white hover:bg-teal-500 focus-visible:ring-teal-PRIMARY"
          : "bg-orange-PRIMARY text-teal-700 hover:bg-orange-500 focus-visible:ring-orange-PRIMARY",
      )}
    >
      {ctaLabel}
    </a>
  )

  if (imageSrc) {
    return (
      <div
        className={cn(
          "flex w-full flex-col overflow-hidden rounded-[1.2rem] border tablet:flex-row tablet:items-stretch",
          highlight
            ? "border-transparent bg-orange-100"
            : "border-orange-200 bg-neutral-white",
          className,
        )}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="aspect-[16/9] w-full object-cover tablet:aspect-auto tablet:w-[26rem]"
        />
        <div className="flex min-w-0 flex-1 flex-col items-start gap-8 p-16 desktop:p-20">
          <span
            className={cn(
              "typography-body2 inline-flex items-center rounded-[6rem] px-12 py-4",
              highlight
                ? "bg-teal-PRIMARY text-bg-light-off-white"
                : "bg-orange-100 text-teal-700",
            )}
          >
            {date}
            {time ? ` ${time}` : ""}
          </span>
          <p className="m-0 text-[1.8rem] font-bold leading-[1.5] tracking-[0.1em] text-teal-700">
            {title}
          </p>
          {description ? (
            <p className="typography-body2 m-0 line-clamp-2 text-teal-PRIMARY">{description}</p>
          ) : null}
        </div>
        <div className="flex items-center p-16 tablet:pr-20">{cta}</div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-16 rounded-[1.2rem] border p-16 tablet:flex-row tablet:items-center tablet:gap-24 desktop:p-20",
        highlight
          ? "border-transparent bg-orange-100"
          : "border-orange-200 bg-neutral-white",
        className,
      )}
    >
      <div
        className={cn(
          "flex shrink-0 flex-col items-center justify-center gap-4 rounded-8 px-20 py-12 text-center",
          highlight
            ? "bg-teal-PRIMARY text-bg-light-off-white"
            : "bg-orange-100 text-teal-700",
        )}
      >
        <span className="typography-strong1">{date}</span>
        {time ? <span className="typography-body2">{time}</span> : null}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <p className="m-0 text-[1.8rem] font-bold leading-[1.5] tracking-[0.1em] text-teal-700">
          {title}
        </p>
        {description ? (
          <p className="typography-body2 m-0 truncate text-teal-PRIMARY">{description}</p>
        ) : null}
      </div>
      {cta}
    </div>
  )
}
