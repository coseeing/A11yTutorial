"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/cn"

// Checkbox — NOT in Figma; SSO gap-fill on brand tokens.
type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label?: React.ReactNode
  invalid?: boolean
  /**
   * 部分勾選（三態的第三態）。常見於控制整組子項目的「全選」核取方塊：
   * 子項目有勾有沒勾時，父項既不是勾選也不是未勾選。
   *
   * 這個狀態在 HTML 裡只存在於 DOM property，寫不進屬性裡 —— 所以要用 ref
   * 設定，並另外補上 aria-checked="mixed" 讓它進得了無障礙樹。
   */
  indeterminate?: boolean
  /** Applied to the wrapping <label> when `label` is set. */
  labelClassName?: string
}

export function Checkbox({
  className,
  labelClassName,
  invalid,
  indeterminate = false,
  label,
  id,
  ...props
}: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate
  }, [indeterminate])

  const control = (
    <input
      ref={ref}
      id={id}
      type="checkbox"
      aria-invalid={invalid || undefined}
      // 瀏覽器會從 indeterminate property 算出 mixed，但那要等 effect 跑完；
      // 明寫這個屬性讓伺服器端渲染的第一幀就正確。
      aria-checked={indeterminate ? "mixed" : undefined}
      className={cn(
        "size-16 shrink-0 rounded-[0.4rem] border border-bg-warm-gray bg-neutral-white text-teal-PRIMARY accent-teal-PRIMARY transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        invalid && "border-red-PRIMARY",
        className,
      )}
      {...props}
    />
  )

  if (!label) return control

  return (
    <label
      htmlFor={id}
      className={cn(
        "typography-body1 inline-flex items-center gap-8 text-teal-700",
        labelClassName,
      )}
    >
      {control}
      {label}
    </label>
  )
}
