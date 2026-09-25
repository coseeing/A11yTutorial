import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { Accordion } from "./Accordion"

const ITEMS = [
  { question: "第一題", answer: "第一個答案" },
  { question: "第二題", answer: "第二個答案" },
]

describe("Accordion", () => {
  // APG-ACC-003：標題列具有 button 角色語意
  it("每個標題列都是 button", () => {
    render(<Accordion items={ITEMS} />)
    expect(screen.getByRole("button", { name: "第一題" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "第二題" })).toBeInTheDocument()
  })

  // APG-ACC-005：標題按鈕須包含在 heading 標籤內，層級須符合頁面資訊架構
  it("標題按鈕包在 heading 內，層級可指定", () => {
    const { rerender } = render(<Accordion items={ITEMS} />)
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(2)

    rerender(<Accordion items={ITEMS} headingLevel={2} />)
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(2)
  })

  // APG-ACC-004：標題按鈕是 heading 內唯一的元素
  it("heading 內只有那個按鈕，沒有別的元素", () => {
    render(<Accordion items={ITEMS} />)
    const heading = screen.getAllByRole("heading", { level: 3 })[0]
    expect(heading.childElementCount).toBe(1)
    expect(heading.firstElementChild?.tagName).toBe("BUTTON")
  })

  // APG-ACC-006：aria-expanded 須正確反映內容區塊的展開狀態
  it("aria-expanded 跟著面板的可見狀態走", async () => {
    const user = userEvent.setup()
    render(<Accordion items={ITEMS} />)
    const first = screen.getByRole("button", { name: "第一題" })

    expect(first).toHaveAttribute("aria-expanded", "false")
    expect(screen.queryByText("第一個答案")).not.toBeVisible()

    await user.click(first)

    expect(first).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByText("第一個答案")).toBeVisible()
  })

  // APG-ACC-007：aria-controls 須指向對應的內容區塊
  it("aria-controls 指向自己的面板", () => {
    render(<Accordion items={ITEMS} />)
    const first = screen.getByRole("button", { name: "第一題" })
    const panelId = first.getAttribute("aria-controls")
    expect(panelId).toBeTruthy()
    expect(document.getElementById(panelId!)).toHaveTextContent("第一個答案")
  })

  // APG-ACC-009：內容區域使用 role=region 時，須以對應的標題按鈕作為無障礙名稱
  it("面板是以標題按鈕命名的 region", async () => {
    const user = userEvent.setup()
    render(<Accordion items={ITEMS} />)
    await user.click(screen.getByRole("button", { name: "第一題" }))

    const region = screen.getByRole("region", { name: "第一題" })
    expect(within(region).getByText("第一個答案")).toBeInTheDocument()
  })

  // APG-ACC-010：應避免產生過多的區域地標
  it("useRegion 為 false 時不產生 region 地標", async () => {
    const user = userEvent.setup()
    render(<Accordion items={ITEMS} useRegion={false} />)
    await user.click(screen.getByRole("button", { name: "第一題" }))

    expect(screen.queryByRole("region")).not.toBeInTheDocument()
    expect(screen.getByText("第一個答案")).toBeVisible()
  })

  // APG-ACC-008：已展開且不可收合的標題列須標記 aria-disabled
  it("keepOneExpanded 時，最後一個展開的標題標上 aria-disabled 且點擊無效", async () => {
    const user = userEvent.setup()
    render(<Accordion items={ITEMS} keepOneExpanded defaultExpanded={[0]} />)
    const first = screen.getByRole("button", { name: "第一題" })

    expect(first).toHaveAttribute("aria-disabled", "true")

    await user.click(first)

    expect(first).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByText("第一個答案")).toBeVisible()
  })

  it("keepOneExpanded 下另一個面板展開後，原本的標題不再 aria-disabled", async () => {
    const user = userEvent.setup()
    render(<Accordion items={ITEMS} keepOneExpanded defaultExpanded={[0]} />)

    await user.click(screen.getByRole("button", { name: "第二題" }))

    expect(screen.getByRole("button", { name: "第一題" })).not.toHaveAttribute("aria-disabled")
  })

  // APG-ACC-001：Enter 與 Space 切換展開收合
  it("Enter 與 Space 都能切換面板", async () => {
    const user = userEvent.setup()
    render(<Accordion items={ITEMS} />)
    const first = screen.getByRole("button", { name: "第一題" })

    first.focus()
    await user.keyboard("{Enter}")
    expect(first).toHaveAttribute("aria-expanded", "true")

    await user.keyboard(" ")
    expect(first).toHaveAttribute("aria-expanded", "false")
  })

  // APG-ACC-002：所有可聚焦元素納入頁面 Tab 順序
  it("Tab 依序走過每個標題按鈕", async () => {
    const user = userEvent.setup()
    render(<Accordion items={ITEMS} />)

    await user.tab()
    expect(screen.getByRole("button", { name: "第一題" })).toHaveFocus()

    await user.tab()
    expect(screen.getByRole("button", { name: "第二題" })).toHaveFocus()
  })

  it("allowMultiple 為 false 時，展開新面板會收合原本展開的", async () => {
    const user = userEvent.setup()
    render(<Accordion items={ITEMS} allowMultiple={false} defaultExpanded={[0]} />)

    await user.click(screen.getByRole("button", { name: "第二題" }))

    expect(screen.getByRole("button", { name: "第一題" })).toHaveAttribute(
      "aria-expanded",
      "false",
    )
    expect(screen.getByRole("button", { name: "第二題" })).toHaveAttribute(
      "aria-expanded",
      "true",
    )
  })
})
