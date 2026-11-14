"use client"

import { Accordion } from "@/components/Accordion/Accordion"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"
import { useState } from "react"

// AccordionDemo — Accordion 的互動範例與其 Accessibility Tree。
//
// 第一題預設展開，面板才會從第一眼就在無障礙樹裡 —— 收合中的面板帶著 hidden，
// 整個不在樹上，面板那一列會是空狀態。按一下標題就能看到它消失與回來。

const ITEMS = [
  {
    question: "什麼是無障礙設計？",
    answer:
      "讓產品在不同能力、不同情境的使用者身上都能運作 —— 包含使用螢幕閱讀器、只用鍵盤、視力受限，或只是身處在陽光下看不清螢幕的人。",
  },
  {
    question: "為什麼標題按鈕要包在 heading 裡？",
    answer:
      "螢幕閱讀器使用者常以標題列表瀏覽頁面。標題按鈕包在 heading 內，Accordion 的每一題才會出現在那份列表裡，成為可以直接跳過去的落點。",
  },
  {
    question: "面板一定要用 role=region 嗎？",
    answer:
      "不一定。region 是地標，數量一多會把地標清單灌爆。APG 建議面板超過約六個時就不要用。",
  },
]

export function AccordionDemo() {
  const [observed, setObserved] = useState<{ buttonId: string; panelId: string } | null>(null)
  const observe = (event: React.SyntheticEvent<HTMLDivElement>) => {
    const button = event.target instanceof Element ? event.target.closest<HTMLButtonElement>("h3 button") : null
    const panelId = button?.getAttribute("aria-controls")
    if (button && panelId) setObserved({ buttonId: button.id, panelId })
  }
  return (
    <div className="flex flex-col gap-24">
      <DemoStage id="accordion-demo" className="flex-col items-stretch">
        <div className="w-full" onFocusCapture={observe} onClickCapture={observe}>
          <Accordion items={ITEMS} defaultExpanded={[0]} className="w-full" />
        </div>
      </DemoStage>

      {/* 兩個面板對應 Accordion 的一組標題與它控制的內容：標題按鈕 → region。 */}
      <A11yTree selector={observed ? `#accordion-demo [id="${observed.buttonId}"]` : "#accordion-demo h3 button"} hint="觀察對象：目前操作的標題按鈕。" />

      <A11yTree
        selector={observed ? `#accordion-demo [id="${observed.panelId}"]` : "#accordion-demo [role='region']"}
        hint="觀察對象：目前按鈕所控制的面板；收合時不在無障礙樹中。"
      />
    </div>
  )
}
