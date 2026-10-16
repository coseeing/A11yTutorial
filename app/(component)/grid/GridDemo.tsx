"use client"

import { Grid } from "@/components/Grid/Grid"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"

// GridDemo — 可用方向鍵逐格移動、以空白鍵選取整列的互動表格。
//
// 第三個面板盯的是「目前選取的列」。還沒選任何一列時它是空狀態 —— 那不是壞掉，
// 是 aria-selected=true 的列還不存在。按一下空白鍵就會出現。

const COLUMNS = [
  { key: "name", label: "檔案名稱", width: "16rem" },
  { key: "owner", label: "擁有者", width: "10rem" },
  { key: "updated", label: "最後更新" },
]

const ROWS = [
  {
    id: "row-1",
    cells: { name: "無障礙檢測報告.pdf", owner: "設計組", updated: "10 月 9 日" },
  },
  {
    id: "row-2",
    cells: { name: "元件規格.xlsx", owner: "前端組", updated: "10 月 6 日" },
  },
  {
    id: "row-3",
    cells: { name: "使用者訪談逐字稿.docx", owner: "研究組", updated: "9 月 30 日" },
  },
]

export function GridDemo() {
  return (
    <div className="flex flex-col gap-24">
      <DemoStage id="grid-demo" className="flex-col items-stretch gap-12">
        <h3 id="grid-demo-heading" className="typography-strong1 m-0 text-teal-700">
          共用檔案
        </h3>
        <p id="grid-demo-note" className="typography-body2 m-0 text-teal-300">
          以方向鍵移動，按空白鍵選取整列。
        </p>
        <Grid
          columns={COLUMNS}
          rows={ROWS}
          labelledBy="grid-demo-heading"
          describedBy="grid-demo-note"
        />
      </DemoStage>

      {/* 三個面板由外而內：grid 容器 → 目前聚焦的儲存格 → 目前選取的列。 */}
      <A11yTree selector="#grid-demo [role='grid']" hint="觀察對象：Grid 容器。" />

      <A11yTree
        selector="#grid-demo [role='gridcell'][tabindex='0']"
        hint="觀察對象：目前可聚焦的儲存格。"
      />

      {/* 可以選多列，但 selector 只會取到第一個 —— hint 要說清楚是哪一個。 */}
      <A11yTree
        selector="#grid-demo [role='row'][aria-selected='true']"
        fallback={{
          role: "row",
          name: "無障礙檢測報告.pdf 設計組 10 月 9 日",
          status: ["aria-selected=true"],
        }}
        hint="觀察對象：第一個被選取的列。"
      />
    </div>
  )
}
