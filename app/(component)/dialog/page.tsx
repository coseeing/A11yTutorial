import type { Metadata } from "next"
import { AriaTable } from "@/components/demo/AriaTable"
import { CodeBlock } from "@/components/demo/CodeBlock"
import { DemoPage } from "@/components/demo/DemoPage"
import { KeyboardTable } from "@/components/demo/KeyboardTable"
import { ScreenReaderNotes } from "@/components/demo/ScreenReaderNotes"
import { WcagList } from "@/components/demo/WcagList"
import { DialogDemo } from "./DialogDemo"

export const metadata: Metadata = {
  title: "Dialog — A11y 元件 Demo",
  description: "以原生 <dialog> 實作的強制回應對話框，含 accessibility tree、鍵盤操作與 WCAG 對應。",
}

const USAGE = `import { Dialog } from "@/components/Dialog/Dialog"
import { Button } from "@/components/Button/Button"

function DeleteConfirm() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="small" onClick={() => setOpen(true)}>
        刪除
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="刪除這筆紀錄？"
        description="刪除後無法復原，確定要繼續嗎？"
        actions={
          <>
            <Button variant="small" theme="greenStroke" onClick={() => setOpen(false)}>
              取消
            </Button>
            <Button variant="small" theme="danger" onClick={handleDelete}>
              刪除
            </Button>
          </>
        }
      />
    </>
  )
}`

export default function DialogPage() {
  return (
    <DemoPage
      title="Dialog"
      description="以原生 <dialog> 實作的強制回應對話框。焦點鎖定、Esc 關閉與背景 inert 由瀏覽器提供，不需要自行實作 focus trap。"
      sections={[
        {
          id: "demo",
          title: "Demo 與 Accessibility Tree",
          content: <DialogDemo />,
        },
        {
          id: "keyboard",
          title: "鍵盤操作",
          content: (
            <KeyboardTable
              rows={[
                { keys: "Enter / Space", action: "在觸發按鈕上開啟對話框。" },
                { keys: "Tab", action: "在對話框內的可聚焦元素之間循環，不會跑到背景內容。" },
                { keys: "Shift + Tab", action: "反向循環，同樣被限制在對話框內。" },
                { keys: "Esc", action: "關閉對話框，焦點回到原本的觸發元素。" },
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
                  value: "dialog",
                  purpose: "由 <dialog> 元素隱含提供，不需另外書寫。",
                },
                {
                  attr: "aria-modal",
                  value: "true",
                  purpose: "由 showModal() 隱含提供，告訴輔助科技背景內容暫時不可用。",
                },
                {
                  attr: "aria-labelledby",
                  value: "標題元素的 id",
                  purpose: "讓對話框的 accessible name 取自可見標題，兩者不會不一致。",
                },
                {
                  attr: "aria-label",
                  value: "關閉",
                  purpose: "關閉鈕內只有圖示，需要文字名稱才有可用的按鈕標籤。",
                },
                {
                  attr: "aria-hidden",
                  value: "true",
                  purpose: "頂部橘色裝飾條與關閉鈕圖示都是純視覺，不應進入無障礙樹。",
                },
              ]}
            />
          ),
        },
        {
          id: "screen-reader",
          title: "螢幕閱讀器預期行為",
          content: (
            <ScreenReaderNotes
              nvda={[
                "刪除這筆紀錄？ 對話方塊",
                "刪除後無法復原，確定要繼續嗎？",
                "取消 按鈕",
              ]}
              voiceOver={[
                "刪除這筆紀錄？，網頁對話方塊",
                "刪除後無法復原，確定要繼續嗎？",
                "取消，按鈕",
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
                  note: "標題以 aria-labelledby 與對話框關聯，而不是只在視覺上靠近。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
                },
                {
                  id: "2.1.1",
                  name: "鍵盤",
                  level: "A",
                  note: "開啟、操作、關閉全程可用鍵盤完成，不依賴滑鼠點擊遮罩。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard",
                },
                {
                  id: "2.1.2",
                  name: "沒有鍵盤陷阱",
                  level: "A",
                  note: "焦點雖然被限制在對話框內，但 Esc 一定能離開，不構成陷阱。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap",
                },
                {
                  id: "2.4.3",
                  name: "焦點順序",
                  level: "A",
                  note: "開啟時焦點進入對話框，關閉時回到觸發它的按鈕。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order",
                },
                {
                  id: "2.4.7",
                  name: "焦點可見",
                  level: "AA",
                  note: "對話框內每個可聚焦元素都有橘色 focus ring。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible",
                },
                {
                  id: "4.1.2",
                  name: "名稱、角色、值",
                  level: "A",
                  note: "role=dialog、accessible name、aria-modal 皆由平台或明寫屬性提供。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value",
                },
              ]}
            />
          ),
        },
        {
          id: "code",
          title: "程式碼",
          content: <CodeBlock code={USAGE} label="Dialog 使用範例程式碼" />,
        },
      ]}
    />
  )
}
