"use client"

import { usePathname } from "next/navigation"
import { COMPONENTS } from "@/lib/components-registry"
import { focusAnchor } from "@/lib/focus-anchor"

export function SkipLink() {
  const pathname = usePathname() ?? ""
  const slug = pathname.replace(/\/$/, "").split("/").pop()?.replace(/\.html$/, "")
  const isComponent = COMPONENTS.some((component) => component.slug === slug)
  const target = isComponent ? "interactive-demo-heading" : "main"
  return <a href={`#${target}`} onClick={(event) => focusAnchor(event, target)} className="typography-strong2 sr-only rounded-8 bg-teal-PRIMARY px-16 py-12 text-neutral-white focus:not-sr-only focus:absolute focus:left-16 focus:top-16 focus:z-[80] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY">
    {isComponent ? "跳到互動 Demo" : "跳到主要內容"}
  </a>
}
