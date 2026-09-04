import { cn } from "@/lib/cn"

// PageToc — 右側目錄。desktop 才顯示：窄螢幕上它會把主內容擠掉，而頁面本身
// 夠短，直接捲動即可。
export function PageToc({
  sections,
  className,
}: {
  sections: { id: string; title: string }[]
  className?: string
}) {
  return (
    <nav
      aria-label="本頁目錄"
      className={cn("hidden w-[20rem] shrink-0 desktop:block", className)}
    >
      <div className="sticky top-32">
        <p className="typography-strong2 m-0 mb-12 text-teal-300">本頁目錄</p>
        <ul className="m-0 flex list-none flex-col gap-8 p-0">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="typography-body2 block rounded-8 px-12 py-8 text-teal-700 no-underline hover:bg-bg-light-beige focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
