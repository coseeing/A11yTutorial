"use client"

import { useState } from "react"
import { Listbox } from "@/components/Listbox/Listbox"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"

// ListboxDemo — 分群組的單選清單。
//
// 選項分成兩群，示範「群組也要有名字」與「每個群組至少要有一個選項」這兩條。
// 群組標題是靜態文字而不是選項，方向鍵不會停在上面。

const GROUPS = [
  {
    label: "宅配",
    options: [
      { value: "home-standard", label: "一般宅配（2 到 3 個工作日）" },
      { value: "home-express", label: "急件宅配（隔日到貨）" },
    ],
  },
  {
    label: "店到店",
    options: [
      { value: "store-a", label: "超商取貨" },
      { value: "store-b", label: "門市自取" },
    ],
  },
]

export function ListboxDemo() {
  const [value, setValue] = useState("home-standard")

  return (
    <div className="flex flex-col gap-24">
      <DemoStage id="listbox-demo" className="flex-col items-stretch gap-12">
        <h3 id="listbox-demo-heading" className="typography-strong1 m-0 text-teal-700">
          出貨方式
        </h3>
        <Listbox
          groups={GROUPS}
          value={value}
          onValueChange={setValue}
          labelledBy="listbox-demo-heading"
        />
      </DemoStage>

      {/* 三個面板由外而內：listbox 容器 → 群組 → 目前選取的選項。 */}
      <A11yTree
        selector="#listbox-demo [role='listbox']"
        hint="觀察對象：外層的清單容器。"
      />

      <A11yTree
        selector="#listbox-demo [role='group']"
        hint="觀察對象：第一個選項群組。"
      />

      <A11yTree
        selector="#listbox-demo [role='option'][aria-selected='true']"
        hint="觀察對象：目前選取的選項。"
      />
    </div>
  )
}
