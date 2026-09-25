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

      <p className="typography-body2 m-0 text-teal-300">
        注意焦點：按下按鈕後焦點仍留在按鈕上，警示不會把你拉走。空的 live region
        從頁面載入就在 DOM 裡 —— 那正是它之後能被播報的前提。
      </p>

      <A11yTree
        selector="#alert-demo [role='alert']"
        hint="觀察對象：live region 容器。它在有訊息與沒訊息時都留在無障礙樹中，而且 Name 永遠是空的 —— role=alert 的名稱只能由作者指定，不從內容取得。被播報的是內容的「變化」，不是名稱。"
      />
    </div>
  )
}
