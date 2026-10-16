import type { Metadata } from "next"
import { ApgRuleList } from "@/components/demo/ApgRuleList"
import { AriaTable } from "@/components/demo/AriaTable"
import { DemoPage } from "@/components/demo/DemoPage"
import { KeyboardTable } from "@/components/demo/KeyboardTable"
import { WcagList } from "@/components/demo/WcagList"
import { SwitchDemo } from "./SwitchDemo"

export const metadata: Metadata = {
  title: "Switch — A11y Tutorial",
  description: "立即生效的開關，含 accessibility tree、鍵盤操作與 WCAG 對應。",
}

export default function SwitchPage() {
  return (
    <DemoPage
      title="Switch"
      sections={[
        { id: "demo", title: "Demo 與 Accessibility Tree", content: <SwitchDemo /> },
        {
          id: "keyboard",
          title: "鍵盤操作",
          content: (
            <KeyboardTable
              rows={[
                {
                  keys: "Space",
                  action:
                    "切換開與關。底層是原生 <input type=checkbox>，這個行為由平台提供，不需要自行綁定。",
                },
                {
                  keys: "Tab",
                  action:
                    "逐一移入每個開關。開關之間不是互斥選項，所以不像 Radio Group 那樣整組只佔一個停留點。",
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
                  value: "switch",
                  purpose:
                    "底層是 <input type=checkbox>，補上這個角色才會被唸成「開關，開啟」而不是「核取方塊，已勾選」。差別在於語意：開關改的是當下的狀態，核取方塊是待送出的選擇。",
                },
                {
                  attr: "checked",
                  value: "true / false",
                  purpose:
                    "開關狀態。原生 checkbox 的勾選狀態存在 DOM property 上，瀏覽器直接把它映射進無障礙樹，不需要另外寫 aria-checked。若改用 <div role=switch> 實作，就得自己維護 aria-checked。",
                },
                {
                  attr: "aria-pressed",
                  value: "（不使用）",
                  purpose:
                    "這是 Toggle Button 的屬性，不屬於 Switch。兩者都有開關的意思，但一個元素只能有一種角色 —— 同時標上會讓輔助科技唸出互相矛盾的狀態。",
                },
                {
                  attr: "role（群組）",
                  value: "group",
                  purpose:
                    "多個開關構成一組時需要容器與名稱。這裡用 <fieldset> + <legend>，隱含角色就是 group，legend 直接成為它的無障礙名稱，不必自己接 aria-labelledby。",
                },
                {
                  attr: "aria-describedby",
                  value: "補充說明的 id",
                  purpose:
                    "「變更後立即生效」是整組共通的規則，所以掛在群組上而不是每個開關上。掛在個別開關會讓同一句話被唸三次。",
                },
                {
                  attr: "aria-hidden",
                  value: "true",
                  purpose:
                    "軌道與滑塊是純視覺，狀態已由 checked 表達。原生 input 本身以 appearance-none 隱藏外觀，但仍留在無障礙樹與 Tab 順序裡。",
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
                  name: "資訊及關聯性",
                  level: "A",
                  note: "三個開關包在 <fieldset> 內，「它們是一組」這件事程式判斷得出來，不只靠視覺上的靠近。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
                },
                {
                  id: "2.1.1",
                  name: "鍵盤",
                  level: "A",
                  note: "空白鍵即可切換，不需要滑鼠。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard",
                },
                {
                  id: "2.4.7",
                  name: "焦點可見",
                  level: "AA",
                  note: "聚焦時軌道外圍出現橘色 focus ring。原生外觀被隱藏後，焦點樣式必須自己補回來。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible",
                },
                {
                  id: "3.2.2",
                  name: "輸入時",
                  level: "A",
                  note: "切換開關會立即改變設定，這正是 Switch 的語意；使用者從角色與標籤就能預期這件事。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/on-input",
                },
                {
                  id: "4.1.2",
                  name: "名稱、角色、值",
                  level: "A",
                  note: "每個開關具備 switch 角色、來自 label 的名稱，以及反映開關狀態的值；群組本身也有名稱。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value",
                },
              ]}
            />
          ),
        },
        {
          id: "apg",
          title: "APG 規則",
          content: <ApgRuleList slug="switch" />,
        },
      ]}
    />
  )
}
