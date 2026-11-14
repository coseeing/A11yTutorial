"use client"

import { useState } from "react"
import { Combobox } from "@/components/Combobox/Combobox"
import { DialogCombobox } from "@/components/Combobox/DialogCombobox"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"
import { useDemoHost, DemoWorkspace } from "@/components/demo/DemoWorkspace"
import { DemoViewport } from "@/components/demo/DemoViewport"
import { Button } from "@/components/Button/Button"
import { focusAnchor } from "@/lib/focus-anchor"

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

function DateDemo({ value, onValueChange }: { value: string; onValueChange: (value: string) => void }) {
  const workspace = useDemoHost()
  return <DemoViewport id="combobox-dialog-viewport" title="Combobox 日期對話框局部示範視窗">
    <div className="w-full pl-40">
      <DialogCombobox label="出發日期" options={DATES} value={value} onValueChange={onValueChange}
        dialogClassName="[&>div]:p-16 [&_fieldset]:p-12"
        afterActions={<Button variant="small" theme="greenStroke" onClick={(event) => {
          const card = workspace?.observations.find((item) => item.marker === "B")?.cardId
          if (card) focusAnchor(event, card)
        }}>查看 Accessibility Tree</Button>} />
    </div>
  </DemoViewport>
}

export function ComboboxDemo() {
  const [city, setCity] = useState("")
  const [date, setDate] = useState("")

  return (
    <div className="flex flex-col gap-32">
      <p className="typography-body2 m-0 rounded-16 border border-bg-warm-gray bg-neutral-white p-16 text-teal-300">清單型與對話框型分成兩組示範，各自對照自己的 Accessibility Tree。每組標記都從 A 開始。</p>
      <DemoWorkspace title="Demo 1：清單型 Combobox" headingLevel={3} showGuidance={false}>
        <section aria-labelledby="combobox-tree-1-heading" className="flex flex-col gap-24">
          <h3 id="combobox-tree-1-heading" className="typography-headline3 m-0 text-teal-700">Accessibility Tree：Demo 1</h3>
        <DemoStage id="combobox-demo" className="flex-col items-stretch">
          <div className="w-full max-w-[32rem] pl-40 pr-40 [&_button]:top-24 [&_[role=listbox]]:static [&_[role=listbox]]:mt-8 [&_[role=option]]:pr-40">
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
          markerPosition="outside-left"
          hint="觀察對象：Combobox 的輸入元件。"
        />

        <A11yTree
          latch
          selector="#combobox-demo [role='listbox']"
          markerPosition="outside-left"
          fallback={{ role: "listbox", name: "縣市建議" }}
          hint="觀察對象：彈出的建議清單。"
        />

        <A11yTree
          latch
          selector="#combobox-demo [role='option'][aria-selected='true']"
          markerPosition="rail-right"
          fallback={{ role: "option", name: "臺北市", status: ["aria-selected=true"] }}
          hint="觀察對象：目前自動選取的建議值。"
        />
        </section>
      </DemoWorkspace>

      <DemoWorkspace title="Demo 2：對話框型 Combobox" headingId="combobox-demo-2-heading" headingLevel={3} showGuidance={false}>
        <section aria-labelledby="combobox-tree-2-heading" className="flex flex-col gap-24">
          <h3 id="combobox-tree-2-heading" className="typography-headline3 m-0 text-teal-700">Accessibility Tree：Demo 2</h3>
        <DemoStage id="combobox-dialog-demo" className="flex-col items-stretch p-0 tablet:p-0">
          <DateDemo value={date} onValueChange={setDate} />
        </DemoStage>

        <p role="note" className="typography-body2 m-0 rounded-16 border border-bg-warm-gray bg-neutral-white p-16 text-teal-300">為方便對照，日期對話框只在嵌入的 Demo 視窗內開啟，外層教學頁仍可閱讀。框內仍使用真正的模態對話框，支援焦點移入、Esc 關閉與返回輸入框；「查看 Accessibility Tree」是教學用導覽。</p>
        {/* 對話框型的兩個面板：輸入元件 → 它開出來的對話框。 */}
        <A11yTree
          selector="#combobox-dialog-viewport >>> [role='combobox']"
          markerPosition="outside-left"
          hint="觀察對象：對話框型的輸入元件。"
        />

        <A11yTree
          latch
          selector="#combobox-dialog-viewport >>> dialog[open]"
          fallback={{
            role: "dialog",
            name: "選擇出發日期",
            description: "選好之後按確定，按取消則保留原本的日期。",
          }}
          hint="觀察對象：它開出來的對話框。"
        />
        </section>
      </DemoWorkspace>
    </div>
  )
}
