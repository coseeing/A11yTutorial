"use client"

import { useEffect, useRef, useState } from "react"
import { computeA11yNode, type A11yNode } from "./compute-node"

export type UseA11yNodeOptions = {
  /**
   * 目標離開無障礙樹之後，保留最後一次觀察到的值。
   *
   * 只適用於目標會整個離開 DOM 的元件（Dialog、Toast、Tooltip）：這類元件關閉
   * 之後畫面上就沒有值可看，但那組值往往正是讀者要看的東西。一直存在於頁面上的
   * 元件（Button、Checkbox）不要開，維持即時才誠實。
   */
  latch?: boolean
}

export type A11yObservation = {
  node: A11yNode | null
  /** true 代表 node 是保留下來的舊值，目標當下已不在無障礙樹中。 */
  stale: boolean
}

const EMPTY: A11yObservation = { node: null, stale: false }

/**
 * 持續觀察一個 CSS selector 指到的元素在無障礙樹中的樣貌。
 *
 * 用 selector 而非 ref：目標可能在關閉時整個離開 DOM，selector 每次重算都重新
 * 解析，ref 則會留住已失效的節點。
 */
export function useA11yNode(
  selector: string,
  { latch = false }: UseA11yNodeOptions = {},
): A11yObservation {
  const [observation, setObservation] = useState<A11yObservation>(EMPTY)
  // 最後一次真的觀察到的值。latch 關閉時不會被讀取，但仍持續更新，這樣中途
  // 打開 latch 也不會拿到空的歷史。
  const lastSeen = useRef<A11yNode | null>(null)

  useEffect(() => {
    let frame = 0
    // 換了觀察對象，先前的歷史就不再屬於它。
    lastSeen.current = null

    const recompute = () => {
      const next = computeA11yNode(document.querySelector(selector))

      let result: A11yObservation
      if (next) {
        lastSeen.current = next
        result = { node: next, stale: false }
      } else if (latch && lastSeen.current) {
        result = { node: lastSeen.current, stale: true }
      } else {
        result = EMPTY
      }

      // 只在值真的變了才 setState，否則 MutationObserver 的每次觸發都會重繪。
      setObservation((prev) => (sameObservation(prev, result) ? prev : result))
    }

    // MutationObserver 在同一批 DOM 變動中會連續觸發多次，用 rAF 收斂成一次計算。
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(recompute)
    }

    recompute()

    // 觀察整個 body 而不是目標本身：目標可能還不存在，無從觀察起。
    const observer = new MutationObserver(schedule)
    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    })

    // 原生 checkbox 的 checked 是 property 不是 attribute，MutationObserver
    // 看不到，所以另外聽這幾個事件。
    const events = ["input", "change", "click", "keyup", "focusin", "focusout"] as const
    for (const type of events) document.addEventListener(type, schedule, true)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      for (const type of events) document.removeEventListener(type, schedule, true)
    }
  }, [selector, latch])

  return observation
}

function sameObservation(a: A11yObservation, b: A11yObservation): boolean {
  return a.stale === b.stale && sameNode(a.node, b.node)
}

function sameNode(a: A11yNode | null, b: A11yNode | null): boolean {
  if (a === null || b === null) return a === b
  return (
    a.role === b.role &&
    a.name === b.name &&
    a.description === b.description &&
    a.status.length === b.status.length &&
    a.status.every((s, i) => s === b.status[i])
  )
}
