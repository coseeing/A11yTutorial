import type { Metadata } from "next"
import { AriaTable } from "@/components/demo/AriaTable"
import { DemoPage } from "@/components/demo/DemoPage"
import { KeyboardTable } from "@/components/demo/KeyboardTable"
import { WcagList } from "@/components/demo/WcagList"
import { AlertDialogDemo } from "./AlertDialogDemo"

export const metadata: Metadata = {
  title: "Alert Dialog — A11y Tutorial",
  description:
    "承載警告或錯誤、需要使用者立即回應的對話框，含 accessibility tree、鍵盤操作與 WCAG 對應。",
}

export default function AlertDialogPage() {
  return (
    <DemoPage
      title="Alert Dialog"
      sections={[
        { id: "demo", title: "Demo 與 Accessibility Tree", content: <AlertDialogDemo /> },
        {
          id: "keyboard",
          title: "鍵盤操作",
          content: (
            <KeyboardTable
              rows={[
                {
                  keys: "Enter / Space",
                  action: "在觸發按鈕上開啟警示對話框。",
                },
                {
                  keys: "Tab",
                  action: "在對話框內的控制元件之間循環，不會跑到背景內容。",
                },
                { keys: "Shift + Tab", action: "反向循環，同樣被限制在對話框內。" },
                {
                  keys: "Esc",
                  action:
                    "關閉對話框，焦點回到原本的觸發元素。警示對話框也必須能用 Esc 離開 —— 它要求回應，但不能把人困住。",
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
                  value: "alertdialog",
                  purpose:
                    "與 dialog 的差別：輔助科技把它當成警示來處理，開啟時會連同 aria-describedby 的內容一起播報，而不是只唸出標題。用在內容本身就是警告或錯誤、且需要立即回應的時候。",
                },
                {
                  attr: "aria-modal",
                  value: "true",
                  purpose:
                    "明寫而非依賴 showModal() 的隱含值。APG 對警示對話框要求明確設定 —— 隱含值在 DOM 上看不到，用檢查工具的人會以為漏了。",
                },
                {
                  attr: "aria-labelledby",
                  value: "標題元素的 id",
                  purpose: "名稱取自可見標題，看到的和聽到的是同一份文字。",
                },
                {
                  attr: "aria-describedby",
                  value: "警示訊息的 id",
                  purpose:
                    "這裡是必填，不像一般 Dialog 可有可無 —— 警示訊息就是這個元件存在的理由，不關聯起來「警示」兩個字就沒有內容。",
                },
                {
                  attr: "（焦點）",
                  value: "影響最小的控制元件",
                  purpose:
                    "開啟時焦點落在「取消」而非「永久刪除」。破壞性動作旁邊若預選了破壞性按鈕，一個 Enter 就回不來了。",
                },
                {
                  attr: "（舊式）",
                  value: "aria-hidden=true",
                  purpose:
                    "在不支援 <dialog> 的環境改用舊式做法時，要在每個背景層元素上各自設定，而且警示對話框絕不能落在任何 aria-hidden=true 元素的子階層裡。",
                },
                {
                  attr: "aria-hidden",
                  value: "true",
                  purpose: "頂部紅色裝飾條是純視覺，不應進入無障礙樹。",
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
                  note: "標題與訊息分別以 aria-labelledby 與 aria-describedby 關聯，不是只靠視覺上的前後排列。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
                },
                {
                  id: "2.1.2",
                  name: "沒有鍵盤陷阱",
                  level: "A",
                  note: "焦點被限制在對話框內，但 Esc 一定能離開。要求回應不等於可以把人困住。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap",
                },
                {
                  id: "2.4.3",
                  name: "焦點順序",
                  level: "A",
                  note: "開啟時焦點進入對話框並落在影響最小的控制元件上，關閉時回到觸發它的按鈕。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order",
                },
                {
                  id: "3.3.4",
                  name: "錯誤預防",
                  level: "AA",
                  note: "不可逆的動作要可以復原、可以檢查、或可以確認。警示對話框正是「確認」這一條路 —— 而預設焦點放在取消鈕上，是讓確認真的成為一個決定而不是慣性。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data",
                },
                {
                  id: "4.1.2",
                  name: "名稱、角色、值",
                  level: "A",
                  note: "role=alertdialog、名稱、說明、aria-modal 四者齊備。",
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
