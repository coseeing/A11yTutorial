import { cn } from "@/lib/cn"

// DemoFooter — 沿用 center footer 的米色帶與留白，但內容換成 demo 站自己的
// 說明。刻意不放大量外連：這個站的用途是展示元件，footer 只需交代它是什麼、
// 依據哪份規範。

const REFERENCES = [
  {
    name: "WCAG 2.2",
    href: "https://www.w3.org/TR/WCAG22/",
    description: "W3C Web Content Accessibility Guidelines 2.2",
  },
  {
    name: "ARIA Authoring Practices Guide",
    href: "https://www.w3.org/WAI/ARIA/apg/",
    description: "W3C ARIA Authoring Practices Guide",
  },
  {
    name: "ARIA 1.2",
    href: "https://www.w3.org/TR/wai-aria-1.2/",
    description: "W3C Accessible Rich Internet Applications 1.2",
  },
]

export function DemoFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("bg-bg-light-beige", className)}>
      <div className="px-20 py-40 tablet:px-40 tablet:py-32 desktop:px-80 desktop:py-60">
        <div className="flex flex-col gap-32 tablet:flex-row tablet:justify-between">
          <div className="max-w-[48rem]">
            <p className="typography-strong1 m-0 mb-8 text-teal-PRIMARY">A11y Tutorial</p>
            <p className="typography-body2 m-0 text-teal-700">
              展示 design system 元件的無障礙實作：可操作範例、即時的 accessibility
              tree、鍵盤操作、ARIA 屬性與對應的 WCAG 條款。
            </p>
          </div>
          <nav aria-label="參考規範">
            <p className="typography-strong1 mb-16 text-teal-PRIMARY">參考規範</p>
            <ul className="typography-body2 m-0 flex list-none flex-col gap-8 p-0 text-teal-700">
              {REFERENCES.map((ref) => (
                <li key={ref.href}>
                  <a
                    href={ref.href}
                    aria-label={ref.description}
                    className="rounded-8 text-teal-PRIMARY underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
                  >
                    {ref.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
