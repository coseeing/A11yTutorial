import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { Disclosure } from "./Disclosure"

describe("Disclosure", () => {
  // APG-DISC-002：控制元件須具備 button 角色語意
  it("控制元件是 button", () => {
    render(<Disclosure label="更多資訊">內容</Disclosure>)
    expect(screen.getByRole("button", { name: "更多資訊" })).toBeInTheDocument()
  })

  // APG-DISC-003：aria-expanded 須反映內容的顯示狀態
  it("aria-expanded 跟著內容的可見狀態走", async () => {
    const user = userEvent.setup()
    render(<Disclosure label="更多資訊">內容</Disclosure>)
    const button = screen.getByRole("button", { name: "更多資訊" })

    expect(button).toHaveAttribute("aria-expanded", "false")
    expect(screen.queryByText("內容")).not.toBeVisible()

    await user.click(button)

    expect(button).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByText("內容")).toBeVisible()
  })

  // APG-DISC-004：aria-controls 須指向受控制的內容
  it("aria-controls 指向被控制的內容", () => {
    render(<Disclosure label="更多資訊">內容</Disclosure>)
    const id = screen.getByRole("button", { name: "更多資訊" }).getAttribute("aria-controls")
    expect(id).toBeTruthy()
    expect(document.getElementById(id!)).toHaveTextContent("內容")
  })

  // APG-DISC-001：Enter 與空白鍵切換
  it("Enter 與空白鍵都能切換", async () => {
    const user = userEvent.setup()
    render(<Disclosure label="更多資訊">內容</Disclosure>)
    const button = screen.getByRole("button", { name: "更多資訊" })

    button.focus()
    await user.keyboard("{Enter}")
    expect(button).toHaveAttribute("aria-expanded", "true")

    await user.keyboard(" ")
    expect(button).toHaveAttribute("aria-expanded", "false")
  })

  it("defaultOpen 可讓內容一開始就展開", () => {
    render(
      <Disclosure label="更多資訊" defaultOpen>
        內容
      </Disclosure>,
    )
    expect(screen.getByRole("button", { name: "更多資訊" })).toHaveAttribute(
      "aria-expanded",
      "true",
    )
  })
})
