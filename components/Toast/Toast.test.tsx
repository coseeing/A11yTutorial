import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { describe, expect, it, vi } from "vitest"
import { Toast, ToastRegion } from "./Toast"

function Harness({ duration }: { duration?: number | null }) {
  const [message, setMessage] = useState<string | null>(null)
  return (
    <>
      <button type="button" onClick={() => setMessage("個人資料已更新")}>
        儲存
      </button>
      <ToastRegion>
        {message ? (
          <Toast
            message={message}
            duration={duration}
            onDismiss={() => setMessage(null)}
          />
        ) : null}
      </ToastRegion>
    </>
  )
}

describe("Toast", () => {
  // 不強制中斷 —— polite 而非 assertive
  it("live region 是 status 而不是 alert", () => {
    render(<Harness />)
    const region = screen.getByRole("status")
    expect(region).toBeInTheDocument()
    expect(screen.queryByRole("alert")).not.toBeInTheDocument()
  })

  // 與 Alert 同一課：容器要先在 DOM 裡，訊息才算是「變化」而被播報
  it("沒有訊息時 live region 仍留在 DOM 裡", () => {
    render(<Harness />)
    expect(screen.getByRole("status")).toBeEmptyDOMElement()
  })

  it("訊息是在既有的 live region 內更新，不是重新掛載一個", async () => {
    const user = userEvent.setup()
    render(<Harness />)
    const before = screen.getByRole("status")

    await user.click(screen.getByRole("button", { name: "儲存" }))

    expect(screen.getByRole("status")).toBe(before)
    expect(before).toHaveTextContent("個人資料已更新")
  })

  // 焦點不被吸走 —— 這是 Toast 與 Dialog 的根本分界
  it("出現時不搶走鍵盤焦點", async () => {
    const user = userEvent.setup()
    render(<Harness />)
    const trigger = screen.getByRole("button", { name: "儲存" })

    await user.click(trigger)

    expect(screen.getByText("個人資料已更新")).toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it("關閉鈕有可辨識的名稱", async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole("button", { name: "儲存" }))

    expect(screen.getByRole("button", { name: "關閉通知" })).toBeInTheDocument()
  })

  it("按下關閉鈕後訊息消失，live region 仍在", async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole("button", { name: "儲存" }))

    await user.click(screen.getByRole("button", { name: "關閉通知" }))

    expect(screen.queryByText("個人資料已更新")).not.toBeInTheDocument()
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  // SC 2.2.1：自動消失是時間限制，必須可以關掉
  it("duration 為 null 時不自動消失", async () => {
    vi.useFakeTimers()
    try {
      render(<Harness duration={null} />)
      await act(async () => {
        screen.getByRole("button", { name: "儲存" }).click()
      })
      await act(async () => {
        await vi.advanceTimersByTimeAsync(60_000)
      })
      expect(screen.getByText("個人資料已更新")).toBeInTheDocument()
    } finally {
      vi.useRealTimers()
    }
  })

  it("給了 duration 就在時間到之後自行消失", async () => {
    vi.useFakeTimers()
    try {
      render(<Harness duration={5000} />)
      await act(async () => {
        screen.getByRole("button", { name: "儲存" }).click()
      })
      expect(screen.getByText("個人資料已更新")).toBeInTheDocument()

      await act(async () => {
        await vi.advanceTimersByTimeAsync(5000)
      })

      expect(screen.queryByText("個人資料已更新")).not.toBeInTheDocument()
    } finally {
      vi.useRealTimers()
    }
  })

  it("訊息本身不是可聚焦元素 —— 它不在 Tab 順序中", async () => {
    const user = userEvent.setup()
    render(<Harness duration={null} />)
    await user.click(screen.getByRole("button", { name: "儲存" }))

    const text = screen.getByText("個人資料已更新")
    expect(text).not.toHaveAttribute("tabindex")
  })
})
