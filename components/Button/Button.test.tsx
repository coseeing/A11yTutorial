import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import { Button } from "./Button"

describe("Button", () => {
  // APG-BTN-001：可用 Enter 鍵或空白鍵啟動
  it("Enter 與空白鍵都能啟動", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>送出</Button>)

    screen.getByRole("button", { name: "送出" }).focus()
    await user.keyboard("{Enter}")
    expect(onClick).toHaveBeenCalledTimes(1)

    await user.keyboard(" ")
    expect(onClick).toHaveBeenCalledTimes(2)
  })

  // APG-BTN-002：角色語意與實際功能須一致
  it("沒有 href 時是 button，有 href 時是 link", () => {
    const { rerender } = render(<Button>送出</Button>)
    expect(screen.getByRole("button", { name: "送出" })).toBeInTheDocument()

    rerender(<Button href="/next">前往下一頁</Button>)
    expect(screen.getByRole("link", { name: "前往下一頁" })).toBeInTheDocument()
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })

  it("type 預設是 button，不會意外送出表單", () => {
    render(<Button>送出</Button>)
    expect(screen.getByRole("button", { name: "送出" })).toHaveAttribute("type", "button")
  })

  // APG-BTN-003：須具有無障礙名稱
  it("名稱來自文字內容", () => {
    render(<Button>儲存變更</Button>)
    expect(screen.getByRole("button", { name: "儲存變更" })).toBeInTheDocument()
  })

  it("只有圖示時，aria-label 提供名稱", () => {
    render(
      <Button aria-label="關閉">
        <span aria-hidden="true">×</span>
      </Button>,
    )
    expect(screen.getByRole("button", { name: "關閉" })).toBeInTheDocument()
  })

  // APG-BTN-005：補充說明須以 aria-describedby 指向說明元素
  it("aria-describedby 指向補充說明", () => {
    render(
      <>
        <Button aria-describedby="hint">刪除帳號</Button>
        <p id="hint">這個動作無法復原。</p>
      </>,
    )
    const button = screen.getByRole("button", { name: "刪除帳號" })
    expect(button).toHaveAttribute("aria-describedby", "hint")
    expect(button).toHaveAccessibleDescription("這個動作無法復原。")
  })

  // APG-BTN-006：不可用的按鈕須傳達停用狀態
  it("原生 disabled：離開 Tab 順序且不觸發", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>送出</Button>)
    const button = screen.getByRole("button", { name: "送出" })

    expect(button).toBeDisabled()
    await user.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it("keepFocusable：以 aria-disabled 停用，仍可聚焦但不觸發", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button disabled keepFocusable onClick={onClick}>
        送出
      </Button>,
    )
    const button = screen.getByRole("button", { name: "送出" })

    expect(button).toHaveAttribute("aria-disabled", "true")
    expect(button).not.toBeDisabled()

    // 鍵盤使用者仍找得到它 —— 原生 disabled 會讓按鈕從 Tab 順序中消失。
    await user.tab()
    expect(button).toHaveFocus()

    await user.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  // APG-BTN-007：Toggle 須設定 aria-pressed，且名稱不隨狀態改變
  it("給了 pressed 就輸出 aria-pressed", () => {
    const { rerender } = render(<Button pressed={false}>靜音</Button>)
    expect(screen.getByRole("button", { name: "靜音" })).toHaveAttribute(
      "aria-pressed",
      "false",
    )

    rerender(<Button pressed>靜音</Button>)
    expect(screen.getByRole("button", { name: "靜音" })).toHaveAttribute(
      "aria-pressed",
      "true",
    )
  })

  it("沒給 pressed 的一般按鈕不會有 aria-pressed", () => {
    render(<Button>送出</Button>)
    expect(screen.getByRole("button", { name: "送出" })).not.toHaveAttribute("aria-pressed")
  })

  it("連結分支不接受 pressed —— 連結沒有按下狀態", () => {
    render(
      <Button href="/x" pressed>
        前往
      </Button>,
    )
    expect(screen.getByRole("link", { name: "前往" })).not.toHaveAttribute("aria-pressed")
  })

  it("isLoading 期間標示 aria-busy 且不觸發", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button isLoading onClick={onClick}>儲存中</Button>)
    const button = screen.getByRole("button", { name: "儲存中" })

    expect(button).toHaveAttribute("aria-busy", "true")
    await user.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })
})
