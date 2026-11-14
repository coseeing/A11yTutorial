import { act, render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { AccordionDemo } from "./AccordionDemo"

// 這一頁有兩個面板（標題按鈕、展開中的面板），所以每個查詢都要先指定是哪一個。
// 順序就是畫面上的順序，由外而內。
const HEADER_PANEL = 0
const REGION_PANEL = 1

async function panel(index: number) {
  const all = await screen.findAllByTestId("a11y-tree-values")
  return within(all[index])
}

describe("AccordionDemo", () => {
  it("第一個面板觀察第一個標題按鈕", async () => {
    render(<AccordionDemo />)
    const header = await panel(HEADER_PANEL)
    expect(header.getByTestId("a11y-tree-role")).toHaveTextContent("button")
    expect(header.getByTestId("a11y-tree-name")).toHaveTextContent("什麼是無障礙設計？")
  })

  it("標題按鈕沒有描述，Description 列明講「無」", async () => {
    render(<AccordionDemo />)
    const header = await panel(HEADER_PANEL)
    expect(header.getByTestId("a11y-tree-description")).toHaveTextContent(
      "（無 accessible description）",
    )
  })

  // 面板的無障礙名稱來自控制它的那顆標題按鈕（APG-ACC-009）。這是這一頁要
  // 示範的重點之一：region 自己沒有標題，名字是借來的。
  it("第二個面板觀察展開中的面板，名稱來自標題按鈕", async () => {
    render(<AccordionDemo />)
    const region = await panel(REGION_PANEL)
    expect(region.getByTestId("a11y-tree-role")).toHaveTextContent("region")
    expect(region.getByTestId("a11y-tree-name")).toHaveTextContent("什麼是無障礙設計？")
  })

  it("收合後 Status 由 aria-expanded=true 變成 false，面板離開無障礙樹", async () => {
    const user = userEvent.setup()
    render(<AccordionDemo />)

    const header = await panel(HEADER_PANEL)
    expect(header.getByTestId("a11y-tree-status")).toHaveTextContent("aria-expanded=true")

    await user.click(screen.getByRole("button", { name: "什麼是無障礙設計？" }))

    await waitFor(async () => {
      const after = await panel(HEADER_PANEL)
      expect(after.getByTestId("a11y-tree-status")).toHaveTextContent("aria-expanded=false")
    })

    // 收合中的面板帶著 hidden，整個不在無障礙樹裡 —— 第二個面板顯示空狀態。
    const region = await panel(REGION_PANEL)
    expect(region.getByTestId("a11y-tree-empty")).toBeInTheDocument()
  })

  it("切換操作其他按鈕時，兩張卡追蹤同一組按鈕與面板，即使其他題仍展開", async () => {
    const user = userEvent.setup()
    render(<AccordionDemo />)
    const question = "為什麼標題按鈕要包在 heading 裡？"
    await user.click(screen.getByRole("button", { name: question }))
    await waitFor(() => {
      const cards = screen.getAllByTestId("a11y-tree-values")
      expect(within(cards[0]).getByTestId("a11y-tree-name")).toHaveTextContent(question)
      expect(within(cards[1]).getByTestId("a11y-tree-name")).toHaveTextContent(question)
    })
    expect(screen.getByRole("button", { name: "什麼是無障礙設計？" })).toHaveAttribute("aria-expanded", "true")
    await user.click(screen.getByRole("button", { name: question }))
    await waitFor(() => {
      const cards = screen.getAllByTestId("a11y-tree-values")
      expect(within(cards[0]).getByTestId("a11y-tree-status")).toHaveTextContent("aria-expanded=false")
      expect(within(cards[1]).getByTestId("a11y-tree-empty")).toBeInTheDocument()
    })
  })

  it("鍵盤移到另一題也會更新觀察，空白鍵展開正確面板", async () => {
    const user = userEvent.setup()
    render(<AccordionDemo />)
    act(() => screen.getByRole("button", { name: "什麼是無障礙設計？" }).focus())
    await user.tab()
    const question = "為什麼標題按鈕要包在 heading 裡？"
    expect(screen.getByRole("button", { name: question })).toHaveFocus()
    await waitFor(() => expect(within(screen.getAllByTestId("a11y-tree-values")[0]).getByTestId("a11y-tree-name")).toHaveTextContent(question))
    await user.keyboard(" ")
    await waitFor(() => expect(within(screen.getAllByTestId("a11y-tree-values")[1]).getByTestId("a11y-tree-name")).toHaveTextContent(question))
  })
})
