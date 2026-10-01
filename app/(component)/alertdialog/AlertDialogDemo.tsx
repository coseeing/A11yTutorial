"use client"

import { useState } from "react"
import { AlertDialog } from "@/components/AlertDialog/AlertDialog"
import { Button } from "@/components/Button/Button"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"

const HINT =
  "開啟後注意焦點落在哪一顆按鈕上：是「取消」而不是「永久刪除」。執行不可逆的操作時，預設焦點不該停在那顆回不來的按鈕上。按 Esc 或取消都能關閉，焦點會回到原本的觸發按鈕。"

export function AlertDialogDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-24">
      <DemoStage id="alertdialog-demo">
        <Button variant="small" theme="danger" onClick={() => setOpen(true)}>
          刪除帳號
        </Button>
      </DemoStage>

      <p className="typography-body2 m-0 text-teal-300">{HINT}</p>

      <A11yTree
        latch
        selector="[role='alertdialog'][open]"
        hint="觀察對象：開啟中的警示對話框。關閉後會保留最後一次的值。"
      />

      <AlertDialog
        open={open}
        onClose={() => setOpen(false)}
        title="確定要刪除帳號嗎？"
        message="刪除後所有資料將立即永久移除，無法復原。"
        confirmLabel="永久刪除"
        onConfirm={() => setOpen(false)}
      />
    </div>
  )
}
