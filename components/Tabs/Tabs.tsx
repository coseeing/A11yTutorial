"use client"

import { useEffect, useId, useRef, useState } from "react"
import { cn } from "@/lib/cn"

// Tabs — design-system extension (not in Figma). Underline style in the brand
// language (orange active indicator on a warm-gray baseline), distinct from
// a pill-style tab list. Full APG tabs semantics: roving tabindex,
// Left/Right/Home/End keyboard support, aria-controls/labelledby wiring.

export type TabItem = { label: string; content: React.ReactNode }

type TabsProps = {
  items: TabItem[]
  defaultIndex?: number
  /** Accessible name for the tab list. 頁面上沒有可見標題時用這個。 */
  label?: string
  /**
   * 指向可見標題的 id。APG 要求：有可見標籤時用 aria-labelledby，沒有才用
   * aria-label —— 看得到的字和聽得到的字是同一份，不會各說各話。
   */
  labelledBy?: string
  onChange?: (index: number) => void
  className?: string
}

/**
 * 面板內有沒有可以聚焦的東西。
 *
 * APG 只在「面板沒有可聚焦內容」時要求 tabindex=0：那種面板鍵盤使用者根本到
 * 不了，讀不到裡面的字。反過來，內容本身就可聚焦時再給面板 tabindex，只會多
 * 一個沒有意義的停留點。
 */
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function useNeedsPanelTabIndex(panel: HTMLElement | null, activeIndex: number) {
  const [needed, setNeeded] = useState(true)

  useEffect(() => {
    if (!panel) return
    setNeeded(panel.querySelector(FOCUSABLE) === null)
  }, [panel, activeIndex])

  return needed
}

export function Tabs({
  items,
  defaultIndex = 0,
  label,
  labelledBy,
  onChange,
  className,
}: TabsProps) {
  const [active, setActive] = useState(defaultIndex)
  const [activePanel, setActivePanel] = useState<HTMLElement | null>(null)
  const baseId = useId()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const panelNeedsTabIndex = useNeedsPanelTabIndex(activePanel, active)

  const select = (i: number) => {
    setActive(i)
    onChange?.(i)
    tabRefs.current[i]?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = items.length - 1
    let next: number | null = null
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1
    else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1
    else if (e.key === "Home") next = 0
    else if (e.key === "End") next = last
    if (next !== null) {
      e.preventDefault()
      select(next)
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <div
        role="tablist"
        aria-label={labelledBy ? undefined : label}
        aria-labelledby={labelledBy}
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-8 border-b border-bg-warm-gray"
      >
        {items.map((item, i) => {
          const selected = i === active
          return (
            <button
              key={i}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              className={cn(
                "-mb-px cursor-pointer appearance-none border-x-0 border-b-[0.3rem] border-t-0 border-solid bg-transparent px-16 py-8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY",
                selected
                  ? "typography-strong1 border-orange-PRIMARY text-teal-PRIMARY"
                  : "typography-emphasised1 border-transparent text-neutral-dark-gray hover:text-teal-PRIMARY",
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      {items.map((item, i) => (
        <div
          key={i}
          ref={i === active ? setActivePanel : undefined}
          role="tabpanel"
          id={`${baseId}-panel-${i}`}
          aria-labelledby={`${baseId}-tab-${i}`}
          hidden={i !== active}
          tabIndex={i === active && panelNeedsTabIndex ? 0 : undefined}
          className="rounded-8 pt-16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
        >
          {item.content}
        </div>
      ))}
    </div>
  )
}
