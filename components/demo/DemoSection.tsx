import { cn } from "@/lib/cn"

// DemoSection — 元件頁的一個區塊。<section> + <h2> + 白色卡面，
// 讓每個區塊在無障礙樹中都是一個具名的 region，螢幕閱讀器可以直接跳到。
export function DemoSection({
  id,
  title,
  children,
  className,
}: {
  id: string
  title: string
  children: React.ReactNode
  className?: string
}) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} className={cn("scroll-mt-24", className)}>
      <h2 id={headingId} tabIndex={-1} className="typography-headline3 m-0 mb-16 scroll-mt-24 rounded-8 text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY">
        {title}
      </h2>
      {children}
    </section>
  )
}
