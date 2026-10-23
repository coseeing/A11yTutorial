import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Table } from "./Table"

const columns = [
  { key: "time", label: "時間" },
  { key: "activity", label: "活動" },
]
const rows = [{ time: "09:00", activity: "報到" }]

describe("Table header semantics", () => {
  it("預設保留表頭語意與欄位關聯", () => {
    render(<Table columns={columns} rows={rows} />)
    const headers = within(screen.getByRole("table")).getAllByRole("columnheader")
    expect(headers).toHaveLength(2)
    headers.forEach((header) => expect(header).toHaveAttribute("scope", "col"))
  })

  it("WAVE 練習明確選用 td 時，標題列沒有表頭語意但仍呈現完整資料", () => {
    render(<Table columns={columns} rows={rows} headerCellAs="td" />)
    const table = screen.getByRole("table")
    expect(within(table).queryByRole("columnheader")).not.toBeInTheDocument()
    expect(table.querySelector("[scope]")).not.toBeInTheDocument()
    expect(within(table).getAllByRole("cell").map((cell) => cell.textContent)).toEqual([
      "時間", "活動", "09:00", "報到",
    ])
  })
})
