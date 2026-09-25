import type { Metadata } from "next"
import { AriaTable } from "@/components/demo/AriaTable"
import { CodeBlock } from "@/components/demo/CodeBlock"
import { DemoPage } from "@/components/demo/DemoPage"
import { KeyboardTable } from "@/components/demo/KeyboardTable"
import { WcagList } from "@/components/demo/WcagList"
import { AlertDemo } from "./AlertDemo"

export const metadata: Metadata = {
  title: "Alert — A11y Tutorial",
  description:
    "不移動焦點、由輔助科技即時播報的狀態訊息，含 accessibility tree 與 WCAG 對應。",
}

const USAGE = `import { Alert } from "@/components/Alert/Alert"

function SaveForm() {
  const [error, setError] = useState<string | null>(null)

  return (
    <form onSubmit={...}>
      {/*
        容器一律渲染，即使沒有訊息 —— live region 要先存在，
        之後塞進去的文字才算是「變化」而被播報。
      */}
      <Alert message={error} />
      <Button type="submit">儲存</Button>
    </form>
  )
}`

export default function AlertPage() {
  return (
    <DemoPage
      title="Alert"
      sections={[
        { id: "demo", title: "Demo 與 Accessibility Tree", content: <AlertDemo /> },
        {
          id: "keyboard",
          title: "鍵盤操作",
          content: (
            <KeyboardTable
              rows={[
                {
                  keys: "（無）",
                  action:
                    "Alert 不接收焦點也沒有自己的鍵盤操作。它出現時不得移動焦點或中斷使用者當下的動作 —— 這正是它與 Alert Dialog 的分界。",
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
                  value: "alert",
                  purpose:
                    "承載訊息的容器。它隱含 aria-live=assertive 與 aria-atomic=true，會打斷使用者當下的播報 —— 留給真正需要立刻知道的事。",
                },
                {
                  attr: "（時機）",
                  value: "動態更新",
                  purpose:
                    "role=alert 播報的是內容的變化。頁面載入時就帶著文字的 alert 不會被唸出來；整個容器被換掉時，部分螢幕閱讀器也會當成新節點而不播報。容器要先在 DOM 裡，訊息在同一個節點內更新。",
                },
                {
                  attr: "（對照）",
                  value: "role=status",
                  purpose:
                    "不急的訊息用 status（隱含 aria-live=polite），它會等使用者當下的播報結束才開口。成功、已儲存這類訊息屬於這一類。",
                },
                {
                  attr: "（名稱）",
                  value: "無",
                  purpose:
                    "role=alert 的 nameFrom 只有 author —— 名稱不會從內容取得，所以 Accessibility Tree 上的 Name 永遠是空的。這不是缺漏：被播報的是內容的變化本身，不需要先報一個名稱。",
                },
                {
                  attr: "aria-hidden",
                  value: "true",
                  purpose: "紅點是純視覺，訊息的嚴重性已由文字本身表達。",
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
                  id: "4.1.3",
                  name: "狀態訊息",
                  level: "AA",
                  note: "狀態訊息要能在不取得焦點的前提下被輔助科技知曉。role=alert 正是為此存在。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages",
                },
                {
                  id: "3.2.1",
                  name: "取得焦點",
                  level: "A",
                  note: "警示出現時不得移動焦點，使用者手上的操作不能被搶走。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/on-focus",
                },
                {
                  id: "2.2.3",
                  name: "沒有時間限制",
                  level: "AAA",
                  note: "警示不應自動消失；若採限時關閉，必須保留足夠時間讓人察覺並讀完。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/no-timing",
                },
                {
                  id: "2.2.4",
                  name: "中斷",
                  level: "AAA",
                  note: "警示不能過於頻繁 —— 重複播報對視覺或認知障礙使用者是實質的妨礙。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/interruptions",
                },
              ]}
            />
          ),
        },
        { id: "code", title: "程式碼", content: <CodeBlock code={USAGE} label="Alert 使用範例程式碼" /> },
      ]}
    />
  )
}
