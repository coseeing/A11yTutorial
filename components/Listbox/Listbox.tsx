"use client"

import { useId, useRef, useState } from "react"
import { cn } from "@/lib/cn"
import { scrollActiveOptionIntoView } from "@/lib/a11y/scroll-active-option"

// Listbox — 依 W3C ARIA APG 的 Listbox Pattern 實作。
//
// 焦點管理用的是 aria-activedescendant，不是 roving tabindex：焦點永遠停在
// listbox 容器上，由 aria-activedescendant 指出「容器內目前作用中的是哪個選項」。
// 站上的 Radio Group 與 Tabs 用的是另一種做法（焦點真的在選項上移動），兩種
// APG 都允許，差別在於這一種不必在每次移動時呼叫 focus()，選項也不需要是
// 可聚焦元素。
//
// 單選的 listbox 讓選取跟著焦點移動 —— 方向鍵移到哪就選到哪，不必再按一次
// 空白鍵。APG 允許這個簡化，前提是選取不會造成不可逆的副作用。

export type ListboxOption = {
  value: string
  label: string
}

export type ListboxGroup = {
  /** 群組名稱。可見，同時成為 group 的無障礙名稱。 */
  label: string
  /** 每個群組至少要有一個選項 —— 空群組在無障礙樹裡是個說不出用途的空殼。 */
  options: ListboxOption[]
}

type ListboxProps = {
  groups: ListboxGroup[]
  value: string
  onValueChange: (value: string) => void
  /** 指向可見標題的 id，成為 listbox 的無障礙名稱。 */
  labelledBy: string
  className?: string
}

export function Listbox({
  groups,
  value,
  onValueChange,
  labelledBy,
  className,
}: ListboxProps) {
  const base = useId()
  const listRef = useRef<HTMLDivElement>(null)
  // 攤平成一維才好用方向鍵走 —— 群組只影響呈現與語意，不影響移動順序。
  const flat = groups.flatMap((group) => group.options)
  const [active, setActive] = useState(() => {
    const index = flat.findIndex((option) => option.value === value)
    return index === -1 ? 0 : index
  })

  const optionId = (index: number) => `${base}-option-${index}`

  const moveTo = (index: number) => {
    setActive(index)
    onValueChange(flat[index].value)
    scrollActiveOptionIntoView(listRef.current, optionId(index))
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = flat.length - 1
    let next: number | null = null
    if (e.key === "ArrowDown") next = active === last ? last : active + 1
    else if (e.key === "ArrowUp") next = active === 0 ? 0 : active - 1
    else if (e.key === "Home") next = 0
    else if (e.key === "End") next = last
    if (next !== null) {
      e.preventDefault()
      moveTo(next)
    }
  }

  let cursor = -1

  return (
    <div
      ref={listRef}
      role="listbox"
      tabIndex={0}
      aria-labelledby={labelledBy}
      aria-activedescendant={optionId(active)}
      onKeyDown={onKeyDown}
      className={cn(
        "max-h-[22rem] w-full overflow-y-auto rounded-16 border border-bg-warm-gray bg-neutral-white py-8",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY",
        className,
      )}
    >
      {groups.map((group, g) => {
        const headingId = `${base}-group-${g}`
        return (
          // group 必須有名稱，否則螢幕閱讀器只唸得出「群組」兩個字。
          <div key={group.label} role="group" aria-labelledby={headingId}>
            <p
              id={headingId}
              // 群組標題是靜態文字，不是選項 —— 不給 role=option，方向鍵也不會停在這裡。
              className="typography-strong3 m-0 px-16 pt-12 pb-4 text-teal-300"
            >
              {group.label}
            </p>
            {group.options.map((option) => {
              cursor += 1
              const index = cursor
              const isSelected = option.value === value
              const isActive = index === active
              return (
                <div
                  key={option.value}
                  id={optionId(index)}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => moveTo(index)}
                  className={cn(
                    "typography-body1 cursor-pointer px-16 py-8 text-teal-700 transition-colors",
                    isSelected && "bg-teal-100/40 font-semibold text-teal-PRIMARY",
                    // 焦點在容器上，所以作用中的選項得自己畫出焦點樣式；
                    // 它與選取樣式必須看得出差別。
                    isActive && "ring-2 ring-inset ring-orange-PRIMARY",
                  )}
                >
                  {option.label}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
