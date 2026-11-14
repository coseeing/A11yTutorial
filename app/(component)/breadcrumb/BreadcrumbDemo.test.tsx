import { fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, it } from "vitest"
import { DemoWorkspace } from "@/components/demo/DemoWorkspace"
import { BreadcrumbDemo } from "./BreadcrumbDemo"

it("keeps example links on the teaching page and preserves the current page", async () => {
  const user = userEvent.setup()
  render(<DemoWorkspace><BreadcrumbDemo /></DemoWorkspace>)
  const nav = await screen.findByRole("navigation", { name: "麵包屑" })
  const home = within(nav).getByRole("link", { name: "首頁" })
  const event = new MouseEvent("click", { bubbles: true, cancelable: true })
  fireEvent(home, event)
  expect(event.defaultPrevented).toBe(true)
  expect(screen.getByRole("status")).toHaveTextContent("留在本頁")
  home.focus()
  await user.keyboard("{Enter}")
  expect(within(nav).getByRole("link", { name: "Breadcrumb" })).toHaveAttribute("aria-current", "page")
  await waitFor(() => expect(screen.getByRole("group", { name: /標記 A，\s*navigation「麵包屑」/ })).toBeInTheDocument())
  expect(screen.getByRole("group", { name: /標記 B，\s*list/ })).toHaveTextContent("ol 路徑清單")
  await waitFor(() => expect(within(screen.getByRole("group", { name: /標記 C，\s*link「首頁」/ })).getByTestId("a11y-tree-status")).not.toHaveTextContent("aria-current=page"))
  await user.click(within(nav).getByRole("link", { name: "元件" }))
  await waitFor(() => expect(screen.getByRole("group", { name: /標記 C，\s*link「元件」/ })).toBeInTheDocument())
  await user.click(within(nav).getByRole("link", { name: "Breadcrumb" }))
  await waitFor(() => expect(screen.getByRole("group", { name: /標記 C，\s*link「Breadcrumb」/ })).toHaveTextContent("aria-current=page"))
})
