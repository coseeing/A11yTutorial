import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, it } from "vitest"
import { DemoPageNavigation } from "./DemoPageNavigation"
import { appPath } from "@/lib/app-path"

it("provides a focusable return to the top and a direct return to the catalog", async () => {
  const user = userEvent.setup()
  render(<main id="main" tabIndex={-1}><p>說明內容</p><DemoPageNavigation /></main>)
  expect(screen.getByRole("navigation", { name: "元件說明頁尾導覽" })).toBeInTheDocument()
  expect(screen.getByRole("link", { name: "返回元件清單" })).toHaveAttribute("href", appPath("/#catalog-heading"))
  await user.click(screen.getByRole("link", { name: "返回頁面頂端" }))
  expect(screen.getByRole("main")).toHaveFocus()
  expect(window.location.hash).toBe("#main")
})
