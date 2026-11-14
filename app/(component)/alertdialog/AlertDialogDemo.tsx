"use client"

import { useState } from "react"
import { AlertDialog } from "@/components/AlertDialog/AlertDialog"
import { Button } from "@/components/Button/Button"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"
import { DemoViewport } from "@/components/demo/DemoViewport"
import { useDemoHost } from "@/components/demo/DemoWorkspace"
import { focusAnchor } from "@/lib/focus-anchor"


export function AlertDialogDemo() {
  const [open, setOpen] = useState(false)
  const [pageOpen, setPageOpen] = useState(false)
  const [observePage, setObservePage] = useState(false)
  const workspace = useDemoHost()

  return (
    <div className="flex flex-col gap-24">
      <DemoStage id="alertdialog-demo" className="flex-col items-stretch">
        <DemoViewport id="alertdialog-viewport" title="Alert Dialog 局部示範視窗">
          <Button variant="small" theme="danger" onClick={() => { setObservePage(false); setOpen(true) }}>刪除帳號</Button>
          <AlertDialog open={open} onClose={() => setOpen(false)} title="確定要刪除帳號嗎？" message="刪除後所有資料將立即永久移除，無法復原。" confirmLabel="永久刪除" onConfirm={() => setOpen(false)} afterActions={<Button variant="small" theme="greenStroke" onClick={(event) => { const target = workspace?.observations[0]?.cardId; if (target) focusAnchor(event, target) }}>查看 Accessibility Tree</Button>} />
        </DemoViewport>
      </DemoStage>

      <div role="note" className="flex flex-col items-start gap-12 rounded-16 border border-bg-warm-gray bg-neutral-white p-16">
        <p className="typography-body2 m-0 text-teal-300">為方便對照，這裡使用嵌入的 Demo 視窗，遮罩與背景限制只作用於該視窗，外層教學頁仍可閱讀。使用的仍是真正的 Alert Dialog；框內「查看 Accessibility Tree」是教學用導覽。若要體驗整頁被限制操作，可使用下方入口。示範不會刪除資料。</p>
        <Button variant="small" theme="greenStroke" onClick={() => { setOpen(false); setObservePage(true); setPageOpen(true) }}>體驗全頁模態視窗</Button>
      </div>
      <A11yTree
        latch
        selector={observePage ? "#alertdialog-full [role='alertdialog'][open]" : "#alertdialog-viewport >>> [role='alertdialog'][open]"}
        fallback={{
          role: "alertdialog",
          name: "確定要刪除帳號嗎？",
          description: "刪除後所有資料將立即永久移除，無法復原。",
        }}
        hint={observePage ? "觀察對象：全頁模式中開啟的警示對話框。" : "觀察對象：Demo 視窗內開啟的警示對話框；資料直接取自該視窗。"}
      />

      <div id="alertdialog-full"><AlertDialog
        open={pageOpen}
        onClose={() => setPageOpen(false)}
        title="確定要刪除帳號嗎？"
        message="刪除後所有資料將立即永久移除，無法復原。"
        confirmLabel="永久刪除"
        onConfirm={() => setPageOpen(false)}
      /></div>
    </div>
  )
}
