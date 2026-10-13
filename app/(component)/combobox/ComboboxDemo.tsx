"use client"

import { useState } from "react"
import { Combobox } from "@/components/Combobox/Combobox"
import { DialogCombobox } from "@/components/Combobox/DialogCombobox"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"

// ComboboxDemo — 同一個 pattern 的兩種彈出內容。
//
// 上面那個是 listbox 型：可以打字篩選，建議值出現後第一個自動成為選取狀態。
// 下面那個是對話框型：按下去開一個強制回應對話框，確定或取消之後焦點都回到
// 輸入框。
//
// 兩者的差別寫在 aria-haspopup 上，而那是 property 不是 state ——
// 它不隨操作改變，所以不會出現在 Status 列，細節看 ARIA 屬性那一節。
// 面板上看得見的差別是第二個觀察對象的角色：listbox 對 dialog。

const CITIES = [
  "臺北市",
  "新北市",
  "桃園市",
  "臺中市",
  "臺南市",
  "高雄市",
  "基隆市",
  "新竹市",
]

const DATES = ["11 月 1 日（週六）", "11 月 8 日（週六）", "11 月 15 日（週六）"]

export function ComboboxDemo() {
  const [city, setCity] = useState("")
  const [date, setDate] = useState("")

  return (
    <div className="flex flex-col gap-32">
      <div className="flex flex-col gap-24">
        <DemoStage id="combobox-demo" className="flex-col items-stretch">
          <div className="max-w-[32rem]">
            <Combobox
              label="縣市"
              options={CITIES}
              value={city}
              onValueChange={setCity}
              placeholder="開始輸入或按 ↓ 展開"
            />
          </div>
        </DemoStage>

        {/* 三個面板由外而內：輸入元件 → 彈出清單 → 自動選取的建議值。 */}
        <A11yTree
          selector="#combobox-demo [role='combobox']"
          hint="觀察對象：Combobox 的輸入元件。"
        />

        <A11yTree
          latch
          selector="#combobox-demo [role='listbox']"
          hint="觀察對象：彈出的建議清單。"
        />

        <A11yTree
          latch
          selector="#combobox-demo [role='option'][aria-selected='true']"
          hint="觀察對象：目前自動選取的建議值。"
        />
      </div>

      <div className="flex flex-col gap-24">
        <DemoStage id="combobox-dialog-demo" className="flex-col items-stretch">
          <div className="max-w-[32rem]">
            <DialogCombobox
              label="出發日期"
              options={DATES}
              value={date}
              onValueChange={setDate}
            />
          </div>
        </DemoStage>

        {/* 對話框型的兩個面板：輸入元件 → 它開出來的對話框。 */}
        <A11yTree
          selector="#combobox-dialog-demo [role='combobox']"
          hint="觀察對象：對話框型的輸入元件。"
        />

        <A11yTree
          latch
          selector="dialog[open]"
          hint="觀察對象：它開出來的對話框。"
        />
      </div>
    </div>
  )
}
