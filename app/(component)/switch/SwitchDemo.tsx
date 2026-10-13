"use client"

import { useState } from "react"
import { ControlGroup } from "@/components/ControlGroup/ControlGroup"
import { Switch } from "@/components/Switch/Switch"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"

// SwitchDemo — 一組立即生效的開關。
//
// 三個開關放在同一個 fieldset 裡，示範「群組也要有名字」這件事：螢幕閱讀器
// 進到群組時先唸出「通知方式，群組」，使用者才知道接下來這三個是一組的。
//
// 標籤在切換前後完全一樣。標籤描述的是這個設定是什麼，不是下一次按下去會發生
// 什麼 —— 寫成「開啟推播通知」的話，開啟之後那句話就變成謊話了。

const ITEMS = [
  { key: "push", label: "推播通知" },
  { key: "email", label: "電子郵件" },
  { key: "sms", label: "簡訊" },
] as const

type Key = (typeof ITEMS)[number]["key"]

const GROUP_DESCRIPTION = "變更後立即生效，不需要另外送出。"

export function SwitchDemo() {
  const [on, setOn] = useState<Record<Key, boolean>>({
    push: true,
    email: false,
    sms: false,
  })

  return (
    <div className="flex flex-col gap-24">
      <DemoStage id="switch-demo" className="flex-col items-stretch">
        <ControlGroup label="通知方式" description={GROUP_DESCRIPTION} className="w-full">
          {ITEMS.map((item) => (
            <Switch
              key={item.key}
              label={item.label}
              checked={on[item.key]}
              onCheckedChange={(next) => setOn((prev) => ({ ...prev, [item.key]: next }))}
            />
          ))}
        </ControlGroup>
      </DemoStage>

      {/* 兩個面板由外而內：群組容器 → 群組內的第一個開關。 */}
      <A11yTree selector="#switch-demo fieldset" hint="觀察對象：外層的開關群組。" />

      <A11yTree
        selector="#switch-demo input[role='switch']"
        hint="觀察對象：第一個開關。"
      />
    </div>
  )
}
