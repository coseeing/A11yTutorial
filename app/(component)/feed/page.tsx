import type { Metadata } from "next"
import { ApgRuleList } from "@/components/demo/ApgRuleList"
import { AriaTable } from "@/components/demo/AriaTable"
import { DemoPage } from "@/components/demo/DemoPage"
import { KeyboardTable } from "@/components/demo/KeyboardTable"
import { WcagList } from "@/components/demo/WcagList"
import { FeedDemo } from "./FeedDemo"

export const metadata: Metadata = {
  title: "Feed — A11y Tutorial",
  description: "可無限捲動的文章串流，含 accessibility tree、鍵盤操作與 WCAG 對應。",
}

export default function FeedPage() {
  return (
    <DemoPage
      title="Feed"
      sections={[
        { id: "demo", title: "Demo 與 Accessibility Tree", content: <FeedDemo /> },
        {
          id: "keyboard",
          title: "鍵盤操作",
          content: (
            <KeyboardTable
              rows={[
                {
                  keys: "Tab",
                  action:
                    "逐篇移入文章。文章本身可聚焦，所以每一篇都是一個停留點 —— Feed 是少數該讓非互動元素接收焦點的場合，使用者要的是「跳到下一篇」。",
                },
                {
                  keys: "Page Down",
                  action: "跳到下一篇文章的開頭，不必一路 Tab 過文章內的連結。",
                },
                { keys: "Page Up", action: "跳到上一篇文章的開頭。" },
                {
                  keys: "Ctrl + End",
                  action:
                    "跳出整個串流，落在 feed 之後的第一個可聚焦元素，也就是「載入更多」按鈕。",
                },
                {
                  keys: "Ctrl + Home",
                  action:
                    "跳到 feed 之前的第一個可聚焦元素。這個範例的 feed 上方沒有可聚焦元素，所以焦點留在原處。",
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
                  value: "feed",
                  purpose:
                    "持有所有文章的容器。feed 與 list 的差別在於內容會持續長出來；這個角色讓輔助科技知道可以用文章為單位瀏覽，而不是把它當成固定長度的清單。",
                },
                {
                  attr: "aria-labelledby",
                  value: "可見標題的 id",
                  purpose:
                    "串流的名稱。頁面上可能有好幾個 feed（最新、熱門、已追蹤），名稱是使用者唯一分得出來的依據。",
                },
                {
                  attr: "aria-busy",
                  value: "true / false",
                  purpose:
                    "多步驟新增或移除文章的期間設為 true，完成後改回 false。輔助科技在這段期間先按住不報讀，避免使用者聽到半成品。整段包起來，不是每篇切換一次。上方面板的 Status 列只在載入那一秒出現 aria-busy=true —— 值為 false 時螢幕閱讀器什麼都不唸，所以那一列會回到「（無狀態）」。",
                },
                {
                  attr: "role（文章）",
                  value: "article",
                  purpose:
                    "每個內容單元。feed 裡不該有游離在 article 之外的內容 —— 那些內容在以文章為單位瀏覽時會整個被跳過。",
                },
                {
                  attr: "aria-labelledby（文章）",
                  value: "文章標題的 id",
                  purpose:
                    "每篇文章要有彼此分得出來的名稱。使用者在文章之間跳時聽到的就是這個名稱；全部都叫「文章」的話，跳與不跳沒有差別。",
                },
                {
                  attr: "aria-describedby（文章）",
                  value: "文章內文的 id",
                  purpose:
                    "指向文章的主要內容。名稱回答「這是哪一篇」，描述讓使用者不必進入文章就能判斷要不要讀。",
                },
                {
                  attr: "aria-posinset / aria-setsize",
                  value: "1 / 2",
                  purpose:
                    "這是第幾篇、總共有幾篇。無限捲動時 DOM 裡只有一部分文章，少了這兩個屬性，使用者沒有任何位置感。總數未知時 aria-setsize 設為 -1。",
                },
                {
                  attr: "tabindex（文章）",
                  value: "0",
                  purpose:
                    "讓文章可聚焦，Page Down / Page Up 才有落腳點。沒有它，這個 pattern 的鍵盤操作全部失效。",
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
                  note: "每篇文章是一個 article，標題與內文分別以 aria-labelledby、aria-describedby 關聯，文章的邊界程式判斷得出來。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
                },
                {
                  id: "2.1.1",
                  name: "鍵盤",
                  level: "A",
                  note: "Page Down、Page Up 與 Ctrl + End 即可在文章之間與串流之外移動。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard",
                },
                {
                  id: "2.4.3",
                  name: "焦點順序",
                  level: "A",
                  note: "新文章接在既有文章之後，焦點留在原處不被搬走，Tab 順序與視覺順序一致。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order",
                },
                {
                  id: "4.1.3",
                  name: "狀態訊息",
                  level: "AA",
                  note: "載入期間以 aria-busy 標示，使用者不必把焦點移過去就知道串流正在更新。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages",
                },
              ]}
            />
          ),
        },
        {
          id: "apg",
          title: "APG 規則",
          content: <ApgRuleList slug="feed" />,
        },
      ]}
    />
  )
}
