"use client"

import { Button } from "@/components/Button/Button"
import { Tooltip } from "@/components/Tooltip/Tooltip"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"

export function TooltipDemo() {
  return (
    <div className="flex flex-col gap-24">
      <DemoStage id="tooltip-demo" className="flex-col items-stretch">
        <div className="w-full pr-40 pb-[12rem]">
        <Tooltip className="w-full justify-center [&_[role=tooltip]]:top-[calc(100%+1.6rem)] [&_[role=tooltip]]:bottom-auto [&_[role=tooltip]]:max-w-full" content="至少 12 個字元，且不能與前三次使用過的密碼相同。">
          <Button variant="small" theme="greenStroke">
            密碼規則
          </Button>
        </Tooltip>
        </div>
      </DemoStage>

      {/* 兩個面板對應 Tooltip 的兩個角色：被描述的觸發元素 → 提示本身。 */}
      <A11yTree latch selector="#tooltip-demo button" hint="觀察對象：觸發按鈕。" />

      <A11yTree
        latch
        selector="#tooltip-demo [role='tooltip']"
        markerPosition="rail-right"
        fallback={{
          role: "tooltip",
          name: "至少 12 個字元，且不能與前三次使用過的密碼相同。",
        }}
        hint="觀察對象：提示本身。"
      />
    </div>
  )
}
