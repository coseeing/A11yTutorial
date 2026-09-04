"use client"

import { useState } from "react"
import { Button } from "@/components/Button/Button"
import { Dialog } from "@/components/Dialog/Dialog"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"

// DialogDemo — Dialog 的互動範例與其 Accessibility Tree。
//
// 兩者放在同一個 client 元件裡，是因為 A11yTree 要觀察的目標只有在對話框開啟時
// 才存在於 DOM；擺在一起，讀者按下按鈕的同時就能看到三列數值從「不在無障礙樹中」
// 變成 dialog / 標題 / open, modal。
export function DialogDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-24">
      <DemoStage>
        <Button variant="small" theme="light" onClick={() => setOpen(true)}>
          開啟對話框
        </Button>
        <p className="typography-body2 m-0 text-teal-300">
          開啟後試試 Tab、Shift + Tab 與 Esc，下方的三列數值會跟著改變。
        </p>
      </DemoStage>

      <A11yTree
        selector="dialog[open]"
        hint="觀察對象：目前開啟中的 <dialog> 元素。"
      />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="刪除這筆紀錄？"
        description="刪除後無法復原，確定要繼續嗎？"
        actions={
          <>
            <Button variant="small" theme="greenStroke" onClick={() => setOpen(false)}>
              取消
            </Button>
            <Button variant="small" theme="danger" onClick={() => setOpen(false)}>
              刪除
            </Button>
          </>
        }
      />
    </div>
  )
}
