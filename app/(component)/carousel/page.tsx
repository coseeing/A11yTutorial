import type { Metadata } from "next"
import { ApgRuleList } from "@/components/demo/ApgRuleList"
import { AriaTable } from "@/components/demo/AriaTable"
import { DemoPage } from "@/components/demo/DemoPage"
import { KeyboardTable } from "@/components/demo/KeyboardTable"
import { WcagList } from "@/components/demo/WcagList"
import { CarouselDemo } from "./CarouselDemo"

export const metadata: Metadata = {
  title: "Carousel — A11y Tutorial",
  description:
    "輪播一組幻燈片的元件，含 accessibility tree、鍵盤操作與 WCAG 對應。",
}

export default function CarouselPage() {
  return (
    <DemoPage
      title="Carousel"
      sections={[
        { id: "demo", title: "Demo 與 Accessibility Tree", content: <CarouselDemo /> },
        {
          id: "keyboard",
          title: "鍵盤操作",
          content: (
            <KeyboardTable
              rows={[
                {
                  keys: "Tab",
                  action:
                    "逐一移入控制元件。群組式的選取按鈕全部留在 Tab 順序裡，包含目前那一張的 —— 它標的是 aria-disabled 而非原生 disabled，使用者走得過去才知道自己在第幾張。",
                },
                {
                  keys: "Enter / Space",
                  action:
                    "啟動聚焦中的控制元件。上一張、下一張、播放與選取按鈕都是原生 <button>，這個行為由平台提供。",
                },
                {
                  keys: "← / →",
                  action:
                    "Tab 型選取器才有：在分頁之間移動並切換投影片。群組式的選取按鈕是獨立按鈕，各佔一個停留點，不接方向鍵。",
                },
                {
                  keys: "Home / End",
                  action: "Tab 型選取器才有：跳到第一張或最後一張。",
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
                  attr: "role（容器）",
                  value: "group",
                  purpose:
                    "輪播容器。只有在這個輪播適合成為地標、值得讓使用者從地標清單直接跳進來時才用 region；否則用 group。這個範例的頁面還有別的內容更該被跳到，所以是 group。",
                },
                {
                  attr: "aria-roledescription",
                  value: "carousel",
                  purpose:
                    "螢幕閱讀器會唸這個字取代角色名 ——「carousel」而不是「群組」。它不改變角色，輔助科技操作這個元素的方式仍然照 group 走。面板的 Role 列把兩個都列出來。",
                },
                {
                  attr: "aria-labelledby（容器）",
                  value: "可見標題的 id",
                  purpose:
                    "輪播的名稱。名稱裡不要再出現「輪播」—— 角色描述已經說過一次，重複會唸成「carousel，近期活動輪播」。",
                },
                {
                  attr: "aria-roledescription（投影片）",
                  value: "slide",
                  purpose:
                    "群組式的投影片用 role=group 加上這個角色描述。Tab 型的投影片是 tabpanel，不得加角色描述 —— 名稱已由對應的 tab 提供，再加一次會變成兩層重複的播報。",
                },
                {
                  attr: "aria-label（投影片）",
                  value: "第 1 張，共 3 張：秋季特展",
                  purpose:
                    "每張投影片要有能辨識內容的名稱。給不出獨特名稱時才退回位置式的「第 3 張，共 10 張」。名稱裡不要再出現「投影片」。",
                },
                {
                  attr: "aria-live",
                  value: "off / polite",
                  purpose:
                    "放在投影片的外層容器上。自動輪播中是 off，停下來才是 polite —— 使用者自己按下一張的結果需要被報讀，但每四秒自動插話一次會讓螢幕閱讀器無法用。",
                },
                {
                  attr: "aria-atomic",
                  value: "false",
                  purpose:
                    "有 aria-live 就要一起設。false 表示只報讀換掉的那一部分；少了它，部分輔助科技會把整個容器從頭重讀一次。",
                },
                {
                  attr: "aria-label（播放控制）",
                  value: "播放輪播 / 停止輪播",
                  purpose:
                    "名稱要說出按下去會發生什麼，隨狀態改變。不要用 aria-pressed —— 那是 Toggle Button 的做法，而這顆按鈕已經靠名稱表達狀態，兩者併用會唸出互相矛盾的資訊。",
                },
                {
                  attr: "aria-disabled（選取按鈕）",
                  value: "true",
                  purpose:
                    "群組式選取器中，對應目前這張的按鈕要標上它 —— 按下去不會有任何變化。但必須留在 Tab 順序裡，所以不能用原生 disabled。",
                },
                {
                  attr: "role（Tab 型選取器）",
                  value: "tablist / tab",
                  purpose:
                    "Tab 型的選取按鈕是 tablist 裡的 tab，整組只佔一個停留點。tablist 的 aria-label 要說明這組 tab 的用途，每個 tab 的名稱要指出它顯示哪一張。",
                },
                {
                  attr: "aria-controls",
                  value: "目前投影片的 id",
                  purpose:
                    "指出這個控制元件操作的是哪個元素。支援程度不一，但它不會有害，而且在 Tab 型裡是 tab 與 tabpanel 關聯的必要環節。",
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
                  note: "投影片與選取控制、控制與它操作的投影片，關聯都以 role 與 aria-controls 表達。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
                },
                {
                  id: "2.1.1",
                  name: "鍵盤",
                  level: "A",
                  note: "切換、選取與播放控制都能只用鍵盤完成。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard",
                },
                {
                  id: "2.2.2",
                  name: "暫停、停止、隱藏",
                  level: "A",
                  note: "自動輪播預設關閉，啟動後可隨時停止。超過五秒的自動動態內容必須提供停止的方法 —— 預設不動是比「動了可以停」更省事的做法。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide",
                },
                {
                  id: "2.4.7",
                  name: "焦點可見",
                  level: "AA",
                  note: "所有控制元件聚焦時都有橘色 focus ring，包含那幾顆圓點。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible",
                },
                {
                  id: "4.1.2",
                  name: "名稱、角色、值",
                  level: "A",
                  note: "容器、投影片與每個控制元件都有正確的角色與名稱；播放狀態以名稱表達，選取狀態以 aria-selected 或 aria-disabled 表達。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value",
                },
                {
                  id: "4.1.3",
                  name: "狀態訊息",
                  level: "AA",
                  note: "手動切換投影片時以 aria-live=polite 報讀新內容；自動輪播期間改為 off，避免持續打斷。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages",
                },
              ]}
            />
          ),
        },
        {
          id: "apg",
          title: "APG 規則",
          content: <ApgRuleList slug="carousel" />,
        },
      ]}
    />
  )
}
