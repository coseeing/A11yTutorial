import { act, render, screen } from "@testing-library/react"
import { expect, it, vi } from "vitest"
import { PageToc } from "./PageToc"
import { DemoSection } from "./DemoSection"
import userEvent from "@testing-library/user-event"

it("moves focus to the APG heading when its table-of-contents link is activated", async () => {
  const user = userEvent.setup()
  render(<div><PageToc variant="inline" sections={[{ id: "apg", title: "APG 規則" }]} /><DemoSection id="apg" title="APG 規則"><h3>規則標題</h3><p>規則說明</p></DemoSection><button>下一個操作</button></div>)
  await user.tab()
  expect(screen.getByRole("link", { name: "APG 規則" })).toHaveFocus()
  await user.keyboard("{Enter}")
  expect(screen.getByRole("heading", { level: 2, name: "APG 規則" })).toHaveFocus()
  expect(window.location.hash).toBe("#apg")
  await user.tab()
  expect(screen.getByRole("button", { name: "下一個操作" })).toHaveFocus()
})

it("keeps keyboard focus clear of the sticky nav and disables pinning when the nav takes too much height", () => {
  let navHeight = 80
  const originalRect = HTMLElement.prototype.getBoundingClientRect
  const rect = vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) {
    if (this.tagName === "NAV") return { top: 0, bottom: navHeight, height: navHeight } as DOMRect
    if (this.tagName === "BUTTON") return { top: 10, bottom: 40, height: 30 } as DOMRect
    return originalRect.call(this)
  })
  const { unmount } = render(<div><PageToc variant="inline" sections={[{ id: "demo", title: "Accessibility Tree" }]} /><button>下方控制項</button></div>)
  try {
    const nav = screen.getByRole("navigation", { name: "目錄" })
    const button = screen.getByRole("button", { name: "下方控制項" })
    const scroll = vi.fn()
    button.scrollIntoView = scroll
    expect(nav).toHaveAttribute("data-toc-sticky", "true")
    expect(document.documentElement.style.getPropertyValue("--demo-page-scroll-padding")).toBe("80px")
    act(() => button.focus())
    expect(scroll).toHaveBeenCalledOnce()
    navHeight = window.innerHeight / 2
    act(() => window.dispatchEvent(new Event("resize")))
    expect(nav).toHaveAttribute("data-toc-sticky", "false")
    expect(document.documentElement.style.getPropertyValue("--demo-page-scroll-padding")).toBe("0px")
  } finally {
    unmount()
    rect.mockRestore()
  }
  expect(document.documentElement.style.getPropertyValue("--demo-page-scroll-padding")).toBe("")
})
