import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { describe, expect, it } from "vitest"
import { A11yTree } from "./A11yTree"
import { A11yTreeView } from "./A11yTreeView"

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

    expect(await screen.findByTestId("a11y-tree-status")).toHaveTextContent(
      "aria-expanded=false",
    )

    await user.click(screen.getByRole("button", { name: "更多選項" }))

    // 用 waitFor 而非 findBy：目標元素一直都在，要等的是它的「內容」改變，
    // findBy 在元素已存在時會立刻回傳舊值。
    await waitFor(() => {
      expect(screen.getByTestId("a11y-tree-status")).toHaveTextContent("aria-expanded=true")
    })
  })

  it("目標沒有描述時，Description 列仍顯示並明講「無」", async () => {
    render(<Harness />)
    await screen.findByTestId("a11y-tree-role")
    expect(screen.getByTestId("a11y-tree-description")).toHaveTextContent(
      "（無 accessible description）",
    )
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

  it("latch 模式下目標消失後保留最後一次的值", async () => {
    const user = userEvent.setup()
    render(<ToggleHarness latch />)

    expect(await screen.findByTestId("a11y-tree-role")).toHaveTextContent("button")
    expect(screen.getByTestId("a11y-tree-values")).not.toHaveAttribute("data-stale")

    await user.click(screen.getByRole("button", { name: "切換目標" }))

    // 值還在 —— 這正是它存在的理由：目標消失後畫面仍可截圖。
    await waitFor(() => {
      expect(screen.getByTestId("a11y-tree-values")).toHaveAttribute("data-stale", "true")
    })
    expect(screen.getByTestId("a11y-tree-role")).toHaveTextContent("button")
    expect(screen.getByTestId("a11y-tree-name")).toHaveTextContent("更多選項")
    expect(screen.queryByTestId("a11y-tree-empty")).not.toBeInTheDocument()
  })

  it("舊值在畫面上不另外標示，讀者只看到數值本身", async () => {
    const user = userEvent.setup()
    render(<ToggleHarness latch />)

    await screen.findByTestId("a11y-tree-role")
    await user.click(screen.getByRole("button", { name: "切換目標" }))

    await waitFor(() => {
      expect(screen.getByTestId("a11y-tree-values")).toHaveAttribute("data-stale", "true")
    })
    expect(screen.queryByText(/最後一次觀察到的值/)).not.toBeInTheDocument()
    expect(screen.queryByText(/已離開無障礙樹/)).not.toBeInTheDocument()
  })

  it("latch 模式下目標重新出現時，回到即時狀態", async () => {
    const user = userEvent.setup()
    render(<ToggleHarness latch />)

    await user.click(screen.getByRole("button", { name: "切換目標" }))
    await waitFor(() => {
      expect(screen.getByTestId("a11y-tree-values")).toHaveAttribute("data-stale", "true")
    })

    await user.click(screen.getByRole("button", { name: "切換目標" }))

    await waitFor(() => {
      expect(screen.getByTestId("a11y-tree-values")).not.toHaveAttribute("data-stale")
    })
    expect(screen.getByTestId("a11y-tree-role")).toHaveTextContent("button")
  })

  it("latch 只保留曾經觀察到的值，從未出現過的目標仍顯示空狀態", async () => {
    render(<A11yTree selector="#從未存在" latch />)
    expect(await screen.findByTestId("a11y-tree-empty")).toBeInTheDocument()
    expect(screen.getByTestId("a11y-tree-values")).not.toHaveAttribute("data-stale")
  })

  // 保留下來的舊值在畫面上必須與即時值長得一模一樣。
  //
  // 曾經有過「舊值調淡 opacity-60」的處理，結果 Dialog 是唯一用 latch 的頁面，
  // 它的面板就比其他九頁都淡一階，看起來像壞掉。差異只有肉眼看得出來，所以在
  // 這裡比對兩種狀態渲染出的 class。
  it("舊值與即時值的樣式完全相同", () => {
    const node = { role: "dialog", name: "刪除這筆紀錄？", description: "", status: ["aria-expanded=true"] }

    const live = render(<A11yTreeView node={node} />)
    const liveClasses = [...live.container.querySelectorAll("dt, dd")].map((el) => el.className)
    live.unmount()

    const stale = render(<A11yTreeView node={node} stale />)
    const staleClasses = [...stale.container.querySelectorAll("dt, dd")].map((el) => el.className)

    expect(staleClasses).toEqual(liveClasses)
  })
})