"use client"

import { useRef, useState } from "react"
import { cn } from "@/lib/cn"
import { Button } from "../Button/Button"
import { Dialog } from "../Dialog/Dialog"
import { RadioGroup } from "../RadioGroup/RadioGroup"

// DialogCombobox — Combobox Pattern 的對話框型彈出內容。
//
// 同一個 pattern 的彈出內容可以是 listbox、grid、tree 或 dialog。換成 dialog
// 之後有兩件事跟著變：
//
//   1. aria-haspopup 必須明寫成 dialog。listbox 可以省略（那是隱含值），
//      其他三種不行 —— 使用者得先知道按下去會開一個對話框，而不是展開清單。
//
//   2. 對話框本身要完整符合 Modal Dialog Pattern：焦點移入、焦點循環、Esc 關閉。
//      這裡直接用站上的 Dialog 元件，那些行為由原生 <dialog> 的 showModal() 提供。
//
// 完成或取消之後，焦點都要回到 combobox。取消時值保持不變 —— 使用者按 Esc 的
// 意思是「我不要改」，不是「把原本的清掉」。

type DialogComboboxProps = {
  label: string
  options: string[]
  value: string
  onValueChange: (value: string) => void
  className?: string
}

export function DialogCombobox({
  label,
  options,
  value,
  onValueChange,
  className,
}: DialogComboboxProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  // 對話框裡的暫定選擇。按確定才寫回 combobox，按取消就整個丟掉。
  const [draft, setDraft] = useState(value)

  const openDialog = () => {
    setDraft(value)
    setOpen(true)
  }

  const close = () => {
    setOpen(false)
    // 焦點回到 combobox，不是回到頁面開頭。這是 Modal Dialog Pattern 要求的，
    // 少了它鍵盤使用者得重新 Tab 一遍才回到原處。
    inputRef.current?.focus()
  }

  const confirm = () => {
    onValueChange(draft)
    close()
  }

  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      <label htmlFor="dialog-combobox-input" className="typography-strong2 text-teal-700">
        {label}
      </label>

      <input
        ref={inputRef}
        id="dialog-combobox-input"
        role="combobox"
        type="text"
        // 值只能從對話框選，所以輸入框唯讀。readOnly 而非 disabled：
        // disabled 的元素不可聚焦，鍵盤使用者就打不開對話框了。
        readOnly
        value={value}
        placeholder="尚未選擇"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={openDialog}
        onKeyDown={(e) => {
          // Enter、Space 與 Alt + ↓ 都該打開彈出內容。唯讀的 input 不會自己
          // 處理這些鍵，要手動接。
          if (e.key === "Enter" || e.key === " " || (e.altKey && e.key === "ArrowDown")) {
            e.preventDefault()
            openDialog()
          }
        }}
        className="typography-body1 w-full cursor-pointer rounded-8 border border-bg-warm-gray bg-neutral-white px-16 py-12 text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
      />

      <Dialog
        open={open}
        onClose={close}
        title="選擇出發日期"
        description="選好之後按確定，按取消則保留原本的日期。"
        actions={
          <>
            <Button variant="small" theme="greenStroke" onClick={close}>
              取消
            </Button>
            <Button variant="small" onClick={confirm}>
              確定
            </Button>
          </>
        }
      >
        {/*
          對話框內的選擇直接用站上的 RadioGroup：這幾個日期是互斥選項，而
          roving tabindex 與方向鍵移動那一整套已經實作在那個元件裡了。
        */}
        <RadioGroup
          label="可選的出發日期"
          options={options.map((option) => ({ value: option, label: option }))}
          value={draft || null}
          onValueChange={setDraft}
        />
      </Dialog>
    </div>
  )
}
