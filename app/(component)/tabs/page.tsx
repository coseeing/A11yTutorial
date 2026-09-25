import type { Metadata } from "next"
import { AriaTable } from "@/components/demo/AriaTable"
import { CodeBlock } from "@/components/demo/CodeBlock"
import { DemoPage } from "@/components/demo/DemoPage"
import { KeyboardTable } from "@/components/demo/KeyboardTable"
import { WcagList } from "@/components/demo/WcagList"
import { TabsDemo } from "./TabsDemo"

export const metadata: Metadata = {
  title: "Tabs — A11y Tutorial",
  description: "一組分頁標籤切換對應的面板，含 accessibility tree 與 WCAG 對應。",
}

const USAGE = `import { Tabs } from "@/components/Tabs/Tabs"

function AccountSettings() {
  return (
    <>
      {/* 有可見標題就用 labelledBy 指向它，看到的和聽到的是同一份文字 */}
      <h3 id="settings-heading">帳號設定</h3>
      <Tabs
        labelledBy="settings-heading"
        items={[
          { label: "總覽", content: "純文字面板 —— 會自動拿到 tabindex=0" },
          { label: "紀錄", content: <a href="/log">面板內有連結，就不再多佔停留點</a> },
        ]}
      />
    </>
  )
}`

export default function TabsPage() {
  return (
    <DemoPage
      title="Tabs"
      description="一組分頁標籤切換對應的面板。整組只佔一個 Tab 停留點，內部用方向鍵移動 —— 與 Radio Group 同一套 roving tabindex 模式，差別在這裡沒有原生元素可用，得自己寫。"
      sections={[
        { id: "demo", title: "Demo 與 Accessibility Tree", content: <TabsDemo /> },
        {
          id: "keyboard",
          title: "鍵盤操作",
          content: (
            <KeyboardTable
              rows={[
                {
                  keys: "Tab",
                  action:
                    "移入分頁列，焦點落在作用中的那一個。再按一次移到面板本身或面板內的第一個可聚焦元素。",
                },
                { keys: "← / →", action: "切換分頁並立即顯示對應面板，走到兩端會循環。" },
                { keys: "Home / End", action: "跳到第一個與最後一個分頁。" },
                {
                  keys: "↑ / ↓",
                  action:
                    "水平分頁列刻意不攔截，維持瀏覽器原本的捲動行為。垂直分頁列才由上下鍵負責切換。",
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
                  value: "tablist",
                  purpose: "包住所有分頁的容器。",
                },
                {
                  attr: "aria-labelledby",
                  value: "可見標題的 id",
                  purpose:
                    "分頁列的名稱。有可見標題就指向它；沒有才退而用 aria-label。這樣看到的字和聽到的字是同一份，不會各說各話。",
                },
                {
                  attr: "role",
                  value: "tab",
                  purpose: "每個分頁，必須直接位於 tablist 內。",
                },
                {
                  attr: "aria-selected",
                  value: "true / false",
                  purpose:
                    "作用中的那一個為 true，其餘全部明寫 false —— 不是省略。省略的話輔助科技無法分辨「沒被選取」與「這個元件不支援選取」。",
                },
                {
                  attr: "aria-controls",
                  value: "面板的 id",
                  purpose: "把分頁與它控制的面板關聯起來。",
                },
                {
                  attr: "role",
                  value: "tabpanel",
                  purpose: "每個內容面板。同一時間只有作用中的那一個不帶 hidden。",
                },
                {
                  attr: "aria-labelledby",
                  value: "對應分頁的 id",
                  purpose:
                    "面板的名稱來自它的分頁。使用者從面板列表跳過來時，聽到的是「總覽，分頁面板」而不是一個無名的區塊。",
                },
                {
                  attr: "tabindex",
                  value: "0 / 省略",
                  purpose:
                    "只在面板內沒有可聚焦元素時給 0 —— 那種面板鍵盤使用者根本到不了。內容本身就可聚焦時再給，只會多一個沒有意義的停留點。這個元件會自己判斷。",
                },
                {
                  attr: "tabindex",
                  value: "-1",
                  purpose:
                    "沒被選取的分頁。整組只留一個停留點，這就是 roving tabindex：Tab 進得來，內部改由方向鍵負責。",
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
                  note: "分頁與面板的對應關係以 aria-controls 與 aria-labelledby 雙向表達，不是只靠視覺上的相鄰。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
                },
                {
                  id: "2.1.1",
                  name: "鍵盤",
                  level: "A",
                  note: "方向鍵、Home、End 即可完成全部操作。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard",
                },
                {
                  id: "2.4.3",
                  name: "焦點順序",
                  level: "A",
                  note: "分頁列整組一個停留點，接著是面板 —— 順序與視覺順序一致。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order",
                },
                {
                  id: "2.4.7",
                  name: "焦點可見",
                  level: "AA",
                  note: "分頁與可聚焦的面板都有橘色 focus ring。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible",
                },
                {
                  id: "4.1.2",
                  name: "名稱、角色、值",
                  level: "A",
                  note: "tablist、tab、tabpanel 三個角色齊備，各自具名，選取狀態以 aria-selected 表達。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value",
                },
              ]}
            />
          ),
        },
        { id: "code", title: "程式碼", content: <CodeBlock code={USAGE} label="Tabs 使用範例程式碼" /> },
      ]}
    />
  )
}
