import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Alert } from "./Alert"

describe("Alert", () => {
  // APG-ALERT-001：容器須具有 role=alert
  it("容器是 alert 角色", () => {
    render(<Alert message="儲存失敗，請再試一次。" />)
    expect(screen.getByRole("alert")).toHaveTextContent("儲存失敗，請再試一次。")
  })

  // APG-ALERT-002：動態出現時螢幕閱讀器需能報讀 —— live region 必須在訊息之前
  // 就已經存在於 DOM 中，訊息才算是「變化」而被播報。
  it("沒有訊息時，live region 仍留在 DOM 裡", () => {
    render(<Alert message={null} />)
    const region = screen.getByRole("alert")
    expect(region).toBeInTheDocument()
    expect(region).toBeEmptyDOMElement()
  })

  it("訊息出現時是在既有的 live region 內更新，不是重新掛載一個", () => {
    const { rerender } = render(<Alert message={null} />)
    const before = screen.getByRole("alert")

    rerender(<Alert message="儲存失敗，請再試一次。" />)

    // 同一個節點 —— 若整個容器被換掉，部分螢幕閱讀器不會播報。
    expect(screen.getByRole("alert")).toBe(before)
    expect(before).toHaveTextContent("儲存失敗，請再試一次。")
  })

  it("不搶走鍵盤焦點（APG-ALERT-003）", () => {
    render(
      <>
        <button type="button">先聚焦這裡</button>
        <Alert message={null} />
      </>,
    )
    const button = screen.getByRole("button", { name: "先聚焦這裡" })
    button.focus()
    expect(button).toHaveFocus()
  })
})
