import { appPath } from "@/lib/app-path"
import { cn } from "@/lib/cn"

// SiteNav — demo 站的主導覽帶。
//
// 沿用 SSO center 的深綠帶與 logo 處理，但拿掉登入狀態相關的邏輯：這個站沒有
// 帳號概念，導覽帶只負責標示身分與提供回首頁的路徑，因此維持 server component。

export function SiteNav({ className }: { className?: string }) {
  return (
    <nav
      aria-label="主要導覽"
      className={cn(
        "bg-teal-PRIMARY px-20 py-12 tablet:px-40 tablet:py-24 desktop:px-80",
        className,
      )}
    >
      <div className="flex w-full items-center justify-between gap-24">
        <a
          href={appPath("/")}
          aria-label="A11y Tutorial 首頁"
          className="flex shrink-0 items-center gap-16 rounded-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
        >
          <img
            src={appPath("/brand/coseeing-logo-stacked.svg")}
            alt="Coseeing"
            className="h-[3.4rem] w-[6rem] tablet:hidden"
          />
          <img
            src={appPath("/brand/coseeing-logo.svg")}
            alt="Coseeing"
            className="hidden h-[3.13rem] w-[23.15rem] tablet:block"
          />
          <span className="typography-strong2 hidden text-bg-light-off-white tablet:inline">
            A11y Tutorial
          </span>
        </a>
      </div>
    </nav>
  )
}
