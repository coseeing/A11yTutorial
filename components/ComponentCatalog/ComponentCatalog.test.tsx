import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { componentCatalog } from "@/lib/component-catalog.generated"
import { ComponentCatalog } from "./ComponentCatalog"

describe("ComponentCatalog", () => {
  it("places focus at the catalog when returning from a component page", () => {
    const previousUrl = window.location.href
    try {
      window.history.replaceState(null, "", "#catalog-heading")
      render(<ComponentCatalog entries={componentCatalog} />)
      expect(screen.getByRole("heading", { name: "元件清單", level: 2 })).toHaveFocus()
    } finally {
      window.history.replaceState(null, "", previousUrl)
    }
  })
  it("keeps search across views and separates whole-card navigation from section links", async () => {
    const user = userEvent.setup()
    render(<ComponentCatalog entries={componentCatalog} />)
    expect(within(screen.getByRole("tabpanel")).getByRole("searchbox")).toBeVisible()
    await user.type(screen.getByRole("searchbox", { name: "搜尋元件與說明內容" }), "Accordion")
    expect(screen.getByRole("status")).toHaveTextContent("找到 1 個元件")
    await user.click(screen.getByRole("tab", { name: "依 WCAG SC" }))
    await user.selectOptions(screen.getByLabelText("選擇成功準則"), "2.1.1")
    const panel = screen.getByRole("tabpanel", { name: "依 WCAG SC" })
    expect(within(panel).getByRole("searchbox")).toHaveValue("Accordion")
    expect(within(panel).getByRole("link", { name: "Accordion 元件說明" })).toHaveAttribute("href", "/accordion/")
    expect(within(panel).getByRole("link", { name: "查看 WCAG 對應：Accordion" })).toHaveAttribute("href", "/accordion/#wcag")
    expect(panel.querySelector("a a")).toBeNull()
    await user.click(screen.getByRole("tab", { name: "依角色語意" }))
    expect(screen.getByRole("searchbox")).toHaveValue("Accordion")
    await user.selectOptions(screen.getByLabelText("選擇角色語意"), "button")
    const rolesPanel = screen.getByRole("tabpanel")
    expect(within(rolesPanel).getByRole("searchbox")).toHaveValue("Accordion")
    expect(within(rolesPanel).getByRole("link", { name: "Accordion 元件說明" })).toHaveAttribute("href", "/accordion/")
    expect(within(rolesPanel).getByRole("link", { name: "查看角色與 ARIA 說明：Accordion" })).toHaveAttribute("href", "/accordion/#aria")
  })
  it("provides descriptive alternative text for every overview illustration and omits SC counts", () => {
    render(<ComponentCatalog entries={componentCatalog} />)
    const panel = screen.getByRole("tabpanel", { name: "總覽" })
    const images = within(panel).getAllByRole("img")
    expect(images).toHaveLength(21)
    expect(images.every((image) => (image.getAttribute("alt")?.length ?? 0) > 12)).toBe(true)
    expect(new Set(images.map((image) => image.getAttribute("alt"))).size).toBe(21)
    expect(within(panel).queryAllByText(/^\d+ 條 SC 對應$/)).toHaveLength(0)
  })
  it("shows the fourth role in full instead of a +1 tag, while retaining larger overflow counts", () => {
    render(<ComponentCatalog entries={componentCatalog.filter((entry) => ["breadcrumb", "carousel"].includes(entry.slug))} />)
    const breadcrumb = screen.getByRole("link", { name: "Breadcrumb 元件說明" }).closest("li")!
    expect(within(breadcrumb).getByText("navigation")).toBeVisible()
    expect(within(breadcrumb).queryByText("+1")).not.toBeInTheDocument()
    const carousel = screen.getByRole("link", { name: "Carousel 元件說明" }).closest("li")!
    expect(within(carousel).getByText("+2")).toBeVisible()
  })
  it("handles no results and resets all filters from the persistent clear button", async () => {
    const user = userEvent.setup()
    render(<ComponentCatalog entries={componentCatalog} />)
    await user.click(screen.getByRole("tab", { name: "依 WCAG SC" }))
    await user.selectOptions(screen.getByLabelText("選擇成功準則"), "2.1.1")
    await user.selectOptions(screen.getByLabelText("準則等級"), "AA")
    expect(screen.getByText("沒有符合條件的元件")).toBeVisible()
    await user.click(screen.getByRole("button", { name: "清除條件" }))
    expect(screen.getByLabelText("選擇成功準則")).toHaveValue("")
    expect(screen.getByLabelText("準則等級")).toHaveValue("")
    expect(screen.queryByText("沒有符合條件的元件")).not.toBeInTheDocument()
    expect(screen.getByRole("status")).toHaveTextContent("已清除所有搜尋與篩選條件")
  })
  it("supports the existing Tabs keyboard controls", async () => {
    const user = userEvent.setup()
    render(<ComponentCatalog entries={componentCatalog} />)
    screen.getByRole("tab", { name: "總覽" }).focus()
    await user.keyboard("{ArrowRight}")
    expect(screen.getByRole("tab", { name: "依 WCAG SC" })).toHaveFocus()
    await user.keyboard("{End}")
    expect(screen.getByRole("tab", { name: "依角色語意" })).toHaveAttribute("aria-selected", "true")
  })
})
