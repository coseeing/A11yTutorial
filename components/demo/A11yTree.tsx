"use client"

import { useA11yNode } from "@/lib/a11y/use-a11y-node"
import { A11yTreeView } from "./A11yTreeView"

// A11yTree — 這個站的核心面板：把一個 DOM 元素在無障礙樹中的樣貌攤開成
// Role / Status / Name / Description 四列，並隨互動即時更新，讓「螢幕閱讀器會怎麼描述這個
// 東西」變成看得見的東西。
//
// 這裡只做組合：觀察在 useA11yNode，呈現在 A11yTreeView。

type A11yTreeProps = {
  /** 要觀察的元素，在 document 範圍內以 querySelector 解析。 */
  selector: string
  /**
   * 目標離開無障礙樹後保留最後一次的值。用於 Dialog、Toast 這類會整個離開 DOM
   * 的元件；長駐頁面的元件不要開。
   */
  latch?: boolean
  /** 指認這個面板在觀察哪個元素。 */
  hint?: React.ReactNode
  className?: string
}

export function A11yTree({ selector, latch = false, hint, className }: A11yTreeProps) {
  const { node, stale } = useA11yNode(selector, { latch })

  return <A11yTreeView node={node} stale={stale} hint={hint} className={className} />
}
