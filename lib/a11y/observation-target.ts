/** 同源嵌入 Demo 的 >>> 分隔符只供教學觀察器使用，不是 CSS 語法。 */
export function resolveObservation(selector: string): { target: HTMLElement | null; documents: Document[] } {
  const parts = selector.split(/\s*>>>\s*/)
  let root = document
  const documents = [root]
  for (const frameSelector of parts.slice(0, -1)) {
    const frame = root.querySelector<HTMLIFrameElement>(frameSelector)
    try {
      const next = frame?.tagName === "IFRAME" ? frame.contentDocument : null
      if (!next) return { target: null, documents }
      root = next
      documents.push(root)
    } catch {
      return { target: null, documents }
    }
  }
  return { target: root.querySelector<HTMLElement>(parts[parts.length - 1]), documents }
}
