"use client"

import { useState } from "react"
import { AlertDialog } from "@/components/AlertDialog/AlertDialog"
import { Button } from "@/components/Button/Button"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"


export function AlertDialogDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-24">
      <DemoStage id="alertdialog-demo">
        <Button variant="small" theme="danger" onClick={() => setOpen(true)}>
          刪除帳號
        </Button>
      </DemoStage>


      <A11yTree
        latch
        selector="[role='alertdialog'][open]"
        hint="觀察對象：開啟中的警示對話框。"
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
