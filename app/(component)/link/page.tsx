import type { Metadata } from "next"
import { AriaTable } from "@/components/demo/AriaTable"
import { DemoPage } from "@/components/demo/DemoPage"
import { KeyboardTable } from "@/components/demo/KeyboardTable"
import { WcagList } from "@/components/demo/WcagList"
import { LinkDemo } from "./LinkDemo"

export const metadata: Metadata = {
  title: "Link — A11y Tutorial",
  description: "導向其他資源的連結，含 accessibility tree、鍵盤操作與 WCAG 對應。",
}

export default function LinkPage() {
  return (
    <DemoPage
      title="Link"
      sections={[
        { id: "demo", title: "Demo 與 Accessibility Tree", content: <LinkDemo /> },
        {
          id: "keyboard",
          title: "鍵盤操作",
          content: (
            <KeyboardTable
              rows={[
                {
                  keys: "Enter",
                  action:
                    "啟動連結並前往目標。原生 <a href> 免費取得；用 div 加 role=link 的那一種要自己補 keydown，而且得同時處理 Enter 與點擊。",
                },
                {
                  keys: "Tab",
                  action:
                    "移入與移出連結。有 href 的連結自動在 Tab 順序裡；沒有 href 的 <a> 不可聚焦，div 版則要自己補 tabindex=0。",
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
                  value: "link",
                  purpose:
                    "<a href> 的隱含角色就是 link，不需要明寫。沒有 href 的 <a> 隱含角色是 generic —— 那種情況下角色、焦點、鍵盤三件事都得自己補，不如改用 <button>。",
                },
                {
                  attr: "href",
                  value: "目標網址",
                  purpose:
                    "它不只是導覽，還一次決定了角色與可聚焦性。少了它，連結在無障礙樹裡不再是連結。",
                },
                {
                  attr: "aria-label",
                  value: "在 LinkedIn 上追蹤我們",
                  purpose:
                    "只有圖像的連結沒有文字可當名稱。名稱要說出目的地，不是描述圖案 —— 「LinkedIn 圖示」說不出按下去會去哪裡。",
                },
                {
                  attr: "aria-hidden",
                  value: "true",
                  purpose:
                    "圖示是純視覺，名稱已由 aria-label 提供。少了它，有些螢幕閱讀器會把圖示的檔名或路徑一起唸出來。",
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
                  note: "連結用原生 <a href> 實作，連結的語意與關聯不靠視覺樣式傳達。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
                },
                {
                  id: "2.1.1",
                  name: "鍵盤",
                  level: "A",
                  note: "Enter 即可啟動，不需要滑鼠。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard",
                },
                {
                  id: "2.4.4",
                  name: "連結目的（在上下文中）",
                  level: "A",
                  note: "連結文字本身就說得出目的地；圖像連結以 aria-label 補上名稱。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context",
                },
                {
                  id: "2.4.7",
                  name: "焦點可見",
                  level: "AA",
                  note: "連結聚焦時有橘色 focus ring。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible",
                },
                {
                  id: "4.1.2",
                  name: "名稱、角色、值",
                  level: "A",
                  note: "連結具備 link 角色與有意義的無障礙名稱。",
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
