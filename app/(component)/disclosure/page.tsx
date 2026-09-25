import type { Metadata } from "next"
import { AriaTable } from "@/components/demo/AriaTable"
import { CodeBlock } from "@/components/demo/CodeBlock"
import { DemoPage } from "@/components/demo/DemoPage"
import { KeyboardTable } from "@/components/demo/KeyboardTable"
import { WcagList } from "@/components/demo/WcagList"
import { DisclosureDemo } from "./DisclosureDemo"

export const metadata: Metadata = {
  title: "Disclosure — A11y Tutorial",
  description:
    "一顆按鈕控制一段內容的顯示與隱藏，含 accessibility tree、鍵盤操作與 WCAG 對應。",
}

const USAGE = `import { Disclosure } from "@/components/Disclosure/Disclosure"

function ShippingFaq() {
  return (
    <Disclosure label="運費怎麼計算？">
      單筆滿一千元免運，未滿則收取八十元。
    </Disclosure>
  )
}`

export default function DisclosurePage() {
  return (
    <DemoPage
      title="Disclosure"
      description="一顆按鈕控制一段內容的顯示與隱藏。它是 Accordion 的最小形式 —— 沒有群組、沒有互斥、不要求 heading，整個 pattern 只落在按鈕的兩個屬性上。"
      sections={[
        { id: "demo", title: "Demo 與 Accessibility Tree", content: <DisclosureDemo /> },
        {
          id: "keyboard",
          title: "鍵盤操作",
          content: (
            <KeyboardTable
              rows={[
                {
                  keys: "Enter / Space",
                  action: "切換內容的顯示與隱藏。用原生 <button> 即免費取得，不需自行綁定。",
                },
                { keys: "Tab", action: "移入與移出控制按鈕。" },
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
                  value: "button",
                  purpose:
                    "控制元件必須是按鈕。用原生 <button> 即隱含此角色；用 <div> 加 onClick 則要自己補 role、tabindex 與鍵盤處理，沒有理由這麼做。",
                },
                {
                  attr: "aria-expanded",
                  value: "true / false",
                  purpose:
                    "內容可見時為 true，隱藏時為 false。少了它，螢幕閱讀器使用者按下按鈕後不知道發生了什麼事。",
                },
                {
                  attr: "aria-controls",
                  value: "內容元素的 id",
                  purpose:
                    "指向這顆按鈕所顯示或隱藏的全部內容。內容用 hidden 而非條件渲染，這個 id 才永遠指得到東西。",
                },
                {
                  attr: "aria-hidden",
                  value: "true",
                  purpose: "箭頭圖示是純視覺，狀態已由 aria-expanded 表達。",
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
                  id: "2.1.1",
                  name: "鍵盤",
                  level: "A",
                  note: "Enter 與空白鍵即可切換，不需要滑鼠。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard",
                },
                {
                  id: "2.4.7",
                  name: "焦點可見",
                  level: "AA",
                  note: "控制按鈕有橘色 focus ring。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible",
                },
                {
                  id: "4.1.2",
                  name: "名稱、角色、值",
                  level: "A",
                  note: "控制元件具備 button 角色，aria-expanded 隨內容可見狀態更新，aria-controls 指向被控制的內容。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value",
                },
              ]}
            />
          ),
        },
        { id: "code", title: "程式碼", content: <CodeBlock code={USAGE} label="Disclosure 使用範例程式碼" /> },
      ]}
    />
  )
}
