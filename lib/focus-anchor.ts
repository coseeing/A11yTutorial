import type { MouseEvent } from "react"

/** 保留連結語意與網址片段，同時將鍵盤焦點移到目的地。 */
export function focusAnchor(event: MouseEvent<HTMLElement>, targetId: string, fragmentId = targetId) {
  if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
  const target = document.getElementById(targetId)
  if (!target) return
  event.preventDefault()
  const fragment = `#${fragmentId}`
  if (window.location.hash !== fragment) {
    try {
      window.history.pushState(null, "", fragment)
    } catch {
      // 部分 file:// 環境限制 History API，使用原生片段導覽仍可完成跳轉。
      window.location.hash = fragment
    }
  }
  target.focus({ preventScroll: true })
  target.scrollIntoView?.({ block: "start", inline: "nearest" })
}
