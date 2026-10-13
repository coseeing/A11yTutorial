import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { Grid } from "./Grid"

const COLUMNS = [
  { key: "name", label: "檔案名稱" },
  { key: "owner", label: "擁有者" },
]

const ROWS = [
  { id: "row-1", cells: { name: "報告.pdf", owner: "設計組" } },
  { id: "row-2", cells: { name: "規格.xlsx", owner: "前端組" } },
]

function Harness() {
  return (
    <>
      <h2 id="heading">共用檔案</h2>
      <p id="note">以方向鍵移動。</p>
      <Grid columns={COLUMNS} rows={ROWS} labelledBy="heading" describedBy="note" />
    </>
  )
}

/** 目前唯一 tabindex=0 的那一格 —— roving tabindex 的落點。 */
function focusable() {
  return document.querySelector('[role="grid"] [tabindex="0"]')
}

describe("Grid", () => {
  // APG-GRID-018 / 021 / 022：容器角色、名稱與補充說明
  it("容器是具名且有補充說明的 grid", () => {
    render(<Harness />)
    const grid = screen.getByRole("grid", { name: "共用檔案" })
    expect(grid).toHaveAttribute("aria-describedby", "note")
    expect(grid.tagName).toBe("TABLE")
  })

  // 整個 Grid 只佔一個 Tab 停留點：方向鍵換掉那個 0，不會多出第二個。
  it("只有一格的 tabindex 是 0", async () => {
    const user = userEvent.setup()
    render(<Harness />)
    const grid = screen.getByRole("grid", { name: "共用檔案" })

    expect(grid.querySelectorAll('[tabindex="0"]')).toHaveLength(1)

    await user.tab()
    await user.keyboard("{ArrowRight}")

    expect(grid.querySelectorAll('[tabindex="0"]')).toHaveLength(1)
    expect(focusable()).toHaveTextContent("設計組")
  })

  it("標頭列也走得到，使用者才能回頭確認欄位名稱", async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await user.tab()
    await user.keyboard("{ArrowUp}")

    expect(focusable()).toHaveTextContent("檔案名稱")
    expect(focusable()).toHaveAttribute("role", "columnheader")
  })

  it("方向鍵到邊界就停住，不繞到另一端", async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await user.tab()
    await user.keyboard("{ArrowLeft}{ArrowLeft}")
    expect(focusable()).toHaveTextContent("報告.pdf")

    await user.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}")
    expect(focusable()).toHaveTextContent("規格.xlsx")
  })

  it("Home 與 End 在列內移動，加上 Ctrl 則跳到整個 Grid 的頭尾", async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await user.tab()
    await user.keyboard("{End}")
    expect(focusable()).toHaveTextContent("設計組")

    await user.keyboard("{Home}")
    expect(focusable()).toHaveTextContent("報告.pdf")

    await user.keyboard("{Control>}{End}{/Control}")
    expect(focusable()).toHaveTextContent("前端組")

    await user.keyboard("{Control>}{Home}{/Control}")
    expect(focusable()).toHaveTextContent("檔案名稱")
  })

  // APG-GRID-024：選取狀態放在列上，且選取不會把焦點搬走
  it("空白鍵選取整列，焦點留在原處", async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await user.tab()
    const before = focusable()
    await user.keyboard(" ")

    const selected = screen.getAllByRole("row").filter(
      (row) => row.getAttribute("aria-selected") === "true",
    )
    expect(selected).toHaveLength(1)
    expect(within(selected[0]).getByText("報告.pdf")).toBeInTheDocument()
    expect(focusable()).toBe(before)

    // 再按一次取消選取。
    await user.keyboard(" ")
    expect(
      screen.getAllByRole("row").filter((row) => row.getAttribute("aria-selected") === "true"),
    ).toHaveLength(0)
  })

  // APG-GRID-025：沒有編輯功能的 Grid 不該標 aria-readonly
  it("不標 aria-readonly", () => {
    render(<Harness />)
    const grid = screen.getByRole("grid", { name: "共用檔案" })
    expect(grid).not.toHaveAttribute("aria-readonly")
    expect(grid.querySelectorAll("[aria-readonly]")).toHaveLength(0)
  })

  // 標頭列不是資料列，不該有選取狀態。
  it("標頭列沒有 aria-selected", () => {
    render(<Harness />)
    const header = screen.getAllByRole("row")[0]
    expect(header).not.toHaveAttribute("aria-selected")
  })
})
