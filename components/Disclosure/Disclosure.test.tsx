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

  // DisclosureDemo 的 A11yTree 用 `button + div` 抓內容區 —— 那個 selector
  // 依賴內容是按鈕的下一個兄弟節點。中間多包一層，面板就會指到別的東西上，
  // 而且不會有任何測試失敗。所以在這裡釘住這個結構。
  it("內容區是控制按鈕的下一個兄弟節點", () => {
    render(<Disclosure label="運費怎麼計算？" defaultOpen>內容</Disclosure>)
    const button = screen.getByRole("button", { name: /運費怎麼計算？/ })
    const panel = button.nextElementSibling

    expect(panel?.tagName).toBe("DIV")
    expect(panel).toHaveAttribute("id", button.getAttribute("aria-controls"))
    expect(panel).toHaveTextContent("內容")
  })
})
