import type { Metadata } from "next"
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
                { keys: "Space", action: "切換開關狀態。" },
                { keys: "Tab", action: "移入與移出。群組不會多佔一個停留點。" },
                {
                  keys: "Enter",
                  action:
                    "APG 列為選用。底層是原生 checkbox，而原生 checkbox 不回應 Enter —— 這裡維持平台行為，沒有另外綁。",
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
                    "加在原生 <input type=checkbox> 上。鍵盤、勾選狀態、label 關聯都由平台提供，只有「這是開關不是核取方塊」需要 ARIA 補。螢幕閱讀器會唸「開啟／關閉」而不是「已勾選」。",
                },
                {
                  attr: "checked",
                  value: "true / false",
                  purpose:
                    "開關的狀態。用原生 checked 而非 aria-checked —— 有原生屬性就用原生的，ARIA 只補平台給不了的。",
                },
                {
                  attr: "（標籤）",
                  value: "固定不變",
                  purpose:
                    "切換前後標籤必須一模一樣。標籤描述的是「這個設定是什麼」，不是「下一次按下去會發生什麼」。會變的標籤配上會變的狀態，等於兩套說法互相打架。",
                },
                {
                  attr: "（結構）",
                  value: "fieldset + legend",
                  purpose:
                    "多個開關構成一組時，群組要有名稱。fieldset 的隱含角色就是 group，legend 直接成為它的名稱 —— 光靠視覺上的靠近傳達不了「這幾個是一組」。",
                },
                {
                  attr: "aria-describedby",
                  value: "說明元素的 id",
                  purpose:
                    "補充說明可以掛在單一開關上，也可以掛在整個群組上。掛群組時用 fieldset 承接。",
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
                  note: "群組關係以 fieldset/legend 表達，補充說明以 aria-describedby 關聯。",
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
                  id: "3.2.4",
                  name: "一致的識別",
                  level: "AA",
                  note: "同一個開關在不同狀態下標籤保持一致，使用者不需要重新辨認它是什麼。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification",
                },
                {
                  id: "4.1.2",
                  name: "名稱、角色、值",
                  level: "A",
                  note: "角色為 switch，名稱來自可見標籤，開關狀態進得了無障礙樹。",
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
