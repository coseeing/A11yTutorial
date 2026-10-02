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


      <A11yTree
        selector="#disclosure-demo button"
      />
    </div>
  )
}
