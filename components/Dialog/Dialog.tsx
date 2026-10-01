"use client"

import { useEffect, useId, useRef } from "react"
import { cn } from "@/lib/cn"
import { PlusIcon } from "../Icons/Icons"

// Dialog — design-system extension (not in Figma), styled in the brand
// language: the auth-panel signature (white rounded-24 panel, orange top
// accent, deep teal shadow) over a teal backdrop blur.
// Built on the native <dialog> element, so focus trapping, ESC-to-close, and
// inert background come from the platform; backdrop click also closes.

type DialogProps = {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children?: React.ReactNode
  /** Footer actions, e.g. Buttons. Right-aligned, wraps on narrow screens. */
  actions?: React.ReactNode
  size?: "sm" | "md"
  className?: string
}

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  actions,
  size = "sm",
  className,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      // 說明文字若只是視覺上擺在標題下方，輔助科技在開啟時不會播報它 —— 使用者
      // 得自行往下瀏覽才讀得到那句警告。aria-describedby 讓它跟著名稱一起唸出。
      aria-describedby={description ? descriptionId : undefined}
      onClose={onClose}
      onClick={(e) => {
        // The inner panel covers the whole dialog box, so the dialog element
        // itself is only the click target when the backdrop is clicked.
        if (e.target === ref.current) onClose()
      }}
      className={cn(
        "m-auto w-[calc(100vw-4rem)] rounded-24 border-0 bg-neutral-white p-0 shadow-[0_1.6rem_4rem_rgb(16_36_42_/_0.25)] backdrop:bg-teal-700/60 backdrop:backdrop-blur-[0.3rem]",
        size === "sm" ? "max-w-[44rem]" : "max-w-[64rem]",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-24 p-24 tablet:p-32">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-orange-PRIMARY" />
        <div className="flex items-start justify-between gap-16">
          <h2 id={titleId} className="typography-headline4 m-0 text-teal-700">
            {title}
          </h2>
          <button
            type="button"
            aria-label="關閉"
            onClick={onClose}
            className="flex size-32 shrink-0 cursor-pointer items-center justify-center rounded-8 border-0 bg-transparent p-0 text-teal-700 transition-colors hover:bg-bg-light-beige focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
          >
            <PlusIcon className="rotate-45" />
          </button>
        </div>
        {description ? (
          <p id={descriptionId} className="typography-body1 mt-8 text-teal-300">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-16">{children}</div> : null}
        {actions ? (
          <div className="mt-24 flex flex-wrap justify-end gap-12">{actions}</div>
        ) : null}
      </div>
    </dialog>
  )
}
