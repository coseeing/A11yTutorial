import type { Metadata } from "next"
import { AriaTable } from "@/components/demo/AriaTable"
import { DemoPage } from "@/components/demo/DemoPage"
import { KeyboardTable } from "@/components/demo/KeyboardTable"
import { WcagList } from "@/components/demo/WcagList"
import { TableDemo } from "./TableDemo"

export const metadata: Metadata = {
  title: "Table — A11y Tutorial",
  description: "呈現表格資料的靜態表格，含 accessibility tree、鍵盤操作與 WCAG 對應。",
}

export default function TablePage() {
  return (
    <DemoPage
      title="Table"
      sections={[
        { id: "demo", title: "Demo 與 Accessibility Tree", content: <TableDemo /> },
        {
          id: "keyboard",
          title: "鍵盤操作",
          content: (
            <KeyboardTable
              rows={[
                {
                  keys: "Tab",
                  action:
                    "跳過整個表格。靜態表格不接收焦點，表格內沒有互動元件時也不該有停留點 —— 想用方向鍵在儲存格之間移動的是 Grid，那是另一個 pattern。",
                },
                {
                  keys: "方向鍵",
                  action:
                    "由螢幕閱讀器的表格瀏覽模式提供（例如 NVDA 的 Ctrl + Alt + 方向鍵），逐格移動並報讀對應的標頭。這是輔助科技的功能，不需要頁面自己實作。",
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
                  value: "table",
                  purpose:
                    "原生 <table> 的隱含角色就是 table，不需要明寫。只有在用 div 排版硬做表格時才需要補上 role=table、row、columnheader、cell —— 那等於重建整棵樹，沒有理由這麼做。",
                },
                {
                  attr: "scope",
                  value: "col / row",
                  purpose:
                    "告訴瀏覽器這個 <th> 管的是一整欄還是一整列，計算出的角色分別是 columnheader 與 rowheader。少了它，簡單表格瀏覽器還猜得到，複雜表格就會對錯標頭。",
                },
                {
                  attr: "aria-labelledby",
                  value: "caption 內標題的 id",
                  purpose:
                    "表格的無障礙名稱。<caption> 本身就是名稱來源，但這個 caption 裡還放了補充說明；不明寫的話整段都會被當成名稱唸出來。",
                },
                {
                  attr: "aria-describedby",
                  value: "補充說明的 id",
                  purpose:
                    "名稱之後補充播報的說明。名稱回答「這是什麼表格」，描述回答「讀這張表前要知道什麼」—— 價格未稅這件事屬於後者。",
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
                  note: "用原生 <table> 與 <th scope>，每個儲存格與它的欄標頭、列標頭產生程式可判斷的關聯，而不只是視覺上對齊。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
                },
                {
                  id: "2.4.6",
                  name: "標題及標籤",
                  level: "AA",
                  note: "表格有可見標題「方案比較」，並以 aria-labelledby 成為它的無障礙名稱。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels",
                },
                {
                  id: "1.4.10",
                  name: "重新排列",
                  level: "AA",
                  note: "表格無法再窄時在自己的容器內水平捲動，頁面本身不會出現橫向捲軸。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/reflow",
                },
              ]}
            />
          ),
        },
      ]}
    />
  )
}
