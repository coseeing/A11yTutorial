"use client"

import { Button } from "@/components/Button/Button"
import { Tooltip } from "@/components/Tooltip/Tooltip"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"

const HINT =
  "用 Tab 移到按鈕上，或把指標移過去，提示就會出現。試試把指標從按鈕移到提示上 —— 它不會消失，那是 WCAG 1.4.13 要求的「可停留」。按 Escape 可以關掉提示，而且焦點不會離開按鈕。"

export function TooltipDemo() {
  return (
    <div className="flex flex-col gap-24">
      <DemoStage id="tooltip-demo" className="justify-center py-48">
        <Tooltip content="至少 12 個字元，且不能與前三次使用過的密碼相同。">
          <Button variant="small" theme="greenStroke">
            密碼規則
          </Button>
        </Tooltip>
      </DemoStage>

      <p className="typography-body2 m-0 text-teal-300">{HINT}</p>

      <A11yTree
        latch
        selector="#tooltip-demo button"
        hint="觀察對象：觸發按鈕。提示顯示時，它的 Description 會變成提示的內容 —— 提示本身不在無障礙樹中獨立存在，它是附加在按鈕上的說明。"
      />
    </div>
  )
}
