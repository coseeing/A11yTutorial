import { cn } from "@/lib/cn"

const siteUrl = (
  process.env.NEXT_PUBLIC_COSEEING_SITE_URL ?? "https://coseeing.org"
).replace(/\/$/, "")

const site = (path: string) => `${siteUrl}${path}`

// Keep this list static in Center for now. The main Coseeing website fetches
// these from its project API, but authentication must not depend on that API.
const PROJECTS = [
  { id: "a11yvillage", name: "A11y 新手村", description: "前往 A11y 新手村專案頁面" },
  { id: "access8math", name: "Access8Math", description: "前往 Access8Math 專案頁面" },
  { id: "wordbridge", name: "WordBridge", description: "前往 WordBridge 專案頁面" },
]

const CONTACT_INFO = [
  {
    id: "contact-email",
    name: "coseeing@coseeing.org",
    description: "透過 Email 聯絡我們",
    href: "mailto:coseeing@coseeing.org",
  },
  {
    id: "contact-linkedin",
    name: "LinkedIn",
    description: "追蹤我們的 LinkedIn 公司專頁",
    href: "https://tw.linkedin.com/company/coseeing",
  },
  {
    id: "contact-youtube",
    name: "YouTube",
    description: "追蹤我們的 YouTube 頻道",
    href: "https://www.youtube.com/@coseeing",
  },
]

function FooterList({
  heading,
  children,
}: {
  heading: string
  children: React.ReactNode
}) {
  return (
    <nav aria-label={heading} className="tablet:ms-32 desktop:ms-80">
      <p className="typography-strong1 mb-16 text-teal-PRIMARY">{heading}</p>
      <ul className="typography-body2 m-0 flex list-none flex-col gap-8 p-0 text-teal-700">
        {children}
      </ul>
    </nav>
  )
}

/** Footer matching the public Coseeing website, with static project links. */
export function MainSiteFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("bg-bg-light-beige", className)}>
      <div className="mx-auto w-full px-20 py-40 tablet:max-w-none tablet:px-40 tablet:py-32 desktop:px-80 desktop:py-60">
        <div className="flex flex-col justify-between gap-40 tablet:flex-row">
          <div className="flex flex-col gap-16 desktop:gap-24">
            <img
              src="/center/brand/coseeing-logo-dark.svg"
              alt="Coseeing Logo"
              className="h-auto w-[23.6rem]"
            />
            <p className="typography-strong1 m-0 text-teal-PRIMARY tablet:max-w-[23rem] desktop:max-w-[47rem]">
              願所有人，無論身心條件如何，都能自在遨遊於廣闊的數位空間、共同體驗這個精彩的世界。
            </p>
          </div>

          <div className="flex flex-col gap-24 tablet:flex-row tablet:gap-32">
            <FooterList heading="了解更多">
              {PROJECTS.map((project) => (
                <li key={project.id}>
                  <a
                    href={site(`/projects/${project.id}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-describedby={project.id}
                  >
                    {project.name}
                  </a>
                  <span id={project.id} className="sr-only" aria-hidden="true">
                    {project.description}（開啟新分頁）
                  </span>
                </li>
              ))}
            </FooterList>
            <FooterList heading="聯絡我們">
              {CONTACT_INFO.map((contact) => (
                <li key={contact.id}>
                  <a
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-describedby={contact.id}
                  >
                    {contact.name}
                  </a>
                  <span id={contact.id} className="sr-only" aria-hidden="true">
                    {contact.description}（開啟新分頁）
                  </span>
                </li>
              ))}
            </FooterList>
          </div>
        </div>

        <div aria-hidden="true" className="mt-40 h-px bg-bg-light-off-white tablet:bg-transparent" />

        <div className="mt-24 text-left text-teal-PRIMARY tablet:text-center">
          <div className="mb-16 flex flex-col justify-center gap-8 tablet:flex-row tablet:gap-20">
            <a
              href={site("/terms")}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              aria-describedby="terms-link-description"
            >
              使用者條款
            </a>
            <span id="terms-link-description" className="sr-only" aria-hidden="true">
              閱讀使用者條款（開啟新分頁）
            </span>
            <a
              href={site("/privacy")}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              aria-describedby="privacy-link-description"
            >
              隱私權政策
            </a>
            <span id="privacy-link-description" className="sr-only" aria-hidden="true">
              閱讀隱私權政策（開啟新分頁）
            </span>
          </div>
          <span className="typography-strong3">Coseeing 嶼我共視</span>
          <span className="typography-body3 mt-8 block tablet:mt-6">
            Copyright © {new Date().getFullYear()}. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
