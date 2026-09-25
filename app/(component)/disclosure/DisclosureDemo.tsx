"use client"

import { Disclosure } from "@/components/Disclosure/Disclosure"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"

export function DisclosureDemo() {
  return (
    <div className="flex flex-col gap-24">
      <DemoStage id="disclosure-demo" className="flex-col items-stretch">
        <Disclosure label="運費怎麼計算？">
          單筆滿一千元免運，未滿則收取八十元。離島與偏遠地區另計。
        </Disclosure>
      </DemoStage>

      <p className="typography-body2 m-0 text-teal-300">
        用 Tab 移到按鈕，按 Enter 或空白鍵切換，下方的 Status 會在 collapsed 與 expanded
        之間改變。
      </p>

      <A11yTree
        selector="#disclosure-demo button"
        hint="觀察對象：Disclosure 的控制按鈕。"
      />
    </div>
  )
}
