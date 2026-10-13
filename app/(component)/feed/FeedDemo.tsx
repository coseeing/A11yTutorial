"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/Button/Button"
import { Feed, type FeedArticle } from "@/components/Feed/Feed"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"

// FeedDemo — 可以載入更多文章的文章串流。
//
// 按下「載入更多」後 feed 會有一秒的 aria-busy=true，面板上看得到那個切換。
// 這一秒是刻意留的：真實情境裡是網路往返的時間，而 aria-busy 的用途正是讓
// 輔助科技在這段期間先不要報讀半成品。

const BATCHES: FeedArticle[][] = [
  [
    {
      id: "feed-post-1",
      title: "焦點不該憑空消失",
      meta: "10 月 2 日 · 3 分鐘",
      body: "按下關閉後，焦點要回到打開它的那顆按鈕。少了這一步，鍵盤使用者會被丟回頁面開頭，得重新按十幾次 Tab 才回到原處。",
    },
    {
      id: "feed-post-2",
      title: "顏色不是唯一的訊息載體",
      meta: "9 月 28 日 · 4 分鐘",
      body: "紅色邊框表示欄位有錯，但看不出顏色的人只會看到一個普通的輸入框。錯誤訊息要用文字說出來，並與欄位產生程式可判斷的關聯。",
    },
  ],
  [
    {
      id: "feed-post-3",
      title: "自動播放必須可以停下來",
      meta: "9 月 20 日 · 2 分鐘",
      body: "持續移動的內容會讓部分使用者無法閱讀頁面其他部分。超過五秒的動態內容需要提供暫停的方法。",
    },
    {
      id: "feed-post-4",
      title: "標題是給人用的目錄",
      meta: "9 月 15 日 · 5 分鐘",
      body: "螢幕閱讀器使用者常以標題列表瀏覽頁面。標題層級若只是為了字級大小而挑，那份目錄就會錯亂。",
    },
  ],
]

export function FeedDemo() {
  const [visible, setVisible] = useState(1)
  const [busy, setBusy] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // 離開頁面時把還沒觸發的 timer 收掉，避免對已卸載的元件設定狀態。
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [],
  )

  const articles = BATCHES.slice(0, visible).flat()
  const hasMore = visible < BATCHES.length

  const loadMore = () => {
    if (busy || !hasMore) return
    // 先標 busy，等內容到齊才一次性放進 DOM —— 這正是 aria-busy 要表達的事。
    setBusy(true)
    timer.current = setTimeout(() => {
      setVisible((n) => n + 1)
      setBusy(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-24">
      <DemoStage id="feed-demo" className="flex-col items-stretch gap-16">
        <h3 id="feed-demo-heading" className="typography-strong1 m-0 text-teal-700">
          最新文章
        </h3>

        <Feed
          articles={articles}
          labelledBy="feed-demo-heading"
          busy={busy}
          afterId="feed-demo-more"
        />

        <div>
          <Button
            id="feed-demo-more"
            variant="small"
            theme="greenStroke"
            disabled={!hasMore}
            onClick={loadMore}
          >
            {hasMore ? "載入更多" : "沒有更多文章了"}
          </Button>
        </div>
      </DemoStage>

      {/* 兩個面板由外而內：feed 容器 → 第一篇文章。 */}
      <A11yTree selector="#feed-demo [role='feed']" hint="觀察對象：外層的文章串流。" />

      <A11yTree selector="#feed-demo [role='article']" hint="觀察對象：第一篇文章。" />
    </div>
  )
}
