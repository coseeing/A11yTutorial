import { Table } from "@/components/Table/Table"

export type AriaRow = {
  /** 屬性名稱，例如 "aria-modal" */
  attr: string
  /** 本元件實際使用的值 */
  value: string
  purpose: string
}

const COLUMNS = [
  { key: "attr", label: "屬性", width: "18rem" },
  { key: "value", label: "值", width: "12rem" },
  { key: "purpose", label: "用途" },
]

export function AriaTable({ rows }: { rows: AriaRow[] }) {
  return (
    <Table
      columns={COLUMNS}
      rows={rows.map((row) => ({
        attr: <code className="font-mono text-teal-PRIMARY">{row.attr}</code>,
        value: <code className="font-mono text-teal-700">{row.value}</code>,
        purpose: row.purpose,
      }))}
    />
  )
}
