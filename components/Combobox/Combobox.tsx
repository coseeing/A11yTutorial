"use client"

import { useEffect, useId, useRef, useState } from "react"
import { cn } from "@/lib/cn"
import { scrollActiveOptionIntoView } from "@/lib/a11y/scroll-active-option"
import { ChevronDownIcon } from "../Icons/Icons"

// Combobox — 依 W3C ARIA APG 的 Combobox Pattern 實作（可編輯 + listbox 型彈出內容）。
//
// Combobox 是複合控制項：一個輸入元件加上一塊彈出內容。整個 pattern 最關鍵的
// 一條是「焦點永遠留在輸入框裡」—— 使用者按方向鍵時，焦點不會跑到選項上，而是
// 由 aria-activedescendant 指出「清單裡目前作用中的是哪一個」。這樣使用者才能
// 一邊看建議一邊繼續打字。
//
// 自動完成行為是 list 加上自動選取：彈出內容出現後第一個建議值自動成為選取狀態，
// 離開欄位時它就成為這個 combobox 的值。aria-autocomplete 必須如實反映這件事 ——
// 標成 both 卻沒有在游標後方顯示完成字串，輔助科技會告訴使用者一個不存在的行為。

type ComboboxProps = {
  /** 可見標籤。用原生 <label> 關聯，這是 input 類元件的首選做法。 */
  label: string
  options: string[]
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function Combobox({
  label,
  options,
  value,
  onValueChange,
  placeholder,
  className,
}: ComboboxProps) {
  const base = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const [query, setQuery] = useState(value)
  const [open, setOpen] = useState(false)
  // 彈出內容一出現，第一個建議值就是選取狀態 —— 這就是「自動選取」。
  const [active, setActive] = useState(0)
  // 使用者自己挑過或改過字之後，就不再把自動選取的那一個帶進值裡。
  const [touched, setTouched] = useState(false)

  const inputId = `${base}-input`
  const listboxId = `${base}-listbox`
  const optionId = (i: number) => `${base}-option-${i}`

  const matches = options.filter((option) => option.includes(query.trim()))
  const activeOption = matches[active]

  // 作用中的選項換人時把它捲進可視範圍。
  //
  // 寫成 effect 而不是在每個按鍵處理裡呼叫：active 會從好幾條路徑改變（打字重設
  // 成 0、上下鍵移動、Alt + ↓ 展開），分散呼叫遲早會漏掉其中一條 —— 這個 bug
  // 本來就是這樣來的，Listbox 當初處理了，Combobox 漏了。
  useEffect(() => {
    if (!open) return
    scrollActiveOptionIntoView(listRef.current, optionId(active))
    // query 也要是依賴：打字會換掉清單內容，active 停在 0 但那個 0 已經是
    // 另一個選項了。
  }, [open, active, query, optionId])

  const commit = (next: string) => {
    setQuery(next)
    onValueChange(next)
    setOpen(false)
    setTouched(true)
  }

  const onChange = (next: string) => {
    setQuery(next)
    setOpen(true)
    setActive(0)
    setTouched(false)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = matches.length - 1

    if (e.key === "ArrowDown") {
      e.preventDefault()
      if (!open) {
        setOpen(true)
        // Alt + ↓ 只展開，不移動 —— 使用者要的是「讓我看看有什麼」。
        if (!e.altKey) setActive(0)
        return
      }
      setActive(active >= last ? 0 : active + 1)
      setTouched(true)
      return
    }

    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (!open) {
        setOpen(true)
        setActive(last < 0 ? 0 : last)
        return
      }
      setActive(active <= 0 ? (last < 0 ? 0 : last) : active - 1)
      setTouched(true)
      return
    }

    if (e.key === "Enter" && open && activeOption) {
      e.preventDefault()
      commit(activeOption)
      return
    }

    if (e.key === "Escape") {
      e.preventDefault()
      // 第一次 Esc 只收起清單，第二次才清掉輸入 —— 一次全清會讓誤按的人
      // 失去整段打好的字。
      if (open) setOpen(false)
      else {
        setQuery("")
        onValueChange("")
      }
      return
    }

    if (e.key === "Tab" && open && !touched && activeOption) {
      // 自動選取的建議值在離開欄位時成為值。這裡不 preventDefault ——
      // 焦點仍然該照 Tab 順序往下走。
      commit(activeOption)
    }
  }

  const onBlur = () => {
    setOpen(false)
    if (!touched && activeOption) commit(activeOption)
  }

  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      <label htmlFor={inputId} className="typography-strong2 text-teal-700">
        {label}
      </label>

      <div className="relative">
        <input
          ref={inputRef}
          id={inputId}
          // role=combobox 要放在接收輸入並顯示目前值的那個元素上，也就是 input
          // 本身，不是外層的 wrapper。
          role="combobox"
          type="text"
          autoComplete="off"
          value={query}
          placeholder={placeholder}
          aria-expanded={open}
          aria-controls={listboxId}
          // 彈出內容是 listbox 時可以省略 aria-haspopup —— role=combobox 的隱含值
          // 就是 listbox。彈出內容若是 grid、tree 或 dialog 才必須明寫。
          aria-autocomplete="list"
          aria-activedescendant={open && activeOption ? optionId(active) : undefined}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          className="typography-body1 w-full rounded-8 border border-bg-warm-gray bg-neutral-white px-16 py-12 pr-48 text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
        />

        {/*
          展開鈕不進 Tab 順序（tabindex=-1）：鍵盤使用者已經有 Alt + ↓ 可以展開，
          多一個停留點只是多一次按鍵。它存在是為了讓滑鼠使用者看得出這裡有清單。
        */}
        <button
          type="button"
          tabIndex={-1}
          aria-label="顯示建議清單"
          aria-controls={listboxId}
          aria-expanded={open}
          onClick={() => {
            setOpen((prev) => !prev)
            inputRef.current?.focus()
          }}
          className="absolute top-1/2 right-8 flex -translate-y-1/2 cursor-pointer items-center border-0 bg-transparent p-8 text-teal-300"
        >
          <ChevronDownIcon
            aria-hidden="true"
            className={cn("w-[2.2rem] transition-transform", open && "rotate-180")}
          />
        </button>

        {open ? (
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            // 彈出清單自己也要有名稱：它不屬於 combobox 的名稱，螢幕閱讀器把它
            // 當成另一個容器來報讀。
            aria-label={`${label}建議`}
            // 按在選項上不要把焦點從輸入框搶走 —— 焦點一離開，onBlur 會先收起清單，
            // 點擊就落在空氣上。
            onMouseDown={(e) => e.preventDefault()}
            className="absolute top-[calc(100%+0.4rem)] left-0 z-10 m-0 max-h-[18rem] w-full list-none overflow-y-auto rounded-8 border border-bg-warm-gray bg-neutral-white p-0 py-4 shadow-[0_0.4rem_1.2rem_rgb(16_36_42_/_0.16)]"
          >
            {matches.length === 0 ? (
              // 沒有符合的建議時清單仍然存在，但不放任何 option ——
              // 空的 option 會被唸成一個可選卻沒有內容的項目。
              <li className="typography-body2 px-16 py-8 text-teal-300">沒有符合的選項</li>
            ) : (
              matches.map((option, i) => (
                <li
                  key={option}
                  id={optionId(i)}
                  role="option"
                  aria-selected={i === active}
                  onClick={() => commit(option)}
                  className={cn(
                    "typography-body1 cursor-pointer px-16 py-8 text-teal-700",
                    i === active && "bg-teal-100/40 text-teal-PRIMARY",
                  )}
                >
                  {option}
                </li>
              ))
            )}
          </ul>
        ) : null}
      </div>
    </div>
  )
}
