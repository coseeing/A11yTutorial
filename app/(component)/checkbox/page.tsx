import type { Metadata } from "next"
import { AriaTable } from "@/components/demo/AriaTable"
import { CodeBlock } from "@/components/demo/CodeBlock"
import { DemoPage } from "@/components/demo/DemoPage"
import { KeyboardTable } from "@/components/demo/KeyboardTable"
import { WcagList } from "@/components/demo/WcagList"
import { CheckboxDemo } from "./CheckboxDemo"

export const metadata: Metadata = {
  title: "Checkbox — A11y Tutorial",
  description: "可獨立勾選的選項，含三態、群組與 WCAG 對應。",
}

const USAGE = `import { Checkbox } from "@/components/Checkbox/Checkbox"
import { ControlGroup } from "@/components/ControlGroup/ControlGroup"

function Channels() {
  const [selected, setSelected] = useState(["電子郵件"])
  const all = selected.length === CHANNELS.length
  const some = selected.length > 0 && !all

  return (
    <ControlGroup label="通知方式" description="至少選擇一種。">
      {/* 部分勾選是第三態，只存在於 DOM property，要另外補 aria-checked="mixed" */}
      <Checkbox
        label="全部選取"
        checked={all}
        indeterminate={some}
        onChange={(e) => setSelected(e.target.checked ? [...CHANNELS] : [])}
      />
      {CHANNELS.map((c) => (
        <Checkbox key={c} label={c} checked={selected.includes(c)} onChange={...} />
      ))}
    </ControlGroup>
  )
}`

export default function CheckboxPage() {
  return (
    <DemoPage
      title="Checkbox"
      sections={[
        { id: "demo", title: "Demo 與 Accessibility Tree", content: <CheckboxDemo /> },
        {
          id: "keyboard",
          title: "鍵盤操作",
          content: (
            <KeyboardTable
              rows={[
                { keys: "Space", action: "切換勾選狀態。" },
                { keys: "Tab", action: "依序移到群組中的每一個核取方塊。" },
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
                  value: "checkbox",
                  purpose:
                    "用原生 <input type=checkbox> 即隱含此角色，同時免費取得 Space 鍵、勾選狀態與 label 關聯。",
                },
                {
                  attr: "（名稱）",
                  value: "<label>",
                  purpose:
                    "名稱來自關聯的 label。用 label 包住或 htmlFor 指向，點文字也能切換 —— 那同時把點擊範圍從 16px 的小方塊擴大到整行，是動作控制受限者的實質差別。",
                },
                {
                  attr: "aria-checked",
                  value: "mixed",
                  purpose:
                    "第三態。部分勾選只存在於 DOM 的 indeterminate property，寫不進 HTML 屬性裡，所以要另外補這個值才進得了無障礙樹。",
                },
                {
                  attr: "（結構）",
                  value: "fieldset + legend",
                  purpose:
                    "多個核取方塊構成一組時，群組要有名稱。「通知方式」這個標題若只是旁邊的一行字，螢幕閱讀器使用者聽到的就只是三個孤立的選項。",
                },
                {
                  attr: "aria-describedby",
                  value: "說明元素的 id",
                  purpose: "補充說明可掛在單一核取方塊或整個群組上。",
                },
                {
                  attr: "aria-invalid",
                  value: "true",
                  purpose: "驗證失敗時標示。錯誤訊息本身用 aria-describedby 關聯。",
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
                  note: "label 與控制項關聯、群組以 fieldset/legend 表達、說明以 aria-describedby 關聯 —— 三種關係都不能只靠視覺位置。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
                },
                {
                  id: "2.1.1",
                  name: "鍵盤",
                  level: "A",
                  note: "空白鍵即可切換。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard",
                },
                {
                  id: "2.5.8",
                  name: "目標尺寸（最小）",
                  level: "AA",
                  note: "方塊本身只有 16px，但 label 與它同屬一個點擊區域，實際可點範圍是整行。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum",
                },
                {
                  id: "3.3.2",
                  name: "標籤或說明",
                  level: "A",
                  note: "每個選項都有可見標籤，群組有可見的群組名稱。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions",
                },
                {
                  id: "4.1.2",
                  name: "名稱、角色、值",
                  level: "A",
                  note: "角色為 checkbox，名稱來自 label，勾選與部分勾選狀態都進得了無障礙樹。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value",
                },
              ]}
            />
          ),
        },
        { id: "code", title: "程式碼", content: <CodeBlock code={USAGE} label="Checkbox 使用範例程式碼" /> },
      ]}
    />
  )
}
