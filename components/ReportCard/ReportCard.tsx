import { cn } from "@/lib/cn"
import { Button } from "../Button/Button"
import { CurveDoodleIcon, PlusIcon } from "../Icons/Icons"

// ReportCard — from Figma「Coseeing」→ 深度報導 (Report List, nodes 62:3258 /
// 62:3273). Expandable press-coverage card on native <details>/<summary>: the
// collapsed row shows the headline and a plus that rotates into a close mark;
// expanding reveals the thumbnail, summary paragraphs, and a CTA to the report.

type ReportCardProps = {
  title: string
  paragraphs?: string[]
  imageSrc?: string
  imageAlt?: string
  ctaLabel?: string
  ctaHref?: string
  defaultOpen?: boolean
  className?: string
}

export function ReportCard({
  title,
  paragraphs = [],
  imageSrc,
  imageAlt = "",
  ctaLabel = "前往報導頁面",
  ctaHref,
  defaultOpen,
  className,
}: ReportCardProps) {
  return (
    <details
      open={defaultOpen}
      className={cn(
        "group relative w-full overflow-hidden rounded-[1.2rem] border border-neutral-light-gray bg-neutral-white px-24 py-24 desktop:px-40 desktop:py-36",
        className,
      )}
    >
      <CurveDoodleIcon className="absolute -bottom-8 right-[6rem] -rotate-45 text-orange-PRIMARY" />
      <summary className="relative flex cursor-pointer list-none items-center justify-between gap-16 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY [&::-webkit-details-marker]:hidden">
        <span className="min-w-0 text-[2.2rem] font-bold leading-[1.25] text-teal-700">
          {title}
        </span>
        <PlusIcon className="size-24 shrink-0 text-teal-700 transition-transform duration-200 group-open:rotate-45" />
      </summary>
      <div className="relative mt-24 flex flex-col gap-24">
        <div className="flex flex-col items-start gap-24 tablet:flex-row">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt}
              className="aspect-[316/210] w-full shrink-0 rounded-[1.2rem] object-cover tablet:w-[31.6rem]"
            />
          ) : null}
          <div className="typography-emphasised1 flex min-w-0 flex-col gap-8 text-teal-PRIMARY">
            {paragraphs.map((p, i) => (
              <p key={i} className="m-0">
                {p}
              </p>
            ))}
          </div>
        </div>
        {ctaHref ? (
          <div className="flex justify-center">
            <Button variant="small" theme="dark" href={ctaHref}>
              {ctaLabel}
            </Button>
          </div>
        ) : null}
      </div>
    </details>
  )
}
