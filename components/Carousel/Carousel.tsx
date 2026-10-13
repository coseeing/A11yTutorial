"use client"

import { useEffect, useId, useRef, useState } from "react"
import { cn } from "@/lib/cn"
import { CarouselControls } from "../CarouselControls/CarouselControls"

// Carousel — 依 W3C ARIA APG 的 Carousel Pattern 實作。
//
// APG 把輪播分成兩種選取器，差別不只是外觀：
//
//   群組式（selector="buttons"）—— 投影片是 role=group，另加
//     aria-roledescription=slide；一排按鈕放在有名字的 group 裡，目前這張的
//     按鈕標 aria-disabled。
//
//   Tab 型（selector="tabs"）—— 投影片改成 role=tabpanel，且不得加
//     aria-roledescription；按鈕變成 tablist 裡的 tab。
//
// 兩種不能混用：同一張投影片不能既是 group 又是 tabpanel。
//
// 自動輪播預設關閉。WCAG 2.2.2 要求超過五秒的動態內容可以暫停，而「預設就不動」
// 是比「動了之後可以停」更省事的做法 —— 也讓這一頁不會在讀者閱讀時自己跳動。

export type Slide = {
  id: string
  /** 投影片的標題，同時用來組出它的無障礙名稱。 */
  title: string
  body: string
}

type CarouselProps = {
  slides: Slide[]
  /** 指向可見標題的 id，成為輪播容器的無障礙名稱。 */
  labelledBy: string
  selector?: "buttons" | "tabs"
  className?: string
}

const ROTATE_MS = 4000

export function Carousel({
  slides,
  labelledBy,
  selector = "buttons",
  className,
}: CarouselProps) {
  const base = useId()
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const last = slides.length - 1

  useEffect(() => {
    if (!playing) return
    const timer = setInterval(() => setActive((i) => (i === last ? 0 : i + 1)), ROTATE_MS)
    return () => clearInterval(timer)
  }, [playing, last])

  const go = (next: number) => setActive(Math.max(0, Math.min(last, next)))
  const prev = () => setActive(active === 0 ? last : active - 1)
  const next = () => setActive(active === last ? 0 : active + 1)

  const slideId = (i: number) => `${base}-slide-${i}`
  const tabId = (i: number) => `${base}-tab-${i}`

  // 名稱裡不重複「投影片」三個字 —— 角色描述已經說過一次了，重複會唸成
  // 「投影片，第 1 張投影片」。
  const slideName = (i: number) =>
    `第 ${i + 1} 張，共 ${slides.length} 張：${slides[i].title}`

  const onTabKeyDown = (e: React.KeyboardEvent) => {
    let target: number | null = null
    if (e.key === "ArrowRight") target = active === last ? 0 : active + 1
    else if (e.key === "ArrowLeft") target = active === 0 ? last : active - 1
    else if (e.key === "Home") target = 0
    else if (e.key === "End") target = last
    if (target === null) return
    e.preventDefault()
    setActive(target)
    tabRefs.current[target]?.focus()
  }

  return (
    <div
      role="group"
      // 這個輪播不適合成為地標（頁面上還有別的內容更該被跳到），所以用 group
      // 而不是 region。輪播是頁面主角時才換成 region。
      aria-roledescription="carousel"
      aria-labelledby={labelledBy}
      className={cn("flex w-full flex-col gap-16", className)}
    >
      {selector === "tabs" ? (
        <div
          role="tablist"
          // tablist 的名稱要說明這組 tab 的用途，而不是只說「分頁」。
          aria-label="選擇要顯示的投影片"
          onKeyDown={onTabKeyDown}
          className="flex flex-wrap gap-8"
        >
          {slides.map((slide, i) => {
            const selected = i === active
            return (
              <button
                key={slide.id}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                type="button"
                role="tab"
                id={tabId(i)}
                aria-selected={selected}
                aria-controls={slideId(i)}
                tabIndex={selected ? 0 : -1}
                onClick={() => go(i)}
                className={cn(
                  "-mb-px cursor-pointer appearance-none border-x-0 border-b-[0.3rem] border-t-0 border-solid bg-transparent px-16 py-8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY",
                  selected
                    ? "typography-strong2 border-orange-PRIMARY text-teal-PRIMARY"
                    : "typography-emphasised2 border-transparent text-neutral-dark-gray hover:text-teal-PRIMARY",
                )}
              >
                {/* tab 的名稱要指出它顯示哪一張 —— 光是編號看不出內容。 */}
                {`第 ${i + 1} 張：${slide.title}`}
              </button>
            )
          })}
        </div>
      ) : null}

      {/*
        投影片的外層容器：自動輪播中時 aria-live=off，停下來時才是 polite。
        理由是使用者按下「上一張／下一張」的結果需要被報讀，但自動跳動不需要 ——
        每四秒插話一次會讓螢幕閱讀器無法用。aria-atomic=false 讓它只報讀換掉的
        那一部分，而不是整個容器重讀一次。
      */}
      <div
        aria-live={playing ? "off" : "polite"}
        aria-atomic="false"
        className="rounded-16 border border-bg-warm-gray bg-neutral-white p-24"
      >
        {slides.map((slide, i) =>
          selector === "tabs" ? (
            <div
              key={slide.id}
              role="tabpanel"
              id={slideId(i)}
              aria-labelledby={tabId(i)}
              // Tab 型的投影片不得加 aria-roledescription：名稱已由 tab 提供，
              // 再加一次會唸成「投影片，第 1 張：秋季特展，分頁」。
              hidden={i !== active}
            >
              <SlideBody slide={slide} />
            </div>
          ) : (
            <div
              key={slide.id}
              role="group"
              id={slideId(i)}
              aria-roledescription="slide"
              aria-label={slideName(i)}
              hidden={i !== active}
            >
              <SlideBody slide={slide} />
            </div>
          ),
        )}
      </div>

      <CarouselControls
        count={slides.length}
        activeIndex={active}
        playing={playing}
        controlsId={slideId(active)}
        onPrev={prev}
        onNext={next}
        onPlayToggle={() => setPlaying((p) => !p)}
        onDotSelect={go}
        // Tab 型已經有 tablist 當選取器，不再放一排圓點 —— 同一件事兩個入口，
        // 使用者分不出差別，螢幕閱讀器也會把選取控制唸兩遍。
        showDots={selector === "buttons"}
        dotLabels={slides.map((slide, i) => `第 ${i + 1} 張：${slide.title}`)}
        markActiveDotDisabled
      />
    </div>
  )
}

function SlideBody({ slide }: { slide: Slide }) {
  return (
    <>
      <p className="typography-strong1 m-0 text-teal-700">{slide.title}</p>
      <p className="typography-body2 m-0 mt-8 text-teal-700">{slide.body}</p>
    </>
  )
}
