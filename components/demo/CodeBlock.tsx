// CodeBlock — 可捲動的程式碼片段。
//
// tabIndex={0} 是必要的：一個會橫向捲動的區域若無法用鍵盤聚焦，只有滑鼠使用者
// 看得到被裁掉的內容（WCAG 2.1.1）。有了焦點就需要可辨識的名稱，所以要求 label。
export function CodeBlock({ code, label }: { code: string; label: string }) {
  return (
    <pre
      tabIndex={0}
      role="region"
      aria-label={label}
      className="typography-body2 m-0 overflow-x-auto rounded-16 border border-bg-warm-gray bg-teal-700 p-24 font-mono text-bg-light-off-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
    >
      <code>{code}</code>
    </pre>
  )
}
