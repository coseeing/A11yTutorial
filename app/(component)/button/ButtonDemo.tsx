"use client"

import { useId, useState } from "react"
import { Button } from "@/components/Button/Button"
import { PlusIcon } from "@/components/Icons/Icons"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"

// ButtonDemo — Button 的四種樣態，每一種各自釘住一條難度 2 的規則：
// 名稱來源、toggle 狀態、停用的兩種做法、補充說明。

export function ButtonDemo() {
  const [muted, setMuted] = useState(false)
  const hintId = useId()

  return (
    <div className="flex flex-col gap-24">
      <DemoStage id="button-demo" className="flex-col items-stretch gap-24">
        <div className="flex flex-col gap-8">
          <p className="typography-strong2 m-0 text-teal-300">名稱來自文字內容 / 來自 aria-label</p>
          <div className="flex flex-wrap items-center gap-12">
            <Button variant="small" theme="light">
              儲存變更
            </Button>
            <Button variant="small" theme="greenStroke" aria-label="關閉">
              <PlusIcon className="rotate-45" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <p className="typography-strong2 m-0 text-teal-300">
            Toggle：名稱固定不變，狀態由 aria-pressed 表達
          </p>
          <div>
            <Button
              id="button-demo-toggle"
              variant="small"
              theme={muted ? "light" : "greenStroke"}
              pressed={muted}
              onClick={() => setMuted((v) => !v)}
            >
              靜音
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <p className="typography-strong2 m-0 text-teal-300">停用的兩種做法</p>
          <div className="flex flex-wrap items-center gap-12">
            <Button variant="small" theme="light" disabled>
              原生 disabled
            </Button>
            <Button
              id="button-demo-soft-disabled"
              variant="small"
              theme="light"
              disabled
              keepFocusable
              aria-describedby={hintId}
            >
              aria-disabled
            </Button>
          </div>
          <p id={hintId} className="typography-body2 m-0 text-teal-300">
            請先勾選同意條款才能送出。
          </p>
        </div>
      </DemoStage>


      <A11yTree
        selector="#button-demo-toggle"
      />

      <A11yTree
        selector="#button-demo-soft-disabled"
      />
    </div>
  )
}
