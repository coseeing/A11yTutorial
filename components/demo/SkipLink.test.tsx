import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, it, vi } from "vitest"
import { SkipLink } from "./SkipLink"

const route = vi.hoisted(() => ({ pathname: "/tabs" }))
vi.mock("next/navigation", () => ({ usePathname: () => route.pathname }))

it.each(["/tabs", "tabs.html", "/A11yTutorial/accordion/"])("skips directly to the Demo on %s and continues keyboard navigation there", async (pathname) => {
  route.pathname = pathname
  const user = userEvent.setup()
  render(<><SkipLink /><header><a href="/">首頁</a></header><main id="main" tabIndex={-1}><h2 id="interactive-demo-heading" tabIndex={-1}>互動 Demo</h2><button>操作範例</button></main></>)
  const skip = screen.getByRole("link", { name: "跳到互動 Demo" })
  expect(skip).toHaveAttribute("href", "#interactive-demo-heading")
  await user.tab()
  expect(skip).toHaveFocus()
  await user.keyboard("{Enter}")
  expect(screen.getByRole("heading", { name: "互動 Demo" })).toHaveFocus()
  await user.tab()
  expect(screen.getByRole("button", { name: "操作範例" })).toHaveFocus()
})

it("keeps the homepage skip link directed to main", async () => {
  route.pathname = "/"
  const user = userEvent.setup()
  render(<><SkipLink /><main id="main" tabIndex={-1}>首頁內容</main></>)
  const skip = screen.getByRole("link", { name: "跳到主要內容" })
  expect(skip).toHaveAttribute("href", "#main")
  await user.click(skip)
  expect(screen.getByRole("main")).toHaveFocus()
})

it("still moves focus when a local-file environment rejects the History API", async () => {
  route.pathname = "/tabs"
  window.history.replaceState(null, "", "#main")
  const push = vi.spyOn(window.history, "pushState").mockImplementation(() => { throw new DOMException("Local file restriction", "SecurityError") })
  try {
    const user = userEvent.setup()
    render(<><SkipLink /><h2 id="interactive-demo-heading" tabIndex={-1}>互動 Demo</h2></>)
    await user.click(screen.getByRole("link", { name: "跳到互動 Demo" }))
    expect(screen.getByRole("heading", { name: "互動 Demo" })).toHaveFocus()
    expect(window.location.hash).toBe("#interactive-demo-heading")
  } finally {
    push.mockRestore()
  }
})
