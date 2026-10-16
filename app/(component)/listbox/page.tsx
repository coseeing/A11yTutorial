import type { Metadata } from "next"
import { ApgRuleList } from "@/components/demo/ApgRuleList"
import { AriaTable } from "@/components/demo/AriaTable"
import { DemoPage } from "@/components/demo/DemoPage"
import { KeyboardTable } from "@/components/demo/KeyboardTable"
import { WcagList } from "@/components/demo/WcagList"
import { ListboxDemo } from "./ListboxDemo"

export const metadata: Metadata = {
  title: "Listbox — A11y Tutorial",
  description:
    "從清單中選取選項的單選清單，含 accessibility tree、鍵盤操作與 WCAG 對應。",
}

export default function ListboxPage() {
  return (
    <DemoPage
      title="Listbox"
      sections={[
        { id: "demo", title: "Demo 與 Accessibility Tree", content: <ListboxDemo /> },
        {
          id: "keyboard",
          title: "鍵盤操作",
          content: (
            <KeyboardTable
              rows={[
                {
                  keys: "Tab",
                  action:
                    "移入與移出整個清單。清單只佔一個停留點 —— 選項本身不可聚焦，焦點停在容器上。",
                },
                {
                  keys: "↓ / ↑",
                  action:
                    "移到下一個或上一個選項。單選清單讓選取跟著焦點移動，所以移到哪就選到哪。停在頭尾不繞回去，避免使用者誤以為清單還有下一頁。",
                },
                { keys: "Home / End", action: "跳到第一個或最後一個選項。" },
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
                  value: "listbox",
                  purpose:
                    "持有所有選項的容器。它和原生 <select> 解決同一個問題；只有在需要自訂選項外觀或分群呈現時才值得自己實作。",
                },
                {
                  attr: "aria-labelledby",
                  value: "可見標題的 id",
                  purpose:
                    "獨立的 listbox 必須有自己的名稱。有可見標題時指向它，看得到的字和聽得到的字才是同一份。",
                },
                {
                  attr: "aria-activedescendant",
                  value: "作用中選項的 id",
                  purpose:
                    "焦點留在容器上，由這個屬性指出容器內目前作用中的是哪個選項。這是 roving tabindex 之外的另一條路：選項不需要是可聚焦元素，移動時也不必呼叫 focus()。代價是作用中的樣式得自己畫。",
                },
                {
                  attr: "role（選項）",
                  value: "option",
                  purpose:
                    "每個選項的角色，且必須直接位於 listbox 或其內的 group 之下。中間多包一層沒有角色的 div，選項與清單的關聯就斷了。",
                },
                {
                  attr: "aria-selected",
                  value: "true / false",
                  purpose:
                    "選取狀態。同一個清單只能擇一使用 aria-selected 或 aria-checked，不要混用 —— 兩者在輔助科技裡會唸成不同的事情。未選取時明寫 false，使用者才聽得出「這一項沒有被選」。",
                },
                {
                  attr: "role（群組）",
                  value: "group",
                  purpose:
                    "選項分群用的容器，每個群組至少要有一個選項。群組標題是靜態文字，不給 role=option，方向鍵才不會停在上面。",
                },
                {
                  attr: "aria-labelledby（群組）",
                  value: "群組標題的 id",
                  purpose:
                    "群組必須有名稱。少了它，螢幕閱讀器只唸得出「群組」兩個字，使用者聽不出這幾個選項為什麼被歸在一起。",
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
                  note: "選項與清單、選項與群組的隸屬關係以 role 表達，程式判斷得出來，不只靠縮排與間距。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
                },
                {
                  id: "2.1.1",
                  name: "鍵盤",
                  level: "A",
                  note: "方向鍵、Home、End 即可完成選取，不需要滑鼠。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard",
                },
                {
                  id: "2.4.3",
                  name: "焦點順序",
                  level: "A",
                  note: "整個清單只佔一個 Tab 停留點，選項之間的移動交給方向鍵，Tab 不會被四個選項一路攔下來。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order",
                },
                {
                  id: "2.4.7",
                  name: "焦點可見",
                  level: "AA",
                  note: "作用中的選項有橘色外框，與選取狀態的淺綠底色明顯不同 —— 使用者分得出「焦點在這裡」和「這一項被選了」。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible",
                },
                {
                  id: "4.1.2",
                  name: "名稱、角色、值",
                  level: "A",
                  note: "清單、群組、選項各有正確的角色與名稱，選取狀態以 aria-selected 表達。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value",
                },
              ]}
            />
          ),
        },
        {
          id: "apg",
          title: "APG 規則",
          content: <ApgRuleList slug="listbox" />,
        },
      ]}
    />
  )
}
