"use client"

import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"

export function BreadcrumbDemo() {
  return (
    <div className="flex flex-col gap-24">
      <DemoStage id="breadcrumb-demo" className="flex-col items-stretch">
        <Breadcrumb
          items={[
            { label: "首頁", href: "/" },
            { label: "元件", href: "/" },
            { label: "Breadcrumb", href: "/breadcrumb" },
          ]}
        />
      </DemoStage>

      <p className="typography-body2 m-0 text-teal-300">
        這個範例刻意把目前頁面做成連結，才看得到 aria-current。下方觀察的是最後一項。
      </p>

      <A11yTree
        selector="#breadcrumb-demo [aria-current]"
        hint="觀察對象：代表目前頁面的那個連結。"
      />

      <A11yTree
        selector="#breadcrumb-demo nav"
        hint="觀察對象：外層的導覽地標本身。"
      />
    </div>
  )
}
