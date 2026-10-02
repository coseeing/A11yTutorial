"use client"

import { Tabs } from "@/components/Tabs/Tabs"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"

export function TabsDemo() {
  return (
    <div className="flex flex-col gap-24">
      <DemoStage id="tabs-demo" className="flex-col items-stretch gap-12">
        <h3 id="tabs-demo-heading" className="typography-strong1 m-0 text-teal-700">
          帳號設定
        </h3>
        <Tabs
          labelledBy="tabs-demo-heading"
          items={[
            {
              label: "總覽",
              content:
                "這個面板只有純文字，沒有任何可聚焦的元素 —— 所以面板本身帶著 tabindex=0，鍵盤使用者才到得了這段內容。",
            },
            {
              label: "通知",
              content:
                "切換分頁時，只有作用中的面板留在無障礙樹裡，其餘的以 hidden 隱藏。",
            },
            {
              label: "紀錄",
              content: (
                <p className="m-0">
                  這個面板裡有一個
                  <a
                    href="https://www.w3.org/WAI/ARIA/apg/patterns/tabs/"
                    className="mx-4 rounded-8 text-teal-PRIMARY underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
                  >
                    連結
                  </a>
                  ，所以面板不再多佔一個停留點。
                </p>
              ),
            },
          ]}
        />
      </DemoStage>


      <A11yTree
        selector="#tabs-demo [role='tab'][aria-selected='true']"
        hint="觀察對象：目前作用中的分頁。"
      />

      <A11yTree
        selector="#tabs-demo [role='tabpanel']:not([hidden])"
        hint="觀察對象：目前顯示中的面板。"
      />
    </div>
  )
}
