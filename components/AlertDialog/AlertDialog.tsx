"use client"

import { useEffect, useId, useRef } from "react"
import { cn } from "@/lib/cn"
import { Button } from "../Button/Button"

// AlertDialog — 依 W3C ARIA APG 的 Alert Dialog Pattern 實作。
//
// 它是 Dialog 的一種特例：承載一則需要立即回應的警示訊息。三個差別決定了為什麼
// 它值得獨立成一個元件，而不是 Dialog 的一個 prop：
//
// 1. role=alertdialog 而非 dialog —— 螢幕閱讀器會把它當成警示來處理，開啟時
//    連同訊息一起播報，而不是只唸出標題。
// 2. aria-describedby 是必填 —— Dialog 的說明可有可無，警示對話框的訊息本體
//    必須被關聯，否則「警示」兩個字就沒有內容。
// 3. 初始焦點落在影響最小的控制元件上 —— 破壞性動作旁邊若預選了「刪除」，
//    一個 Enter 就回不來了。

type AlertDialogProps = {
  open: boolean
  onClose: () => void
  /** 可見標題，同時是對話框的無障礙名稱。 */
  title: string
  /** 警示訊息本體。必填 —— 它是這個元件的 aria-describedby 來源。 */
  message: React.ReactNode
  /** 確認動作的標籤，通常是破壞性的那一個。 */
  confirmLabel: string
  onConfirm: () => void
  /** 取消動作的標籤。焦點會落在這一顆上。 */
  cancelLabel?: string
  className?: string
}

export function AlertDialog({
  open,
  onClose,
  title,
  message,
  confirmLabel,
  onConfirm,
  cancelLabel = "取消",
  className,
}: AlertDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()
  const messageId = useId()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) {
      el.showModal()
      // showModal() 預設把焦點給第一個可聚焦元素。這裡明確移到取消鈕：
      // 執行不可逆操作時，焦點該落在影響最小的控制元件上。
      cancelRef.current?.focus()
    }
    if (!open && el.open) el.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      // 覆寫 <dialog> 的隱含 dialog 角色。alertdialog 讓輔助科技把它當成警示，
      // 開啟時會連同 aria-describedby 的內容一起播報。
      role="alertdialog"
      // showModal() 其實已隱含 modal 語意，但那是無障礙樹層級的值，DOM 上看不到。
      // APG 要求明寫，讓用檢查工具的人也看得見。
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={messageId}
      onClose={onClose}
      className={cn(
        "m-auto w-[calc(100vw-4rem)] max-w-[44rem] rounded-24 border-0 bg-neutral-white p-0 shadow-[0_1.6rem_4rem_rgb(16_36_42_/_0.25)] backdrop:bg-teal-700/60 backdrop:backdrop-blur-[0.3rem]",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-24 p-24 tablet:p-32">
        {/* 頂部紅條：警示對話框與一般對話框在視覺上也該分得出來。 */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-red-PRIMARY" />

        <h2 id={titleId} className="typography-headline4 m-0 text-teal-700">
          {title}
        </h2>
        <p id={messageId} className="typography-body1 mt-8 text-teal-700">
          {message}
        </p>

        <div className="mt-24 flex flex-wrap justify-end gap-12">
          <Button ref={cancelRef} variant="small" theme="greenStroke" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button variant="small" theme="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  )
}
