import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { Tooltip } from "./Tooltip"

function Harness() {
  return (
    <>
      <Tooltip content="密碼需要至少 12 個字元。">
        <button type="button">密碼規則</button>
      </Tooltip>
      <button type="button">其他按鈕</button>
    </>
  )
}

describe("Tooltip", () => {
  // APG-TIP-009：觸發元素須以 aria-describedby 參照工具提示
  it("觸發元素以 aria-describedby 參照提示內容", async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await user.hover(screen.getByRole("button", { name: "密碼規則" }))

    expect(await screen.findByRole("tooltip")).toHaveTextContent("密碼需要至少 12 個字元。")
    expect(screen.getByRole("button", { name: "密碼規則" })).toHaveAccessibleDescription(
      "密碼需要至少 12 個字元。",
    )
  })

  // APG-TIP-008：容器須具有 tooltip 角色
  it("提示容器的角色是 tooltip", async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.hover(screen.getByRole("button", { name: "密碼規則" }))

    expect(await screen.findByRole("tooltip")).toBeInTheDocument()
  })

  // APG-TIP-001：鍵盤焦點可觸發
  it("鍵盤聚焦即顯示", async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await user.tab()

    expect(screen.getByRole("button", { name: "密碼規則" })).toHaveFocus()
    expect(await screen.findByRole("tooltip")).toBeInTheDocument()
  })

  // APG-TIP-005：焦點離開時關閉
  it("焦點離開後關閉", async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.tab()
    await screen.findByRole("tooltip")

    await user.tab()

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument()
  })

  // APG-TIP-004：工具提示本身不接收焦點
  it("提示內容不在 Tab 順序中，焦點始終留在觸發元素上", async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.tab()
    const tooltip = await screen.findByRole("tooltip")

    expect(tooltip).not.toHaveAttribute("tabindex")
    expect(screen.getByRole("button", { name: "密碼規則" })).toHaveFocus()
  })

  // APG-TIP-003：Escape 關閉 —— 同時是 WCAG 1.4.13 的「可關閉」
  it("Escape 可關閉，且焦點留在觸發元素上", async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.tab()
    await screen.findByRole("tooltip")

    await user.keyboard("{Escape}")

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument()
    expect(screen.getByRole("button", { name: "密碼規則" })).toHaveFocus()
  })

  // APG-TIP-006：指標移到提示本身上時仍須顯示 —— WCAG 1.4.13 的「可停留」
  //
  // 用 pointer 而非 unhover + hover：後者等於「移出容器再移回來」，
  // 真實情境是指標從觸發元素直接移到提示上，兩者同在一個容器內，
  // 容器根本不會收到 mouseleave。
  it("指標從觸發元素移到提示上時不會關閉", async () => {
    const user = userEvent.setup()
    render(<Harness />)
    const trigger = screen.getByRole("button", { name: "密碼規則" })

    await user.pointer({ target: trigger })
    const tooltip = await screen.findByRole("tooltip")

    await user.pointer({ target: tooltip })

    expect(screen.getByRole("tooltip")).toBeInTheDocument()
  })

  // APG-TIP-007：指標離開觸發元素與提示後關閉
  it("指標完全離開後關閉", async () => {
    const user = userEvent.setup()
    render(<Harness />)
    const trigger = screen.getByRole("button", { name: "密碼規則" })

    await user.pointer({ target: trigger })
    await screen.findByRole("tooltip")

    await user.pointer({ target: screen.getByRole("button", { name: "其他按鈕" }) })

    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument()
    })
  })

  it("沒有觸發時，aria-describedby 不指向不存在的 id", () => {
    render(<Harness />)
    expect(screen.getByRole("button", { name: "密碼規則" })).not.toHaveAttribute(
      "aria-describedby",
    )
  })

  // 這條是瀏覽器實測抓到的回歸。
  //
  // 原本的實作用 cloneElement 把 onFocus / onBlur 傳給子元素，碰到不接受這兩個
  // prop 的元件（例如這個專案的 Button）就會被默默丟掉 —— 鍵盤使用者永遠觸發
  // 不了提示。上面其他測試用原生 <button> 所以全部綠燈，看不出問題。
  it("子元素不轉發焦點事件時，鍵盤仍然觸發得了", async () => {
    const user = userEvent.setup()

    // 刻意忽略 onFocus / onBlur，模擬一個只認得自己那幾個 prop 的元件
    function StubbornButton({ "aria-describedby": describedBy }: { "aria-describedby"?: string }) {
      return (
        <button type="button" aria-describedby={describedBy}>
          密碼規則
        </button>
      )
    }

    render(
      <Tooltip content="密碼需要至少 12 個字元。">
        <StubbornButton />
      </Tooltip>,
    )

    await user.tab()

    expect(screen.getByRole("button", { name: "密碼規則" })).toHaveFocus()
    expect(await screen.findByRole("tooltip")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "密碼規則" })).toHaveAccessibleDescription(
      "密碼需要至少 12 個字元。",
    )
  })
})