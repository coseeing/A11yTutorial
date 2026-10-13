"use client"

import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"
import { LinkedinIcon } from "@/components/Icons/Icons"

// LinkDemo — Link 的三種寫法並排，差別只在「名稱說不說得出目的地」。
//
// 三個觀察對象刻意挑成一組對照：原生連結、只有圖像的連結、以及用 div 加
// role=link 硬做出來的那一種。前兩個在無障礙樹裡長得一樣（role=link 加上有
// 意義的名稱），第三個角色對了但鍵盤到不了 —— 面板看不出這件事，所以鍵盤
// 操作表那一列才是它的重點。

const LINK_CLASS =
  "rounded-8 text-teal-PRIMARY underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"

const APG_LINK_URL = "https://www.w3.org/WAI/ARIA/apg/patterns/link/"

export function LinkDemo() {
  return (
    <div className="flex flex-col gap-24">
      <DemoStage id="link-demo" className="flex-col items-start gap-20">
        <p className="typography-body1 m-0 text-teal-700">
          想知道更多細節，可以讀
          <a id="link-demo-text" href={APG_LINK_URL} className={`mx-4 ${LINK_CLASS}`}>
            APG 的 Link Pattern
          </a>
          。
        </p>

        {/* 圖像連結：名稱只能從 aria-label 來，圖示本身對輔助科技是隱形的。 */}
        <a
          id="link-demo-icon"
          href="https://www.linkedin.com/"
          aria-label="在 LinkedIn 上追蹤我們"
          className={`inline-flex p-4 ${LINK_CLASS}`}
        >
          <LinkedinIcon aria-hidden="true" className="size-24 text-teal-PRIMARY" />
        </a>

        {/* 反例：角色補對了，但沒有 href 也沒有 tabindex，鍵盤永遠到不了。 */}
        <div
          id="link-demo-fake"
          role="link"
          className="typography-body1 cursor-pointer text-teal-PRIMARY underline underline-offset-4"
        >
          用 div 加 role=link 做出來的連結
        </div>
      </DemoStage>

      {/* 三個面板對應三種寫法，由正確到有問題排列。 */}
      <A11yTree selector="#link-demo-text" hint="觀察對象：原生的文字連結。" />

      <A11yTree selector="#link-demo-icon" hint="觀察對象：只有圖像的連結。" />

      <A11yTree selector="#link-demo-fake" hint="觀察對象：用 div 做出來的連結。" />
    </div>
  )
}
