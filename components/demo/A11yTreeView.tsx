import { useId } from "react"
import { cn } from "@/lib/cn"
import type { A11yNode } from "@/lib/a11y/compute-node"

// A11yTreeView — Role / Name / Status 三列的呈現，不負責觀察。
//
// 拆成純呈現之後，值可以來自即時觀察（useA11yNode）、保留下來的舊值，或是手寫
// 的宣告值（用於尚未實作的元件頁、或與實際值並排對照）。面板長什麼樣子只有這裡
// 決定，換餵法不必動版型。

type A11yTreeViewProps = {
  node: A11yNode | null
  /** 面板標題。留預設值，除非同一頁出現多個面板需要區分。 */
  title?: string
  /** node 是保留下來的舊值，目標當下已不在無障礙樹中。 */
  stale?: boolean
  /** 面板標題下方的補充說明。 */
  hint?: string
  className?: string
}

type Row = {
  key: "role" | "name" | "description" | "status"
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
  {
    key: "description",
    label: "Description",
    chip: "bg-blue-100 text-teal-700",
    frame: "border-blue-300",
  },
]

export function A11yTreeView({
  node,
  title = "Accessibility Tree",
  stale = false,
  hint,
  className,
}: A11yTreeViewProps) {
  const headingId = useId()

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
        {title}
      </p>
      {hint ? <p className="typography-body2 mt-4 text-teal-300">{hint}</p> : null}

      {/*
        data-stale 不是給讀者看的，是給測試用的：舊值在畫面上不另外標示，
        但那個狀態仍需要能被驗證。
      */}
      <div
        data-testid="a11y-tree-values"
        data-stale={stale ? "true" : undefined}
        aria-live="polite"
        className="mt-24"
      >
        {node ? (
          <dl className="m-0 grid gap-16">
            {ROWS.map((row) => (
              <div
                key={row.key}
                className="flex flex-col gap-8 tablet:flex-row tablet:items-center"
              >
                <dt
                  className={cn(
                    "typography-strong2 flex h-40 w-[10rem] shrink-0 items-center justify-center rounded-8",
                    row.chip,
                    // 舊值整組調淡，一眼看得出它不是此刻的狀態。
                    stale && "opacity-60",
                  )}
                >
                  {row.label}
                </dt>
                <dd
                  data-testid={`a11y-tree-${row.key}`}
                  className={cn(
                    "typography-body2 m-0 flex min-h-40 flex-1 items-center overflow-x-auto rounded-8 border-2 bg-neutral-white px-16 py-8 font-mono text-teal-700",
                    row.frame,
                    stale && "opacity-60",
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
  // 四列一律顯示。沒有值時明講「（無）」而不是把整列藏起來 —— 讀者要看見的正是
  // 「這個元件有名稱但沒有描述」這件事，消失的列說不出這句話。
  if (key === "description") return node.description || "（無 accessible description）"
  return node.status.length > 0 ? node.status.join(", ") : "（無狀態）"
}
