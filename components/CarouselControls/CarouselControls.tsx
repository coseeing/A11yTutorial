"use client"

import { cn } from "@/lib/cn"
import { ArrowLeftIcon, ArrowRightIcon, PlayIcon, StopIcon } from "../Icons/Icons"

// CarouselControls — from Figma "Coseeing" → Elements → Carousell dark/light ×
// Stop/Play. Prev/next arrows, pagination dots, and a play/stop toggle.
// `theme="dark"` (teal controls) sits on light backgrounds; `theme="light"`
// (orange controls) sits on dark/green backgrounds. Dots use token colors from
// the exports: teal-100/teal-PRIMARY (dark), orange-100/orange-PRIMARY (light).
// Hover/focus treatments follow the system defaults (color shift + orange ring)
// since the Figma hover variants only recolor the glyphs.

type CarouselControlsProps = {
  theme?: "dark" | "light"
  /** True while the carousel auto-advances; shows the stop glyph. */
  playing?: boolean
  count?: number
  activeIndex?: number
  /** id of the carousel element these controls operate — wired to aria-controls. */
  controlsId?: string
  onPrev?: () => void
  onNext?: () => void
  onPlayToggle?: () => void
  onDotSelect?: (index: number) => void
  className?: string
}

const THEME = {
  dark: {
    control: "text-teal-PRIMARY hover:text-teal-100",
    dot: "bg-teal-100",
    dotActive: "bg-teal-PRIMARY",
  },
  light: {
    control: "text-orange-100 hover:text-orange-200",
    dot: "bg-orange-100",
    dotActive: "bg-orange-PRIMARY",
  },
} as const

const controlBase =
  "flex cursor-pointer items-center justify-center border-0 bg-transparent p-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY focus-visible:ring-offset-2"

export function CarouselControls({
  theme = "dark",
  playing = true,
  count = 5,
  activeIndex = 0,
  controlsId,
  onPrev,
  onNext,
  onPlayToggle,
  onDotSelect,
  className,
}: CarouselControlsProps) {
  const t = THEME[theme]
  return (
    <div className={cn("flex items-center gap-[1.5rem]", className)}>
      <div className="flex items-center gap-16">
        <button
          type="button"
          aria-label="上一張"
          aria-controls={controlsId}
          onClick={onPrev}
          className={cn(controlBase, t.control)}
        >
          <ArrowLeftIcon className="h-[1.7rem] w-[4.4rem]" />
        </button>
        {/* Plain buttons in a named group (not tabs — there are no tabpanels
            here); the active dot is exposed via aria-current. */}
        <div className="flex items-center gap-8" role="group" aria-label="選擇輪播頁">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`第 ${i + 1} 張`}
              aria-current={i === activeIndex || undefined}
              aria-controls={controlsId}
              onClick={onDotSelect ? () => onDotSelect(i) : undefined}
              className={cn(
                controlBase,
                "size-12 rounded-full",
                i === activeIndex ? t.dotActive : t.dot,
              )}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="下一張"
          aria-controls={controlsId}
          onClick={onNext}
          className={cn(controlBase, t.control)}
        >
          <ArrowRightIcon className="h-[1.7rem] w-[4.4rem]" />
        </button>
      </div>
      <button
        type="button"
        aria-label={playing ? "停止輪播" : "播放輪播"}
        aria-controls={controlsId}
        onClick={onPlayToggle}
        className={cn(controlBase, t.control)}
      >
        {playing ? <StopIcon className="size-[4rem]" /> : <PlayIcon className="size-[4rem]" />}
      </button>
    </div>
  )
}
