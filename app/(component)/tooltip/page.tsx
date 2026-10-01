import type { Metadata } from "next"
import { AriaTable } from "@/components/demo/AriaTable"
import { DemoPage } from "@/components/demo/DemoPage"
import { KeyboardTable } from "@/components/demo/KeyboardTable"
import { WcagList } from "@/components/demo/WcagList"
import { TooltipDemo } from "./TooltipDemo"

export const metadata: Metadata = {
  title: "Tooltip — A11y Tutorial",
  description:
    "附加在元素上的補充說明，含 accessibility tree、鍵盤操作與 WCAG 對應。",
}

export default function TooltipPage() {
  return (
    <DemoPage
      title="Tooltip"
      sections={[
        { id: "demo", title: "Demo 與 Accessibility Tree", content: <TooltipDemo /> },
        {
          id: "keyboard",
          title: "鍵盤操作",
          content: (
            <KeyboardTable
              rows={[
                {
                  keys: "Tab",
                  action:
                    "移到觸發元素上即顯示提示；移開即關閉。觸發元素必須本身可聚焦，否則鍵盤使用者永遠看不到這段說明。",
                },
                {
                  keys: "Esc",
                  action:
                    "關閉提示，但焦點留在觸發元素上。提示蓋住了下方的內容時，使用者需要一個關掉它的方法。",
                },
                {
                  keys: "（無）",
                  action:
                    "提示本身不接收焦點，Tab 不會進到裡面。需要操作的內容放進提示，鍵盤使用者就到不了 —— 那種情況該用 Dialog。",
                },
              ]}
            />
          ),
        },
        {
          id: "aria",
          title: "ARIA 屬性",
          content: (
            <AriaTable
              rows={[
                {
                  attr: "role",
                  value: "tooltip",
                  purpose: "提示內容的容器。",
                },
                {
                  attr: "aria-describedby",
                  value: "提示元素的 id",
                  purpose:
                    "掛在觸發元素上，不是掛在提示上。提示在無障礙樹中不獨立存在 —— 它是附加在那個按鈕上的說明，所以面板觀察的是按鈕，Description 會變成提示的內容。",
                },
                {
                  attr: "（時機）",
                  value: "只在顯示時指向",
                  purpose:
                    "提示隱藏時不輸出 aria-describedby。指向一個不存在的 id，無障礙名稱計算會拿到空字串，比沒有更糟。",
                },
                {
                  attr: "（焦點）",
                  value: "不接收",
                  purpose:
                    "提示不給 tabindex。焦點始終留在觸發元素上 —— 這既是 APG 的要求，也決定了提示裡不能放連結或按鈕。",
                },
                {
                  attr: "（對照）",
                  value: "aria-label",
                  purpose:
                    "名稱與說明不同。aria-label 蓋掉元素的名稱，Tooltip 是在名稱之後補一句。按鈕叫什麼用名稱，按下去會怎樣用說明。",
                },
              ]}
            />
          ),
        },
        {
          id: "wcag",
          title: "WCAG 對應",
          content: (
            <WcagList
              criteria={[
                {
                  id: "1.4.13",
                  name: "暫留或聚焦時出現的內容",
                  level: "AA",
                  note: "這一條幾乎就是為 Tooltip 寫的，它要求三件事同時成立：可關閉（Esc 能關掉且不移動焦點）、可停留（指標能從觸發元素移到提示上而不讓它消失）、持續性（在焦點或指標離開前不會自己消失）。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus",
                },
                {
                  id: "2.1.1",
                  name: "鍵盤",
                  level: "A",
                  note: "聚焦即顯示，不是只有滑鼠懸停才看得到。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard",
                },
                {
                  id: "3.2.1",
                  name: "取得焦點",
                  level: "A",
                  note: "提示出現時不移動焦點，使用者的操作不會被打斷。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/on-focus",
                },
                {
                  id: "4.1.2",
                  name: "名稱、角色、值",
                  level: "A",
                  note: "提示以 role=tooltip 標記，並透過 aria-describedby 成為觸發元素的無障礙補充說明。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value",
                },
              ]}
            />
          ),
        },
      ]}
    />
  )
}
