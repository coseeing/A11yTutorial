"use client"

import { Button } from "@/components/Button/Button"
import { Tooltip } from "@/components/Tooltip/Tooltip"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"


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


      <A11yTree
        latch
        selector="#tooltip-demo button"
        hint="觀察對象：觸發按鈕。"
      />
    </div>
  )
}
