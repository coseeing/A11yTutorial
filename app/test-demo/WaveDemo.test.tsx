import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { WaveDemo } from "./WaveDemo"

describe("WAVE 學員檢測頁", () => {
  it("海報刻意缺 alt，裝飾圖片則明確提供空 alt，兩者不可混為一談", () => {
    const { container } = render(<WaveDemo />)
    const poster = container.querySelector("#wave-poster")
    const decoration = container.querySelector("#wave-decoration")
    expect(poster).toBeInstanceOf(HTMLImageElement)
    expect(poster).not.toHaveAttribute("alt")
    expect(decoration).toHaveAttribute("alt", "")
    expect(decoration).not.toHaveAttribute("aria-hidden")
  })

  it("姓名看得見但未與欄位關聯，其他表單欄位仍有名稱", () => {
    render(<WaveDemo />)
    expect(screen.getByText("姓名")).toBeVisible()
    expect(screen.getByRole("textbox", { name: "" })).toHaveAttribute("id", "wave-name")
    expect(screen.queryByLabelText("姓名")).not.toBeInTheDocument()
    expect(screen.getByLabelText("電子信箱")).toHaveAccessibleName("電子信箱")
    expect(screen.getByLabelText("活動關鍵字")).toHaveAccessibleName("活動關鍵字")
  })

  it("只有查詢名額的按鈕刻意沒有名稱，搜尋活動有正確的 ARIA 名稱", () => {
    render(<WaveDemo />)
    const unnamed = screen.getByRole("button", { name: "" })
    expect(unnamed).toHaveAttribute("id", "wave-availability")
    expect(unnamed.querySelector("svg")).toHaveAttribute("aria-hidden", "true")
    expect(screen.getByRole("button", { name: "搜尋活動" })).toHaveAttribute("aria-label", "搜尋活動")
  })

  it("唯一主標題為 h1，報名資格刻意在 h2 之後直接使用 h4", () => {
    const { container } = render(<WaveDemo />)
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1)
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("志工服務日")
    const headings = [...container.querySelectorAll("h1, h2, h3, h4, h5, h6")]
    const eligibility = screen.getByRole("heading", { name: "報名資格", level: 4 })
    expect(headings[headings.indexOf(eligibility) - 1]).toHaveTextContent("參加資訊")
    expect(headings[headings.indexOf(eligibility) - 1].tagName).toBe("H2")
  })

  it("時段表保留完整的行列資料，但刻意不提供任何 th", () => {
    render(<WaveDemo />)
    const table = screen.getByRole("table")
    expect(table.querySelector("th")).not.toBeInTheDocument()
    expect(within(table).getByRole("cell", { name: "時間" })).toBeVisible()
    expect(within(table).getByRole("cell", { name: "活動" })).toBeVisible()
    expect(within(table).getByRole("cell", { name: "地點" })).toBeVisible()
    expect(within(table).getAllByRole("row")).toHaveLength(4)
  })

  it("學員頁不把規則 ID、官方分類或解答混入檢測內容", () => {
    render(<WaveDemo />)
    expect(screen.queryByText(/alt_missing|label_missing|button_empty|heading_skipped|table_layout|alt_null|aria_label/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Errors|Alerts|Features|Structural Elements/)).not.toBeInTheDocument()
  })

  it("搜尋可以由 Enter 送出，清楚回報有結果與無結果", async () => {
    const user = userEvent.setup()
    render(<WaveDemo />)
    const query = screen.getByLabelText("活動關鍵字")
    await user.type(query, "志工{Enter}")
    expect(screen.getByText("找到 1 場活動：志工服務日。可繼續閱讀下方活動資訊。")).toBeVisible()
    await user.clear(query)
    await user.type(query, "不存在的活動{Enter}")
    expect(screen.getByText("沒有符合的活動，請試試「志工」或「服務」。")).toBeVisible()
  })

  it("查詢名額與模擬報名可操作，重設會清除資料與回饋", async () => {
    const user = userEvent.setup()
    render(<WaveDemo />)
    await user.click(screen.getByRole("button", { name: "" }))
    expect(screen.getByText("目前尚有 12 個名額。")).toBeVisible()
    await user.type(screen.getByRole("textbox", { name: "" }), "學員")
    await user.type(screen.getByLabelText("電子信箱"), "learner@example.com")
    await user.click(screen.getByRole("button", { name: "送出報名" }))
    expect(screen.getByText("已完成模擬報名，資料沒有送出或儲存。")).toBeVisible()
    await user.click(screen.getByRole("button", { name: "重新填寫" }))
    expect(screen.getByRole("textbox", { name: "" })).toHaveValue("")
    expect(screen.getByLabelText("電子信箱")).toHaveValue("")
    expect(screen.queryByText("已完成模擬報名，資料沒有送出或儲存。")).not.toBeInTheDocument()
    expect(screen.queryByText("目前尚有 12 個名額。")).not.toBeInTheDocument()
  })
})
