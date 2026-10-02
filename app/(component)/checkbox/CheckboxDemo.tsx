"use client"

import { useId, useState } from "react"
import { Checkbox } from "@/components/Checkbox/Checkbox"
import { ControlGroup } from "@/components/ControlGroup/ControlGroup"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"

const CHANNELS = ["電子郵件", "簡訊", "站內通知"] as const


export function CheckboxDemo() {
  const [selected, setSelected] = useState<string[]>(["電子郵件"])
  const baseId = useId()
  const hintId = `${baseId}-hint`

  const allChecked = selected.length === CHANNELS.length
  const someChecked = selected.length > 0 && !allChecked

  return (
    <div className="flex flex-col gap-24">
      <DemoStage id="checkbox-demo" className="flex-col items-stretch gap-16">
        <ControlGroup
          label="通知方式"
          description="至少選擇一種，否則我們無法通知你。"
        >
          <div id="checkbox-demo-all" className="border-b border-bg-warm-gray pb-12">
            <Checkbox
              id={`${baseId}-all`}
              label="全部選取"
              checked={allChecked}
              indeterminate={someChecked}
              onChange={(e) => setSelected(e.target.checked ? [...CHANNELS] : [])}
            />
          </div>

          {CHANNELS.map((channel) => (
            <Checkbox
              key={channel}
              id={`${baseId}-${channel}`}
              label={channel}
              checked={selected.includes(channel)}
              onChange={(e) =>
                setSelected((prev) =>
                  e.target.checked ? [...prev, channel] : prev.filter((c) => c !== channel),
                )
              }
            />
          ))}
        </ControlGroup>

        <div>
          <Checkbox
            id={`${baseId}-newsletter`}
            label="訂閱電子報"
            aria-describedby={hintId}
          />
          <p id={hintId} className="typography-body2 mt-4 ms-24 text-teal-300">
            每週最多一封，隨時可取消。
          </p>
        </div>
      </DemoStage>


      <A11yTree
        selector="#checkbox-demo-all input"
      />

      <A11yTree
        selector="#checkbox-demo fieldset"
      />
    </div>
  )
}
