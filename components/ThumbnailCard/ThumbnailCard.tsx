import { cn } from "@/lib/cn"
import { ArrowRightIcon } from "../Icons/Icons"

// ThumbnailCard — from Figma「Coseeing」→ 活動內頁 更多活動花絮 (node 62:1684).
// Square photo with a title + arrow row below; the whole card is a link and the
// arrow nudges right on hover.

type ThumbnailCardProps = {
  title: string
  imageSrc: string
  imageAlt?: string
  href?: string
  className?: string
}

export function ThumbnailCard({
  title,
  imageSrc,
  imageAlt = "",
  href = "#",
  className,
}: ThumbnailCardProps) {
  return (
    <a
      href={href}
      className={cn(
        "group flex w-full flex-col gap-12 rounded-16 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY focus-visible:ring-offset-2",
        className,
      )}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className="aspect-square w-full rounded-16 object-cover"
      />
      <span className="flex items-center justify-between gap-8 px-8">
        <span className="typography-emphasised1 min-w-0 truncate text-teal-PRIMARY">
          {title}
        </span>
        <ArrowRightIcon className="h-[1.7rem] w-[4.4rem] shrink-0 text-teal-PRIMARY transition-transform duration-200 group-hover:translate-x-4" />
      </span>
    </a>
  )
}
