import type { Metadata } from "next"
import { AriaTable } from "@/components/demo/AriaTable"
import { CodeBlock } from "@/components/demo/CodeBlock"
import { DemoPage } from "@/components/demo/DemoPage"
import { KeyboardTable } from "@/components/demo/KeyboardTable"
import { WcagList } from "@/components/demo/WcagList"
import { RadioDemo } from "./RadioDemo"

export const metadata: Metadata = {
  title: "Radio Group — A11y Tutorial",
  description: "一組互斥選項，含 accessibility tree、鍵盤操作與 WCAG 對應。",
}

const USAGE = `import { RadioGroup } from "@/components/RadioGroup/RadioGroup"

function Shipping() {
  const [value, setValue] = useState<string | null>("standard")

  return (
    <RadioGroup
      label="配送方式"
      description="離島地區僅提供標準宅配。"
      value={value}
      onValueChange={setValue}
      options={[
        { value: "standard", label: "標準宅配" },
        { value: "express", label: "隔日到貨", description: "加收 120 元。" },
      ]}
    />
  )
}`

export default function RadioPage() {
  return (
    <DemoPage
      title="Radio Group"
      description="一組互斥選項。整組只佔一個 Tab 停留點，內部改用方向鍵移動 —— 用原生 input[type=radio] 綁同一個 name，這套行為全部由瀏覽器提供。"
      sections={[
        { id: "demo", title: "Demo 與 Accessibility Tree", content: <RadioDemo /> },
        {
          id: "keyboard",
          title: "鍵盤操作",
          content: (
            <KeyboardTable
              rows={[
                {
                  keys: "Tab",
                  action:
                    "整組移入或移出，只佔一個停留點。進入時焦點落在已選取的項目；沒有任何選取時落在第一個。",
                },
                {
                  keys: "↑ / ←",
                  action: "移到前一個選項並同時選取它，走到開頭會循環到最後一個。",
                },
                {
                  keys: "↓ / →",
                  action: "移到下一個選項並同時選取它，走到結尾會循環到第一個。",
                },
                {
                  keys: "Space",
                  action: "選取焦點所在的項目，同時取消原本的選取。",
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
                  value: "radiogroup",
                  purpose:
                    "所有選項必須被它包住。fieldset 的隱含角色是 group 而不是 radiogroup，所以這裡明寫覆寫掉。",
                },
                {
                  attr: "aria-labelledby",
                  value: "legend 的 id",
                  purpose:
                    "群組名稱。role 一旦被覆寫成 radiogroup，legend 的隱含命名對應就失效了，必須改用這個明確指向。",
                },
                {
                  attr: "role",
                  value: "radio",
                  purpose:
                    "每個選項。用原生 input[type=radio] 即隱含此角色，同時免費取得方向鍵導覽與整組一個停留點。",
                },
                {
                  attr: "aria-checked",
                  value: "true / false",
                  purpose:
                    "選取狀態。用原生 checked，瀏覽器會映射到無障礙樹 —— 有原生屬性就用原生的。",
                },
                {
                  attr: "aria-describedby",
                  value: "說明元素的 id",
                  purpose:
                    "補充說明可以掛在整組上（「離島地區僅提供標準宅配」），也可以掛在單一選項上（「加收 120 元」）。兩種層級的說法不一樣，不要混為一談。",
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
                  note: "選項與群組的從屬關係、每個選項與它的標籤、說明與被說明者 —— 三種關係都以標記表達，不是靠排版。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
                },
                {
                  id: "2.1.1",
                  name: "鍵盤",
                  level: "A",
                  note: "方向鍵與 Space 即可完成選取。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard",
                },
                {
                  id: "2.4.3",
                  name: "焦點順序",
                  level: "A",
                  note: "整組只佔一個停留點。十個選項若各佔一個停留點，鍵盤使用者要按十次才能離開這一區。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order",
                },
                {
                  id: "3.3.2",
                  name: "標籤或說明",
                  level: "A",
                  note: "群組與每個選項都有可見標籤。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions",
                },
                {
                  id: "4.1.2",
                  name: "名稱、角色、值",
                  level: "A",
                  note: "群組角色為 radiogroup 且具名，每個選項角色為 radio 且具名，選取狀態進得了無障礙樹。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value",
                },
              ]}
            />
          ),
        },
        { id: "code", title: "程式碼", content: <CodeBlock code={USAGE} label="Radio Group 使用範例程式碼" /> },
      ]}
    />
  )
}
