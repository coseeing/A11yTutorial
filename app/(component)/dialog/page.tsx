import type { Metadata } from "next"
import { AriaTable } from "@/components/demo/AriaTable"
import { CodeBlock } from "@/components/demo/CodeBlock"
import { DemoPage } from "@/components/demo/DemoPage"
import { KeyboardTable } from "@/components/demo/KeyboardTable"
import { WcagList } from "@/components/demo/WcagList"
import { DialogDemo } from "./DialogDemo"

export const metadata: Metadata = {
  title: "Dialog — A11y Tutorial",
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
                  attr: "aria-describedby",
                  value: "說明元素的 id",
                  purpose:
                    "讓說明文字跟著名稱一起播報；少了它，那句警告只有往下瀏覽才讀得到。只適用於簡短說明 —— 若內容是需要逐項導覽的清單、表格或多段文字，不能用它一次關聯。",
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
                {
                  attr: "（結構）",
                  value: "元素位置",
                  purpose:
                    "操作對話框所需的所有元素都必須是 role=dialog 的子階層。放在對話框外的按鈕，輔助科技使用者到不了。",
                },
                {
                  attr: "（結構）",
                  value: "背景遮蔽",
                  purpose:
                    "開啟時背景內容必須在視覺上被遮蔽或淡化，並且無法操作。這裡由 ::backdrop 的半透明深綠與模糊達成，不可操作則由 showModal() 保證。",
                },
                {
                  attr: "（舊式）",
                  value: "aria-hidden=true",
                  purpose:
                    "在不支援 <dialog> 的環境改用舊式做法時，要在每個背景層元素上各自設定 aria-hidden=true，而且對話框本身絕不能落在任何 aria-hidden=true 元素的子階層裡 —— 否則整個對話框從無障礙樹上消失。",
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
