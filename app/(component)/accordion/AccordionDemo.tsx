"use client"

import { Accordion } from "@/components/Accordion/Accordion"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"

// AccordionDemo — Accordion 的互動範例與其 Accessibility Tree。
//
// 觀察對象固定在第一個標題按鈕：Accordion 的每個標題都是同構的，盯著其中一個
// 就看得完整；三個一起觀察只會讓讀者不確定數字對應的是哪一個。

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
  return (
    <div className="flex flex-col gap-24">
      <DemoStage id="accordion-demo" className="flex-col items-stretch">
        <Accordion items={ITEMS} className="w-full" />
      </DemoStage>


      <A11yTree
        selector="#accordion-demo h3 button"
      />
    </div>
  )
}
