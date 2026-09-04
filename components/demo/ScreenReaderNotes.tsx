// ScreenReaderNotes — 兩款螢幕閱讀器的預期播報內容並列。
//
// 分開列而不是寫一段「螢幕閱讀器會唸出…」，是因為 NVDA 與 VoiceOver 的實際
// 行為經常不同，混為一談會讓讀者以為只有一種正確答案。
function Column({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="flex-1">
      <h3 className="typography-strong1 m-0 mb-12 text-teal-700">{title}</h3>
      <ul className="m-0 flex list-none flex-col gap-8 p-0">
        {lines.map((line, i) => (
          <li
            key={i}
            className="typography-body2 rounded-8 border border-bg-warm-gray bg-bg-light-off-white px-16 py-12 text-teal-700"
          >
            「{line}」
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ScreenReaderNotes({
  nvda,
  voiceOver,
}: {
  nvda: string[]
  voiceOver: string[]
}) {
  return (
    <div className="flex flex-col gap-24 tablet:flex-row">
      <Column title="NVDA（Windows）" lines={nvda} />
      <Column title="VoiceOver（macOS）" lines={voiceOver} />
    </div>
  )
}
