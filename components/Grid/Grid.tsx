"use client"

import { useRef, useState } from "react"
import { cn } from "@/lib/cn"

// Grid — 依 W3C ARIA APG 的 Grid Pattern 實作。
//
// Grid 不是「比較漂亮的 Table」。差別在互動：靜態表格不接收焦點，螢幕閱讀器用
// 自己的表格瀏覽模式讀它；Grid 則把方向鍵接過來自己處理，整個表格只佔一個 Tab
// 停留點，焦點在儲存格之間移動。
//
// 選擇標準很單純：表格裡沒有需要操作的東西，就用 Table。接過方向鍵等於同時接下
// 全部的焦點管理責任，沒有互動需求時那是白做工，還會讓螢幕閱讀器原本好用的表格
// 瀏覽功能失效。
//
// 焦點管理用 roving tabindex：只有一個儲存格的 tabindex 是 0，其餘是 -1。

export type GridColumn = {
  key: string
  label: string
  width?: string
}

export type GridRow = {
  id: string
  cells: Record<string, string>
}

type GridProps = {
  columns: GridColumn[]
  rows: GridRow[]
  /** 指向可見標題的 id，成為 grid 的無障礙名稱。 */
  labelledBy: string
  /** 指向補充說明的 id。 */
  describedBy?: string
  className?: string
}

export function Grid({ columns, rows, labelledBy, describedBy, className }: GridProps) {
  const gridRef = useRef<HTMLTableElement>(null)
  // [列, 欄]，列 0 是標頭列 —— 標頭也要能用方向鍵走到，不然使用者無法確認欄位名稱。
  const [focus, setFocus] = useState<[number, number]>([1, 0])
  const [selected, setSelected] = useState<string[]>([])

  const lastRow = rows.length
  const lastCol = columns.length - 1

  const moveTo = (row: number, col: number) => {
    const next: [number, number] = [
      Math.max(0, Math.min(lastRow, row)),
      Math.max(0, Math.min(lastCol, col)),
    ]
    setFocus(next)
    gridRef.current
      ?.querySelector<HTMLElement>(`[data-cell="${next[0]}-${next[1]}"]`)
      ?.focus()
  }

  const toggleRow = (rowIndex: number) => {
    const row = rows[rowIndex - 1]
    if (!row) return
    setSelected((prev) =>
      prev.includes(row.id) ? prev.filter((id) => id !== row.id) : [...prev, row.id],
    )
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const [r, c] = focus
    if (e.key === "ArrowRight") moveTo(r, c + 1)
    else if (e.key === "ArrowLeft") moveTo(r, c - 1)
    else if (e.key === "ArrowDown") moveTo(r + 1, c)
    else if (e.key === "ArrowUp") moveTo(r - 1, c)
    else if (e.key === "Home" && e.ctrlKey) moveTo(0, 0)
    else if (e.key === "End" && e.ctrlKey) moveTo(lastRow, lastCol)
    else if (e.key === "Home") moveTo(r, 0)
    else if (e.key === "End") moveTo(r, lastCol)
    else if (e.key === " " && r > 0) toggleRow(r)
    else return
    // 方向鍵在表格內會捲動頁面，空白鍵也會 —— 處理掉的按鍵一律吃掉預設行為。
    e.preventDefault()
  }

  const cellProps = (row: number, col: number) => ({
    "data-cell": `${row}-${col}`,
    tabIndex: focus[0] === row && focus[1] === col ? 0 : -1,
    onFocus: () => setFocus([row, col]),
  })

  const CELL =
    "border-b border-teal-100 px-16 py-12 text-left align-top focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-PRIMARY"

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table
        ref={gridRef}
        // 原生 <table> 的隱含角色是 table，要明寫 grid 才會換成互動語意。
        role="grid"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        onKeyDown={onKeyDown}
        className="w-full border-collapse bg-neutral-white"
      >
        <thead>
          <tr role="row">
            {columns.map((col, c) => (
              <th
                key={col.key}
                role="columnheader"
                scope="col"
                style={col.width ? { width: col.width } : undefined}
                className={`${CELL} typography-strong2 text-teal-700`}
                {...cellProps(0, c)}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const isSelected = selected.includes(row.id)
            return (
              <tr
                key={row.id}
                role="row"
                // 選取狀態放在列上而非儲存格上 —— 這個 Grid 的選取單位是一整列。
                aria-selected={isSelected}
                className={cn(isSelected && "bg-teal-100/40")}
              >
                {columns.map((col, c) => (
                  <td
                    key={col.key}
                    role="gridcell"
                    className={`${CELL} typography-body2 text-teal-700`}
                    {...cellProps(i + 1, c)}
                  >
                    {row.cells[col.key]}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
