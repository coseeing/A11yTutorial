"use client"

import { useId, useState } from "react"
import { ControlGroup } from "@/components/ControlGroup/ControlGroup"
import { Switch } from "@/components/Switch/Switch"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"

export function SwitchDemo() {
  const [dark, setDark] = useState(false)
  const [sync, setSync] = useState(true)
  const hintId = useId()

  return (
    <div className="flex flex-col gap-24">
      <DemoStage id="switch-demo" className="flex-col items-stretch gap-16">
        <ControlGroup
          label="外觀設定"
          description="這些設定會立即生效，不需要按儲存。"
        >
          <div id="switch-demo-dark">
            <Switch label="深色模式" checked={dark} onCheckedChange={setDark} />
          </div>
          <div>
            <Switch
              label="同步到所有裝置"
              checked={sync}
              onCheckedChange={setSync}
              aria-describedby={hintId}
            />
            <p id={hintId} className="typography-body2 mt-4 ms-[5.6rem] text-teal-300">
              需要登入同一個帳號。
            </p>
          </div>
        </ControlGroup>
      </DemoStage>

      <p className="typography-body2 m-0 text-teal-300">
        用 Tab 移到開關，按空白鍵切換。注意標籤在切換前後完全不變 —— 標籤說的是「這個設定是
        什麼」，不是「下一次按下去會怎樣」。
      </p>

      <A11yTree
        selector="#switch-demo-dark input"
        hint="觀察對象：深色模式開關。"
      />

      <A11yTree
        selector="#switch-demo fieldset"
        hint="觀察對象：外層的群組本身。它的名稱來自 legend，說明來自 aria-describedby。"
      />
    </div>
  )
}
