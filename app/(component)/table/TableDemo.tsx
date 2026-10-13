"use client"

import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"

// TableDemo — 靜態資料表格，重點在「儲存格找得到自己的標頭」。
//
// 這裡用原生 <table> 而非站上通用的 Table 元件：通用元件為了版面彈性只輸出
// 欄標頭，示範不了 scope=row、caption 與 aria-describedby 這幾件事，而這一頁
// 要講的正是它們。
//
// Grid 是另一個 pattern：那是可用方向鍵操作的互動表格。這裡的表格不接收焦點，
// 螢幕閱讀器用自己的表格瀏覽模式讀它。

const ROWS = [
  { plan: "基本", price: "免費", seats: "1 人", support: "線上文件" },
  { plan: "團隊", price: "每月 300 元", seats: "最多 10 人", support: "電子郵件" },
  { plan: "企業", price: "另行報價", seats: "不限", support: "專屬客服" },
]

const CELL = "typography-body2 border-b border-teal-100 px-16 py-12 text-left align-top"

export function TableDemo() {
  return (
    <div className="flex flex-col gap-24">
      <DemoStage id="table-demo" className="flex-col items-stretch">
        <div className="w-full overflow-x-auto">
          <table
            id="table-demo-table"
            aria-labelledby="table-demo-caption"
            aria-describedby="table-demo-note"
            className="w-full border-collapse bg-neutral-white"
          >
            {/*
              caption 本身就是表格的無障礙名稱來源，這裡仍明寫 aria-labelledby ——
              因為 caption 裡還放了補充說明，不指定的話整段都會變成名稱。
            */}
            <caption className="caption-top px-16 py-12 text-left">
              <span id="table-demo-caption" className="typography-strong1 text-teal-700">
                方案比較
              </span>
              <span
                id="table-demo-note"
                className="typography-body2 mt-4 block text-teal-300"
              >
                價格為未稅金額，年繳可另享九折。
              </span>
            </caption>
            <thead>
              <tr>
                {["方案", "價格", "人數上限", "技術支援"].map((label) => (
                  <th
                    key={label}
                    scope="col"
                    className={`${CELL} typography-strong2 text-teal-700`}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.plan}>
                  {/*
                    每一列的第一格用 th + scope=row：螢幕閱讀器把游標移到「每月 300 元」
                    那一格時，才會連著唸出「團隊、價格」。少了它，使用者只聽得到一串
                    數字，不知道是哪一列的。
                  */}
                  <th scope="row" className={`${CELL} typography-strong2 text-teal-700`}>
                    {row.plan}
                  </th>
                  <td className={`${CELL} text-teal-700`}>{row.price}</td>
                  <td className={`${CELL} text-teal-700`}>{row.seats}</td>
                  <td className={`${CELL} text-teal-700`}>{row.support}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DemoStage>

      {/* 三個面板由外而內：表格容器 → 欄標頭 → 列標頭。 */}
      <A11yTree selector="#table-demo-table" hint="觀察對象：表格容器。" />

      <A11yTree selector="#table-demo-table thead th" hint="觀察對象：第一個欄標頭。" />

      <A11yTree selector="#table-demo-table tbody th" hint="觀察對象：第一個列標頭。" />
    </div>
  )
}
