"use client"

import { useId } from "react"
import { cn } from "@/lib/cn"

// RadioGroup — 依 W3C ARIA APG 的 Radio Group Pattern 實作。
//
// 底下是原生 <input type="radio">，同一個 name 綁成一組。這樣寫，整組只佔一個
// Tab 停留點、方向鍵在選項間循環並同時改變選取、Space 選取焦點所在項目 ——
// 全部由瀏覽器提供，一行 JavaScript 都不用寫。
//
// 只有一件事需要 ARIA 補：外框要是 role="radiogroup" 而不是 fieldset 隱含的
// group。role 一旦覆寫，legend 的命名對應也跟著失效，所以名稱改用
// aria-labelledby 明確指向 legend。

export type RadioOption = {
  value: string
  label: React.ReactNode
  /** 這個選項專屬的補充說明。群組層級的說明請用 description。 */
  description?: React.ReactNode
}

type RadioGroupProps = {
  /** 群組名稱。會成為可見的 legend，同時是群組的無障礙名稱。 */
  label: React.ReactNode
  options: RadioOption[]
  /** 目前選取的值。null 代表尚未選取。 */
  value: string | null
  onValueChange: (value: string) => void
  /** 整組共用的補充說明。 */
  description?: React.ReactNode
  className?: string
}

export function RadioGroup({
  label,
  options,
  value,
  onValueChange,
  description,
  className,
}: RadioGroupProps) {
  const baseId = useId()
  const legendId = `${baseId}-legend`
  const descriptionId = `${baseId}-description`

  return (
    <fieldset
      // 覆寫 fieldset 的隱含 group 角色 —— APG 要求單選按鈕位於 radiogroup 內。
      role="radiogroup"
      aria-labelledby={legendId}
      aria-describedby={description ? descriptionId : undefined}
      className={cn(
        "m-0 rounded-16 border border-bg-warm-gray bg-neutral-white px-20 py-16",
        className,
      )}
    >
      <legend id={legendId} className="typography-strong1 px-4 text-teal-700">
        {label}
      </legend>
      {description ? (
        <p id={descriptionId} className="typography-body2 mt-4 mb-12 text-teal-300">
          {description}
        </p>
      ) : null}

      <div className="flex flex-col gap-12">
        {options.map((option) => {
          const inputId = `${baseId}-${option.value}`
          const optionDescriptionId = `${inputId}-description`
          return (
            <div key={option.value}>
              <label
                htmlFor={inputId}
                className="typography-body1 inline-flex cursor-pointer items-center gap-8 text-teal-700"
              >
                <input
                  id={inputId}
                  type="radio"
                  name={baseId}
                  value={option.value}
                  checked={value === option.value}
                  aria-describedby={option.description ? optionDescriptionId : undefined}
                  onChange={() => onValueChange(option.value)}
                  className="size-16 shrink-0 accent-teal-PRIMARY focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY focus-visible:ring-offset-2"
                />
                {option.label}
              </label>
              {option.description ? (
                <p
                  id={optionDescriptionId}
                  className="typography-body2 m-0 ms-24 text-teal-300"
                >
                  {option.description}
                </p>
              ) : null}
            </div>
          )
        })}
      </div>
    </fieldset>
  )
}
