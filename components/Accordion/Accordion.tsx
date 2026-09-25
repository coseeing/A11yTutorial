"use client"

import { useId, useState } from "react"
import { cn } from "@/lib/cn"
import { ChevronDownIcon } from "../Icons/Icons"

// Accordion — 依 W3C ARIA APG 的 Accordion Pattern 實作。
//
// 視覺沿用 Figma「Coseeing」→ 捐款相關 UI 常見問題 (FAQ) 的樣子，但結構不是原生
// <details>/<summary>：那個做法沒有 heading 包住標題、<summary> 的 role 在各家
// 瀏覽器不一致（Chrome 當 button、Firefox 當 summary），也沒有 aria-controls 與
// region 可言，展示不了 APG 這套 pattern。
//
// 結構為 heading > button + 面板，狀態全部落在 button 的 ARIA 屬性上。

export type AccordionEntry = {
  question: React.ReactNode
  answer: React.ReactNode
}

type AccordionProps = {
  items: AccordionEntry[]
  /**
   * 標題層級，須符合頁面的資訊架構 —— 這不是樣式選擇，而是把 Accordion 接進
   * 頁面標題大綱的位置。預設 3，適用於「h1 頁標題 → h2 區塊 → h3 各題」。
   */
  headingLevel?: 2 | 3 | 4 | 5 | 6
  /** 預設展開哪幾個面板（索引）。 */
  defaultExpanded?: number[]
  /** 是否允許同時展開多個面板。false 時展開新面板會收合原本展開的。 */
  allowMultiple?: boolean
  /**
   * 是否至少保持一個面板展開。為 true 時，唯一展開中的標題會標上
   * aria-disabled —— 它仍可聚焦，但按下去不會收合。
   */
  keepOneExpanded?: boolean
  /**
   * 面板是否以 role=region 呈現。region 是地標，數量一多會把地標清單灌爆，
   * 面板超過約六個時應關掉。
   */
  useRegion?: boolean
  className?: string
}

export function Accordion({
  items,
  headingLevel = 3,
  defaultExpanded = [],
  allowMultiple = true,
  keepOneExpanded = false,
  useRegion = true,
  className,
}: AccordionProps) {
  const base = useId()
  const [expanded, setExpanded] = useState<number[]>(defaultExpanded)
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4" | "h5" | "h6"

  const toggle = (index: number, isLocked: boolean) => {
    // aria-disabled 的元素仍然可以被點擊與聚焦 —— 要自己擋掉行為，
    // 這正是它與原生 disabled 的差別。
    if (isLocked) return
    setExpanded((prev) => {
      if (prev.includes(index)) return prev.filter((i) => i !== index)
      return allowMultiple ? [...prev, index] : [index]
    })
  }

  return (
    <div className={cn("flex w-full flex-col", className)}>
      {items.map((item, i) => {
        const isOpen = expanded.includes(i)
        const isLocked = keepOneExpanded && isOpen && expanded.length === 1
        const buttonId = `${base}-button-${i}`
        const panelId = `${base}-panel-${i}`

        return (
          <div key={i} className="border-b border-teal-100">
            {/* heading 內只能有這顆按鈕（APG-ACC-004）—— 其他持續顯示的元素要放到 heading 外面。 */}
            <Heading className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                aria-disabled={isLocked || undefined}
                onClick={() => toggle(i, isLocked)}
                className={cn(
                  "typography-headline3 flex w-full cursor-pointer items-center justify-between gap-16 border-0 bg-transparent px-12 py-16 text-left text-teal-PRIMARY transition-colors",
                  "hover:bg-bg-light-off-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY",
                  isLocked && "cursor-default",
                )}
              >
                {item.question}
                <ChevronDownIcon
                  aria-hidden="true"
                  className={cn(
                    "w-[2.2rem] shrink-0 text-teal-300 transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
            </Heading>

            <div
              id={panelId}
              hidden={!isOpen}
              {...(useRegion ? { role: "region", "aria-labelledby": buttonId } : {})}
              className="typography-feature3 px-12 pb-16 text-teal-PRIMARY"
            >
              {item.answer}
            </div>
          </div>
        )
      })}
    </div>
  )
}
