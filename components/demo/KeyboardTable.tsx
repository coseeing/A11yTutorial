import { Table } from "@/components/Table/Table"

export type KeyboardRow = {
  /** 按鍵，例如 "Esc"、"Tab"、"Shift + Tab" */
  keys: string
  action: string
}

const COLUMNS = [
  { key: "keys", label: "按鍵", width: "18rem" },
  { key: "action", label: "行為" },
]

export function KeyboardTable({ rows }: { rows: KeyboardRow[] }) {
  return (
    <Table
      columns={COLUMNS}
      rows={rows.map((row) => ({
        keys: (
          <kbd className="typography-strong2 inline-block rounded-8 border border-bg-warm-gray bg-bg-light-off-white px-8 py-4 font-mono text-teal-700">
            {row.keys}
          </kbd>
        ),
        action: row.action,
      }))}
    />
  )
}
