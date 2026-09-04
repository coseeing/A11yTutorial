import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { describe, expect, it } from "vitest"
import { A11yTree } from "./A11yTree"

function Harness() {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <button
        id="target"
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
      >
        更多選項
      </button>
      <A11yTree selector="#target" />
    </>
  )
}

describe("A11yTree", () => {
  it("顯示目標元素的 role 與 name", async () => {
    render(<Harness />)
    expect(await screen.findByTestId("a11y-tree-role")).toHaveTextContent("button")
    expect(screen.getByTestId("a11y-tree-name")).toHaveTextContent("更多選項")
  })

  it("互動後狀態即時更新", async () => {
    const user = userEvent.setup()
    render(<Harness />)

    expect(await screen.findByTestId("a11y-tree-status")).toHaveTextContent("collapsed")

    await user.click(screen.getByRole("button", { name: "更多選項" }))

    // 用 waitFor 而非 findBy：目標元素一直都在，要等的是它的「內容」改變，
    // findBy 在元素已存在時會立刻回傳舊值。
    await waitFor(() => {
      expect(screen.getByTestId("a11y-tree-status")).toHaveTextContent("expanded")
    })
  })

  it("目標元素不存在時說明它不在無障礙樹中", async () => {
    render(<A11yTree selector="#沒有這個元素" />)
    expect(await screen.findByTestId("a11y-tree-empty")).toHaveTextContent(
      "元素目前不在無障礙樹中",
    )
  })

  it("面板本身有 group role 與名稱，狀態變動時通知輔助科技", async () => {
    render(<Harness />)
    const group = await screen.findByRole("group", { name: "Accessibility Tree" })
    expect(group).toBeInTheDocument()
    expect(screen.getByTestId("a11y-tree-values")).toHaveAttribute("aria-live", "polite")
  })
})
