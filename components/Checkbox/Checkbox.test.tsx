import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { Checkbox } from "./Checkbox"

describe("Checkbox", () => {
  // APG-CHK-002：具有 checkbox 角色語意
  it("角色是 checkbox", () => {
    render(<Checkbox id="a" label="訂閱電子報" />)
    expect(screen.getByRole("checkbox", { name: "訂閱電子報" })).toBeInTheDocument()
  })

  // APG-CHK-003：具有無障礙名稱
  it("名稱來自可見標籤，點標籤也能切換", async () => {
    const user = userEvent.setup()
    render(<Checkbox id="a" label="訂閱電子報" />)

    await user.click(screen.getByText("訂閱電子報"))

    expect(screen.getByRole("checkbox", { name: "訂閱電子報" })).toBeChecked()
  })

  it("沒有可見標籤時可用 aria-label", () => {
    render(<Checkbox aria-label="全選" />)
    expect(screen.getByRole("checkbox", { name: "全選" })).toBeInTheDocument()
  })

  // APG-CHK-001：Space 切換
  it("Space 可切換勾選狀態", async () => {
    const user = userEvent.setup()
    render(<Checkbox id="a" label="訂閱電子報" />)
    const box = screen.getByRole("checkbox", { name: "訂閱電子報" })

    box.focus()
    await user.keyboard(" ")

    expect(box).toBeChecked()
  })

  // APG-CHK-004：三態 —— 部分勾選時為 mixed
  it("indeterminate 讓狀態成為 mixed", () => {
    render(<Checkbox id="a" label="全選" indeterminate />)
    const box = screen.getByRole("checkbox", { name: "全選" }) as HTMLInputElement

    expect(box.indeterminate).toBe(true)
    // ARIA 上的三態：mixed 既不是 true 也不是 false
    expect(box).toHaveAttribute("aria-checked", "mixed")
  })

  it("indeterminate 解除後回到一般的兩態", () => {
    const { rerender } = render(<Checkbox id="a" label="全選" indeterminate />)
    rerender(<Checkbox id="a" label="全選" checked readOnly />)

    const box = screen.getByRole("checkbox", { name: "全選" }) as HTMLInputElement
    expect(box.indeterminate).toBe(false)
    expect(box).not.toHaveAttribute("aria-checked", "mixed")
    expect(box).toBeChecked()
  })

  // APG-CHK-007：補充說明
  it("aria-describedby 帶出補充說明", () => {
    render(
      <>
        <Checkbox id="a" label="訂閱電子報" aria-describedby="hint" />
        <p id="hint">每週最多一封，隨時可取消。</p>
      </>,
    )
    expect(screen.getByRole("checkbox", { name: "訂閱電子報" })).toHaveAccessibleDescription(
      "每週最多一封，隨時可取消。",
    )
  })
})
