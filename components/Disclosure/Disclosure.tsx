"use client"

import { useId, useState } from "react"
import { cn } from "@/lib/cn"
import { ChevronDownIcon } from "../Icons/Icons"

// Disclosure — 依 W3C ARIA APG 的 Disclosure (Show/Hide) Pattern 實作。
//
// 它是 Accordion 的最小形式：一顆按鈕控制一段內容的顯示與隱藏，沒有群組、
// 沒有互斥、沒有 heading 要求。整個 pattern 只落在按鈕的兩個屬性上 ——
// aria-expanded 說現在是開是關，aria-controls 說它管的是誰。

type DisclosureProps = {
  /** 按鈕上的文字。它同時是這段內容的名稱。 */
  label: React.ReactNode
  defaultOpen?: boolean
  children: React.ReactNode
  className?: string
}

export function Disclosure({ label, defaultOpen = false, children, className }: DisclosureProps) {
  const panelId = useId()
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={cn("w-full", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="typography-strong1 inline-flex cursor-pointer items-center gap-8 rounded-8 border-0 bg-transparent px-12 py-8 text-teal-PRIMARY transition-colors hover:bg-bg-light-beige focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
      >
        {label}
        <ChevronDownIcon
          aria-hidden="true"
          className={cn(
            "w-[1.8rem] shrink-0 text-teal-300 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {/*
        用 hidden 而不是條件渲染：內容一直存在於 DOM，aria-controls 才永遠指得到
        東西。條件渲染會讓按鈕在收合時指向一個不存在的 id。
      */}
      <div id={panelId} hidden={!open} className="typography-body1 px-12 py-12 text-teal-700">
        {children}
      </div>
    </div>
  )
}
