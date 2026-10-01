import { cn } from "@/lib/cn"

// Table — from Figma "Coseeing" → 芳名錄 Event list. White rounded panel with a
// bold header row, hairline divider, and plain body rows. Semantic <table> for
// screen readers; wide content scrolls inside the panel.
//
// 原版的儲存格是固定 3.8rem 高、垂直置中、沒有上下留白 —— 那是為單行短內容設計的。
// 這個站拿它放整段說明文字，一換行就會兩列貼在一起，讀的人分不出哪一行屬於哪一列。
// 所以改成：用上下 padding 取代固定高度、靠上對齊（第一欄的標籤才會與說明的第一行
// 切齊）、列與列之間加一條髮絲線。

export type TableColumn = {
  key: string
  label: React.ReactNode
  /** Fixed column width (e.g. "9.6rem"); omit for a fluid column. */
  width?: string
}

type TableProps = {
  columns: TableColumn[]
  rows: Record<string, React.ReactNode>[]
  className?: string
}

export function Table({ columns, rows, className }: TableProps) {
  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-[1.2rem] border border-neutral-light-gray bg-neutral-white px-20 py-16 desktop:px-32 desktop:py-24",
        className,
      )}
    >
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-neutral-light-gray">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                style={col.width ? { width: col.width } : undefined}
                className="typography-strong1 pb-12 pr-40 text-left align-bottom text-teal-700 last:pr-0"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-neutral-light-gray last:border-b-0">
              {columns.map((col, c) => (
                <td
                  key={col.key}
                  className={cn(
                    "typography-body2 py-16 pr-40 align-top last:pr-0",
                    c === 0 ? "text-teal-500" : "text-teal-700",
                  )}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
