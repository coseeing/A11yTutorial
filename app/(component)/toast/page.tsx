import type { Metadata } from "next"
import { AriaTable } from "@/components/demo/AriaTable"
import { CodeBlock } from "@/components/demo/CodeBlock"
import { DemoPage } from "@/components/demo/DemoPage"
import { KeyboardTable } from "@/components/demo/KeyboardTable"
import { WcagList } from "@/components/demo/WcagList"
import { ToastDemo } from "./ToastDemo"

export const metadata: Metadata = {
  title: "Toast — A11y Tutorial",
  description:
    "不中斷目前操作的輕量通知，含 accessibility tree、常見硬傷與 WCAG 對應。",
}

const USAGE = `import { Toast, ToastRegion } from "@/components/Toast/Toast"

function SaveProfile() {
  const [message, setMessage] = useState<string | null>(null)
  const dismiss = useCallback(() => setMessage(null), [])

  return (
    <>
      <Button onClick={() => setMessage("個人資料已更新")}>儲存</Button>

      {/*
        容器一律渲染，即使沒有訊息 —— live region 要先存在，
        之後塞進去的文字才算是「變化」而被播報。
        位置放中央下方，不要貼右上或右下角。
      */}
      <ToastRegion>
        {message ? (
          <Toast
            message={message}
            // null 代表不自動消失。自動消失是時間限制，要能關掉（SC 2.2.1）
            duration={5000}
            onDismiss={dismiss}
          />
        ) : null}
      </ToastRegion>
    </>
  )
}`

// 中文散文一律寫成字串常數再以 {} 插入，不要直接當 JSX 子節點跨行書寫 ——
// JSX 會把跨行的文字用一個空格接起來，中文句子中間就會多出一個空格。

const WHEN_TO_USE_INTRO =
  "Toast 是低干擾、溫和型的通知：純資訊告知、不需要使用者立刻採取行動、用來交代操作結果或狀態更新。常見於「已加入購物車」「已從收藏中移除」「已將檔案移至垃圾桶」這類成功提示。"

const BOUNDARIES = [
  {
    name: "Toast",
    role: "role=status",
    text: "不打斷。等使用者當下的播報結束才開口，焦點留在原處。",
  },
  {
    name: "Alert",
    role: "role=alert",
    text: "插話。立刻打斷當下的播報，但仍不搶焦點。留給真的需要馬上知道的事。",
  },
  {
    name: "Dialog",
    role: "role=dialog",
    text: "強制回應。把焦點拉過去、鎖在裡面，不處理就走不了。",
  },
]

const WHEN_TO_USE_COST =
  "選錯的代價是真實的：以「登入」為例，若登入成功後網頁刷新、原本的按鈕消失、焦點被重置，而回饋只有一個三秒就消失的 Toast —— 螢幕閱讀器使用者很可能完全不知道自己到底登入成功了沒有。那種情境需要的是會中斷流程的回饋，不是 Toast。"

const PITFALLS = [
  {
    title: "自動消失太快",
    text: "一般 Toast 三到五秒就消失。對閱讀速度較慢、用螢幕放大鏡逐區掃視、或正在聽其他內容的人來說往往不夠。若 Toast 裡還有動作按鈕，更來不及按。自動消失是一種時間限制，要能關掉、調整或延長。",
  },
  {
    title: "邊角盲區",
    text: "低視能或使用螢幕放大鏡的人，視野受限在畫面中央。躲在右上角或右下角的 Toast 他們根本看不到 —— 不是沒注意到，是不在視野裡。",
  },
  {
    title: "額外動作按鈕",
    text: "Toast 出現時焦點仍在原處，使用者要走很多步才到得了裡面的「復原」按鈕；按完之後更難回到原本的位置。需要動作的訊息，本來就不該用 Toast 說。真的要放，至少不要讓它自動消失。",
  },
]

const PANEL = "rounded-24 border border-bg-warm-gray bg-neutral-white p-24 tablet:p-32"

function WhenToUse() {
  return (
    <div className={`typography-body1 flex flex-col gap-16 text-teal-700 ${PANEL}`}>
      <p className="m-0">{WHEN_TO_USE_INTRO}</p>
      <p className="m-0">它與另外兩個元件的分界很清楚：</p>
      <ul className="m-0 flex list-none flex-col gap-12 p-0">
        {BOUNDARIES.map((b) => (
          <li
            key={b.name}
            className="rounded-16 border border-bg-warm-gray bg-bg-light-off-white px-20 py-16"
          >
            <strong>{b.name}</strong>
            <span className="font-mono text-teal-300">（{b.role}）</span> —— {b.text}
          </li>
        ))}
      </ul>
      <p className="m-0">{WHEN_TO_USE_COST}</p>
    </div>
  )
}

function Pitfalls() {
  return (
    <div className={`typography-body1 flex flex-col gap-16 text-teal-700 ${PANEL}`}>
      {PITFALLS.map((item) => (
        <div key={item.title}>
          <h3 className="typography-strong1 m-0 mb-8 text-teal-700">{item.title}</h3>
          <p className="m-0">{item.text}</p>
        </div>
      ))}
    </div>
  )
}

export default function ToastPage() {
  return (
    <DemoPage
      title="Toast"
      sections={[
        { id: "demo", title: "Demo 與 Accessibility Tree", content: <ToastDemo /> },
        { id: "position", title: "它該用在什麼時候", content: <WhenToUse /> },
        { id: "pitfalls", title: "三個常見硬傷", content: <Pitfalls /> },
        {
          id: "keyboard",
          title: "鍵盤操作",
          content: (
            <KeyboardTable
              rows={[
                {
                  keys: "（無）",
                  action:
                    "Toast 出現時不移動焦點、不中斷使用者當下的動作。這是它與 Dialog 的根本分界。",
                },
                {
                  keys: "Tab",
                  action:
                    "可以走到關閉鈕，但那是一段很長的路 —— 焦點還在你剛才操作的地方。正因如此，Toast 裡不該放重要的動作。",
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
                  value: "status",
                  purpose:
                    "承載訊息的容器。隱含 aria-live=polite 與 aria-atomic=true，會等使用者當下的播報結束才開口 —— 這正是「不強制中斷」的技術實現。",
                },
                {
                  attr: "（時機）",
                  value: "動態更新",
                  purpose:
                    "role=status 播報的是內容的變化。容器要先在 DOM 裡，訊息在同一個節點內更新；整個容器被換掉時，部分螢幕閱讀器會當成新節點而不播報。",
                },
                {
                  attr: "（名稱）",
                  value: "無",
                  purpose:
                    "status 的 nameFrom 只有 author，名稱不從內容取得，所以 Accessibility Tree 上的 Name 永遠是空的。這不是缺漏。",
                },
                {
                  attr: "aria-label",
                  value: "關閉通知",
                  purpose: "關閉鈕只有圖示，需要文字名稱才有可用的按鈕標籤。",
                },
                {
                  attr: "（對照）",
                  value: "role=alert",
                  purpose:
                    "需要立刻知道的事用 alert（隱含 assertive），它會插話。Toast 的定位是不插話，所以用 status。",
                },
                {
                  attr: "aria-hidden",
                  value: "true",
                  purpose: "關閉鈕的圖示是純視覺，名稱已由 aria-label 提供。",
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
                  note: "讓使用者知道內容中的重要變化，而不必中斷手上的工作。訊息出現時網頁不跳轉、不刷新，鍵盤焦點留在原地 —— 這三件事同時成立才算數。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages",
                },
                {
                  id: "2.2.1",
                  name: "時間可調整",
                  level: "A",
                  note: "自動消失是時間限制。使用者必須能關閉、調整或延長它，才有足夠時間讀完。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable",
                },
                {
                  id: "2.2.4",
                  name: "中斷",
                  level: "AAA",
                  note: "通知不能過於頻繁 —— 連續跳出的 Toast 對視覺或認知障礙使用者是實質的妨礙。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/interruptions",
                },
                {
                  id: "3.2.1",
                  name: "取得焦點",
                  level: "A",
                  note: "Toast 出現時不得移動焦點，使用者手上的操作不能被搶走。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/on-focus",
                },
                {
                  id: "2.4.7",
                  name: "焦點可見",
                  level: "AA",
                  note: "關閉鈕有橘色 focus ring。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible",
                },
              ]}
            />
          ),
        },
        { id: "code", title: "程式碼", content: <CodeBlock code={USAGE} label="Toast 使用範例程式碼" /> },
      ]}
    />
  )
}
