"use client"

import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb"
import { appPath } from "@/lib/app-path"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"

export function BreadcrumbDemo() {
  return (
    <div className="flex flex-col gap-24">
      <DemoStage id="breadcrumb-demo" className="flex-col items-stretch">
        <Breadcrumb
          items={[
            { label: "首頁", href: appPath("/") },
            { label: "元件", href: appPath("/") },
            { label: "Breadcrumb", href: appPath("/breadcrumb") },
          ]}
        />
      </DemoStage>


      <A11yTree
        selector="#breadcrumb-demo [aria-current]"
        hint="觀察對象：代表目前頁面的那個連結。"
      />

      <A11yTree
        selector="#breadcrumb-demo nav"
        hint="觀察對象：外層的導覽地標。"
      />
    </div>
  )
}
