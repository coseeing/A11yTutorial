import type { Metadata } from "next"
import { AriaTable } from "@/components/demo/AriaTable"
import { CodeBlock } from "@/components/demo/CodeBlock"
import { DemoPage } from "@/components/demo/DemoPage"
import { KeyboardTable } from "@/components/demo/KeyboardTable"
import { WcagList } from "@/components/demo/WcagList"
import { BreadcrumbDemo } from "./BreadcrumbDemo"

export const metadata: Metadata = {
  title: "Breadcrumb — A11y Tutorial",
  description:
    "標示目前頁面在網站層級中的位置，含 accessibility tree、鍵盤操作與 WCAG 對應。",
}

const USAGE = `import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb"

function PageTrail() {
  return (
    <Breadcrumb
      // 地標名稱：頁面上通常不只一個 nav，沒有名稱就分不出誰是誰
      label="麵包屑"
      items={[
        { label: "首頁", href: "/" },
        { label: "元件", href: "/components" },
        // 省略 href 代表這是目前頁面，不做成連結
        { label: "Breadcrumb" },
      ]}
    />
  )
}`

export default function BreadcrumbPage() {
  return (
    <DemoPage
      title="Breadcrumb"
      description="標示目前頁面在網站層級中的位置，並提供回上層的路徑。三條規則撐起整個 pattern：外層是導覽地標、地標要有名稱、目前頁面若是連結要標示出來。"
      sections={[
        { id: "demo", title: "Demo 與 Accessibility Tree", content: <BreadcrumbDemo /> },
        {
          id: "keyboard",
          title: "鍵盤操作",
          content: (
            <KeyboardTable
              rows={[
                { keys: "Tab", action: "依序移到每一層的連結。目前頁面若不是連結則會被跳過。" },
                { keys: "Enter", action: "前往該層。" },
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
                  attr: "（結構）",
                  value: "<nav>",
                  purpose:
                    "Breadcrumb 必須放在導覽地標內，使用者才能從地標清單直接跳進來。用 <nav> 即隱含 navigation 角色。",
                },
                {
                  attr: "aria-label",
                  value: "麵包屑",
                  purpose:
                    "導覽地標必須有名稱。一個頁面通常有主導覽、頁尾導覽、麵包屑數個 nav，沒有名稱在地標清單裡就是好幾個「導覽」，分不出誰是誰。",
                },
                {
                  attr: "aria-current",
                  value: "page",
                  purpose:
                    "標示代表目前頁面的那個連結。若目前頁面不做成連結，可以省略 —— 不能點本身已經說明它就是當下所在。",
                },
                {
                  attr: "aria-hidden",
                  value: "true",
                  purpose: "層級之間的斜線是純視覺，唸出來只會干擾。",
                },
                {
                  attr: "（結構）",
                  value: "<ol>",
                  purpose: "層級是有先後的，用有序清單而非 <ul>，順序資訊才進得了無障礙樹。",
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
                  note: "以 nav 地標與有序清單表達「這是一組有先後的路徑」，而不是只靠視覺上的斜線。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
                },
                {
                  id: "2.4.6",
                  name: "標題與標籤",
                  level: "AA",
                  note: "導覽地標的名稱要能說明它是什麼，讓地標清單裡的每一項都可辨識。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels",
                },
                {
                  id: "2.4.8",
                  name: "所在位置",
                  level: "AAA",
                  note: "Breadcrumb 本身就是在回答「我在網站的哪裡」，aria-current 讓這個答案也進到無障礙樹。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/location",
                },
                {
                  id: "4.1.2",
                  name: "名稱、角色、值",
                  level: "A",
                  note: "導覽地標具備名稱，目前頁面以 aria-current=page 表達狀態。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value",
                },
              ]}
            />
          ),
        },
        { id: "code", title: "程式碼", content: <CodeBlock code={USAGE} label="Breadcrumb 使用範例程式碼" /> },
      ]}
    />
  )
}
