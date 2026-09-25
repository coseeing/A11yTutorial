"use client"

import { useId } from "react"
import { cn } from "@/lib/cn"

// Switch — 依 W3C ARIA APG 的 Switch Pattern 實作。
//
// 底下是原生 <input type="checkbox"> 加上 role="switch"。這樣寫的理由是：
// 鍵盤操作、勾選狀態、label 關聯全部由平台提供，只有「這是開關不是核取方塊」
// 這一件事需要 ARIA 補上。從零用 <div role="switch"> 做，等於要自己重寫
// Space 鍵、焦點、與標籤的關聯，沒有必要。
//
// Switch 與 Checkbox 的分界在於「立即生效」：開關改的是當下的狀態（深色模式、
// 靜音），核取方塊是待送出的選擇。標籤在切換前後必須一模一樣 —— 標籤描述的是
// 這個設定是什麼，不是下一次按下去會發生什麼。

type SwitchProps = {
  label: React.ReactNode
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
  "aria-describedby"?: string
  className?: string
}

export function Switch({
  label,
  checked,
  onCheckedChange,
  disabled = false,
  "aria-describedby": ariaDescribedby,
  className,
}: SwitchProps) {
  const id = useId()

  return (
    <label
      htmlFor={id}
      className={cn(
        "typography-body1 inline-flex cursor-pointer items-center gap-12 text-teal-700",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        aria-describedby={ariaDescribedby}
        onChange={(e) => onCheckedChange(e.target.checked)}
        // appearance-none 拿掉原生外觀，改畫成下面那條軌道。
        className="peer size-0 appearance-none"
      />
      {/*
        這個 span 必須是 input 的「下一個兄弟節點」—— Tailwind 的 peer 變體產生的
        是同層選擇器（~），放進另一個元素裡面就永遠選不到，focus ring 會整個消失。
        Switch.test.tsx 有一條測試釘住這個結構。
      */}
      <span
        aria-hidden="true"
        className={cn(
          "relative inline-flex h-24 w-44 shrink-0 items-center rounded-[6rem] transition-colors",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-orange-PRIMARY peer-focus-visible:ring-offset-2",
          checked ? "bg-teal-PRIMARY" : "bg-neutral-medium-gray",
        )}
      >
        <span
          className={cn(
            "absolute size-20 rounded-full bg-neutral-white transition-transform",
            checked ? "translate-x-[2.2rem]" : "translate-x-[0.2rem]",
          )}
        />
      </span>
      {label}
    </label>
  )
}
