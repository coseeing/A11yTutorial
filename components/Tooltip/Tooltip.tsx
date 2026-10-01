"use client"

import { cloneElement, useEffect, useId, useRef, useState } from "react"
import { cn } from "@/lib/cn"

// Tooltip — 依 W3C ARIA APG 的 Tooltip Pattern 實作。
//
// 它是三者中最輕的一層：只是補一句說明，不接收焦點、不中斷任何事。這也是它最
// 容易被誤用的地方 —— 需要操作的內容放進 Tooltip，鍵盤使用者就到不了，因為
// 焦點始終留在觸發元素上。那種情況該用 Dialog。
//
// WCAG 1.4.13「暫留或聚焦時出現的內容」規定了三件事，這個元件三件都做到：
//   可關閉 —— Escape 關掉而不移動焦點
//   可停留 —— 指標可以從觸發元素移到提示上而不讓它消失
//   持續性 —— 在焦點或指標離開之前不會自己消失

type TooltipProps = {
  /** 提示內容。簡短的補充說明，不放可操作的元素。 */
  content: React.ReactNode
  /**
   * 觸發元素。會被加上 aria-describedby 與顯示／隱藏的事件處理。
   * 必須是可聚焦的元素，否則鍵盤使用者永遠觸發不了。
   */
  children: React.ReactElement<{ "aria-describedby"?: string }>
  className?: string
}

export function Tooltip({ content, children, className }: TooltipProps) {
  const [open, setOpen] = useState(false)
  const tooltipId = useId()
  // 指標在「觸發元素」與「提示本身」之間移動時會先觸發 mouseleave 再觸發
  // mouseenter。用一個 frame 的延遲吸收這個空窗，提示才不會閃一下就消失。
  const closeTimer = useRef<number | null>(null)

  const show = () => {
    if (closeTimer.current !== null) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setOpen(true)
  }

  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 0)
  }

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      // WCAG 1.4.13「可關閉」：Escape 要能關掉，而且不能移動焦點。
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open])

  useEffect(
    () => () => {
      if (closeTimer.current !== null) clearTimeout(closeTimer.current)
    },
    [],
  )

  // 只有 aria-describedby 非得落在觸發元素本身 —— 說明是附加在那個元素上的。
  // 焦點事件則掛在外層：React 的 onFocus / onBlur 底層是會冒泡的 focusin /
  // focusout，所以觸發元素不需要轉發任何東西。這點很重要 —— 許多元件（包含
  // 這個專案的 Button）並不接受 onFocus，用 cloneElement 傳過去會被默默丟掉。
  const trigger = cloneElement(children, {
    // 只在顯示時指向 —— 指向一個不存在的 id 會讓無障礙名稱計算拿到空字串。
    "aria-describedby": open ? tooltipId : undefined,
  })

  return (
    // 包住觸發元素與提示：指標在兩者之間移動時都算「還在裡面」，提示才停得住。
    <span
      className={cn("relative inline-flex", className)}
      onFocus={show}
      onBlur={() => setOpen(false)}
      onMouseEnter={show}
      onMouseLeave={scheduleClose}
    >
      {trigger}
      {open ? (
        <span
          id={tooltipId}
          role="tooltip"
          // 不給 tabindex：提示本身永遠不接收焦點，焦點留在觸發元素上。
          className="typography-body2 absolute bottom-[calc(100%+0.8rem)] left-1/2 z-10 w-max max-w-[28rem] -translate-x-1/2 rounded-8 bg-teal-700 px-16 py-8 text-bg-light-off-white shadow-[0_0.4rem_1.2rem_rgb(16_36_42_/_0.24)]"
        >
          {content}
        </span>
      ) : null}
    </span>
  )
}
