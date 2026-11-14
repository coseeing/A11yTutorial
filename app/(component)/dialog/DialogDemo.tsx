"use client"

import { useState } from "react"
import { Button } from "@/components/Button/Button"
import { Dialog } from "@/components/Dialog/Dialog"
import { Input } from "@/components/Input/Input"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"
import { DemoViewport } from "@/components/demo/DemoViewport"
import { useDemoHost } from "@/components/demo/DemoWorkspace"
import { focusAnchor } from "@/lib/focus-anchor"

// DialogDemo — Dialog 的互動範例與其 Accessibility Tree。
//
// 兩者放在同一個 client 元件裡，是因為 A11yTree 要觀察的目標只有在對話框開啟時
// 才存在於 DOM；擺在一起，讀者按下按鈕的同時就能看到面板從「不在無障礙樹中」
// 變成 dialog 與標題。

export function DialogDemo() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("小明")
  const [draft, setDraft] = useState(name)
  const [message, setMessage] = useState("")
  const workspace = useDemoHost()

  return (
    <div className="flex flex-col gap-24">
      <DemoStage id="dialog-demo" className="flex-col items-stretch p-0 tablet:p-0">
        <DemoViewport id="dialog-viewport" title="Dialog 局部示範視窗">
        <div className="flex flex-col items-center gap-16">
        <p className="typography-body2 m-0 text-teal-700">目前顯示名稱：{name}</p>
        <Button variant="small" theme="light" onClick={() => { setDraft(name); setOpen(true) }}>
          編輯個人資料
        </Button>
        <p role="status" className="typography-body3 m-0 text-teal-300">{message}</p>
        </div>
      <form onSubmit={(event) => {
        event.preventDefault()
        const nextName = draft.trim()
        if (!nextName) return
        setName(nextName)
        setMessage(`已儲存顯示名稱：${nextName}`)
        setOpen(false)
      }}>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="編輯個人資料"
        description="修改顯示名稱後，按儲存套用變更。"
        className="[&>div]:p-16"
        actions={
          <>
            <Button variant="small" theme="greenStroke" onClick={() => setOpen(false)}>
              取消
            </Button>
            <Button variant="small" theme="light" type="submit">
              儲存
            </Button>
            <Button variant="small" theme="greenStroke" onClick={(event) => {
              const card = workspace?.observations[0]?.cardId
              if (card) focusAnchor(event, card)
            }}>查看 Accessibility Tree</Button>
          </>
        }
      >
        <label htmlFor="dialog-profile-name" className="typography-strong2 mb-8 block text-teal-700">顯示名稱（必填）</label>
        <Input id="dialog-profile-name" name="displayName" required pattern={".*\\S.*"} title="請至少輸入一個非空白字元。" maxLength={40} value={draft} onChange={(event) => setDraft(event.target.value)} />
      </Dialog>
      </form>
        </DemoViewport>
      </DemoStage>
      <p role="note" className="typography-body2 m-0 rounded-16 border border-bg-warm-gray bg-neutral-white p-16 text-teal-300">這個 Dialog 用來編輯資料；Alert Dialog 範例則用來確認重要警告。為方便對照，遮罩與背景限制只作用於嵌入的 Demo 視窗，外層教學頁仍可閱讀。「查看 Accessibility Tree」是教學用導覽。儲存只更新本次 Demo，重新整理後會還原；取消或按 Esc 不會套用修改。</p>
      <A11yTree latch selector="#dialog-viewport >>> dialog[open]" fallback={{ role: "dialog", name: "編輯個人資料", description: "修改顯示名稱後，按儲存套用變更。" }} hint="觀察對象：Demo 視窗內開啟的對話框，關閉後保留最後的觀察資料。" />
    </div>
  )
}
