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

// 目標會整個離開 DOM 的情境 —— Dialog、Toast 這類元件的實際行為。
function ToggleHarness({ latch }: { latch?: boolean }) {
  const [mounted, setMounted] = useState(true)
  return (
    <>
      <button onClick={() => setMounted((v) => !v)}>切換目標</button>
      {mounted ? (
        <button id="target" aria-expanded="true">
          更多選項
        </button>
      ) : null}
      <A11yTree selector="#target" latch={latch} />
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

  it("預設情況下目標消失就清空，忠實反映它已離開無障礙樹", async () => {
    const user = userEvent.setup()
    render(<ToggleHarness />)

    expect(await screen.findByTestId("a11y-tree-role")).toHaveTextContent("button")

    await user.click(screen.getByRole("button", { name: "切換目標" }))

    expect(await screen.findByTestId("a11y-tree-empty")).toBeInTheDocument()
  })

  it("latch 模式下目標消失後保留最後一次的值，並標示那是舊值", async () => {
    const user = userEvent.setup()
    render(<ToggleHarness latch />)

    expect(await screen.findByTestId("a11y-tree-role")).toHaveTextContent("button")
    expect(screen.queryByTestId("a11y-tree-stale")).not.toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "切換目標" }))

    // 值還在 —— 這正是它存在的理由：目標消失後畫面仍可截圖。
    expect(await screen.findByTestId("a11y-tree-stale")).toBeInTheDocument()
    expect(screen.getByTestId("a11y-tree-role")).toHaveTextContent("button")
    expect(screen.getByTestId("a11y-tree-name")).toHaveTextContent("更多選項")
    expect(screen.queryByTestId("a11y-tree-empty")).not.toBeInTheDocument()
  })

  it("latch 模式下目標重新出現時，舊值標示消失", async () => {
    const user = userEvent.setup()
    render(<ToggleHarness latch />)

    await user.click(screen.getByRole("button", { name: "切換目標" }))
    expect(await screen.findByTestId("a11y-tree-stale")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "切換目標" }))

    await waitFor(() => {
      expect(screen.queryByTestId("a11y-tree-stale")).not.toBeInTheDocument()
    })
    expect(screen.getByTestId("a11y-tree-role")).toHaveTextContent("button")
  })

  it("latch 只保留曾經觀察到的值，從未出現過的目標仍顯示空狀態", async () => {
    render(<A11yTree selector="#從未存在" latch />)
    expect(await screen.findByTestId("a11y-tree-empty")).toBeInTheDocument()
    expect(screen.queryByTestId("a11y-tree-stale")).not.toBeInTheDocument()
  })
})