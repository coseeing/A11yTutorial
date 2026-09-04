"use client"

import { useRef } from "react"
import { cn } from "@/lib/cn"

// FilterPills — from Figma "Coseeing" → 芳名錄 依年份篩選. Single-select filter
// with full radiogroup semantics: roving tabindex plus Arrow/Home/End keyboard
// support (arrows move and select, per the APG radio-group pattern). The
// active option gets the beige-gray fill. Vertical by default (as in the
// sidebar), horizontal via `orientation`.

export type FilterOption = { label: string; value: string }

type FilterPillsProps = {
  options: FilterOption[]
  value: string
  onChange?: (value: string) => void
  orientation?: "vertical" | "horizontal"
  /** Accessible name for the group. */
  label?: string
  className?: string
}

export function FilterPills({
  options,
  value,
  onChange,
  orientation = "vertical",
  label,
  className,
}: FilterPillsProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const activeIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  )

  const select = (i: number) => {
    onChange?.(options[i].value)
    refs.current[i]?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = options.length - 1
    let next: number | null = null
    if (e.key === "ArrowRight" || e.key === "ArrowDown")
      next = activeIndex === last ? 0 : activeIndex + 1
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      next = activeIndex === 0 ? last : activeIndex - 1
    else if (e.key === "Home") next = 0
    else if (e.key === "End") next = last
    if (next !== null) {
      e.preventDefault()
      select(next)
    }
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={cn(
        "flex gap-12",
        orientation === "vertical" ? "flex-col items-start" : "flex-row flex-wrap items-center",
        className,
      )}
    >
      {options.map((opt, i) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={i === activeIndex ? 0 : -1}
            onClick={() => select(i)}
            className={cn(
              "cursor-pointer rounded-[0.4rem] border-0 px-8 py-4 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY",
              active
                ? "typography-emphasised2 bg-neutral-beige-gray text-teal-500"
                : "typography-body2 bg-transparent text-teal-500 hover:bg-bg-light-beige",
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
