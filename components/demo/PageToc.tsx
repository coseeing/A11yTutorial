"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/cn"
import { focusAnchor } from "@/lib/focus-anchor"

// 行內目錄固定於頁首，實際高度供 Demo 與錨點定位使用，包含窄版換行後的高度。
export function PageToc({
  sections,
  className,
  variant = "sidebar",
}: {
  sections: { id: string; title: string }[]
  className?: string
  variant?: "sidebar" | "inline"
}) {
  const navRef = useRef<HTMLElement>(null)
  const [canStick, setCanStick] = useState(true)
  useEffect(() => {
    if (variant !== "inline") return
    const nav = navRef.current
    const layout = nav?.parentElement
    if (!nav || !layout) return
    const root = document.documentElement
    const previousPadding = root.style.getPropertyValue("--demo-page-scroll-padding")
    let sticky = true
    const measure = () => {
      const height = nav.getBoundingClientRect().height
      sticky = height <= window.innerHeight / 4
      setCanStick(sticky)
      layout.style.setProperty("--demo-toc-height", `${sticky ? height : 0}px`)
      root.style.setProperty("--demo-page-scroll-padding", `${sticky ? height : 0}px`)
    }
    const keepFocusVisible = (event: FocusEvent) => {
      const target = event.target
      if (!sticky || !(target instanceof HTMLElement) || nav.contains(target) || target.closest("dialog[open]")) return
      const navRect = nav.getBoundingClientRect()
      const rect = target.getBoundingClientRect()
      if (navRect.top <= 0 && rect.height > 0 && rect.top < navRect.bottom + 8) {
        target.scrollIntoView({ block: "start", inline: "nearest", behavior: "instant" })
      }
    }
    measure()
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null
    observer?.observe(nav)
    window.addEventListener("resize", measure)
    document.addEventListener("focusin", keepFocusVisible)
    return () => {
      observer?.disconnect()
      window.removeEventListener("resize", measure)
      document.removeEventListener("focusin", keepFocusVisible)
      layout.style.removeProperty("--demo-toc-height")
      if (previousPadding) root.style.setProperty("--demo-page-scroll-padding", previousPadding)
      else root.style.removeProperty("--demo-page-scroll-padding")
    }
  }, [variant])

  return (
    <nav
      ref={navRef}
      aria-label="目錄"
      data-toc-sticky={variant === "inline" && canStick}
      className={cn(variant === "inline" ? "z-[60] mb-24 w-full border-b border-bg-warm-gray bg-bg-light-off-white py-16" : "hidden w-[20rem] shrink-0 desktop:block", variant === "inline" && canStick && "sticky top-0", className)}
    >
      <div className={variant === "inline" ? undefined : "sticky top-32"}>
        <p className="typography-strong2 m-0 mb-12 text-teal-300">目錄</p>
        <ul className={cn("m-0 flex list-none gap-8 p-0", variant === "inline" ? "flex-wrap" : "flex-col")}>
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(event) => focusAnchor(event, `${section.id}-heading`, section.id)}
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
