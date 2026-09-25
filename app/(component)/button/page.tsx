import type { Metadata } from "next"
import { AriaTable } from "@/components/demo/AriaTable"
import { CodeBlock } from "@/components/demo/CodeBlock"
import { DemoPage } from "@/components/demo/DemoPage"
import { KeyboardTable } from "@/components/demo/KeyboardTable"
import { WcagList } from "@/components/demo/WcagList"
import { ButtonDemo } from "./ButtonDemo"

export const metadata: Metadata = {
  title: "Button — A11y Tutorial",
  description:
    "觸發動作的控制項，含名稱來源、toggle 狀態、停用做法與 WCAG 對應。",
}

const USAGE = `import { Button } from "@/components/Button/Button"

// 只有圖示 —— 名稱要另外給，否則螢幕閱讀器唸不出這顆按鈕是什麼
<Button aria-label="關閉">
  <PlusIcon className="rotate-45" />
</Button>

// Toggle —— 名稱固定是「靜音」，狀態由 aria-pressed 表達
<Button pressed={muted} onClick={() => setMuted(v => !v)}>
  靜音
</Button>

// 停用，但保留在 Tab 順序中，並說明為什麼不能用
<>
  <Button disabled keepFocusable aria-describedby="why">
    送出
  </Button>
  <p id="why">請先勾選同意條款才能送出。</p>
</>

// 導向其他頁面 —— 那是連結，不是按鈕
<Button href="/next">前往下一頁</Button>`

export default function ButtonPage() {
  return (
    <DemoPage
      title="Button"
      sections={[
        { id: "demo", title: "Demo 與 Accessibility Tree", content: <ButtonDemo /> },
        {
          id: "keyboard",
          title: "鍵盤操作",
          content: (
            <KeyboardTable
              rows={[
                {
                  keys: "Enter / Space",
                  action:
                    "啟動按鈕。用原生 <button> 即免費取得；用 <div> 加 onClick 則兩個鍵都要自己綁，而且 Space 還要擋掉頁面捲動。",
                },
                { keys: "Tab", action: "移入與移出。原生 disabled 的按鈕會被整個跳過。" },
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
                  value: "button",
                  purpose:
                    "觸發動作的元素要有按鈕語意，而且外觀要像按鈕。做成看起來像連結的按鈕，使用者會預期它會導航；反之亦然。會換頁的用 <a>，會做事的用 <button>。",
                },
                {
                  attr: "aria-label",
                  value: "關閉",
                  purpose:
                    "只有圖示、沒有文字內容時的名稱來源。有文字內容就不要用它覆蓋 —— 看到的和聽到的不一致會違反 WCAG 2.5.3。",
                },
                {
                  attr: "aria-describedby",
                  value: "說明元素的 id",
                  purpose:
                    "補充說明，在名稱之後播報。「刪除帳號」是名稱，「這個動作無法復原」是說明 —— 兩者不該擠在同一句話裡。",
                },
                {
                  attr: "aria-pressed",
                  value: "true / false",
                  purpose:
                    "Toggle 按鈕的開關狀態。用它的前提是名稱不隨狀態改變：標籤會在「播放」與「暫停」之間切換的按鈕，狀態已經寫在名稱裡，再加 aria-pressed 就是兩套互相打架的說法。",
                },
                {
                  attr: "aria-disabled",
                  value: "true",
                  purpose:
                    "停用但保留在 Tab 順序中。原生 disabled 會讓按鈕從鍵盤與螢幕閱讀器的瀏覽路徑中整個消失 —— 使用者不但不能按，連「這裡有一顆按鈕、目前不能用」都不知道。停用原因寫在畫面別處時，用這個。",
                },
                {
                  attr: "aria-busy",
                  value: "true",
                  purpose: "非同步動作進行中。告訴輔助科技這裡的狀態還在變，先不要當成最終結果。",
                },
                {
                  attr: "aria-hidden",
                  value: "true",
                  purpose: "圖示是純視覺，名稱已由 aria-label 提供，圖示再進無障礙樹只會重複。",
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
                  note: "補充說明以 aria-describedby 與按鈕關聯，而不是只在視覺上擺在旁邊。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
                },
                {
                  id: "2.1.1",
                  name: "鍵盤",
                  level: "A",
                  note: "Enter 與空白鍵都能啟動，不需要滑鼠。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard",
                },
                {
                  id: "2.4.6",
                  name: "標題與標籤",
                  level: "AA",
                  note: "按鈕名稱要說明按下去會發生什麼，不能只是「確定」「點這裡」。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels",
                },
                {
                  id: "2.4.7",
                  name: "焦點可見",
                  level: "AA",
                  note: "每顆按鈕都有橘色 focus ring，包含以 aria-disabled 停用的那顆。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible",
                },
                {
                  id: "2.5.3",
                  name: "名稱中的標籤",
                  level: "A",
                  note: "無障礙名稱要包含可見文字。用 aria-label 蓋掉看得見的標籤，語音控制使用者說出畫面上的字就點不到它。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/label-in-name",
                },
                {
                  id: "4.1.2",
                  name: "名稱、角色、值",
                  level: "A",
                  note: "按鈕具備 button 角色與無障礙名稱；toggle 的按下狀態以 aria-pressed、停用狀態以 disabled 或 aria-disabled 表達。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value",
                },
              ]}
            />
          ),
        },
        { id: "code", title: "程式碼", content: <CodeBlock code={USAGE} label="Button 使用範例程式碼" /> },
      ]}
    />
  )
}
