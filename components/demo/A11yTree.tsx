"use client"

import { useEffect, useId, useState } from "react"
import { cn } from "@/lib/cn"
import { computeA11yNode, type A11yNode } from "@/lib/a11y/compute-node"

// A11yTree — 這個站的核心面板。
//
// 把一個 DOM 元素在無障礙樹中的樣貌攤開成 Role / Name / Status 三列，並且隨著
// 使用者的互動即時更新，讓「螢幕閱讀器會怎麼描述這個東西」變成看得見的東西。
//
// 目標以 CSS selector 指定而非 ref：Dialog 這類元件關閉時目標元素可能整個離開
// DOM，selector 每次重算都重新解析，ref 則會留住已失效的節點。

type A11yTreeProps = {
  /** 要觀察的元素，在 document 範圍內以 querySelector 解析。 */
  selector: string
  /** 面板標題下方的補充說明。 */
  hint?: string
  className?: string
}

type Row = {
  key: "role" | "name" | "status"
  label: string
  /** 標籤色塊 */
  chip: string
  /** 值欄外框 */
  frame: string
}

// 配色對齊 design tokens：Role 橘、Status 紅、Name 淺綠 —
// 與簡報中的 Accessibility Tree 圖示一致。
const ROWS: Row[] = [
  {
    key: "role",
    label: "Role",
    chip: "bg-orange-PRIMARY text-neutral-black",
    frame: "border-orange-PRIMARY",
  },
  {
    key: "status",
    label: "Status",
    chip: "bg-red-PRIMARY text-neutral-white",
    frame: "border-red-PRIMARY",
  },
  {
    key: "name",
    label: "Name",
    chip: "bg-teal-100/25 text-teal-700",
    frame: "border-teal-100",
  },
]

export function A11yTree({ selector, hint, className }: A11yTreeProps) {
  const [node, setNode] = useState<A11yNode | null>(null)
  const headingId = useId()

  useEffect(() => {
    let frame = 0

    const recompute = () => {
      const el = document.querySelector(selector)
      const next = computeA11yNode(el)
      // 只在值真的變了才 setState，否則 MutationObserver 的每次觸發都會重繪。
      setNode((prev) => (sameNode(prev, next) ? prev : next))
    }

    // MutationObserver 會在同一批 DOM 變動中連續觸發多次，用 rAF 收斂成一次計算。
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(recompute)
    }

    recompute()

    const observer = new MutationObserver(schedule)
    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    })

    // 原生 checkbox 的 checked 是 property 不是 attribute，MutationObserver 看不到，
    // 所以另外聽這幾個事件。
    const events = ["input", "change", "click", "keyup", "focusin", "focusout"] as const
    for (const type of events) document.addEventListener(type, schedule, true)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      for (const type of events) document.removeEventListener(type, schedule, true)
    }
  }, [selector])

  return (
    <div
      role="group"
      aria-labelledby={headingId}
      className={cn(
        "rounded-24 border border-bg-warm-gray bg-neutral-white p-24 tablet:p-32",
        className,
      )}
    >
      <p id={headingId} className="typography-strong1 m-0 text-teal-700">
        Accessibility Tree
      </p>
      {hint ? <p className="typography-body2 mt-4 text-teal-300">{hint}</p> : null}

      <div data-testid="a11y-tree-values" aria-live="polite" className="mt-24">
        {node ? (
          <dl className="m-0 grid gap-16">
            {ROWS.map((row) => (
              <div key={row.key} className="flex flex-col gap-8 tablet:flex-row tablet:items-center">
                <dt
                  className={cn(
                    "typography-strong2 flex h-40 w-[10rem] shrink-0 items-center justify-center rounded-8",
                    row.chip,
                  )}
                >
                  {row.label}
                </dt>
                <dd
                  data-testid={`a11y-tree-${row.key}`}
                  className={cn(
                    "typography-body2 m-0 flex min-h-40 flex-1 items-center overflow-x-auto rounded-8 border-2 bg-neutral-white px-16 py-8 font-mono text-teal-700",
                    row.frame,
                  )}
                >
                  {formatValue(row.key, node)}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <p data-testid="a11y-tree-empty" className="typography-body2 m-0 text-teal-300">
            元素目前不在無障礙樹中。
          </p>
        )}
      </div>
    </div>
  )
}

function formatValue(key: Row["key"], node: A11yNode): string {
  if (key === "role") return node.role
  // 空字串在等寬字裡看起來像壞掉，所以明講「（無）」。
  if (key === "name") return node.name || "（無 accessible name）"
  return node.status.length > 0 ? node.status.join(", ") : "（無狀態）"
}

function sameNode(a: A11yNode | null, b: A11yNode | null): boolean {
  if (a === null || b === null) return a === b
  return (
    a.role === b.role &&
    a.name === b.name &&
    a.status.length === b.status.length &&
    a.status.every((s, i) => s === b.status[i])
  )
}
