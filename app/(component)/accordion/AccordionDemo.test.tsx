import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { AccordionDemo } from "./AccordionDemo"

describe("AccordionDemo", () => {
  it("A11yTree 觀察第一個標題按鈕", async () => {
    render(<AccordionDemo />)
    expect(await screen.findByTestId("a11y-tree-role")).toHaveTextContent("button")
    expect(screen.getByTestId("a11y-tree-name")).toHaveTextContent("什麼是無障礙設計？")
  })

  it("標題按鈕沒有描述，Description 列明講「無」", async () => {
    render(<AccordionDemo />)
    expect(await screen.findByTestId("a11y-tree-description")).toHaveTextContent(
      "（無 accessible description）",
    )
  })

  it("展開後 Status 由 aria-expanded=false 變成 true", async () => {
    const user = userEvent.setup()
    render(<AccordionDemo />)

    expect(await screen.findByTestId("a11y-tree-status")).toHaveTextContent("aria-expanded=false")

    await user.click(screen.getByRole("button", { name: "什麼是無障礙設計？" }))

    await waitFor(() => {
      expect(screen.getByTestId("a11y-tree-status")).toHaveTextContent("aria-expanded=true")
    })
  })
})
