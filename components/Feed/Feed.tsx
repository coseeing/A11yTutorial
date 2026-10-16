"use client"

import { useRef } from "react"
import { cn } from "@/lib/cn"

// Feed — 依 W3C ARIA APG 的 Feed Pattern 實作。
//
// Feed 和一般的文章列表差在哪：列表的內容是固定的，Feed 會在使用者捲到底時
// 繼續長出新內容。那個「長出來」的瞬間是整個 pattern 的核心問題 —— 螢幕閱讀器
// 的瀏覽游標正停在某一篇上，底下突然多了五篇，使用者會迷失位置。
//
// 解法有兩層：每篇文章是一個有名字的 article，使用者能以文章為單位跳；載入期間
// 整個 feed 標上 aria-busy，輔助科技先按住不報讀，等載完一次性揭露。
//
// 文章可聚焦（tabindex=0），PageDown / PageUp 才有東西可以落腳。這是 Feed 少數
// 該讓非互動元素接收焦點的場合：使用者要的是「跳到下一篇」，不是跳到下一個連結。

export type FeedArticle = {
  id: string
  title: string
  meta: string
  body: string
}

type FeedProps = {
  articles: FeedArticle[]
  /** 指向可見標題的 id，成為 feed 的無障礙名稱。 */
  labelledBy: string
  /** 載入期間為 true。多步驟的新增或移除要整段包起來，不是每篇切換一次。 */
  busy?: boolean
  /** Ctrl + Home 的落點：feed 之前的那個可聚焦元素。 */
  beforeId?: string
  /** Ctrl + End 的落點：feed 之後的那個可聚焦元素。 */
  afterId?: string
  className?: string
}

export function Feed({
  articles,
  labelledBy,
  busy = false,
  beforeId,
  afterId,
  className,
}: FeedProps) {
  const feedRef = useRef<HTMLDivElement>(null)

  const focusArticle = (offset: number, from: HTMLElement) => {
    const all = Array.from(
      feedRef.current?.querySelectorAll<HTMLElement>('[role="article"]') ?? [],
    )
    const current = all.indexOf(from)
    const next = all[current + offset]
    next?.focus()
  }

  const focusOutside = (id?: string) => {
    if (!id) return
    document.getElementById(id)?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const article = (e.target as HTMLElement).closest<HTMLElement>('[role="article"]')
    if (!article) return

    if (e.ctrlKey && e.key === "Home") {
      e.preventDefault()
      focusOutside(beforeId)
    } else if (e.ctrlKey && e.key === "End") {
      e.preventDefault()
      focusOutside(afterId)
    } else if (e.key === "PageDown") {
      e.preventDefault()
      focusArticle(1, article)
    } else if (e.key === "PageUp") {
      e.preventDefault()
      focusArticle(-1, article)
    }
  }

  return (
    <div
      ref={feedRef}
      role="feed"
      aria-labelledby={labelledBy}
      // 明寫 false 而不是省略，是為了讓檢查工具與讀原始碼的人看得到這個屬性存在。
      //
      // 但它不會出現在 Accessibility Tree 面板的 Status 列：那一列收的是「螢幕
      // 閱讀器會連同角色與名稱一起唸出來的東西」，而 aria-busy=false 時什麼都
      // 不唸（跟 aria-disabled=false 一樣）。所以面板上看到的是載入那一秒冒出
      // aria-busy=true，然後回到「（無狀態）」。
      aria-busy={busy}
      onKeyDown={onKeyDown}
      className={cn("flex flex-col gap-16", className)}
    >
      {articles.map((article, i) => (
        <article
          key={article.id}
          // <article> 的隱含角色已經是 article，這裡明寫是為了讓上面的
          // querySelector 與頁面上的 selector 有一致的鉤子可抓。
          role="article"
          tabIndex={0}
          aria-labelledby={`${article.id}-title`}
          aria-describedby={`${article.id}-body`}
          // 位置與總數：少了它，使用者不知道自己在第幾篇，也不知道還有多少。
          aria-posinset={i + 1}
          aria-setsize={articles.length}
          className="rounded-16 border border-bg-warm-gray bg-neutral-white p-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
        >
          <h4 id={`${article.id}-title`} className="typography-strong1 m-0 text-teal-700">
            {article.title}
          </h4>
          <p className="typography-body3 m-0 mt-4 text-teal-300">{article.meta}</p>
          <p
            id={`${article.id}-body`}
            className="typography-body2 m-0 mt-12 text-teal-700"
          >
            {article.body}
          </p>
        </article>
      ))}
    </div>
  )
}
