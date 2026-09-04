import { cn } from "@/lib/cn"
import { DotDividerIcon, FacebookIcon, LinkedinIcon } from "../Icons/Icons"

// MemberCard — from Figma "Coseeing" → Elements → Card (Desktop/Tablet/Mobile ×
// Default/Hovered/State3). One responsive component: 16rem wide on mobile,
// 21.7rem on tablet, 28.5rem on desktop. Hover (or keyboard focus within) fades
// in the quote overlay over the photo; `highlighted` renders the orange State3
// border. The quote uses 辰宇落雁體 (Chenyuluoyan) when the site provides it,
// falling back to Noto Sans TC.

type MemberCardProps = {
  name: string
  /** Skill labels, dot-separated (Figma: Design · UX). */
  skills?: string[]
  photoSrc: string
  photoAlt?: string
  /** Handwritten quote revealed on hover/focus. Omit to disable the overlay. */
  quote?: string
  linkedinHref?: string
  facebookHref?: string
  /** State3 in Figma: 2px orange border around the card. */
  highlighted?: boolean
  className?: string
}

export function MemberCard({
  name,
  skills = [],
  photoSrc,
  photoAlt,
  quote,
  linkedinHref,
  facebookHref,
  highlighted,
  className,
}: MemberCardProps) {
  return (
    <div
      className={cn(
        "group flex w-[16rem] flex-col gap-8 tablet:w-[21.7rem] desktop:w-[28.5rem]",
        highlighted && "rounded-16 border-2 border-orange-PRIMARY",
        className,
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-16">
        <img
          src={photoSrc}
          alt={photoAlt ?? name}
          className="absolute inset-0 size-full object-cover"
        />
        {quote ? (
          <div
            className="absolute inset-0 flex items-center justify-center rounded-16 bg-teal-PRIMARY/80 p-12 opacity-0 backdrop-blur-[0.8rem] transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 group-[.pseudo-hover]:opacity-100"
            aria-hidden="true"
          >
            <p
              className="m-0 text-center text-[1.6rem] leading-[1.5] text-neutral-very-light-gray desktop:text-[3.2rem]"
              style={{ fontFamily: '"Chenyuluoyan", "ChenYuluoyan-Thin", var(--font-noto)' }}
            >
              {quote}
            </p>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col px-4 desktop:px-8">
        <div className="flex w-full items-center justify-between">
          <p className="typography-headline4 m-0 text-teal-700">{name}</p>
          <div className="flex items-center">
            {linkedinHref ? (
              <a
                href={linkedinHref}
                aria-label={`${name} 的 LinkedIn`}
                className="flex items-center p-4 text-teal-PRIMARY transition-colors hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY desktop:p-6"
              >
                <LinkedinIcon className="size-[2rem] desktop:size-[2.4rem]" />
              </a>
            ) : null}
            {facebookHref ? (
              <a
                href={facebookHref}
                aria-label={`${name} 的 Facebook`}
                className="flex items-center p-4 text-teal-PRIMARY transition-colors hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY desktop:p-6"
              >
                <FacebookIcon className="size-[2rem] desktop:size-[2.4rem]" />
              </a>
            ) : null}
          </div>
        </div>
        {skills.length > 0 ? (
          <div className="flex items-center gap-8">
            {skills.map((skill, i) => (
              <span key={skill} className="flex items-center gap-8">
                {i > 0 ? <DotDividerIcon className="text-teal-PRIMARY" /> : null}
                <span className="typography-body2 text-teal-PRIMARY">{skill}</span>
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
