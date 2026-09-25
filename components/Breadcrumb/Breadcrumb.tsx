import { cn } from "@/lib/cn"

// Breadcrumb — 依 W3C ARIA APG 的 Breadcrumb Pattern 實作。
//
// 三件事撐起整個 pattern：外層是 nav 地標（使用者才跳得進來）、地標要有名稱
// （頁面上通常不只一個 nav，沒有名稱就分不出誰是誰）、目前頁面若是連結要標
// aria-current="page"。

export type BreadcrumbItem = {
  label: React.ReactNode
  /** 省略代表這是目前頁面，且不做成連結。 */
  href?: string
}

type BreadcrumbProps = {
  items: BreadcrumbItem[]
  /** 導覽地標的無障礙名稱。 */
  label?: string
  className?: string
}

export function Breadcrumb({ items, label = "麵包屑", className }: BreadcrumbProps) {
  return (
    <nav aria-label={label} className={cn("w-full", className)}>
      {/* 有序清單：層級是有先後的，ul 表達不出這件事。 */}
      <ol className="typography-body2 m-0 flex list-none flex-wrap items-center gap-8 p-0 text-teal-700">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={i} className="flex items-center gap-8">
              {item.href ? (
                <a
                  href={item.href}
                  // 目前頁面若做成連結就要標 aria-current；不是連結時可省略，
                  // 因為「不能點」本身已經說明它就是當下所在。
                  aria-current={isLast ? "page" : undefined}
                  className="rounded-8 text-teal-PRIMARY underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-teal-300">{item.label}</span>
              )}
              {isLast ? null : (
                // 分隔符號是純視覺，唸出來只會干擾。
                <span data-separator aria-hidden="true" className="text-neutral-medium-gray">
                  /
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
