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

      <p className="typography-body2 m-0 text-teal-300">
        用 Tab 移進來，焦點會落在已選取的那一項；接著改用方向鍵在選項之間移動 ——
        移動的同時就完成選取。再按一次 Tab 會整組離開，不會逐一走過每個選項。
      </p>

      <A11yTree
        selector="#radio-demo fieldset"
        hint="觀察對象：外層的單選群組。"
      />

      <A11yTree
        selector="#radio-demo input:checked"
        hint="觀察對象：目前被選取的那一個選項。用方向鍵換一項，這裡會跟著換。"
      />
    </div>
  )
}
