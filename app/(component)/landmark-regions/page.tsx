import type { Metadata } from "next"
import { AriaTable } from "@/components/demo/AriaTable"
import { DemoPage } from "@/components/demo/DemoPage"
import { KeyboardTable } from "@/components/demo/KeyboardTable"
import { WcagList } from "@/components/demo/WcagList"
import { LandmarkDemo } from "./LandmarkDemo"

export const metadata: Metadata = {
  title: "Landmark Regions — A11y Tutorial",
  description:
    "以地標角色劃分頁面區塊，含 accessibility tree、鍵盤操作與 WCAG 對應。",
}

export default function LandmarkRegionsPage() {
  return (
    <DemoPage
      title="Landmark Regions"
      sections={[
        { id: "demo", title: "Demo 與 Accessibility Tree", content: <LandmarkDemo /> },
        {
          id: "keyboard",
          title: "鍵盤操作",
          content: (
            <KeyboardTable
              rows={[
                {
                  keys: "Tab",
                  action:
                    "地標本身不接收焦點，Tab 不會停在上面。這一頁按 Tab 的第一個停留點是「跳到主要內容」的略過連結。",
                },
                {
                  keys: "D / Shift + D",
                  action:
                    "NVDA 的下一個與上一個地標。地標唯一的用途就是讓使用者這樣跳 —— 沒有名稱的地標在這份清單裡只會顯示角色名，使用者分不出是哪一個。",
                },
                {
                  keys: "Insert + F7",
                  action:
                    "NVDA 的元素清單，可以列出整頁的地標。VoiceOver 的對應功能是 VO + U 的 Landmarks 選單。這是地標的驗收方式：清單裡每一項都該看得出是什麼。",
                },
                {
                  keys: "Enter（在略過連結上）",
                  action:
                    "跳過導覽直接進入 main。略過連結是給鍵盤使用者的，它與地標解決的是同一個問題的兩面。",
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
                  attr: "<header>",
                  value: "banner",
                  purpose:
                    "必須直接位於 body 情境下才是 banner；包進 main、section、article 之後就只是普通容器。一個頁面最多一個最高層級的 banner。面板上第一個與第四個觀察對象都是 <header>，角色卻不同 —— 差別只在它被誰包著。",
                },
                {
                  attr: "<main>",
                  value: "main",
                  purpose:
                    "主要內容。每個頁面一個最高層級的 main。若同一份文件真的有多個（例如巢狀的應用程式情境），每個都要有可區分的無障礙名稱。",
                },
                {
                  attr: "<footer>",
                  value: "contentinfo",
                  purpose:
                    "與 header 同一條規則：只有在 body 情境下才是 contentinfo，且最多一個最高層級的。",
                },
                {
                  attr: "<nav>",
                  value: "navigation",
                  purpose:
                    "nav 不受巢狀影響，永遠是 navigation。這一頁有兩個：「主要導覽」與頁尾的「參考規範」。多個導覽地標各要有自己的名稱；但若兩個導覽包含的是同一組連結，就該用相同的名稱 —— 名稱不同會讓使用者以為是兩份不同的東西。",
                },
                {
                  attr: "<search>",
                  value: "search",
                  purpose:
                    "提供搜尋功能的一組控制元件用這個，不要用 form。form 地標的意思是「這裡有一份表單要填」，而使用者找搜尋框時要找的是搜尋。",
                },
                {
                  attr: "<form> + 名稱",
                  value: "form",
                  purpose:
                    "form 只有具備無障礙名稱時才是地標，沒有名稱就只是普通容器。名稱代表整份表單的用途，不是個別欄位的標籤。",
                },
                {
                  attr: "<section> + 名稱",
                  value: "region",
                  purpose:
                    "同樣只有具名時才是地標。region 用來標示其他具名地標沒涵蓋、但重要到值得跳過去的內容。面板上最後兩個 section 是對照組：一個有名字所以是 region，一個沒有所以是 generic。",
                },
                {
                  attr: "<aside>",
                  value: "complementary",
                  purpose:
                    "與主要內容相關、但拿掉也能獨立理解的輔助區塊。這一頁沒有放 —— 內容與主要內容無關時就不該用它，該換成更通用的角色。",
                },
                {
                  attr: "aria-labelledby / aria-label",
                  value: "可見標題的 id / 文字",
                  purpose:
                    "地標的名稱。有可見標題就指向它，沒有才用 aria-label。名稱裡不要重複角色名 —— 寫成 aria-label=\"導覽\" 會被唸成「導覽，導覽」。",
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
                  note: "頁面的區塊劃分用原生地標元素表達，而不只靠視覺上的分隔線與留白。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
                },
                {
                  id: "2.4.1",
                  name: "區塊跳過",
                  level: "A",
                  note: "地標讓輔助科技使用者直接跳到主要內容；略過連結提供同樣的出路給只用鍵盤的人。兩者缺一不可 —— 地標對不用螢幕閱讀器的鍵盤使用者沒有幫助。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks",
                },
                {
                  id: "2.4.6",
                  name: "標題及標籤",
                  level: "AA",
                  note: "重複出現的地標各有可區分的名稱，地標清單裡每一項都看得出是什麼。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels",
                },
                {
                  id: "3.2.3",
                  name: "一致的導覽",
                  level: "AA",
                  note: "同一組連結在每一頁用相同的地標與相同的名稱，使用者學會一次就能到處用。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation",
                },
              ]}
            />
          ),
        },
      ]}
    />
  )
}
