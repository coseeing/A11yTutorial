import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, it } from "vitest"
import { DemoWorkspace } from "@/components/demo/DemoWorkspace"
import { CheckboxDemo } from "./CheckboxDemo"

it("preserves native Space activation without adding Enter as a toggle", async () => {
  const user = userEvent.setup()
  render(<DemoWorkspace><CheckboxDemo /></DemoWorkspace>)
  const all = await screen.findByRole("checkbox", { name: "全部選取" })
  await user.tab()
  expect(all).toHaveFocus()
  expect(all).toHaveAttribute("aria-checked", "mixed")
  await user.keyboard("{Enter}")
  expect(all).toHaveAttribute("aria-checked", "mixed")
  await user.keyboard(" ")
  expect(all).toBeChecked()
  const card = await screen.findByRole("group", { name: /標記 B，\s*checkbox「全部選取」/ })
  await waitFor(() => expect(within(card).getByTestId("a11y-tree-status")).toHaveTextContent("checked=true"))
})
