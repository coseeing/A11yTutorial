"use client"

import { Button } from "@/components/Button/Button"
import { appPath } from "@/lib/app-path"
import { focusAnchor } from "@/lib/focus-anchor"

export function DemoPageNavigation() {
  return <nav aria-label="元件說明頁尾導覽" className="mt-40 flex flex-wrap gap-16 border-t border-bg-warm-gray pt-24">
    <Button href="#main" variant="small" theme="greenStroke" onClick={(event) => focusAnchor(event, "main")}>返回頁面頂端</Button>
    <Button href={appPath("/#catalog-heading")} variant="small" theme="light">返回元件清單</Button>
  </nav>
}
