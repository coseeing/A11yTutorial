import { cn } from "@/lib/cn"
import { appPath } from "@/lib/app-path"

// Footer — from Figma "Coseeing" → 列表頁 Footer (Desktop/Tablet/Mobile). Beige
// band with the dark logo, mission statement, link sections, and a centered
// copyright block. Columns collapse to a single stack below the tablet
// breakpoint, matching the Figma mobile layout.

export type FooterLink = { label: string; href: string }
export type FooterSection = { title: string; links: FooterLink[] }

type FooterProps = {
  mission?: string
  sections?: FooterSection[]
  copyright?: string
  className?: string
}

const DEFAULT_MISSION =
  "願所有人，無論身心條件如何，都能自在遨遊於廣闊的數位空間、無拘無束地探索浩瀚新知、共同體驗這個精彩的世界。"

const DEFAULT_SECTIONS: FooterSection[] = [
  {
    title: "了解更多",
    links: [
      { label: "A11y Math", href: "#" },
      { label: "A11y 新手村", href: "#" },
      { label: "A11y Camp", href: "#" },
    ],
  },
  {
    title: "聯繫我們",
    links: [
      { label: "contact@coseeing.org", href: "mailto:contact@coseeing.org" },
      { label: "LinkedIn", href: "#" },
      { label: "Instagram", href: "#" },
    ],
  },
]

export function Footer({
  mission = DEFAULT_MISSION,
  sections = DEFAULT_SECTIONS,
  copyright = "Copyright © 2024. All Rights Reserved.",
  className,
}: FooterProps) {
  return (
    <footer className={cn("flex w-full flex-col bg-bg-light-beige", className)}>
      <div className="flex flex-col gap-40 px-20 py-40 tablet:flex-row tablet:items-start tablet:justify-between tablet:px-40 tablet:py-32 desktop:px-80 desktop:py-60">
        <div className="flex max-w-[51.9rem] flex-col gap-24">
          <img
            src={appPath("/brand/coseeing-logo-dark.svg")}
            alt="Coseeing"
            className="h-[3.2rem] w-[23.6rem]"
          />
          <p className="typography-strong1 m-0 text-teal-PRIMARY">{mission}</p>
        </div>
        <div className="flex flex-col gap-32 tablet:flex-row tablet:gap-20">
          {sections.map((section) => (
            <div key={section.title} className="flex flex-col gap-20 tablet:w-[19.5rem]">
              <p className="typography-headline4 m-0 text-teal-PRIMARY">{section.title}</p>
              <ul className="m-0 flex list-none flex-col gap-12 p-0">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="typography-body2 text-teal-PRIMARY no-underline hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-20 border-t border-teal-PRIMARY/20 tablet:mx-0 tablet:border-0" />
      <div className="flex flex-col items-center gap-8 px-20 py-20 text-center tablet:py-40">
        <p className="typography-strong3 m-0 text-teal-PRIMARY">Coseeing 嶼我共視</p>
        <p className="typography-body3 m-0 text-teal-PRIMARY">{copyright}</p>
      </div>
    </footer>
  )
}
