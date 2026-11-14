"use client"

import { useState } from "react"
import { RadioGroup } from "@/components/RadioGroup/RadioGroup"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"

export function RadioDemo() {
  const [shipping, setShipping] = useState<string | null>("standard")

  return (
    <div className="flex flex-col gap-24">
      <DemoStage id="radio-demo" className="flex-col items-stretch">
        <RadioGroup
          className="pl-48"
          label="配送方式"
          description="離島地區僅提供標準宅配。"
          value={shipping}
          onValueChange={setShipping}
          options={[
            { value: "standard", label: "標準宅配" },
            { value: "express", label: "隔日到貨", description: "加收 120 元。" },
            { value: "pickup", label: "超商取貨" },
          ]}
        />
      </DemoStage>


      <A11yTree
        selector="#radio-demo fieldset"
        hint="觀察對象：外層的單選群組。"
      />

      <A11yTree
        selector="#radio-demo input[value='standard']"
        markerPosition="outside-left"
        hint="觀察對象：固定觀察第一個選項「標準宅配」。選擇其他配送方式後，B 的 checked 會變成 false，名稱與標記位置保持不變。"
      />
    </div>
  )
}
