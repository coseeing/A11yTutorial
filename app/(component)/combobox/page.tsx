import type { Metadata } from "next"
import { ApgRuleList } from "@/components/demo/ApgRuleList"
import { AriaTable } from "@/components/demo/AriaTable"
import { DemoPage } from "@/components/demo/DemoPage"
import { KeyboardTable } from "@/components/demo/KeyboardTable"
import { WcagList } from "@/components/demo/WcagList"
import { ComboboxDemo } from "./ComboboxDemo"

export const metadata: Metadata = {
  title: "Combobox — A11y Tutorial",
  description:
    "文字輸入搭配彈出清單的複合控制項，含 accessibility tree、鍵盤操作與 WCAG 對應。",
}

export default function ComboboxPage() {
  return (
    <DemoPage
      title="Combobox"
      sections={[
        { id: "demo", title: "Demo 與 Accessibility Tree", content: <ComboboxDemo /> },
        {
          id: "keyboard",
          title: "鍵盤操作",
          content: (
            <KeyboardTable
              rows={[
                {
                  keys: "Tab",
                  action:
                    "移入與移出輸入框。整個 Combobox 只佔一個停留點 —— 建議值不可聚焦，展開鈕的 tabindex 是 -1。離開時若有自動選取的建議值，它會成為這個欄位的值。",
                },
                {
                  keys: "任意字元",
                  action:
                    "輸入即篩選，並展開建議清單。第一個建議值自動成為選取狀態，這就是 aria-autocomplete=list 加上自動選取的行為。",
                },
                {
                  keys: "↓ / ↑",
                  action:
                    "清單已展開時在建議值之間移動；收起時展開清單。焦點一直留在輸入框裡，由 aria-activedescendant 指出目前是哪一個 —— 使用者才能一邊看建議一邊繼續打字。",
                },
                {
                  keys: "Alt + ↓",
                  action: "只展開清單，不移動選取。使用者要的是「先讓我看看有什麼」。",
                },
                { keys: "Enter", action: "選取目前作用中的建議值，並收起清單。" },
                {
                  keys: "Esc",
                  action:
                    "第一次收起清單，第二次清掉已輸入的文字。一次全清會讓誤按的人失去整段打好的字。對話框型則是關閉對話框、焦點回到輸入框，且保留原值。",
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
                  value: "combobox",
                  purpose:
                    "放在接收輸入並顯示目前值的那個元素上，也就是 <input> 本身，不是外層的 wrapper。放錯地方的話，螢幕閱讀器報讀的名稱與值會對不上。",
                },
                {
                  attr: "aria-expanded",
                  value: "true / false",
                  purpose:
                    "彈出內容的顯示狀態。這是整組屬性裡唯一會隨操作改變的，所以它是面板 Status 列上看得到的那一個。",
                },
                {
                  attr: "aria-controls",
                  value: "彈出內容的 id",
                  purpose: "指向被這個 combobox 展開與收起的那塊內容。",
                },
                {
                  attr: "aria-haspopup",
                  value: "（省略）/ dialog",
                  purpose:
                    "彈出內容是 listbox 時省略 —— role=combobox 的隱含值就是 listbox。grid、tree、dialog 三種必須明寫，使用者得先知道按下去會開什麼。它是 property 不是 state，不隨操作改變，所以不出現在 Status 列。",
                },
                {
                  attr: "aria-autocomplete",
                  value: "list",
                  purpose:
                    "必須如實反映實際行為。none 是建議值不隨輸入改變；list 是清單會依輸入篩選；both 是除了清單還會在游標後方顯示行內完成字串。標成 both 卻沒有那個字串，等於告訴使用者一個不存在的功能。",
                },
                {
                  attr: "aria-activedescendant",
                  value: "作用中建議值的 id",
                  purpose:
                    "焦點留在輸入框，由這個屬性指出清單裡目前作用中的是哪一個。Combobox 不能用 roving tabindex —— 焦點一移到選項上，使用者就不能繼續打字了。",
                },
                {
                  attr: "label（可見標籤）",
                  value: "縣市 / 出發日期",
                  purpose:
                    "input 類元件優先用原生 <label> 提供名稱，而不是 aria-labelledby。名稱必須與目前值分得開 —— 使用者要同時聽到「縣市」和「臺北市」，否則不知道這個值屬於哪個欄位。",
                },
                {
                  attr: "aria-label（彈出清單）",
                  value: "縣市建議",
                  purpose:
                    "彈出的 listbox 自己也要有名稱。它不共用 combobox 的名稱，螢幕閱讀器把它當成另一個容器報讀。",
                },
                {
                  attr: "aria-selected（建議值）",
                  value: "true / false",
                  purpose:
                    "哪一個建議值是選取狀態。grid 型的彈出內容也用它，但選取範圍跟著焦點走：每格代表一個建議值時選取那一格，整列描述同一個建議值時選取那一列。",
                },
                {
                  attr: "aria-readonly（對話框型）",
                  value: "readonly",
                  purpose:
                    "值只能從對話框選，所以輸入框是唯讀。用 readOnly 而非 disabled —— disabled 的元素不可聚焦，鍵盤使用者就打不開對話框了。",
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
                  note: "輸入框與彈出內容以 aria-controls 關聯，建議值與清單的隸屬關係以 role 表達。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
                },
                {
                  id: "2.1.1",
                  name: "鍵盤",
                  level: "A",
                  note: "輸入、篩選、展開、選取與取消都能只用鍵盤完成。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard",
                },
                {
                  id: "2.4.3",
                  name: "焦點順序",
                  level: "A",
                  note: "焦點全程留在輸入框；對話框型在開啟時把焦點移入對話框，關閉後移回輸入框。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order",
                },
                {
                  id: "3.2.2",
                  name: "輸入時",
                  level: "A",
                  note: "自動選取的建議值只在離開欄位時成為值，不會在輸入過程中改變焦點或送出表單。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/on-input",
                },
                {
                  id: "4.1.2",
                  name: "名稱、角色、值",
                  level: "A",
                  note: "輸入元件具備 combobox 角色與來自 label 的名稱，展開狀態以 aria-expanded 表達，作用中的建議值以 aria-activedescendant 指出。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value",
                },
              ]}
            />
          ),
        },
        {
          id: "apg",
          title: "APG 規則",
          content: <ApgRuleList slug="combobox" />,
        },
      ]}
    />
  )
}
