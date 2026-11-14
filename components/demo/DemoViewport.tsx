"use client"

import { useCallback, useState } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/cn"

/** 原生 modal 限制在自己的瀏覽情境，教學頁與右側屬性卡仍可操作。 */
export function DemoViewport({ id, title, children, contentClassName, className }: { id: string; title: string; children: React.ReactNode; contentClassName?: string; className?: string }) {
  const [frameDocument, setFrameDocument] = useState<Document | null>(null)
  const prepare = useCallback((frame: HTMLIFrameElement | null) => {
    const doc = frame?.contentDocument
    if (!doc) return
    doc.documentElement.lang = "zh-Hant"
    doc.title = title
    if (!doc.head.querySelector("[data-demo-styles]")) {
      for (const style of document.head.querySelectorAll('style, link[rel="stylesheet"]')) {
        const copy = style.cloneNode(true) as HTMLElement
        copy.setAttribute("data-demo-styles", "")
        doc.head.append(copy)
      }
    }
    setFrameDocument(doc)
  }, [title])
  return <>
    <iframe id={id} ref={prepare} onLoad={(event) => prepare(event.currentTarget)} title={title} className={cn("h-[32rem] w-full rounded-16 border border-bg-warm-gray bg-bg-light-off-white", className)} />
    {frameDocument && createPortal(<div className={cn("flex min-h-screen items-center justify-center p-24", contentClassName)}>{children}</div>, frameDocument.body)}
  </>
}
