"use client"

import { Carousel } from "@/components/Carousel/Carousel"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"

// CarouselDemo — 同一組投影片，兩種選取器。
//
// APG 把輪播分成群組式與 Tab 型，而且規定得很細：投影片在群組式裡是 group
// 加上 aria-roledescription=slide，在 Tab 型裡是 tabpanel 且不得加角色描述。
// 兩個 demo 並排才看得出這個差別 —— 面板上的 Role 列會直接顯示出來。

const SLIDES = [
  {
    id: "slide-1",
    title: "秋季特展",
    body: "展期到 11 月底，持學生證可享半價。",
  },
  {
    id: "slide-2",
    title: "夜間導覽",
    body: "每週五晚間七點出發，需事先報名。",
  },
  {
    id: "slide-3",
    title: "親子工作坊",
    body: "適合六歲以上，每場限十組家庭。",
  },
]

export function CarouselDemo() {
  return (
    <div className="flex flex-col gap-32">
      <div className="flex flex-col gap-24">
        <DemoStage id="carousel-demo" className="flex-col items-stretch gap-12">
          <h3 id="carousel-demo-heading" className="typography-strong1 m-0 text-teal-700">
            近期活動
          </h3>
          <Carousel slides={SLIDES} labelledBy="carousel-demo-heading" selector="buttons" />
        </DemoStage>

        {/* 三個面板由外而內：輪播容器 → 目前顯示的投影片 → 對應它的選取按鈕。 */}
        <A11yTree
          selector="#carousel-demo [aria-roledescription='carousel']"
          hint="觀察對象：群組式輪播的容器。"
        />

        <A11yTree
          selector="#carousel-demo [aria-roledescription='slide']:not([hidden])"
          hint="觀察對象：目前顯示的投影片。"
        />

        <A11yTree
          selector="#carousel-demo [aria-disabled='true']"
          hint="觀察對象：對應目前這張的選取按鈕。"
        />
      </div>

      <div className="flex flex-col gap-24">
        <DemoStage id="carousel-tabs-demo" className="flex-col items-stretch gap-12">
          <h3
            id="carousel-tabs-demo-heading"
            className="typography-strong1 m-0 text-teal-700"
          >
            近期活動（Tab 型選取器）
          </h3>
          <Carousel
            slides={SLIDES}
            labelledBy="carousel-tabs-demo-heading"
            selector="tabs"
          />
        </DemoStage>

        {/* 兩個面板對應 Tab 型換掉的那兩個角色：tab 與 tabpanel。 */}
        <A11yTree
          selector="#carousel-tabs-demo [role='tab'][aria-selected='true']"
          hint="觀察對象：目前作用中的分頁。"
        />

        <A11yTree
          selector="#carousel-tabs-demo [role='tabpanel']:not([hidden])"
          hint="觀察對象：目前顯示的投影片。"
        />
      </div>
    </div>
  )
}
