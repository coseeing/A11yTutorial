"use client"

import type { A11yNode } from "@/lib/a11y/compute-node"
import { useMemo } from "react"
import { useA11yNode } from "@/lib/a11y/use-a11y-node"
import { A11yTreeView } from "./A11yTreeView"
import { useDemoHost, useObservationPair } from "./DemoWorkspace"

// A11yTree — 這個站的核心面板：把一個 DOM 元素在無障礙樹中的樣貌攤開成
// Role / Status / Name / Description 四列，並隨互動即時更新，讓「螢幕閱讀器會怎麼描述這個
// 東西」變成看得見的東西。
//
// 這裡只做組合：觀察在 useA11yNode，呈現在 A11yTreeView。

/**
 * 尚未觀察到目標時先顯示的值。
 *
 * Dialog、Tooltip、Combobox 的彈出清單這些元件，在使用者動手之前根本不在 DOM 裡，
 * 面板只能顯示空狀態 —— 讀者得先猜到要按哪裡，才看得到這一頁在講什麼。
 *
 * 這是這份面板唯一手寫的值，所以它有走鐘的風險：改了對話框標題卻忘了改這裡，
 * 面板就會在開啟前說謊。防線是測試 —— 每個用到 fallback 的頁面都有一條測試
 * 真的去開啟那個元件，再比對算出來的值與這裡宣告的完全一致。
 * 見 components/demo/A11yTree.fallback.test.tsx。
 */
export type A11yFallback = {
  role: string
  name: string
  /** 省略視為沒有描述。 */
  description?: string
  /** 省略視為沒有狀態。 */
  status?: string[]
  /** 省略視為沒有 aria-roledescription。 */
  roleDescription?: string
}

type A11yTreeProps = {
  /** 要觀察的元素，在 document 範圍內以 querySelector 解析。 */
  selector: string
  /**
   * 目標離開無障礙樹後保留最後一次的值。用於 Dialog、Toast 這類會整個離開 DOM
   * 的元件；長駐頁面的元件不要開。
   */
  latch?: boolean
  /** 還沒觀察到目標時先顯示的值。見 A11yFallback。 */
  fallback?: A11yFallback
  /** 指認這個面板在觀察哪個元素。 */
  hint?: React.ReactNode
  className?: string
  /** 固定配對字母；省略時由元件頁依觀察卡順序分配。 */
  marker?: string
  /** 小型控制項可將圖形標記放在左側保留區，避免蓋住內容。 */
  markerPosition?: "outside-left" | "rail-right"
  /** 只調整視覺框選目標；語意資料仍取自 selector。 */
  outlineSelector?: string
}

export function A11yTree({
  selector,
  latch = false,
  fallback,
  hint,
  className,
  marker,
  markerPosition,
  outlineSelector,
}: A11yTreeProps) {
  const { node, stale } = useA11yNode(selector, { latch })

  // 真的觀察到的值永遠優先。fallback 只在「還沒觀察過」時頂著 —— 包含 latch
  // 保留下來的舊值，那也是真的觀察過的。
  // 依值穩定 fallback，避免外層訂閱觀察狀態後因物件參照改變而反覆更新。
  const fallbackStatus = JSON.stringify(fallback?.status ?? [])
  const shown = useMemo(() => node ?? toNode(fallback), [node, fallback?.role, fallback?.name, fallback?.description, fallback?.roleDescription, fallbackStatus])
  const pair = useObservationPair(selector, shown, marker, markerPosition, outlineSelector)
  const workspace = useDemoHost()
  const title = pair ? shown ? `${shown.role}${shown.name ? `「${shown.name}」` : "（無名稱）"}` : "等待觀察目標" : undefined

  return (
    <A11yTreeView
      node={shown}
      title={title}
      pair={pair}
      announceUpdates={!workspace}
      stale={stale}
      pending={!node && shown !== null}
      hint={hint}
      className={className}
    />
  )
}

function toNode(fallback: A11yFallback | undefined): A11yNode | null {
  if (!fallback) return null
  return {
    role: fallback.role,
    roleDescription: fallback.roleDescription ?? "",
    name: fallback.name,
    description: fallback.description ?? "",
    status: fallback.status ?? [],
  }
}
