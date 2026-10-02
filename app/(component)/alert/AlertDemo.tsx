"use client"

import { useState } from "react"
import { Alert } from "@/components/Alert/Alert"
import { Button } from "@/components/Button/Button"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"

export function AlertDemo() {
  const [message, setMessage] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-24">
      <DemoStage id="alert-demo" className="flex-col items-stretch gap-16">
        <div className="flex flex-wrap gap-12">
          <Button
            variant="small"
            theme="light"
            onClick={() => setMessage("儲存失敗：連線逾時，請再試一次。")}
          >
            觸發警示
          </Button>
          <Button variant="small" theme="greenStroke" onClick={() => setMessage(null)}>
            清除
          </Button>
        </div>
        <Alert message={message} />
      </DemoStage>


      <A11yTree
        selector="#alert-demo [role='alert']"
      />
    </div>
  )
}
