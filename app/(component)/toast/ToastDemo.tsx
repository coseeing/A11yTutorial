"use client"

import { useCallback, useState } from "react"
import { Button } from "@/components/Button/Button"
import { Switch } from "@/components/Switch/Switch"
import { Toast, ToastRegion } from "@/components/Toast/Toast"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"

// 中文散文一律寫成字串常數再以 {} 插入，不要直接當 JSX 子節點跨行書寫 ——
// JSX 會把跨行的文字用一個空格接起來，中文句子中間就會多出空格。
const HINT =
  "按下「儲存」之後注意兩件事：焦點仍留在按鈕上，Toast 不會把你拉過去；以及關掉自動消失之後，訊息會一直留著等你讀完。訊息用「主詞 + 動作結果」的結構，一行說完。"

export function ToastDemo() {
  const [message, setMessage] = useState<string | null>(null)
  const [autoDismiss, setAutoDismiss] = useState(true)

  // onDismiss 進了 Toast 的 effect 依賴，每次 render 都換一個新的函式會讓計時器
  // 不斷重設，訊息永遠不會消失。
  const dismiss = useCallback(() => setMessage(null), [])

  return (
    <div className="flex flex-col gap-24">
      <DemoStage id="toast-demo" className="flex-col items-stretch gap-16">
        <div className="flex flex-wrap items-center gap-16">
          <Button
            variant="small"
            theme="light"
            onClick={() => setMessage("個人資料已更新")}
          >
            儲存
          </Button>
          <Switch
            label="5 秒後自動消失"
            checked={autoDismiss}
            onCheckedChange={setAutoDismiss}
          />
        </div>

        {/*
          刻意放在範例區塊的下方中央，而不是整個視窗的右下角：低視能或使用螢幕
          放大鏡的人視野集中在畫面中央，邊角的通知他們根本看不到。
        */}
        <ToastRegion className="min-h-[5.2rem]">
          {message ? (
            <Toast
              message={message}
              duration={autoDismiss ? 5000 : null}
              onDismiss={dismiss}
            />
          ) : null}
        </ToastRegion>
      </DemoStage>

      <p className="typography-body2 m-0 text-teal-300">{HINT}</p>

      <A11yTree
        selector="#toast-demo [role='status']"
        hint="觀察對象：live region 容器。有沒有訊息它都在無障礙樹中，Name 永遠是空的 —— status 的名稱不從內容取得，被播報的是內容的變化。"
      />
    </div>
  )
}
