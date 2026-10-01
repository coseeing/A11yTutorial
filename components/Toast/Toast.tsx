"use client"

import { useEffect } from "react"
import { cn } from "@/lib/cn"
import { PlusIcon } from "../Icons/Icons"

// Toast — 不中斷目前操作的輕量通知。
//
// APG 沒有 Toast pattern，它是介面慣例。無障礙依據來自 WCAG SC 4.1.3 狀態訊息
// 與 SC 2.2.1 時間可調整，加上 ARIA live region 的既有實務。
//
// 與 Alert 的分界是「要不要打斷」：Toast 用 role="status"（隱含 polite），
// 等使用者當下的播報結束才開口；Alert 用 role="alert"（assertive），會插話。
// 與 Dialog 的分界是焦點：Toast 絕不把焦點拉過來。
//
// 這三件事決定了它的限制：焦點留在原處，所以使用者很難走到 Toast 裡的按鈕；
// 走到了也很難走回來。因此 Toast 裡不該放重要的動作 —— 需要動作的訊息，
// 本來就不該用 Toast 說。

type ToastRegionProps = {
  /** 目前要顯示的 Toast；沒有訊息時傳 null，容器仍會渲染。 */
  children?: React.ReactNode
  className?: string
}

/**
 * Toast 的 live region 容器。
 *
 * 一律渲染，即使沒有訊息 —— role="status" 播報的是內容的變化，容器要先在 DOM
 * 裡，之後塞進去的文字才算是變化。這與 Alert 是同一課。
 *
 * 位置刻意交給呼叫端決定，但有一條建議：不要貼在螢幕的右上或右下角。低視能或
 * 使用螢幕放大鏡的人視野集中在畫面中央，邊角的通知他們根本看不到。
 */
export function ToastRegion({ children, className }: ToastRegionProps) {
  return (
    <div role="status" className={cn("flex justify-center", className)}>
      {children}
    </div>
  )
}

type ToastProps = {
  /**
   * 訊息文字。維持一行，最多兩行 —— 它停留的時間很短，讀不完等於沒說。
   * 用「主詞 + 動作結果」的結構，例如「個人資料已更新」。
   */
  message: React.ReactNode
  /**
   * 幾毫秒後自動消失。null 代表不自動消失。
   *
   * 自動消失是一種時間限制（SC 2.2.1）。3 到 5 秒對閱讀速度較慢、使用螢幕
   * 放大鏡逐區掃視、或正在用螢幕閱讀器聽其他內容的人來說往往不夠，所以要能
   * 關掉或延長。
   */
  duration?: number | null
  /** 關閉的處理。省略則不顯示關閉鈕。 */
  onDismiss?: () => void
  className?: string
}

export function Toast({ message, duration = 5000, onDismiss, className }: ToastProps) {
  useEffect(() => {
    if (duration === null || !onDismiss) return
    const timer = setTimeout(onDismiss, duration)
    return () => clearTimeout(timer)
  }, [duration, onDismiss, message])

  return (
    <div
      className={cn(
        "flex max-w-[48rem] items-center gap-16 rounded-[1.2rem] bg-teal-PRIMARY px-20 py-12 shadow-[0_0.8rem_2.4rem_rgb(16_36_42_/_0.24)]",
        className,
      )}
    >
      {/* 單行訊息：超出寬度時截斷而不換行，提醒作者把話說短。 */}
      <p className="typography-body1 m-0 min-w-0 flex-1 text-bg-light-off-white">{message}</p>

      {onDismiss ? (
        <button
          type="button"
          aria-label="關閉通知"
          onClick={onDismiss}
          className="flex size-28 shrink-0 cursor-pointer items-center justify-center rounded-8 border-0 bg-transparent p-0 text-bg-light-off-white transition-colors hover:bg-teal-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
        >
          <PlusIcon className="rotate-45" />
        </button>
      ) : null}
    </div>
  )
}
