import { cn } from "@/lib/cn"
import { Tag } from "../Tag/Tag"

// ProjectCard — from Figma "Coseeing" → 列表頁 (ProjectList). Full-bleed photo
// card with a bottom darkening gradient, project title, description, and Tag
// pills. Heights per breakpoint: 360 (mobile) / 248 (tablet) / 462 (desktop).
type ProjectCardProps = {
  title: string
  description: string
  tags?: string[]
  imageSrc: string
  imageAlt?: string
  /** When set, the whole card becomes a link. */
  href?: string
  className?: string
}

export function ProjectCard({
  title,
  description,
  tags = [],
  imageSrc,
  imageAlt = "",
  href,
  className,
}: ProjectCardProps) {
  const card = (
    <div
      className={cn(
        "relative h-[36rem] w-full overflow-hidden rounded-[1.2rem] shadow-[0_0.4rem_0.4rem_rgb(0_0_0_/_0.25)] tablet:h-[24.8rem] desktop:h-[46.2rem]",
        className,
      )}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 size-full object-cover"
      />
      <div
        className="absolute inset-0 flex flex-col justify-end p-24 desktop:p-32"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(72, 72, 72, 0) 1.2%, rgb(14, 14, 14) 98%)",
        }}
      >
        <div className="flex flex-col gap-24">
          <div className="flex flex-col gap-8">
            <p className="typography-headline3 m-0 text-neutral-white">{title}</p>
            <p className="typography-strong1 m-0 text-neutral-very-light-gray">
              {description}
            </p>
          </div>
          {tags.length > 0 ? (
            <div className="flex flex-wrap gap-8">
              {tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        className="block no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY focus-visible:ring-offset-2 rounded-[1.2rem]"
      >
        {card}
      </a>
    )
  }
  return card
}
