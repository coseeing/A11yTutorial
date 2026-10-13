import type { Metadata } from "next"
import { AriaTable } from "@/components/demo/AriaTable"
import { DemoPage } from "@/components/demo/DemoPage"
import { KeyboardTable } from "@/components/demo/KeyboardTable"
import { WcagList } from "@/components/demo/WcagList"
import { GridDemo } from "./GridDemo"

export const metadata: Metadata = {
  title: "Grid — A11y Tutorial",
  description:
    "以方向鍵在儲存格之間移動的互動式表格，含 accessibility tree、鍵盤操作與 WCAG 對應。",
}

export default function GridPage() {
  return (
    <DemoPage
      title="Grid"
      sections={[
        { id: "demo", title: "Demo 與 Accessibility Tree", content: <GridDemo /> },
        {
          id: "keyboard",
          title: "鍵盤操作",
          content: (
            <KeyboardTable
              rows={[
                {
                  keys: "Tab",
                  action:
                    "移入與移出整個 Grid。不論幾列幾欄，整個表格只佔一個停留點 —— 九格資料若各佔一個停留點，鍵盤使用者光是經過這張表就得按九次。",
                },
                {
                  keys: "← / → / ↑ / ↓",
                  action:
                    "在儲存格之間逐格移動。標頭列也走得到，使用者才能回頭確認欄位名稱。到邊界就停住，不繞到下一列。",
                },
                { keys: "Home / End", action: "移到目前這一列的第一格或最後一格。" },
                {
                  keys: "Ctrl + Home / Ctrl + End",
                  action: "移到整個 Grid 的第一格或最後一格。",
                },
                {
                  keys: "Space",
                  action:
                    "選取或取消選取焦點所在的整列。焦點不會移動 —— 選取與移動是兩件事。",
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
                  value: "grid",
                  purpose:
                    "原生 <table> 的隱含角色是 table，必須明寫 grid 才換成互動語意。換過去之後螢幕閱讀器會把方向鍵交還給頁面，它自己的表格瀏覽模式就不再接管 —— 所以方向鍵一定要自己實作，不能只改角色。",
                },
                {
                  attr: "aria-labelledby",
                  value: "可見標題的 id",
                  purpose: "Grid 的名稱，指向可見標題「共用檔案」。",
                },
                {
                  attr: "aria-describedby",
                  value: "操作說明的 id",
                  purpose:
                    "名稱之後補充播報的說明。Grid 的操作方式與一般表格不同，這句話讓使用者知道該按方向鍵而不是 Tab。",
                },
                {
                  attr: "role（列與儲存格）",
                  value: "row / columnheader / gridcell",
                  purpose:
                    "Grid 內的結構角色。用原生 <tr>、<th>、<td> 時瀏覽器會映射成這些角色，這裡明寫是為了讓結構一眼看得出來。",
                },
                {
                  attr: "aria-selected",
                  value: "true / false",
                  purpose:
                    "選取狀態。這個 Grid 的選取單位是一整列，所以放在 <tr> 上。若選取單位是儲存格就放在儲存格上；選取整欄時，該欄的每一格都要標。",
                },
                {
                  attr: "aria-readonly",
                  value: "（不使用）",
                  purpose:
                    "這個 Grid 沒有編輯功能，所以不標。標上去反而是錯的訊息 —— 它的意思是「這裡本來可以編輯，但現在不行」，而不是「這張表是唯讀資料」。可編輯的 Grid 才用它，而且只標在禁止編輯的那些儲存格上。",
                },
                {
                  attr: "tabindex",
                  value: "0 / -1",
                  purpose:
                    "roving tabindex：只有一格是 0，其餘都是 -1。移動焦點時換掉那個 0，Tab 才會只停一次。",
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
                  note: "用原生表格元素搭配 scope，每個儲存格與它的欄標頭產生程式可判斷的關聯。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
                },
                {
                  id: "2.1.1",
                  name: "鍵盤",
                  level: "A",
                  note: "移動與選取都能只用鍵盤完成。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard",
                },
                {
                  id: "2.4.3",
                  name: "焦點順序",
                  level: "A",
                  note: "整個 Grid 只佔一個 Tab 停留點，內部移動交給方向鍵。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order",
                },
                {
                  id: "2.4.7",
                  name: "焦點可見",
                  level: "AA",
                  note: "聚焦的儲存格有橘色內嵌外框，與選取列的淺綠底色分得出來。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible",
                },
                {
                  id: "4.1.2",
                  name: "名稱、角色、值",
                  level: "A",
                  note: "Grid 有名稱與補充說明，列與儲存格各有正確角色，選取狀態以 aria-selected 表達。",
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
