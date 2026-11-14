import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, it } from "vitest"
import { DemoWorkspace } from "@/components/demo/DemoWorkspace"
import { RadioDemo } from "./RadioDemo"

it("keeps B on the first option and reports both selected and unselected states", async () => {
  const user = userEvent.setup()
  render(<DemoWorkspace><RadioDemo /></DemoWorkspace>)
  const card = await screen.findByRole("group", { name: /標記 B，\s*radio「標準宅配」/ })
  expect(within(card).getByTestId("a11y-tree-status")).toHaveTextContent("checked=true")
  await user.click(screen.getByRole("radio", { name: "隔日到貨" }))
  await waitFor(() => expect(within(card).getByTestId("a11y-tree-status")).toHaveTextContent("checked=false"))
  expect(screen.getByRole("group", { name: /標記 B，\s*radio「標準宅配」/ })).toBe(card)
  await user.click(screen.getByRole("radio", { name: "標準宅配" }))
  await waitFor(() => expect(within(card).getByTestId("a11y-tree-status")).toHaveTextContent("checked=true"))
})
