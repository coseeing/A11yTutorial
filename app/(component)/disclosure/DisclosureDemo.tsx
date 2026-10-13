"use client"

import { Disclosure } from "@/components/Disclosure/Disclosure"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"

export function DisclosureDemo() {
  return (
    <div className="flex flex-col gap-24">
      <DemoStage id="disclosure-demo" className="flex-col items-stretch">
        {/* 預設展開，內容面板才不會從空狀態開始。按一下就能看到它離開無障礙樹。 */}
        <Disclosure label="運費怎麼計算？" defaultOpen>
          單筆滿一千元免運，未滿則收取八十元。離島與偏遠地區另計。
        </Disclosure>
      </DemoStage>


      {/*
        兩個面板對應 Disclosure 的兩個部分：控制按鈕，以及它管的那段內容。
        第二個面板是刻意放的對照組 —— 內容區沒有任何角色，算出來是 generic。
        Accordion 的面板是 role=region、名字借自標題按鈕；Disclosure 沒有那一層，
        因為它不是一組同構的題目，不需要出現在地標清單裡。
      */}
      <A11yTree
        selector="#disclosure-demo button"
        hint="觀察對象：Disclosure 的控制按鈕。"
      />

      <A11yTree
        selector="#disclosure-demo button + div"
        hint="觀察對象：按鈕管的那段內容。"
      />
    </div>
  )
}
