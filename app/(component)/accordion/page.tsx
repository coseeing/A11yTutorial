import type { Metadata } from "next"
import { AriaTable } from "@/components/demo/AriaTable"
import { CodeBlock } from "@/components/demo/CodeBlock"
import { DemoPage } from "@/components/demo/DemoPage"
import { KeyboardTable } from "@/components/demo/KeyboardTable"
import { WcagList } from "@/components/demo/WcagList"
import { AccordionDemo } from "./AccordionDemo"

export const metadata: Metadata = {
  title: "Accordion — A11y Tutorial",
  description:
    "依 ARIA APG Accordion Pattern 實作的展開收合元件，含 accessibility tree、鍵盤操作與 WCAG 對應。",
}

const USAGE = `import { Accordion } from "@/components/Accordion/Accordion"

function Faq() {
  return (
    <Accordion
      // 標題層級要接進頁面的標題大綱，不是樣式選擇
      headingLevel={3}
      // 面板超過約六個時關掉，避免地標清單被灌爆
      useRegion
      items={[
        { question: "什麼是無障礙設計？", answer: "讓產品在不同能力…" },
        { question: "為什麼要包在 heading 裡？", answer: "螢幕閱讀器使用者…" },
      ]}
    />
  )
}`

export default function AccordionPage() {
  return (
    <DemoPage
      title="Accordion"
      description="一組可展開收合的標題與面板。結構是 heading 包住 button，狀態全部落在 button 的 ARIA 屬性上 —— 不是原生的 <details>/<summary>。"
      sections={[
        {
          id: "demo",
          title: "Demo 與 Accessibility Tree",
          content: <AccordionDemo />,
        },
        {
          id: "keyboard",
          title: "鍵盤操作",
          content: (
            <KeyboardTable
              rows={[
                {
                  keys: "Enter / Space",
                  action:
                    "展開已收合的面板；若該面板可收合，再按一次收合。一次只能展開一個時，展開新面板會收合原本展開的。",
                },
                {
                  keys: "Tab",
                  action: "移至下一個可聚焦元素。所有標題按鈕都在頁面的 Tab 順序中。",
                },
                { keys: "Shift + Tab", action: "移至上一個可聚焦元素。" },
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
                    "標題列必須是按鈕。用原生 <button> 即隱含此角色，不需另外書寫。",
                },
                {
                  attr: "aria-expanded",
                  value: "true / false",
                  purpose: "反映對應面板此刻是否可見，是這個元件最核心的狀態。",
                },
                {
                  attr: "aria-controls",
                  value: "面板元素的 id",
                  purpose: "把按鈕與它控制的面板關聯起來。",
                },
                {
                  attr: "aria-disabled",
                  value: "true",
                  purpose:
                    "已展開且不允許收合時標上。與原生 disabled 不同：元素仍可聚焦，行為要自己擋。",
                },
                {
                  attr: "role",
                  value: "region",
                  purpose:
                    "面板作為地標，讓使用者能直接跳過去。面板超過約六個時應停用，否則地標清單會被灌爆。",
                },
                {
                  attr: "aria-labelledby",
                  value: "標題按鈕的 id",
                  purpose: "面板用 role=region 時，以它的標題按鈕作為無障礙名稱。",
                },
                {
                  attr: "aria-hidden",
                  value: "true",
                  purpose: "箭頭圖示是純視覺，狀態已由 aria-expanded 表達，不應重複進入無障礙樹。",
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
                  id: "1.3.1",
                  name: "資訊與關聯性",
                  level: "A",
                  note: "標題按鈕包在 heading 內且層級符合頁面資訊架構；heading 內只能有那顆按鈕，其他持續顯示的元素要放到外面。面板以 aria-labelledby 與自己的標題關聯。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
                },
                {
                  id: "2.1.1",
                  name: "鍵盤",
                  level: "A",
                  note: "Enter 與空白鍵即可展開收合，不需要滑鼠。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard",
                },
                {
                  id: "2.4.3",
                  name: "焦點順序",
                  level: "A",
                  note: "所有標題按鈕都納入頁面的 Tab 順序，順序與視覺順序一致。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order",
                },
                {
                  id: "2.4.7",
                  name: "焦點可見",
                  level: "AA",
                  note: "每個標題按鈕都有橘色 focus ring。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible",
                },
                {
                  id: "4.1.2",
                  name: "名稱、角色、值",
                  level: "A",
                  note: "標題列具備 button 角色，aria-expanded 隨面板可見狀態更新，aria-controls 指向被控制的面板。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value",
                },
              ]}
            />
          ),
        },
        {
          id: "code",
          title: "程式碼",
          content: <CodeBlock code={USAGE} label="Accordion 使用範例程式碼" />,
        },
      ]}
    />
  )
}
