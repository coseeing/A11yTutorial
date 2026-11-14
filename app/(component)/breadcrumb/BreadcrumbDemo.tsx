"use client"

import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb"
import { appPath } from "@/lib/app-path"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"
import { useState } from "react"

export function BreadcrumbDemo() {
  const [message, setMessage] = useState("")
  const [observedIndex, setObservedIndex] = useState(2)
  return (
    <div className="flex flex-col gap-24">
      <DemoStage id="breadcrumb-demo" className="flex-col items-stretch">
        <div onClick={(event) => {
          const link = event.target instanceof Element ? event.target.closest("a") : null
          if (!link) return
          event.preventDefault()
          setObservedIndex(Array.from(link.closest("nav")!.querySelectorAll("a")).indexOf(link))
          setMessage(`已示範啟用「${link.textContent}」連結；為方便對照，留在本頁。`)
        }}>
        <Breadcrumb
          className="rounded-16 p-12 pr-40 [&_ol]:rounded-8 [&_ol]:p-8"
          items={[
            { label: "首頁", href: appPath("/") },
            { label: "元件", href: appPath("/") },
            { label: "Breadcrumb", href: appPath("/breadcrumb") },
          ]}
        />
        </div>
        <p role="status" className="typography-body3 m-0 text-teal-300">{message || "可用滑鼠或 Enter 啟用連結，觀察 C 的名稱與狀態。"}</p>
        <p role="note" className="typography-body3 m-0 text-teal-300">示範說明：這裡的連結不會實際跳頁，目前頁面仍是 Breadcrumb。點選其他連結只會切換 C 的觀察對象，不會改變目前頁面。</p>
      </DemoStage>

      <p className="typography-body2 m-0 rounded-16 border border-bg-warm-gray bg-neutral-white p-16 text-teal-300">同一組麵包屑有不同層級：A 是整組導覽區（nav），B 是裡面的路徑清單（ol），C 是你最後啟用的連結，預設觀察目前頁面。此範例攔下跳頁，方便持續對照；目前頁面仍為 Breadcrumb。</p>
      {/* 三個面板由外而內：導覽地標 → 路徑清單 → 代表目前頁面的那一項。 */}
      <A11yTree
        selector="#breadcrumb-demo nav"
        hint="觀察對象：A，外層 nav 導覽地標，代表整組麵包屑。"
      />

      <A11yTree
        selector="#breadcrumb-demo ol"
        hint="觀察對象：B，nav 裡的 ol 路徑清單，依順序包含各層項目。"
      />

      <A11yTree
        selector={`#breadcrumb-demo li:nth-child(${observedIndex + 1}) a`}
        markerPosition="rail-right"
        hint="觀察對象：你最後啟用的連結；只有 Breadcrumb 連結具有 aria-current=page，啟用其他連結不會改變目前頁面。"
      />
    </div>
  )
}
